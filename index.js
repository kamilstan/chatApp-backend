import express from 'express';
import http from 'http';
import {Server} from 'socket.io';
import path from 'path';
import {fileURLToPath} from 'url';
import mongoose from "mongoose";
import {sockets} from './socket/sockets.js';
import cors from "cors";
import {roomRouter} from "./routers/room.router.js";


await mongoose.connect('mongodb+srv://kamilstan:kamilstan@cluster0.nm4lqbx.mongodb.net/?retryWrites=true&w=majority');


const app = express();
const PORT = 8080;

const httpServer = http.createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: ["http://localhost:3000"],
    }
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());

app.get("/", (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
app.use("/rooms", roomRouter);

io.on('connection',  sockets )

httpServer.listen(PORT, () => {
    console.log("Server is running on http://localhost:8080")
})