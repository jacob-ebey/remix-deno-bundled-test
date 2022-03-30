import { serve } from "https://deno.land/std@0.114.0/http/server.ts";
import mime from "https://esm.sh/mime";

import { createRequestHandler } from "@remix-run/server-runtime";
import * as build from "@remix-run/dev/server-build";

const remixHandler = createRequestHandler(build, process.env.NODE_ENV);

/**
 * @param {Request} request
 */
async function handler(request) {
  try {
    try {
      let url = new URL(request.url);
      let staticFile = "./public" + url.pathname;
      let file = await Deno.readFile(staticFile);
      return new Response(file, {
        headers: {
          "Content-Type": mime.getType(staticFile),
        },
      });
    } catch {}

    let response = await remixHandler(request);
    return response;
  } catch (err) {
    console.log(err);
  }
}

console.log("Starting server on http://localhost:8000");
serve(handler);
