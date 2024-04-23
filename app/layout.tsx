import { Inter } from "next/font/google"
import "./globals.css"
import { GifyProvider } from "./contexts/GifyContext"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
      </head>
      <GifyProvider>
        <body className={inter.className}>{children}</body>
      </GifyProvider>
    </html>
  )
}
