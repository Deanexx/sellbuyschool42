export const state = () => ({
  user: null,
  userToken: null
})

export const mutations = {
  setUserState(state, authUser){
    state.user = authUser;
  },
    setUserToken(state, token){
    state.userToken = token;
  },
  deleteUserState(state){
    state.user = null;
  },
  deleteUserToken(state){
    state.userToken = null
  }
}

export const actions = {
  registerUser(context, data){
    context.commit('setUserState', data);
    context.commit('setUserToken', data.uid);
  },
  logOutUser(context){
    context.commit('deleteUserState');
    context.commit('deleteUserToken');
  }
}
