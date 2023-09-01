import {ChangeEvent, useState} from "react";
import {useDispatch} from "react-redux";
import {setErrorAC} from "../../../app/app-reducer";

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

    const dispatch = useDispatch();

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
        if (inputText.length > 100) {
            console.log(inputText)
            dispatch(setErrorAC("Length of title should be less than 100"))
            setError(inputText.length.toString())
        }
        else {
            setError("")
        }
    }

        return {
            error,
            inputText,
            inputOnChangeHandle,
            addTaskBtnHandle,
        }
    }