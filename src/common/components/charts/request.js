'use strict';

import {get} from '../../util/service';

export function getChinaData(param) {	 
	return get('/china.html', param); 
}