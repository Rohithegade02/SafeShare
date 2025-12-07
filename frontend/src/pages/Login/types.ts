import type { FormEvent } from "react";

export interface FormState {
    email: string;
    password: string;
}

export interface FormErrors {
    email: string | null;
    password: string | null;
}

export interface TouchedFields {
    email: boolean;
    password: boolean;
}

export interface LoginPresentationProps {
    email: string;
    password: string;
    isLoading: boolean;
    error: string | null;
    emailError: string | null;
    passwordError: string | null;
    onEmailChange: (email: string) => void;
    onPasswordChange: (password: string) => void;
    onEmailBlur: () => void;
    onPasswordBlur: () => void;
    onSubmit: (e: FormEvent) => void;
    onClearError: () => void;
}
