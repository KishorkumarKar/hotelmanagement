import mongoose from "mongoose";

export interface IAdminUser {
    name: string,
    user: string,
    password: string,
    email: string,
}