import { createGlobalState } from "react-hooks-global-state";

const initialState = { 
  lastFilterPage: '/',
  grayscale: false
};

const { useGlobalState } = createGlobalState(initialState);


export const useLastFilterPage = () => {
  return useGlobalState("lastFilterPage");
};

export const useGrayscale = () => {
  return useGlobalState("grayscale");
};