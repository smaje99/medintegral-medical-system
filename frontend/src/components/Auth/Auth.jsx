import { useSession } from 'next-auth/react';

import { Spinner } from '@Components/loaders';

const Auth = ({ children }) => {
    const { status } = useSession({ required: true });

    if (status === 'loading') {
        return <Spinner />
    }

    return children;
}

export default Auth;