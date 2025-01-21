import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
//puede que algo mas reacionado a HttpClientService sea un mejor nombre 
export class GeneralService {
  constructor(private http: HttpClient) { }

   public ApiGet(predicate:string): Observable<any>{
    let apiUrl = `https://localhost:44312/${predicate}`;
    return this.http.get<any>(apiUrl);
  }

  public ApiPost(predicate:string,ObjRequest : any) {
    let apiUrl = `https://localhost:44312/${predicate}`;
    return this.http.post(apiUrl,ObjRequest);
  }
}
