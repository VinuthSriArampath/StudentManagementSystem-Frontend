let tablebody=document.getElementById("tablebody");
let body=``;
fetch("http://localhost:8080/student/all")
.then(res => res.json())
.then(data =>{
    console.log(data);
    data.forEach(element => {
        body+=`                <tr>
        <td>${element.id}</td>
        <td>${element.fname}</td>
        <td>${element.lname}</td>
        <td>${element.email}</td>
        <td>${element.age}</td>
        <td>${element.grade}</td>
        <td>${element.phone}</td>
    </tr>`
    });
    tablebody.innerHTML=body
});




loadcontent('addstudentcontent');
function loadcontent(content){
    var subcontent=document.getElementsByClassName("subcontent");
    for (let i = 0; i < subcontent.length; i++) {
        subcontent[i].style.display ="None";
    }
    document.getElementById(content).style.display ="block";
}
