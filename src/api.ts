import Router from "@koa/router";
import Koa from "koa";
import { proxyToFluxer, proxyToFluxerJSON, setHeaders } from "./proxy.ts";
import { LOCAL_WEBSOCKET_HOST } from "./constants.ts";
import {
  transformMessageF2D,
  transformProfileF2D,
  transformUserSettingsToProtoF2D,
} from "./gateway/transformerF2D.ts";

export const apiRouter = new Router({ prefix: "/api/v:version" });

function isOK(status: number) {
  return status >= 200 && status < 300;
}

apiRouter.get("/gateway", (ctx) => {
  ctx.body = { url: `ws://${LOCAL_WEBSOCKET_HOST}` };
});

const trackingHandler = (ctx: Koa.Context) => {
  ctx.status = 204;
};
apiRouter.all("/science", trackingHandler);
apiRouter.all("/track", trackingHandler);

apiRouter.post("/metrics/v2", async (ctx) => {
  ctx.status = 204;
});

apiRouter.get("/guilds/:guildId/integrations", (ctx) => {
  ctx.body = [];
});

function makeSimpleBodyTransformer(transformer: (body: any) => any) {
  return async (ctx: Koa.Context) => {
    const { status, headers, body } = await proxyToFluxerJSON(ctx);
    ctx.status = status;
    setHeaders(ctx, headers);

    if (isOK(status) && body) {
      ctx.body = transformer(body);
    } else {
      ctx.body = body;
    }
  };
}

apiRouter.get(
  "/channels/:channelId/messages",
  makeSimpleBodyTransformer((body) => body.map(transformMessageF2D)),
);

apiRouter.post("/channels/:channelId/messages/:messageId/ack", async (ctx) => {
  const { status, headers, body } = await proxyToFluxerJSON(ctx);
  ctx.status = status;
  setHeaders(ctx, headers);
  if (body) {
    ctx.set("Content-Type", "application/json");
    ctx.body = { token: null };
    ctx.status = 200;
  }
});

apiRouter.get(
  "/users/:userId/profile",
  makeSimpleBodyTransformer(transformProfileF2D),
);

apiRouter.get("/users/@me/settings-proto/1", async (ctx) => {
  const { status, headers, body } = await proxyToFluxerJSON(
    ctx,
    "users/@me/settings",
    { method: "GET", body: undefined },
  );
  ctx.status = status;
  setHeaders(ctx, headers);
  if (isOK(status) && body) {
    ctx.body = { settings: transformUserSettingsToProtoF2D(body) };
  }
});

apiRouter.get("/users/@me/settings-proto/2", async (ctx) => {
  const { status, headers, body } = await proxyToFluxerJSON(
    ctx,
    "users/@me/settings",
    { method: "GET", body: undefined },
  );
  ctx.status = status;
  setHeaders(ctx, headers);
  if (body) {
    ctx.body = { settings: transformUserSettingsToProtoF2D(body) };
  }
});

apiRouter.patch("/users/@me/settings-proto/1", async (ctx) => {
  const { status, headers, body } = await proxyToFluxerJSON(
    ctx,
    "users/@me/settings",
    { method: "GET", body: undefined },
  );
  ctx.status = status;
  setHeaders(ctx, headers);
  if (body) {
    ctx.body = { settings: transformUserSettingsToProtoF2D(body) };
  }
});

apiRouter.patch("/users/@me/settings-proto/2", async (ctx) => {
  const { status, headers, body } = await proxyToFluxerJSON(
    ctx,
    "users/@me/settings",
    { method: "GET", body: undefined },
  );
  ctx.status = status;
  setHeaders(ctx, headers);
  if (body) {
    ctx.body = { settings: transformUserSettingsToProtoF2D(body) };
  }
});

apiRouter.get("/users/@me/affinities/users", async (ctx) => {
  ctx.body = {
    user_affinities: [],
  };
});

apiRouter.get("/users/@me/affinities/v2/users", async (ctx) => {
  ctx.body = {
    user_affinities: [],
  };
});

apiRouter.get("/users/@me/affinities/guilds", async (ctx) => {
  ctx.body = {
    guild_affinities: [],
  };
});

apiRouter.get("/users/@me/affinities/channels", async (ctx) => {
  ctx.body = {
    channel_affinities: [],
  };
});

apiRouter.get("/discoverable-guilds", async (ctx) => {
  const { status, headers, body } = await proxyToFluxerJSON(
    ctx,
    "discovery/guilds?" + ctx.querystring,
    { method: "GET", body: undefined },
  );
  ctx.status = status;
  setHeaders(ctx, headers);
  if (body) {
    ctx.body = body;
  }
});

apiRouter.all("{/*path}", async (ctx) => {
  const subPath = ctx.params.path || "";
  await proxyToFluxer(ctx, subPath);
});
