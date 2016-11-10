
'use strict';

export default function getMonthWeek (date) {
	let w = date.getDay();
	let d = date.getDate();
	return Math.ceil((d + 6 - w) / 7);
}