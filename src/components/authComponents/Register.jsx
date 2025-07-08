"use client";
// components/SignUp.js
import { useState } from 'react';
import styles from './auth.module.css';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });

  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log('Sign up form submitted:', formData);
  //   // Add your sign up logic here
  // };
const handleSubmit = async (e) => {
  e.preventDefault();

  if (formData.password !== formData.confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  try {
    const response = await axios.post("http://localhost:4000/api/users/register", {
      name: formData.username,
      email: formData.email,
      password: formData.password
    });

    if (response.status === 201) {
      alert("User registered successfully!");
      // Optionally reset form or redirect
    router.push('/login')
    }
    
  } catch (error) {
    console.error("Registration error:", error);
    if (error.response && error.response.data && error.response.data.message) {
      alert(error.response.data.message);
    } else {
      alert("Something went wrong. Please try again.");
    }
  }
};



  return (
    <div className={styles.container}>
      
      <div className={styles.content}>
        <div className={styles.formSection}>
          <div className={styles.formCard}>
            <h2 className={styles.title}>Django Volt - Sign UP</h2>
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
                <label htmlFor="email" className={styles.label}>Your Email</label>
                <div className={styles.inputWrapper}>
                  <span className={styles.inputIcon}>✉️</span>
                  <input
                    type="email"
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

              <div className={styles.inputGroup}>
                <label htmlFor="confirmPassword" className={styles.label}>Password Confirmation</label>
                <div className={styles.inputWrapper}>
                  <span className={styles.inputIcon}>🔒</span>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Password check"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={styles.input}
                    required
                  />
                </div>
              </div>

              <div className={styles.checkboxGroup}>
                <input
                  type="checkbox"
                  id="agreeTerms"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleInputChange}
                  className={styles.checkbox}
                  required
                />
                <label htmlFor="agreeTerms" className={styles.checkboxLabel}>
                  I agree to the <span className={styles.link}>terms and conditions</span>
                </label>
              </div>

              <button type="submit" className={styles.submitButton}>
                Sign UP
              </button>
            </form>

            <div className={styles.switchAuth}>
              Already have an account? <Link href="/login" className={styles.link}>Sign IN</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;