async function getAll(){
    let strOption;
    let body=await(await(fetch("/allinfo"))).json()
    let str=`<table  border="1">`
 
    for (let e = 0; e < body.length; e++) {
        str+=`<tr>
            <td>${body[e].domain}</td>
            <td>${body[e].web_page}</td>
            <td>${body[e].name}</td>
            <td>${body[e].counter}</td>
            <td>
            <button onclick='updateStudent("${e}")'>Add Student</button>
            </td>
            </tr>`
            strOption+=`<option>${body[e].name}</option>`
        };
        document.getElementById("DDuniversities").innerHTML=strOption
        str+="</table>";
        document.getElementById("res").innerHTML=str
};
async function deleteUniversity(){
    let deleteUniversity=document.getElementById("DDuniversities").value
    let res=await (fetch(`/delete/${deleteUniversity}`,{"method":"DELETE"}));
    getAll();
};
async function addUniversities(){
    let domain=document.getElementById("domain").value
    let web_page=document.getElementById("web_page").value
    let name=document.getElementById("name").value
    let counter=document.getElementById("counter").value
    let initParam= { 
        method:"POST",
        headers: {"Content-Type": "application/json"},
        body:`{"domain":"${domain}", "web_page":"${web_page}","name":"${name}","counter":"${counter}"}`
    }
    let res=await (fetch("/add",initParam));
    getAll(); 
};
async function updateStudent(index){
    let res=await(fetch(`/edit/${index}`,{"method":"PUT"}));
    getAll();  
};


