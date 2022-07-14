const express = require("express")

const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/config');
const questionModel = require('./database/Models/Question');
const answerModel = require('./database/Models/Answer');

//Database
connection
    .authenticate()
    .then(()=>{
        console.log("AQUI DEU BOM")
    })
    .catch((msgError) =>
    {
        console.log("AN error occurred")
    })

app.set("view engine", "ejs");
app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

let nome = "João";
let msg = true;
let produtos = [
    { nome:"Doritos", preco:3.15},
    { nome: "Fandangos", preco: 2.15 },
    { nome: "Churros", preco: 11.08 },
]

app.get("/questions/new", (req, res) => {
    res.render("questions/form")
})

app.get("/question/:id", (req, res) => {
    let id = req.params.id;

    questionModel.findOne(
       {
            where:{
                id:id
            }
        }
    ).then((question) => {
        if(question != undefined){

            answerModel.findAll({
                raw: true,
                where: {
                    question_id: question.id
                },
                order: [
                    ['id', 'DESC']
                ]
            }).then(answers =>{
                return res.render("questions/detail", { question: question, answers: answers });
            })
        }else{
            return res.redirect("/")
        }
    })

})

app.get("/", (req,res)=>{
     questionModel.findAll({raw:true, order:[
        ['id','DESC']
     ]}).then((questions)=> {
         res.render("index",
            {questions:questions}
          );
    })
})

app.post("/saveQuestion", (req, res) => {
    let description = req.body.description;
    let title = req.body.title;
    questionModel.create({
        description: description,
        title: title
    }).then(()=>{
        res.redirect("/")
    })

})

app.post("/saveAnswer", (req, res) => {
    let body = req.body.body;
    let question_id = req.body.id;

    answerModel.create({
        question_id: question_id,
        body: body
    }).then(() => {
        res.redirect("/")
    })

})

app.listen(8080, ()=>{
    console.log("APP RODANDO");
})