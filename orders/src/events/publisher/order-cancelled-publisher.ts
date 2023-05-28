import { OrderCancelledEvent, Publisher, Subjects } from "@amehtatickets/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
    subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}