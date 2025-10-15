import mongoose from "mongoose";
import { IRoomType } from "../interface/roomTypeInterface";

interface roomTypeDoc extends Omit<IRoomType, "id">, mongoose.Document {

}

const roomTypeSchema = new mongoose.Schema<roomTypeDoc>({
    type_name: {
        type: String,
        required: true,
        unique: true,
    },
    max_occupation: {
        type: Number,
        required: true,
        description: "no. of person can stay."
    },
    description: {
        type: String,
    },
},{
    timestamps:true
});


// Generic helper type for Mongoose toJSON transform
type ToJSONTransform<T> = (
    doc: T,
    ret: Partial<T> & { _id?: any; id?: any; __v?: number },
    options: Record<string, any>,
) => any;

roomTypeSchema.set("toJSON", {
    transform: ((_doc, returnedObj, option) => {
        returnedObj.id = returnedObj._id;
        delete returnedObj._id;
        delete returnedObj.__v;
        return returnedObj;
    }) as ToJSONTransform<roomTypeDoc>,
});

export default mongoose.model<roomTypeDoc>("RoomType", roomTypeSchema);