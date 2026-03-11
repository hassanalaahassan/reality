import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-about-cta',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <section
      class="py-16 md:py-24 bg-gradient-secondary relative overflow-hidden"
    >
      <!-- Decorative elements -->
      <div
        class="absolute top-0 right-0 -mx-20 -my-20 w-64 h-64 rounded-full bg-realty-terracotta-500/10 blur-3xl"
      ></div>
      <div
        class="absolute bottom-0 left-0 -mx-20 -my-20 w-80 h-80 rounded-full bg-realty-blue-500/10 blur-3xl"
      ></div>

      <div
        class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 animate-fade-in"
      >
        <h2
          class="text-4xl md:text-5xl font-extrabold text-realty-blue-500 mb-6"
        >
          Ready to take your next step?
        </h2>
        <p class="text-xl text-realty-gray-500 mb-10 max-w-2xl mx-auto">
          Contact us today and let our experts help you find the property you've
          always dreamed of. Consultation is completely free!
        </p>
        <a
          routerLink="/contact"
          class="inline-flex items-center justify-center px-10 py-5 bg-realty-blue-500 text-white font-bold text-lg rounded-xl shadow-lg hover:bg-realty-blue-600 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
        >
          Contact Us Now
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 ml-3 transform group-hover:translate-x-1 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </a>
      </div>
    </section>
  `,
})
export class CtaComponent {}
