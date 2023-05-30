import { Listener, OrderCancelledEvent, Subjects } from "@amehtatickets/common";
import { queueGroupName } from "./queue-group-name";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../models/ticket";
import { TicketUpdatedPublisher } from "../publishers/ticket-updated-publisher";


export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
    subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
    queueGroupName: string = queueGroupName;

    async onMessage(data: OrderCancelledEvent['data'], msg: Message) {
        // find the ticket for which order is cancelled
        const ticket = await Ticket.findById(data.ticket.id);

        // if no ticket, throw error
        if (!ticket) {
            throw new Error('ticket not found');
        }

        // Mark the ticket as not reserved, by setting its orderId to null or undefined
        ticket.set({ orderId: undefined });

        // Save the ticket
        await ticket.save();

        // update the ticket event
        await new TicketUpdatedPublisher(this.client).publish({
            id: ticket.id,
            orderId: ticket.orderId,
            title: ticket.title,
            userId: ticket.userId,
            price: ticket.price,
            version: ticket.version
        })

        // ack the message
        msg.ack();

    }
}   