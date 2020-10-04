import axios from 'axios';
import { toast } from 'react-toastify';
import { LOGIN, toSignin, SIGNUP, TO_SIGNIN, SYNC_PSEUDO, SYNC_PASSWORD, SYNC_ISLOGGED, SYNC_USER_ID, enterMove,SYNC_MOVES } from 'src/store/actions';

// const prodURL = 'http://18.206.96.118';

axios.defaults.withCredentials = true;

toast.configure();

export default (store) => (next) => (action) => {

  const successAuth = () => {
    toast.success('Authentification réussi !', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 5000,
      closeOnClick: true
    })
  }

  const errorAuth = () => {
    toast.error('Email ou mot de passe incorrect !', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 5000,
      closeOnClick: true
    })
  }

  // const successSignup = () => {
  //   toast.success('Votre compte a été créé avec succès !', {
  //     position: toast.POSITION.TOP_CENTER,
  //     autoClose: 5000,
  //     closeOnClick: true
  //   })
  // }

  // const errorSignup = () => {
  //   toast.error('Une erreur est survenue. Veuillez réessayer !', {
  //     position: toast.POSITION.TOP_CENTER,
  //     autoClose: 5000,
  //     closeOnClick: true
  //   })
  // }
  //console.log('MW Auth');

  switch (action.type) {
    case LOGIN: {
      axios
        .post('http://15.236.92.176:5050/api/signin', {
          email: store.getState().email,
          password: store.getState().password,
        })
        .then((res) => {
          console.log("res.data",res.data)
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
            //console.log('Authenticated');
            successAuth();
          }
          if(res.status == 400) {
            store.dispatch(errorAuth());
            console.error('impossible de se connecter', res);
          }

        }).catch((error) => {
          console.log('Error on Authentication', error);
          // store.dispatch(errorAuth());
        });

      return;
    };
    case SIGNUP: {
      axios
        .post(`http://15.236.92.176:5050/api/signup`, {
          email: store.getState().email,
          password: store.getState().password,
          pseudo: store.getState().pseudo
        })
        .then(res => {
          const { pseudo, id, moves} = res.data;
          console.log("status :", res.status)
          if (res.status == 201) {
            // dispatch(login(history));

            store.dispatch({ type: SYNC_PSEUDO, pseudo });
            store.dispatch({ type: SYNC_USER_ID, user_id: id});
            store.dispatch({ type: SYNC_MOVES, moves});
            store.dispatch(toSignin(action.history));
            // store.dispatch(successSignup());
          }
          else {
            console.error('impossible de se connecter', res);
          }

        }).catch((error) => {
          console.log('Error on Authentication', error);
          // store.dispatch(errorSignup());
        });

      return;
      };
    default: {
      next(action);
    }
  }
};

