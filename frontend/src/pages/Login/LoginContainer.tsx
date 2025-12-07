import { useCallback, useState, type FormEvent } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { LoginPresentation } from './LoginPresentation';
import type { LoginCredentials } from '@/types';

export const LoginContainer = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const { login, isLoading, error, clearError } = useAuth();

    const handleSubmit = useCallback(async (e: FormEvent) => {
        e.preventDefault();

        const credentials: LoginCredentials = {
            email,
            password,
        };
        try {
            await login(credentials);
        } catch (error) {
            console.error('Login failed:', error);
        }
    }, [email, password, login]);

    return (
        <LoginPresentation
            email={email}
            password={password}
            isLoading={isLoading}
            error={error}
            onEmailChange={setEmail}
            onPasswordChange={setPassword}
            onSubmit={handleSubmit}
            onClearError={clearError}
        />
    );
};
