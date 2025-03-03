import type {Metadata} from "next";
import localFont from "next/font/local";
import "@/styles/globals.css";
import "@/styles/custom.css"
import React, {Suspense} from "react";
import {GoogleOAuthProvider} from '@react-oauth/google';

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata: Metadata = {
    title: "Knack",
    description: "Generated by create next app",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
        <Suspense>
            <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""}>
                {children}
            </GoogleOAuthProvider>
        </Suspense>
        </body>
        </html>
    );
}
