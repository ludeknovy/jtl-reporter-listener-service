/* eslint-disable no-console */
import { connect as connection } from "amqplib"

const MQ_CONNECTION_STRING = process.env.MQ_CONNECTION_STRING || "amqp://localhost"

let channel

export class MQService {

    static async connect() {
        try {
            const mqConnection = await connection(MQ_CONNECTION_STRING)
            channel = await mqConnection.createChannel()
            console.info("Connected to RabbitMQ")
        } catch(error) {
            console.error(`Error while connecting to RabbitMQ: ${error}`)
            process.exit(1)
        }
    }

    static getChannel() {
        return channel
    }

    static async sendToQueue(queueName: string, data) {
        try {
            await channel.sendToQueue(queueName, data)
        } catch(error) {
            throw new Error(`Error while publishing message to the queue: ${queueName} ${error}`)
        }
    }
}
