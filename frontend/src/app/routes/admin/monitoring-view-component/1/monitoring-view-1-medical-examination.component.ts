import { Component, inject, ViewChild } from "@angular/core";
import { Observable } from "rxjs";
import { AsyncPipe } from "@angular/common";
import { HlmBadgeDirective } from '@spartan-ng/ui-badge-helm';
import {
  HlmCardContentDirective,
  HlmCardDescriptionDirective,
  HlmCardDirective,
  HlmCardFooterDirective,
  HlmCardHeaderDirective,
  HlmCardTitleDirective,
} from '@spartan-ng/ui-card-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import {
  HlmTabsComponent,
  HlmTabsContentDirective,
  HlmTabsListComponent,
  HlmTabsTriggerDirective,
} from '@spartan-ng/ui-tabs-helm';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { lucidePlus } from "@ng-icons/lucide";
import { provideIcons } from "@ng-icons/core";
import { HlmIconComponent } from "../../../../../../libs/ui/ui-icon-helm/src/lib/hlm-icon.component";
import {
  BrnAlertDialogContentDirective,
  BrnAlertDialogTriggerDirective,
} from '@spartan-ng/ui-alertdialog-brain';
import {
  HlmAlertDialogActionButtonDirective,
  HlmAlertDialogCancelButtonDirective,
  HlmAlertDialogComponent,
  HlmAlertDialogContentComponent,
  HlmAlertDialogDescriptionDirective,
  HlmAlertDialogFooterComponent,
  HlmAlertDialogHeaderComponent,
  HlmAlertDialogOverlayDirective,
  HlmAlertDialogTitleDirective,
} from '@spartan-ng/ui-alertdialog-helm';
import { signal } from '@angular/core';
import { lucideCheck, lucideChevronDown } from '@ng-icons/lucide';

import { BrnCommandImports } from '@spartan-ng/ui-command-brain';
import { HlmCommandImports } from '@spartan-ng/ui-command-helm';
import { HlmPopoverContentDirective } from '@spartan-ng/ui-popover-helm';
import {
  BrnPopoverComponent,
  BrnPopoverContentDirective,
  BrnPopoverTriggerDirective,
} from '@spartan-ng/ui-popover-brain';
import { AppointmentComponent } from "src/app/components/admin/appointment-component";
import { hlmH1 } from "@spartan-ng/ui-typography-helm";
import { AppointmentManagementService } from "src/app/services/1-medical-examination-admin-appointment-managment-service";
import { APPOINTMENT_CONFIRMATION_SERVICE, APPOINTMENT_MANAGEMENT_SERVICE, AppointmentConfirmationReqDto, AppointmentDTO } from "@shared/dtos";
import { SocketService } from "src/app/services/socket-service";

type Clinic = { label: string; value: string }

@Component({
  selector: 'medical-examination-content',
  standalone: true,
  imports: [AppointmentComponent, AsyncPipe, HlmButtonDirective, HlmTabsComponent,
    HlmTabsListComponent,
    HlmTabsTriggerDirective,
    HlmTabsContentDirective,
    HlmCardContentDirective,
    HlmCardDescriptionDirective,
    HlmCardDirective,
    HlmCardFooterDirective,
    HlmCardHeaderDirective,
    HlmCardTitleDirective,
    HlmLabelDirective,
    HlmInputDirective,
    HlmButtonDirective,
    HlmIconComponent,
    BrnAlertDialogTriggerDirective,
    BrnAlertDialogContentDirective,

    HlmAlertDialogComponent,
    BrnCommandImports,
    HlmCommandImports,
    HlmIconComponent,
    BrnPopoverComponent,
    BrnPopoverTriggerDirective,
    BrnPopoverContentDirective,
    HlmPopoverContentDirective,
    HlmCardDirective,
    HlmCardHeaderDirective,
    HlmCardTitleDirective,
    HlmCardDescriptionDirective,
    HlmCardContentDirective,
    HlmLabelDirective,
    HlmInputDirective,
    HlmCardFooterDirective,
    HlmButtonDirective,

    HlmButtonDirective,
    AppointmentComponent,
    BrnCommandImports,
    HlmCommandImports,
    HlmIconComponent,
    BrnPopoverComponent,
    BrnPopoverTriggerDirective,
    BrnPopoverContentDirective,
    HlmPopoverContentDirective,
    HlmCardDirective,
    HlmCardHeaderDirective,
    HlmCardTitleDirective,
    HlmCardDescriptionDirective,
    HlmCardContentDirective,
    HlmLabelDirective,
    HlmInputDirective,
    HlmCardFooterDirective,
    HlmButtonDirective,
    HlmAlertDialogContentComponent,
    HlmAlertDialogHeaderComponent,
    HlmAlertDialogFooterComponent,
  
  ],
    providers: [provideIcons({ lucidePlus, lucideCheck, lucideChevronDown })],
    templateUrl: './monitoring-view-1-medical-examination.component.html',
})
export class MonitoringViewMedicalExaminationComponent {

  hlmH1 = hlmH1;
  adminService = inject(AppointmentManagementService);
  appointments = this.adminService.appointments;

  public clinics = [
    {
      label: 'Clinic 1',
      value: 'clinic-1'
    },
    {
      label: 'Clinic 2',
      value: 'clinic-2'
    },
    {
      label: 'Clinic 3',
      value: 'clinic-3'
    },
  ];

  public currentClinic = signal<Clinic | undefined>(undefined);
  public state = signal<'closed' | 'open'>('closed');

  stateChanged(state: 'open' | 'closed') {
    this.state.set(state);
  }

  commandSelected(framework: Clinic) {
    this.state.set('closed');
    if (this.currentClinic()?.value === framework.value) {
      this.currentClinic.set(undefined);
    } else {
      this.currentClinic.set(framework);
    }
  }

  socketService = inject(SocketService);

  simulateAdminAddedAppointment() {
    const demo: AppointmentDTO = {'date': '2021-01-01', 'time': '12:00', 'location': 'New York'};
    this.socketService.sendSocketEvent(APPOINTMENT_MANAGEMENT_SERVICE, demo);
  }

  simulateClientSendAppointmentConfirmationReq() {
    const dummy: AppointmentConfirmationReqDto = {
      appointments: [
        { date: '2021-01-01', time: '12:00', location: 'New York'},
        { date: '2021-01-01', time: '12:00', location: 'New York'},
        { date: '2021-01-01', time: '12:00', location: 'New York'},
      ],
      userId: 1
    }
    this.socketService.sendSocketEvent(APPOINTMENT_CONFIRMATION_SERVICE, dummy)
  }

  
}