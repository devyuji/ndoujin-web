export const DATA_ACTION = (payload: any) => {
  return {
    type: "DATA",
    payload,
  };
};

export const CARD_SHOW_ACTION = (payload: boolean) => {
  return {
    type: "CARD_SHOW",
    payload,
  };
};

export const LOADING_ACTION = (payload: boolean) => {
  return {
    type: "LOADING",
    payload,
  };
};

export const USER_INPUT_ACTION = (payload: String) => {
  return {
    type: "INPUT",
    payload,
  };
};
