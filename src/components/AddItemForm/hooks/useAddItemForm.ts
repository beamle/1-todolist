import {ChangeEvent, useState} from "react";

type AddItemFunction = (title: string) => void;

type AddItemFormReturnType = {
    error: string | null;
    inputText: string;
    inputOnChangeHandle: (e: ChangeEvent<HTMLInputElement>) => void;
    addTaskBtnHandle: () => void;
};

export const useAddItemForm = (addItem: AddItemFunction): AddItemFormReturnType => {
    const [error, setError] = useState<string | null>('');
    const [inputText, setInputText] = useState('');
    console.log("add itemForm")
    function addTaskBtnHandle() {
        if (inputText.trim()) {
            addItem(inputText.trim())
            setInputText('')
        } else {
            setError('Title is required')
        }
    }

    function inputOnChangeHandle(e: ChangeEvent<HTMLInputElement>) {
        setInputText(e.target.value)
        setError("")
    }
    return {
        error,
        inputText,
        inputOnChangeHandle,
        addTaskBtnHandle,
    }
}