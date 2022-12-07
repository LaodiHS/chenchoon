const express = require("express")
const path = require('path')
const { express_socket_io } = require("../modules/socket_connect.js")
const { search } = require("../modules/searchDictionaries.js")
const app = express();
const fs = require("fs");

require('dotenv').config();


// const static_files = path.join(__dirname, process.env.STATIC_FILES)

const html = path.join(process.env.HTML || "../html", "index.html");

async function start_server() {
    //await minify_files();
//   await minify_files(); 
    app.use(express.static("./node_modules/socket.io-client/dist"))
    // app.use(express.static("./.file_system_root/dic")) 
    app.use(express.static("./.file_system_root/static_files"))
    app.use(express.static("./client_javascript"))
    app.use(express.static("./styles"))
    app.use(express.static("./images"))


    app.get("/", (req, res) => {
        try {
            const read_stream = fs.createReadStream(html);
            read_stream.pipe(res);
        } catch (error) {
            console.error("error", error)
        }
    });

    app.get("/search/:api/:word/:limit", search)


    express_socket_io(app);




}


start_server();

