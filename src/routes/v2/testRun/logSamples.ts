import * as fastify from "fastify"
import { saveDataBodySchemav2 } from "../../../jsonSchema/saveDataBodySchema"
import * as jwt from "jsonwebtoken"
import { HttpStatusCode } from "../../../models/HttpStatusCode"
import * as pgp from "pg-promise"
import { db } from "../../../utils/db"

const pg = pgp()

const JWT_TOKEN = process.env.JWT_TOKEN

export const logSamples = async (app: fastify.FastifyInstance) => {
  app.post<{ Body: SaveDataRequestBody; Headers: SaveDataHeaders }>("/log-samples",
    {
      preValidation: async (request, reply) => {
        try {
          const token = request.headers["x-access-token"]
          await jwt.verify(token, JWT_TOKEN)
        } catch (error) {
          reply.code(HttpStatusCode.Forbidden).send()
        }
      },
      schema: {
        body: saveDataBodySchemav2,
      },
    },
    async (request, response) => {
      try {
        const columnSet = new pg.helpers.ColumnSet([
          "elapsed", "success", "bytes", "label",
          {
            name: "timestamp",
            prop: "timeStamp",
          },
          {
            name: "sent_bytes",
            prop: "sentBytes",
            def: null,
          },
          {
            name: "connect",
            prop: "connect",
          }, {
            name: "hostname",
            prop: "hostname",
            def: null,
          }, {
            name: "status_code",
            prop: "responseCode",
          },
          {
            name: "all_threads",
            prop: "allThreads",
          },
          {
            name: "grp_threads",
            prop: "grpThreads",
          }, {
            name: "latency",
            prop: "latency",
          },
          {
            name: "response_message",
            prop: "responseMessage",
          },
          {
            name: "item_id",
            prop: "itemId",
          },
          {
            name: "sut_hostname",
            prop: "sutHostname",
            def: null,
          },
        ], { table: new pg.helpers.TableName({ table: "samples", schema: "jtl" }) })

        const dataToBeSaved: SamplesDataInsert[] = request.body.samples.map((sample) => {
          const sampleCopy = Object.assign({}, sample)
          const transformedSample: TransformedSample = Object.assign(sampleCopy,
            { timeStamp: new Date(sampleCopy.timeStamp) })
          return Object.assign(transformedSample, { itemId: request.body.itemId })
        })

        const query = pg.helpers.insert(dataToBeSaved, columnSet)
        await db.none(query)
      } catch (ex) {
        request.log.error(ex)
        return response.code(HttpStatusCode.ServerError).send(`Error while saving data to the DB`)
      }
      response.code(HttpStatusCode.Created).send()
    })
}

interface SaveDataRequestBody {
  itemId: string
  samples: SamplesRequestBody[]
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

