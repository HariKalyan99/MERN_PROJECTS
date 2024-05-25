require('dotenv').config();
const http = require("http");
const express = require("express");
const port1 = 8081;
const currencyInfo = require('../BACKEND/json/currencies.json');
const userInfo = require('../BACKEND/json/users.json');
const userRouter = require("./routes/users.routes");
const currencyRouter = require("./routes/currencies.routes");
const verifyAuth = require("./middlewares/verifyauth");
const serverInfo = {
    server: "Node-http server",
    date: new Date().toDateString(),
    time: new Date().toTimeString()
}

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

server.listen(port1, () => {
    console.log(`Listening on port ${port1}`)
})

const port2 = 8082;

const userExpress = express();
userExpress.use(verifyAuth);
userExpress.use(express.json());
userExpress.use("/", userRouter);

userExpress.listen(port2, () => {
    console.log(`Listening to port: ${port2} of user-Data`);
})



const port3 = 8083;

const currencyExpress = express();
currencyExpress.use(express.json());
currencyExpress.use("/", currencyRouter);

currencyExpress.listen(port3, () => {
    console.log(`Listening to port: ${port3} of currency-Data`);
})