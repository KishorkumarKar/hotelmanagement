import mongoose from "mongoose";

export interface IAdminUser {
    name: string,
    user: string,
    password: string,
    email: string,
}
export interface IAdminUserLogin {
    user: string,
    password: string
}