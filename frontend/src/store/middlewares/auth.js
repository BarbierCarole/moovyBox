import axios from 'axios';
import { toast } from 'react-toastify';
import { LOGIN, toSignin, SIGNUP, SYNC_PSEUDO, SYNC_ISLOGGED, SYNC_USER_ID, enterMove,SYNC_MOVES } from 'src/store/actions';

const BASE_URL = process.env.REACT_APP_BASE_URL;
axios.defaults.withCredentials = true;

toast.configure();

export default (store) => (next) => (action) => {

  const successAuth = () => {
    // toast is an alert in the dom
    toast.success('Authentification réussie !!!', {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 3000,
      closeOnClick: true
    })
  }

  const errorAuth = () => {
    
    toast.error("Email déjà existant ou Email ou mot de passe incorrect", {
    position: toast.POSITION.BOTTOM_RIGHT,
    autoClose: 3000,
    closeOnClick: true
    });    
  }

  switch (action.type) {
    case LOGIN: {
      axios
        .post(BASE_URL+'/api/signin', {
          email: store.getState().email,
          password: store.getState().password,
        })
        .then((res) => {
          // console.log("res.data",res.data)
          const { pseudo, id, moves} = res.data;
          //console.log('pseudo', pseudo);
          //console.log('action history', action);
          if (res.status == 200) {
            //console.log('action', action)
            store.dispatch({ type: SYNC_ISLOGGED, isLogged: true });
            store.dispatch({ type: SYNC_PSEUDO, pseudo });
            store.dispatch({ type: SYNC_USER_ID, user_id: id});
            store.dispatch({ type: SYNC_MOVES, moves});
            store.dispatch(enterMove(action.history));
            console.log('auth.js-LOGIN : Authenticated !');
            successAuth();
          }
          if(res.status == 400) {
            store.dispatch(errorAuth());
            console.error('impossible de se connecter', res);
            errorAuth();
          }
        }).catch((error) => {
          console.log('Error on Authentication ...', error);
          errorAuth();
          // store.dispatch(errorAuth());
        });

      return;
    };
    case SIGNUP: {
      axios
        .post(BASE_URL+`/api/signup`, {
          email: store.getState().email,
          password: store.getState().password,
          pseudo: store.getState().pseudo,
          
        })
        .then(res => {
          const { pseudo, id, moves} = res.data;
          console.log("status :", res.status)
          if (res.status == 201) {
            store.dispatch({ type: SYNC_PSEUDO, pseudo });
            store.dispatch({ type: SYNC_USER_ID, user_id: id});
            store.dispatch({ type: SYNC_MOVES, moves});
            store.dispatch(toSignin(action.history));
          }
          if(res.status == 400) {
            store.dispatch(errorAuth());
            // console.error('impossible de se connecter', res);
            const error = res.status;
            errorAuth(error);
          }
          if(res.status == 409) {
            store.dispatch(errorAuth());
            // console.error('Cet email semble déjà exister', res);
            const error = res.status;
            errorAuth(error);
          }

        }).catch((error) => {
          console.log('Error on Authentication', error);
          errorAuth();
        });

      return;
      };
    default: {
      next(action);
    }
  }
};

