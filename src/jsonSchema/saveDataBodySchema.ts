export const saveDataBodySchemav3 = {
    title: "Performance measurement",
    type: "object",
    properties: {
        itemId: {
            type: "string",
        },
        samples: {
            type: "array",
            maxItems: 500,
            items: {
                type: "object",
                required: ["timeStamp", "elapsed", "label", "responseCode",
                    "responseMessage", "success", "bytes", "allThreads", "latency", "connect"],
                properties: {
                    timestamp: {
                        type: "number",
                    },
                    elapsed: {
                        type: "number",
                    },
                    label: {
                        type: "string",
                    },
                    responseCode: {
                        type: "string",
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
                    sentBytes: {
                        type: "number",
                    },
                    grpThreads: {
                        type: "number",
                    },
                    allThreads: {
                        type: "number",
                    },
                    latency: {
                        type: "number",
                    },
                    hostname: {
                        type: "string",
                    },
                    connect: {
                        type: "number",
                    },
                    failureMessage: {
                        type: "string",
                    },
                },
            },
        },
    },
    required: ["itemId", "samples"],
}

export const saveDataBodySchemaV4 = {
    title: "Performance measurement",
    type: "object",
    properties: {
        itemId: {
            type: "string",
        },
        samples: {
            type: "array",
            maxItems: 500,
            items: {
                type: "object",
                required: ["timeStamp", "elapsed", "label", "responseCode",
                    "responseMessage", "success", "bytes", "allThreads", "latency", "connect", "grpThreads"],
                properties: {
                    timestamp: {
                        type: "number",
                    },
                    elapsed: {
                        type: "number",
                    },
                    label: {
                        type: "string",
                    },
                    responseCode: {
                        type: "string",
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
                    sentBytes: {
                        type: "number",
                    },
                    grpThreads: {
                        type: "number",
                    },
                    allThreads: {
                        type: "number",
                    },
                    latency: {
                        type: "number",
                    },
                    hostname: {
                        type: "string",
                    },
                    connect: {
                        type: "number",
                    },
                    failureMessage: {
                        type: "string",
                    },
                },
            },
        },
        monitor: {
            type: "array",
            maxItems: 100,
            items: {
                type: "object",
                required: ["timestamp", "name", "cpu", "mem"],
                properties: {
                    cpu: {
                        type: "number",
                    },
                    mem: {
                        type: "number",
                    },
                    name: {
                        type: "string",
                    },
                    timestamp: {
                        type: "number",
                    },
                },
            },
        },
    },
    required: ["itemId", "samples"],
}
