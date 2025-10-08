import { wixClientServer } from "@/lib/wixClientServer";

export default async function handler(req, res) {
  try {
    const client = await wixClientServer();
    const cart = await client.currentCart.getCurrentCart();
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch cart" });
  }
}
