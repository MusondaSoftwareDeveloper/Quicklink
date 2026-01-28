import type React from "react"
import type { Metadata } from "next"
import { Suspense } from "react"
import "./globals.css"
import { PageTransition } from "@/components/page-transition"
import { NavigationTransition } from "@/components/navigation-transition"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Dancing_Script, Caveat } from "next/font/google"

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-dancing-script",
  display: "swap",
})

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Quicklink Namibia - Your Local Services Hub",
  description:
    "Discover local services in Namibia - Accommodation, Transport, Food, Activities, Health, Shopping and more. Your one-stop platform for connecting with trusted local businesses.",
  keywords: ["Namibia", "local services", "accommodation", "transport", "food", "activities", "health", "shopping"],
  authors: [{ name: "Quicklink Namibia" }],
  openGraph: {
    title: "Quicklink Namibia - Your Local Services Hub",
    description: "Discover local services in Namibia - Accommodation, Transport, Food, Activities, Health, Shopping and more.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Quicklink Namibia - Your Local Services Hub",
    description: "Discover local services in Namibia - Accommodation, Transport, Food, Activities, Health, Shopping and more.",
  },
  robots: {
    index: true,
    follow: true,
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`font-sans antialiased ${dancingScript.variable} ${caveat.variable}`}>
        <Suspense fallback={null}>
          <NavigationTransition />
          <PageTransition>{children}</PageTransition>
        </Suspense>
        <SpeedInsights />
      </body>
    </html>
  )
}
