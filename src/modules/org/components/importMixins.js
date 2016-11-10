

'use strict';

import Upload from '../../../common/components/Upload.vue';

import formRequest  from '../../../common/plugin/formRequest';
import redirect from '../../../common/function/redirect';
import {checkUploadProcessStatus} from '../request';
import $ from 'jquery';
export default {
	data () {
		return {
			visiable: true,
			fileName: '',
			file: null,
			scene: 'upload',
			processProgress: '0',
			timer: null,
			processStatus: {},
			isrefresh: false
		};
	},
	watch: {
		visiable(val) {
			if (!val) {
				this.$emit('close', this.isrefresh);
			}
		}
	},
	created() {
		//this.getOptions();
	},
	components: {
		Upload: Upload
	},
	methods: {
		onFileChange (data) {
			this.file = data[0];
			this.fileName = data[0].name;
		},
		getOptions() {
			getSchoolList()
				.then((res) => {
					let schoolList = res.data.list;
				
					schoolList.forEach(function(item) {
						item.value = item.id.toString();
						item.label = item.name;
					});
					
					schoolList.splice(0, 0, {'value': '-1', 'label': '请选择'});
					this.schoolOptions = schoolList;
				})
		},
		// 移除文件
		removeFile (event) {
			this.fileName = '';
		},
		uploadFile (event) {
			var btn = $(event.target);
			var file = this.file;
			var self = this;
			if (this.schoolId == -1) {
				//dispatch('TOAST', '请先选择校区');
				return;
			}
			if (!(file && this.fileName)) {
				//dispatch('TOAST', '请先选择上传文件');
				return;
			}
			if (file && file.size) {
				let size = file.size / 1024;
				if (size > 1024 * 4) {
					toast('error', '上传文件超过了大小限制');
					return;
				}
			}
			btn.prop('disabled', true);

			var fd = new FormData();
    		fd.append('file', file);

			$.ajax({
				url: '/common/importOrg.json',
                type: 'POST',
                contentType: false,
                data: fd,
                dataType: 'json',
                processData: false,
                error: function () {
                	toast('error', '网络异常');
                },
                success: function (res) {
                	if (res.code == 0) {

                		self.scene = 'process';
                		self.checkUploadProcessStatusHandler(res.data.taskId);

                	} else {
                		toast('error', res.msg);
                	}
                }
            })
            .always(function () {
            	btn.prop('disabled', false);
            });
		},
		// 重新上传
		reUpload () {
			this.scene = 'upload';
			this.clearTimer();
		},
		// 清除定时器
		clearTimer () {
			clearTimeout(this.timer);
		},
		// 检查上传进度
		checkUploadProcessStatusHandler (taskId) {

			var self = this;
			var params = {
				taskId: taskId
			};

			checkUploadProcessStatus(params)
				.then(function (res) {

					var progress = res.data.completeRate;

					if (progress < 100) {

						self.processProgress = progress;
						self.timer = setTimeout(function () {
							self.checkUploadProcessStatusHandler(taskId);
						}, 500);

					} else {
						self.scene = 'complete';
						self.processStatus = res.data;
						self.clearTimer();
					}

				}, function () {
					self.scene = 'upload';
				});
		},
		exportError () {
			redirect(this.processStatus.errorFileUrl);
			//formRequest(this.processStatus.errorFileUrl);
		},
		complete () {
			this.isrefresh = true;
			this.visiable = false;
		}
	},
	destroyed () {
		this.clearTimer();
	}
}