import * as fastify from "fastify"

import { testRunSaveData } from "./testRunSave"

export const testRunRouter = async (app: fastify.FastifyInstance) => {
    app.register(await testRunSaveData, { prefix: "/api/v1/test-run" })
}
