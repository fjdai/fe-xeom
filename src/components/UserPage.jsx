import React, { useState } from 'react';
import styles from './UserPage.module.css';
import defaultAvatar from '../assets/default-avatar.png'; // Make sure to add this image to your assets folder

const UserPage = ({ onLogout }) => {
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const url = "https://be-xeom.onrender.com/api/v1/user";

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const date = new Date().toISOString();
        const data = {
            star: rating,
            comment: review,
            date: date,
        }

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Failed to submit review');
            }

            alert('Cảm ơn bạn đã gửi đánh giá!');
            setReview('');
            setRating(0);
        } catch (error) {
            console.error('Error submitting review:', error);
            alert('Có lỗi xảy ra khi gửi đánh giá. Vui lòng thử lại sau.');
        }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.userContainer}>
            <div className={styles.userContent}>
                <button className={styles.logoutButton} onClick={onLogout}>
                    <span className={styles.logoutIcon}>🚪</span>
                    <span className={styles.logoutText}>Đăng Xuất</span>
                </button>
                <div className={styles.avatarContainer}>
                    <img src={defaultAvatar} alt="User Avatar" className={styles.avatar} />
                </div>
                <h2 className={styles.userTitle}>Nhớ ăn uống nghỉ ngơi nha</h2>
                <p className={styles.welcomeText}>Gửi đánh giá nào</p>

                <form onSubmit={handleSubmit} className={styles.reviewForm}>
                    <div className={styles.starRating}>
                        {[...Array(5)].map((_, index) => (
                            <button
                                type="button"
                                key={index}
                                className={index < rating ? styles.on : styles.off}
                                onClick={() => setRating(index + 1)}
                                disabled={isLoading}
                            >
                                <span className={styles.star}>&#9733;</span>
                            </button>
                        ))}
                    </div>
                    <textarea
                        className={styles.reviewInput}
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        placeholder="Viết đánh giá của bạn ở đây..."
                        required
                         disabled={isLoading}
                    />
                    <button type="submit" className={styles.submitButton} disabled={isLoading}>
                        {isLoading ? 'Đang gửi...' : 'Gửi Đánh Giá'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UserPage;
