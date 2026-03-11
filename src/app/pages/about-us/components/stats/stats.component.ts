import {
  Component,
  ElementRef,
  ViewChildren,
  QueryList,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about-stats',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="py-10 md:py-16 bg-gradient-primary text-white relative">
      <div class="absolute inset-0 pattern-bg"></div>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center"
        >
          @for (stat of stats; track stat.label; let i = $index) {
            <div
              class="stat-card p-6 rounded-xl border border-realty-cream-200 bg-white shadow-xl transition-transform duration-300 hover:-translate-y-2"
            >
              <div
                class="text-4xl md:text-5xl font-extrabold text-realty-terracotta-500 mb-2 flex justify-center items-center"
              >
                <span
                  #countUp
                  [attr.data-target]="stat.targetValue"
                  data-current="0"
                  >0</span
                >
                <span>{{ stat.suffix }}</span>
              </div>
              <div
                class="text-sm md:text-base text-realty-gray-600 font-semibold"
              >
                {{ stat.label }}
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
})
export class StatsComponent implements AfterViewInit, OnDestroy {
  stats = [
    { targetValue: 15, suffix: '+', label: 'Years Experience' },
    { targetValue: 5000, suffix: '+', label: 'Happy Clients' },
    { targetValue: 10000, suffix: '+', label: 'Properties Sold' },
    { targetValue: 50, suffix: '', label: 'Real Estate Experts' },
  ];

  @ViewChildren('countUp') countElements!: QueryList<ElementRef>;
  private observer: IntersectionObserver | null = null;
  private animated = false;

  ngAfterViewInit() {
    this.observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !this.animated) {
          this.animated = true;
          this.observer?.disconnect();
          this.animateCounters();
        }
      },
      { threshold: 0.1 },
    );

    if (this.countElements.first) {
      this.observer.observe(
        this.countElements.first.nativeElement.closest('.grid'),
      );
    }
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private animateCounters() {
    this.countElements.forEach((el, index) => {
      const target = this.stats[index].targetValue;
      const duration = 2000; // 2 seconds
      const frameDuration = 1000 / 60; // 60fps
      const totalFrames = Math.round(duration / frameDuration);
      const easeOutQuad = (t: number) => t * (2 - t);

      let frame = 0;
      const element = el.nativeElement;

      const counter = setInterval(() => {
        frame++;
        const progress = easeOutQuad(frame / totalFrames);
        const currentCount = Math.round(target * progress);

        if (parseInt(element.dataset.current) !== currentCount) {
          element.innerHTML = currentCount.toLocaleString();
          element.dataset.current = currentCount.toString();
        }

        if (frame === totalFrames) {
          clearInterval(counter);
          element.innerHTML = target.toLocaleString();
        }
      }, frameDuration);
    });
  }
}
