import { initFlowbite } from 'flowbite';
import { AfterViewInit, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastComponent } from './Shared/components/toast/toast.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToastComponent],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements AfterViewInit {
  ngAfterViewInit() {
    initFlowbite();
  }
}
