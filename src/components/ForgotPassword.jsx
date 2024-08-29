import React, { useState } from 'react';
import styles from './ForgotPassword.module.css';
import { MdClose } from 'react-icons/md';

const ForgotPassword = ({ onClose }) => {
  const [email, setEmail] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSendOtp = () => {
    // Handle OTP sending logic here
    alert(`OTP sent to ${email}`);
  };

  return (
    <div className={styles.popupOverlay}>
      <div className={styles.popupContent}>
        <div className={styles.popupHeader}>
          <h2>Forgot Password</h2>
          <MdClose className={styles.closeIcon} onClick={onClose} />
        </div>
        <form>
          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={handleEmailChange}
            required
          />
          <button type="button" onClick={handleSendOtp}>Send OTP</button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
