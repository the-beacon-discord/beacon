import React from "react";
import discordLogo from '../../images/discord.svg';

import styles from './style.module.scss';

const DiscordServerButton = () => (
	<div className={styles.container}>
		<iframe src="https://canary.discordapp.com/widget?id=310279910264406017&theme=dark" width="800" height="400" allowtransparency="true" frameborder="0"></iframe>
	</div>
)

export default DiscordServerButton
