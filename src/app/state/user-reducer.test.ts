import {userReducer} from "./user-reducer";

test('user reducer should increment only age', () => {
    const startState = { age: 20, childrenCount: 2, name: 'Dimych'};
    const endState = userReducer(startState, {type: 'INCREMENT-AGE'});

    expect(endState.age).toBe(21);
    expect(endState.childrenCount).toBe(2);
});

test('user reducer should increment only children count', () => {
    const startState = { age: 20, childrenCount: 2, name: 'Dimych'};
    const endState = userReducer(startState, {type: 'INCREMENT-CHILDREN-COUNT'})

    expect(endState.age).toBe(20)
    expect(endState.childrenCount).toBe(3)
})

test("I want to change user name", () => {
    const newName = 'Banan'
    const startState = { age: 20, childrenCount: 2, name: 'Dimych'};
    const endState = userReducer(startState, {type: "CHANGE-USER-NAME", name: newName})

    expect(endState.name).toBe(newName)
})