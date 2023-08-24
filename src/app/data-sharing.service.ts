import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {
  private dataSubject = new BehaviorSubject<User[]>([])
  constructor() { }

  setData(data: User[]) {
    this.dataSubject.next(data)
  }

  getData() {
    return this.dataSubject.asObservable()
  }
}
