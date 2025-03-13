import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { GiftListComponent } from "../../components/gift-list/gift-list.component";
import { GifsService } from '@app/gifs/services/gifs.service';
import { Gif } from '@app/gifs/interfaces/gif.interface';

@Component({
  selector: 'app-search-page',
  imports: [GiftListComponent],
  templateUrl: './search-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SearchPageComponent {
  giftService = inject(GifsService)
  gifs = signal<Gif[]>([])
  onSearch(query: string) {
    this.giftService.searchGifs(query).subscribe(resp => {
      this.gifs.set(resp)
    })
    // console.log(query)
  }
}
