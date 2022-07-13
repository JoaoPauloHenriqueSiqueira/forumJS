const express = require("express")

const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/config');
const questionModel = require('./database/Models/Question');

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

app.get("/", (req,res)=>{
    res.render("index", {
        nome:nome,
        msg: msg,
        produtos: produtos
    })
})

app.get("/questions", (req, res) => {
    res.render("questions", {
        nome: nome,
        msg: msg,
        produtos: produtos
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

app.listen(8080, ()=>{
    console.log("APP RODANDO");
})