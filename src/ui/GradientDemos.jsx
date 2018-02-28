import React from 'react';
import { connect } from 'react-redux';

import ColorSpace from 'enums/ColorSpace';
import Gradient from 'ui/Gradient';
import {
	colorSpaceSelector,
	stopCountSelector,
	stopsSelector,
} from 'ducks/activeGradient';


const allRenderableColorSpaces = [
	ColorSpace.RGB,
	ColorSpace.LRGB,
	ColorSpace.HSL,
	ColorSpace.LAB,
	ColorSpace.HCL
];

const GradientDemos = ({ colorSpace, stopCount, stops }) => {
	return (
		<div className="gradient-demos">
			{colorSpace !== ColorSpace.All &&
				<Gradient
					colorSpace={colorSpace}
					stopCount={stopCount}
					stops={stops}
					expanded
				/>
			}
			{colorSpace === ColorSpace.All && allRenderableColorSpaces.map(colorSpace => (
				<Gradient
					colorSpace={colorSpace}
					stopCount={stopCount}
					stops={stops}
					showLabel
					key={colorSpace}
				/>
			))}
		</div>
	);
};

const mapStateToProps = state => ({
	colorSpace: colorSpaceSelector(state),
	stopCount: stopCountSelector(state),
	stops: stopsSelector(state)
});

export default connect(mapStateToProps)(GradientDemos);
