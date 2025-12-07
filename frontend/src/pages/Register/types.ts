import type { FormEvent } from "react";

export interface FormState {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface FormErrors {
    username: string | null;
    email: string | null;
    password: string | null;
    confirmPassword: string | null;
}

export interface TouchedFields {
    username: boolean;
    email: boolean;
    password: boolean;
    confirmPassword: boolean;
}

export interface RegisterPresentationProps {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    isLoading: boolean;
    error: string | null;
    usernameError: string | null;
    emailError: string | null;
    passwordError: string | null;
    confirmPasswordError: string | null;
    onUsernameChange: (username: string) => void;
    onEmailChange: (email: string) => void;
    onPasswordChange: (password: string) => void;
    onConfirmPasswordChange: (password: string) => void;
    onUsernameBlur: () => void;
    onEmailBlur: () => void;
    onPasswordBlur: () => void;
    onConfirmPasswordBlur: () => void;
    onSubmit: (e: FormEvent) => void;
    onClearError: () => void;
}
