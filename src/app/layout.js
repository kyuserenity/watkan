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
        <div className="mx-auto w-fit">
          <div className="md:flex">
            <Navbar />
            <div className="w-screen max-w-lg md:flex-1">
              <Header />
              {children}
              {modal}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
