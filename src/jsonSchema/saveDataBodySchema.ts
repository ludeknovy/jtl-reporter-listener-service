export const saveDataBodySchema = {
    title: "Performance measurement",
    type: "object",
    properties: {
        dataId: {
            type: "string",
        },
        samples: {
            type: "array",
            maxItems: 500,
            items: {
                type: "object",
                required: ["timeStamp", "elapsed", "label", "responseCode",
                    "responseMessage", "success", "bytes", "allThreads", "Latency", "Connect"],
                properties: {
                    timeStamp: {
                        type: "number",
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
                        type: "number",
                    },
                },
            },
        },
    },
    required: ["dataId", "samples"],
}
