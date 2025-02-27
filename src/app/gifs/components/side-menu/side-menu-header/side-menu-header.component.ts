import { ChangeDetectionStrategy, Component } from '@angular/core';
import { environment } from '@enviroments/environment';

@Component({
  selector: 'gift-side-menu-header',
  imports: [],
  templateUrl: './side-menu-header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideMenuHeaderComponent {
  envs = environment;
}
