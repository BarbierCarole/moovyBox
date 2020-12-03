import {
  SYNC_PSEUDO,
  SYNC_EMAIL,
  SYNC_PASSWORD,
  SYNC_PASSWORDVAL,
  SYNC_OLDPASSWORD,
  SYNC_NEWPASSWORD,
  SYNC_USER_ID,
  SYNC_ISLOGGED,
  SYNC_MOVES,
  SYNC_MOVE_ID_SELECTED,
 } from './actions';

const initialState = {
  pseudo: '',
  email: '',
  oldPassword: '',
  newPassword: '',
  password: '',
  passwordVal: '',
  user_id: '',  
  isLogged: false,
  boxesByMove: '',
  moves: [],
  moveIdSelected:'',
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SYNC_PSEUDO: {
      console.log('from signin', action);
      return { ...state, pseudo: action.pseudo }; // ...state, pseudo: action.history.pseudo
    }
    case SYNC_MOVES: {
      console.log('from signin moves', action);
      return { ...state, moves: action.moves };
    }
    case SYNC_EMAIL: {
      return { ...state, email: action.email };
    }
    case SYNC_NEWPASSWORD: {
      return { ...state, newPassword: action.newPassword };
    }
    case SYNC_OLDPASSWORD: {
      return { ...state, oldPassword: action.oldPassword };
    }
    case SYNC_PASSWORD: {
      return { ...state, password: action.password };
    }
    case SYNC_PASSWORDVAL: {
      return { ...state, passwordVal: action.passwordVal };
    }
    case SYNC_USER_ID: {
      return { ...state, user_id: action.user_id };
    }
    case SYNC_ISLOGGED: {
      return { ...state, isLogged: action.isLogged };
    }
    case SYNC_MOVE_ID_SELECTED :{
      return { ...state, moveIdSelected: action.moveIdSelected };
    }
    default: {
      return state;
    }
  }
};
