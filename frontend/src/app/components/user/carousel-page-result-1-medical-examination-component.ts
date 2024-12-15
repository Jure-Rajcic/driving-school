import { Component, inject,  } from "@angular/core";
import { CommonModule } from "@angular/common";
import { provideIcons } from '@ng-icons/core';
import { lucideCircleX, lucideCheckCheck, lucideCircleCheckBig } from '@ng-icons/lucide';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import {
  HlmAccordionContentComponent,
  HlmAccordionDirective,
  HlmAccordionIconDirective,
  HlmAccordionItemDirective,
  HlmAccordionTriggerDirective,
} from '@spartan-ng/ui-accordion-helm';
import { UserMedicalExaminationService } from "src/app/services/user/1-medical-examination-service";



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

  private readonly service = inject(UserMedicalExaminationService);
  readonly accordionItems = this.service.accordionItems;

}