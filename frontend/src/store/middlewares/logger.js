export default (store) => (next) => (action) => {
  switch (action.type) {
    default: {
      console.log('Action dispatch :', action.type);
      next(action);
    }
  }
};
