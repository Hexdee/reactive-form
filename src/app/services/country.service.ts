import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators"

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private apiUrl = 'https://restcountries.com/v3.1/all';

  constructor(private http: HttpClient) { }

  getCountries() {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((data: any[]) => {
        return data
          .sort((a, b) => a.name.common.localeCompare(b.name.common))
          .map((c: any) => {
            return {
              text: c.name.common,
              value: c.cca2,
              image: { src: c.flags.png, avatar: false },
            };
          });
      })
    );
  }
}
