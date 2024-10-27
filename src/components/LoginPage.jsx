import React, { useState } from 'react';
import styles from './LoginPage.module.css';
import logoImage from '../assets/logo.jpg'; // Make sure to add your logo image to the assets folder

const LoginPage = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulating an API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (username === 'ku' && password === 'khanhhoang') {
            onLogin('user');
        } else if (username === 'phangiadaizxc@gmail.com' && password === 'Phang1ada!') {
            onLogin('admin');
        } else {
            alert('Invalid credentials');
        }

        setIsLoading(false);
    };

    return (
        <div className={styles.loginContainer}>
            <div className={styles.loginForm}>
                <div className={styles.logoContainer}>
                    <img src={logoImage} alt="Logo" className={styles.logo} />
                </div>
                <h2 className={styles.loginTitle}>Chú chào cháu</h2>
                <form onSubmit={handleSubmit}>
                    <div className={styles.inputGroup}>
                        <input
                            className={styles.inputField}
                            type="text"
                            placeholder="Tên đăng nhập"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <input
                            className={styles.inputField}
                            type="password"
                            placeholder="Mật khẩu"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button className={styles.loginButton} type="submit" disabled={isLoading}>
                        {isLoading ? (
                            <>
                                <span className={styles.loadingSpinner}></span>
                                Đang đăng nhập...
                            </>
                        ) : (
                            'Đăng nhập'
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
