import React, { useState } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';

import Slider from '@material-ui/core/Slider';

function SkillSider(props) {


	return (
		<Slider
            defaultValue={1}
            getAriaValueText={valuetext}
            aria-labelledby="discrete-slider"
            valueLabelDisplay="auto"
            step={1}
            marks
            min={1}
            max={5}
        />
	);
}

export default connect(mapStoreToProps)(SkillSider);