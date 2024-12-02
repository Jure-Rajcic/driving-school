import { Component, inject, model, Type, ViewChild } from '@angular/core';
import { HlmCarouselComponent, HlmCarouselContentComponent, HlmCarouselItemComponent } from '@spartan-ng/ui-carousel-helm';
import { hlmH1 } from './../../../../libs/ui/ui-typography-helm/src/index';
import { provideIcons } from '@ng-icons/core';
import { lucideBell, lucideCheck, lucideInfo, lucideCircleCheckBig, lucideLockKeyhole } from '@ng-icons/lucide';
import { HlmCardDirective } from '@spartan-ng/ui-card-helm';
import { CarouselPageItemComponent } from 'src/app/components/carousel-page-item-component';
import { CarouselPageModel, CarouselPageState } from 'src/app/models/carousel-page-model';

import { CarouselPageContentComponent } from 'src/app/components/carousel-page-content-component';
import { CarouselPageResultComponent } from 'src/app/components/carousel-page-result-component';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './home-view-component.component.html',
  imports: [
    HlmCarouselComponent,
    HlmCarouselContentComponent,
    HlmCarouselItemComponent,
    HlmCardDirective,
    CarouselPageItemComponent,
    CarouselPageContentComponent,
    CarouselPageResultComponent,
  ],
  providers: [
    provideIcons({ lucideCheck, lucideBell, lucideInfo, lucideCircleCheckBig, lucideLockKeyhole }),
  ],

})
export class HomeViewComponentComponent {
  hlmH1 = hlmH1;

  protected readonly models: CarouselPageModel[];
  protected currentModel: CarouselPageModel;

  constructor() {
    // TODO - fetch data from API
    this.models = [
      new CarouselPageModel(1, CarouselPageState.WIP),
      new CarouselPageModel(2, CarouselPageState.LOCKED),
      // new CarouselPageModel(3, CarouselPageState.WIP),
    ];
    // let startingIndex = this.models.findIndex((model) => model.state === CarouselPageState.WIP) || this.models.length - 1;
    this.currentModel = this.models[0];
  }

  @ViewChild(HlmCarouselComponent) carousel!: HlmCarouselComponent;

  getInputs: Record<string, any> = { content: 'Medical examination to confirm your fitness for driving.' };

  ngAfterViewInit() {

    this.scrollTo(this.models.indexOf(this.currentModel));

    this.carousel.emblaCarousel?.emblaChange.subscribe((_) => {
      const currentIndex = this.carousel.emblaCarousel?.emblaApi?.selectedScrollSnap();
      if (currentIndex !== undefined) {
        this.currentModel = this.models[currentIndex];
      }
    });
  }

  scrollPrevious() {
    if (this.carousel.canScrollPrev()) {
      this.carousel.scrollPrev();
    }
  }

  scrollNext() {
    if (this.carousel.canScrollNext()) {
      this.carousel.scrollNext();
    }
  }

  scrollTo(index: number) {
    this.carousel.emblaCarousel?.scrollTo(index);
  }

  // TODO iskorisitti za promjenu sata preko childa da emita event
  // handleClick() {
  //   console.log('click');
  //   this.models[0].setState(CarouselPageState.LOCKED)// updata se ikona i mogu skrolat s gornjim komponentama => imam sve!!!

  //   // if (this.startingIndex == 0) {
  //   //   this.currentWidget = ParagraphWidgetComponent;
  //   //   this.currentWidgetInputs = { content: 'Medical examination to confirm your fitness for driving.' };
  //   // } else {
  //   //   this.currentWidget = ButtonWidgetComponent;
  //   //   this.currentWidgetInputs = { label: 'Click me', action: () => alert('Button clicked!') };
  //   // }
  // }

}
