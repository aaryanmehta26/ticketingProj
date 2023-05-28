import { Publisher, OrderCreatedEvent, Subjects } from "@amehtatickets/common"

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
