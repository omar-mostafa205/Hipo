import { wixClientServer } from "@/lib/wixClientServer";

export default async function handler(req, res) {
  const { itemId } = req.body;

  try {
    const client = await wixClientServer();
    const response = await client.currentCart.removeLineItemsFromCurrentCart([itemId]);
    res.status(200).json(response.cart);
  } catch (err) {
    res.status(500).json({ error: "Failed to remove item" });
  }
}
