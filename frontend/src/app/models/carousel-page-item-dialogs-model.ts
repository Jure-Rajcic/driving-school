import { CarouselPageItemDialogModel, DialogDoneModel, DialogLockedModel, DialogWorkInProgressModel } from "./carousel-page-item-dialog-model";
import { CarouselPageState } from "./carousel-page-model";

export abstract class CarouselPageItemDialogs {
    constructor(public readonly dialogs: { [key in CarouselPageState]: CarouselPageItemDialogModel }) {}
}

export class MedicalExaminationItemDialogs extends CarouselPageItemDialogs {

    constructor() {
        super({
            [CarouselPageState.LOCKED]: new DialogLockedModel({
                description: 'This screen is locked until you administrator registers you in the app',
                mainActionText: 'Call Driving school'
            }),
            [CarouselPageState.WIP]: new DialogWorkInProgressModel({
                description: 'You are required to undergo a medical examination to confirm your fitness for driving. This includes vision, hearing and general fitness testing.',
                mainActionText: 'Take me back'
            }),
            [CarouselPageState.DONE]: new DialogDoneModel({
                description: 'You completed this screen, do you want us to fetch statistics fro this page for you.',
                mainActionText: 'Fetch data'
            }),
        });
    }
}

export class PsychoTestItemDialogs extends CarouselPageItemDialogs {

    constructor() {
        super({
            [CarouselPageState.LOCKED]: new DialogLockedModel({
                description: 'This screen is becomes unlocked after you complete Medical Examination',
                mainActionText: 'Call Driving school'
            }),
            [CarouselPageState.WIP]: new DialogWorkInProgressModel({
                description: 'After the medical examination, you will also need to undergo a psychophysical examination to determine your ability to drive.',
                mainActionText: 'Take me back'
            }),
            [CarouselPageState.DONE]: new DialogDoneModel({
                description: 'You completed this screen, do you want us to fetch statistics fro this page for you.',
                mainActionText: 'Fetch data'
            }),
        });
    }
}

export class ChoseCategoryItemDialogs extends CarouselPageItemDialogs {

    constructor() {
        super({
            [CarouselPageState.LOCKED]: new DialogLockedModel({
                description: 'This screen is becomes unlocked after you pass the Psycho Test',
                mainActionText: 'Call Driving school'
            }),
            [CarouselPageState.WIP]: new DialogWorkInProgressModel({
                description: 'After completing the psycho test, you will have to select category from our driving school options. Each category specifies the type of vehicles you will be required to drive.',
                mainActionText: 'Take me back'
            }),
            [CarouselPageState.DONE]: new DialogDoneModel({
                description: 'You completed this screen, do you want us to fetch statistics fro this page for you.',
                mainActionText: 'Fetch data'
            }),
        });
    }
}