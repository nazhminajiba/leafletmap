import { Component } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  map! : L.Map;
  selectedBasemap: string = 'osm';
  currentLayer!: L.TileLayer;

  constructor() {}

  ionViewDidEnter() {
    // Initialize the map and set the view to a specific location
    this.map = L.map('mapId').setView([-7.770602, 110.377437], 13);

    // Set the default basemap (OpenStreetMap)
    this.currentLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    // Create a marker at the specified location (UGM)
    const marker = L.marker([-7.770602, 110.377437]).addTo(this.map);

    // Bind a popup to the marker with some information
    marker.bindPopup('Universitas Gadjah Mada').openPopup();
  }

  onBasemapChange(event: any) {
    // Remove the current layer from the map
    this.map.removeLayer(this.currentLayer);

    // Switch the basemap based on the selected value
switch (this.selectedBasemap) {
  case 'osm':
    this.currentLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
    break;

  case 'terrain':
    this.currentLayer = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="https://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (CC-BY-SA)'
    });
    break;

  case 'satellite':
    this.currentLayer = L.tileLayer('https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
      attribution: 'Map data: &copy; <a href="https://www.google.com/permissions/geoguidelines/">Google</a>',
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    });
    break;
}


    // Add the new layer to the map
    this.currentLayer.addTo(this.map);
  }
}
