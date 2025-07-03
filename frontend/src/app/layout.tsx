import "./globals.css";
import { Providers } from "./components/Providers";
import NavbarWrapper from "./components/ComponentWrapper";
import FetchInformation from "@/app/components/FetchInformation"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="font-sans text-gray-700"
      >
        <Providers>
          <FetchInformation />
          <NavbarWrapper>
            {children}
          </NavbarWrapper>
        </Providers>
      </body>
    </html>
  );
}
