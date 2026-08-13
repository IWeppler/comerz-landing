import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE = "https://comerz.app";
const TITLE =
  "Comerz — Sistema de gestión y punto de venta para comercios";
const DESCRIPTION =
  "Software de gestión comercial para comercios, pymes y emprendedores: punto de venta, control de stock, caja y arqueo, cuenta corriente de clientes y catálogo online por WhatsApp. Probalo 14 días gratis, sin tarjeta.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: TITLE,
    template: "%s — Comerz",
  },
  description: DESCRIPTION,
  applicationName: "Comerz",
  keywords: [
    "sistema de gestión para comercios",
    "software de gestión comercial",
    "punto de venta",
    "sistema de facturación y ventas",
    "control de stock",
    "software para pymes",
    "sistema para emprendedores",
    "programa para negocios",
    "control de caja y arqueo",
    "cuenta corriente de clientes",
    "catálogo online por WhatsApp",
    "gestión de inventario",
    "software para tiendas de ropa",
    "sistema de gestión Argentina",
  ],
  authors: [{ name: "Ignacio Weppler", url: "https://www.ignacioweppler.com" }],
  creator: "Ignacio Weppler",
  alternates: { canonical: "/" },
  category: "business",
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: SITE,
    siteName: "Comerz",
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

/**
 * Ficha del producto para Google: qué es, quién lo hace, cuánto sale. Los
 * precios salen de los mismos números que muestra la sección de precios.
 */
const SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE}#organizacion`,
      name: "Comerz",
      url: SITE,
      logo: `${SITE}/assets/logo.png`,
      description: DESCRIPTION,
      areaServed: { "@type": "Country", name: "Argentina" },
      founder: {
        "@type": "Person",
        name: "Ignacio Weppler",
        url: "https://www.ignacioweppler.com",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE}#sitio`,
      url: SITE,
      name: "Comerz",
      inLanguage: "es-AR",
      publisher: { "@id": `${SITE}#organizacion` },
    },
    {
      "@type": "SoftwareApplication",
      name: "Comerz",
      applicationCategory: "BusinessApplication",
      applicationSubCategory: "Sistema de gestión y punto de venta",
      operatingSystem: "Web, Windows, Android, iOS",
      url: SITE,
      description: DESCRIPTION,
      inLanguage: "es-AR",
      publisher: { "@id": `${SITE}#organizacion` },
      featureList: [
        "Punto de venta y tickets digitales",
        "Control de stock en tiempo real",
        "Apertura, cierre y arqueo de caja",
        "Cuenta corriente de clientes",
        "Catálogo online para compartir por WhatsApp",
        "Reportes de ganancia, margen y rotación",
        "Importación de productos y clientes desde Excel",
        "Multi-sucursal y usuarios con permisos",
      ],
      offers: [
        { name: "Emprendedor", price: "30000" },
        { name: "Gestión", price: "50000" },
        { name: "Empresa", price: "70000" },
      ].map((plan) => ({
        "@type": "Offer",
        name: plan.name,
        price: plan.price,
        priceCurrency: "ARS",
        category: "Suscripción mensual",
        availability: "https://schema.org/InStock",
        url: `${SITE}#precios`,
      })),
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/* Without JS the reveal wrappers would stay at opacity 0, so unhide them. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
