import mongoose from "mongoose";
import { IRoom } from "../interface/roomInterface";

interface RoomDocs extends Omit<IRoom, "id">, mongoose.Document {
}
const roomSchema = new mongoose.Schema<RoomDocs>({
    hotel_id: {
        type: mongoose.Schema.ObjectId,
        ref: "Hotel",
        require: true
    },
    room_number: {
        type: String,
        require: true,
        unique: true,
        match: [/^ROOM [a-zA-Z0-9]+$/, "Invalid Room format it should be like ROOM_{text}"],
    },
    room_type_id: {
        type: mongoose.Schema.ObjectId,
        ref: "RoomType",
        require: true
    },
    floor: {
        type: Number,
        require: true
    },
    status: {
        type: Number,
        require: true,
        min: [0, "status must be at least 0"],
        max: [2, "status cannot exceed 1"],
        default: 0,
        description: "0 => not available, 1 => available, 2 => occupied"
    },
    price_per_night: {
        type: Number,
        require: true,
    },
}, {
    timestamps: true
});

// Generic helper type for Mongoose toJSON transform
type ToJSONTransform<T> = (
    doc: T,
    ret: Partial<T> & { _id?: any; id?: any; __v?: number },
    options: Record<string, any>,
) => any;

roomSchema.set("toJSON", {
    transform: ((_doc, returnedObj, option) => {
        returnedObj.id = returnedObj._id;
        delete returnedObj._id;
        delete returnedObj.__v;
        return returnedObj;
    }) as ToJSONTransform<RoomDocs>,
});
export default mongoose.model<RoomDocs>("Room", roomSchema);