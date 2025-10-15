import mongoose from "mongoose";
import { IHotel } from "../interface/hotelInterface";
interface HotelDocs extends Omit<IHotel, "id">, mongoose.Document {
}
const hotelSchema = new mongoose.Schema<HotelDocs>({
    name: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true,
        unique: true,
        match: [/^HOTEL_[a-zA-Z0-9]+$/, "Invalid Code format it should be like HOTEL_{text}"],
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    street: {
        type: String,
        required: true,
    },
    pin: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        min: [0, "Rating must be at least 0"],
        max: [5, "Rating cannot exceed 5"],
        default: null,
        validate: {
            validator: function (v: number) {
                return v === null || v === undefined || (v >= 0 && v <= 5);
            },
            message: "Rating must be between 0 and 5"
        },
    }
},{
  timestamps:true,
});

// Generic helper type for Mongoose toJSON transform
type ToJSONTransform<T> = (
    doc: T,
    ret: Partial<T> & { _id?: any; id?: any; __v?: number },
    options: Record<string, any>,
) => any;

hotelSchema.set("toJSON", {
    transform: ((_doc, returnedObj, option) => {
        returnedObj.id = returnedObj._id;
        delete returnedObj._id;
        delete returnedObj.__v;
        return returnedObj;
    }) as ToJSONTransform<HotelDocs>,
});

export default mongoose.model<HotelDocs>(
    "Hotel",
    hotelSchema,
);