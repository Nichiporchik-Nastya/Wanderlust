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
        // map.geoObjects.add(new ymaps.Placemark(point.coords, {
        //     balloonContentBody: point.name
        // }, {
        //     preset: 'islands#greenDotIcon'
        // }));

        // Создание метки с круглой активной областью.
        var circleLayout = ymaps.templateLayoutFactory.createClass('<div class="placemark_layout_container"><div class="circle_layout"></div></div>');

        map.geoObjects.add(new ymaps.Placemark(point.coords, {
            hintContent: point.name
        }, {
            iconLayout: circleLayout,
            // Описываем фигуру активной области "Круг".
            iconShape: {
                type: 'Circle',
                // Круг описывается в виде центра и радиуса
                coordinates: [0, 0],
                radius: 25
            }
        }));

        
        // map.geoObjects.add(circlePlacemark);
    }
}


ymaps.ready(init);