import React, {useCallback, useEffect} from 'react'
import './App.css'
import {
    AppBar,
    Button,
    CircularProgress,
    Container,
    IconButton,
    LinearProgress,
    Toolbar,
    Typography
} from '@material-ui/core'
import {Menu} from '@material-ui/icons'
import {TodolistsList} from '../features/TodolistsList/TodolistsList'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType} from './store'
import {initializeAppTC, logoutTC, RequestStatusType} from './app-reducer'
import {Redirect, Route, Switch} from 'react-router-dom'
import {Login} from "../features/Login/Login";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";

type PropsType = {
    demo?: boolean
}

function App({demo = false}: PropsType) {
    const status = useSelector<AppRootStateType, RequestStatusType>((state) => state.app.status)
    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const dispatch = useDispatch();
    const LogoutHandler = useCallback(() => {
        dispatch(logoutTC())
    }, [])
    useEffect(() => {
        dispatch(initializeAppTC());
    }, [dispatch])
    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    return (
        <div className="App">
            <ErrorSnackbar/>
            <AppBar position="static">
                <Toolbar style={{display:"flex", justifyContent:"space-between"}}>

                    <Typography variant="h6">
                       Tasks
                    </Typography>
                    <Button style={{marginLeft:"20px"}}  color="inherit" onClick={LogoutHandler}>{isLoggedIn ? "logout" : "Login "} </Button>
                </Toolbar>
                {status === 'loading' && <LinearProgress/>}
            </AppBar>
            <Container fixed >
                <Switch>
                    <Route exact path={'/'} render={() => <TodolistsList demo={demo}/>}/>
                    <Route path={'/login'} render={() => <Login/>}/>
                    <Route path={"/404"} render={() => <h1>Error 404. Page not found.</h1>}/>
                    <Redirect from={"*"} to={"/404"}/>
                </Switch>
            </Container>
        </div>
    )
}

export default App
