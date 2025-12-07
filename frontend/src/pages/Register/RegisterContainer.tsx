import { memo, useState, type FormEvent } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { RegisterPresentation } from './RegisterPresentation';
import type { RegisterCredentials } from '@/types';
import { isValidPassword, isValidUsername, isValidEmail } from '@/utils/validators';
import type { FormState, FormErrors, TouchedFields } from './types';
import { toast } from 'sonner';



export const RegisterContainer = memo(() => {
    const [form, setForm] = useState<FormState>({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [errors, setErrors] = useState<FormErrors>({
        username: null,
        email: null,
        password: null,
        confirmPassword: null,
    });

    const [touched, setTouched] = useState<TouchedFields>({
        username: false,
        email: false,
        password: false,
        confirmPassword: false,
    });

    const { register, isLoading, error, clearError } = useAuth();

    const updateField = (field: keyof FormState, value: string) => {
        setForm(prev => ({ ...prev, [field]: value }));
        setErrors(prev => ({ ...prev, [field]: null }));
    };

    const validateField = (field: keyof FormState) => {
        let fieldError: string | null = null;

        switch (field) {
            case 'username':
                if (!isValidUsername(form.username)) {
                    fieldError = 'Invalid username format (3-20 chars)';
                }
                break;

            case 'email':
                if (!isValidEmail(form.email)) {
                    fieldError = 'Invalid email format';
                }
                break;

            case 'password':
                const passwordValidation = isValidPassword(form.password);
                if (!passwordValidation.valid) {
                    fieldError = passwordValidation.errors[0];
                }
                break;

            case 'confirmPassword':
                if (form.password !== form.confirmPassword) {
                    fieldError = 'Passwords do not match';
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
            username: null,
            email: null,
            password: null,
            confirmPassword: null,
        };

        if (!isValidUsername(form.username)) {
            newErrors.username = 'Invalid username format (3-20 chars, alphanumeric + underscore)';
        }
        if (!isValidEmail(form.email)) {
            newErrors.email = 'Invalid email format';
        }
        const passwordValidation = isValidPassword(form.password);
        if (!passwordValidation.valid) {
            newErrors.password = passwordValidation.errors[0];
        }

        // Validate password match
        if (form.password !== form.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);

        setTouched({
            username: true,
            email: true,
            password: true,
            confirmPassword: true,
        });

        return !Object.values(newErrors).some(error => error !== null);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const credentials: RegisterCredentials = {
            username: form.username,
            email: form.email,
            password: form.password,
        };

        try {
            await register(credentials);
        } catch (error) {
            toast.error('Registration failed');
        }
    };

    return (
        <RegisterPresentation
            username={form.username}
            email={form.email}
            password={form.password}
            confirmPassword={form.confirmPassword}
            isLoading={isLoading}
            error={error}
            usernameError={touched.username ? errors.username : null}
            emailError={touched.email ? errors.email : null}
            passwordError={touched.password ? errors.password : null}
            confirmPasswordError={touched.confirmPassword ? errors.confirmPassword : null}
            onUsernameChange={(value) => updateField('username', value)}
            onEmailChange={(value) => updateField('email', value)}
            onPasswordChange={(value) => updateField('password', value)}
            onConfirmPasswordChange={(value) => updateField('confirmPassword', value)}
            onUsernameBlur={() => handleBlur('username')}
            onEmailBlur={() => handleBlur('email')}
            onPasswordBlur={() => handleBlur('password')}
            onConfirmPasswordBlur={() => handleBlur('confirmPassword')}
            onSubmit={handleSubmit}
            onClearError={clearError}
        />
    );
});
