let New;
let request = window.indexedDB.open("MyDB",2)//indexedDB를 열어주겠다 
request.onupgradeneeded = function(evt){
    db = evt.target.result
    db.createObjectStore("student", {keyPath:"num"})   //Nasin이라는 데이터공간을 만들겠다
    New = true
    console.log("DB onupgradeneeded")
}

request.onsuccess = function(evt){  //DB열기 성공했을때
    db = evt.target.result
    if(New==true)   //처음 DB가 생성된거라면
        {
            let data_a = [
                {num:"30921",name:"추호성",log:[],t_second:0,t_time:null},
                {num:"30204",name:'나서은',log:[],t_second:0,t_time:null}
            ]
            for(let i=0;i<data_a.length;i++)
            {
                db.transaction(["student"],"readwrite").objectStore("student").add(data_a[i])
            }
        }
    else            //아니라면
        {
            
        }
    console.log("%cDB success!","color:black; font-weight: 700; font-size:2em; text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white;")     //DB형성완료 알림
}
let actDB = (x,y,z,w)=>{
    var objectStore = db.transaction(["student"], "readwrite").objectStore("student");
    
   /* let data = {num:x,name:'',t_time:0}
    objectStore.add(data)*/
    
    let request = objectStore.get(x)
    request.onsuccess = function(event) {
        var date = new Date()
        const hours = ('0' + date.getHours()).slice(-2);
        const minutes = ('0' + date.getMinutes()).slice(-2);
        const timeStr = hours + ':' + minutes;
        var data = event.target.result;
        var llog = String(date.toLocaleDateString())+" |x| "+String(z)+" ~ "+timeStr+" |x| "+w
        if(data == undefined)
            {
                let data = {num:x,name:'',log:[llog],t_second:y,t_time:w}
                objectStore.add(data)
            }
        else
            {
                data.t_second = Number(data.t_second)+y
                data.log.push(llog)
                
                let Hour = Math.floor(data.t_second/3600)
                let Min = Math.floor(data.t_second/60);
                let Sec = Math.floor(data.t_second%60);
                
                data.t_time = (String("0" + Hour).slice(-2)+":"+String("0" + Min).slice(-2)+":"+String("0" + Sec).slice(-2))
                var requestUpdate = objectStore.put(data);
            }
    }
}