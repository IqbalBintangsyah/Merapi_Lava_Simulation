
var map = L.map('map').setView([-7.541901, 110.446068], 10);

 /*==============================================
                TILE LAYER and WMS
 ================================================*/

var openstreetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
    openstreetmap.addTo(map);
    // map.addLayer(osm)

var OpenTopoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
	maxZoom: 17,
	attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});
//OpenTopoMap.addTo(map)

// -- water color --
var Stamen_Watercolor = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	subdomains: 'abcd',
	minZoom: 1,
	maxZoom: 16,
	ext: 'jpg'
});
// Statemen_Watercolor.addTo(map)

// --esri map --
var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});
// Esri_WorldImagery.addTo(map)


 /*==============================================
                MARKER MULUT MERAPI
 ================================================*/

 var myIcon = L.icon({
    iconUrl: '/static/lahar/img/red_marker.png',
    iconSize: [40, 40],
});

var mulutmerapi = L.marker([-7.541913, 110.446081], { icon: myIcon, draggable: false });
//mulutmerapi.addTo(map);
var popup = mulutmerapi.bindPopup('Memungkinkan Muntahan lahar pertama kali ' + mulutmerapi.getLatLng()).openPopup()
 popup.addTo(map);

 /*==============================================
                ADDING GEOJSON
 ================================================*/

 //persebaran lahar 1
 var persebaranLahar = L.geoJSON(lahar, {
    onEachFeature: function (feature, layer) {
        layer.bindPopup(`<b>Name: </b>` + feature.properties.name)
    },
    style: {
        fillColor: 'red',
        fillOpacity: 0.4,
        color: '#ff0000',
    }
}).addTo(map);

//_____________________persebaran lahar 2
var persebaranLahar2 = L.geoJSON(lahar2, {
    onEachFeature: function (feature, layer) {
        layer.bindPopup(`<b>Name: </b>` + feature.properties.name)
    },
    style: {
        fillColor: 'red',
        fillOpacity: 0.4,
        color: '#ff0000',
    }
}).addTo(map);

/*==============================================
                 LAYER CONTROL
 ================================================*/
 var baseMaps = {
    "OSM": openstreetmap,
    "Open Topo Map": OpenTopoMap,
    'Stamen Watercolor': Stamen_Watercolor,
    'Esri World Imagery': Esri_WorldImagery,
};

var overlayMaps = {
    "First Marker": mulutmerapi,
    'Lahar Merapi': persebaranLahar,
    'Lahar Merapi 2': persebaranLahar2
};
// map.removeLayer(singleMarker)
L.control.layers(baseMaps, overlayMaps, { collapsed: false }).addTo(map);



 /*==============================================
                 LEAFLET EVENTS
 ================================================*/
 map.on('mouseover', function () {
    console.log('your mouse is over the map')
})

map.on('mousemove', function (e) {
    document.getElementsByClassName('coordinate')[0].innerHTML = 'lat: ' + e.latlng.lat + 'lng: ' + e.latlng.lng;
    console.log('lat: ' + e.latlng.lat, 'lng: ' + e.latlng.lng)
})


 /*==============================================
                 USING BMKG API
 ================================================*/

 let date = new Date();
 let dateTime = date.getFullYear()+''+
                (date.getMonth()+1).toString().padStart(2,'0')+''+
                (date.getDate()).toString().padStart(2, '0')+''+
                date.getHours()+'00';

        
let kodeCuaca = {
	'0':['Cerah','clearskies.png'],
	'1':['Cerah Berawan ','partlycloudy.png'],
	'2':['Cerah Berawan ','partlycloudy.png'],
	'3':['Berawan ','mostlycloudy.png'],
	'4':['Berawan Tebal','overcast.png'],
	'5':['Udara Kabur','haze.png'],
	'10':['Asap','smoke.png'],
	'45':['Kabut','fog.png'],
	'60':['Hujan Ringan','lightrain.png'],
	'61':['Hujan Sedang','rain.png'],
	'63':['Hujan Lebat','heavyrain.png'],
	'80':['Hujan Lokal','isolatedshower.png'],
	'95':['Hujan Petir','severethunderstorm.png'],
	'97':['Hujan Petir','severethunderstorm.png'],
};

let kodeArah = {
    'N':['Utara'],
    'NNE':['Utara - Timur Laut'],
    'NE':['Timur Laut'],
    'ENE':['Timur - Timur Laut'],
    'E':['Timur'],
    'ESE':['Timur - Tenggara'],
    'SE':['Tenggara'],
    'SSE':['Tenggara - Selatan'],
    'S':['Selatan'],
    'SSW':['Selatan - Barat Daya'],
    'SW':['Barat Daya'],
    'WSW':['Barat - Barat Daya'],
    'W':['Barat'],
    'WNW':['Barat - Barat Laut'],
    'NNW':['Utara - Barat Laut'],
    'VARIABLE':['Berubah-ubah'],
};



 let apiUrl = 'http://127.0.0.1:8000/lahar/api' //link sementara, nanti diubah sesuai origin
 getData();
 async function getData(){
     let response = await fetch(apiUrl)
     let xmlString = await response.text();
     let parse = new DOMParser();
     let xmlData = parse.parseFromString(xmlString, 'text/xml');
     let areas = xmlData.querySelectorAll('area');

     areas.forEach((area) => {
         let lat = area.getAttribute('latitude');
         let lng = area.getAttribute('longitude');
         let prov = area.getAttribute('description');
         let temperatures = area.querySelectorAll('parameter[id="t"] timerange'); // add suhu
         let weathers = area.querySelectorAll('parameter[id="weather"] timerange'); // add cuaca
         let humins = area.querySelectorAll('parameter[id="hu"] timerange'); // add kelembapan
         let wds = area.querySelectorAll('parameter[id="wd"] timerange');// add wind direction
         let wss = area.querySelectorAll('parameter[id="ws"] timerange');// add wind speed
         let getTime = false;
         let posPrakiraan;


         
         weathers.forEach((weather, i)=>{
            let getDateTime = weather.getAttribute('datetime');
            if (getDateTime>dateTime && getTime==false){
                posPrakiraan = i;
                getTime = true;
            }
        })


        let prakiraan = weathers[posPrakiraan].querySelector('value').textContent;
        let getSuhu = temperatures[posPrakiraan].querySelector('value[unit="C"]').textContent;
        let getHumins = humins[posPrakiraan].querySelector('value[unit="%"]').textContent;
        let getWds = wds[posPrakiraan].querySelector('value[unit="CARD"]').textContent;
        let getWss = wss[posPrakiraan].querySelector('value[unit="KPH"]').textContent;

        let iconUrl = '/static/lahar/img/'+kodeCuaca[prakiraan][1];
       // console.log(iconUrl)
        let deskripsi = kodeCuaca[prakiraan][0];  
        let arahAngin = kodeArah[getWds];
        
        let markercuaca = L.marker([lat,lng],{
            icon: L.icon({
                iconUrl: iconUrl,
                iconSize: [50,50],
                iconAnchor: [25,25],
            })
        }).bindPopup('<strong> Kota '+prov+' </strong> <br> Keterangan : '+ 'Kondisi cuaca ' + deskripsi + ' dengan suhu ' + getSuhu + '°C. Kelembapan udara berkisar di angka ' + getHumins + '% dengan arah angin ke arah ' + arahAngin + ' dengan kecepatan ' + getWss + ' KM/H');
        markercuaca.addTo(map);
     });


}