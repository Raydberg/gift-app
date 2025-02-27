import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
interface MenuOption {
  label: string,
  subLabel: string,
  router: string,
  icon: string
}
@Component({
  selector: 'gift-side-menu-options',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-menu-options.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideMenuOptionsComponent {
  menuOptions: MenuOption[] = [
    {
      icon: 'fa-solid fa-chart-line',
      label: 'Trending',
      router: '/dashboard/trending',
      subLabel: 'Gifs Populares'
    },
    {
      icon: 'fa-solid fa-magnifying-glass',
      label: 'Buscador',
      router: '/dashboard/search',
      subLabel: 'Buscar Gifs'
    }
  ]

}
