const API_END_POINT = "http://localhost:3001/api/v1";

const REGEX = {
  name: /^[a-zA-Z ]*$/,
  email:
    /^[a-zA-Z0-9.! #$%&'*+/=? ^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
};

export { API_END_POINT, REGEX };
