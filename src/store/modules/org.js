
'use strict';

export default {
	state: {
		setHeaderState: false,
		batchImportState: false,
		addStudentStatus: false,
		showRecordStatus: false
	},
	mutations: {
		'SET_HEADER' (state) {
			state.setHeaderState = true;
		},
		'HIDE_SET_HEADER' (state) {
			state.setHeaderState = false;
		},
		'BATCH_IMPORT' (state) {
			state.batchImportState = true;
		},
		'HIDE_BATCH_IMPORT' (state) {
			state.batchImportState = false;
		},
		'SHOW_ADDSTUDENT' (state) {
			state.addStudentStatus = true;
		},
		'HIDE_ADDSTUDENT' (state) {
			state.addStudentStatus = false;
		},
		'SHOW_RECORDS' (state) {
			state.showRecordStatus = true;
		},
		'HIDE_RECORDS' (state) {
			state.showRecordStatus = false;
		}
    }
}
