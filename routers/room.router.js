import {Router} from "express";
import {RoomModel} from "../models/Room.js";


export const roomRouter = Router()

    .get("/", async (req, res) => {
        const rooms = await RoomModel.find();
        res.json({rooms});
    })

    // .delete("/:roomId", async (req, res) => {
    //     await RoomModel.deleteOne({roomId: req.params.roomId});
    //     res.json({data : {message: "Room is deleted."}});
    // })