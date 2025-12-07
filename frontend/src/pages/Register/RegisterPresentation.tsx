import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/atoms/card';
import { Input } from '@/components/atoms/input';
import { Button } from '@/components/atoms/button';
import { Label } from '@/components/atoms/label';
import { Alert, AlertDescription } from '@/components/atoms/alert';
import { Mail, Lock, User, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { RegisterPresentationProps } from './types';
import { memo } from 'react';


export const RegisterPresentation = memo(({
    username,
    email,
    password,
    confirmPassword,
    isLoading,
    error,
    usernameError,
    emailError,
    passwordError,
    confirmPasswordError,
    onUsernameChange,
    onEmailChange,
    onPasswordChange,
    onConfirmPasswordChange,
    onUsernameBlur,
    onEmailBlur,
    onPasswordBlur,
    onConfirmPasswordBlur,
    onSubmit,
    onClearError,
}: RegisterPresentationProps) => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-background to-muted p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1 text-center">
                    <div className="flex justify-center mb-4">
                        <p className="text-2xl font-bold">SafeShare</p>
                    </div>
                    <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
                    <CardDescription>
                        Sign up to start sharing files securely
                    </CardDescription>
                </CardHeader>

                <form onSubmit={onSubmit}>
                    <CardContent className="space-y-4">
                        {error && (
                            <Alert variant="destructive">
                                <AlertCircle className="h-4 w-4" />
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}

                        <div className="space-y-2">
                            <Label htmlFor="username">Username</Label>
                            <div className="relative">
                                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="username"
                                    type="text"
                                    placeholder="user name"
                                    value={username}
                                    onChange={(e) => {
                                        onUsernameChange(e.target.value);
                                        if (error) onClearError();
                                    }}
                                    onBlur={onUsernameBlur}
                                    className="pl-10"
                                    required
                                    disabled={isLoading}
                                    minLength={3}
                                    maxLength={20}
                                    pattern="[a-zA-Z0-9_]+"
                                />
                            </div>
                            {usernameError ? (
                                <p className="text-xs text-destructive">{usernameError}</p>
                            ) : (
                                <p className="text-xs text-muted-foreground">
                                    Username must be 3-20 characters long
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="email@example.com"
                                    value={email}
                                    onChange={(e) => {
                                        onEmailChange(e.target.value);
                                        if (error) onClearError();
                                    }}
                                    onBlur={onEmailBlur}
                                    className="pl-10"
                                    required
                                    disabled={isLoading}
                                />
                            </div>
                            {emailError && (
                                <p className="text-xs text-destructive">{emailError}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => {
                                        onPasswordChange(e.target.value);
                                        if (error) onClearError();
                                    }}
                                    onBlur={onPasswordBlur}
                                    className="pl-10"
                                    required
                                    disabled={isLoading}
                                    minLength={8}
                                />
                            </div>
                            {passwordError ? (
                                <p className="text-xs text-destructive">{passwordError}</p>
                            ) : (
                                <p className="text-xs text-muted-foreground">
                                    At least 8 characters with uppercase, lowercase, and numbers
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirm Password</Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    placeholder="••••••••"
                                    value={confirmPassword}
                                    onChange={(e) => {
                                        onConfirmPasswordChange(e.target.value);
                                        if (error) onClearError();
                                    }}
                                    onBlur={onConfirmPasswordBlur}
                                    className="pl-10"
                                    required
                                    disabled={isLoading}
                                />
                            </div>
                            {confirmPasswordError && (
                                <p className="text-xs text-destructive">{confirmPasswordError}</p>
                            )}
                        </div>
                    </CardContent>

                    <CardFooter className="flex mt-4 flex-col space-y-4">
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Creating account...' : 'Create account'}
                        </Button>

                        <div className="text-sm text-center text-muted-foreground">
                            Already have an account?{' '}
                            <Link
                                to="/login"
                                className="text-primary hover:underline font-medium"
                            >
                                Sign in
                            </Link>
                        </div>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
});
