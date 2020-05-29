const express=require("express");
const app=express();
const bodyParser=require("body-parser");
const http=require("http");

const request=require("request");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/details.html");
})
app.post("/",function(req,res){
    const name=req.body.name;
    const number=req.body.phone0;
    const email=req.body.email;
;

    var data={
        members:[{
            email_address:email,
            status:"subscribed",
            name:name,
            phone:number

        }]
    };
    const jsondata=JSON.stringify(data);
    const url="http://us18.api.mailchimp.com/3.0/lists/ce791021a5" 
   
    const options={
        method:"POST",
        header:{
            "Authorization":"dhruv1910:d426492bc677baaeb02a5bbb386cd31d-us18"
        }
    };
    const request=http.request(url,options,function(response){

        if(response.statusCode===200){
            res.sendFile(__dirname+"/show_details.html");
        }
        
        response.on("data",function(data){
            console.log(JSON.parse(data));
             
        });
    });
    request.write(jsondata);
    request.end();
});
app.listen(3000,function(req,res){
    console.log("server running on port 3000");
})