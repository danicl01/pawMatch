import { Component, inject, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { FirestoreService } from "../../services/firestore.service";
import { AuthStateService } from "../../auth/data-access/auth-state.service";
import { MapService } from '../../services/map.service';  // Importa el servicio

declare var google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class Map implements OnInit {
  private _fireStore = inject(FirestoreService);
  private _authState = inject(AuthStateService);
  private _mapService = inject(MapService);

  userAuthId: string | null = null;
  userAuthDocId: string | null = null;
  currentUserCoords = { lat: 0, lng: 0 };
  usersCoords: any[] = [];
  selectedUserId: string = ""

  map: any;
  markers: any[] = [];
  currentRadius: number = 15;

  constructor(private title: Title, private meta: Meta) {
    this.title.setTitle('Map - PawMatch');
    this.meta.addTags([
      { property: 'og:title', content: 'Map - PawMatch' },
    ]);
  }

  ngOnInit(): void {
    this.getAuthenticatedUserId();
    this._mapService.selectedUserId$.subscribe(userId => {
      this.selectedUserId = userId;
    });
  }

  async getAuthenticatedUserId(): Promise<void> {
    try {
      const currentUser = await this._authState.currentUser;
      if (currentUser?.uid) {
        this.userAuthId = currentUser.uid;
        const docId = await this._fireStore.getDocIdFromUserId(currentUser.uid).toPromise();
        if (docId) {
          this.userAuthDocId = docId;
          this.saveUsersWithLocation();
        } else {
          console.error('No docId found for this userId.');
        }
      } else {
        console.error('There is no authenticated user.');
      }
    } catch (error) {
      console.error('Error getting authenticated user:', error);
    }
  }

  loadMap() {
    if (this.currentUserCoords.lat !== 0 && this.currentUserCoords.lng !== 0) {
      if (typeof google !== 'undefined' && google.maps) {
        this.map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
          zoom: 12,
          center: { lat: this.currentUserCoords.lat, lng: this.currentUserCoords.lng },
        });

        new google.maps.Marker({
          position: this.currentUserCoords,
          map: this.map,
          title: 'Your location',
        });

        this.markers = this.usersCoords.map(cord => {
          const marker = new google.maps.Marker({
            position: cord,
            map: this.map,
            title: `User: ${cord.userId}`,
          });

          marker.addListener('click', () => {
            this._mapService.setSelectedUserId(cord.userId);
          });

          return marker;
        });
      }
    } else {
      console.error('Current user coordinates aren´t valid!');
    }
  }

  filterMarkers(radius: number) {
    this.currentRadius = radius;
    this.markers.forEach(marker => marker.setMap(null));
    this.markers = [];

    this.usersCoords.forEach(cord => {
      const distance = this.calculateDistance(this.currentUserCoords, cord);
      if (distance <= radius) {
        const marker = new google.maps.Marker({
          position: cord,
          map: this.map,
          title: `User: ${cord.userId}`,
        });

        marker.addListener('click', () => {
          this._mapService.setSelectedUserId(cord.userId);
        });

        this.markers.push(marker);
      }
    });
  }

  calculateDistance(cord1: any, cord2: any): number {
    return this._mapService.calculateDistance(cord1, cord2);
  }

  saveUsersWithLocation() {
    this._fireStore.getUsersWithLocation().subscribe(usersWithLocation => {
      const currentUser = usersWithLocation.find(user => user.id === this.userAuthDocId);

      if (currentUser) {
        this.currentUserCoords = { lat: currentUser.latitude, lng: currentUser.longitude };
        this.usersCoords = usersWithLocation.filter(user => user.id !== this.userAuthDocId).map(user => ({
          lat: user.latitude,
          lng: user.longitude,
          userId: user.id
        }));

        this.loadMap();
      } else {
        console.error('Not current user in the list');
      }

      const nearbyUsers = usersWithLocation.filter(user => {
        const distance = this.calculateDistance(this.currentUserCoords, { lat: user.latitude, lng: user.longitude });
        return distance <= this.currentRadius;
      });
      localStorage.setItem('nearbyUsers', JSON.stringify(nearbyUsers));
    });
  }
  goToCurrentLocation() {
    this.map.setCenter(this.currentUserCoords);
    this.map.setZoom(12);
  }
}
