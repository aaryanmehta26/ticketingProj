import express, { Request, Response } from 'express';
import { Ticket } from '../models/ticket';

const router = express.Router();

router.get('/api/tickets', async (req: Request, res: Response) => {
    const tickets = await Ticket.find({
        orderId: undefined  // to send only that ticktes to client, which are not reserved
    });

    res.send(tickets)
})

export { router as indexTicketRouter };