require('dotenv').config();
const http = require('http');
const port1 = 8081;
const serverInfo = {
    server: "node-http server",
    date: new Date().toDateString(),
    time: new Date().toTimeString()
}
const currenciesInfo = require('../backend/currencies.json');
// const usersInfo = require('../backend/users.json');
const express = require('express');
const userRouter = require('./routes/users.routes');
const currenciesRouter = require('./routes/currencies.routes');
const verifyAuhorization = require('./middlewares/verifyauth');
const blogsRouter = require('./routes/blogs.routes');
const mongoose = require('mongoose');
const DB_URI = process.env.dburi;



const server = http.createServer((request, response) => {
    if(request.method === "GET"){
        const id = request.url.split("/")[2];
        const matchId = currenciesInfo.data.find(x => x.id?.toLowerCase() === id?.toLowerCase());
        if(request.url === "/"){
            response.write("<h1> Welcome to node-http server </h1>")
            response.end();
        }else if(request.url === "/server"){
            response.writeHead(200, {'Content-Type': 'application/json'});
            response.write(JSON.stringify(serverInfo));
            response.end();
        }else if(request.url === "/currencies"){
            response.writeHead(200, {'Content-Type' : 'application/json'});
            response.write(JSON.stringify(currenciesInfo.data));
            response.end();
        }else if(matchId != undefined){
            response.writeHead(200, {'Content-Type' : 'application/json'});
            response.write(JSON.stringify(matchId));
            response.end();
        }
    }else if(request.method === "POST"){
        if(request.url == "/currencies/new"){
            let body = "";
            request.on("error", (err) => {
                console.log(err)
            }).on("data", (chunk) => {
                body+=chunk;
            }).on("end", () => {
                body = JSON.parse(body);
                currenciesInfo.data = [body, ...currenciesInfo.data]
                response.writeHead(200, {'Content-Type': 'application/json'});
                response.write(JSON.stringify(currenciesInfo.data))
                response.end()
            })
        }
    }
})

server.listen(port1, () => {
    console.log(`Listening the node-http server on port: ${port1}`)
})

const userExpress = express();
const port2 = 8082;
userExpress.use(verifyAuhorization)
userExpress.use("/", userRouter)
userExpress.listen(port2, () => {
    console.log(`Listening the node-http server on port: ${port2}`)
})



const currencyExpress = express();
const port3 = 8083;

currencyExpress.use("/", currenciesRouter)


currencyExpress.listen(port3,() => {
    console.log(`Listening the node-express server on port ${port3}`);
})


const blogsExpress = express();
const port4 = 8084;
blogsExpress.use(express.json())
blogsExpress.use("/", blogsRouter);


mongoose.connect(DB_URI).then(() => {
    console.log("Connected to mongoDB server")
    blogsExpress.listen(port4, () => {
    console.log(`Listening the node-express server on port ${port3}`);
    })
}).catch((error) => {
    console.log("Couldn't connect to mongodb server")
})

