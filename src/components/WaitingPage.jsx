import React from 'react';
import styles from './WaitingPage.module.css';

const WaitingPage = () => {
    return (
        <div className={styles.waitingContainer}>
            <div className={styles.waitingContent}>
                <h2 className={styles.waitingTitle}>Hello ku</h2>
                <p className={styles.waitingText}>Chúc em nhiều sức khỏe nheee</p>
                <div className={styles.spinner}></div>
            </div>
        </div>
    );
};

export default WaitingPage;
