const express = require("express");
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const router = express.Router();

//Variables
let lista = [] ;
const listacursos = {
    'java': 1200.00,
    'php': 800.00,
    '.net': 1500.00
};
let precioCurso = 0;
let nmodulos= 0;

app.set('views','')
app.set('view engine','ejs')
app.use(express.urlencoded({ extended: true }));

app.get("/",function(req, res){
    console.log("Peticion get")
    res.render(path.join(__dirname, 'views', 'index.ejs'));
})
app.post("/cursos",(req,res)=>{
    let curso = req.body.seleccion
    insertar("Curso",curso)
    console.log(lista)
    precioCurso = listacursos[curso]
    res.render(path.join(__dirname, 'views', 'modulos.ejs'));
})
app.post("/nivel",(req,res)=>{
    let level = req.body.nivel
    insertar("Modulos",level)
    nmodulos = level.length
    precioCurso = precioCurso*nmodulos
    console.log(nmodulos)
    res.render(path.join(__dirname, 'views', 'pagos.ejs'))
})
app.post("/pago",(req,res)=>{
    let dsct = 0
    let pago = req.body.tipo
    insertar("Tipo de Pago",pago)
    insertar("Subtotal",precioCurso)
    if (pago == "efectivo"){
        dsct = (precioCurso*nmodulos)*0.1
        insertar("Descuento",dsct)
    }
    insertar("Total a pagar",precioCurso-dsct)
    console.log(lista)
    res.render(path.join(__dirname, 'views', 'resumen.ejs'),{lista:lista})
})
app.get("/matricular",(req,res)=>{
    lista = [];
    res.redirect('/');
})

app.listen(8080)

function insertar(n1,n2){
    lista.push({"detalle":n1, "valor":n2});
}