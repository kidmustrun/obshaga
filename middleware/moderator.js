export default function ({ store, redirect }) {
  if (!store.moderator) {
    return redirect('/auth')
  }
}
