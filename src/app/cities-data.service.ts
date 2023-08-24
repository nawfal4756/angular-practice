import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cities } from './cities';

@Injectable({
  providedIn: 'root'
})
export class CitiesDataService {
  private dataSubject = new BehaviorSubject<Cities[]>([])
  constructor() { }

  setData(data: Cities[]) {
    this.dataSubject.next(data)
  }

  addData(data: Cities) {
    this.dataSubject.next([...this.dataSubject.value, data])
  }

  getLength() {
    return this.dataSubject.value.length
  }

  deleteData(id: number) {
    let tempData = this.dataSubject.value.filter((data: Cities) => {
      return data.id != id
    })
    this.dataSubject.next(tempData)
  }

  getData() {
    return this.dataSubject.asObservable()
  }

  getCity(id: number) {
    let tempData = this.dataSubject.value.filter((data: Cities) => {
      return data.id == id
    })
    return tempData[0]
  }

  updateData(id: number, data: Cities) {
    let tempData = this.dataSubject.value.filter((data: Cities) => {
      return data.id != id
    })
    this.dataSubject.next([...tempData, data])
  }
}
