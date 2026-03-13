// WindCharge Station Finder – Map Logic

document.addEventListener('DOMContentLoaded', () => {
    initMap();
});

let map;
let markers = [];

function initMap() {
    // Initialize map centered on India
    map = L.map('map', {
        zoomControl: true,
        scrollWheelZoom: true
    }).setView([20.5937, 78.9629], 5);

    // Tile layer – clean CartoDB Voyager
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19
    }).addTo(map);

    // Add all station markers
    addStationMarkers(STATIONS);

    // Region selector
    const regionSelector = document.getElementById('regionSelector');
    if (regionSelector) {
        regionSelector.addEventListener('change', (e) => {
            const state = e.target.value;
            const region = REGIONS[state];

            if (region) {
                map.flyTo([region.lat, region.lng], region.zoom, { duration: 1.2 });
            }

            // Filter markers
            clearMarkers();
            if (state === 'All States') {
                addStationMarkers(STATIONS);
            } else {
                const filtered = STATIONS.filter(s => s.state === state);
                addStationMarkers(filtered);
            }
        });
    }
}

function addStationMarkers(stations) {
    stations.forEach(station => {
        const colors = {
            available: '#27ae60',
            busy: '#f39c12',
            offline: '#e74c3c'
        };
        const color = colors[station.status] || '#95a5a6';

        const marker = L.circleMarker([station.lat, station.lng], {
            radius: 10,
            fillColor: color,
            color: '#fff',
            weight: 2,
            opacity: 1,
            fillOpacity: 0.85
        }).addTo(map);

        // Station popup
        const statusClass = `status--${station.status}`;
        const statusLabel = station.status.charAt(0).toUpperCase() + station.status.slice(1);

        const popupContent = `
      <div class="station-popup">
        <div class="station-popup__name">${station.name}</div>
        <div class="station-popup__location">📍 ${station.city}, ${station.state}</div>
        <div class="station-popup__grid">
          <div class="station-popup__detail">
            <span class="station-popup__detail-label">Status</span>
            <span class="station-popup__status ${statusClass}">${statusLabel}</span>
          </div>
          <div class="station-popup__detail">
            <span class="station-popup__detail-label">Chargers</span>
            <span class="station-popup__detail-value">${station.availableChargers}/${station.chargers}</span>
          </div>
          <div class="station-popup__detail">
            <span class="station-popup__detail-label">Distance</span>
            <span class="station-popup__detail-value">${station.distance}</span>
          </div>
          <div class="station-popup__detail">
            <span class="station-popup__detail-label">Travel Time</span>
            <span class="station-popup__detail-value">${station.travelTime}</span>
          </div>
        </div>
        <a class="station-popup__btn" href="https://www.google.com/maps/dir/?api=1&destination=${station.lat},${station.lng}" target="_blank" rel="noopener">
          🧭 Get Directions
        </a>
      </div>
    `;

        marker.bindPopup(popupContent, {
            maxWidth: 300,
            closeButton: true
        });

        markers.push(marker);
    });
}

function clearMarkers() {
    markers.forEach(m => map.removeLayer(m));
    markers = [];
}
