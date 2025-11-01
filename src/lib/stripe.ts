import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not defined in environment variables");
}

/**
 * Stripeクライアントインスタンス
 * サーバーサイドでのみ使用可能（SECRET_KEYを使用）
 */
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-10-29.clover",
  typescript: true,
});

/**
 * Stripe Publishable Key
 * クライアントサイドで使用するための公開キー
 */
export const getStripePublishableKey = (): string => {
  const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  if (!key) {
    throw new Error("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not defined in environment variables");
  }
  return key;
};

/**
 * Webhook署名シークレット
 * Stripe Webhookの検証に使用
 */
export const getWebhookSecret = (): string => {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    throw new Error("STRIPE_WEBHOOK_SECRET is not defined in environment variables");
  }
  return secret;
};
