import type {Meta, StoryObj} from '@storybook/react';
import {EditableSpan} from "./EditableSpan";
import {action} from "@storybook/addon-actions";


const meta: Meta<typeof EditableSpan> = {
    title: 'EditableSpan',
    component: EditableSpan,
    tags: ['autodocs'],
    argTypes: {
        // task: "Task object",
        // todoListId: "id of todolist"
    },
};
export default meta;


type Story = StoryObj<typeof EditableSpan>;

const changeTitleCallback = action("The title changed to: ")

export const EditableSpanExample: Story = {
    args: {
        title: "title",
        changeTitleHandler: changeTitleCallback
    },
    
};



