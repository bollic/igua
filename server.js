// server.js
const jsonServer = require("json-server");
// Import the library
const cors = require('cors');
const server = jsonServer.create();

const middlewares = jsonServer.defaults()
const port = process.env.PORT||4000

// Set up a domainList and check against it:
const domainList = ['localhost:4000', 'https://wild-gray-beaver-robe.cyclic.cloud']


const corsOptions = {
  origin: function (origin, callback) {
    if (domainList.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
}
server.use(cors(corsOptions
  /*  {
  
  origin: '*', //['localhost:4000', 'https://wild-gray-beaver-robe.cyclic.cloud'],use your actual domain name (or localhost), using * is not recommended
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
   allowedHeaders: ['Content-Type', 'Origin', 'X-Requested-With', 'Accept', 'x-client-key', 'x-client-token', 'x-client-secret', 'Authorization'],
   credentials: true

}   */))
const router = jsonServer.router("db.json");

server.use(middlewares)
server.use(router)
server.listen(port, () => {
  console.log('JSON Server is running on port '+port)
})
