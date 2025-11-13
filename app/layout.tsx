import type {Metadata} from "next";
import localFont from "next/font/local";
import "./globals.css";
import {ThemeProvider} from "next-themes";
import Navbar from "@/components/navbar";
import {SessionProvider} from "next-auth/react";




const varela = localFont({
    src: "../public/fonts/Poppins-Regular.ttf",
    weight: "400",
    style: "normal",
    display: "swap",
});

export const metadata: Metadata = {
    title: "System Monitor",
    description: "Monitor and visualize system metrics in real-time.",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
        <head>
            <script
                async
                crossOrigin="anonymous"
                src="https://tweakcn.com/live-preview.min.js"
            />
        </head>
        <body className={`${varela.className} antialiased`}>
        <SessionProvider>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                <Navbar/>
                {children}
            </ThemeProvider>
        </SessionProvider>
        </body>
        </html>
    );
}
