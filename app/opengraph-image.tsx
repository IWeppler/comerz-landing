import { ImageResponse } from "next/og";

/**
 * La tarjeta que se ve cuando alguien pega el link en WhatsApp, que es por
 * donde llega la mayoría. Se genera en build, así que no hay que mantener un
 * PNG a mano cada vez que cambia el mensaje.
 */
export const alt =
  "Comerz — Sistema de gestión y punto de venta para comercios";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

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
          padding: "72px 80px",
          background:
            "radial-gradient(60% 70% at 25% 15%, #2b3fa8 0%, transparent 65%), #10131a",
          color: "#fafafa",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 14,
              background: "#4759e4",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 30,
              fontWeight: 700,
            }}
          >
            C
          </div>
          <div style={{ fontSize: 34, fontWeight: 600, letterSpacing: -0.5 }}>
            Comerz
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
          <div
            style={{
              fontSize: 76,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: -2.5,
              maxWidth: 900,
            }}
          >
            Todo tu negocio en un solo lugar
          </div>
          <div
            style={{
              fontSize: 32,
              lineHeight: 1.35,
              color: "#b8bdc9",
              maxWidth: 880,
            }}
          >
            Punto de venta, stock, caja y clientes. Para comercios que quieren
            dejar el cuaderno.
          </div>
        </div>

        <div style={{ display: "flex", gap: 14, fontSize: 26 }}>
          {["14 días gratis", "Sin tarjeta", "Sin instalar nada"].map((chip) => (
            <div
              key={chip}
              style={{
                display: "flex",
                padding: "12px 24px",
                borderRadius: 999,
                border: "1px solid rgba(255,255,255,0.18)",
                color: "#d9dce4",
              }}
            >
              {chip}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
