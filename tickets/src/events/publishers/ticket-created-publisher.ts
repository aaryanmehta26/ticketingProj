import { Subjects, Publisher, TicketCreatedEvent } from '@amehtatickets/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    subject: Subjects.TicketCreated = Subjects.TicketCreated;
}