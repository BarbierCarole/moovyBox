import {
  SYNC_PSEUDO,
  SYNC_EMAIL,
  SYNC_PASSWORD,
  SYNC_PASSWORDVAL,
  SYNC_LABEL_BOX, 
  SYNC_LABEL_MOVE,
  SYNC_DESTINATION_ROOM,
  SYNC_FRAGILE,
  SYNC_HEAVY,
  SYNC_FLOOR,
  SYNC_DATE,
  SYNC_ADDRESS,
  SYNC_NAME_INVENTORY,
  SYNC_NAME_ITEM,
  SYNC_USER_ID,
  SYNC_CODE,
  SYNC_ISLOGGED,
  SYNC_MOVES,
  SYNC_MOVE_ID_SELECTED,
} from './actions';

const initialState = {
  counter: 0,
  pseudo: '',
  email: '',
  password: '',
  passwordVal: '',
  labelBox: '',
  labelMove: '',
  destination_room: '',
  fragile: '',
  heavy: '',
  floor: '',
  date: '',
  address: '',
  nameInventory: '',
  nameItem: '',
  user_id: '',
  code: '',
  isLogged: false,
  boxesByMove: '',
  moves: [],
  moveIdSelected:'',
};


export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SYNC_PSEUDO: {
      console.log('from signin', action)
      return { ...state, pseudo: action.pseudo }; // ...state, pseudo: action.history.pseudo
    }
    case SYNC_MOVES: {
      console.log('from signin moves', action)
      return { ...state, moves: action.moves };
    }
    case SYNC_EMAIL: {
      return { ...state, email: action.email };
    }
    case SYNC_PASSWORD: {
      return { ...state, password: action.password };
    }
    case SYNC_PASSWORDVAL: {
      return { ...state, passwordVal: action.passwordVal };
    }
    case SYNC_LABEL_BOX: {
      return { ...state, labelBox: action.labelBox };
    }
    case SYNC_LABEL_MOVE: {
      return { ...state, labelMove: action.labelMove };
    }
    case SYNC_DESTINATION_ROOM: {
      return { ...state, destination_room: action.destination_room };
    }
    case SYNC_FRAGILE: {
      return { ...state, fragile: action.fragile };
    }
    case SYNC_HEAVY: {
      return { ...state, heavy: action.heavy };
    }
    case SYNC_FLOOR: {
      return { ...state, floor: action.floor };
    }
    case SYNC_DATE: {
      return { ...state, date: action.date };
    }
    case SYNC_ADDRESS: {
      return { ...state, address: action.address };
    }
    case SYNC_NAME_INVENTORY: {
      return { ...state, nameInventory: action.nameInventory };
    }
    case SYNC_NAME_ITEM: {
      return { ...state, nameItem: action.nameItem };
    }
    case SYNC_USER_ID: {
      return { ...state, user_id: action.user_id };
    }
    case SYNC_CODE: {
      return { ...state, code: action.code };
    }
    case SYNC_ISLOGGED: {
      return { ...state, isLogged: action.isLogged };
    }
    case SYNC_MOVE_ID_SELECTED :{
      return { ...state, moveIdSelected: action.moveIdSelected };
    }
    
    case 'INCREMENT': {
      return {
        ...state,
        counter: state.counter + 1,
      };
    }
    default: {
      return state;
    }
  }
};
