import {} from "../../actions/types";

const initialState = {
  user: null,
  usersForLocationInvite: [],
};

const userReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    default:
      return state;
  }
};

export default userReducer;
