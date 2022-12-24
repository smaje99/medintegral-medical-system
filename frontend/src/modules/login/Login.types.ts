import { UserLogin } from '@Types/user/user';

export interface LoginFormViewProps {
    readonly loading: boolean;
    readonly handleLogin: (formData: LoginFormValues) => Promise<void>;
}

export interface LoginFormValues extends UserLogin {
    readonly rememberMe: boolean;
}

export interface RecoverPasswordFormValues {
    readonly email: string;
}

export interface LoginFormActions {
    reset: () => void;
}