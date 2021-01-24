import * as fastify from "fastify"
import * as fastJson from "fast-json-stringify"
import { MQService } from "../../../utils/MQService"
import { saveDataBodySchema } from "../../../jsonSchema/saveDataBodySchema"
import * as jwt from "jsonwebtoken"
import { HttpStatusCode } from "../../../models/HttpStatusCode"


const stringify = fastJson(saveDataBodySchema)
const QUEUE_NAME = "samples"

export const testRunSaveData = (app: fastify.FastifyInstance) => {
    app.post<{ Body: SaveDataRequestBody; Headers: SaveDataHeaders }>("/save-data",
    {
        preValidation: async (request, reply) => {
            try {
                const jwtToken = request.headers["x-access-token"]
                await jwt.verify(jwtToken, "3nHs5Px4pEtmsxPd")
            } catch(error) {
                reply.code(HttpStatusCode.Forbidden).send()
            }
        },
    },
     async (request, response) => {
        try {
            await MQService.sendToQueue(QUEUE_NAME, Buffer.from(stringify(request.body)))
        } catch(ex) {
            return response.code(HttpStatusCode.ServerError).send(ex)
        }
        response.code(HttpStatusCode.Created).send()
    })
}

interface SaveDataRequestBody {
    dataId: string
    measurement: {
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
    }
}

interface SaveDataHeaders {
    "x-access-token": string
}

