import { Link } from 'gatsby';
import React, { Component } from 'react';
import CombineStyles from '../../helpers/CombineStyles';
import styles from './style.module.scss';

class Button extends Component {
	render() {
		return (
			<div className={CombineStyles(styles.button, this.props.className)}>
				{this.props.href && <a href={this.props.href}>
					{this.props.children}
				</a>}
				{this.props.to && <Link to={this.props.to}>
					{this.props.children}
				</Link>}
			</div>
		)
	}
}

export default Button;
