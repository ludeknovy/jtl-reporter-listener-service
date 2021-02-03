import * as fastify from "fastify"
import { samplesRouter } from "./v1/testRun/samplesRouter"

export default async (app: fastify.FastifyInstance) => {
    await samplesRouter(app)
}
