// import express from "express";
var express = require("express");
// import mongoose from "mongoose";
var mongoose =require("mongoose");
const Cards = require("./dbCards.js");
const cors =require("cors");
//App Config
const app=express();
const port= process.env.PORT || 8001;
const connection_url="mongodb+srv://admin:jimmy1999@cluster0.wz2sj.mongodb.net/TinderDB?retryWrites=true&w=majority"

//Middlewares
app.use(express.json())
app.use(cors())

//DB config
mongoose.connect(connection_url,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true,
});
//API Endpoints
app.get("/", (req,res)=> res.status(200).send("hello"));


app.post("/tinder/card",(req,res)=>{
    const dbCard =req.body;
    
    Cards.create(dbCard, (err,data)=>{
        if(err){
            res.status(500).send(err)
        }
        else{
            res.status(201).send(data)
        }
    })
});

app.get("/tinder/cards",(req,res)=>{
    Cards.find((err,data)=>{
        if(err){
            res.status(500).send(err)
        }
        else{
            res.status(200).send(data)
        }
    })
})
//Listener
app.listen(port, ()=> console.log(`listening on localhost: ${port}`))