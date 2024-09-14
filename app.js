loadtable();
function loadtable() {
    let tablebody = document.getElementById("tablebody");
    let body = ``;

    fetch("http://localhost:8080/student/all")
        .then(res => res.json())
        .then(data => {
            console.log(data);
            data.forEach(element => {
                body += `<tr data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="getdetails(${element.id})">
                <td>${element.id}</td>
                <td>${element.fname}</td>
                <td>${element.lname}</td>
                <td>${element.email}</td>
                <td>${element.age}</td>
                <td>${element.grade}</td>
                <td>${element.phone}</td>
            </tr>`;
            });
            tablebody.innerHTML = body;
        });

}

loadcontent('addstudentcontent');

function clearaddform() {
    document.getElementById("txtaddfname").value = "";
    document.getElementById("txtaddlname").value = "";
    document.getElementById("txtaddemail").value = "";
    document.getElementById("txtaddage").value = null;
    document.getElementById("txtaddgrade").value = null;
    document.getElementById("txtaddcontact").value = "";
    document.getElementById("txtaddimage").value = "";
    document.getElementById("pic").src = ""; // Clear the image preview
}

function addstudent() {
    const fname = document.getElementById("txtaddfname").value;
    const lname = document.getElementById("txtaddlname").value;
    const email = document.getElementById("txtaddemail").value;
    const age = document.getElementById("txtaddage").value;
    const grade = document.getElementById("txtaddgrade").value;
    const address = document.getElementById("txtaddaddress").value
    const contact = document.getElementById("txtaddcontact").value;
    const image = document.getElementById("txtaddimage").files[0];

    const formData = new FormData();

    formData.append("student", new Blob([JSON.stringify({
        fname: fname,
        lname: lname,
        age: age,
        address: address,
        phone: contact,
        email: email,
        grade: grade
    })], { type: "application/json" }));

    formData.append("image", image);

    const requestOptions = {
        method: "POST",
        body: formData,
        redirect: "follow"
    };

    fetch("http://localhost:8080/student/addstudent", requestOptions)
        .then(response => response.text())
        .then(result => {
            console.log(result)
            loadtable();
        })
        .catch(error => console.error('Error:', error));
}

function loadcontent(content) {
    var subcontent = document.getElementsByClassName("subcontent");
    for (let i = 0; i < subcontent.length; i++) {
        subcontent[i].style.display = "none";
    }
    document.getElementById(content).style.display = "block";
}

function getdetails(id) {
    let studentid = document.getElementById("studentid");
    let studentfname = document.getElementById("studentfname");
    let studentlname = document.getElementById("studentlname");
    let studentage = document.getElementById("studentage");
    let studentaddress = document.getElementById("studentaddress");
    let studentphone = document.getElementById("studentphone");
    let studentemail = document.getElementById("studentemail");
    let studentgrade = document.getElementById("studentgrade");
    let studentpic = document.getElementById("studentpic");
    fetch(`http://localhost:8080/student/searchbyid/${id}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);

            studentid.value = data.id;
            studentfname.value = data.fname;
            studentlname.value = data.lname;
            studentage.value = data.age;
            studentaddress.value = data.address;
            studentphone.value = data.phone;
            studentemail.value = data.email;
            studentgrade.value = data.grade;
            studentpic.src = "data:image/*;base64," + data.image;
        })
        .catch(error => console.error('Error:', error));
}

let image = document.getElementById("txtaddimage");

image.addEventListener("change", e => {
    if (image.files[0].size >= 1000000) {
        window.alert("File too Large")
        image.value = null;
    }
})

function updatesearch() {
    let searchid = document.getElementById("txtupdatesearch").value;
    let fname = document.getElementById("txtupdatefname");
    let lname = document.getElementById("txtupdatelname");
    let age = document.getElementById("txtupdateage");
    let grade = document.getElementById("txtupdategrade");
    let email = document.getElementById("txtupdateemail");
    let address = document.getElementById("txtupdateaddress");
    let phone = document.getElementById("txtupdatecontact");
    let image = document.getElementById("updatecurrentstudent");

    fetch(`http://localhost:8080/student/searchbyid/${searchid}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            fname.value = data.fname;
            lname.value = data.lname;
            age.value = data.age;
            grade.value = data.grade;
            email.value = data.email;
            address.value = data.address;
            phone.value = data.phone;
            image.src = "data:image/*;base64," + data.image;
            localStorage.setItem("currentimage", JSON.stringify(data.image));
        })

}

function deletesearch() {
    let searchid = document.getElementById("txtdeletesearch").value;
    let fname = document.getElementById("txtdeletefname");
    let lname = document.getElementById("txtdeletelname");
    let age = document.getElementById("txtdeleteage");
    let grade = document.getElementById("txtdeletegrade");
    let email = document.getElementById("txtdeleteemail");
    let address = document.getElementById("txtdeleteaddress");
    let phone = document.getElementById("txtdeletecontact");
    let image = document.getElementById("deletecurrentstudent");

    fetch(`http://localhost:8080/student/searchbyid/${searchid}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            fname.value = data.fname;
            lname.value = data.lname;
            age.value = data.age;
            grade.value = data.grade;
            email.value = data.email;
            address.value = data.address;
            phone.value = data.phone;
            image.src = "data:image/*;base64," + data.image;
        })

}

function updatestudent() {
    const fname = document.getElementById("txtupdatefname").value;
    const lname = document.getElementById("txtupdatelname").value;
    const email = document.getElementById("txtupdateemail").value;
    const age = document.getElementById("txtupdateage").value;
    const grade = document.getElementById("txtupdategrade").value;
    const address = document.getElementById("txtupdateaddress").value
    const contact = document.getElementById("txtupdatecontact").value;
    const image = document.getElementById("txtupdateimage").files[0];

    console.log(fname);
    console.log(lname);
    console.log(email);
    console.log(age);
    console.log(grade);
    console.log(address);
    console.log(contact);


    const formData = new FormData();

    formData.append("student", new Blob([JSON.stringify({
        id: document.getElementById("txtupdatesearch").value,
        fname: fname,
        lname: lname,
        age: age,
        address: address,
        phone: contact,
        email: email,
        grade: grade
    })], { type: "application/json" }));

    if (image !== undefined) {
        formData.append("image", image);
    } else {
        formData.append("image", JSON.parse(localStorage.getItem("currentimage")));
    }


    const requestOptions = {
        method: "PATCH",
        body: formData,
        redirect: "follow"
    };

    fetch("http://localhost:8080/student/updatestudent", requestOptions)
        .then((response) => response.text())
        .then((result) => {
            console.log(result);
            loadtable();
            localStorage.clear();
        })
        .catch((error) => console.error(error));
}

function deletestudent() {

    const raw = "";

    const requestOptions = {
        method: "DELETE",
        body: raw,
        redirect: "follow"
    };

    fetch(`http://localhost:8080/student/deletestudent/${document.getElementById("txtdeletesearch").value}`, requestOptions)
        .then((response) => response.text())
        .then((result) => {
            console.log(result)
            loadtable();
        })
        .catch((error) => console.error(error));
}

function searchstudent() {
    let searchid = document.getElementById("txtsearch").value;
    let fname = document.getElementById("searchstudentfname");
    let lname = document.getElementById("searchstudentlname");
    let age = document.getElementById("searchstudentage");
    let grade = document.getElementById("searchstudentgrade");
    let email = document.getElementById("searchstudentemail");
    let address = document.getElementById("searchstudentaddress");
    let phone = document.getElementById("searchstudentphone");
    let image = document.getElementById("searchstudentpic");

    fetch(`http://localhost:8080/student/searchbyid/${searchid}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            fname.value = data.fname;
            lname.value = data.lname;
            age.value = data.age;
            grade.value = data.grade;
            email.value = data.email;
            address.value = data.address;
            phone.value = data.phone;
            image.src = "data:image/*;base64," + data.image;
        })
}