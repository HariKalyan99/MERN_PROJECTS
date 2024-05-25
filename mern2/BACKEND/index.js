require('dotenv').config();
const mongoose = require('mongoose');

const http = require("http");
const express = require("express");
const port1 = 8081;
const currencyInfo = require('../BACKEND/json/currencies.json');
const userInfo = require('../BACKEND/json/users.json');
const userRouter = require("./routes/users.routes");
const currencyRouter = require("./routes/currencies.routes");
const verifyAuth = require("./middlewares/verifyauth");
const postRouter = require('./routes/posts.routes');
const serverInfo = {
    server: "Node-http server",
    date: new Date().toDateString(),
    time: new Date().toTimeString()
}
const DB_URI = process.env.url;
const server = http.createServer((request, response) => {
    if(request.method === "GET"){
        const id = request.url.split("/")[2];
        const matchId = currencyInfo.data.find(x => x.id?.toLowerCase() === id?.toLowerCase());
        if(request.url === "/"){
            response.write("<h1>Welcome to the node-http server</h1>");
            response.end();
        }else if(request.url === "/server"){
            response.writeHead(200, {'Content-Type': 'application/json'});
            response.write(JSON.stringify(serverInfo))
            response.end();
        }else if(request.url === "/currencies"){
            response.writeHead(200, {'Content-Type': 'application/json'});
            response.write(JSON.stringify(currencyInfo.data))
            response.end();
        }else if(request.url === "/users"){
            response.writeHead(200, {'Content-Type': 'application/json'});
            response.write(JSON.stringify(userInfo.data))
            response.end();
        }else if(matchId !== undefined && request.url === `/currencies/${matchId.id?.toLowerCase()}`){
            response.writeHead(200, {'Content-Type': 'application/json'});
            response.write(JSON.stringify(matchId));
            response.end();
        }else{
            response.write("<h1>PAGE NOT FOUND</h1>");
            response.end();
        }
    }else if(request.method === "POST"){
        if(request.url === "/currencies/new"){
            let body = "";
        request.on("error", (error) => {
            console.log("Error", error);
        }).on("data", (chunk) => {
            body+=chunk;
        }).on("end", () => {
            body = JSON.parse(body);
            currencyInfo.data = [body, ...currencyInfo.data];
            response.writeHead(200, {'Content-Type': 'application/json'});
            response.write(JSON.stringify(currencyInfo.data));
            response.end();
        })
        }else{
            response.writeHead(304, {'Content-type': 'application/json'});
            response.write(JSON.stringify({message: "Currency has not been created"}));
            response.end();
        }
    }

})






const port2 = 8082;

const userExpress = express();
userExpress.use(verifyAuth);
userExpress.use(express.json());
userExpress.use("/", userRouter);





const port3 = 8083;

const currencyExpress = express();
currencyExpress.use(express.json());
currencyExpress.use("/", currencyRouter);

const port4 = 8084;

const postExpress = express();

postExpress.use(express.json());
postExpress.use("/", postRouter);




mongoose.connect(DB_URI).then(() => {
    console.log("Successfully Connected to mongo server");
    server.listen(port1, () => {
        console.log(`Listening on port ${port1}`)
    })
    userExpress.listen(port2, () => {
        console.log(`Listening to port: ${port2} of user-Data`);
    })
    currencyExpress.listen(port3, () => {
        console.log(`Listening to port: ${port3} of currency-Data`);
    })

    postExpress.listen(port4, () => {
        console.log(`Listening to node-express-mongoose server on port: ${port4}`)
    })

}).catch(() => {
    console.log("Connection unsuccessfull")
})
