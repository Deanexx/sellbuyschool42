export const state = () => ({
  regBool: false,
  logInBool: false
})

export const mutations = {
  reg(state) {
    state.logInBool = false;
    !state.regBool ? state.regBool = true : state.regBool = false;
  },
  logIn(state) {
    state.regBool = false;
    !state.logInBool ? state.logInBool = true : state.logInBool = false;
  }
}
