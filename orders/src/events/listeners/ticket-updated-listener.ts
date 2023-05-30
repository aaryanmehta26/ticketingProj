import { Listener, NotFoundError, Subjects, TicketUpdatedEvent } from "@amehtatickets/common";
import { queueGroupName } from "./queue-group-name";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../models/ticket";


export class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {
    subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
    queueGroupName: string = queueGroupName;

    async onMessage(data: TicketUpdatedEvent['data'], msg: Message) {
        const ticket = await Ticket.findByEvent(data)

        if (!ticket) {
            throw new Error('Ticket not Found!');
        }
        const { price, title } = data

        ticket.set({ title, price });
        await ticket.save();

        // after saving, tell the nats streaming server, that we have successfully processd
        msg.ack();
    }

}