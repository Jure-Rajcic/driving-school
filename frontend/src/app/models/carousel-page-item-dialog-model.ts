import { AppSvgComponent } from "../components/app-svg-component";

export type DialogIMetaData = {
    description: string;
    mainActionText: string;
};

export abstract class CarouselPageItemDialogModel {
    [key: string]: any;
    constructor(readonly metaData: DialogIMetaData) { }

    setProperty(key: string, value: any): this {
        this[key] = value;
        return this;
    }

    onInit(): void { };
    onMainActionClick(): void { };
    onExit(): void { };
}


export class DialogLockedModel extends CarouselPageItemDialogModel {

    override setProperty(key: 'appSvgComponent', value: AppSvgComponent): this {
        return super.setProperty(key, value);
    }

    override onInit(): void {
        let appSvgComponent = this['appSvgComponent'] as AppSvgComponent;
        appSvgComponent.setFilter('grayscale(100%)');
    }

    override onExit(): void {
        let appSvgComponent = this['appSvgComponent'] as AppSvgComponent;
        appSvgComponent.setFilter('none');
        // TODO update the state in db
        // TODO save Date time to db when did the user unlocked this screen
    }
}


export class DialogWorkInProgressModel extends CarouselPageItemDialogModel {

    override onExit(): void {
        // TODO update the state in db
        // TODO save Date time to db when did the user completed this screen
    }
}

export class DialogDoneModel extends CarouselPageItemDialogModel {
    // private readonly StatisticsServiceI: StatisticsServiceI;

    constructor(dialogIMetaData: DialogIMetaData) {
        super(dialogIMetaData);
    }

    override onInit(): void {
        // TODO get the relative statistics from the service i mozda setat za dohvatit nove vrijednosti
        console.log('DialogDone onInit');
        setTimeout(() => {
            this.metaData.description = 'You have spent 10 days on this section, in that time you have solved 20 tests and 10 quizzes. Keep up the good work!';
            this.metaData.mainActionText = 'Open my tests';
        }, 10000);
    }
}



