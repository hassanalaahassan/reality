import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about-team',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="py-12 md:py-20 bg-realty-cream-500">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16 animate-fade-in">
          <h2 class="text-3xl md:text-4xl font-bold text-realty-blue-500 mb-4">
            Meet Our Team
          </h2>
          <div class="w-24 h-1 bg-realty-blue-500 mx-auto rounded"></div>
          <p class="mt-6 text-lg max-w-2xl mx-auto text-realty-gray-500">
            An elite group of top real estate experts and consultants working
            passionately to achieve your goals.
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          @for (member of team; track member.name) {
            <div
              class="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 group card-hover text-center pb-6"
            >
              <div class="h-64 overflow-hidden image-hover-container relative">
                <img
                  [src]="member.image"
                  [alt]="member.name"
                  class="w-full h-full object-cover image-hover-zoom"
                />
                <div
                  class="absolute inset-0 bg-realty-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                ></div>
              </div>
              <div class="pt-6 px-4">
                <h3 class="text-xl font-bold text-realty-blue-500 mb-1">
                  {{ member.name }}
                </h3>
                <p class="text-realty-sage-500 font-medium">
                  {{ member.role }}
                </p>
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
})
export class TeamComponent {
  team = [
    {
      name: 'Hassan Alaa',
      role: 'CEO & Founder',
      image:'about/user_1.jpg'
    },
    {
      name: 'Sarah Khaled',
      role: 'Sales Director',
      image:'about/user_2.jpg'
    },
    {
      name: 'Sara Tariq',
      role: 'Senior Real Estate Consultant',
      image:'about/user_3.jpg'
    },
    {
      name: 'Ahmed Yassin',
      role: 'Marketing Manager',
      image:'about/user_4.jpg'
    },
  ];
}
