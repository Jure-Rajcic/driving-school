import { BehaviorSubject } from 'rxjs';
import { DialogIMetaData } from './carousel-page-dialog-model';
import { ParagraphWidgetComponent } from '../widgets/paragraph-widget';
import { ButtonWidgetComponent } from '../widgets/button-widget';
import { Type } from '@angular/core';

enum CarouselPageState { LOCKED, WIP, DONE }

type CarouselPageType = {
    title: string;
    svgBaseFileName: string;
    dialogMetaData: { [key in CarouselPageState]: DialogIMetaData };
    widgetMetaData: WidgetMetaDataType;
};

type WidgetMetaDataType = {
    widget: Type<any>;
    inputs: Record<string, any>;
};

const CAROUSEL_PAGE_CONTENT: { [key: number]: CarouselPageType }= {
    1: { 
        title: 'Medical Examination', 
        svgBaseFileName: '[1]medical-examination', 
        dialogMetaData: { 
            [CarouselPageState.LOCKED]: { 
                description: 'This screen is locked until you administrator registers you in the app', 
                mainActionText: 'Call Driving school' 
            },
            [CarouselPageState.WIP]: { 
                description: 'You are required to undergo a medical examination to confirm your fitness for driving. This includes vision, hearing and general fitness testing.', 
                mainActionText: 'Take me back' 
            }, 
            [CarouselPageState.DONE]: { 
                description: 'You completed this screen, do you want us to fetch statistics fro this page for you.', 
                mainActionText: 'Fetch data' 
            } 
        },
        widgetMetaData: {
            widget: ParagraphWidgetComponent,
            inputs: { content: 'Medical examination to confirm your fitness for driving.' }
        }
    },
    2: { 
        title: 'Psycho Test', 
        svgBaseFileName: '[2]psycho-test', 
        dialogMetaData: { 
            [CarouselPageState.LOCKED]: { 
                description: 'This screen is becomes unlocked after you complete Medical Examination', 
                mainActionText: 'Call Driving school' 
            },
            [CarouselPageState.WIP]: { 
                description: 'After the medical examination, you will also need to undergo a psychophysical examination to determine your ability to drive.', 
                mainActionText: 'Take me back' 
            }, 
            [CarouselPageState.DONE]: { 
                description: 'You completed this screen, do you want us to fetch statistics fro this page for you.', 
                mainActionText: 'Fetch data' 
            } 
        },
        widgetMetaData: {
            widget: ButtonWidgetComponent,
            inputs: { label: 'Start Test', action: () => console.log('Start Test') }
        }
    },
    3: { 
        title: 'Chose Category', 
        svgBaseFileName: '[3]chose-category', 
        dialogMetaData: { 
            [CarouselPageState.LOCKED]: { 
                description: 'This screen is becomes unlocked after you pass the Psycho Test', 
                mainActionText: 'Call Driving school' 
            },
            [CarouselPageState.WIP]: { 
                description: 'After completing the psycho test, you will have to select category from our driving school options. Each category specifies the type of vehicles you will be required to drive.', 
                mainActionText: 'Take me back' 
            }, 
            [CarouselPageState.DONE]: { 
                description: 'You completed this screen, do you want us to fetch statistics fro this page for you.', 
                mainActionText: 'Fetch data' 
            } 
        },
        widgetMetaData: {
            widget: ParagraphWidgetComponent,
            inputs: { content: 'Chose Category' }
        }
    },
};

class CarouselPageModel {
    readonly id: number;
    readonly title: string;
    readonly svgBaseFileName: string;
    private _state$: BehaviorSubject<CarouselPageState>;
    readonly widgetMetaData: WidgetMetaDataType;

    constructor(id: number, state: CarouselPageState) {
        this.id = id;
        this._state$ = new BehaviorSubject(state);

        const { title, svgBaseFileName, widgetMetaData } = CAROUSEL_PAGE_CONTENT[id];
        this.title = title;
        this.svgBaseFileName = svgBaseFileName;
        this.widgetMetaData = widgetMetaData;
    }

    get state$() {
        return this._state$.asObservable();
    }

    setState(newState: CarouselPageState) {
        this._state$.next(newState);
    }

    get state(): CarouselPageState {
        return this._state$.getValue();
    }

}

export { CarouselPageModel , CarouselPageState, CAROUSEL_PAGE_CONTENT };