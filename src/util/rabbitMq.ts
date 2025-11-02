import amqp, { Channel, ConsumeMessage, Message } from "amqplib";
import logger from "./logger";
import config from "../config";

let channel: Channel | null = null;
let defaultExchange = config.exchange;
let defaultQueue = "test_" + defaultExchange;
const getConnection = async () => {
    try {
        const connect = await amqp.connect(config.rabbit_mq_host);
        channel = await connect.createChannel();

        connect.on("error", (err) => {
            console.error("Channel error:", err);
        });
        logger.info(`rabinMQ connected to URl ${config.rabbit_mq_host}`);
        return channel;
    } catch (error) {
        logger.error(error);
        return null;
    }
};

const pushToQue = async (
    message: {},
    routeKey: string,
    queue = defaultQueue,
    exchange = defaultExchange,
) => {
    console.log("========sssss====", exchange, queue, routeKey);
    try {
        if (channel === null) {
            channel = await getConnection();
        }

        if (channel) {

            console.log("============", exchange, queue, routeKey);

            await channel.assertExchange(exchange, "topic", { durable: false });
            await channel.assertQueue(queue, { durable: false });
            await channel.bindQueue(queue, exchange, routeKey);
            await channel.publish(
                exchange,
                routeKey,
                Buffer.from(JSON.stringify(message)),
            );
        }
        logger.info({ message: "post queue inserted", ...message });
    } catch (error) {
        logger.error(error);
    }
};


const consumeMessage = async (queue: string, exchange: string, routeKey: string, callBack: (arg: any) => void) => {
    try {
        if (!channel) {
            await getConnection();
        }
        if (channel) {
            await channel.assertExchange(exchange, "topic", { durable: false });
            await channel.assertQueue(queue, { durable: false });
            await channel.bindQueue(queue, exchange, routeKey);
            await channel.consume(queue, function (msg) {
                if (msg) {
                    callBack(msg);
                    channel?.ack(msg);
                }
            });
        }
    } catch (error) {
        logger.error(error);
    }
};
export {
    getConnection,
    pushToQue,
    consumeMessage,
}
