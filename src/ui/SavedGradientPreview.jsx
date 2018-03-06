import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';

import { makeGradientFromSave } from 'helpers/gradientHelpers';



const commonButtonStyle = {
	position: 'absolute',
	zIndex: 1,
	top: -3
};

const editButtonStyle = {
	...commonButtonStyle,
	right: 30
};

const deleteButtonStyle = {
	...commonButtonStyle,
	right: -16
};

const deletePromptButtonStyle = {
	...commonButtonStyle,
	top: 0,
	right: 0,
	height: 40,
	lineHeight: '40px',
	minWidth: 70
};


class SavedGradientPreview extends React.PureComponent {

	constructor(props) {
		super(props);

		this.state = {
			promptDelete: false
		};

		this._isMounted = false;

		this.load = this.load.bind(this);
		this.delete = this.delete.bind(this);
		this.promptDelete = this.promptDelete.bind(this);
		this.rejectDelete = this.rejectDelete.bind(this);
	}

	componentDidMount() {
		this._isMounted = true;
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	load() {
		this.props.load(this.props.index);
	}

	delete() {
		this.props.delete(this.props.index);
	}

	promptDelete() {
		this.setState({ promptDelete: true });

		setTimeout(this.rejectDelete, 3000);
	}

	rejectDelete() {
		if (this._isMounted) {
			this.setState({ promptDelete: false });
		}
	}

	render() {
		const { gradient } = this.props;

		const gradientStyle = {
			backgroundImage: makeGradientFromSave(gradient)
		};

		const componentClass = classNames(
			'saveGallery__item fade-slide-up',
			this.state.promptDelete && 'forceOpen'
		);

		return (
			<div className={componentClass} onMouseLeave={this.rejectDelete}>
				<div className="saveGallery__item__gradient" style={gradientStyle} />
				{this.state.promptDelete
					? (
						<FlatButton
							label="Sure?"
							primary
							onClick={this.delete}
							style={deletePromptButtonStyle}
						/>
					) : (
						<React.Fragment>
							<IconButton
								className="saveGallery__item__edit"
								onClick={this.load}
								style={editButtonStyle}
							>
								<EditIcon color="#888" hoverColor="#ccc" />
							</IconButton>
							<IconButton
								className="saveGallery__item__delete"
								onClick={this.promptDelete}
								style={deleteButtonStyle}
							>
								<DeleteIcon color="#888" hoverColor="#ccc" />
							</IconButton>
						</React.Fragment>
					)
				}
			</div>
		);
	}
}

SavedGradientPreview.propTypes = {
	gradient: PropTypes.object.isRequired,
	index: PropTypes.number.isRequired,
	load: PropTypes.func.isRequired,
	delete: PropTypes.func.isRequired
};

export default SavedGradientPreview;
