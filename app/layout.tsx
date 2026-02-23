import "./globals.css";
import RootClientWrapper from "./components/RootClientWrapper";
import Providers from "./components/Providers";
import { ReactNode } from "react";

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        {/* <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@200;300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        /> */}
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />

      </head>
      <body className="bg-white text-[#1B2021] antialiased">
        <Providers>
          <RootClientWrapper>
              {children}
          </RootClientWrapper>
          </Providers>
      </body>
    </html>
  );
}
