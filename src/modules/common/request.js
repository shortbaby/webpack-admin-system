'use strict';

import {post} from '../../common/util/service';

export function getAuth(params) {
	return post('/role/getOwnPermissions.json', params);
}
