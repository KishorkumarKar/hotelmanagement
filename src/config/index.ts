import type { StringValue } from "ms";
const config = {
    port: process.env.PORT || 2005,
    saltRound: Number(process.env.SALT_ROUND) || 10,
    db_connection: process.env.CONNECTION_STRING || "",
    rabbit_mq_host: process.env.RABBIT_MQ_HOST || "",
    jwtSecret: String(process.env.JWT_SECRET) || "secret",
    jwtExpiryTime: (process.env.JWT_EXPIRY || "1h") as StringValue,
    exchange: process.env.RABBIT_MQ_EXCHANGE_BOOK || "hotel_booked",
    version: "V1",
    check_in_time: process.env.CHECK_IN_TIME || 11,       //in hour
    check_out_time: process.env.CHECK_OUT_TIME || 10,      //in hour
    route: {
        hotel: "hotel",
        room: "room",
        roomType: "roomtype",
        book: "book",
        customer: "customer",
        loginAdmin: "login/admin",
    },
    email: {
        host: (process.env.EMAIL_HOST || "in-v3.mailjet.com") as string,
        port: (process.env.EMAIL_PORT || 587) as number,
        user: (process.env.EMAIL_USER || "in-v3.mailjet.com") as string,
        pass: (process.env.EMAIL_PASS || "in-v3.mailjet.com") as string,
        disable_Email: true,
        fromEmail: process.env.FROM_EMAIL as string,
    },
};

export default config;