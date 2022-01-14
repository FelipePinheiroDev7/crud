const express = require('express');
const app = express();    
const database = require('./db');     // Database config
const Cliente = require('./cliente'); // Database Schema    

async function Filtro(indice){
    return indice==0 ? Cliente.findAll() : Cliente.findAll({where: {id:indice}})
}; 

async function Altera(nome,rg,dt,indice) {
    const obj = await Cliente.findByPk(indice);
    obj.nome = nome!= null ? nome: "";
    obj.rg = nome!= null ? rg: "";
    obj.dtnasc = nome!= null ? dt: "";
    obj.save();      
}

async function Deleta(indice) {
    const obj = await Cliente.destroy({
        where:{id:indice}
    });
    
}


(async()=>{
    await database.sync();                // Sincronization all tables
    
    // ========================================================
    // INSERÇÃO DE CLIENTE => CREATE
    //========================================================= 
    // http://localhost:5000/cria/nome/cabra/rg/111/dt/555   

    app.get('/cria/nome/:name/rg/:rg/dt/:dt',
    async function(req,res){         
        // =====================================    
        // name => cabra ; rg => 111 ; dt => 555
        // =====================================    
        
        const { name,rg,dt} = req.params
//
        Cliente.create({
            "nome":name,
            "rg":rg,
            "dtnasc":dt
        }) 
        
        res.json(
            {
                message:"Dados Pegos da Url",
                nome:name,
                rg:rg,
                dt:dt,
                situacao:"foram inseridos no banco"
            })                
    });    

    // ======================================================
    // CONSULTA DE CLIENTE => READ
    // ======================================================   
    // http://localhost:5000/users/3

    app.get('/users/:userId',
    async function(req,res){          
        // userId==0 => Traz todos os registros
        // userId==3 => Traz o registro numero 3
        // =====================================

        const { userId } = req.params;
        const v = Number(userId);
        const Obj2 = await Filtro(v);   
        
        res.send(Obj2); //Works ! 
        
    });

    // ====================================================
    // ALTERAÇÂO DE CIENTE => UPDATE
    // ====================================================
    // exemplo=> http://localhost:5000/id/1/name/cabra/rg/111/dt/111
    
    app.get('/id/:userId/name/:newname/rg/:newrg/dt/:newdt',
    async function(req,res){        
        // UserId => indice procurado  => 1
        // newname => Novo valor para nome => cabra
        // newrg => Novo valor para rg => 111
        // newdt => Novo valor para dtnasc => 111
        // =====================================
   
        const { userId, newname, newrg, newdt } = req.params;
        const v = Number(userId);

        Altera(newname,newrg,newdt,userId);  
        res.json(
            {
                message:"Dados Pegos da Url",
                idusuario:userId,
                novonome:newname,
                novorg:newrg,
                novadt:newdt,
                situacao:"foram alterados no banco"
            })            
    });

    // ====================================================
    // EXCLUSAO DE CIENTE => DELETE
    // ====================================================
    // exemplo=> // http://localhost:5000/delete/id/6
    
    app.get('/delete/id/:userId', 
    async function(req,res){ 
        const { userId } = req.params;
        const v = Number(userId);
        const Obj2 = await Deleta(v);
        
        res.send({message:"Apagou o registro => " + userId} ); 
    });    
    

    app.listen(5000,
        function(){
        console.log("projeto para usar mysql com o node.js \n" + "SERVIDOR RODANDO NA URL HTTP://LOCALHOST:5000");
    })
})
();
