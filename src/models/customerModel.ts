import mongoose from "mongoose";
import { ICustomer } from "../interface/customerInterface";

interface ICustomerDoc extends Omit<ICustomer, "id">, mongoose.Document {

}
const customerSchema = new mongoose.Schema<ICustomerDoc>({
    first_name: {
        type: String,
        require: true,
    },
    last_name: {
        type: String,
        require: true
    },
    age: {
        type: Number
    },
    email: {
        type: String
    },
    phone: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    id_type: {
        type: String,
        require: true
    },
    id_number: {
        type: String,
        require: true
    }
},{
    timestamps:true
});

customerSchema.index({ emil: 1, phone: 1 }, { unique: true });


// Generic helper type for Mongoose toJSON transform
type ToJSONTransform<T> = (
    doc: T,
    ret: Partial<T> & { _id?: any; id?: any; __v?: number },
    options: Record<string, any>,
) => any;

customerSchema.set("toJSON", {
    transform: ((_doc, returnedObj, option) => {
        returnedObj.id = returnedObj._id;
        returnedObj.name = `${returnedObj.first_name} ${returnedObj.last_name}`;
        delete returnedObj._id;
        delete returnedObj.__v;
        return returnedObj;
    }) as ToJSONTransform<ICustomerDoc>,
});


export default mongoose.model<ICustomerDoc>("Customer", customerSchema);