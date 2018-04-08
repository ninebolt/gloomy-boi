import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/filter';
import { pluck } from 'rxjs/operators';

import { SimpleCharacter } from '../models/character.model';

@Injectable()
export class RetrievalService {

  constructor (
    private http: HttpClient
  ) { }

  getCharacterNames(characterType: string): Observable<any> {
    return this.http.get(`/assets/monsters/monsters.json`)
    .mergeMap((response) => response as SimpleCharacter[])
    .filter((character) => character.type === characterType)
    .pipe(pluck('name'));
  }

}