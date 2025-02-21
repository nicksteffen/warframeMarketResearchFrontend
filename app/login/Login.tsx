'use client'; // Mark this as a Client Component

import { useState } from 'react';
import { useRouter, useSearchParams} from 'next/navigation';
import { Container, Typography, TextField, Button, Box, Link } from '@mui/material';
import Cookies from 'js-cookie';

// Define the form data interface
interface FormData {
  email: string;
  username: string;
  password: string;
}


interface LoginResponse {
    access_token: string;
    token_type: string;
}

export default function Login() {
    const signUpText = "Don't have an account? Sign up here.";
    const router = useRouter();
    const [formData, setFormData] = useState<FormData>({
        email: '',
        username: '',
        password: '',
    });
    const searchParams = useSearchParams();
    const redirect = searchParams.get('redirect') || '/';
    console.log(redirect);
    const [error, setError] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');

        // Basic validation
        if ((!formData.email || !formData.username) || !formData.password) {
        setError('All fields are required.');
        return;
        }

        try {
        const response = await fetch(`api/user/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });


        if (response.ok) {
            // // const { access_token } = response.data;
            const data: LoginResponse = await response.json();
            const { access_token } = data;
            // console.log("access token");
            // console.log(access_token);
            // todo re-enable redirect after debug
            // Redirect to the dashboard or home page after successful login
            Cookies.set('token', access_token); // Store token in cookies
            router.push(redirect || '/');
        } else {
            const data = await response.json();
            setError(data.message || 'Login failed. Please try again.');
        }
        } catch (err) {
        setError('An error occurred. Please try again.');
        console.log(err);
        }
    };

    return (
        <Container maxWidth="sm">
        <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography component="h1" variant="h5">
            Sign In
            </Typography>
            {error && (
            <Typography color="error" sx={{ mt: 2 }}>
                {error}
            </Typography>
            )}
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={formData.email}
                onChange={handleChange}
            />
            OR
            <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                value={formData.username}
                onChange={handleChange}
            />

            <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={formData.password}
                onChange={handleChange}
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Sign In
            </Button>
            <Box sx={{ textAlign: 'center' }}>
                <Link href="/register" variant="body2">
                {signUpText}
                </Link>
            </Box>
            </Box>
        </Box>
        </Container>
    );
}