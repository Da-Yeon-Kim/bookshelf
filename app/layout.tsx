import {
  Nanum_Myeongjo,
  Gowun_Batang,
  Nanum_Brush_Script,
  Do_Hyeon,
} from "next/font/google";
import "./globals.css";

const nanumMyeongjo = Nanum_Myeongjo({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-nanum",
});
const gowunBatang = Gowun_Batang({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-gowun",
});
const brush = Nanum_Brush_Script({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-brush",
});
const doHyeon = Do_Hyeon({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-dohyeon",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body
        className={`${nanumMyeongjo.variable} ${gowunBatang.variable} ${brush.variable} ${doHyeon.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
