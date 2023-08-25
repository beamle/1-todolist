import type {Meta, StoryObj} from '@storybook/react';
import Task from "./Task";
import {ReduxStoreProviderDecorator} from "../../stories/ReduxStoreProviderDecorator";
import {TaskPriorities, TaskStatuses} from "../../api/todolistsAPI";

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
        task: {
            id: '1', title: "Hello", completed: true, status: TaskStatuses.Completed,
            todoListId: "1",
            description: '',
            startDate: '',
            deadline: '',
            addedDate: '',
            order: 0,
            priority: TaskPriorities.Low,
        },
        todolistId: "todolist1"
    },
};


// args === props


