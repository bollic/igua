// server.js
//nella console: npm start 

const express = require('express');
const app = express();

const mongoose = require('mongoose');
const Thing = require('./models/Thing');
const cors = require('cors');
app.set("view engine", "ejs")
app.use(express.urlencoded({extended: true}))


// JSON Server is running on port 4000
//posso vedere il BACKEND , cioe' il json su http://localhost:4000/posts?_sort=likes&_order=desc
//per vedere , il FRONTEND ,vai su index.html open with live server
const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults()
const port = process.env.PORT||10000
/*server.all('/', (req, res) => {
  req.headers['origin'] || req.get('Origin')
  console.log(['origin'])
  res.get('Origin')
  res.send('Yo!')
})*/


mongoose.connect('mongodb+srv://soniaBoss:KLP59dnH8@cluster0.cvr9g5a.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true})
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// Add custom middleware for CORS
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://igua.onrender.com'); // Allow any origin
  res.header('Access-Control-Allow-Origin',  req.headers['origin'] || req.get('Origin') ); // Allow any domain coming in Origin header.
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

router.get('/posts', (req, res) =>{
  res.send(posts);
});
/*
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3001', 'http://localhost:3001')
  res.header('Access-Control-Allow-Headers', '*')
  next()
})

app.use(cors({
  origin:  ['*', 'http://localhost:3001/posts'], // use your actual domain name (or localhost), using * is not recommended
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
   allowedHeaders: ['Content','Content-Type', 'Origin', 'X-Requested-With', 'Accept', 'x-client-key', 'x-client-token', 'x-client-secret', 'Authorization'],
   allowedOrigin: ['*'],
   
   credentials: true
}))
*/

server.use(middlewares)
server.use(router)
server.listen(port, () => {
  console.log('JSON Server is running on port '+port)
})
