import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { LayoutService } from '../../../Services/layout.service';
import { AuthService } from '../../../Services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  layoutService = inject(LayoutService);
  authService = inject(AuthService);
  router = inject(Router);
  private sub!: Subscription;

  readonly isSidebarPinned = this.layoutService.isSidebarPinned;
  readonly isSidebarExpanded = this.layoutService.isSidebarExpanded;
  readonly user = this.authService.currentUser;

  navItems = computed(() => {
    const items = [
      { label: 'Properties', route: '/properties', icon: 'building' },
      { label: 'Saved', route: '/fav-properties', icon: 'heart' },
      { label: 'Contact Us', route: '/contact', icon: 'message' },
      { label: 'About Us', route: '/about', icon: 'home' },
    ];
    if (this.user()?.profile?.isAgent) {
      items.push({
        label: 'Add Property',
        route: '/add-property',
        icon: 'plus',
      });
    }
    return items;
  });

  toggleSidebar() {
    this.layoutService.toggleSidebar();
  }

  onMouseEnter() {
    this.layoutService.setHoverState(true);
  }

  onMouseLeave() {
    this.layoutService.setHoverState(false);
  }

  logout() {
    this.authService.logout().subscribe();
    this.router.navigate(['/login']);
  }
}
