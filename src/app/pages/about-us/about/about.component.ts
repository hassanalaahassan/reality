import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeroComponent } from '../components/hero/hero.component';
import { StoryComponent } from '../components/story/story.component';
import { StatsComponent } from '../components/stats/stats.component';
import { MissionComponent } from '../components/mission/mission.component';
import { WhyUsComponent } from '../components/why-us/why-us.component';
import { TeamComponent } from '../components/team/team.component';
import { CtaComponent } from '../components/cta/cta.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    CommonModule,
    HeroComponent,
    StoryComponent,
    StatsComponent,
    MissionComponent,
    WhyUsComponent,
    TeamComponent,
    CtaComponent,
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {}
