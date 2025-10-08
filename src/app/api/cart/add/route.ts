import { wixClientServer } from "@/lib/wixClientServer";

export default async function handler(req, res) {
  const { productId, variantId, quantity } = req.body;

  try {
    const client = await wixClientServer();
    const response = await client.currentCart.addToCurrentCart({
      lineItems: [
        {
          catalogReference: {
            appId: process.env.NEXT_PUBLIC_WIX_APP_ID!,
            catalogItemId: productId,
            ...(variantId && { options: { variantId } }),
          },
          quantity: quantity,
        },
      ],
    });

    res.status(200).json(response.cart);
  } catch (err) {
    res.status(500).json({ error: "Failed to add item" });
  }
}
