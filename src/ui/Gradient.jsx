import React from 'react';
import classNames from 'classnames';

import ColorSpace from 'enums/ColorSpace';
import copyText from 'helpers/copyText';
import {
	gradientSwatchesSelector,
	simulatedGradientSelector
} from 'helpers/gradientHelpers';

import 'css/Gradient.css';



class Gradient extends React.Component {
	constructor(props) {
		super(props);

		this.state = { expanded: false };
		this.toggleExpand = () => this.setState(prevState => ({ expanded: !prevState.expanded }));
	}

	render() {
		const { colorSpace, stopCount, stops, expanded, showLabel } = this.props;

		const isExpanded = expanded || this.state.expanded;

		// Browsers are great at rendering RGB gradients, so for RGB mode we'll simplify the generated
		// CSS gradient string to omit the generated values. We'll still show them as swatches, though.
		const swatches = gradientSwatchesSelector(colorSpace, stopCount, stops);
		const simulatedGradient = colorSpace === ColorSpace.RGB
			? simulatedGradientSelector(gradientSwatchesSelector(colorSpace, stops.length, stops))
			: simulatedGradientSelector(swatches);

		return (
			<div className="gradient">
				{showLabel &&
					<div className="gradient__label">
						{colorSpace.toUpperCase()}
					</div>
				}
				<div
					className="gradient__gfx"
					onClick={this.toggleExpand}
					style={{ background: simulatedGradient }}
				/>
				<div className="gradient__swatches">
					{swatches.map((color, i) => (
						<div
							style={{ background: color }}
							onClick={copyText.bind(null, color)}
							key={i}
						/>
					))}
				</div>
				<pre
					className={classNames('gradient__code', isExpanded && 'gradient__code--visible')}
					onClick={isExpanded ? copyText.bind(null, simulatedGradient, 'CSS gradient') : null}
				>
					{simulatedGradient}
				</pre>
			</div>
		);
	}
}

export default Gradient;
