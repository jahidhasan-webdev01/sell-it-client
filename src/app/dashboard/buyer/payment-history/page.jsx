import { getPaymentHistory } from "@/lib/api/payment";
import { getUserSession } from "@/lib/core/session";
import PaymentHistoryTable from "./PaymentHistoryTable";

const PaymentHistoryPage = async () => {
    const session = await getUserSession()
    const paymentHistory = await getPaymentHistory(session?.id);

    return <PaymentHistoryTable paymentHistory={paymentHistory} />;
};

export default PaymentHistoryPage;