import * as fastify from "fastify"
import { saveDataBodySchemav3 } from "../../../jsonSchema/saveDataBodySchema"
import * as jwt from "jsonwebtoken"
import { HttpStatusCode } from "../../../models/HttpStatusCode"
import * as pgp from "pg-promise"
import { db } from "../../../utils/db"
import { MonitorColumnSet, SamplesColumnSet } from "../../../db/columnSets"

const pg = pgp()

const JWT_TOKEN = process.env.JWT_TOKEN

// eslint-disable-next-line require-await
export const logSamplesV3 = async (app: fastify.FastifyInstance): Promise<void> => {
  app.post<{ Body: SaveDataRequestBody; Headers: SaveDataHeaders }>("/log-samples",
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
        body: saveDataBodySchemav3,
      },
    },
    async (request, response) => {
      try {

        const monitorDataToBeSaved: TransformedMonitor[] = request.body.monitor?.map((monitor) => {
          const transformedMonitor = Object.assign(monitor, {
            timestamp: new Date(monitor.timestamp),
            itemId: request.body.itemId,
          })
          return transformedMonitor
        })

        const dataToBeSaved: SamplesDataInsert[] = request.body.samples.map((sample) => {
          const sampleCopy = Object.assign({}, sample)
          const transformedSample: TransformedSample = Object.assign(sampleCopy,
            { timeStamp: new Date(sampleCopy.timeStamp) })
          return Object.assign(transformedSample, { itemId: request.body.itemId })
        })
        const query = pg.helpers.insert(dataToBeSaved, SamplesColumnSet)
        await db.none(query)
        if (Array.isArray(monitorDataToBeSaved) && monitorDataToBeSaved.length > 0) {
          const monitorQuery = pg.helpers.insert(monitorDataToBeSaved, MonitorColumnSet)
          await db.none(monitorQuery)
        }
      } catch(ex) {
        request.log.error(ex)
        return response.code(HttpStatusCode.ServerError).send(`Error while saving data to the DB`)
      }
      response.code(HttpStatusCode.Created).send()
    })
}

interface SaveDataRequestBody {
  itemId: string
  samples: SamplesRequestBody[]
  monitor?: MonitorRequestBody[]
}

interface SamplesRequestBody {
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
  failureMessage: string
}

interface SamplesDataInsert extends TransformedSample {
  itemId: string
}


interface TransformedSample extends Omit<SamplesRequestBody, "timeStamp"> {
  timeStamp: Date
}

interface SaveDataHeaders {
  "x-access-token": string
}

interface MonitorRequestBody {
  cpu: number
  name: string
  timestamp: number
}

interface TransformedMonitor extends Omit<MonitorRequestBody, "timestamp"> {
  timestamp: Date
}
