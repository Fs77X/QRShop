require('dotenv').config()

//all imported libraries
const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const morgan = require("morgan")
const _ = require("lodash")
const  multer = require('multer');
const upload = multer();
const itemGetter = require("./itemGetter")
const texter = require("./texter")
// const fileUpload = require("express-fileupload")

//Port number the server runs off of
const PORT = 8080


//Server: construct an express webserver based on the specifications
//        that are required (all this is handled in the class)
// class Server{

//    constructor(){
app = express()

// all imported libraries that the server takes advantage of
//   this.app.use(fileUpload({
//      createParentPath: true
//   }));
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("dev"))
app.use(upload.array()); 

app.get('/',function(req,res){
   res.status(200).send("Hello World, the server is up and running")
})
app.get('/get_item',async (req,res) => {
   await itemGetter.get_item(req, res)
})

app.get('/get_inventory',async (req,res) => {
   await itemGetter.get_inventory(req, res)
})

app.post('/add_item', async (req,res) => {
   await itemGetter.add_item(req, res)
})

app.get('/send_msg', async (req, res) => {
   await texter.send_text(req, res)
   
})

app.get('/notify_store', async (req, res) => {
   await texter.notify_Owner(req, res)
})

app.post('/add_order', async (req, res) => {
   await itemGetter.add_order(req, res)
})

app.post('/add_delivery', async (req, res) => {
   await itemGetter.add_delivery(req, res)
})

app.listen(PORT,function(){
   console.log("Server is running on port: " + PORT)
})
//    }
// }

module.exports = app;