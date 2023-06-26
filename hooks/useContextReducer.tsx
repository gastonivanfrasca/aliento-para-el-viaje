import { LANGS, LOCAL_STORAGE_KEY } from "@/lib/lang/types";
import React, { createContext, useContext, useReducer } from "react";
import { getDictionary } from "@/lib/dict";

export enum ACTIONS {
  SET_AUDIO_URL = "SET_AUDIO_URL",
  SET_LANG = "SET_LANG",
  SET_DICTIONARY = "SET_DICTIONARY",
  RESET = "RESET",
}

type Action =
  | { type: ACTIONS.SET_AUDIO_URL, payload: string }
  | { type: ACTIONS.SET_LANG, payload: LANGS }
  | { type: ACTIONS.SET_DICTIONARY, payload: any }
  | { type: ACTIONS.RESET }

type Dispatch = (action: Action) => void;

type State = {
  audioURL: string;
  lang: string;
  dict: any;
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
  audioURL: "",
  lang: (localStorage.getItem(LOCAL_STORAGE_KEY) || LANGS.ES) as LANGS,
  dict: getDictionary(localStorage.getItem(LOCAL_STORAGE_KEY) || LANGS.ES)
};

export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case ACTIONS.SET_AUDIO_URL:
      return { ...state, audioURL: action.payload };
    case ACTIONS.SET_LANG:
      return { ...state, lang: action.payload };
    case ACTIONS.SET_DICTIONARY:
      return { ...state, dict: action.payload };
    case ACTIONS.RESET:
      return initialState;
    default:
      return state;
  }
};

