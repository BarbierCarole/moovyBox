import { ENTER_MOVE, TO_SIGNIN } from '../actions';


export default (store) => (next) => (action) => {
  switch (action.type) {
    case ENTER_MOVE: {
      action.history.push('/move'); // sert à traiter les liens
      console.log('ENTER_MOVE : routes.js -> ok');
      break;
    }
    
    case TO_SIGNIN: {
      action.history.push('/signin'); // sert à traiter les liens
      console.log('TO_SIGNIN : routes.js -> ok');
      break;
    }
    // case BOXES_BY_MOVE: {
    //   action.history.push('/move/'+SYNC_MOVE_ID_SELECTED); // sert à traiter les liens
    //   console.log('routes.js -> ok*********',SYNC_MOVE_ID_SELECTED);
    //   break;
    // }
    
    default: {
      console.log('routes.js default-> ok');
      // Si le middleware n'est pas intéressé par l'action reçue,
      // alors il laisse filer l'action vers la suite de son voyage.
      next(action);
    }
  }
};
