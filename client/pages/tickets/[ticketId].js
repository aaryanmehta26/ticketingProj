import React, { useEffect, useState } from 'react'
import { useRequest } from '../../hooks/use-request'
import { useRouter } from 'next/router'

const TicketShow = ({ ticket }) => {

    const router = useRouter();

    const handleNavigation = (orderId) => {
        console.log('orderId orderId', orderId)
        router.push(`/orders/${orderId}`);
    }

    const { doRequest, errors } = useRequest({
        url: '/api/orders',
        method: 'post',
        body: {
            ticketId: ticket.id
        },
        onSuccess: (order) => handleNavigation(order.id)
        // router.push('/orders/[orderId]', `/orders/${order.id}`)
    })

    return (
        <div>
            <h1>{ticket.title}</h1>
            <h1>{ticket.price}</h1>
            {errors}
            <button className="btn btn-primary" onClick={() => doRequest()}>Purchase</button>
        </div>
    )
}

TicketShow.getInitialProps = async (context, client) => {
    const { ticketId } = context.query;

    const { data } = await client.get(`/api/tickets/${ticketId}`);

    return { ticket: data };
}

export default TicketShow
