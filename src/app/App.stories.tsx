import type {Meta, StoryObj} from '@storybook/react';
import {action} from "@storybook/addon-actions";

import {ReduxStoreProviderDecorator} from "../stories/ReduxStoreProviderDecorator";
import App from "./App";


const meta: Meta<typeof App> = {
    title: 'App',
    component: App,
    tags: ['autodocs'],
    argTypes: {
        // task: "Task object",
        // todoListId: "id of todolist"
    },
    decorators: [ReduxStoreProviderDecorator]
};
export default meta;


type Story = StoryObj<typeof App>;

const changeTitleCallback = action("The title changed to: ")

export const AppExample: Story = {
    args: {
    },
};

