import * as fastify from "fastify"
import { saveDataBodySchema } from "../../../jsonSchema/saveDataBodySchema"
import * as jwt from "jsonwebtoken"
import { HttpStatusCode } from "../../../models/HttpStatusCode"
import { MongoUtils } from "../../../utils/MongoUtils"

const JWT_TOKEN = process.env.JWT_TOKEN

export const logSamples = async (app: fastify.FastifyInstance) => {
    await app.post<{ Body: SaveDataRequestBody; Headers: SaveDataHeaders }>("/log-samples",
        {
            preValidation: async (request, reply) => {
                try {
                    const token = request.headers["x-access-token"]
                    await jwt.verify(token, JWT_TOKEN)
                } catch(error) {
                    reply.code(HttpStatusCode.Forbidden).send()
                }
            },
            schema: {
                body: saveDataBodySchema,
            },
        },
        async (request, response) => {
            const jtlDb = MongoUtils.getClient().db("jtl-data")
            const collection = jtlDb.collection("data-chunks")
            try {
                await collection.insertOne(request.body)
            } catch(ex) {
                request.log.error(ex)
                return response.code(HttpStatusCode.ServerError).send(`Error while saving data to the DB`)
            }
            response.code(HttpStatusCode.Created).send()
        })
}

interface SaveDataRequestBody {
    dataId: string
    measurements: [{
        timeStamp: string
        elapsed: number
        label: string
        responseCode: number
        responseMessage: string
        threadName?: string
        success: boolean
        bytes: number
        grpThreads?: number
        allThreads: number
        Latency?: number
        Hostname?: string
        Connect?: number
    }]
}

interface SaveDataHeaders {
    "x-access-token": string
}

