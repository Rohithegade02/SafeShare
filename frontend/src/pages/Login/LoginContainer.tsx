import { memo, useState, type FormEvent } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { LoginPresentation } from './LoginPresentation';
import type { LoginCredentials } from '@/types';
import { isValidEmail } from '@/utils/validators';
import type { FormState, FormErrors, TouchedFields } from './types';
import { toast } from 'sonner';

export const LoginContainer = memo(() => {
    const [form, setForm] = useState<FormState>({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState<FormErrors>({
        email: null,
        password: null,
    });

    const [touched, setTouched] = useState<TouchedFields>({
        email: false,
        password: false,
    });

    const { login, isLoading, error, clearError } = useAuth();

    const updateField = (field: keyof FormState, value: string) => {
        setForm(prev => ({ ...prev, [field]: value }));
        setErrors(prev => ({ ...prev, [field]: null }));
    };

    const validateField = (field: keyof FormState) => {
        let fieldError: string | null = null;

        switch (field) {
            case 'email':
                if (!isValidEmail(form.email)) {
                    fieldError = 'Invalid email format';
                }
                break;

            case 'password':
                if (form.password.length === 0) {
                    fieldError = 'Password is required';
                } else if (form.password.length < 8) {
                    fieldError = 'Password must be at least 8 characters';
                }
                break;
        }

        setErrors(prev => ({ ...prev, [field]: fieldError }));
    };

    const handleBlur = (field: keyof FormState) => {
        setTouched(prev => ({ ...prev, [field]: true }));
        validateField(field);
    };

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {
            email: null,
            password: null,
        };

        if (!isValidEmail(form.email)) {
            newErrors.email = 'Invalid email format';
        }

        if (form.password.length === 0) {
            newErrors.password = 'Password is required';
        } else if (form.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        }

        setErrors(newErrors);

        setTouched({
            email: true,
            password: true,
        });

        return !Object.values(newErrors).some(error => error !== null);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const credentials: LoginCredentials = {
            email: form.email,
            password: form.password,
        };

        try {
            await login(credentials);
        } catch (error) {
            toast.error('Login failed');
        }
    };

    return (
        <LoginPresentation
            email={form.email}
            password={form.password}
            isLoading={isLoading}
            error={error}
            emailError={touched.email ? errors.email : null}
            passwordError={touched.password ? errors.password : null}
            onEmailChange={(value) => updateField('email', value)}
            onPasswordChange={(value) => updateField('password', value)}
            onEmailBlur={() => handleBlur('email')}
            onPasswordBlur={() => handleBlur('password')}
            onSubmit={handleSubmit}
            onClearError={clearError}
        />
    );
});

LoginContainer.displayName = 'LoginContainer';
