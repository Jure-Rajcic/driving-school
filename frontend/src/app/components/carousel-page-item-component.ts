import { Component, ViewChild, OnDestroy, Input, AfterViewInit } from '@angular/core';
import { AppSvgComponent } from 'src/app/components/app-svg-component';
import { provideIcons } from '@ng-icons/core';
import { lucideBell, lucideCheck, lucideInfo, lucideCircleCheckBig, lucideLockKeyhole } from '@ng-icons/lucide';
import { HlmCardContentDirective } from '@spartan-ng/ui-card-helm';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';
import { BrnAlertDialogContentDirective, BrnAlertDialogTriggerDirective } from '@spartan-ng/ui-alertdialog-brain';
import {
    HlmAlertDialogActionButtonDirective,
    HlmAlertDialogCancelButtonDirective,
    HlmAlertDialogComponent,
    HlmAlertDialogContentComponent,
    HlmAlertDialogDescriptionDirective,
    HlmAlertDialogFooterComponent,
    HlmAlertDialogHeaderComponent,
    HlmAlertDialogTitleDirective,
} from '@spartan-ng/ui-alertdialog-helm';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { Subject, Subscription } from 'rxjs';
import { CarouselPageModel, CarouselPageState } from '../models/carousel-page-model';
import { AsyncPipe, CommonModule } from '@angular/common';
import { DialogDoneModel, CarouselPageItemDialogModel, DialogLockedModel, DialogWorkInProgressModel } from '../models/carousel-page-item-dialog-model';



@Component({
    standalone: true,
    selector: 'carousel-page-item',
    imports: [
        CommonModule,
        AppSvgComponent,
        HlmButtonDirective,
        HlmCardContentDirective,
        HlmIconComponent,
        BrnAlertDialogTriggerDirective,
        BrnAlertDialogContentDirective,
        HlmAlertDialogComponent,
        HlmAlertDialogHeaderComponent,
        HlmAlertDialogFooterComponent,
        HlmAlertDialogTitleDirective,
        HlmAlertDialogDescriptionDirective,
        HlmAlertDialogCancelButtonDirective,
        HlmAlertDialogActionButtonDirective,
        HlmAlertDialogContentComponent,
        HlmButtonDirective,
        AsyncPipe,
    ],
    providers: [
        provideIcons({ lucideCheck, lucideBell, lucideInfo, lucideCircleCheckBig, lucideLockKeyhole }),
    ],
    template: `
        <p hlmCardContent class="aspect-square relative">
            <app-svg #appSvg [baseFileName]="model.svgBaseFileName"></app-svg>
            <hlm-alert-dialog>
                <button class="absolute top-2 right-2" hlmBtn [variant]="'ghost'" brnAlertDialogTrigger>
                    <hlm-icon *ngIf="(iconName$ | async) as iconName" size="base" [name]="iconName"></hlm-icon>
                </button>
                <hlm-alert-dialog-content *brnAlertDialogContent="let ctx">
                <hlm-alert-dialog-header>
                    <h3 hlmAlertDialogTitle>{{model.title}}</h3>
                    <p hlmAlertDialogDescription>{{ dialog?.metaData?.description }}</p>
                </hlm-alert-dialog-header>
                <hlm-alert-dialog-footer>
                    <button hlmAlertDialogCancel (click)="ctx.close()">Cancel</button>
                    <button hlmAlertDialogAction (click)="dialog?.onMainActionClick(); ctx.close()">Platform Demo</button>
                </hlm-alert-dialog-footer>
                </hlm-alert-dialog-content>
            </hlm-alert-dialog>
        </p>
`,
})


export class CarouselPageItemComponent implements OnDestroy, AfterViewInit {
    @Input()
    public model!: CarouselPageModel;
    protected iconName$ = new Subject<string>();
    protected dialog: CarouselPageItemDialogModel | null = null;
    private subscription = new Subscription();


    ngAfterViewInit() {
        this.handleStateChange();
    }

    @ViewChild('appSvg')
    appSvgComponent!: AppSvgComponent;

    ngOnChanges() {
        if (this.appSvgComponent) {
            this.handleStateChange();
        }
    }

    private handleStateChange() {
        if (!this.model) return;

        this.subscription.add(
            this.model.state$.subscribe(state => {

                if (this.dialog) this.dialog.onExit();
               
                let dialogImple, iconName;
                switch (state) {
                    case CarouselPageState.LOCKED:
                        dialogImple = this.model.dialogBox.dialogs[CarouselPageState.LOCKED].setProperty('appSvgComponent', this.appSvgComponent);
                        iconName = 'lucideLockKeyhole';
                        break;
                    case CarouselPageState.WIP:
                        dialogImple = this.model.dialogBox.dialogs[CarouselPageState.WIP];
                        iconName = 'lucideInfo';
                        break;
                    case CarouselPageState.DONE:
                        dialogImple = this.model.dialogBox.dialogs[CarouselPageState.DONE];
                        iconName = 'lucideCircleCheckBig';
                        break;
                    default:
                        throw new Error('Unsupported state');
                }

                setTimeout(() => {
                    this.iconName$.next(iconName);
                    this.dialog = dialogImple;
                    this.dialog.onInit();
                });
            })
        );
    }
    

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
