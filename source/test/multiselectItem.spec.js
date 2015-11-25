chai.should();
describe("multiselectItem directive", function () {
    var scope, rootElement, items, firstElement, secondElement, lastElement, unselectableElement, $window, $document;
    var shiftclickevent = { type: "mousedown", shiftKey: true };
    var ctrlclickevent = { type: "mousedown", ctrlKey: true };
    var mouseDownAt = function (x, y) { return { type: "mousedown", clientX: x, clientY: y } };

    beforeEach(module('tidemann.multiselect'));
    beforeEach(function () {
        rootElement = angular.element("<div multiselect-container><div ng-repeat='item in items' multiselect-item multiselect-model='item'>test</div></div><style>.item{width: 100px; height: 100px;} ul,li{display:block;}</<style>");

    });


    beforeEach(inject(function ($rootScope, $compile, _$window_, _$document_) {
        $window = $window;
        $document = _$document_;
        scope = $rootScope.$new();
        items = [{}, {}, {}, {}, { $isSelectable: false }, {}];
        scope.items = items;
        rootElement = $compile(rootElement)(scope);
        scope.$digest();
        firstElement = angular.element(rootElement[0].children[0]);
        secondElement = angular.element(rootElement[0].children[1]);
        lastElement = angular.element(rootElement[0].children[5]);
        unselectableElement = angular.element(rootElement[0].children[4]);

    }));

    describe("when item is clicked", function () {
        beforeEach(function () {
            scope.items[0].$isSelected = false;
            scope.items[1].$isSelected = true;
            firstElement.triggerHandler('mousedown');
        })
        it("should be selected", function () {

            scope.items[0].$isSelected.should.equal(true);

        });
        describe("other item", function () {
            it("should not be selected", function () {
                scope.items[1].$isSelected.should.equal(false);
            })
        })
    })
    describe("when item is clicked twice", function () {
        beforeEach(function () {
            scope.items[0].$isSelected = false;
        })
        it("should be selected", function () {
            firstElement.triggerHandler('mousedown');
            firstElement.triggerHandler('mouseup');
            firstElement.triggerHandler('mousedown');
            firstElement.triggerHandler('mouseup');
            scope.items[0].$isSelected.should.equal(true);
        });
    })
    describe("when control key is pressed", function () {
        var clickevent = { type: "mousedown", ctrlKey: true };
        beforeEach(function () {
            scope.items[0].$isSelected = false;
            scope.items[1].$isSelected = true;
            scope.items[2].$isSelected = false;


        });
        describe("when first item is clicked", function () {
            beforeEach(function () {
                firstElement.triggerHandler(clickevent);
            })
            it("should be selected", function () {
                scope.items[0].$isSelected.should.equal(true);
            });
            describe("other item", function () {
                it("should be selected", function () {
                    scope.items[1].$isSelected.should.equal(true);
                })
            })
        })



    });

    describe("when shift key is pressed", function () {

        beforeEach(function () {
            scope.items[0].$isSelected = false;
            scope.items[1].$isSelected = false;
            scope.items[2].$isSelected = false;
            scope.items[2].$isSelectable = false;
        })
        describe("when first item is clicked", function () {
            beforeEach(function () {
                firstElement.triggerHandler(shiftclickevent);
            });
            it("should be selected", function () {
                scope.items[0].$isSelected.should.equal(true);
            })
        })
        describe("when last item is clicked", function () {
            beforeEach(function () {
                lastElement.triggerHandler(shiftclickevent);
            });
            it("should be selected", function () {
                scope.items[5].$isSelected.should.equal(true);
            })
            describe("the first element", function () {
                it("should be selected", function () {
                    scope.items[0].$isSelected.should.equal(true);
                })
            })
        })
        describe("when second item is clicked", function () {
            beforeEach(function () {
                secondElement.triggerHandler(shiftclickevent);
            });
            it("should be selected", function () {
                scope.items[1].$isSelected.should.equal(true);
            })
            describe("the first element", function () {
                it("should be selected", function () {
                    scope.items[0].$isSelected.should.equal(true);
                })
            })
            describe("the last element", function () {
                it("should not be selected", function () {
                    scope.items[5].$isSelected.should.equal(false);
                })
            })

        })

    });
    describe("when second item is clicked", function () {
        beforeEach(function () {
            secondElement.triggerHandler('mousedown');
        });
        it("should be selected", function () {
            scope.items[1].$isSelected.should.equal(true);
        })
        describe("then the shift key is pressed", function () {
            describe("then the last element is clicked", function () {
                beforeEach(function () {
                    lastElement.triggerHandler(shiftclickevent);
                });
                it("should be selected", function () {
                    scope.items[5].$isSelected.should.equal(true);
                })
                describe("the first element", function () {
                    it("should not be selected", function () {
                        scope.items[0].$isSelected.should.equal(false);
                    })
                })
                describe("when the first element is clicked", function () {
                    beforeEach(function () {
                        firstElement.triggerHandler(shiftclickevent);
                    });
                    describe("the first element", function () {
                        it("should be selected", function () {
                            scope.items[0].$isSelected.should.equal(true);
                        })
                    })
                    describe("the last element", function () {
                        it("should not be selected", function () {
                            scope.items[5].$isSelected.should.equal(false);
                        })
                    })
                    describe("when the last element is clicked", function () {
                        beforeEach(function () {
                            lastElement.triggerHandler(shiftclickevent);
                        });
                        describe("the first element", function () {
                            it("should not be selected", function () {
                                scope.items[0].$isSelected.should.equal(false);
                            })
                        })

                    });


                })

            })
            describe("when the first then the last element is clicked", function () {
                beforeEach(function () {

                })
                describe("the last element", function () {

                });
            })

        })
    });
    describe("unselectable item", function () {

        describe("is clicked", function () {
            it("should not be selected", function () {
                unselectableElement.triggerHandler('mousedown');
                scope.items[4].$isSelected.should.equal(false);
            });
        });
        describe("is control-clicked", function () {
            it("should not be selected", function () {
                unselectableElement.triggerHandler(ctrlclickevent);
                scope.items[4].$isSelected.should.equal(false);
            });
        });

    })
});
