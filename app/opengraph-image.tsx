import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

/**
 * La tarjeta que se ve cuando alguien pega el link en WhatsApp, que es por
 * donde llega la mayoría. Se genera en build, así que no hay que mantener un
 * PNG a mano cada vez que cambia el mensaje. Copia el hero: negro, el cartel
 * en Bebas con el asterisco naranja y la tarjeta de ventas de la semana.
 */
export const alt =
  "Comerz: hacé crecer tu comercio con un solo sistema para vender, cobrar y controlar el stock";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const asset = (path: string) => readFile(join(process.cwd(), path));

// Satori no lee woff2 ni fuentes variables: van los .woff estáticos de cada peso.
const [bebas, interTight, interTightSemi, logo] = await Promise.all([
  asset("app/og/bebas-neue-400.woff"),
  asset("app/og/inter-tight-400.woff"),
  asset("app/og/inter-tight-600.woff"),
  asset("public/assets/logo.png"),
]);
const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

const ORANGE = "#ff5a2e";
const GREEN = "#3ecf8e";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "56px 72px 64px",
          background:
            "radial-gradient(48% 62% at 88% 92%, rgba(232,64,26,0.30) 0%, transparent 70%), #111",
          color: "#fafafa",
          fontFamily: "Inter Tight",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} width={44} height={44} style={{ borderRadius: 11 }} alt="" />
          <div style={{ fontSize: 30, fontWeight: 600, letterSpacing: -0.9 }}>
            Comerz
          </div>
          <div style={{ marginLeft: "auto", fontSize: 24, color: "rgba(255,255,255,0.5)" }}>
            comerz.app
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                fontFamily: "Bebas Neue",
                fontSize: 168,
                lineHeight: 0.88,
                textTransform: "uppercase",
              }}
            >
              <span>Hacé crecer</span>
              <span>
                tu comercio<span style={{ color: ORANGE }}>*</span>
              </span>
            </div>
            <div
              style={{
                fontSize: 29,
                lineHeight: 1.3,
                color: "rgba(255,255,255,0.72)",
                maxWidth: 640,
                letterSpacing: -0.3,
              }}
            >
              *con un solo sistema para vender, cobrar, controlar el stock y
              saber cuánto ganás.
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: 330,
              padding: "26px 26px 24px",
              borderRadius: 26,
              border: "1px solid rgba(255,255,255,0.14)",
              background: "rgba(30,30,30,0.85)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.12)",
              marginBottom: 6,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: 19, color: "rgba(255,255,255,0.7)" }}>
                Vendiste esta semana
              </span>
              <span
                style={{
                  display: "flex",
                  padding: "3px 11px",
                  borderRadius: 999,
                  background: "rgba(62,207,142,0.15)",
                  color: GREEN,
                  fontSize: 17,
                  fontWeight: 600,
                }}
              >
                +22%
              </span>
            </div>
            <div
              style={{
                marginTop: 14,
                fontSize: 44,
                fontWeight: 600,
                letterSpacing: -1.5,
                lineHeight: 1,
              }}
            >
              $ 4.788.003
            </div>
            <div style={{ marginTop: 12, fontSize: 17, color: "rgba(255,255,255,0.55)" }}>
              43 ventas, ticket promedio $ 111.349
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Bebas Neue", data: bebas, weight: 400, style: "normal" },
        { name: "Inter Tight", data: interTight, weight: 400, style: "normal" },
        { name: "Inter Tight", data: interTightSemi, weight: 600, style: "normal" },
      ],
    },
  );
}
