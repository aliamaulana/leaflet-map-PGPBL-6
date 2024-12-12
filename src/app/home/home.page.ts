import { Component } from '@angular/core';
import * as L from 'leaflet';

interface Location {
  coords: [number, number]; // Explicitly define as tuple type
  name: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  map!: L.Map;
  basemapLayers: any = {};
  markerIcon!: L.Icon;
  locations: Location[] = [
    {
      coords: [110.650234, -7.588588],
      name: "PT. COKRO SUPER TIRTA KLATEN"
    },
    {
      coords: [110.452128, -6.979783],
      name: "PT. AMIDIS TIRTA MULIA"
    },
    {
      coords: [109.133053, -6.866378],
      name: "CV. DUTA FRUTINDO BEVERAGE"
    },
    {
      coords: [111.101334, -7.636987],
      name: "PT DZAKYA TIRTA UTAMA"
    },
    {
      coords: [110.815936, -7.632000],
      name: "PT. HANITA ARTHA NUSANTARA"
    },
    {
      coords: [110.411309, -7.063441],
      name: "PT. KURNIAWAN SEJATI SEJAHTERA"
    },
    {
      coords: [109.139019, -6.957381],
      name: "PT. LUMUTMAS INTERINDO"
    },
    {
      coords: [110.220507, -7.481436],
      name: "CV. OLYMPIC MAKMUR JAYA"
    },
    {
      coords: [109.264203, -7.103112],
      name: "PT. SEMBILAN DUA ABADI"
    },
    {
      coords: [109.306518, -7.367494],
      name: "PT. TIRTA AGUNG WIJAYA"
    },
    {
      coords: [109.002656, -6.867217],
      name: "CV. TIRTA ANUGRAH SEJATI"
    },
    {
      coords: [109.899898, -7.347427],
      name: "PT TIRTA INVESTAMA DANONE AQUA"
    },
    {
      coords: [110.655399, -7.606069],
      name: "PT. TIRTA INVESTAMA"
    },
    {
      coords: [110.435329, -7.186531],
      name: "PT. TIRTA MEGAH CENDANA"
    },
    {
      coords: [110.289909, -7.119118],
      name: "PT. TIRTA SUKSES PERKASA"
    }
  ];

  constructor() {}

  ngOnInit() {}

  ionViewDidEnter() {
    this.initializeMap();
  }

  initializeMap() {
    // Initialize map with center point in Central Java
    this.map = L.map('mapId').setView([-7.150975, 110.140259], 8);

    // Define basemap layers
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
          opacity: 0.5,
          attribution: '&copy; OpenStreetMap contributors',
        }),
        L.tileLayer('https://services.arcgisonline.com/arcgis/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}', {
          attribution: '&copy; <a href="https://www.esri.com">Esri</a>',
        })
      ])
    };

    // Set default basemap
    this.basemapLayers['Streets'].addTo(this.map);

    // Initialize marker icon and add markers
    this.initializeMarkerIcon();
    this.addMarkers();

    // Add layer control
    L.control.layers(this.basemapLayers).addTo(this.map);
  }

  initializeMarkerIcon() {
    this.markerIcon = L.icon({
      iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32]
    });
  }

  addMarkers() {
    // Create markers array to track all markers
    const markers: L.Marker[] = [];

    this.locations.forEach(location => {
      // Create LatLng object from coordinates
      const latlng = L.latLng(location.coords[1], location.coords[0]); // Note: Swap coordinates for correct order

      const marker = L.marker(latlng, {
        icon: this.markerIcon
      })
        .addTo(this.map)
        .bindPopup(location.name);

      markers.push(marker);
    });

    // Create a feature group from markers
    const group = L.featureGroup(markers);

    // Fit the map to show all markers with some padding
    this.map.fitBounds(group.getBounds().pad(0.1));
  }
}
