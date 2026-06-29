import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { stripe } from '@/lib/stripe';

export async function POST(req) {
    try {
        const formData = await req.formData();
        const orderPayloadString = formData.get('orderPayload');

        if (!orderPayloadString) {
            return NextResponse.json({ error: "Missing data" }, { status: 400 });
        }

        const orderPayload = JSON.parse(orderPayloadString);
        const headersList = await headers();
        const origin = headersList.get('origin');

        const session = await stripe.checkout.sessions.create({
            customer_email: orderPayload.userEmail || "",
            line_items: [
                {
                    price_data: {
                        currency: 'bdt',
                        product_data: {
                            name: orderPayload.title || 'Product Purchase',
                        },
                        unit_amount: (orderPayload.price || 100000) * 100,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${origin}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
            metadata: {
                productId: orderPayload.productId || '',
            }
        });

        return NextResponse.redirect(session.url, 303);
    } catch (err) {
        return NextResponse.json(
            { error: err.message },
            { status: err.statusCode || 500 }
        );
    }
}