import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { navigate } from "../navigationRef";

const authReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "signup":
      return { token: action.payload, errorMessage: "" };
    default:
      return state;
  }
};

const signup =
  (dispatch) =>
  async ({ email, password }) => {
    try {
      // make api request to sign up with email and password
      const response = await trackerApi.post("/signup", { email, password });
      // if we sign up we probably want to modify state to say we are authenticated
      console.log(response.data);
      await AsyncStorage.setItem("token", response.data.token);
      dispatch({ type: "signup", payload: response.data.token });
      // navigate to main flow
      navigate("TrackList");
    } catch (err) {
      // if sign up fails, need to reflect error message
      console.log(err);
      dispatch({
        type: "add_error",
        payload: "Something went wrong with signup",
      });
    }
  };

const signin = (dispatch) => {
  return ({ email, password }) => {
    // make api request to sign in with email and password
    // if we sign up we probably want to modify state to say we are authenticated
    // if sign up fails, need to reflect error message
  };
};

const signout = (dispatch) => {
  return () => {
    // destroy token
  };
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signin, signout, signup },
  { token: null, errorMessage: "" }
);
