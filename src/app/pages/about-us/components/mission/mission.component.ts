import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about-mission',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="py-12 md:py-20 bg-realty-cream-500">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16 animate-fade-in">
          <h2 class="text-3xl md:text-4xl font-bold text-realty-blue-500 mb-4">
            Our Mission & Values
          </h2>
          <div class="w-24 h-1 bg-realty-sage-500 mx-auto rounded"></div>
          <p class="mt-6 text-lg max-w-2xl mx-auto text-realty-gray-500">
            We direct all our efforts to empower our clients to make smart and
            correct real estate decisions through our commitment to core values.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          @for (val of values; track val.title) {
            <div
              class="bg-white p-8 rounded-2xl shadow-sm border border-realty-cream-500 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:scale-105 animate-fade-in flex flex-col items-center text-center md:items-start md:text-left"
            >
              <div
                class="w-14 h-14 bg-[#F0F4E8] rounded-xl flex items-center justify-center mb-6 text-realty-sage-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    [attr.d]="val.icon"
                  />
                </svg>
              </div>
              <h3 class="text-xl font-bold text-realty-blue-500 mb-4">
                {{ val.title }}
              </h3>
              <p class="text-realty-gray-500 leading-relaxed">
                {{ val.description }}
              </p>
            </div>
          }
        </div>
      </div>
    </section>
  `,
})
export class MissionComponent {
  values = [
    {
      title: 'Integrity and Transparency',
      description:
        'We are committed to complete honesty and clarity in all our dealings to ensure the rights of our clients.',
      icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
    },
    {
      title: 'Innovation',
      description:
        'We keep pace with the latest real estate technologies to offer you the best modern and smart solutions.',
      icon: 'M13 10V3L4 14h7v7l9-11h-7z',
    },
    {
      title: 'Excellence & Quality',
      description:
        'We always strive to provide services that meet your ambitions and adhere to the highest global quality standards.',
      icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z',
    },
  ];
}
