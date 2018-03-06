import React from 'react';
import { connect } from 'react-redux';

import SavedGradientPreview from 'ui/SavedGradientPreview';
import {
	deleteGradient,
	loadGradient,
	savesSelector
} from 'ducks/saves';

import 'css/SaveGallery.css';




const SaveGallery = ({ saves, loadGradient, deleteGradient }) => {

	const hasSaves = !!saves.length;

	return (
		<div className="saveGallery">
			{hasSaves &&
				<h2 className="saveGallery__heading fade-slide-up">My Gradients</h2>
			}
			{hasSaves && saves.map((gradient, index) => (
				<SavedGradientPreview
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
