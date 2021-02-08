
const express = require('express');
const app =express();
let data= require('./Universities')
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname));
for(let i=0; i<data.length; i++){
    data[i]["counter"]=0;
}
app.get("/allinfo",(req,res)=>{
    res.status(200);
    res.send(data);
})
app.post("/add",(req, res) => {
        data.push(req.body);
        res.status(201); 
        res.send({ "message": "added successfully to the list" });
    })
app.put("/edit/:name",(req,res)=>{
    let nameUniversities=data[req.params.name];
    if(nameUniversities){
        nameUniversities.counter=parseInt(nameUniversities.counter)+1;
        res.status(200);
        res.send({"message":"success"});
    }
    else{
        res.status(400);
        res.send({"message":"failed"}); 
    }
})
app.delete("/delete/:p",
    (req, res) => {
        data = data.filter(e => e.name != req.params.p);
        res.status(204); 
        res.send();
    }
)
app.listen(9500, ()=>{console.log("The Server Is Running..")});