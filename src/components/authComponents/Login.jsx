// components/SignIn.js
'use client';
import { useState } from 'react';
import styles from './auth.module.css';
import Link from 'next/link';

const SignIn = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    rememberMe: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Sign in form submitted:', formData);
    // Add your sign in logic here
  };

  return (
    <div className={styles.container}>

      <div className={styles.content}>
        <div className={styles.formSection}>
          <div className={styles.formCard}>
            <h2 className={styles.title}>Django Volt - Sign IN</h2>
            <p className={styles.subtitle}>Add your credentials</p>
            
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.inputGroup}>
                <label htmlFor="username" className={styles.label}>Username</label>
                <div className={styles.inputWrapper}>
                  <span className={styles.inputIcon}>👤</span>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className={styles.input}
                    required
                  />
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="password" className={styles.label}>Your Password</label>
                <div className={styles.inputWrapper}>
                  <span className={styles.inputIcon}>🔒</span>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={styles.input}
                    required
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.checkboxGroup}>
                  <input
                    type="checkbox"
                    id="rememberMe"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    className={styles.checkbox}
                  />
                  <label htmlFor="rememberMe" className={styles.checkboxLabel}>
                    Remember me
                  </label>
                </div>
                <div className={styles.forgotPassword}>
                  <span className={styles.link}>Lost password?</span>
                </div>
              </div>

              <button type="submit" className={styles.submitButton}>
                Sign IN
              </button>
            </form>

            <div className={styles.switchAuth}>
              Not registered? <Link href='/register' className={styles.link}>Create account</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;