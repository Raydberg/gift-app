import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { GifsService } from '@app/gifs/services/gifs.service';
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
  
  giftService = inject(GifsService)

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
