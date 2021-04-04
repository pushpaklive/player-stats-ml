import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Player } from './player';

@Injectable({
  providedIn: 'root'
})
export class AlphaService {

  constructor(private http: HttpClient) { }

  getAllPlayers(): Observable<any>{
    return this.http.get('http://localhost:3000/all');
  }

  addPlayer(player: Player): Observable<any>{
    return this.http.post('http://localhost:3000/add', player);
  }

  deletePlayer(player: Player): Observable<any>{
    return this.http.post('http://localhost:3000/delete-one', player);
  }

  deleteAllPlayers(): Observable<any> {
    return this.http.post('http://localhost:3000/delete-all', {});
  }
}
