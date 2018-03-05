import React from 'react';
import { connect } from 'react-redux';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';

import { makeGradientFromSave } from 'helpers/gradientHelpers';
import {
	deleteGradient,
	loadGradient,
	savesSelector
} from 'ducks/saves';

import 'css/SaveGallery.css';




const SaveGallery = ({ saves, loadGradient, deleteGradient }) => {

	return (
		<div className="saveGallery">
			{saves.map((gradient, index) => (
				<GradientPreview
					gradient={gradient}
					index={index}
					load={loadGradient}
					delete={deleteGradient}
					key={index}
				/>
			))}
		</div>
	);
};

const mapStateToProps = state => ({
	saves: savesSelector(state)
});

const mapDispatchToProps = {
	deleteGradient,
	loadGradient
};

export default connect(mapStateToProps, mapDispatchToProps)(SaveGallery);




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


class GradientPreview extends React.PureComponent {

	constructor(props) {
		super(props);

		this.load = this.load.bind(this);
		this.delete = this.delete.bind(this);
	}

	load() {
		this.props.load(this.props.index);
	}

	delete() {
		this.props.delete(this.props.index);
	}

	render() {
		const { gradient } = this.props;

		const gradientStyle = {
			backgroundImage: makeGradientFromSave(gradient)
		};

		return (
			<div className="saveGallery__item fade-slide-up">
				<div className="saveGallery__item__gradient" style={gradientStyle} />
				<IconButton
					className="saveGallery__item__edit"
					onClick={this.load}
					style={editButtonStyle}
				>
					<EditIcon color="#888" hoverColor="#ccc" />
				</IconButton>
				<IconButton
					className="saveGallery__item__delete"
					onClick={this.delete}
					style={deleteButtonStyle}
				>
					<DeleteIcon color="#db0025" hoverColor="#8a0017" />
				</IconButton>
			</div>
		);
	}
}
