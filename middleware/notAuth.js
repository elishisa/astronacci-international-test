export default function ({ app, redirect }) {
    const token = app.$cookies.get('token')
    if (token) {
        return redirect('/')
    }
    else {
        return redirect('/home')
    }
}