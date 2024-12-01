import { BehaviorSubject } from 'rxjs';
import { DialogIMetaData } from './carousel-page-item-dialog-model';
import { ParagraphWidgetComponent } from '../widgets/paragraph-widget';
import { ButtonWidgetComponent } from '../widgets/button-widget';
import { Type } from '@angular/core';
import { MedicalExaminationContentComponent } from '../components/carousel-page-content-1-medical-examination-component';
import { CarouselPageItemDialogs, ChoseCategoryItemDialogs, MedicalExaminationItemDialogs, PsychoTestItemDialogs } from './carousel-page-item-dialogs-model';

enum CarouselPageState { LOCKED, WIP, DONE }

type CarouselPageType = {
    title: string;
    svgBaseFileName: string;
    dialogs: CarouselPageItemDialogs;
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
        dialogs: new MedicalExaminationItemDialogs(),
        widgetMetaData: {
            widget: MedicalExaminationContentComponent,
            inputs: { content: 'Medical examination to confirm your fitness for driving.' }
        }
    },
    2: { 
        title: 'Psycho Test', 
        svgBaseFileName: '[2]psycho-test', 
        dialogs: new PsychoTestItemDialogs(),
        widgetMetaData: {
            widget: ButtonWidgetComponent,
            inputs: { label: 'Start Test', action: () => console.log('Start Test') }
        }
    },
    3: { 
        title: 'Chose Category', 
        svgBaseFileName: '[3]chose-category', 
        dialogs: new ChoseCategoryItemDialogs(),
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
    readonly dialogBox: CarouselPageItemDialogs;
    readonly widgetMetaData: WidgetMetaDataType;

    private _state$: BehaviorSubject<CarouselPageState>;

    constructor(id: number, state: CarouselPageState) {
        this.id = id;
        this._state$ = new BehaviorSubject(state);

        const { title, svgBaseFileName, dialogs: dialogBox, widgetMetaData } = CAROUSEL_PAGE_CONTENT[id];
        this.title = title;
        this.svgBaseFileName = svgBaseFileName;
        this.dialogBox = dialogBox;
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