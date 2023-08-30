import React, { createContext, useContext, useReducer } from "react";
import { Audio } from "../types/audio";

export enum ACTIONS {
    SET_DAILY_AUDIO = "SET_DAILY_AUDIO",
}

type Action =
    | { type: ACTIONS.SET_DAILY_AUDIO; payload: Audio }

type Dispatch = (action: Action) => void;

type State = {
    dailyAudio: Audio;
};
type Reducer = (state: State, action: Action) => State;

type ContextReducer = {
    state: State;
    dispatch: Dispatch;
};

const ContextReducerContext = createContext<ContextReducer | undefined>(
    undefined
);


export const useContextReducer = (
    reducer: Reducer,
    initialState: State
): ContextReducer => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return { state, dispatch };
};

export const ContextReducerProvider: React.FC<{
    reducer: Reducer;
    initialState: State;
    children: React.ReactNode;
  }> = ({ reducer, initialState, children }) => {
    const contextReducer = useContextReducer(reducer, initialState);
    return (
      <ContextReducerContext.Provider value={contextReducer}>
        {children}
      </ContextReducerContext.Provider>
    );
  };

export const useContextReducerState = () => {
    const contextReducer = useContext(ContextReducerContext);
    if (!contextReducer) {
        throw new Error(
            "useContextReducerState must be used within a ContextReducerProvider"
        );
    }
    return contextReducer.state;
};

export const useContextReducerDispatch = () => {
    const contextReducer = useContext(ContextReducerContext);
    if (!contextReducer) {
        throw new Error(
            "useContextReducerDispatch must be used within a ContextReducerProvider"
        );
    }
    return contextReducer.dispatch;
};



export const initialState: State = {
    dailyAudio: {
        title: "",
        url: "",
        date: "",
    },
};

export const reducer = (state: State, action: Action) => {
    switch (action.type) {
        case ACTIONS.SET_DAILY_AUDIO:
            return {
                ...state,
                dailyAudio: action.payload,
            };
        default:
            return state;
    }
};