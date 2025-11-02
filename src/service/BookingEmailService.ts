import config from "../config";
import { IBookingEmailQueue } from "../interface/bookingInterface";
import { hotelBookingEmailTemplate } from "../util/emailTemplate.util";
import logger from "../util/logger";
import { consumeMessage } from "../util/rabbitMq";
import { emailSeder } from "./mail.service";

export const bookEmail = (message: any) => {
    let bookEmailDetails: IBookingEmailQueue = JSON.parse(message.content.toString());
    logger.info(bookEmailDetails);
    new Intl.DateTimeFormat()
    let from = dateFormat(new Date(bookEmailDetails.check_id));
    let to = dateFormat(new Date(bookEmailDetails.check_out));
    const emailTemplate = hotelBookingEmailTemplate(bookEmailDetails.customer, bookEmailDetails.room_type, bookEmailDetails.hotel_name, from, to);
    emailSeder(bookEmailDetails.customer_email, `Booking Confirm ${from} to  ${to} `, emailTemplate);
}
export const consumeBookEmail = async () => {
    let exchange = config.exchange;
    consumeMessage(
        "test_" + exchange,
        exchange,
        "booked_email",
        bookEmail,
    );
};

/* export function hotelBookingEmail(bookEmailDetails: IBookingEmailQueue) {
 bookEmailDetails= {
        customer_email: 'john115@yopmail.com',
        customer_phone: '+1 6421874526',
        customer: 'Test....',
        room_type: 'Deluxe room',
        room_id: '68f1c1ceb6aecd9f29bda20d',
        hotel: 'HOTEL_01',
        hotel_name: 'Hotel test',
        check_id: '2025-10-26T12:00:00.000Z',
        check_out: '2025-10-27T10:00:00.000Z'
    };

    let from = dateFormat(new Date(bookEmailDetails.check_id));
    let to = dateFormat(new Date(bookEmailDetails.check_out));
    const emailTemplate = hotelBookingEmailTemplate(bookEmailDetails.customer, bookEmailDetails.room_type, bookEmailDetails.hotel_name, from, to);
    console.log(from, to);
} */

const dateFormat = (date: Date) => {
    return new Intl.DateTimeFormat("en-IN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    }).format(date);
}
