import "./globals.css";
import type { Metadata } from "next";
import { AppStoreProvider } from "./store";

export const metadata: Metadata = {
  title: "SelskapsSjekk",
  description: "Forstå risiko i et selskap uten fagspråk."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="no">
      <body>
        <AppStoreProvider>{children}</AppStoreProvider>
      </body>
    </html>
  );
}
