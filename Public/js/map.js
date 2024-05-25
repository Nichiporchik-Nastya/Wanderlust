// Функция ymaps.ready() будет вызвана, когда
// загрузятся все компоненты API, а также когда будет готово DOM-дерево.
var map;
function init() {
    let points = JSON.parse(document.querySelector("#points").value);
    map = new ymaps.Map("map-test", {
        center: [53.901390, 27.556757],
        zoom: 10
    });

    for (const point of points) {
        map.geoObjects.add(new ymaps.Placemark(point.coords, {
            balloonContentBody: point.name
        }, {
            preset: 'islands#greenDotIcon'
        }));
    }
}


ymaps.ready(init);