import { BehaviorSubject } from 'rxjs';
import { Type } from '@angular/core';
import { CarouselPageItemDialogs, ChoseCategoryItemDialogs, MedicalExaminationItemDialogs, PsychoTestItemDialogs } from './carousel-page-item-dialogs-model';
import { MedicalExaminationContentComponent } from '../components/user/carousel-page-content-1-medical-examination-component';
import { MedicalExaminationResultComponent } from '../components/user/carousel-page-result-1-medical-examination-component';

enum CarouselPageState { LOCKED, WIP, DONE }

type CarouselPageType = {
    title: string;
    svgBaseFileName: string;
    dialogBox: CarouselPageItemDialogs;
    contentComponent: Type<any>;
    resultComponent: Type<any>;
};

const CAROUSEL_PAGE_CONTENT: { [key: number]: CarouselPageType }= {
    1: { 
        title: 'Medical Examination', 
        svgBaseFileName: '[1]medical-examination', 
        dialogBox: new MedicalExaminationItemDialogs(),
        contentComponent: MedicalExaminationContentComponent,
        resultComponent: MedicalExaminationResultComponent,
    },
    2: { 
        title: 'Psycho Test', 
        svgBaseFileName: '[2]psycho-test', 
        dialogBox: new PsychoTestItemDialogs(),
        contentComponent: MedicalExaminationContentComponent,
        resultComponent: MedicalExaminationResultComponent,
    },
    // 3: { 
    //     title: 'Chose Category', 
    //     svgBaseFileName: '[3]chose-category', 
    //     dialogs: new ChoseCategoryItemDialogs(),
    //     widgetMetaData: {
    //         widget: ParagraphWidgetComponent,
    //         inputs: { content: 'Chose Category' }
    //     },
    //     resultComponent: MedicalExaminationResultComponent,
    // },
};

class CarouselPageModel {
    readonly id: number;
    readonly title: string;
    readonly svgBaseFileName: string;
    readonly dialogBox: CarouselPageItemDialogs;
    readonly contentComponent: Type<any>;
    readonly resultComponent: Type<any>;

    private _state$: BehaviorSubject<CarouselPageState>;

    constructor(id: number, state: CarouselPageState) {
        this.id = id;
        this._state$ = new BehaviorSubject(state);

        const { title, svgBaseFileName, dialogBox, contentComponent: widgetMetaData, resultComponent } = CAROUSEL_PAGE_CONTENT[id];

        this.title = title;
        this.svgBaseFileName = svgBaseFileName;
        this.dialogBox = dialogBox;
        this.contentComponent = widgetMetaData;
        this.resultComponent = resultComponent;
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

export { CarouselPageModel , CarouselPageState };