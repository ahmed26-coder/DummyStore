"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendOrderConfirmation({
  email,
  cartItems,
  total,
}: {
  email: string;
  cartItems: {
    id: number;
    title: string;
    price: number;
    quantity: number;
    thumbnail: string;
  }[];
  total: number;
}) {
  const itemsHtml = cartItems
    .map(
      (item) => `
      <tr>
        <td><img src="${item.thumbnail}" width="50" /></td>
        <td>${item.title}</td>
        <td>${item.quantity}</td>
        <td>$${item.price}</td>
        <td>$${(item.price * item.quantity).toFixed(2)}</td>
      </tr>
    `
    )
    .join("");

  try {
    await resend.emails.send({
      from: "Store <onboarding@resend.dev>",
      to: email,
      subject: "Your Order Confirmation",
html: `
  <div style="font-family: Arial, sans-serif; color: #333; padding: 20px;">
    <h2 style="color:#222;">Thank you for your order 🎉</h2>
    <p style="font-size:14px; color:#555;">Here are your order details:</p>

    <div style="overflow-x: auto;">
      <table cellpadding="6" cellspacing="0" border="0" style="width:100%; max-width:600px; border-collapse: collapse; margin: 0 auto; font-size:14px;">
        <thead>
          <tr style="background-color:#f4f4f4; text-align:left;">
            <th style="padding:8px; border:1px solid #ddd;">Image</th>
            <th style="padding:8px; border:1px solid #ddd;">Product</th>
            <th style="padding:8px; border:1px solid #ddd;">Qty</th>
            <th style="padding:8px; border:1px solid #ddd;">Price</th>
            <th style="padding:8px; border:1px solid #ddd;">Total</th>
          </tr>
        </thead>
        <tbody>
          ${itemsHtml}
        </tbody>
      </table>
    </div>

    <h3 style="margin-top:20px; color:#000;">Total: $${total.toFixed(2)}</h3>
  </div>
`

    });

    return { success: true };
  } catch (error) {
    console.error("❌ Email send error:", error);
    return { success: false, error };
  }
}
