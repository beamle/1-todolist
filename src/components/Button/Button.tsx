import React from 'react';

type PropsType = {
    name: string,
    callBack: () => void
    className: string
}

const Button = ({name, callBack, className}: PropsType) => {
    const onClickHandler = () => {
        callBack()
    }

    return (
            <button className={className} onClick={onClickHandler}>{name}</button>
    );
};

export default Button;