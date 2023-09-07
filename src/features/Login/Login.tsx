import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import React from 'react';
import {useFormik} from "formik";
import {loginTC} from "./login-reducer";
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "../../store";
import {LoginParams} from "../../api/authAPI";
import {Navigate} from "react-router-dom";

export const Login = () => {
    const dispatch = useAppDispatch();
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)
    const authenticated = useSelector<AppRootStateType, boolean>(state => state.login.isInitialized)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: values => {
            if (!values.email) {
                return {
                    email: "Email is required"
                }
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                return {
                    email: 'Invalid email address'
                }
            } else if (values.email.length > 25) {
                return {
                    email: 'Must be 25 characters or less'
                }
            }
            if (!values.password) {
                return {
                    password: "Password is required"
                }
            }
        },
        onSubmit: values => {
            dispatch(loginTC(values))
        }
    })

    const logIn = (values: LoginParams) => {
        dispatch(loginTC(values))
    }
    if(authenticated) {
        return <Navigate to="/"/>
    }

    return <Grid container justifyContent={'center'}>
        <Grid>
            <form onSubmit={formik.handleSubmit}>
                <FormControl>
                    <FormLabel>
                        <p>To log in get registered
                            <a href={'https://social-network.samuraijs.com/'}
                               target={'_blank'}> here
                            </a>
                        </p>
                        <p>or use common test account credentials:</p>
                        <p>Email: free@samuraijs.com</p>
                        <p>Password: free</p>
                    </FormLabel>
                    <FormGroup>
                        <TextField label="Email" margin="normal" name="email" defaultValue="free@samuraijs.com"
                                   onChange={formik.handleChange}
                                   onBlur={formik.handleBlur}
                        />
                        {formik.touched.email && formik.errors.email ? <div>{formik.errors.email}</div> : null}

                        <TextField type="password" label="Password"
                                   margin="normal" name="password" defaultValue="free"
                                   onChange={formik.handleChange}
                                   onBlur={formik.handleBlur}
                        />
                        {formik.touched.password && formik.errors.password ? <div>{formik.errors.password}</div> : null}
                        <FormControlLabel label={'Remember me'} name="rememberMe" onChange={formik.handleChange}
                                          control={<Checkbox/>}/>
                        <Button type={'submit'} variant={'contained'} color={'primary'}>
                            Login
                        </Button>
                    </FormGroup>
                </FormControl>
            </form>
        </Grid>
    </Grid>
}

type FormikValuesType = {
    email: string,
    password: string,
    rememberMe: boolean
}