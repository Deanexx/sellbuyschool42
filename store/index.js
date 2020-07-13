export const state = () => ({

})

export const mutations = {

}

export const actions = {
  onAuthStateChanged(context,  { authUser, claims }){
    if (!authUser) {
      context.dispatch('auth/logOutUser');
    } else {
      context.dispatch('auth/registerUser', authUser);
    }
  }
}

export const strict = false
