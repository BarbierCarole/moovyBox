// export const SYNC_LABEL_BOX = 'actions/SYNC_LABEL_BOX';
// export const SYNC_LABEL_MOVE = 'actions/SYNC_LABEL_MOVE';
// export const SYNC_DESTINATION_ROOM = 'actions/SYNC_DESTINATION_ROOM';
// export const SYNC_FRAGILE = 'actions/SYNC_FRAGILE';
// export const SYNC_HEAVY = 'actions/SYNC_HEAVY';
// export const SYNC_FLOOR = 'actions/SYNC_FLOOR';
// export const SYNC_DATE = 'actions/SYNC_DATE';
// export const SYNC_ADDRESS = 'actions/SYNC_ADDRESS';
// export const SYNC_NAME_INVENTORY = 'actions/SYNC_NAME_INVENTORY';
// export const SYNC_NAME_ITEM = 'actions/SYNC_NAME_ITEM';
// export const SYNC_CODE = 'actions/SYNC_CODE';
export const ENTER_MOVE = 'actions/ENTER_MOVE';
export const LOGIN = 'actions/LOGIN';
export const TO_SIGNIN = 'action/TO_SIGNIN'
export const SYNC_PSEUDO = 'actions/SYNC_PSEUDO';
export const SYNC_EMAIL = 'actions/SYNC_EMAIL';
export const SYNC_PASSWORD = 'actions/SYNC_PASSWORD';
export const SYNC_PASSWORDVAL = 'actions/SYNC_PASSWORDVAL';
export const SYNC_OLDPASSWORD = 'actions/SYNC_OLDPASSWORD';
export const SYNC_NEWPASSWORD = 'actions/SYNC_NEWPASSWORD';
export const SYNC_USER_ID = 'actions/SYNC_USER_ID';
export const SYNC_ISLOGGED = 'actions/SYNC_ISLOGGED';
export const SYNC_MOVES = 'actions/SYNC_MOVES';
export const SYNC_MOVE_ID_SELECTED = 'actions/SYNC_MOVE_ID_SELECTED';
export const SIGNUP = 'action/SIGNUP';
export const login = (history) => ({ type: LOGIN, history });
export const signup = (history) => ({ type: SIGNUP, history});
export const toSignin = (history) => ({ type: TO_SIGNIN, history})
export const enterMove = (history) => ({ type: ENTER_MOVE, history });
export const syncPseudo = (history) => ({ type: SYNC_PSEUDO, history });
export const syncMoves = (history) => ({ type: SYNC_MOVES, history });
export const syncMoveIdSelected = (history) => ({ type : SYNC_MOVE_ID_SELECTED, history});

