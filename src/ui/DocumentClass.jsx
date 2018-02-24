// Used to declaritively add/remove classes on mount/unmount, respectively.
// If the needs of this component ever increase in complexity, such as nested instances needing to override instances higher in the tree,
// it would probably be smart to introduce react-side-effect.

import React from 'react';
import PropTypes from 'prop-types';


// Currently only supports a single class
class DocumentClass extends React.Component {

	componentDidMount() {
		this.addClass(this.props.className);
	}

	componentDidUpdate(prevProps, prevState) {
		const oldClass = prevProps.className;
		const newClass = this.props.className;
		if (oldClass !== newClass) {
			this.removeClass(oldClass);
			this.addClass(newClass);
		}
	}

	componentWillUnmount() {
		this.removeClass(this.props.className);
	}

	addClass(className) {
		window.document.documentElement.classList.add(className);
	}

	removeClass(className) {
		window.document.documentElement.classList.remove(className);
	}

	render() {
		return null;
	}
}

DocumentClass.propTypes = {
	className: PropTypes.string.isRequired
};

export default DocumentClass;
