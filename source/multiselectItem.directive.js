(function () {
    'use strict';

    angular
        .module('tidemann.multiselect')
        .directive('multiselectItem', multiselectItem);

    multiselectItem.$inject = [];

    function multiselectItem() {
        // Usage:
        //     <multiselect-item></multiselect-item>
        // Creates:
        // 
        var directive = {
            require: '^multiselectContainer',
            scope: {
                multiselectModel: "="
            },
            link: link,
            restrict: 'EA'
        };
        return directive;

        function link(scope, element, attrs, multiselectContainer) {
            var msObj = {
                model: scope.multiselectModel,
                element:element,
                toggle: toggle,
                preselect: preselect,
                unpreselect: unpreselect,
                select: select,
                deselect:deselect
            }


            msObj.model.$isSelected = !!msObj.model.$isSelected;
            msObj.model.$isSelecting = !!msObj.model.$isSelecting;
            msObj.model.$isSelectable = msObj.model.$isSelectable == false ? false : true;

            if (msObj.model.$isSelectable)
                multiselectContainer.addItem(msObj);
            
            element.on('mousedown', mousedown)

            function mousedown(event) {
                if (!event.ctrlKey || event.shiftKey) {
                    if (event.shiftKey) {
                        multiselectContainer.selectMultipleItems(msObj);
                    }
                    else {
                        multiselectContainer.selectSingleItem(msObj);
                        multiselectContainer.setItemActive(msObj);
                    }
                }
                else {
                    msObj.toggle();
                    multiselectContainer.setItemActive(msObj);
                }
                event.stopPropagation();
                scope.$apply();
            }

            function toggle() {
                if (!this.model.$isSelectable)
                    return;
                this.model.$isSelected = !this.model.$isSelected;
                this.model.$isSelecting = false;
            }
            function preselect() {
                this.model.$isSelecting = true;
            }
            function unpreselect() {
                this.model.$isSelecting = false;
            }

            function select() {
                if (!this.model.$isSelectable)
                    return;
                this.model.$isSelected = true;
                this.model.$isSelecting = false;
            }
            function deselect() {
                this.model.$isSelected = false;
                this.model.$isSelecting = false;
            }

        }
    }

})();