import type {Meta, StoryObj} from '@storybook/react';
import {action} from "@storybook/addon-actions";
import AppWithRedux from "./AppWithRedux";
import {ReduxStoreProviderDecorator} from "./stories/ReduxStoreProviderDecorator";


const meta: Meta<typeof AppWithRedux> = {
    title: 'App with redux',
    component: AppWithRedux,
    tags: ['autodocs'],
    argTypes: {
        // task: "Task object",
        // todolistId: "id of todolist"
    },
    decorators: [ReduxStoreProviderDecorator]
};
export default meta;


type Story = StoryObj<typeof AppWithRedux>;

const changeTitleCallback = action("The title changed to: ")

export const AppWithReduxExample: Story = {
    args: {
    },
};

