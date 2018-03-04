import React from 'react';
import { connect } from 'react-redux';

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
			<div className="saveGallery__item">
				<div className="saveGallery__item__gradient" style={gradientStyle} onClick={this.load} />
				<button className="saveGallery__item__delete" onClick={this.delete}>
					&times;
				</button>
			</div>
		);
	}
}
