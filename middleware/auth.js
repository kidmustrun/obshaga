import Cookies from 'js-cookie'
export default function ({ store, redirect }) {
  const token = Cookies.get('token')
  if (!store.auth && !token) {
    return redirect('/auth')
  }
}
