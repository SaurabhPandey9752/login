import React, { useState, useEffect } from 'react';
import { FaGoogle, FaFacebookF, FaPiggyBank, FaTrophy, FaFire } from 'react-icons/fa';

import { motion } from 'framer-motion';
import styles from './AuthPage.module.css';
import ForgotPassword from './ForgotPassword';
import CounterSection from './CounterSection'; // Import CounterSection component

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);

  const content = [
    {
      title: 'Create a resume you are proud of',
      items: [
        { icon: <FaPiggyBank className={styles.featureIcon} />, text: 'Save time with hassle-free templates.' },
        { icon: <FaTrophy className={styles.featureIcon} />, text: 'Beat the competition using actionable, contextual advice.' },
        { icon: <FaFire className={styles.featureIcon} />, text: 'Highlight key achievements with memorable visuals.' },
        { text: 'Get inspired by 200+ resume examples and templates.' }
      ]
    },
    {
      title: 'Resume Image',
      image: "/es.png",
      description: 'Showcase your skills and experience with a professionally designed resume.'
    },
    {
      title: 'Success Rate',
      description: 'Achieve a high success rate with personalized resume advice and industry insights.',
      isCounterSection: true // Flag to indicate this slide contains the CounterSection
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIndex((prevIndex) => (prevIndex + 1) % content.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [content.length]);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const openForgotPassword = () => {
    setShowForgotPassword(true);
  };

  const closeForgotPassword = () => {
    setShowForgotPassword(false);
  };

  const currentContent = content[carouselIndex];

  return (
    <div className={styles.authPage}>
      <div className={styles.leftSection}>
        <div className={styles.authContainer}>
          {isLogin ? (
            <div className={styles.authOptions}>
              <h2>Login</h2>
              <form>
                <input type="email" placeholder="Email" />
                <input type="password" placeholder="Password" />
                <div className={styles.extraOptions}>
                  <label>
                    <input type="checkbox" /> Remember Me
                  </label>
                  <span className={styles.forgotPassword} onClick={openForgotPassword}>
                    Forgot Password?
                  </span>
                </div>
                <button type="submit">Login</button>
              </form>
              <p>
                Don't have an account? <span onClick={toggleForm} className={styles.toggleLink}>Sign Up</span>
              </p>
            </div>
          ) : (
            <div className={styles.authOptions}>
              <h2>Sign Up</h2>
              <form>
                <input type="text" placeholder="Name" />
                <input type="email" placeholder="Email" />
                <input type="password" placeholder="Password" />
                <input type="password" placeholder="Confirm Password" />
                <div className={styles.checkboxContainer}>
                  <label>
                    <input type="checkbox" /> I agree to the <a href="#terms">Terms and Services</a>
                  </label>
                  {/* <label>
                    <input type="checkbox" /> Email me tailored resume advice and updates
                  </label> */}
                </div>
                <button type="submit">Sign Up</button>
              </form>
              <p>
                Already have an account? <span onClick={toggleForm} className={styles.toggleLink}>Login</span>
              </p>
            </div>
          )}
          {/* <div className={styles.socialLogin}>
            <p>Or continue with</p>
            <div className={styles.socialButtons}>
              <div className={styles.iconButton}>
                <FaGoogle />
              </div>
              <div className={styles.iconButton}>
                <FaFacebookF />
              </div>
            </div>
          </div> */}
        </div>
      </div>
      <div className={styles.rightSection}>
        <div className={styles.infoContainer}>
          <h2>{currentContent.title}</h2>
          {currentContent.items ? (
            <motion.div 
              className={styles.featureList} 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ duration: 0.5 }}
            >
              {currentContent.items.map((item, index) => (
                <div key={index} className={styles.featureItem}>
                  {item.icon && item.icon}
                  <p>{item.text}</p>
                </div>
              ))}
            </motion.div>
          ) : currentContent.image ? (
            <motion.div 
              className={styles.resumeImageContainer} 
              initial={{ opacity: 0, y: 50 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.5 }}
            >
              <img src={currentContent.image} alt="Resume" className={styles.resumeImage} />
              <motion.p 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.5, delay: 0.5 }}
                className={styles.resumeDescription}
              >
                {currentContent.description}
              </motion.p>
            </motion.div>
          ) : currentContent.isCounterSection ? (
            <CounterSection /> // Render CounterSection for the third slide
          ) : (
            <motion.div 
              className={styles.resumeImageContainer} 
              initial={{ opacity: 0, y: 50 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.5 }}
            >
              <motion.p 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.5 }}
                className={styles.resumeDescription}
              >
                {currentContent.description}
              </motion.p>
            </motion.div>
          )}
          <div className={styles.carouselIndicators}>
            {content.map((_, index) => (
              <div 
                key={index} 
                className={`${styles.carouselIndicator} ${index === carouselIndex ? styles.activeIndicator : ''}`} 
              />
            ))}
          </div>
        </div>
      </div>

      {showForgotPassword && <ForgotPassword onClose={closeForgotPassword} />}
    </div>
  );
};

export default AuthPage;
