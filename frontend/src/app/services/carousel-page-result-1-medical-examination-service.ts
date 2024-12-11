import { Injectable, signal } from '@angular/core';
import { AppointmentDTO, AppointmentConfirmationDTO, MEDICAL_EXAMINATION_USER_RESULT_EVENT, StateWrapper } from '@shared/dtos';
import { SocketEventHandler } from './socket-event-handler';


interface AccordionItem {
    data: Map<boolean, { title: string; content: string }>;
    state: boolean;
}

@Injectable({
    providedIn: 'root',
})
export class MedicalExaminationResultService extends SocketEventHandler<StateWrapper<boolean>> {

    constructor() { super(MEDICAL_EXAMINATION_USER_RESULT_EVENT); }

    //TODO better sentences
private readonly _accordionStates: AccordionItem[] = [
    {
        data: new Map([
            [false, { title: 'Appointment Not Requested', content: 'Please select one of the appointments below.' }],
            [true, { title: 'Appointment Request Sent', content: 'The admin has received your request and will start processing it shortly.' }],
        ]),
        state: false,
    },
    {
        data: new Map([
            [false, { title: 'Awaiting Admin Confirmation', content: 'Our team will notify you as soon as your appointment is confirmed.' }],
            [true, { title: 'Appointment Created', content: 'Your appointment has been successfully scheduled and added to your calendar.' }],
        ]),
        state: false,
    },
    {
        data: new Map([
            [false, { title: 'Waiting for Clinic Email', content: 'We are waiting for the clinic to notify us once they have your results.' }],
            [true, { title: 'Medical Examination Completed', content: 'The clinic has confirmed that you are fit to begin driving school.' }],
        ]),
        state: false,
    }
];

    readonly accordionItems = signal(this._accordionStates);

    setAccordionState(index: number, state: boolean): void {
        const updatedAccordionItems = [...this.accordionItems()];
        updatedAccordionItems[index].state = state;
        this.accordionItems.set(updatedAccordionItems);
    }

    handleEvent(wrapper: StateWrapper<boolean>): void {
        console.log('MedicalExaminationResultService.handleEvent:', wrapper);
        const { stateId, state } = wrapper;
        switch (stateId) {
            case 1:
                this.setAccordionState(0, state);
                break;
            case 2:
                this.setAccordionState(1, state);
                break;
            case 3:
                this.setAccordionState(2, state);
                break;
            default:
                console.error('Invalid stateId:', stateId);
        }
    }

}