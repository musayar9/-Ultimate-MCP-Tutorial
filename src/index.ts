import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import * as path from "path";
import * as fs from "fs/promises";
import { fileURLToPath } from "node:url";
import { z } from "zod";

const server = new McpServer({
  name: "my-mcp-tool",
  version: "1.0.0",
});

server.tool(
  "add-numbers",
  "Add two numbers",

  {
    a: z.number().describe("First Number"),
    b: z.number().describe("First number"),
  },

  ({ a, b }) => {
    return {
      content: [{ type: "text", text: `Total is ${a + b}` }],
    };
  },
);

// kullanıcın github repolarınnı github addına göre getirme
server.tool(
  "get_github_repos",
  "Get github repositories from the given usernmae",
  {
    username: z.string().describe("Github username"),
  },

  async ({ username }) => {
    const res = await fetch(`https://api.github.com/users/${username}/repos`, {
      headers: { "User-Agent": "MCP-Server" },
    });

    if (!res.ok) throw new Error("Github API error!");

    const repos = await res.json();

    const repoList = repos
      .map((repo: any, i: number) => `${i + 1}. ${repo.name}`)
      .join("\n\n");

    return {
      content: [
        {
          type: "text",
          text: `Github repositories for ${username}: (${repos.length} repos): \n\n${repoList}`,
        },
      ],
    };
  },
);

server.resource(
  "apartment-rules",
  "rules://all",
  {
    description: "Resource for all apartment rules",
    mimeType: "text/plain",
  },
  async (uri) => {
    const uriString = uri.toString();
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const rules = await fs.readFile(
      path.resolve(__dirname, "../src/data/rules.doc"),
      "utf-8",
    );

    return {
      contents: [
        {
          uri: uriString,
          mimeTtpe: "text/plain",
          text: rules,
        },
      ],
    };
  },
);



server.prompt(
    "explain-sql",
    "Explain the given SQL query",
    {
        sql:z.string().describe("The SQL Query to explain")
    },
    ({sql}) =>{
        return{
            messages:[
                {
                    role:"user",
                    content:{
                        type:"text",
                        text:`Give me a detailed explanation of the following SQL query in plain English: ${sql} Make it very detailed and specific for a beginner to understand`
                    }
                }
            ]
        }
    
    }
    
    
)



async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((error) => {
  console.log("Error in main: ", error);
  process.exit(1);
});
