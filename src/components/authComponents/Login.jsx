// components/SignIn.js
'use client';
import { useState } from 'react';
import styles from './auth.module.css';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
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

  const router = useRouter();

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/users/login`, {

      email: formData.email,
      password: formData.password
    });
    // Handle the response
    if (response.status === 200) {
      alert("Login successful!");

      // Set the token in a cookie
        const expirationTime = new Date();
        expirationTime.setTime(expirationTime.getTime() + (30 * 60 * 1000)); // 30 minutes in milliseconds
      
        document.cookie = `token=${response.data.token}; path=/; expires=${expirationTime.toUTCString()};`;
      
      // Store token or user info if needed
      // localStorage.setItem("token", response.data.token); // if you send one


      // Redirect to the home page
      router.push("/"); // or wherever you want to redirect after login
    }
  } catch (error) {
    console.error("Login error:", error);
    if (error.response?.data?.message) {
      alert(error.response.data.message);
    } else {
      alert("Login failed. Please try again.");
    }
  }
};

  return (
    <div className={styles.container}>

      <div className={styles.content}>
        <div className={styles.formSection}>
          <div className={styles.formCard}>
            <h2 className={styles.title}> Sign IN</h2>
            <p className={styles.subtitle}>Add your credentials</p>
            
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.inputGroup}>
                <label htmlFor="email" className={styles.label}>Email</label>
                <div className={styles.inputWrapper}>
                  <span className={styles.inputIcon}>👤</span>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
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