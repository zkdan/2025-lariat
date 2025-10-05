import { createGlobalState } from "react-hooks-global-state";

const initialState = { 
  lastFilterPage: '/'  
};

const { useGlobalState } = createGlobalState(initialState);


export const useLastFilterPage = () => {
  return useGlobalState("lastFilterPage");
};