import { LANGS } from "@/lib/lang/types";
import React, { createContext, useContext, useReducer } from "react";

type Action = 
  | { type: 'SET_AUDIO_URL', payload: string }
  | { type: 'SET_LANG', payload: LANGS }
  | { type: 'RESET' }

type Dispatch = (action: Action) => void;

type State = {
  audioURL: string;
  lang: string;
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

const langFromLocalStorage = localStorage.getItem("lang");

export const initialState: State = {
  audioURL: "",
  lang: langFromLocalStorage ? langFromLocalStorage : "es",
};

export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "SET_AUDIO_URL":
      return { ...state, audioURL: action.payload };
    case "SET_LANG":
      return { ...state, lang: action.payload };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};