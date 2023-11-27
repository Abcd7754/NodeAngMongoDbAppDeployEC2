const express = require('express')
const app = express()
const mongoose = require("mongoose")
var cors= require('cors');
// Database Address
const url = "mongodb://localhost:27017/ColorShapeDb"

app.use(cors());

// Connecting to database
mongoose.connect(url).then((ans) => {
    console.log("ConnectedSuccessful")
    }).catch((err) => {
    console.log("Error in the Connection")
    })

    const Schema = mongoose.Schema;
    const collection_structure = new Schema({
        color: {
            type: String,
            require: true
        }
        ,
        shape: {
            type: String,
            require: true
        }
        })  
 const Colorshape = mongoose.model("Colorshape", collection_structure)
 
//const bodyParser = require('body-parser')
app.get('/', (req, res) => {
    res.send('Welcome to Node API')
})

app.get('/getData', (req, res) => {
    res.json({'message': 'Hello World'})
})
// app.post('/postData', bodyParser.json(), (req, res) => {
//     res.json(req.body)
// })
//Instead of body parser u can use below line If you are using Express 4.16+ 
app.use(express.json());
app.post('/postData', (req, res) => {        
    shape = req.body.Shape,	
	color = req.body.Color
	let newColorshape = new Colorshape({
		shape:shape,
		color: color
	})

	newColorshape.save().then((colorshape) => {	
		//res.send("color shape added")
	}).catch((err) => {
		console.log(err)
	})
    res.json(req.body)
})
//If you also have the following code in your environment:
//app.use(bodyParser.urlencoded({extended: true}));
//You can replace that with:
//app.use(express.urlencoded()); //Parse URL-encoded bodies
app.listen(3000, () => console.log('Example app listening on port 3000!'))