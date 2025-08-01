import { useRouter } from 'next/navigation';
import React from 'react'
import useAuthStore from '../../../store/store';

function Header() {
   const router = useRouter();
   const { username } = useAuthStore()
  //  console.log(username,"username from header")
  const handleLogout = () => {
    const confirmed = window.confirm("Are you sure you want to logout ?");
    // console.log(confirmed,"confirmed")
    if(confirmed){
      // Remove the token cookie
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
    
    // Update state
    // setIsLoggedIn(false);
    
    // Redirect to home or login page
    router.refresh('/');
    }
    
    // Optional: You can also make an API call to logout on the server
    // fetch('/api/logout', { method: 'POST' });
  };
  return (
   <header className="header">
          <div className="header-container">
            <div className="search-container">
              <svg
                className="search-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              <input type="text" className="search-input" placeholder="Search" />
            </div>

            <div className="header-actions">
              <button className="notification-button">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                  <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                </svg>
              </button>
              <div className="user-profile">
                <div className="avatar">{(username.charAt(0)).toUpperCase()}</div>
                <span className="username">Current User: {username}</span>
              </div>
              <button 
              onClick={handleLogout} className='btn'>Logout</button>
            </div>
          </div>
    </header>
  )
}

export default Header
