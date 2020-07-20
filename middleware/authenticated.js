export default function (context) {
  if(context.store.state.auth.userToken === null)
    return context.redirect('/');
}
