// Map initialization and control
let map;
let markers = [];

const kioskLocations = [
    { lat: -27.4975, lng: 153.0137, name: "AED Building Kiosk", status: "Available", distance: "50m", closing: "6PM" },
    { lat: -27.4970, lng: 153.0145, name: "UQ Lakes Kiosk", status: "Almost Full", distance: "300m", closing: "8PM" },
    { lat: -27.4982, lng: 153.0125, name: "Union Complex Kiosk", status: "Available", distance: "450m", closing: "7PM" }
];

function initMap() {
    const defaultLocation = { lat: -27.4975, lng: 153.0137 }; // AED Building, UQ St Lucia
    map = new google.maps.Map(document.getElementById("map"), {
        center: defaultLocation,
        zoom: 17, // ← Change zoom level here (e.g. 15, 16, 18)
    });

    kioskLocations.forEach((kiosk) => {
        const marker = new google.maps.Marker({
            position: { lat: kiosk.lat, lng: kiosk.lng },
            map,
            title: kiosk.name,
        });

        const infoWindow = new google.maps.InfoWindow({
            content: `
                <div>
                    <strong>${kiosk.name}</strong><br/>
                    Status: ${kiosk.status}<br/>
                    Distance: ${kiosk.distance}<br/>
                    Closes: ${kiosk.closing}
                </div>
            `,
        });

        marker.addListener("click", () => {
            infoWindow.open(map, marker);
        });

        markers.push(marker);
    });

    setupMapControls();
}

function setupMapControls() {
    const mapViewBtn = document.querySelector('.map-view-btn');
    const listViewBtn = document.querySelector('.list-view-btn');
    const kioskList = document.querySelector('.kiosk-list');
    const mapContainer = document.getElementById('map-container');

    mapViewBtn.addEventListener('click', () => {
        mapViewBtn.classList.add('bg-black', 'text-white');
        mapViewBtn.classList.remove('bg-white', 'text-gray-500');
        listViewBtn.classList.remove('bg-black', 'text-white');
        listViewBtn.classList.add('bg-white', 'text-gray-500');
        mapContainer.style.display = 'block';
    });

    listViewBtn.addEventListener('click', () => {
        listViewBtn.classList.add('bg-black', 'text-white');
        listViewBtn.classList.remove('bg-white', 'text-gray-500');
        mapViewBtn.classList.remove('bg-black', 'text-white');
        mapViewBtn.classList.add('bg-white', 'text-gray-500');
        mapContainer.style.display = 'none';
    });

    document.querySelectorAll('.kiosk-item').forEach(item => {
        item.addEventListener('click', () => {
            item.classList.add('bg-gray-50');
            setTimeout(() => item.classList.remove('bg-gray-50'), 200);
        });
    });
}
