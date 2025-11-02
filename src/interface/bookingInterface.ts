import mongoose from "mongoose";

export interface IBookingCustomer {
    customer_id: mongoose.Schema.Types.ObjectId,
    first_name: string,
    last_name: string,
    id_type: string,
    id_number: string,
    email: string,
    phone: string,
    address: string,
}
export interface IBookingPayment {
    id?: string,
    payment_status: string,
    payment_method: string,
    transaction_id?: string,
    payment_date: Date,
    amount_paid?: number,
    amount_due?: number,
    refund_date?: Date,
    amount_refunded?: number,
}
export interface IBooking {
    id?: string,
    customer: IBookingCustomer,
    payment: IBookingPayment,
    hotel_id: mongoose.Schema.Types.ObjectId,
    hotel_code: string,
    hotel_name: string,
    room_number: string,
    room_type: string,
    room_id: mongoose.Schema.Types.ObjectId,
    check_in: Date,
    check_out: Date,
    status: number,
}
/**
 * Used when booking process happen
 */
export interface IBookingProcess {
    customer_id: string,
    payment_method: string,
    hotel_code: string,
    check_in: string,
    check_out: string,
    room_type: string,
}
/**
 * Booking Email Data
 */
export interface IBookingEmailQueue {
    customer: string,
    customer_email: string,
    customer_phone: string,
    room_type: string,
    room_id: mongoose.Schema.Types.ObjectId | string,
    hotel: string,
    hotel_name: string,
    check_id: Date | string,
    check_out: Date | string,
}