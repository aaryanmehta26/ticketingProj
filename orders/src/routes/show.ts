import { NotAuthorizedError, NotFoundError, requireAuth } from '@amehtatickets/common';
import express, { Request, Response } from 'express'
import { Order } from '../models/order';

const router = express.Router();

router.get('/api/orders/:orderId',
    requireAuth,
    async (req: Request, res: Response) => {
        const order = await Order.findById(req.params.orderId).populate("ticket");

        if (!order) {
            throw new NotFoundError();
        }

        if (order.userId !== req.currentUser!.id) {
            // to make sure user is seeing its own order, not other user order
            throw new NotAuthorizedError();
        }

        res.send(order);

    })

export { router as showOrderRouter };