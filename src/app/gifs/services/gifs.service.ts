import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '@enviroments/environment';
import type { GiphyResponse } from '../interfaces/giphy.interface';
import { Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../mapper/gif.mapper';
import { map, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GifsService {
  constructor() {
    this.loadTrendingGifs()
  }
  private http = inject(HttpClient)

  trendingGifs = signal<Gif[]>([])
  trendingGifsLoading = signal(true)
  searchHistory = signal<Record<string, Gif[]>>({})
  searchHistoryKey = computed(() => Object.keys(this.searchHistory()))

  loadTrendingGifs() {
    this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/trending`, {
      params: {
        api_key: environment.giphyApiKey,
        limit: 20
      }
    }).subscribe((resp) => {
      const gifs = GifMapper.mapGiphyItemsToGifArray(resp.data);
      this.trendingGifs.set(gifs)
      this.trendingGifsLoading.set(false)
      console.log(gifs)
      // console.log(resp)
    })
  }
  searchGifs(query: string) {
    return this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/search`, {
      params: {
        api_key: environment.giphyApiKey,
        limit: 20,
        q: query
      }
    }).pipe(
      map(({ data }) => data),
      map((items) => GifMapper.mapGiphyItemsToGifArray(items)),
      tap(items => {
        this.searchHistory.update(history => ({
          ...history,
          [query.toLocaleLowerCase()]: items,
        }))
      })
    );

    // .subscribe(resp => {
    //   const gifs = GifMapper.mapGiphyItemsToGifArray(resp.data)
    //   // this.trendingGifs.set(gifs)
    //   // this.trendingGifsLoading.set(false)
    //   console.log(gifs)
    // })
  }

}
