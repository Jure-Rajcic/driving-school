import { Component, inject, Input, OnInit, ElementRef, Renderer2, OnDestroy } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
    standalone: true,
    selector: 'app-svg',
    template: '<div [innerHtml]="_svgContent" class="w-full h-full"></div>',
})
export class AppSvgComponent implements OnInit, OnDestroy {
    protected _svgContent: SafeHtml = '';
    private readonly _sanitizer = inject(DomSanitizer);
    private readonly elementRef = inject(ElementRef);
    private readonly renderer = inject(Renderer2);
    private observer: MutationObserver | null = null;

    @Input({ required: true }) baseFileName!: string;

    ngOnInit() {
        this.loadSvg('assets/svg/' + this.baseFileName + '.svg');
        this.applyHostClasses();
    }

    ngOnDestroy() {
        if (this.observer) {
            this.observer.disconnect();
        }
    }

    loadSvg(path: string) {
        fetch(path)
            .then(response => response.text())
            .then(svg => {
                const parser = new DOMParser();
                const svgDoc = parser.parseFromString(svg, 'image/svg+xml');
                const svgElement = svgDoc.querySelector('svg');
                if (svgElement) {
                    svgElement.setAttribute('width', '100%');
                    svgElement.setAttribute('height', '100%');
                }
                this._svgContent = this._sanitizer.bypassSecurityTrustHtml(svgElement?.outerHTML || '');
                this.observeSvgInsertion();
            })
            .catch(error => console.error('Error loading SVG:', error));
    }

    private applyHostClasses() {
        const hostElement = this.elementRef.nativeElement as HTMLElement;
        const classList = hostElement.classList;

        if (classList) {
            classList.forEach(className => {
                this.renderer.addClass(hostElement.firstElementChild, className);
            });
        }
    }

    private observeSvgInsertion() {
        const hostElement = this.elementRef.nativeElement as HTMLElement;

        if (!this.observer) {
            this.observer = new MutationObserver(() => {
                const svgElement = hostElement.querySelector('svg');
                if (svgElement) {
                    // console.log('SVG element is now available');
                    this.setFilter(this.currentFilter || 'none');
                    this.observer?.disconnect();
                }
            });

            this.observer.observe(hostElement, { childList: true, subtree: true });
        }
    }

    private currentFilter: string | null = null;

    public setFilter(filter: string) {
        const hostElement = this.elementRef.nativeElement as HTMLElement;
        const svgElement = hostElement.querySelector('svg');

        if (svgElement) {
            // console.log('Applying filter:', filter);
            this.renderer.setStyle(svgElement, 'filter', filter);
        } else {
            // console.warn('SVG element not found yet; storing filter for later application');
            this.currentFilter = filter;
        }
    }
}