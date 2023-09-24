import type {Meta, StoryObj} from '@storybook/react';
import {AddItemForm} from './AddItemForm';
import {action} from '@storybook/addon-actions'
import {ReduxStoreProviderDecorator} from "../../../stories/ReduxStoreProviderDecorator";

const meta: Meta<typeof AddItemForm> = {
    title: 'TODOLISTS/AddItemForm',
    component: AddItemForm,
    tags: ['autodocs'],
    argTypes: {
        addItem: {
            description: 'This is a method to that add new item',
            action: 'clicked'
        }
    },
};

export default meta;
type Story = StoryObj<typeof AddItemForm>;

export const AddItemFormStory: Story = {
    args: {
        addItem: action('Button clicked inside the input')
    },
};


export const AddItemFormDisabledStory: Story = {
    args: {
        addItem: action('Button clicked inside the input'),
        disabled: true
    },
};


// args === props
// another option


