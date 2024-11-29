import { Component, ViewChild } from '@angular/core';
import { AppSvgComponent } from 'src/app/components/app-svg-component';
import { HlmCarouselComponent, HlmCarouselContentComponent, HlmCarouselItemComponent, HlmCarouselNextComponent, HlmCarouselPreviousComponent } from '@spartan-ng/ui-carousel-helm';
import { hlmH1, hlmP } from './../../../../libs/ui/ui-typography-helm/src/index';
import { provideIcons } from '@ng-icons/core';
import { lucideBell, lucideCheck, lucideInfo, lucideCircleCheckBig,  lucideLockKeyhole } from '@ng-icons/lucide';
import {
  HlmCardContentDirective,
  HlmCardDescriptionDirective,
  HlmCardDirective,
  HlmCardFooterDirective,
  HlmCardHeaderDirective,
  HlmCardTitleDirective,
} from '@spartan-ng/ui-card-helm';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';
import { HlmSwitchComponent } from '@spartan-ng/ui-switch-helm';
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
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { CarouselItemContentComponent } from 'src/app/components/carousel-item-content-component';
import { CarouselItemContentModel, CarouselItemContentState } from 'src/app/models/carousel-item-content-model';
@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './home-view-component.component.html',
  imports: [
    AppSvgComponent,
    HlmCarouselComponent,
    HlmCarouselContentComponent,
    HlmCarouselItemComponent,
    HlmCarouselNextComponent,
    HlmCarouselPreviousComponent,
    HlmButtonDirective,
    HlmCardContentDirective,
    HlmCardDescriptionDirective,
    HlmCardDirective,
    HlmCardFooterDirective,
    HlmCardHeaderDirective,
    HlmCardTitleDirective,
    HlmIconComponent,
    HlmSwitchComponent,
    BrnAlertDialogTriggerDirective,
    BrnAlertDialogContentDirective,

    HlmAlertDialogComponent,
    HlmAlertDialogOverlayDirective,
    HlmAlertDialogHeaderComponent,
    HlmAlertDialogFooterComponent,
    HlmAlertDialogTitleDirective,
    HlmAlertDialogDescriptionDirective,
    HlmAlertDialogCancelButtonDirective,
    HlmAlertDialogActionButtonDirective,
    HlmAlertDialogContentComponent,

    HlmButtonDirective,
    CarouselItemContentComponent,
    
  ],
  providers: [
    provideIcons({ lucideCheck, lucideBell, lucideInfo, lucideCircleCheckBig,  lucideLockKeyhole}),
  ],

})
export class HomeViewComponentComponent {
  hlmH1 = hlmH1;
  hlmP = hlmP;
  // TODO napravit preko faktorya za svaki scrren dialog, npr onInit za ovaj za info moze setat metadatu, za prodeno za statistiku moze fetcaht podatke i za zakljucano moze greyscalat svg
  models = [
    new CarouselItemContentModel(1, CarouselItemContentState.DONE),
    new CarouselItemContentModel(2, CarouselItemContentState.WIP),
    new CarouselItemContentModel(3, CarouselItemContentState.LOCKED),
  ];

  startingIndex = 0;

  @ViewChild(HlmCarouselComponent) carousel!: HlmCarouselComponent;

  ngAfterViewInit() {
    // this.startingIndex get from the backend

    // Scroll to the starting position
    this.scrollTo(this.startingIndex);

    // Start listening for changes to the carousel
    this.carousel.emblaCarousel?.emblaChange.subscribe((_) => {
      const currentIndex = this.carousel.emblaCarousel?.emblaApi?.selectedScrollSnap();
      if (currentIndex !== undefined) {
        this.startingIndex = currentIndex
      }
    });
  }

  // Method to scroll to the previous slide
  scrollPrevious() {
    if (this.carousel.canScrollPrev()) {
      this.carousel.scrollPrev();
    }
  }

  // Method to scroll to the next slide
  scrollNext() {
    if (this.carousel.canScrollNext()) {
      this.carousel.scrollNext();
    }
  }

  // Method to scroll to a specific slide
  scrollTo(index: number) {
    this.carousel.emblaCarousel?.scrollTo(index);
  }

  protected notifications = [
    {
      id: 1,
      title: 'Your call has been confirmed.',
      description: '1 hour ago',
    },
    {
      id: 2,
      title: 'You have a new message!',
      description: '1 hour ago',
    },
    {
      id: 3,
      title: 'Your subscription is expiring soon!',
      description: '2 hours ago',
    },
  ];

  handleClick() {
    console.log('click');
    this.models[2].setState(CarouselItemContentState.DONE) // updata se ikona i mogu skrolat s gornjim komponentama => imam sve!!!
  }

}
