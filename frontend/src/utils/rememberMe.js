export const getLocalRememberMe = () => (
    JSON.parse(localStorage.getItem('remember-me'))
)

export const saveLocalRememberMe = (rememberMe) => {
    localStorage.setItem('remember-me', rememberMe)
}