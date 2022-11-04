import useAuth from '@Auth/useAuth';
import { HomeProtected, HomePublic } from '@Modules/home'

const Route = () => {
    const { isLoggedIn } = useAuth();

    return isLoggedIn()
        ? <HomeProtected />
        : <HomePublic />
}

export default Route;