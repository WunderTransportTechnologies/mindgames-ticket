import { getWebhookSecret, stripe } from "@/lib/stripe";
import { type NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";

/**
 * Stripe Webhook エンドポイント
 *
 * POST /api/webhooks/stripe
 *
 * 主要なイベント:
 * - checkout.session.completed: 決済完了時
 * - payment_intent.succeeded: 支払い成功時
 * - payment_intent.payment_failed: 支払い失敗時
 */
export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    console.error("Missing stripe-signature header");
    return NextResponse.json({ error: "Missing stripe-signature header" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    // Webhook署名検証
    const webhookSecret = getWebhookSecret();
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Webhook signature verification failed" }, { status: 400 });
  }

  // イベントタイプ別処理
  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutSessionCompleted(session);
        break;
      }

      case "payment_intent.succeeded": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        await handlePaymentIntentSucceeded(paymentIntent);
        break;
      }

      case "payment_intent.payment_failed": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        await handlePaymentIntentFailed(paymentIntent);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook handler error:", error);
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
  }
}

/**
 * Checkout Session完了時の処理
 */
async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  console.log("Checkout session completed:", session.id);

  const { eventId, ticketTypeId, quantity } = session.metadata || {};

  if (!eventId || !ticketTypeId || !quantity) {
    console.error("Missing metadata in session:", session.id);
    return;
  }

  // TODO: データベースに注文情報を保存
  // TODO: チケットを発行
  // TODO: 購入確認メールを送信
  console.log(`Order created: Event=${eventId}, TicketType=${ticketTypeId}, Quantity=${quantity}`);
}

/**
 * 支払い成功時の処理
 */
async function handlePaymentIntentSucceeded(paymentIntent: Stripe.PaymentIntent) {
  console.log("Payment succeeded:", paymentIntent.id);

  // TODO: 支払い情報をデータベースに記録
}

/**
 * 支払い失敗時の処理
 */
async function handlePaymentIntentFailed(paymentIntent: Stripe.PaymentIntent) {
  console.error("Payment failed:", paymentIntent.id);

  // TODO: 失敗情報をデータベースに記録
  // TODO: ユーザーに通知
}
