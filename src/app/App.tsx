import React from 'react';
import './App.css';
import Container from '@material-ui/core/Container';
import {TaskType} from "../api/todolistsAPI";
import {TodolistsList} from "../features/TodolistsLists/TodolistsList";


function App() {
    console.log("APP is rerendered")


    return (
        <div className="App">
            <Container>
                <TodolistsList/>
            </Container>
        </div>
    );
}

export default App;
