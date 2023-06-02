import { BadRequestError, NotAuthorizedError, NotFoundError, OrderStatus, requireAuth, validateRequest } from "@amehtatickets/common";
import express, { Request, Response } from "express"
import { body } from "express-validator";
import { Order } from "../models/order";
import { stripe } from "../stripe";
import { Payment } from "../models/payment";
import { PaymentCreatedPublisher } from "../events/publishers/payment-created-publisher";
import { natsWrapper } from "../nats-wrapper";


const router = express.Router();

router.post(
    "/api/payments",
    requireAuth,
    [body("token").not().isEmpty(), body("orderId").not().isEmpty()],
    validateRequest,
    async (req: Request, res: Response) => {
        const { token, orderId } = req.body;

        const order = await Order.findById(orderId);

        if (!order) {
            throw new NotFoundError();
        }

        // order belongs to the same user
        if (order.userId !== req.currentUser!.id) {
            throw new NotAuthorizedError();
        }

        // order should not be cancelled
        if (order.status === OrderStatus.Cancelled) {
            throw new BadRequestError('Cannot pay for a cancelled order');
        }

        // charge the payment from credit card
        // const resp = await stripe.paymentIntents.create({
        //     currency: 'inr',
        //     amount: order.price * 100,
        //     payment_method_types: ['card'],
        //     automatic_payment_methods: {
        //         enabled: true,
        //     },
        // }, {
        //     stripeAccount: 'acct_1NE6npSGCyZQZri0'
        // })
        try {
            const paymentIntent = await stripe.paymentIntents.create({
                amount: order.price, // The amount in the smallest currency unit (e.g., paise for INR)
                currency: 'inr', // The currency for the payment
                payment_method_types: ['card'], // The payment method types allowed for this payment
                // Add additional parameters as needed
            });

            const paymentMethod = 'pm_card_visa'; // Replace with the actual payment method ID

            const confirmedPaymentIntent = await stripe.paymentIntents.confirm(
                paymentIntent.id,
                { payment_method: paymentMethod }
            );
            console.log(confirmedPaymentIntent);

            const payment = Payment.build({
                orderId,
                stripeId: paymentIntent.id
            })

            await payment.save();

            // publish the payment, saying payment has been done
            new PaymentCreatedPublisher(natsWrapper.client).publish({
                id: payment.id,
                orderId: payment.orderId,
                stripeId: payment.stripeId
            })

            res.status(201).send({ id: payment.id })

        } catch (error) {
            console.error(error);
        }
    });

export { router as createChargeRouter };