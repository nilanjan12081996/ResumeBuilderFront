'use client';

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Sidebar from "./ui/sidebar";
import Insideheader from "./ui/insideheader";
import Header from "./ui/header";
import Footer from "./ui/footer";
import { TabsProvider } from "./context/TabsContext";
export default function ClientLayoutWrapper({ children }) {
    const [hasToken, setHasToken] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const pathname = usePathname();
    const router = useRouter();


    // Define public routes that don't require authentication
    const publicRoutes = ['/', '/about-us', '/contact', '/privacy-policy', '/support', '/cancellation-policy', '/pricing', '/how-it-works', '/features', '/privacy', '/faqs', '/featured-jobs', '/featured-jobs-details', '/resume-builder', '/linkedIn-rewrite', '/invite-students', '/loading-page', '/google-redirect', '/terms-conditions', '/forgot-password', '/reset-password'];

    const isPublicRoute =
        publicRoutes.includes(pathname) ||
        pathname.startsWith("/reset-password/");
    // const isPublicRoute = publicRoutes.includes(pathname);

    // Function to check token validity
    const checkTokenValidity = () => {
        try {
            // const storedToken = sessionStorage.getItem("resumeToken");c
            const storedToken = localStorage.getItem("resumeToken");
            if (!storedToken) return false;

            const parsedToken = JSON.parse(storedToken);
            const token = parsedToken?.token;

            // Add any additional token validation logic here if needed
            // For example: check expiration, format, etc.
            return !!token;
        } catch (error) {
            console.error("Error parsing token:", error);
            // Clear invalid token
            // sessionStorage.removeItem("resumeToken");c
            localStorage.removeItem("resumeToken")
            return false;
        }
    };

    useEffect(() => {
        const validateToken = () => {
            const tokenExists = checkTokenValidity();
            setHasToken(tokenExists);
            setIsLoading(false);

            // Redirect to home if no token and trying to access protected route
            if (!tokenExists && !isPublicRoute) {
                router.push('/');
            }

            if (tokenExists && pathname === "/") {
                router.push('/dashboard');
            }
        };

        validateToken();

        // Listen for storage changes (for logout in other tabs)
        const handleStorageChange = (e) => {
            if (e.key === "resumeToken") {
                validateToken();
            }
        };

        window.addEventListener("storage", handleStorageChange);

        // Also check periodically in case token changes
        const interval = setInterval(validateToken, 1000);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
            clearInterval(interval);
        };
    }, [pathname, isPublicRoute, router]);



    // Show loading state
    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    // If no token and trying to access protected route, show loading while redirecting
    if (!hasToken && !isPublicRoute) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    // Authenticated layout
    if (hasToken) {
        return (
            <main>
                <div className="dashboard_wrapper lg:flex bg-[#f3f4f6] p-0">
                    <div className="sidebar_area">
                        <Sidebar />
                    </div>
                    <div className="content_area w-full lg:w-[100%]">
                        <TabsProvider>
                            <Insideheader />
                            <div className="py-1 bg-[#eff2f9]">
                                {children}
                            </div>
                        </TabsProvider>
                    </div>
                </div>
            </main>
        );
    }

    if (pathname === "/forgot-password") {
        return <main>{children}</main>;
    }

    // Public layout (not authenticated)
    return (
        <main>
            <Header />
            {children}
            <Footer />
        </main>
    );
}