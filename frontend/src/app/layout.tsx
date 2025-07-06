import "./globals.css";
import { Providers } from "./components/Providers";
import NavbarWrapper from "./components/ComponentWrapper";
import FetchInformation from "@/app/components/FetchInformation"
import { RouteGuard } from "@/global-components/RouteGuard";

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
          <RouteGuard>
            <NavbarWrapper>
              {children}
            </NavbarWrapper>
          </RouteGuard>
        </Providers>
      </body>
    </html>
  );
}
