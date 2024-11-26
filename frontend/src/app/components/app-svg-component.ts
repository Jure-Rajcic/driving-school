import { Component, inject, Input, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
    standalone: true,
    selector: 'app-svg',
    template: '<div [innerHtml]="_svgContent" class="w-full h-full"></div>',
})
export class AppSvgComponent implements OnInit {
    protected _svgContent: SafeHtml = '';
    private readonly _sanitizer = inject(DomSanitizer);
    private readonly elementRef = inject(ElementRef);
    private readonly renderer = inject(Renderer2);

    @Input({ required: true }) baseFileName!: string;

    ngOnInit() {
        this.loadSvg('assets/svg/' + this.baseFileName + '.svg');
        this.applyHostClasses();
    }

    loadSvg(path: string) {
        fetch(path)
            .then(response => response.text())
            .then(svg => {
                const parser = new DOMParser();
                const svgDoc = parser.parseFromString(svg, 'image/svg+xml');
                const svgElement = svgDoc.querySelector('svg');
                if (svgElement) {
                    // Set width and height to 100% for responsive scaling
                    svgElement.setAttribute('width', '100%');
                    svgElement.setAttribute('height', '100%');
                }
                this._svgContent = this._sanitizer.bypassSecurityTrustHtml(svgElement?.outerHTML || '');
            })
            .catch(error => console.error('Error loading SVG:', error))
    }

    private applyHostClasses() {
        // Apply all classes passed to <app-svg> on the host element to the <div>
        const hostElement = this.elementRef.nativeElement as HTMLElement;
        const classList = hostElement.classList;

        if (classList) {
            // Copy all host classes to the root <div>
            classList.forEach(className => {
                this.renderer.addClass(hostElement.firstElementChild, className);
            });
        }
    }
}
