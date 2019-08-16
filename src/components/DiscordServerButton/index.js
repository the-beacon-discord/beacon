import React from "react";
import styles from './style.module.scss';

const DiscordServerButton = () => (
	<div className={styles.container}>
		<iframe
			src="https://canary.discordapp.com/widget?id=310279910264406017&theme=dark"
			allowTransparency="true"
			frameBorder="0"
			className={styles.discord}
			title="Discord Server Statistics"
		></iframe>
	</div>
)

export default DiscordServerButton
