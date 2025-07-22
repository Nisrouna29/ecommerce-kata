import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-marketplace',
  standalone: true,
  imports: [CommonModule, HeaderComponent, RouterModule],
  templateUrl: './marketplace.component.html',
  styleUrl: './marketplace.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarketplaceComponent {

}
