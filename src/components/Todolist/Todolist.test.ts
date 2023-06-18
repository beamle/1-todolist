import { render, fireEvent } from '@testing-library/react';
import {useState} from "react";
import todolist, {TaskType} from "./Todolist";
import Todolist from "./Todolist";

test("Should delete the task by id", () => {
    const Tasks = [
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false}
    ];

    expect(Tasks[1].isDone).toBe(true)
})

// test("Test", () => {
//     const
// })