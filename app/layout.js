import { Poppins } from 'next/font/google';
import { League_Spartan } from 'next/font/google';
import { Inter } from 'next/font/google';
import "./globals.css";
import "../app/assets/css/custom.css";

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Providers from "./reducers/provider";
import ClientLayoutWrapper from "./clientLayoutWrapper";
import MaintenanceMode from "./ui/MaintenanceMode";

import Sidebar from "./ui/sidebar";
import Insideheader from "./ui/insideheader";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ThemeColorProvider } from './ui/ThemeColorProvider';

import Script from 'next/script';
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'], // specify desired weights
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'], // or ['latin-ext'] etc.
  weight: ['400', '500', '600', '700'], // specify desired weights
  variable: '--font-inter', // optional, for Tailwind usage
})


export const metadata = {
  title: "HiringEye Resume",
  description: "HiringEye Resume",
};
const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
export default function RootLayout({ children }) {
  // 🛑 MAINTENANCE MODE TOGGLE 🛑
  // Change `isMaintenance` to `false` to turn off maintenance mode and restore the site.
  // Change to `true` to block the entire site with the Maintenance screen.
  const isMaintenance = false;

  if (isMaintenance) {
    return (
      <html lang="en">
        <body className={`${inter.variable} antialiased`}>
          <MaintenanceMode />
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased`}
      >
        {/* --- Google Analytics Tracking Code start --- */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-8X1244Q659"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            
            gtag('config', 'G-8X1244Q659');
          `}
        </Script>
        {/* --- Google Analytics Tracking Code End --- */}
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>


          <Providers>
            <ClientLayoutWrapper>
              <ThemeColorProvider>
                {children}
              </ThemeColorProvider>
            </ClientLayoutWrapper>
          </Providers>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
