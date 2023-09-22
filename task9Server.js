let express=require('express');
let app=express();
app.use(express.json());
app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin","*");
    res.header(
        "Access-Control-Allow-Methods",
        "GET,POST,OPTIONS,PUT,PATCH,DELETE,HEAD"
    );
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type,Accept"
    );
    next();
});
let mysql=require('mysql');
let connData={
    host:'localhost',
    user:'root',
    password:'',
    database:'training',
};
const {Client}=require("pg");
const client=new Client({
    user:"postgres",
    password:"Codingisnothing@123",
    database:"postgres",
    port:5432,
    host:"db.aedeokxelatbrykkekfn.supabase.co",
    ssl:{rejectUnauthorized:false},
});
client.connect(function(res,error){
    console.log('Connected!||');
});
var port=process.env.PORT||2410;
app.listen(port,()=>console.log(`Node app listening on port ${port}!`));
function resetData(){
    let {mobiles}=require('./task9Data.js');
        console.log(mobiles)
        let arr=mobiles.map(p=>[p.name,p.price,p.brand,p.RAM,p.ROM,p.OS]);
        console.log(arr)
        let values=[arr]
        let query=`INSERT INTO mobiles (name,price,brand,RAM,ROM,OS) VALUES($1,$2,$3,$4,$5,$6)`;
        client.query(query,arr[17],function(err,result){
            if(err){console.log(err.message)}
            console.log('complete')}
        )
};
//resetData()
app.get("/mobiles",function(req,res,next){
    let RAM=req.query.ram;
    let ROM=req.query.rom;
    let OS=req.query.os;
    let brand=req.query.brand
    console.log(RAM,brand,ROM,OS)
    console.log("Inside /users get api");
    
    const query=`SELECT * FROM mobiles`;
    client.query(query,function(err,result){
        if(err){res.status(400).send(err);
        }
        
        let arr=[...result.rows]
        if(RAM){
            
            let r1=RAM.split(',')
            let ind=r1.indexOf('Out of 3GB')
            
            if(ind>=0){
                r1[ind]='3GB'
            }
            let l1=r1.length;
            if(l1===2){
                arr=arr.filter((pr)=>pr.ram===r1[0] || pr.ram===r1[1])
            }
            if(l1===3){
                arr=arr.filter((pr)=>pr.ram===r1[0] || pr.ram===r1[1] || pr.ram===r1[2])
            }
            if(l1===4){
                arr=arr.filter((pr)=>pr.ram===r1[0] || pr.ram===r1[1]||pr.ram===r1[2]||pr.ram===r1[3])
            }
            if(l1===1)arr=arr.filter((pr)=>pr.ram===r1[0])
            console.log(arr)
        }
        if(ROM){
            
            let r1=ROM.split(',')
            let l1=r1.length;
            let ind=r1.indexOf('Out of 32GB')
            
            if(ind>=0){
                r1[ind]='32GB'
            }
            if(l1===2){
                arr=arr.filter((pr)=>pr.rom===r1[0] || pr.rom===r1[1])
            }
            if(l1===3){
                arr=arr.filter((pr)=>pr.rom===r1[0] || pr.rom===r1[1] || pr.rom===r1[2])
            }
            if(l1===4){
                arr=arr.filter((pr)=>pr.rom===r1[0] || pr.rom===r1[1]||pr.rom===r1[2]||pr.rom===r1[3])
            }
            if(l1===1)arr=arr.filter((pr)=>pr.rom===r1[0])
            console.log(arr)
        }
        if(OS){
            if(OS==='Out of Android'){OS='Android'}
            arr=arr.filter((pr)=>pr.os===OS)
        }
        if(brand){
            
            let r1=brand.split(',')
          console.log(r1)
          let l1=r1.length;
            let ind=r1.indexOf('Out of Samsung')
            
            if(ind>=0){
                r1[ind]='Samsung'
            }
            console.log(r1)
            
            if(l1===2){
                arr=arr.filter((pr)=>pr.brand===r1[0] || pr.brand===r1[1])
            }
            if(l1===3){
                arr=arr.filter((pr)=>pr.brand===r1[0] || pr.brand===r1[1] || pr.brand===r1[2])
            }
            if(l1===4){
                arr=arr.filter((pr)=>pr.brand===r1[0] || pr.brand===r1[1]||pr.brand===r1[2]||pr.brand===r1[3])
            }
            if(l1===1)arr=arr.filter((pr)=>pr.brand===r1[0])
            console.log(arr)
        }
        
        res.send(arr);
    //client.end();
        
    })
});
app.get("/mobiles/:RAM",function(req,res,next){
    let ram=req.params.RAM;
    if(ram==='Out of 3GB'){
        ram='3GB'
    }
    let values=[ram]
    const query=`SELECT * FROM mobiles WHERE ram=$1`;
    client.query(query,values,function(err,result){
        console.log("inside get")
        if(err){res.status(400).send(err);}
        console.log(result)
        res.send(result.rows)
       })
})
app.get("/mobiles/name/:name",function(req,res,next){
    let name=req.params.name;
    let values=[name]
    const query=`SELECT * FROM mobiles WHERE name=$1`;
    client.query(query,values,function(err,result){
        console.log("inside get")
        if(err){res.status(400).send(err);}
        console.log(result)
        res.send(result.rows)
       })
})
app.get("/mobiles/brand/:brand",function(req,res,next){
    let brand=req.params.brand;
    if(brand==='Out of Samsung'){brand='Samsung'}
    let values=[brand]
    const query=`SELECT * FROM mobiles WHERE brand=$1`;
    client.query(query,values,function(err,result){
        console.log("inside get")
        if(err){res.status(400).send(err);}
        console.log(result)
        res.send(result.rows)
       })
})
app.get("/mobiles/rom/:ROM",function(req,res,next){
    let rom=req.params.ROM;
    if(rom==='Out of 32GB'){rom='32GB'}
    let values=[rom]
    const query=`SELECT * FROM mobiles WHERE rom=$1`;
    client.query(query,values,function(err,result){
        console.log("inside get")
        if(err){res.status(400).send(err);}
        console.log(result)
        res.send(result.rows)
       })
})
app.get("/mobiles/os/:OS",function(req,res,next){
    let os=req.params.OS;
    if(os==='Out of Android'){os='Android'}
    let values=[os]
    const query=`SELECT * FROM mobiles WHERE os=$1`;
    client.query(query,values,function(err,result){
        console.log("inside get")
        if(err){res.status(400).send(err);}
        console.log(result)
        res.send(result.rows)
       })
})
app.post("/mobiles",function(req,res,next){
    console.log("Inside post of emp");
    var values=Object.values(req.body);
    console.log(values);
    const query=`INSERT INTO mobiles (name,price,brand,RAM,ROM,OS) VALUES($1,$2,$3,$4,$5,$6)`;
    client.query(query,values,function(err,result){
        if(err){res.send(400).send(err);}
        res.send(`${result.rowCount}insertion succesful`);
    });
});
app.put("/mobiles/:name",function(req,res,next){
    console.log("Inside put of user");
    let userCode=req.params.name;
    let price=req.body.price;
    let brand=req.body.brand;
    let ram=req.body.ram;
    let rom=req.body.rom;
    let os=req.body.os;
    let value=[userCode]
    console.log(userCode)
    let query1=`DELETE FROM mobiles WHERE name=$1`;
    client.query(query1,value,function(err,result){
        if(err){res.send(400).send(err);}
            console.log('after delete')
            let values=[userCode,price,brand,ram,rom,os]
            const query=`INSERT INTO mobiles (name,price,brand,RAM,ROM,OS) VALUES($1,$2,$3,$4,$5,$6)`;
            client.query(query,values,function(err,result){
                if(err){res.send(400).send(err);}
                res.send(`${result.rowCount} updation succesful`);
            });});
        });

        app.delete("/mobiles/:name",function(req,res,next){
            let name=req.params.name;
            let values=[name]
            let query=`DELETE FROM mobiles WHERE name=$1`;
            console.log(values)
            client.query(query,values,function(err,result){
                if(err){res.send(400).send(err);}
                res.send(`${result.rowCount} updation succesful`);
            });
        })