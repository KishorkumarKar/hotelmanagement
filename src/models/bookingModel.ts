import mongoose from "mongoose";
import { IBooking } from "../interface/bookingInterface";

const customerSchema = new mongoose.Schema<IBooking["customer"]>({
    customer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "RoomType",
        require: true
    },
    first_name: {
        type: String,
        require: true,
    },
    last_name: {
        type: String,
        require: true
    },
    id_type: {
        type: String,
        require: true,
        description: "Like voter or adhar"
    },
    id_number: {
        type: String,
        require: true,
        description: "number in id_type"
    },
    email: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
}, { _id: false })

const paymentSchema = new mongoose.Schema<IBooking["payment"]>({
    payment_status: {
        type: String,
        required: true,
        enum: ["paid", "refunded", "due"],
    },
    payment_method: {
        type: String,
        required: true,
        enum: ["cash", "online"],
    },
    transaction_id: {
        type: String,
    },
    payment_date: {
        type: Date,
        default: null
    },
    amount_paid: {
        type: Number,
        default: 0
    },
    amount_due: {
        type: Number,
        default: 0
    },
    refund_date: {
        type: Date,
        default: null
    },
    amount_refunded: {
        type: Number,
        default: 0
    },
});

interface IBookingSchema extends Omit<IBooking, "id">, mongoose.Document {

}
const bookingSchema = new mongoose.Schema<IBookingSchema>({
    customer: {
        type: customerSchema
    },
    payment: {
        type: paymentSchema
    },
    hotel_id: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "Hotel"
    },
    hotel_code: {
        type: String,
        require: true
    },
    check_in: {
        type: Date,
        require: true
    },
    check_out: {
        type: Date,
        require: true
    },
    status: {
        type: Number,
        require: true,
        min: [1, "status must be at least 1"],
        max: [3, "status cannot exceed 3"],
        default: 1,
        description: "1 => Booked, 2 => Paid, 3 => cancel/refunded"
    },

});


// Generic helper type for Mongoose toJSON transform
type ToJSONTransform<T> = (
    doc: T,
    ret: Partial<T> & { _id?: any; id?: any; __v?: number },
    options: Record<string, any>,
) => any;

bookingSchema.set("toJSON", {
    transform: ((_doc, returnedObj, option) => {
        returnedObj.id = returnedObj._id;
        delete returnedObj._id;
        delete returnedObj.__v;
        return returnedObj;
    }) as ToJSONTransform<IBookingSchema>,
});


export default mongoose.model<IBookingSchema>("Booking", bookingSchema);