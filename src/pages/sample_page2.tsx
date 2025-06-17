import React from 'react';
import {
    Button,
    Input,
    Card,
} from '@ketan_nimase/ui';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const SamplePage2: React.FC = () => {
    const [activeTab, setActiveTab] = React.useState<'signin' | 'signup'>('signin');
    const [error, setError] = React.useState<string | null>(null);
    const navigate = useNavigate();

    const { register: registerSignIn, handleSubmit: handleSignInSubmit } = useForm();
    const { register: registerSignUp, handleSubmit: handleSignUpSubmit } = useForm();

    const onSignIn = (data: any) => {
        // Implement your sign in logic here
        console.log('Sign in:', data);
        setError(null);
    };

    const onSignUp = (data: any) => {
        // Implement your sign up logic here
        console.log('Sign up:', data);
        setError(null);
    };

    return (
        <div className="min-h-screen w-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900">
                        Welcome
                    </h2>
                    <div className="mt-4 flex justify-center space-x-4">
                        <Button
                            style={activeTab === 'signin' ? 'filled' : 'transparent'}
                            colorVariant="primary"
                            onClick={() => setActiveTab('signin')}
                        >
                            Sign In
                        </Button>
                        <Button
                            style={activeTab === 'signup' ? 'filled' : 'transparent'}
                            colorVariant="primary"
                            onClick={() => setActiveTab('signup')}
                        >
                            Create Account
                        </Button>
                    </div>
                </div>

                <Card>
                    {activeTab === 'signin' ? (
                        <form onSubmit={handleSignInSubmit(onSignIn)} className="space-y-6">
                            <div>
                                <Input
                                    placeholder="Username or Email"
                                    name="username"
                                    {...registerSignIn('username', { required: true })}
                                />
                            </div>
                            <div>
                                <Input
                                    inputType="password"
                                    placeholder="Password"
                                    name="password"
                                    {...registerSignIn('password', { required: true })}
                                />
                            </div>
                            <div>
                                <Button
                                    style="filled"
                                    colorVariant="primary"
                                    type="submit"
                                    className="w-full"
                                >
                                    Sign In
                                </Button>
                            </div>
                        </form>
                    ) : (
                        <form onSubmit={handleSignUpSubmit(onSignUp)} className="space-y-6">
                            <div>
                                <Input
                                    placeholder="First Name"
                                    name="firstName"
                                    {...registerSignUp('firstName', { required: true })}
                                />
                            </div>
                            <div>
                                <Input
                                    placeholder="Last Name"
                                    name="lastName"
                                    {...registerSignUp('lastName', { required: true })}
                                />
                            </div>
                            <div>
                                <Input
                                    placeholder="Email"
                                    name="email"
                                    inputType="email"
                                    {...registerSignUp('email', { required: true })}
                                />
                            </div>
                            <div>
                                <Input
                                    inputType="password"
                                    placeholder="Password"
                                    name="password"
                                    {...registerSignUp('password', { required: true })}
                                />
                            </div>
                            <div>
                                <Input
                                    inputType="password"
                                    placeholder="Confirm Password"
                                    name="confirmPassword"
                                    {...registerSignUp('confirmPassword', { required: true })}
                                />
                            </div>
                            <div>
                                <Button
                                    style="filled"
                                    colorVariant="primary"
                                    type="submit"
                                    className="w-full"
                                    onClick={() => alert('Account created successfully!')}
                                >
                                    Create Account
                                </Button>
                            </div>
                        </form>
                    )}
                </Card>

                {error && (
                    <div className="text-red-500">{error}</div>
                )}
            </div>
        </div>
    );
};

export default SamplePage2;