import type {Meta, StoryObj} from '@storybook/react';
import {action} from '@storybook/addon-actions'
import {TaskType} from "../Todolist/Todolist";
import Task from "./Task";
import React from "react";
import {ReduxStoreProviderDecorator} from "../../stories/ReduxStoreProviderDecorator";

const meta: Meta<typeof Task> = {
    title: 'TASKS/Task',
    component: Task,
    tags: ['autodocs'],
    argTypes: {
        // task: "Task object",
        // todolistId: "id of todolist"
    },
    decorators: [ReduxStoreProviderDecorator]
};
export default meta;


type Story = StoryObj<typeof Task>;

export const TaskExample: Story = {
    args: {
        task: {id: '1', title: "Hello", isDone: true},
        todolistId: "todolist1"
    },
};



// args === props


