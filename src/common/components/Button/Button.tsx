import React from 'react';
import Button from "@material-ui/core/Button";

export type ClassNameType = "text" | "outlined" | "contained" | undefined

type PropsType = {
    name: string,
    callBack: () => void
    className: ClassNameType
}

export const MyButton = React.memo(({name, callBack, className}: PropsType) => {
    const onClickHandler = () => {
        callBack()
    }

    const finalClassName = JSON.stringify(className)

    return (
        <Button variant={className} onClick={onClickHandler} color={'default'}>{name}</Button>
        //     <IconButton className={className} onClick={onClickHandler} size={'small'} color={'default'} ><AddTaskIcon/></IconButton>
    );
})