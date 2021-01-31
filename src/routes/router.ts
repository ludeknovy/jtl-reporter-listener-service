import * as fastify from "fastify"
import { testRunRouter } from "./v1/testRun/testRunRouter"

export default async (app: fastify.FastifyInstance) => {
    await testRunRouter(app)
}
