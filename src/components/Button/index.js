import React, { Component } from 'react';
import styles from './style.module.scss';
import CombineStyles from '../../helpers/CombineStyles';
import { Link } from 'gatsby';

class Button extends Component {
	render() {
		let ButtonLink;

		if (this.props.href) {
			ButtonLink = ({ children }) => <a href={this.props.href}>{children}</a>
		} else if (this.props.to) {
			ButtonLink = ({ children }) => <Link to={this.props.to}>{children}</Link>
		}

		return (
			<div className={CombineStyles(styles.button, this.props.className)}>
				<ButtonLink>
					{this.props.children}
				</ButtonLink>
			</div>
		)
	}
}

export default Button;
