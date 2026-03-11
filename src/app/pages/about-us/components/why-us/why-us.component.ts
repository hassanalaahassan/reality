import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about-why-us',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="py-12 md:py-20 bg-white border-t border-realty-cream-500">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          class="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center"
        >
          <div
            class="grid grid-cols-1 md:grid-cols-2 gap-4 h-auto md:h-[500px] animate-fade-in group"
          >
            <div
              class="space-y-4 h-full pt-0 md:pt-10 flex flex-col justify-end"
            >
              <div
                class="h-64 md:h-1/2 rounded-2xl overflow-hidden shadow-lg relative"
              >
                <img
                  src="about/why_2.jpg"
                  alt="Modern property"
                  class="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                />
              </div>
              <div
                class="h-64 md:h-1/2 rounded-2xl overflow-hidden shadow-lg relative hidden md:block"
              >
                <img
                  src="about/why_3.jpg"
                  alt="Interior design"
                  class="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                />
              </div>
            </div>
            <div
              class="h-64 md:h-full rounded-2xl overflow-hidden shadow-lg relative"
            >
              <img
                  src="about/why_1.jpg"
                alt="Luxury home"
                class="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
              />
            </div>
          </div>

          <div class="animate-fade-in delay-200">
            <h2
              class="text-3xl md:text-4xl font-bold text-realty-blue-500 mb-6"
            >
              Why Choose Reality?
            </h2>
            <div class="w-20 h-1 bg-realty-terracotta-500 mb-8 rounded"></div>

            <ul class="space-y-6">
              <li class="flex items-start">
                <div
                  class="flex-shrink-0 w-12 h-12 bg-[#FDECE9] rounded-full flex items-center justify-center text-realty-terracotta-500 mt-1"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <div class="ml-6">
                  <h4 class="text-xl font-bold text-realty-blue-500 mb-2">
                    Deep Market Insight
                  </h4>
                  <p class="text-realty-gray-500">
                    We possess an accurate vision and continuous analysis of
                    real estate market trends to ensure the best deals.
                  </p>
                </div>
              </li>
              <li class="flex items-start">
                <div
                  class="flex-shrink-0 w-12 h-12 bg-[#FDECE9] rounded-full flex items-center justify-center text-realty-terracotta-500 mt-1"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div class="ml-6">
                  <h4 class="text-xl font-bold text-realty-blue-500 mb-2">
                    Diverse Portfolio
                  </h4>
                  <p class="text-realty-gray-500">
                    We offer residential and commercial options that suit all
                    budgets and needs in prime locations.
                  </p>
                </div>
              </li>
              <li class="flex items-start">
                <div
                  class="flex-shrink-0 w-12 h-12 bg-[#FDECE9] rounded-full flex items-center justify-center text-realty-terracotta-500 mt-1"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                    />
                  </svg>
                </div>
                <div class="ml-6">
                  <h4 class="text-xl font-bold text-realty-blue-500 mb-2">
                    End-to-End Support
                  </h4>
                  <p class="text-realty-gray-500">
                    Our experts accompany you at every step, from search and
                    viewing to receiving the keys and after-sales service.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class WhyUsComponent {}
