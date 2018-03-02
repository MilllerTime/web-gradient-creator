import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';

import { activeToastSelector } from 'ducks/toasts';

import 'css/Toaster.css';



const transitionDuration = 400; // ms



class Toaster extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			// Whether active toast is transitioning out
			hiding: false,
			// The currently visible toast. Not always equal to `props.nextToast`.
			// When `props.nextToast` changes, `state.activeToast` will hang onto the previous toast allowing it to transition out.
			activeToast: props.nextToast
		};
	}

	componentDidUpdate(prevProps, prevState) {
		// Repond to toast changes
		if (this.props.nextToast !== prevProps.nextToast) {
			// Allow currently displaying toast time to fade out
			if (this.state.activeToast) {
				this.setState({ hiding: true });
				// TODO: Support more complex toast queueing
				setTimeout(() => {
					this.setState({
						hiding: false,
						activeToast: this.props.nextToast
					});
				}, transitionDuration);
			}
			// Instantly show first toast
			else {
				this.setState({
					hiding: false,
					activeToast: this.props.nextToast
				});
			}
		}
	}

	refresh() {
		window.location.reload();
	}

	render() {
		const { activeToast, hiding } = this.state;

		const toasterClass = classNames(
			'toaster fadeable fade-in',
			(!activeToast || hiding) && 'invisible'
		);

		const toastClass = classNames(
			'toast',
			activeToast && (activeToast.refresh || activeToast.link) && 'toast--interactive'
		);

		if (!activeToast) return null;
		return (
			<div className={toasterClass}>
				<div className={toastClass} onClick={activeToast.refresh ? this.refresh : null}>
					{activeToast.message}
				</div>
			</div>
		);
	}
}


const mapStateToProps = state => ({
	nextToast: activeToastSelector(state)
});

export default connect(mapStateToProps)(Toaster);
