// Функция ymaps.ready() будет вызвана, когда
// загрузятся все компоненты API, а также когда будет готово DOM-дерево.

function init() {
    // Создание карты.


    ymaps.ready(function () {
        var map = new ymaps.Map("map-test", {
            center: [53.901390, 27.556757],
            zoom: 12
        });
    });
}
ymaps.ready(init);