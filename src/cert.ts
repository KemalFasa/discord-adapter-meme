import selfsigned from "selfsigned";
import fs from "node:fs/promises";
import path from "node:path";

export interface Certificates {
  key: string;
  cert: string;
}

const CERT_PATH = path.join(process.cwd(), "localhost.pem");
const KEY_PATH = path.join(process.cwd(), "localhost-key.pem");

export async function getOrCreateCerts(): Promise<Certificates> {
  try {
    const [key, cert] = await Promise.all([
      fs.readFile(KEY_PATH, "utf-8"),
      fs.readFile(CERT_PATH, "utf-8"),
    ]);
    console.log("Using existing SSL certificates found in root.");
    return { key, cert };
  } catch (err) {
    console.log("Generating new self-signed SSL certificates...");

    const attrs = [{ name: "commonName", value: "localhost" }];
    const pems = await selfsigned.generate(attrs, {
      algorithm: "sha256",
      keyType: "ec",
      notBeforeDate: new Date(Date.now() - 1000),
      notAfterDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),

      extensions: [
        {
          name: "subjectAltName",
          altNames: [
            {
              type: 2, // DNS
              value: "localhost",
            },
            {
              type: 7, // IP
              ip: "127.0.0.1",
            },
            {
              type: 7, // IP
              ip: "::1",
            },
          ],
        },
      ],
    });

    const key = pems.private;
    const cert = pems.cert;

    // Save for future use
    await Promise.all([
      fs.writeFile(KEY_PATH, key),
      fs.writeFile(CERT_PATH, cert),
    ]);

    console.log("SSL certificates generated and saved to root.");
    return { key, cert };
  }
}
