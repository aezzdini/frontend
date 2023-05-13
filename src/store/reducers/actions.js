// action - account reducer
export const LOGIN = '@auth/LOGIN';
export const LOGOUT = '@auth/LOGOUT';
export const REGISTER = '@auth/REGISTER';
export const SET_USER = '@user/SET_USER';

export const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
}
