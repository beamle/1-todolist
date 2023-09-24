import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import {AppRootStateType} from "../../../app/store";
import {useDispatch, useSelector} from "react-redux";
import {setAppErrorAC} from "../../../app/app-reducer";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function CustomizedSnackbars() {
    const error = useSelector<AppRootStateType, string | null >(state => state.app.error)
    const dispatch = useDispatch();
    const isOpen = error !== null

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        dispatch(setAppErrorAC({error: null}))
    };

    return (
        <Stack spacing={2} sx={{ width: '100%' }}>
            <Snackbar open={isOpen} autoHideDuration={2000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
                    {error}
                </Alert>
            </Snackbar>
        </Stack>
    );
}
