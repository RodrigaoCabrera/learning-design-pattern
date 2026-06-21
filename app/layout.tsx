import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PatternLab — Aprende patrones de diseño",
  description:
    "Aprende patrones de diseño de software en dos pasos: analogías animadas y código simple.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
