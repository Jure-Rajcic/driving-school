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
import { BehaviorSubject, Subscription } from 'rxjs';
import { CarouselItemContentModel, CarouselItemContentState, DialogI, DialogLocked, DialogUnlocked } from '../models/carousel-item-content-model';
import { AsyncPipe } from '@angular/common';


@Component({
    standalone: true,
    selector: 'carousel-item-content',
    imports: [
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
                <hlm-icon size="base" [name]="(iconName$ | async) ?? '' "></hlm-icon>
                </button>
                <hlm-alert-dialog-content *brnAlertDialogContent="let ctx">
                <hlm-alert-dialog-header>
                    <h3 hlmAlertDialogTitle>{{model.title}}</h3>
                    <p hlmAlertDialogDescription>{{ dialog?.description }}</p>
                </hlm-alert-dialog-header>
                <hlm-alert-dialog-footer>
                    <button hlmAlertDialogCancel (click)="ctx.close()">Cancel</button>
                    <button hlmAlertDialogAction (click)="dialog?.mainActionClick(); ctx.close()">Platform Demo</button>
                </hlm-alert-dialog-footer>
                </hlm-alert-dialog-content>
            </hlm-alert-dialog>
            </p>
`,
})

export class CarouselItemContentComponent implements OnDestroy, AfterViewInit {
    @Input() public model!: CarouselItemContentModel; 
    protected iconName$ = new BehaviorSubject<string>(''); 
    protected dialog: DialogI | null = null;

    private subscription = new Subscription();
    private iconNames = {
        [CarouselItemContentState.LOCKED]: 'lucideLockKeyhole',
        [CarouselItemContentState.WIP]: 'lucideInfo',
        [CarouselItemContentState.DONE]: 'lucideCircleCheckBig',
    };
    private dialogConstructors = {
        [CarouselItemContentState.LOCKED]: (model: CarouselItemContentModel) => new DialogLocked(model.id, this.appSvgComponent),
        [CarouselItemContentState.WIP]: (model: CarouselItemContentModel) => new DialogUnlocked(model.id),
        [CarouselItemContentState.DONE]: (model: CarouselItemContentModel) => new DialogUnlocked(model.id),
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
                    this.iconName$.next(this.iconNames[state]);
                    if (this.dialog) {
                        this.dialog.onExit();
                    }
                    this.dialog = this.dialogConstructors[state](this.model);
                    this.dialog.onInit();
                })
            );
        }
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}