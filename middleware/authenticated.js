export default function ({store, redirect}) {
  if(store.state.auth.userToken === null)
    return redirect('/');
}
