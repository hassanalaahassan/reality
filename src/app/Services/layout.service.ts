import {
  computed,
  Injectable,
  signal,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  isMobile = signal<boolean>(false);
  isDesktopPinned = signal<boolean>(true);
  isMobileOpen = signal<boolean>(false);
  isSidebarHovered = signal<boolean>(false);

  isSidebarExpanded = computed(() => {
    if (this.isMobile()) {
      return this.isMobileOpen();
    }
    return this.isDesktopPinned() || this.isSidebarHovered();
  });

  isSidebarPinned = computed(() => {
    return this.isMobile() ? this.isMobileOpen() : this.isDesktopPinned();
  });

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.checkWindowSize();
      window.addEventListener('resize', this.checkWindowSize.bind(this));
    }
  }

  private checkWindowSize() {
    const isNowMobile = window.innerWidth < 768;
    if (this.isMobile() !== isNowMobile) {
      this.isMobile.set(isNowMobile);
      if (isNowMobile) {
        this.isMobileOpen.set(false);
      }
    }
  }

  toggleSidebar(): void {
    if (this.isMobile()) {
      this.isMobileOpen.update((v) => !v);
    } else {
      this.isDesktopPinned.update((v) => !v);
    }
    // Force hover off so it visually reacts immediately when toggled by button
    this.isSidebarHovered.set(false);
  }

  setHoverState(isHovered: boolean): void {
    if (!this.isMobile()) {
      this.isSidebarHovered.set(isHovered);
    }
  }

  closeMobileSidebar() {
    this.isMobileOpen.set(false);
  }
}
