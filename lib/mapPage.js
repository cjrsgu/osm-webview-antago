
export default class MapView {
  constructor(geozone, title) {
    this.setGeozone(geozone);
    this.title = title;
  }

  setGeozone = (geozone) => {
    if (geozone.length < 1) {
      this.zoomLevel = 1;
      this.geozone = '';
    } else {
      this.zoomLevel = 15;
      this.geozone = geozone.reduce((acc, current) => {
        return `${acc} [${current[1]}, ${current[0]}],`;
      }, '');
    }
  }

  getHtml = () => `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>${this.title}</title>
            <link
                rel="stylesheet"
                href="https://unpkg.com/leaflet@1.5.1/dist/leaflet.css"
                integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
                crossorigin="" />
            <style>
                html,
                body {
                    padding: 0;
                    margin: 0;
                }

                #mapid {
                    height: 100vh;
                }
            </style>
            <script
                src="https://unpkg.com/leaflet@1.5.1/dist/leaflet.js"
                integrity="sha512-GffPMF3RvMeYyc1LWMHtK8EbPv0iNZ8/oTtHPx9/cc2ILxQ+u905qIwdpULaqDkyBKgOaB57QTMg7ztg8Jm2Og=="
                crossorigin=""></script>
        </head>
        <body>
            <div id="mapid"></div>
            <script>
              var map = L.map('mapid').setView([0, 0], ${this.zoomLevel});
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                }).addTo(map);

              var latlngs = [
                ${this.geozone}
              ];

              var polygon = L.polygon(latlngs, {color: 'red'}).addTo(map);
              map.fitBounds(polygon.getBounds());

              window.map = map;
              window.polygon = polygon;
            </script>
        </body>
    </html>
    `;
}
