'use strict';

import {post, get} from '../../util/service';

export function getArea(param) {	 
	return get('/area.html', param); 
}