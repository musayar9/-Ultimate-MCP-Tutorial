"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mcp_1 = require("@modelcontextprotocol/sdk/server/mcp");
const stdio_js_1 = require("@modelcontextprotocol/sdk/server/stdio.js");
const zod_1 = require("zod");
const server = new mcp_1.McpServer({
    name: "my-mcp-tool",
    version: "1.0.0",
    capabilities: {
        tools: {},
    },
});
server.tool("add-numbers", "Add two numbers", {
    a: zod_1.z.number().describe("First Number"),
    b: zod_1.z.number().describe("First number"),
}, ({ a, b }) => {
    return {
        content: [{ type: "text", text: `Total is ${a + b}` }]
    };
});
async function main() {
    const transport = new stdio_js_1.StdioServerTransport();
    await server.connect(transport);
}
main().catch((error) => {
    console.log("Error in main: ", error);
    process.exit(1);
});
