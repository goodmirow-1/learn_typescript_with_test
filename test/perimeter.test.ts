import { Rectangle, Circle, Shape, AreaTest } from "../src/perimeter";

describe('perimeter calc by function', () => {
    function checkArea(shape: Shape, want: number){
        const got = shape.Area();

        expect(got).toBe(want);
    }

    test('checkArea rectangle', () => {
        const rectangle = new Rectangle(12, 6);
        checkArea(rectangle, 72.0);
    })

    test('check circle', () => {
        const circle = new Circle(10);
        checkArea(circle, 314.1592653589793);
    })

    test('check AreaTest to the array', () => {
        let areaTest = [
            new AreaTest(new Rectangle(12,6), 72),
            new AreaTest(new Circle(10), 314.1592653589793)
        ]

        for(var i = 0 ; i < areaTest.length; ++i){
            checkArea(areaTest[i].shape, areaTest[i].want)
        }
    })
})