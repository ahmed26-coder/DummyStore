"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendOrderConfirmation({
  email,
  cartItems,
}: {
  email: string;
  cartItems: {
    id: number;
    title: string;
    price: number;
    quantity: number;
    thumbnail: string;
  }[];
}) {
  const shippingCost = 9.99;
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.08;
  const finalTotal = subtotal + shippingCost + tax;

  try {
    await resend.emails.send({
      from: "Store <onboarding@resend.dev>",
      to: email,
      subject: "Your Order Confirmation",
      html: `
  <div style="font-family: Arial, sans-serif; color: #333; padding: 20px; background:#f9f9f9;">
    <div style="max-width:600px; margin:0 auto; background:#fff; border:1px solid #eee; border-radius:8px; overflow:hidden;">
      
      <!-- Header -->
      <div style="background:#f4f4f4; padding:16px; text-align:center; border-bottom:1px solid #ddd;">
        <h2 style="margin:0; color:#222;">🛒 Order Summary</h2>
      </div>

      <!-- Items -->
      <div style="padding:16px;">
        ${cartItems
          .map(
            (item) => `
              <div style="display:flex; align-items:center; gap:12px; margin-bottom:12px;">
                <div style="position:relative;">
                  <img src="${item.thumbnail}" width="60" height="60" style="border-radius:6px; object-fit:cover;" />
                  <span style="position:absolute; top:-6px; right:-6px; background:#2563eb; color:#fff; font-size:12px; padding:2px 6px; border-radius:50%;">
                    ${item.quantity}
                  </span>
                </div>
                <div style="min-width:0;">
                  <p style="margin:0; font-size:14px; font-weight:600; color:#111;">${item.title}</p>
                  <p style="margin:0; font-size:12px; color:#666;">price: $${item.price}</p>
                </div>
                <div style="text-align:right;">
                  <p style="margin:0; font-weight:600;"> Total: $${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            `
          )
          .join("")}
      </div>

      <!-- Divider -->
      <hr style="border:none; border-top:1px solid #eee; margin:0;" />

      <!-- Totals -->
      <div style="padding:16px; font-size:14px;">
        <div style="display:flex; justify-content:space-between; margin-bottom:6px;">
          <span>Subtotal</span>
          <span>$${subtotal.toFixed(2)}</span>
        </div>
        <div style="display:flex; justify-content:space-between; margin-bottom:6px;">
          <span>Shipping</span>
          <span>$${shippingCost.toFixed(2)}</span>
        </div>
        <div style="display:flex; justify-content:space-between; margin-bottom:6px;">
          <span>Tax</span>
          <span>$${tax.toFixed(2)}</span>
        </div>
        <hr style="border:none; border-top:1px solid #eee; margin:12px 0;" />
        <div style="display:flex; justify-content:space-between; font-size:16px; font-weight:bold;">
          <span>Total</span>
          <span>$${finalTotal.toFixed(2)}</span>
        </div>
      </div>

      <!-- Info Cards -->
      <div style="padding:16px; background:#f0fdf4; border-top:1px solid #ddd; display:flex; align-items:center; gap:10px;">
        <span style="color:#16a34a;">🔒</span>
        <div>
          <p style="margin:0; font-size:13px; font-weight:600; color:#166534;">Secure Checkout</p>
          <p style="margin:0; font-size:12px; color:#16a34a;">Your information is protected</p>
        </div>
      </div>

      <div style="padding:16px; background:#eff6ff; border-top:1px solid #ddd; display:flex; align-items:center; gap:10px;">
        <span style="color:#2563eb;">🚚</span>
        <div>
          <p style="margin:0; font-size:13px; font-weight:600; color:#1e40af;">Free Shipping</p>
          <p style="margin:0; font-size:12px; color:#2563eb;">On orders over $50</p>
        </div>
      </div>

    </div>
  </div>
`,
    });

    return { success: true };
  } catch (error) {
    console.error("❌ Email send error:", error);
    return { success: false, error };
  }
}
