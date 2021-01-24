export const saveDataBodySchema = {
    title: "Performance measurement",
    type: "object",
    properties: {
        dataId: {
            type: "string",
        },
        measurements: {
            type: "array",
            maxItems: 500,
            items: {
                type: "object",
                properties: {
                    timeStamp: {
                        type: "string",
                    },
                    elapsed: {
                        type: "number",
                    },
                    label: {
                        type: "string",
                    },
                    responseCode: {
                        type: "number",
                    },
                    responseMessage: {
                        type: "string",
                    },
                    threadName: {
                        type: "string",
                    },
                    success: {
                        type: "boolean",
                    },
                    bytes: {
                        type: "number",
                    },
                    grpThreads: {
                        type: "number",
                    },
                    allThreads: {
                        type: "number",
                    },
                    Latency: {
                        type: "number",
                    },
                    Hostname: {
                        type: "string",
                    },
                    Connect: {
                        type: "string",
                    },
                },
            },
        },
    },
    required: ["dataId", "measurements"],
}
