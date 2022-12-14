import mongoose from 'mongoose';
const { Schema } = mongoose;

const roomsSchema = new Schema({
    roomId:  String,
    name: String,
    userId: String,

});

export const RoomModel = mongoose.model('Room', roomsSchema);