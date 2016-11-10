<template>
	<el-dialog title="发微信通知" v-model="visiable" class="notice-wrap">
		<el-form :model="noticeform" ref="noticeform" class="notice-content clearfix">
			<el-form-item label="发送至:" class="send">
              <el-select class="l-pos set-wid" v-model="noticeform.reciever" multiple>
              	<el-option
			      v-for="item in options"
			      :label="item.name"
			      :value="item.id">
			    </el-option>
              </el-select>
            </el-form-item>
			<el-form-item label="发送范围:" class="send">
				<el-radio-group v-model="noticeform.range" class="l-pos">
				    <el-radio :label="1">全部学员</el-radio>
				    <el-radio :label="0">主要学员</el-radio>
				</el-radio-group>
			</el-form-item>
			<div class="send-content">
				<el-input placeholder="请输入主题" v-model="noticeform.title" class="send-title">
				</el-input>
				<el-input
				  class="editor"
				  type="textarea"
				  placeholder="请输入通知内容，通知会通过微信公众号推送给学员"
				  v-model="noticeform.content">
				</el-input>
				<div class="pics-content">
					<a class="slider-small-img" v-for="m in noticeform.imageList" :href="m">
						<img :src="compressImage(m, 45, 45)"/>
						<span class="iconfont icon-times" @click.stop="delImage($event, m)"></span>
					</a>
				</div>
		      	<upload v-on:onFileChange="onFileChange" keystr="importFile" :multiple="false" accept="image/gif, image/jpg, image/jpeg, image/png">
					<div class="upload-tip">
						<span class="iconfont icon-pic"></span>
						<span>上传图片</span>
					</div>	
				</upload>
			</div>
		</el-form>
		<span slot="footer" class="dialog-footer">
	        <el-button @click.native="visiable=false">取 消</el-button>
	        <el-button type="primary" :disabled="submitting" @click.native.prevent="handleSubmit">确 定</el-button>
	    </span>
	</el-dialog>
</template>
<script>
	import Upload from '../../../common/components/Upload.vue';
	import $ from 'jquery';
	import {noticeMy, noticeAll} from '../request';
	const imageCompress = require('../../../common/plugin/compressImage');
	export default {
		data() {
			return {
				submitting: false,
				visiable: true,
				isrefresh: false,
				noticeform: {
					reciever: [],
					range: 1,
					title: '',
					content: '',
					storageIds:[],
					imageList: []
				},
				options: [],
				file: null,
		        fileName: null
			}
		},
		watch: {
			visiable(val) {
				if (!val) {
					this.$emit('close');
				}
			}
		},
		props: {
			ids: {
				type: Array
			},
			orglist: {
				type: Array
			},
			type: {
				type: String
			}
		},
		created() {
			this.noticeform.reciever = this.ids;
			this.options = this.orglist;
		},
		methods: {
			compressImage(url, width, height) {
				return imageCompress(url, {
			 		width: width,
			  		height: height
			  	});
			},
			onFileChange(data) {
				this.file = data[0];
				this.fileName = data[0].name;
				var fd = new FormData();
				var self = this;
				if (self.file.size / 1024 > 2 * 1024) {
					toast('error', '上传图片大小不能超过2M');
					return;
				}
	    		fd.append('file', self.file);
				$.ajax({
	                url: '/common/upload.json',
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
	                		self.noticeform.storageIds.push(res.data.storageId);
	                		self.noticeform.imageList.push(res.data.url);
	                		self.$nextTick(function(){
								refreshSmallImages(false);
							})

	                	} else {
	                		toast('error', res.msg);
	                	}
	                }
	            })
			},
			/**
			 * 删除图片
			 */
			delImage(event, m) {
				event.preventDefault();
				let target = $(event.target);
				let index = -1;
				for (let i = 0; i < this.noticeform.imageList.length; i++) {
					if (m == this.noticeform.imageList[i]) {
						index = i;
						break;
					}
				};
				if (index != -1) {
					this.noticeform.imageList.splice(index, 1);
					this.noticeform.storageIds.splice(index, 1);
				}
			},
			/**
			 * 发送通知请求
			 */
			handleSubmit () {
				var param = {
					isAll: this.noticeform.range,
					orgIds: this.noticeform.reciever,
					title: this.noticeform.title,
					content: this.noticeform.content,
					storageIds: this.noticeform.storageIds,
					urls: this.noticeform.imageList
				};
				this.submitting = true;
				if (this.type == 'all') {
					noticeAll(param)
						.then((res) => {
							toast('success', '发送通知成功！');
						this.visiable = false;
						})
						.always(() => {
							this.submitting = false;
						});
				} else {
					noticeMy(param)
						.then((res) => {
							toast('success', '发送通知成功！');
						this.visiable = false;
						})
						.always(() => {
							this.submitting = false;
						});
				}			
			}
		},
		components: {
			Upload
		}
	}
</script>
<style lang="sass">
	.notice-wrap {
		.el-dialog {
			width: 800px;
			
		}
		.notice-content {
			border: 1px solid #E5E7E7;
			margin: 30px 10px;
			.el-form-item {
				margin-bottom: 0;
			}
			.send {
				padding: 10px 20px;
				border-bottom: 1px solid #E5E7E7;
				.el-radio-group {
					height: 36px;
				}
			}
		}
		.set-wid {
			width: 640px;
			.el-select__tags {
				position: relative;
			}

			.el-input {
				display: none;
			}
			.el-select-dropdown {
				display: none;
			}
		}
		.send-content {
			min-height: 200px;
			max-height: 600px;
			padding: 20px;
			overflow: auto;
			.send-title {
				input {
					border: none;
					height: 40px;
					font-size: 18px;
				}
			}
		}
		.editor {
			textarea {
				height: 150px;
				border: none;
				overflow: auto;
			}
		}
		.pics-content {
			padding: 10px;
		}
		.upload-wrapper {
			position: relative;
			top: 10px;
		}
		.upload-tip {
			color: #ec960c;
		}
		.icon {
			font-size: 16px;
			position: relative;
			color: #ec960c;
			top: 1px;
		}
		
	}
</style>