loadcontent('addstudentcontent');
function loadcontent(content){
    var subcontent=document.getElementsByClassName("subcontent");
    for (let i = 0; i < subcontent.length; i++) {
        subcontent[i].style.display ="None";
    }
    document.getElementById(content).style.display ="block";
}