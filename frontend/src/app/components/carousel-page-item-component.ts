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
import { CAROUSEL_PAGE_CONTENT, CarouselPageModel, CarouselPageState } from '../models/carousel-page-model';
import { AsyncPipe, CommonModule } from '@angular/common';
import { DialogDone, CarouselItemDialogModel, DialogLocked, DialogWIP } from '../models/carousel-page-dialog-model';

type iconNameT = 'lucideLockKeyhole' | 'lucideInfo' | 'lucideCircleCheckBig';
type dialogConstructorT = (model: CarouselPageModel) => { dialogImple: CarouselItemDialogModel; iconName: iconNameT; };

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


export class CarouselItemComponent implements OnDestroy, AfterViewInit {
    @Input() public model!: CarouselPageModel;
    protected iconName$ = new Subject<iconNameT>();
    protected dialog: CarouselItemDialogModel | null = null;
    private subscription = new Subscription();

    private dialogConstructors: { [key in CarouselPageState]: dialogConstructorT } =
        {
            [CarouselPageState.LOCKED]: (model: CarouselPageModel) => ({
                dialogImple: new DialogLocked(
                    CAROUSEL_PAGE_CONTENT[model.id].dialogMetaData[CarouselPageState.LOCKED],
                    this.appSvgComponent
                ),
                iconName: 'lucideLockKeyhole',
            }),
            [CarouselPageState.WIP]: (model: CarouselPageModel) => ({
                dialogImple: new DialogWIP(
                    CAROUSEL_PAGE_CONTENT[model.id].dialogMetaData[CarouselPageState.WIP]
                ),
                iconName: 'lucideInfo',
            }),
            [CarouselPageState.DONE]: (model: CarouselPageModel) => ({
                dialogImple: new DialogDone(
                    CAROUSEL_PAGE_CONTENT[model.id].dialogMetaData[CarouselPageState.DONE],
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
