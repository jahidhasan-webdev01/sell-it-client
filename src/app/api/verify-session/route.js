import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const session_id = searchParams.get('session_id');

        if (!session_id) {
            return NextResponse.json({ error: 'Missing session_id' }, { status: 400 });
        }

        const session = await stripe.checkout.sessions.retrieve(session_id);

        return NextResponse.json({
            status: session.status,
            customerEmail: session.customer_details?.email || ''
        });
    } catch (err) {
        return NextResponse.json(
            { error: err.message },
            { status: 500 }
        );
    }
}