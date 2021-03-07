import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  dataShare = new BehaviorSubject<Object>(null);

  constructor() { }
}
