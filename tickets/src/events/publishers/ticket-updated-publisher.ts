import { Subjects, Publisher, TicketUpdatedEvent } from '@amehtatickets/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
    subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}