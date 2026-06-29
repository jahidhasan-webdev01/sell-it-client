import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const session_id = searchParams.get('session_id');

        if (!session_id) {
            return NextResponse.json({ error: 'Missing session_id' }, { status: 400 });
        }

        const session = await stripe.checkout.sessions.retrieve(session_id, {
            expand: ['payment_intent']
        });

        const transactionId = session.payment_intent?.latest_charge || session.payment_intent?.id || 'STRIPE-TXN-UNKNOWN';

        const metadata = session.metadata || {};

        return NextResponse.json({
            status: session.status,
            customerEmail: session.customer_details?.email || '',
            transactionId: transactionId, 
            amount: session.amount_total ? session.amount_total / 100 : 0,
            
            userId: metadata.userId,
            sellerId: metadata.sellerId,
            productId: metadata.productId
        });
    } catch (err) {
        return NextResponse.json(
            { error: err.message },
            { status: 500 }
        );
    }
}