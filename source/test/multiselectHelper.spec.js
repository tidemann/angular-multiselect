chai.should();

describe("multiselect helper", function () {
    var MultiselectHelper;

    beforeEach(module('tidemann.multiselect'));

    beforeEach(inject(function (_MultiselectHelper_) {
        MultiselectHelper = _MultiselectHelper_;
    }))

    function area(top, left, width, height) {
        return {
            top: top,
            left: left,
            width: width,
            height: height
        }
    }

    describe("intersects function", function () {
        it("should exist", function () {
            MultiselectHelper.intersects.should.exist;
            MultiselectHelper.intersects.should.be.a("function");
        });
        it("should return a boolean", function () {
            MultiselectHelper.intersects().should.be.a("boolean");
        });
        describe("when area does not intersect target", function () {
            describe("below", function () {
                var a = area(0, 2, 1, 1);
                var target = area(0, 0, 1, 1);
                it("should return false", function () {
                    MultiselectHelper.intersects(a, target).should.equal(false);
                })
            })
            describe("to the right", function () {
                var a = area(2, 0, 1, 1);
                var target = area(0, 0, 1, 1);
                it("should return false", function () {
                    MultiselectHelper.intersects(a, target).should.equal(false);
                })
            })
            describe("to the left", function () {
                var a = area(0, 0, 1, 1);
                var target = area(0, 2, 1, 1);
                it("should return false", function () {
                    MultiselectHelper.intersects(a, target).should.equal(false);
                })
            })
            describe("over", function () {
                var a = area(0, 0, 1, 1);
                var target = area(2, 0, 1, 1);
                it("should return false", function () {
                    MultiselectHelper.intersects(a, target).should.equal(false);
                })
            })

        })
        describe("when area covers upper left corner", function () {
            var a = area(0, 0, 2, 2);
            var target = area(1, 1, 3, 3);
            it("should return true", function () {
                MultiselectHelper.intersects(a, target).should.equal(true);
            })
        })
        describe("when area covers upper right corner", function () {
            var a = area(0, 2, 2, 2);
            var target = area(1, 1, 3, 3);
            it("should return true", function () {
                MultiselectHelper.intersects(a, target).should.equal(true);
            })
        })
        describe("when area covers lower left corner", function () {
            var a = area(2, 0, 2, 2);
            var target = area(1, 1, 3, 3);
            it("should return true", function () {
                MultiselectHelper.intersects(a, target).should.equal(true);
            })
        })
        describe("when area covers lower right corner", function () {
            var a = area(2, 2, 2, 2);
            var target = area(1, 1, 3, 3);
            it("should return true", function () {
                MultiselectHelper.intersects(a, target).should.equal(true);
            })
        })
        describe("when horizontal area covers middle", function () {
            var a = area(5, 0, 10, 1);
            var target = area(1, 1, 10, 10);
            it("should return true", function () {
                MultiselectHelper.intersects(a, target).should.equal(true);
            })
        })

        describe("when vertical area covers middle", function () {
            var a = area(0, 5, 1, 10);
            var target = area(1, 1, 10, 10);
            it("should return true", function () {
                MultiselectHelper.intersects(a, target).should.equal(true);
            })
        })

    })

})