import mongoose from "mongoose";
import { IAdminUser } from "../interface/adminUserInterface";
import { hashThePassword } from "../util/manage.passwordUtils";
const adminUserSchema = new mongoose.Schema<IAdminUser>({
    name: {
        type: String,
        required: true,
    },
    user: {
        type: String,
        required: true,
        unique: true,
        match: [/^\S+$/, "Should not have space in user"],
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
});


// Generic helper type for Mongoose toJSON transform
type ToJSONTransform<T> = (
    doc: T,
    ret: Partial<T> & { _id?: any; id?: any; __v?: number },
    options: Record<string, any>,
) => any;

adminUserSchema.set("toJSON", {
    transform: ((_doc, returnedObj, option) => {
        returnedObj.id = returnedObj._id;
        delete returnedObj._id;
        delete returnedObj.__v;
        return returnedObj;
    }) as ToJSONTransform<IAdminUser>,
});

adminUserSchema.pre("save", async function (next) {
  try {
    const teacher = this;
    if (teacher.isModified("password")) {
      teacher.password = hashThePassword(teacher.password);
    }
    next();
  } catch (error: unknown) {
    if (error instanceof Error) {
      next(error);
    } else {
      next(new Error("Unknown error"));
    }
  }
});

export default mongoose.model<IAdminUser>("AdminUser", adminUserSchema);