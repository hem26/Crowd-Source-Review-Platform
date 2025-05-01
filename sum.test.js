const { sum, subtract, sumOfNumbers } = require("./sum")

test('add 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
});


test('2+2 = 4', () => {
    expect(sum(2, 2)).toBe(4);
})

test("5-2 = 3", () => {
    expect(subtract(5, 2)).toBe(3);
})

test("Sum of Numbers from 0 to 10 is 55", () => {
    expect(sumOfNumbers(0)).toBe(55);
})

test('object assignment', () => {
    const data = { one: 1 };
    data['two'] = 2; //object assignment
    expect(data).toEqual({ one: 1, two: 2 });
})

test('adding positive numbers is not zero', () => {
    for (let a = 1; a < 10; a++) {
        for (let b = 1; b < 10; b++) {
            expect(a + b).not.toBe(0);
        }
    }
})

// Practice makes a man perfect
// Tuthiness
test('null', () => {
    const n = null;
    expect(n).toBeNull();
    expect(n).toBeDefined();
    expect(n).not.toBeUndefined();
    expect(n).not.toBeTruthy();
    expect(n).toBeFalsy();
})

test('zero', ()=>{
    const z = 0;
    expect(z).not.toBeNull();
    expect(z).toBeDefined();
    expect(z).not.toBeUndefined();
    expect(z).not.toBeTruthy();
    expect(z).toBeFalsy();
})


// Numbers
test('two plus two', ()=>{
    const value = 2+2;
    expect(value).toBeGreaterThan(3);
    expect(value).toBeGreaterThan(3.5);
    expect(value).toBeLessThan(5);
    expect(value).toBeLessThanOrEqual(4.5);
})

test('adding floating number', ()=>{
    const value = 0.1+0.2;
    expect(value).toBeCloseTo(0.3);
})

// String
test('there is no I in team ', ()=>{
    expect('team').not.toMatch(/I/);
})

test('but there is a "stop" in Christoph', ()=>{
    expect('Christoph').toMatch(/stop/);
})

// Array and iterables
const shoppingList = [
    'diapers',
    'kleenex',
    'trash bags',
    'paper towels',
    'milk',
];

test('the shopping list has milk on it', ()=>{
    expect(shoppingList).toContain('milk');
    expect(new Set(shoppingList)).toContain('milk');
})

// Exceptions
function compileAndroidCode(){
    throw new Error('you are using the wrong JDK !');
}

test('compiling android goes as expected', ()=>{
    expect(()=>compileAndroidCode()).toThrow();
    expect(()=>compileAndroidCode()).toThrow(Error);

    expect(()=>compileAndroidCode()).toThrow('you are using the wrong JDK');
    expect(()=>compileAndroidCode()).toThrow(/JDK/);

    // expect(()=>compileAndroidCode()).toThrow(/^you are using the wrong JDK$/);
    // expect(()=>compileAndroidCode()).toThrow(/^you are using the wrong JDK!$/);
})