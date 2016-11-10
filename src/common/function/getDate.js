
'use strict';

export default function getDate (date, AddDayCount) {
	let dl = new Date();
    let diffTime = AddDayCount * 24 * 60 * 60 * 1000;
    dl.setTime(date.getTime() + diffTime);
    return dl;
}