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
import { CAROUSEL_ITEM_CONTENT, CarouselItemContentModel, CarouselItemContentState } from '../models/carousel-item-content-model';
import { AsyncPipe, CommonModule } from '@angular/common';
import { DialogDone, DialogI, DialogLocked, DialogWIP } from '../models/dialogI';

type iconNameT = 'lucideLockKeyhole' | 'lucideInfo' | 'lucideCircleCheckBig';
type dialogConstructorT = (model: CarouselItemContentModel) => { dialogImple: DialogI; iconName: iconNameT; };

@Component({
    standalone: true,
    selector: 'carousel-item-content',
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
                    <p hlmAlertDialogDescription>{{ dialog?.description }}</p>
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



export class CarouselItemContentComponent implements OnDestroy, AfterViewInit {
    @Input() public model!: CarouselItemContentModel;
    protected iconName$ = new Subject<iconNameT>();
    protected dialog: DialogI | null = null;
    private subscription = new Subscription();

    private dialogConstructors: { [key in CarouselItemContentState]: dialogConstructorT } =
        {
            [CarouselItemContentState.LOCKED]: (model: CarouselItemContentModel) => ({
                dialogImple: new DialogLocked(
                    CAROUSEL_ITEM_CONTENT[model.id].state[CarouselItemContentState.LOCKED],
                    this.appSvgComponent
                ),
                iconName: 'lucideLockKeyhole',
            }),
            [CarouselItemContentState.WIP]: (model: CarouselItemContentModel) => ({
                dialogImple: new DialogWIP(
                    CAROUSEL_ITEM_CONTENT[model.id].state[CarouselItemContentState.WIP]
                ),
                iconName: 'lucideInfo',
            }),
            [CarouselItemContentState.DONE]: (model: CarouselItemContentModel) => ({
                dialogImple: new DialogDone(
                    CAROUSEL_ITEM_CONTENT[model.id].state[CarouselItemContentState.DONE],
                    model.id
                ),
                iconName: 'lucideCircleCheckBig',
            }),
        };

    @ViewChild('appSvg') appSvgComponent!: AppSvgComponent;
    ngAfterViewInit() {
        this.handleStateChange();
    }

    ngOnChanges() {
        if (this.appSvgComponent) {
            this.handleStateChange();
        }
    }

    private handleStateChange() {
        if (this.model) {
            this.subscription.add(
                this.model.state$.subscribe(state => {
                    if (this.dialog) this.dialog.onExit();
                    let { dialogImple, iconName } = this.dialogConstructors[state](this.model);
                    setTimeout(() => {
                        this.iconName$.next(iconName);
                        this.dialog = dialogImple;
                        this.dialog.onInit();
                    });
                })
            );
        }
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
