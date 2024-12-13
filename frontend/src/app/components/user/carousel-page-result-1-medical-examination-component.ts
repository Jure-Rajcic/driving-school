import { Component, effect, inject, signal, ViewChild } from "@angular/core";
import { Observable } from "rxjs";
import { AsyncPipe, CommonModule } from "@angular/common";
import { HlmCarouselComponent, HlmCarouselContentComponent, HlmCarouselItemComponent, HlmCarouselNextComponent, HlmCarouselPreviousComponent } from '@spartan-ng/ui-carousel-helm';
import { provideIcons } from '@ng-icons/core';
import { lucideBell, lucideCheck, lucideCircleX, lucideCheckCheck, lucideCircleCheckBig, lucideLockKeyhole, lucideMenu } from '@ng-icons/lucide';
import { HlmCardDirective } from '@spartan-ng/ui-card-helm';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';
import { CarouselPageItemComponent } from 'src/app/components/user/carousel-page-item-component';
import { CarouselPageModel, CarouselPageState } from 'src/app/models/carousel-page-model';

import { HlmSwitchComponent } from '@spartan-ng/ui-switch-helm';
import { CarouselPageContentComponent } from 'src/app/components/user/carousel-page-content-component';
import { ParagraphWidgetComponent } from 'src/app/widgets/paragraph-widget';
import { ButtonWidgetComponent } from 'src/app/widgets/button-widget';
import { CarouselPageResultComponent } from 'src/app/components/user/carousel-page-result-component';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { hlmH1, hlmP } from '../../../../libs/ui/ui-typography-helm/src/index';
import { AppointmentManagementService } from "src/app/services/1-medical-examination-admin-appointment-managment-service";
import {
  HlmAccordionContentComponent,
  HlmAccordionDirective,
  HlmAccordionIconDirective,
  HlmAccordionItemDirective,
  HlmAccordionTriggerDirective,
} from '@spartan-ng/ui-accordion-helm';
import { MedicalExaminationResultService } from "src/app/services/carousel-page-result-1-medical-examination-service";



@Component({
  selector: 'medical-examination-result',
  standalone: true,
  imports: [
    HlmButtonDirective,
    HlmIconComponent,
    HlmButtonDirective,
    HlmAccordionDirective,
    HlmAccordionItemDirective,
    HlmAccordionTriggerDirective,
    HlmAccordionContentComponent,
    HlmAccordionIconDirective,
    HlmIconComponent,
    CommonModule,
  ],
  providers: provideIcons({ lucideCircleCheckBig, lucideCheckCheck, lucideCircleX }),
  templateUrl: './carousel-page-result-1-medical-examination-component.html',
})

export class MedicalExaminationResultComponent {



  // constructor() {
  //   // Simulate a state change after 2 seconds (example)
  //   setTimeout(() => {
  //     this.toggleAccordionState(0);
  //   }, 2000);
  // }

  // A method to toggle the state of an accordion item by index


  private readonly service = inject(MedicalExaminationResultService);
  readonly accordionItems = this.service.accordionItems;


}