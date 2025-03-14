import { ChangeDetectionStrategy, Component, inject, computed, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop'
import { ActivatedRoute } from '@angular/router';
import { Gif } from '@app/gifs/interfaces/gif.interface';
import { GifsService } from '@app/gifs/services/gifs.service';
import { map } from 'rxjs';
import { GiftListComponent } from "../../components/gift-list/gift-list.component";

@Component({
  selector: 'app-gif-history',
  imports: [GiftListComponent],
  templateUrl: './gif-history.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class GifHistoryComponent {

 
  gifService = inject(GifsService)

  //Ruta activa
  // query = inject(ActivatedRoute)
  /**
   * Un observable que va a estar pendiente de que si cambia
   * la url lo actualiza
   */

  // query = inject(ActivatedRoute).params.subscribe(params => console.log(params['query']))
  //* Si  queremos convertir un Objervable a una Señal podemos hacerlo de la siguiente maenra

  query = toSignal(
    inject(ActivatedRoute).params
      .pipe(
        map(params => params['query'] ?? 'No hay query')
      )
  )

  gifsByKey = computed(() => this.gifService.getHistoryGifs(this.query()))
}
