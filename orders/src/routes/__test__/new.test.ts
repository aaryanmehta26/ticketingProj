import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';
import { Ticket } from '../../models/ticket';
import { natsWrapper } from '../../nats-wrapper';

const ID = new mongoose.Types.ObjectId().toHexString();

it('returns an error if the ticket does not exists', async () => {
    const ticketId = new mongoose.Types.ObjectId();

    await request(app)
        .post('/api/orders')
        .set('Cookie', global.getCookie())
        .send({
            ticketId
        })
        .expect(404)
});

it('reserves a ticket', async () => {
    const ticket = Ticket.build({
        title: 'concert',
        price: 20,
        id: ID
    });
    await ticket.save();

    await request(app)
        .post('/api/orders')
        .set('Cookie', global.getCookie())
        .send({ ticketId: ticket.id })
        .expect(201);
});

it('emits an order created event', async () => {
    const ticket = Ticket.build({
        title: 'concert',
        price: 20,
        id: ID
    });
    await ticket.save();

    await request(app)
        .post('/api/orders')
        .set('Cookie', global.getCookie())
        .send({ ticketId: ticket.id })
        .expect(201);

    expect(natsWrapper.client.publish).toHaveBeenCalled();
})