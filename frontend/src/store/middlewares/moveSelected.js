import axios from 'axios';

import { SYNC_PSEUDO, SYNC_USER_ID, SYNC_MOVES, SYNC_MOVE_ID_SELECTED } from 'src/store/actions';

const prodURL = 'http://15.236.92.176';

axios.defaults.withCredentials = true; 

export default (store) => (next) => (action) => {
  //console.log('MW Auth');

  switch (action.type) {
    case MOVESLECTED: {
      axios
        .get('http://15.236.92.176:5050/api/move/', )
        .then((res) => {
          console.log("res.data",res.data)
          const { pseudo, id, moves} = res.data;
          console.log("property path1",moves);
          //console.log('pseudo', pseudo);
          //console.log('action history', action);
          if (res.status == 200) {
            //console.log('action', action)
            store.dispatch({ type: SYNC_ISLOGGED, isLogged: true });
            store.dispatch({ type: SYNC_PSEUDO, pseudo });
            store.dispatch({ type: SYNC_USER_ID, user_id: id});
            store.dispatch({ type: SYNC_MOVES, moves});
            store.dispatch(enterMove(action.history));
            //console.log('Authenticated');
            
          }
          else {
            console.error('impossible de se connecter', res);
          }
          
        }).catch((error) => {
          console.log('Error on Authentication', error);
        });

      return;
    }

    default: {
      next(action);
    }
  }
};
