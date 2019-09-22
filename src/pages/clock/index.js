import React, { Component } from 'react';
import Layout from '../../components/Layout';
import { clearInterval } from 'timers';
import events from './events.yaml';
import styles from './index.module.scss';

class ClockPage extends Component {
	constructor(props) {
		super(props);

		this.interval = null;
		this.state = {
			time: new Date(),
			event: null
		}
	}
	componentDidMount() {
		if (window.location.hash.length > 1 && events[window.location.hash.substr(1)]) {
			this.setState({
				event: events[window.location.hash.substr(1)]
			});
		}

		this.interval = setInterval(() => {
			const time = new Date();
			const timezoneless = new Date();

			timezoneless.setTime(timezoneless.getTime() - timezoneless.getTimezoneOffset() * 60 * 1000)

			this.setState({
				time,
				timezoneless
			});
		}, 10);
	}
	componentWillUnmount() {
		if (this.interval) clearInterval(this.interval)
	}
	render() {
		let dateString = '';

		if (this.state.event && this.state.event.time) {
			// https://stackoverflow.com/questions/1787939/check-time-difference-in-javascript
			const dateStringArray = [];
			const differenceInMilliseconds = new Date(this.state.event.time) - this.state.timezoneless;
			const differenceAsADate = new Date(differenceInMilliseconds);

			console.log(differenceInMilliseconds)
			
			const days = Math.floor(differenceInMilliseconds / 1000 / 60 / (60 * 24));
			const hours = differenceAsADate.getHours();
			const minutes = differenceAsADate.getMinutes();
			const seconds = differenceAsADate.getSeconds();
			const milliseconds = differenceAsADate.getMilliseconds();

			if (days) {
				dateStringArray.push(`${days} Day${days === 1 ? '' : 's'}`);
			}

			if (hours) {
				dateStringArray.push(`${hours} Hour${hours === 1 ? '' : 's'}`);
			}

			if (minutes) {
				dateStringArray.push(`${minutes} Minutes${minutes === 1 ? '' : 's'}`);
			}

			if (seconds) {
				dateStringArray.push(`${seconds} Seconds${seconds === 1 ? '' : 's'}`);
			}

			if (milliseconds) {
				dateStringArray.push(`${milliseconds.toString().padStart(3, '0')} Milliseconds`);
			}

			dateString = dateStringArray.join(', ')
		}
		
		return (
			<Layout>
				<div className={styles.container}>
					<h1>{this.state.event && this.state.event.label ? this.state.event.label : 'The Time'}</h1>
					<p className={styles.currentTime}>{this.state.time.toLocaleString()}</p>
					<h2>{this.state.event && this.state.event.by && `Hosted by: ${this.state.event.by}`}</h2>
					<p>{dateString}</p>
				</div>
			</Layout>
		)
	}
}

export default ClockPage;
