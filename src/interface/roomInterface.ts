import mongoose from "mongoose";
export interface IRoom {
    id?: string;
    hotel_id: mongoose.Types.ObjectId;
    room_number: string;
    room_type?: string;
    room_type_id: mongoose.Types.ObjectId;
    floor: number,
    status: number,
    price_per_night: number,
    createdAt?: Date;
    updatedAt?: Date;
}