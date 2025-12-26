"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const encodedToken = urlParams.get("token");

    if (encodedToken) {
      try {
        // Decode token (reverse of encodeURIComponent + btoa)
        const decodedToken = atob(decodeURIComponent(encodedToken));

        // Save to session storage
        // sessionStorage.setItem("resumeToken", decodedToken);c
        localStorage.setItem("resumeToken", decodedToken);
        console.log("✅ Token stored:", decodedToken);

        // Redirect after short delay
        setTimeout(() => {
          router.push("/dashboard");
        }, 500);
      } catch (error) {
        console.error("❌ Error decoding token:", error);
      }
    } else {
      console.warn("⚠️ No token found in URL");
    }
  }, [router]);

  return <p>Setting token and redirecting to dashboard...</p>;
};

export default Page;