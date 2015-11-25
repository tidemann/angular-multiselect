(function () {
    'use strict';

    angular
        .module('tidemann.multiselect')
        .directive('multiselectContainer', multiselectContainer);

    multiselectContainer.$inject = ['$document', 'MultiselectHelper'];
    function multiselectContainer($document, MultiselectHelper) {
        var directive = {
            restrict: 'EA',
            controller: MultiselectContainer,
            controllerAs: 'dirCtrl',
            link: link
        };
        return directive;
        
        function MultiselectContainer() {
            var dirCtrl = this;
            dirCtrl.multiselectItems = [];
            dirCtrl.addItem = addItem;
            dirCtrl.selectSingleItem = selectSingleItem;
            dirCtrl.selectMultipleItems = selectMultipleItems;
            dirCtrl.setItemActive = setItemActive;

            dirCtrl.dragMode = false;
            dirCtrl.dragRectangle = {};

            dirCtrl.body = $document.find('body');

            dirCtrl.preselectCovered = function (area) {
                for (var i = 0; i < dirCtrl.multiselectItems.length; i++) {
                    var elArea = MultiselectHelper.convertToRectangle(dirCtrl.multiselectItems[i].element[0]);
                    if (MultiselectHelper.intersects(area, elArea))
                        dirCtrl.multiselectItems[i].preselect();
                    else {
                        dirCtrl.multiselectItems[i].unpreselect();
                    }
                }
            }
            dirCtrl.selectCovered = function (area) {
                for (var i = 0; i < dirCtrl.multiselectItems.length; i++) {

                    var elArea = MultiselectHelper.convertToRectangle(dirCtrl.multiselectItems[i].element[0]);

                    if(MultiselectHelper.intersects(area, elArea))
                        dirCtrl.multiselectItems[i].select();
                }
            }
            dirCtrl.toggleCovered = function (area) {
                for (var i = 0; i < dirCtrl.multiselectItems.length; i++) {

                    var elArea = MultiselectHelper.convertToRectangle(dirCtrl.multiselectItems[i].element[0]);

                    if (MultiselectHelper.intersects(area, elArea))
                        dirCtrl.multiselectItems[i].toggle();
                }
            }

            dirCtrl.deselectAll = function () {
                for (var i = 0; i < dirCtrl.multiselectItems.length; i++) {
                    dirCtrl.multiselectItems[i].deselect();
                }
            }
            function addItem(msObj) {
                dirCtrl.multiselectItems.push(msObj)
            }

            function selectSingleItem(item) {
                for (var i = 0; i < dirCtrl.multiselectItems.length; i++) {
                    dirCtrl.multiselectItems[i].deselect();
                }
                item.select();
            }

            function setItemActive(item) {
                for (var i = 0; i < dirCtrl.multiselectItems.length; i++) {
                    dirCtrl.multiselectItems[i].$active = false;
                }
                item.$active = true;
            }
            function getActiveItemIndex() {
                for (var i = 0; i < dirCtrl.multiselectItems.length; i++) {
                    if (dirCtrl.multiselectItems[i].$active == true)
                        return i;
                }
                return 0;
            }

            function selectMultipleItems(item) {
                var start = getActiveItemIndex(),
                    end = dirCtrl.multiselectItems.indexOf(item);
                getActiveItemIndex();
                selectSingleItem(item);
                for (var i = Math.min(start, end) ; i < Math.max(start, end) + 1; i++) {
                    dirCtrl.multiselectItems[i].select();
                }

            }

            function getFirstSelectedIndex() {
                for (var i = 0; i < dirCtrl.multiselectItems.length; i++) {
                    if (dirCtrl.multiselectItems[i].model.$isSelected)
                        return i;
                }
                return 0;
            }
        }

        function link(scope, element, attrs, dirCtrl) {

            element.on('mousedown', mousedown)
            dirCtrl.body.on('mousemove', mousemove)
            dirCtrl.body.on('mouseup', mouseup)

            function mousedown(event) {
                if (!(event.ctrlKey || event.shiftKey))
                    dirCtrl.deselectAll();
                dirCtrl.mouseStart = event;
                dirCtrl.dragMode = true;
                dirCtrl.dragRectangle = {
                    left: event.clientX,
                    top: event.clientY
                }
                if (dirCtrl.selectArea)
                    dirCtrl.selectArea.remove();
                dirCtrl.selectArea = angular.element('<div class="select-area" style="position: absolute; top:0; left:0; height: 0; width: 0;"></div>');
                dirCtrl.body.append(dirCtrl.selectArea)
            }

            function mousemove(event) {
                if (dirCtrl.dragMode) {
                    var mouseArea = MultiselectHelper.calcMouseRectangle(dirCtrl.mouseStart, event);
                    dirCtrl.selectArea.css({
                        height: mouseArea.height + 'px',
                        width: mouseArea.width + 'px',
                        top: mouseArea.top + 'px',
                        left: mouseArea.left + 'px'
                    });
                    dirCtrl.preselectCovered(mouseArea);
                    scope.$apply();
                }
            }

            function mouseup(event) {
                if (dirCtrl.dragMode) {
                    var mouseArea = MultiselectHelper.calcMouseRectangle(dirCtrl.mouseStart, event);
                    dirCtrl.dragMode = false;
                    dirCtrl.selectArea.remove();
                    if (event.ctrlKey) {
                        dirCtrl.toggleCovered(mouseArea);
                    }
                    else {
                        dirCtrl.selectCovered(mouseArea);
                    }
                    scope.$apply();
                }
            }

        }
    }

})();