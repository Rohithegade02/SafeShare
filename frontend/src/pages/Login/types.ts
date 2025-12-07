import type { FormEvent } from "react";

export interface LoginPresentationProps {
    email: string;
    password: string;
    isLoading: boolean;
    error: string | null;
    onEmailChange: (email: string) => void;
    onPasswordChange: (password: string) => void;
    onSubmit: (e: FormEvent) => void;
    onClearError: () => void;
}
