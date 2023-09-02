import React from 'react';
import { render } from '@testing-library/react';
import App from '../trash/App/App';
import {appReducer, RequestStatusType, setAppErrorAC, setAppStatusAC} from "./app-reducer";

type InitialStateType = {
  status: RequestStatusType
  error: string | null
}

const startState: InitialStateType = {
  status: "idle",
  error: null
}

test('App status should be changed', () => {
  const action = setAppStatusAC('succeeded')
  const endState = appReducer(startState, action)
  expect(endState.status).toBe('succeeded')
  expect(endState.error).toBe(null)
});

test('App error should be changed', () => {
  const action = setAppErrorAC('SOME ERROR')
  const endState = appReducer(startState, action)
  expect(endState.error).toBe('SOME ERROR')
  expect(endState.status).toBe('idle')
})