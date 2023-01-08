var doc = document.documentElement;
// 전체화면 설정
function openFullScreenMode() {
    if (doc.requestFullscreen)
        doc.requestFullscreen();
    else if (doc.webkitRequestFullscreen) // Chrome, Safari (webkit)
        doc.webkitRequestFullscreen();
    else if (doc.mozRequestFullScreen) // Firefox
        doc.mozRequestFullScreen();
    else if (doc.msRequestFullscreen) // IE or Edge
        doc.msRequestFullscreen();
}
function closeFullScreenMode() {
    if (document.exitFullscreen)
        document.exitFullscreen();
    else if (document.webkitExitFullscreen) // Chrome, Safari (webkit)
        document.webkitExitFullscreen();
    else if (document.mozCancelFullScreen) // Firefox
        document.mozCancelFullScreen();
    else if (document.msExitFullscreen) // IE or Edge
        document.msExitFullscreen();
}
timework()
function timework() {c_time.innerHTML = new Date().toLocaleDateString()+" "+ new Date().toLocaleTimeString()}
setInterval(timework,1000)

let rs = ["-","-","-","-","-"]//입력값
let print = ()=>                //출력해야할 숫자를 보이게하는 함수
{
    re.innerHTML = ""
    for(let i=0;i<5;i++)
        {
            re.innerHTML += rs[i]
        }
}
,Num = (x)=>{
    for(let i=0;i<5;i++)
        {
            if(rs[i]=="-")
            {
                rs[i] = x
                break
            }
        }
    print()
}
,DEL = ()=>{
    for(let i=4;i>=0;i--)
        {
            if(rs[i]!="-")
            {
                rs[i] = "-"
                break
            }
        }
    print()
}
,END = ()=>{
    if(
        (rs[4]!="-")
         &&(1<=rs[0]&&rs[0]<=3)
        &&((rs[1]==1&&rs[2]<=1)||(rs[1]==0&&rs[2]>=1))
        &&(rs[3]!=0||(rs[3]==0&&rs[4]!=0))
      )
    {
        if(uc())
        {
            dim()
            play(1)
        }
        else
        {
            add()
            re.innerHTML = '자습실 이용 시작'
            play(0)
        }
    rs = ["-","-","-","-","-"]
    setTimeout(function() { print() }, 2000);
    }
    else if(rs[4]!="-")
    {
        re.innerHTML = '잘못된 학번'
        rs = ["-","-","-","-","-"]
        setTimeout(function() { print() }, 2000);
    }
    else if(rs[3]!="-")
    {
        if(re.innerHTML == "0723-")
            {  
                openFullScreenMode()
                rs = ["-","-","-","-","-"]
                print()
//                setTimeout(function() { print() }, 2500)
            }
        else if(re.innerHTML == "0415-")
            {
                closeFullScreenMode()
                rs = ["-","-","-","-","-"]
                print()
//                setTimeout(function() { print() }, 2500)
            }
    }
}
function add(){
    var t = document.querySelector('#temp');

    // 새로운 열을 복제하고 테이블에 삽입합니다
    var tb = document.querySelector("#val");
    var clone = document.importNode(t.content, true);
    let tt = new Date()
    
    td = clone.querySelectorAll("span");
    clone.querySelector(".user").innerHTML = re.innerHTML;
    clone.querySelector(".start_time").innerHTML = String("0" + tt.getHours()).slice(-2)+":"+String("0" + tt.getMinutes()).slice(-2);
    
    clone.querySelector(".u").setAttribute("id", re.innerHTML)
    clone.querySelector(".u").setAttribute("h", tt.getHours())
    clone.querySelector(".u").setAttribute("m", tt.getMinutes())
    clone.querySelector(".u").setAttribute("u", "")
    
    tb.appendChild(clone);
}
function dim(){
    var element = document.getElementById(re.innerHTML);
    let date = new Date();
    element.parentNode.removeChild(element);
    actDB(re.innerHTML
          ,Math.floor(element.getAttribute("u"))
          ,element.querySelector(".start_time").innerHTML
          ,element.querySelector(".use_time").innerHTML)
    re.innerHTML = element.querySelector(".use_time").innerHTML
}
function uc(){
    let aaa = document.getElementById(re.innerHTML)
    if(aaa!=null)
        {
            return true;
        }
    else
        {
            return false
        }
}


setInterval(count,50);
function count(){
    let d = val.querySelectorAll(".u")
    
    for(let i=0;i<d.length;i++)
        {
            let co = (Number(d[i].getAttribute("u"))+0.05)
//            c(d[i].querySelector(".use_time"))
            d[i].setAttribute("u", co.toFixed(2))
            let date = new Date();
            let Hour = Math.floor(d[i].getAttribute("u")/3600)
            let Min = Math.floor(d[i].getAttribute("u")/60);
            let Sec = Math.floor(d[i].getAttribute("u")%60);
            d[i].querySelector(".use_time").innerHTML = (String("0" + Hour).slice(-2)+":"+String("0" + Min).slice(-2)+":"+String("0" + Sec).slice(-2))
        }
}

function sty(e){
    e.target.classList.add("on")
    setTimeout(function() { e.target.classList.remove("on") }, 100);
}


function play(x) { 
    if(x==0)
        {
            var audio = document.getElementById('audio_in'); 
        }
    else  if(x==1)
        {
            var audio = document.getElementById('audio_out'); 
        }
    if (audio.paused) { 
        audio.play(); 
    }else{ 
        audio.pause(); 
        audio.currentTime = 0 
    } 
} 





function c(x){
    console.log(x)
}