import { AppSvgComponent } from "../components/app-svg-component";

export type DialogIMetaData = {
    description: string;
    mainActionText: string;
};

export abstract class DialogI {
    description: string;
    actionText: string;

    constructor(dialogIMetaData: DialogIMetaData) {
        this.description = dialogIMetaData.description;
        this.actionText = dialogIMetaData.mainActionText;
    }

    onInit(): void { };
    onMainActionClick(): void { };
    onExit(): void { };
}


export class DialogLocked extends DialogI {
    private readonly appSvgComponent: AppSvgComponent;

    constructor(dialogIMetaData: DialogIMetaData, appSvgComponent: AppSvgComponent) {
        super(dialogIMetaData);
        this.appSvgComponent = appSvgComponent;
    }

    override onInit(): void {
        this.appSvgComponent.setFilter('grayscale(100%)');
    }

    override onExit(): void {
        this.appSvgComponent.setFilter('none');
        // update the state in db
        // save Date time to db when did the user unlocked this screen
    }
}


export class DialogWIP extends DialogI {
    constructor(dialogIMetaData: DialogIMetaData) {
        super(dialogIMetaData);
    }
    
    override onExit(): void {
        // update the state in db
        // save Date time to db when did the user completed this screen
    }
}

export class DialogDone extends DialogI {
    // private readonly StatisticsServiceI: StatisticsServiceI;

    constructor(dialogIMetaData: DialogIMetaData, id: number) {
        super(dialogIMetaData);
        // switch (id) {
        //     case 1:
        //         this.StatisticsServiceI = new PsychoTestStatisticsService(); // TODO preko injecta rade ili singletona
        //         break;
        //     default:
        //         throw new Error('Invalid id');
        // }
    }

    override onInit(): void {
        // get the relative statistics from the service
        setTimeout(() => {
            this.description = 'You have spent 10 days on this section, in that time you have solved 20 tests and 10 quizzes. Keep up the good work!';
            this.actionText = 'Open my tests';
        }, 10000);
    }
}




