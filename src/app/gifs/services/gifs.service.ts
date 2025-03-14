import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { environment } from '@enviroments/environment';
import type { GiphyResponse } from '../interfaces/giphy.interface';
import { Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../mapper/gif.mapper';
import { map, Observable, tap } from 'rxjs';

function loadLocalStorage() {
  const gifsFromLocalStorage = localStorage.getItem("gifs") ?? '{}'
  const gifs = JSON.parse(gifsFromLocalStorage)
  return gifs;

}

@Injectable({
  providedIn: 'root'
})

export class GifsService {
  constructor() {
    this.loadTrendingGifs()
  }

  // gifs = signal<Gif[]>(loadLocalStorage())

  private http: HttpClient = inject(HttpClient)

  trendingGifs: WritableSignal<Gif[]> = signal<Gif[]>([])
  trendingGifsLoading: WritableSignal<boolean> = signal(true)
  //  Creamos nuestra seañal para poder guardar nuestras cookies
  searchHistory: WritableSignal<Record<string, Gif[]>> = signal<Record<string, Gif[]>>(loadLocalStorage())
  //Las llavs de nuestras cookies
  searchHistoryKey: Signal<string[]> = computed(() => Object.keys(this.searchHistory()))

  saveToLocalStorage = effect(() => {
    const historyString = JSON.stringify(this.searchHistory())
    localStorage.setItem('gifs', historyString)
  })

  loadTrendingGifs(): void {
    this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/trending`, {
      params: {
        api_key: environment.giphyApiKey,
        limit: 20
      }

    }).subscribe((resp) => {
      const gifs = GifMapper.mapGiphyItemsToGifArray(resp.data);
      this.trendingGifs.set(gifs)
      this.trendingGifsLoading.set(false)
      console.log("Gifst de trending", gifs)
      // console.log(resp)
    })
  }
  searchGifs(query: string): Observable<Gif[]> {
    return this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/search`, {
      params: {
        api_key: environment.giphyApiKey,
        limit: 20,
        q: query
      }
    }).pipe(
      map(({ data }) => data),
      map((items) => GifMapper.mapGiphyItemsToGifArray(items)),
      //  Efecto secundariio
      tap(items => {
        //Manejamos nuestro historial
        this.searchHistory.update(history => ({
          ...history,
          [query.toLocaleLowerCase()]: items,
        }))
      })
    );

    // .subscribe(resp => {
    //   const gifs = GifMapper.mapGiphyItemsToGifArray(resp.data)
    // this.trendingGifs.set(gifs)
    // this.trendingGifsLoading.set(false)
    //   console.log(gifs)
    // })

  }


  getHistoryGifs(query: string): Gif[] {
    return this.searchHistory()[query] ?? []
  }


}
