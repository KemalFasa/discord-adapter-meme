import * as zlib from "zlib";
import * as erlpack from "erlpack";
import { zlibBufferSync } from "./nodeStream.ts";

export type GatewayCompression = "none" | "zlib-stream" | "zstd-stream";
export type GatewayEncoding = "json" | "etf";

export interface GatewayCodec {
  encode<T = any>(payload: T): string | Buffer;
  decode<T = any>(payload: string | Buffer): T;
}

export class ETFGatewayCodec implements GatewayCodec {
  public encode<T = any>(payload: T): string | Buffer {
    return Buffer.from(erlpack.pack(payload).buffer);
  }

  public decode<T = any>(payload: string | Buffer): T {
    return erlpack.unpack(Buffer.from(payload)) as T;
  }
}

export class JsonGatewayCodec implements GatewayCodec {
  public encode<T = any>(payload: T): string | Buffer {
    return JSON.stringify(payload, (_key, value) => {
      if (value instanceof BigInt) {
        return value.toString();
      }

      return value;
    });
  }

  public decode<T = any>(payload: string | Buffer): T {
    return JSON.parse(payload.toString()) as T;
  }
}

export class ZlibGatewayCodec implements GatewayCodec {
  private downstream: GatewayCodec;

  private deflate: zlib.Deflate;

  constructor(downstream: GatewayCodec) {
    this.downstream = downstream;
    this.deflate = zlib.createDeflate({
      flush: zlib.constants.Z_SYNC_FLUSH,
      finishFlush: zlib.constants.Z_SYNC_FLUSH,
    });
  }

  public encode<T = any>(payload: T): string | Buffer {
    return zlibBufferSync(this.deflate, this.downstream.encode(payload));
  }

  public decode<T = any>(payload: string | Buffer): T {
    return this.downstream.decode(payload) as T;
  }
}

export class ZstdGatewayCodec implements GatewayCodec {
  private downstream: GatewayCodec;

  constructor(downstream: GatewayCodec) {
    this.downstream = downstream;
  }

  public encode<T = any>(payload: T): string | Buffer {
    return zlib.deflateSync(this.downstream.encode(payload));
  }

  public decode<T = any>(payload: string | Buffer): T {
    return this.downstream.decode(zlib.inflateSync(payload));
  }
}

const etfCodec = new ETFGatewayCodec();
const jsonCodec = new JsonGatewayCodec();

export const getCodec = (
  codec: GatewayEncoding,
  compression: GatewayCompression,
): GatewayCodec => {
  let mainCodec;

  switch (codec) {
    case "etf":
      mainCodec = etfCodec;
      break;
    default:
      mainCodec = jsonCodec;
      break;
  }

  switch (compression) {
    case "zlib-stream":
      return new ZlibGatewayCodec(mainCodec);
    case "zstd-stream":
      return new ZstdGatewayCodec(mainCodec);
    default:
      return mainCodec;
  }
};
