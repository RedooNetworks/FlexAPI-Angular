import { Injectable } from '@angular/core';
import {Module} from "../models/module";
import {ApiService} from "../api.service";
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {

  constructor() { }

  getModules(): Observable<{}> {

    return of({});
  }

}
