// Функция ymaps.ready() будет вызвана, когда
// загрузятся все компоненты API, а также когда будет готово DOM-дерево.
var map;
function init() {
    let points = JSON.parse(document.querySelector("#points").value);
    map = new ymaps.Map("map-test", {
        center: [53.901390, 27.556757],
        zoom: 10,
    });

    for (let i = 0; i < points.length; i++) {
        var circleLayout = ymaps.templateLayoutFactory.createClass('<div class="placemark_layout_container"><div class="circle_layout"></div></div>');
        var circleLayoutStart = ymaps.templateLayoutFactory.createClass('<div class="placemark_layout_container"><div class="circle_layout_start"></div></div>');
        var circleLayoutEnd = ymaps.templateLayoutFactory.createClass('<div class="placemark_layout_container"><div class="circle_layout_end"></div></div>');

        if (i == 0){
            map.geoObjects.add(new ymaps.Placemark(points[i].coords, {
                hintContent: `${points[i].name} (Начало)`
            }, {
                iconLayout: circleLayoutStart,
                // Описываем фигуру активной области "Круг".
                iconShape: {
                    type: 'Circle',
                    // Круг описывается в виде центра и радиуса
                    coordinates: [0, 0],
                    radius: 25
                }
            }));
        }
        else if (i == points.length-1){
            map.geoObjects.add(new ymaps.Placemark(points[i].coords, {
                hintContent: `${points[i].name} (Конец)`
            }, {
                iconLayout: circleLayoutEnd,
                // Описываем фигуру активной области "Круг".
                iconShape: {
                    type: 'Circle',
                    // Круг описывается в виде центра и радиуса
                    coordinates: [0, 0],
                    radius: 25
                }
            }));
        }
        else{
            map.geoObjects.add(new ymaps.Placemark(points[i].coords, {
                hintContent: points[i].name
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
        }



    }

    // for (let i = 0; i < points.length-1; i++) {
    //     let route = ymaps.route([points[i].coords, points[i+1].coords])
    //         .then((route)=> myMap.geoObjects.add(route))
    // }

    var multiRoute = new ymaps.multiRouter.MultiRoute({
        // Описание опорных точек мультимаршрута.
        referencePoints: points.map((el) => el.coords),
        params: {
            results: 1
        }
    }, {
        routeActiveMarkerVisible: false,
        wayPointStartVisible: false,
        wayPointFinishVisible: false,
        wayPointVisible: false,
        viaPointVisible: false,
        routeOpenBalloonOnClick: false,
    });
    map.geoObjects.add(multiRoute);
}


ymaps.ready(init);