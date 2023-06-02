import { PaymentCreatedEvent, Publisher, Subjects } from "@amehtatickets/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
    subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}