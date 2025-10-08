// "use client";

// import { createClient, OAuthStrategy } from "@wix/sdk";
// import { products, collections } from "@wix/stores";
// import { currentCart } from "@wix/ecom";
// import { redirects } from "@wix/redirects";
// import Cookies from "js-cookie";
// import React, { createContext, useContext, type ReactNode } from "react";

// // Grab refreshToken from cookies
// const refreshToken = JSON.parse(Cookies.get("refreshToken") || "{}");

// // Create Wix client instance
// const wixClient = createClient({
//   modules: {
//     products,
//     collections,
//     currentCart,
//     redirects,
//   },
//   auth: OAuthStrategy({
//     clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID!,
//     tokens: {
//       refreshToken,
//       accessToken: { value: "", expiresAt: 0 },
//     },
//   }),
// });

// // ✅ Correct: Context is typed with the client instance or null
// export const WixClientContext = createContext<typeof wixClient | null>(null);

// // ✅ Provider component
// export function WixContextProvider({ children }: { children: ReactNode }) {
//   return (
//     <WixClientContext.Provider value={wixClient}>
//       {children}
//     </WixClientContext.Provider>
//   );
// }

// // ✅ Hook to consume the context
// export function useWixClient() {
//   const context = useContext(WixClientContext);
//   if (!context) {
//     throw new Error("useWixClient must be used within a WixContextProvider");
//   }
//   return context;
// }
