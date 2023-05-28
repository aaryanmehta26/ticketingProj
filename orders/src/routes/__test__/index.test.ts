import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';
import { Ticket } from '../../models/ticket';
import { Order, OrderStatus } from '../../models/order';

const buildTicket = async () => {
    const ticket = Ticket.build({
        title: 'concert',
        price: 20
    })

    await ticket.save();

    return ticket;
}

it('fetch orders for a particular user', async () => {
    // create three tickets
    const ticketOne = await buildTicket();
    const ticketTwo = await buildTicket();
    const ticketThree = await buildTicket();

    const userOne = global.getCookie();
    const userTwo = global.getCookie();

    // create one order as user #1
    await request(app)
        .post('/api/orders')
        .set('Cookie', userOne)
        .send({
            ticketId: ticketOne.id
        })
        .expect(201)


    // create two order as user #2
    await request(app)
        .post('/api/orders')
        .set('Cookie', userTwo)
        .send({
            ticketId: ticketTwo.id
        })
        .expect(201)

    await request(app)
        .post('/api/orders')
        .set('Cookie', userTwo)
        .send({
            ticketId: ticketThree.id
        })
        .expect(201)


    // Make request to get orders for user #2

    const response = await request(app)
        .get('/api/orders')
        .set('Cookie', userTwo)
        .expect(200)

    // expect -> Make sure we only get orders for user #2
    expect(response.body.length).toEqual(2);
})