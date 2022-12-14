import {RoomModel} from "../models/Room.js";
import fs from "fs";


export const sockets = (socket) => {
    socket.on('send-message', ({message, roomId}) => {
        console.log('ROOMID', roomId)
        let skt = socket.broadcast;
        skt = roomId ? skt.to(roomId) : skt;
        skt.emit("message-from-server", {message})

    })
    socket.on('start-typing', ({roomId}) => {
        let skt = socket.broadcast;
        skt = roomId ? skt.to(roomId) : skt;
        skt.emit("start-typing-from-server");
    })
    socket.on('stop-typing', ({roomId}) => {
        let skt = socket.broadcast;
        skt = roomId ? skt.to(roomId) : skt;
        skt.emit("stop-typing-from-server");
    })
    socket.on('join-room', ({roomId}) => {
        socket.join(roomId);
    })
    socket.on('new-room-created', ({roomId, userId, roomName}) => {
        const room = new RoomModel({
            name: roomName,
            roomId,
            userId,
        })
        room.save();
        socket.emit("new-room-created", {room});
    })
    socket.on('room-removed', async ({roomId}) => {
        await RoomModel.deleteOne({roomId});
        socket.emit("room-removed", {roomId});
    })
    socket.on('upload', ({data, roomId}) => {
        const fileName = "test.png";
        fs.writeFile(
            "upload/"+ fileName,
            data,
            {encoding: "base64"},
            () => {}
        );
        socket.to(roomId).emit("uploaded", {buffer: data.toString("base64")});
    })
    socket.on('disconnect', (data) => {
        // const message = 'user left';
        // socket.to(roomId).emit("disconnect",{message});
        console.log('user left')

    })
}