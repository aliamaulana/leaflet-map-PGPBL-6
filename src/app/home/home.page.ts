import { Component } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  map!: L.Map;
  basemapLayers: any = {};
  marker!: L.Marker;

  constructor() {}

  ngOnInit() {}

  ionViewDidEnter() {
    this.initializeMap();
  }

  initializeMap() {
    // Inisialisasi peta
    this.map = L.map('mapId').setView([35.76943, -5.80081], 10);

    // Definisikan beberapa basemap layers
    this.basemapLayers = {
      'Topographic': L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.opentopomap.org/">OpenTopoMap</a> contributors',
      }),
      'Streets': L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }),
      'Satellite': L.tileLayer('https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: '&copy; <a href="https://www.esri.com">Esri</a>',
      }),
      'Hybrid': L.layerGroup([
        L.tileLayer('https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
          attribution: '&copy; <a href="https://www.esri.com">Esri</a>',
        }),
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenStreetMap contributors',
        }),
        L.tileLayer('https://services.arcgisonline.com/arcgis/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}', {
          attribution: '&copy; <a href="https://www.esri.com">Esri</a>',
        })
      ])
    };

    // Set default basemap
    this.basemapLayers['Streets'].addTo(this.map);

    // Tambahkan Marker dengan Ikon Kustom
    this.addMarker();

    // Layer Control untuk basemap
    L.control.layers(this.basemapLayers).addTo(this.map);
  }

  addMarker() {
    // Ikon kustom
    const markerIcon = L.icon({
      iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png', // URL of the image
      iconSize: [32, 32], // ukuran ikon marker
      iconAnchor: [12, 41], // titik anchor, di mana marker ditempatkan
      popupAnchor: [1, -34], // anchor popup relatif terhadap ikon marker
      shadowSize: [41, 41] // ukuran bayangan marker
    });

    // Tambahkan marker dengan ikon kustom
    this.marker = L.marker([35.76943, -5.80081], { icon: markerIcon }).addTo(this.map)
      .bindPopup('Informasi pop-up: Ini adalah marker!')
      .openPopup();
  }
}
