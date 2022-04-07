const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Pitch = require('./models/Pitchscema.js');
mongoose.connect("mongodb://localhost:27017/xharktank", {useNewUrlParser : true});


const app = express();
app.use(bodyParser.json())

app.use(bodyParser.urlencoded({extended : true}));

let a = [1]


let id = String(a.length);

app.post('/pitches', function(req, res){
    const reqresult = req.body;
    const data = new Pitch({
        id : id,
        entrepreneur : reqresult.entrepreneur,
        pitchTitle : reqresult.pitchTitle,
        pitchIdea : reqresult.pitchIdea,
        askAmount : reqresult.askAmount,
        equity : reqresult.equity
    })
    data.save(function(err, dat){
        if(err){return res.status(400).json()}
        else{
            a.push(1);
            id = String(a.length);
            return res.status(201).json({
                id : dat.id
            })
        }
    })
})

app.post('/pitches/:pitch/makeOffer/', function(req, res){
    if(req.params["pitch"] >= a.length){
        return res.status(404).json();
    }
    const offer = {
        id : String(a[req.params["pitch"]]),
        investor : req.body.investor,
        amount : req.body.amount,
        equity : req.body.equity,
        comment : req.body.comment,
    }
    Pitch.findOneAndUpdate(
        { id: req.params["pitch"]}, 
        { $push: { offers: offer } },
       function (err, dat) {
           if(err){return res.status(400).json()}
            else{
                a[req.params["pitch"]] += 1;
                return res.status(201).json({
                        id : String(a[req.params["pitch"]]-1)
                    })
                }
         });

        
})

app.get('/pitches', function(req, res){

    Pitch.find({}, {'_id': 0})
    .then(user => {
        return res.status(200).json(user);
    })
    .catch(err => console.log(err));
})

app.get('/pitches/:pitch/', function(req, res){
    if(req.params["pitch"] >= a.length){
        return res.status(404).json();
    }
    Pitch.findOne({id : req.params["pitch"]}, {'_id' : 0})
    .then(user => {
        return res.status(200).json(user);
    })
    .catch(err => console.log(err));
    
})

app.listen(8081, function(){
    console.log("SErver is Running");
})