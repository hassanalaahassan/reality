import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about-story',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="our-story" class="py-12 md:py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          class="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center"
        >
          <div class="animate-fade-in order-2 lg:order-1">
            <h2
              class="text-3xl md:text-4xl font-bold text-realty-blue-500 mb-6"
            >
              Our Journey & Story
            </h2>
            <div class="w-20 h-1 bg-realty-terracotta-500 mb-8 rounded"></div>
            <p class="text-lg leading-relaxed mb-6">
              <span class="font-bold text-realty-blue-500">Reality</span> began
              with a simple idea: to transform real estate brokerage from minor
              transactional interactions into long-term relationships built on
              trust and reliability.
            </p>
            <p class="text-lg leading-relaxed">
              Since our inception, we have strived to select the best projects
              and provide accurate real estate advice that puts our clients'
              interests first. Today, we are proud to be a trusted destination
              for thousands of families and investors looking for quality and
              security.
            </p>
          </div>
          <div
            class="relative image-hover-container overflow-hidden rounded-2xl shadow-xl animate-fade-in delay-200 order-1 lg:order-2 h-96 lg:h-full min-h-[400px]"
          >
            <img
              src="about/Journey.jpg"
              alt="Reality Company Building"
              class="absolute inset-0 w-full h-full object-cover image-hover-zoom"
            />
          </div>
        </div>
      </div>
    </section>
  `,
})
export class StoryComponent {}
