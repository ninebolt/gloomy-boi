import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/catch';
import { pluck } from 'rxjs/operators';

import { SimpleCharacter } from '../models/character.model';
import { Monster, Player } from '../models/state.model';

@Injectable()
export class RetrievalService {

  constructor (
    private http: HttpClient
  ) { }

  getMonsterNames(): Observable<any> {
    return this.http.get(`/assets/monsters/monsters.json`)
      .mergeMap((response) => response as Monster[])
      .pipe(pluck('name'));
  }

  getMonsterInfo(name: string): Observable<any> {
    return this.http.get(`/assets/monsters/monsters.json`)
      .mergeMap((response) => response as Monster[])
      .filter((m) => m.name === name);
  }

  getMonsterStats(name: string, level: number): Observable<any> {
    return this.http.get(`/assets/monsters/stats/level${level}.json`)
      .map((response) => response['monsters'] as any[])
      .map((response) => response[name] as any[])
  }

  getPlayerNames(): Observable<any> {
    return this.http.get(`/assets/players.json`)
      .mergeMap((response) => response as Player[])
      .pipe(pluck('name'));
  }

  getPlayerInfo(name: string): Observable<any> {
    return this.http.get(`/assets/players.json`)
      .mergeMap((response) => response as Player[])
      .filter((p) => p.name === name);
  }
}