import { Prompt, Kranky } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/main";
import Header from "@/components/header/main";

const prompt = Prompt({
  variable: "--font-prompt",
  subsets: ["thai"],
  weight: ["200", "400", "600"],
  display: "swap",
});

const kranky = Kranky({
  variable: "--font-kranky",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const metadata = {
  title: "WatKan",
  description: "",
};

export default async function RootLayout({ children, modal }) {
  return (
    <html lang="th">
      <body
        className={`${prompt.variable} ${kranky.variable} antialiased select-none **:border-zinc-100 **:dark:border-zinc-900`}
      >
        <Header />
        <div className="flex">
          <Navbar />
          <main className="mx-auto w-screen max-w-3xl">{children}</main>
          <footer className="sticky top-16 flex h-[calc(100vh-64px)] max-w-80 flex-1 items-end p-6 not-xl:hidden">
            <p>@watkan</p>
          </footer>
        </div>
        {modal}
      </body>
    </html>
  );
}
