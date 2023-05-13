import request from "supertest";
import { app } from '../../app'
import mongoose from "mongoose";
import { natsWrapper } from "../../nats-wrapper";

it('returns a 404 if the provided id does not exists', async () => {
    const id = new mongoose.Types.ObjectId().toHexString()
    await request(app)
        .put(`/api/tickets/${id}`)
        .set('Cookie', global.getCookie())
        .send({
            title: 'Some title',
            price: 20
        })
        .expect(404)
})

it('returns a 401 if the user is not authenticated', async () => {
    await request(app)
        .put("/api/tickets/randomId")
        .send({
            title: 'Some title',
            price: 20
        })
        .expect(401)
})

it('returns a 401 if the user does not own the ticket', async () => {
    const response = await request(app)
        .post("/api/tickets")
        .set('Cookie', global.getCookie())
        .send({
            title: 'Some title',
            price: 100
        })

    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', global.getCookie())
        .send({
            title: 'Updated title',
            price: 120
        })
        .expect(401)
})

it('returns a 400 if the user does not provide the title or price', async () => {
    const cookie = global.getCookie();
    const response = await request(app)
        .post("/api/tickets")
        .set('Cookie', cookie)
        .send({
            title: 'Some title',
            price: 100
        })

    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', cookie)
        .send({
            title: '',
            price: 20
        })
        .expect(400)

    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', cookie)
        .send({
            title: 'valid title',
            price: -20
        })
        .expect(400)
})


it('update the ticket if valid input is provided', async () => {
    const cookie = global.getCookie();
    const response = await request(app)
        .post("/api/tickets")
        .set('Cookie', cookie)
        .send({
            title: 'Some title',
            price: 100
        })

    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', cookie)
        .send({
            title: 'Updated title',
            price: 20
        })
        .expect(200)

    const ticketResponse = await request(app)
        .get(`/api/tickets/${response.body.id}`)
        .send()

    expect(ticketResponse.body.title).toEqual('Updated title');
    expect(ticketResponse.body.price).toEqual(20);
})


it('publishes an event', async () => {
    const cookie = global.getCookie();
    const response = await request(app)
        .post("/api/tickets")
        .set('Cookie', cookie)
        .send({
            title: 'Some title',
            price: 100
        })

    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', cookie)
        .send({
            title: 'Updated title',
            price: 20
        })
        .expect(200)

    expect(natsWrapper.client.publish).toHaveBeenCalled()

})
