import { stripe } from "@/lib/stripe";
import { type NextRequest, NextResponse } from "next/server";

/**
 * Stripe Checkout Session作成API
 *
 * POST /api/checkout
 * Body: { eventId: string, ticketTypeId: string, quantity: number }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { eventId, ticketTypeId, quantity } = body;

    // バリデーション
    if (!eventId || !ticketTypeId || !quantity) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (quantity <= 0 || quantity > 10) {
      return NextResponse.json({ error: "Quantity must be between 1 and 10" }, { status: 400 });
    }

    // TODO: データベースからイベント・チケット情報を取得
    // 現在はダミーデータを使用
    const dummyPrice = 3000; // 3000円
    const dummyEventName = "サンプルイベント";

    // Checkout Session作成
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "jpy",
            product_data: {
              name: `${dummyEventName} - チケット`,
              description: `イベントID: ${eventId}, チケットタイプ: ${ticketTypeId}`,
            },
            unit_amount: dummyPrice,
          },
          quantity,
        },
      ],
      success_url: `${request.nextUrl.origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.nextUrl.origin}/checkout/cancel`,
      metadata: {
        eventId,
        ticketTypeId,
        quantity: quantity.toString(),
      },
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error("Checkout session creation error:", error);
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 });
  }
}
