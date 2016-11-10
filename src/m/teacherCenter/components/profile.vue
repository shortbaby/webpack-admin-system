<template>
	<div class="teacher-profile-wrapper">
		<mt-header title="我的资料">
		  <router-link to="/center" slot="left">
		    <mt-button icon="back"></mt-button>
		  </router-link>
		</mt-header>
		<div class="field-set">
			<ul>
				<li>
					<label>
						<img class="avatar" :src="info.pic">
					</label>
					<p class="right">
						<wx-upload v-on:onFileChange="onFileChange" key="picfile" :multiple="false">
							<a href="javascript:void(0)">
								<span>更换头像</span>
								<span class="iconfont icon-arrowright"></span>
							</a>
						</wx-upload>
					</p>
				</li>
				<li>
					<label>手机号</label>
					<p class="right">
						{{info.mobile}}
					</p>
				</li>
				<li>
					<label>职位</label>
					<p class="right">
						{{info.position}}
					</p>
				</li>
				<li>
					<label>公司</label>
					<p class="right">
						{{info.company}}
					</p>
				</li>
			</ul>
		</div>	
		<div>
			<mt-button type="default" :disabled="submiting" @click.native="unbind">解除绑定</mt-button>
		</div>	
		<copyright></copyright>
	</div>
</template>
<script>
	import $ from 'jquery';
	import WxUpload from '../../../common/components/WxUpload.vue';
	import {unbind, teacherInfo} from '../request';
	export default {
		data() {
			return {
				fileName: '',
				file: null,
				info: {},
				submiting: false
			}
		},
		created() {
			this.getInfo();
		},
		computed: {
			id() {
				return this.$store.state.teacherId;
			}
		},
		methods: {
			getInfo() {
				showIndicator();
				teacherInfo()
					.then((res) => {
						this.info = res.data;
					})
					.always(() => {
						hideIndicator();
					})
			},
			removeFile () {
				this.fileName = '';
			},
			uploadFile () {
				var file = this.file;
				var self = this;
				if (!(file && this.fileName)) {
					return;
				}
				var fd = new FormData();
	    		fd.append('file', file);
	    		showIndicator();
				$.ajax({
					url: `/wechat/common/upload.ajax`,
	                type: 'POST',
	                contentType: false,
	                data: fd,
	                dataType: 'json',
	                processData: false,
	                error: function () {
	                	hideIndicator();
	                	toast('error', '网络异常');
	                },
	                success: function (res) {
	                	hideIndicator();
	                	if (res.code == 0) {
	                		toast('success', '上传成功');
	                	} else {
	                		toast('error', '网络异常');
	                	}
	                }
	            })
	            .always(function () {
	            	hideIndicator();
	            });
			},
			onFileChange (data) {
				this.file = data[0];
				this.fileName = data[0].name;
				this.uploadFile();
			},
			unbind() {
				this.submiting = true;
				unbind()
					.then((res) => {
						toast('success', '解绑成功');
					})
					.always(() => {
						this.submiting = false;
					})
			}
		},
		components: {
			WxUpload
		}
	}
</script>
