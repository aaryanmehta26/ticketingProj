import { Listener, OrderCreatedEvent, OrderStatus, Subjects } from "@amehtatickets/common";
import { queueGroupName } from "./queue-group-name";
import { Message } from "node-nats-streaming";
import { Order } from "../../models/order";


export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
    queueGroupName: string = queueGroupName;

    async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
        const order = Order.build({
            id: data.id,
            status: data.status,
            price: data.ticket.price,
            version: data.version,
            userId: data.userId
        })

        await order.save();

        msg.ack(); 
    }
}