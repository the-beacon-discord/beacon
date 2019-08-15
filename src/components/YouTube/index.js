import React from 'react';
import styles from './style.module.scss';

function YouTube({ id, ...props }) {
	return (
		<iframe
			src={`https://www.youtube.com/embed/${id}`}
			className={styles.video}
			frameBorder="0"
			allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
			allowFullScreen
			{...props}>
		</iframe>
	)
}

export default YouTube

