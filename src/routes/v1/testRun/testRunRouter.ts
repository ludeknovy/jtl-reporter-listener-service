import * as fastify from "fastify"

import { testRunSaveData } from "./testRunSave"

export const testRunRouter = (app: fastify.FastifyInstance) => {

    app.register(testRunSaveData, { prefix: "/api/v1/test-run" })

}
