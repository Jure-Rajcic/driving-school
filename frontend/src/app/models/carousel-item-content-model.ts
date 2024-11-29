import { AppSvgComponent } from "../components/app-svg-component";
import { BehaviorSubject } from 'rxjs';

type DialogIMetaData = {
    description: string;
    mainActionText?: string;
};

abstract class DialogI {
    readonly description: string;
    readonly actionText: string;

    constructor(dialogIMetaData: DialogIMetaData) {
        this.description = dialogIMetaData.description;
        this.actionText = dialogIMetaData.mainActionText || 'Platform Demo';
    }

    onInit(): void { };
    mainActionClick(): void { };
    onExit(): void { };
}


const LOCKED_DESCRIPTIONS: { [key: number]: DialogIMetaData } = {
    1: { description: 'This screen is locked until you administrator registers zou in the app', mainActionText: 'Call Driving school' },
    2: { description: 'This screen is becomes unlocked after you complete Medical Examination', mainActionText: 'Take me back' },
    3: { description: 'This screen is becomes unlocked after you pass the Psycho Test', mainActionText: 'Take me back' },
};

class DialogLocked extends DialogI {
    private readonly appSvgComponent: AppSvgComponent;

    constructor(id: number, appSvgComponent: AppSvgComponent) {
        super(LOCKED_DESCRIPTIONS[id]);
        this.appSvgComponent = appSvgComponent;
    }

    override onInit(): void {
        this.appSvgComponent.setFilter('grayscale(100%)');
    }

    override onExit(): void {
        this.appSvgComponent.setFilter('none');
    }
}


const UNLOCKED_DESCRIPTIONS: { [key: number]: DialogIMetaData } = {
    1: { description: 'You are required to undergo a medical examination to confirm your fitness for driving, this includes vision, hearing and general fitness testing.', mainActionText: 'Show me how' },
    2: { description: 'Statistics: bla bla bla', mainActionText: 'Lets practice' },
    3: { description: 'This is Chose Category app, to unlock this screen you first have to unlock bla bla bla', mainActionText: 'Explore' },
};
class DialogUnlocked extends DialogI {
    constructor(id: number) {
        super(UNLOCKED_DESCRIPTIONS[id]);
    }
}


enum CarouselItemContentState {
    LOCKED,
    WIP,
    DONE,
}

const CAROUSEL_ITEM_CONTENT: { [key: number]: { title: string, svgBaseFileName: string } } = {
    1: { title: 'Medical Examination', svgBaseFileName: '[1]medical-examination' },
    2: { title: 'Psycho Test', svgBaseFileName: '[2]psycho-test' },
    3: { title: 'Chose Category', svgBaseFileName: '[3]chose-category' },
};

class CarouselItemContentModel {
    readonly id: number;
    readonly title: string;
    readonly svgBaseFileName: string;
    private _state$: BehaviorSubject<CarouselItemContentState>;

    constructor(id: number, state: CarouselItemContentState) {
        this.id = id;
        this._state$ = new BehaviorSubject(state);


        const { title, svgBaseFileName } = CAROUSEL_ITEM_CONTENT[id];
        this.title = title;
        this.svgBaseFileName = svgBaseFileName;
    }

    get state$() {
        return this._state$.asObservable();
    }

    setState(newState: CarouselItemContentState) {
        this._state$.next(newState);
    }

    get state(): CarouselItemContentState {
        return this._state$.getValue();
    }

}

export { CarouselItemContentModel, CarouselItemContentState, DialogI, DialogLocked, DialogUnlocked };