import { Poppins } from 'next/font/google';
import { League_Spartan } from 'next/font/google';
import { Inter } from 'next/font/google';
import "./globals.css";
import "../app/assets/css/custom.css";

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Providers from "./reducers/provider";
import ClientLayoutWrapper from "./clientLayoutWrapper";

import Sidebar from "./ui/sidebar";
import Insideheader from "./ui/insideheader";
import { GoogleOAuthProvider } from '@react-oauth/google';


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
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased`}
      >
<GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>


        <Providers>
          <ClientLayoutWrapper>
            {children}
          </ClientLayoutWrapper>
        </Providers>
        </GoogleOAuthProvider>

        {/* <Providers>
          <main>
            <div className="lg:flex gap-10 bg-[#F3F3F3] p-5">
              <div className="sidebar_area w-2/12">
                <Sidebar />
              </div>
              <div className="content_area w-full lg:w-10/12">
                <Insideheader />
                {children}
              </div>
            </div>
          </main>
        </Providers> */}

      </body>
    </html>
  );
}
