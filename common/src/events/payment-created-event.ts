import { Subjects } from "./subjects";


export interface PaymentCreatedEvent {
    subject: Subjects.PaymentCreated;
    data: {
        id: string; // payment Id
        orderId: string;
        stripeId: string;
    }
}