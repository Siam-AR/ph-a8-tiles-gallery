import { Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const OutfitFont = Outfit({
  subsets: ["latin"],
});
// english alph(latin), greek, arabic, bengali



export const metadata = {
  title: "Tile Gallery",
  description: "Showcase of modern tile collections built with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${OutfitFont.className}  h-full antialiased`}
    >
      <body>
        <Navbar/>
        <main className="container mx-auto">{children} </main>
        <Footer/>

      </body>
    </html>
  );
}
