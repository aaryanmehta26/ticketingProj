import { Listener, OrderCreatedEvent, Subjects } from '@amehtatickets/common'
import { queueGroupName } from './queue-group-name';
import { Message } from 'node-nats-streaming';
import { expirationQueue } from '../../queues/expiration-queue';


export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
    queueGroupName: string = queueGroupName;

    async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
        const delay = new Date(data.expiresAt).getTime() - new Date().getTime();  // future time that has 15mins plus - current time (gives the window for payment) // refer order service, 15mins already specified there
        await expirationQueue.add({
            orderId: data.id
        }, {
            delay: delay // 15mins delay to make sure, user has 15mins to complete the payment or else after 15mins, we will publish
            // expiration:completed event
        })

        msg.ack();
    }
}