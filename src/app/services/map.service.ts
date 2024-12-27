import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class MapService {
  map: any;
  private _selectedUserId = new BehaviorSubject<string | null>(null);
  selectedUserId$ = this._selectedUserId.asObservable();

  constructor() {}

  calculateDistance(cord1: any, cord2: any): number {
    const R = 6371; // Radio de la Tierra en km
    const dLat = this.degreesToRadians(cord2.lat - cord1.lat);
    const dLng = this.degreesToRadians(cord2.lng - cord1.lng);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(this.degreesToRadians(cord1.lat)) * Math.cos(this.degreesToRadians(cord2.lat)) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  degreesToRadians(degrees: number): number {
    return degrees * Math.PI / 180;
  }

  setSelectedUserId(userId: string | null): void {
    this._selectedUserId.next(userId);
  }
}
