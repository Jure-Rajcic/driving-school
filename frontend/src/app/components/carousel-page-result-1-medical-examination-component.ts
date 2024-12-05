import { Component, inject, ViewChild } from "@angular/core";
import { AppointmentComponent } from "../widgets/appointment-component";
import { MedicalExaminationWidgetType, WidgetService } from "../services/widget-service";
import { Observable } from "rxjs";
import { AsyncPipe } from "@angular/common";
import { HlmCarouselComponent, HlmCarouselContentComponent, HlmCarouselItemComponent, HlmCarouselNextComponent, HlmCarouselPreviousComponent } from '@spartan-ng/ui-carousel-helm';
import { provideIcons } from '@ng-icons/core';
import { lucideBell, lucideCheck, lucideCircleX, lucideCheckCheck, lucideCircleCheckBig, lucideLockKeyhole, lucideMenu } from '@ng-icons/lucide';
import { HlmCardDirective } from '@spartan-ng/ui-card-helm';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';
import { CarouselPageItemComponent } from 'src/app/components/carousel-page-item-component';
import { CarouselPageModel, CarouselPageState } from 'src/app/models/carousel-page-model';

import { HlmSwitchComponent } from '@spartan-ng/ui-switch-helm';
import { CarouselPageContentComponent } from 'src/app/components/carousel-page-content-component';
import { ParagraphWidgetComponent } from 'src/app/widgets/paragraph-widget';
import { ButtonWidgetComponent } from 'src/app/widgets/button-widget';
import { CarouselPageResultComponent } from 'src/app/components/carousel-page-result-component';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { hlmH1, hlmP } from '../../../libs/ui/ui-typography-helm/src/index';
import { MedicalExaminationService } from "../services/carousel-page-service-1-medical-examination";

@Component({
  selector: 'medical-examination-result',
  standalone: true,
  imports: [
    HlmButtonDirective,
    HlmIconComponent,
    HlmButtonDirective,
  ],
  providers: provideIcons({ lucideCircleCheckBig, lucideCheckCheck, lucideCircleX }),
  template: `
    <div class="h-full flex flex-col gap-2 p-2">
      <div class="w-full flex flex-row items-center gap-2">
        <hlm-icon name="lucideCircleCheckBig" />
        <p> You have successfully requested appointments.</p>
      </div>
      <div class="w-full flex flex-row items-center gap-2">
        <hlm-icon name="lucideCircleCheckBig" />
        <p class="text-justify"> Our team has reserved one of the appointments for you.</p>
      </div>
      <div class="w-full flex flex-row items-center gap-2">
        <hlm-icon name="lucideCircleCheckBig" />
        <p class="text-justify"> Your calendar has been updated with the appointment details.</p>
      </div>
      <div class="w-full flex flex-row items-center gap-2">
        <hlm-icon name="lucideCircleCheckBig" />
        <p class="text-justify"> You attended the appointment</p>
      </div>
      <div class="w-full flex flex-row items-center gap-2">
      <hlm-icon name="lucideCircleX" class="text-red-500"></hlm-icon>
        <p>The administrator considers this step complete.</p>
      </div>

      <button class="mt-auto w-full" hlmBtn (click)="handleClick()">
        <hlm-icon size="sm" class="mr-2" name="lucideCheckCheck" /> Unlock Next Assignment
      </button>
    </div>
    `,
})
//TODO refactor to use realtime data to update the view
export class MedicalExaminationResultComponent {

  service = inject(MedicalExaminationService);

  handleClick() {
    console.log('simulateRequest');
    this.service.simulateRequest();
  }

}