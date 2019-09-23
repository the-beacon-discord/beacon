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
			const event = events[window.location.hash.substr(1)];

			if (event.time) {
				const now = new Date();
				const then = new Date(event.time);
				if (event.repeats && now > then) {
					while (now > then) {
						then.setDate(then.getDate() + event.repeats)
					}
					event.time = then;
				}
			}

			this.setState({
				event
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
		let then = null;

		if (this.state.event && this.state.event.time) {
			// https://stackoverflow.com/questions/1787939/check-time-difference-in-javascript
			const dateStringArray = [];
			const now = this.state.timezoneless;
			then = this.state.event.time;
			const differenceInMilliseconds = Math.abs(then - now);
			const differenceAsADate = new Date(differenceInMilliseconds);
			
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
				dateStringArray.push(`${minutes} Minute${minutes === 1 ? '' : 's'}`);
			}

			if (seconds) {
				dateStringArray.push(`${seconds} Second${seconds === 1 ? '' : 's'}`);
			}

			if (milliseconds) {
				dateStringArray.push(`${milliseconds.toString().padStart(3, '0')} Milliseconds`);
			}

			if (then < now) {
				dateStringArray.push('in the past')
			}

			dateString = dateStringArray.join(' ')
		}
		
		return (
			<Layout>
				<div className={styles.container}>
					<h1>{this.state.event && this.state.event.label ? this.state.event.label : 'The Time'}</h1>
					<h2>{then && then.toLocaleString(window.navigator.language, {
						weekday: 'long',
						year: 'numeric',
						month: 'long',
						day: 'numeric',
						hour: '2-digit',
						minute: '2-digit',
						second: '2-digit',
						timeZoneName: 'long'
					})}</h2>
					<p className={styles.currentTime}>{this.state.time.toLocaleString()}</p>
					<h2>{this.state.event && this.state.event.by && `Hosted by: ${this.state.event.by}`}</h2>
					<p>{dateString}</p>
				</div>
			</Layout>
		)
	}
}

export default ClockPage;
