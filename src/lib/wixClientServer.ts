/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */

import { cookies } from "next/headers";
import { createClient, OAuthStrategy } from "@wix/sdk";
import { products, collections } from "@wix/stores";
import { contacts } from "@wix/crm"
import { currentCart } from "@wix/ecom"; 

export const wixClientServer = async () => {
    const cookieStore = cookies();
    const refreshToken = JSON.parse((await cookieStore).get("refreshToken")?.value || "{}");
    return createClient({
        modules: {
            products,
            collections,
            contacts,
            currentCart
        },
        auth: OAuthStrategy({
            clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID!,
            tokens: {
                refreshToken,
                accessToken: { value: "", expiresAt: 0 },
            },
        }),
    });
}
