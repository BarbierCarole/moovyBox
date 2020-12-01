export default (store) => (next) => (action) => {
  switch (action.type) {
    default: {
      console.log('CB 30/11 : ACTION:', action.type);
      next(action);
    }
  }
};
