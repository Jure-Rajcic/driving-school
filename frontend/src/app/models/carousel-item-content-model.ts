import { BehaviorSubject } from 'rxjs';
import { DialogIMetaData } from './dialogI';

enum CarouselItemContentState { LOCKED, WIP, DONE }

type CarouselItemContentType = {
    title: string;
    svgBaseFileName: string;
    state: { [key in CarouselItemContentState]: DialogIMetaData };
};

const CAROUSEL_ITEM_CONTENT: { [key: number]: CarouselItemContentType }= {
    1: { 
        title: 'Medical Examination', 
        svgBaseFileName: '[1]medical-examination', 
        state: { 
            [CarouselItemContentState.LOCKED]: { 
                description: 'This screen is locked until you administrator registers you in the app', 
                mainActionText: 'Call Driving school' 
            },
            [CarouselItemContentState.WIP]: { 
                description: 'You are required to undergo a medical examination to confirm your fitness for driving. This includes vision, hearing and general fitness testing.', 
                mainActionText: 'Take me back' 
            }, 
            [CarouselItemContentState.DONE]: { 
                description: 'You completed this screen, do you want us to fetch statistics fro this page for you.', 
                mainActionText: 'Fetch data' 
            } 
        } 
    },
    2: { 
        title: 'Psycho Test', 
        svgBaseFileName: '[2]psycho-test', 
        state: { 
            [CarouselItemContentState.LOCKED]: { 
                description: 'This screen is becomes unlocked after you complete Medical Examination', 
                mainActionText: 'Call Driving school' 
            },
            [CarouselItemContentState.WIP]: { 
                description: 'After the medical examination, you will also need to undergo a psychophysical examination to determine your ability to drive.', 
                mainActionText: 'Take me back' 
            }, 
            [CarouselItemContentState.DONE]: { 
                description: 'You completed this screen, do you want us to fetch statistics fro this page for you.', 
                mainActionText: 'Fetch data' 
            } 
        } 
    },
    3: { 
        title: 'Chose Category', 
        svgBaseFileName: '[3]chose-category', 
        state: { 
            [CarouselItemContentState.LOCKED]: { 
                description: 'This screen is becomes unlocked after you pass the Psycho Test', 
                mainActionText: 'Call Driving school' 
            },
            [CarouselItemContentState.WIP]: { 
                description: 'After completing the psycho test, you will have to select category from our driving school options. Each category specifies the type of vehicles you will be required to drive.', 
                mainActionText: 'Take me back' 
            }, 
            [CarouselItemContentState.DONE]: { 
                description: 'You completed this screen, do you want us to fetch statistics fro this page for you.', 
                mainActionText: 'Fetch data' 
            } 
        } 
    },
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

export { CarouselItemContentModel, CarouselItemContentState, CAROUSEL_ITEM_CONTENT };