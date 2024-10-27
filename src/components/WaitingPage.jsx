import React from 'react';
import styles from './WaitingPage.module.css';

const WaitingPage = () => {
    return (
        <div className={styles.waitingContainer}>
            <div className={styles.waitingContent}>
                <h2 className={styles.waitingTitle}>Đang kết nối...</h2>
                <p className={styles.waitingText}>Vui lòng đợi trong khi chúng tôi thiết lập kết nối.</p>
                <div className={styles.spinner}></div>
            </div>
        </div>
    );
};

export default WaitingPage;
