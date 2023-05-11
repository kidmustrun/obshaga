export default function ({ store, redirect }) {
  if (!store.admin) {
    return redirect('/auth')
  }
}
