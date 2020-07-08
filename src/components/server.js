

const express=require('express');
const cors=require('cors');
const mysql=require('mysql');
const bodyParser  = require('body-parser');
const app=express();
const con=mysql.createConnection({
    host: 'localhost',
    user:'root',
    password:'',
    database:'sampledb'
});
 

con.connect(err=>{
if(err){
    return err;
}
else{
    console.log('connected to database sampledb');
}

});

app.use(cors());
app.use(express.json());

app.post('/logins',(req,res)=>{
  
    // console.log(req.body);
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

const verify='SELECT username,passwords,logindate,logintime from users';
const updatelogindetails=`UPDATE users SET logindate = ${date}, logintime=${time} WHERE username = ${req.body.username};`;
con.query(verify,(err,results)=>{

    if(err){
        console.log('someerror occured');
    }
        else{
        
            var i=0;
            var flag=false;
            var previouslogindate="";
            var previouslogintime="";
         while(results[i])
         {  
            
             if(results[i].username==req.body.username && results[i].passwords==req.body.password)
             {
                 console.log('You are loggined successfully '+req.body.username);
                previouslogindate=results[i].logindate;
                previouslogintime=results[i].logintime;
                // console.log(previouslogindate+previouslogintime);
// console.log(results[i]);
                flag=true;
                
                 
             }
             i++;
         }
         if(flag)
         {
              res.send({
            success:'true',
            previouslogindate:previouslogindate,
            previouslogintime:previouslogintime
        });
        }
        else{
            console.log('Sorry You entered wrong username or password');
            res.send({
                success:'false'
            });

        }

        }
    
});


});

//
app.post('/updatelogins',(req,res)=>{
  
    // console.log(req.body);


const updatelogindetails=`UPDATE users SET logindate = '${req.body.date}', logintime='${req.body.time}' WHERE username = '${req.body.username}';`;
con.query(updatelogindetails,(err,results)=>{

    if(err){
        console.log('someerror occured here'+err);
    }
        else{

            console.log("Newly Logined on :" +req.body.date+" at "+req.body.time);
        
        }
    
});


});


app.get('/signupcustomer',(req,res)=>{

    const{cid,cfirstname,clastname,cDob,cEmail,username,passwords,role,date,time} =req.query;
    
    const Insert=`INSERT INTO users (cid,cfirstname,clastname,cDob,cEmail,username,passwords,role,logindate,logintime) VALUES ('${cid}','${cfirstname}','${clastname}','${cDob}','${cEmail}','${username}','${passwords}','${role}','${date}','${time}')`;
    
    con.query(Insert,(err,results)=>{
        if(err){
            console.log('someerror'+err);
            return res.send('error'+err);
        }
        else{
            return res.send('success');
        }
    });
    });
    

app.listen(4001,()=>{
    console.log('server running 4001')
});
