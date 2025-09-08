'use client';

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Sidebar from "./ui/sidebar";
import Insideheader from "./ui/insideheader";
import Header from "./ui/header";
import Footer from "./ui/footer";

export default function ClientLayoutWrapper({ children }) {
    const [hasToken, setHasToken] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const pathname = usePathname();
    const router = useRouter();

    // Define public routes that don't require authentication
    const publicRoutes = ['/', '/about-us', '/contact', '/pricing', '/how-it-works', '/features', '/privacy', '/faqs', '/featured-jobs', '/featured-jobs-details', '/resume-builder', '/linkedIn-rewrite', '/invite-students',];
    const isPublicRoute = publicRoutes.includes(pathname);

    // Function to check token validity
    const checkTokenValidity = () => {
        try {
            const storedToken = sessionStorage.getItem("resumeToken");
            if (!storedToken) return false;

            const parsedToken = JSON.parse(storedToken);
            const token = parsedToken?.token;

            // Add any additional token validation logic here if needed
            // For example: check expiration, format, etc.
            return !!token;
        } catch (error) {
            console.error("Error parsing token:", error);
            // Clear invalid token
            sessionStorage.removeItem("resumeToken");
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
                    <div className="sidebar_area w-[300px] lg:w-[20%]">
                        <Sidebar />
                    </div>
                    <div className="content_area w-full lg:w-[80%]">
                        <Insideheader />
                        <div className="px-5 lg:px-10 lg:py-2">
                            {children}
                        </div>

                    </div>
                </div>
            </main>
        );
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