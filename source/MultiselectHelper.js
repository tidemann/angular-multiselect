(function () {
    'use strict';

    angular
        .module('tidemann.multiselect')
        .factory('MultiselectHelper', MultiselectHelper);
    MultiselectHelper.$inject = [];
    function MultiselectHelper() {
        function MultiselectHelper() {}

        MultiselectHelper.intersects = intersects;
        MultiselectHelper.elementsIntersects = elementsIntersects;
        MultiselectHelper.convertToRectangle = convertToRectangle;
        MultiselectHelper.calcMouseRectangle = calcMouseRectangle;

        function intersects(a, b) {
            if (a && b) {
                return (a.left <= b.left + b.width && b.left <= a.left + a.width &&
                        a.top <= b.top + b.height && b.top <= a.top + a.height);
            }
            return false;

        }
        function elementsIntersects(areaElement, targetsElement) {
            return intersects(areaElement.getBoundingClientRect(), targetsElement.getBoundingClientRect());
        }
        function calcMouseRectangle(start, pos) {
            return {
                width: Math.abs(start.clientX - pos.clientX),
                height: Math.abs(start.clientY - pos.clientY),
                left: Math.min(start.clientX, pos.clientX || start.clientX),
                top: Math.min(start.clientY, pos.clientY || start.clientY),
            }
        }

        function convertToRectangle(element) {
            var de = document.documentElement,
                box = element.getBoundingClientRect(),
                top = box.top + window.pageYOffset - de.clientTop,
                left = box.left + window.pageXOffset - de.clientLeft;
            return { top: top, left: left, width: box.width, height: box.height };
        }

        return MultiselectHelper;
    }
})();