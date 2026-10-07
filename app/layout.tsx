import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const bricolageGrotesque = localFont({
  src: [
    { path: "./fonts/bricolage-grotesque-400.ttf", weight: "400" },
    { path: "./fonts/bricolage-grotesque-500.ttf", weight: "500" },
    { path: "./fonts/bricolage-grotesque-600.ttf", weight: "600" },
    { path: "./fonts/bricolage-grotesque-700.ttf", weight: "700" },
  ],
  variable: "--font-bricolage-grotesque",
  display: "swap",
});

const dmSans = localFont({
  src: [
    { path: "./fonts/dm-sans-400.ttf", weight: "400" },
    { path: "./fonts/dm-sans-500.ttf", weight: "500" },
    { path: "./fonts/dm-sans-600.ttf", weight: "600" },
    { path: "./fonts/dm-sans-700.ttf", weight: "700" },
  ],
  variable: "--font-dm-sans",
  display: "swap",
});

const varelaRound = localFont({
  src: "./fonts/varela-round-400.ttf",
  variable: "--font-varela-round",
  display: "swap",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Lodgely | Student Accommodation & Property Platform in Africa",
  description: "Find student accommodation, rooms, apartments and rental properties in Lodgely markets. Connect with property owners, agents and institutions.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${bricolageGrotesque.variable} ${dmSans.variable} ${varelaRound.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
