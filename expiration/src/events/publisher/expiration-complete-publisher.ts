import { ExpirationCompleteEvent, Publisher, Subjects } from "@amehtatickets/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
    subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}