import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';
import { Ticket } from '../../models/ticket';

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
    });
    await ticket.save();

    await request(app)
        .post('/api/orders')
        .set('Cookie', global.getCookie())
        .send({ ticketId: ticket.id })
        .expect(201);
});

it.todo('emits an order created event')