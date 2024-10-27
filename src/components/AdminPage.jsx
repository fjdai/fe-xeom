import React, { useState, useEffect } from 'react';
import styles from './AdminPage.module.css';

const AdminPage = ({ onLogout }) => {
    const [reviews, setReviews] = useState([]);
    const [displayedReviews, setDisplayedReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const url = "https://be-xeom.onrender.com/api/v1/user";

    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = async () => {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Failed to fetch reviews');
            }
            const data = await response.json();
            const sortedReviews = data.sort((a, b) => new Date(b.date) - new Date(a.date));
            setReviews(sortedReviews);
            setDisplayedReviews(sortedReviews.slice(0, 10));
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    const loadMoreReviews = () => {
        const currentLength = displayedReviews.length;
        const newReviews = reviews.slice(currentLength, currentLength + 10);
        setDisplayedReviews([...displayedReviews, ...newReviews]);
    };

    if (loading) return <div className={styles.loading}><div className={styles.spinner}></div>Đang tải...</div>;
    if (error) return <div className={styles.error}>{error}</div>;

    return (
        <div className={styles.adminContainer}>
            <div className={styles.adminContent}>
                <button className={styles.logoutButton} onClick={onLogout}>
                    <span className={styles.logoutIcon}>🚪</span>
                    <span className={styles.logoutText}>Đăng Xuất</span>
                </button>
                <h2 className={styles.adminTitle}>Bảng Điều Khiển Admin</h2>
                <p className={styles.welcomeText}>Chào mừng đến trang quản trị!</p>
                <div className={styles.reviewsContainer}>
                    {displayedReviews.map((review, index) => (
                        <div key={index} className={styles.reviewItem}>
                            <div className={styles.reviewHeader}>
                                <p className={styles.reviewDate}>{new Date(review.date).toLocaleString()}</p>
                                <div className={styles.reviewStar}>
                                    {[...Array(5)].map((_, i) => (
                                        <span key={i} className={i < review.star ? styles.starFilled : styles.starEmpty}>★</span>
                                    ))}
                                </div>
                            </div>
                            <p className={styles.reviewComment}>{review.comment}</p>
                        </div>
                    ))}
                </div>
                {reviews.length > displayedReviews.length && (
                    <button className={styles.loadMoreButton} onClick={loadMoreReviews}>
                        Tải Thêm Đánh Giá
                    </button>
                )}
            </div>
        </div>
    );
};

export default AdminPage;
