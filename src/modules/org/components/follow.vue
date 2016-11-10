<template>
	<div class="follow-wrap">
		<div class="left">
			<ul class="list">
				<li class="follow-item" v-for="item in commentList">
					<div class="time">{{item.zhTime}}</div>
					<div class="type">
						<span v-if="item.followType == 1" class="iconfont icon-phone"></span>
						<span v-if="item.followType == 2" class="iconfont icon-users"></span>
						<span v-if="item.followType == 3" class="iconfont icon-weixin"></span>
						<span v-if="item.followType == 4" class="iconfont icon-qq"></span>
						<span v-if="item.followType == 5" class="iconfont icon-qita"></span>
						<p class="txt">{{item.followTypeStr}}</p>
					</div>
					<div class="follow-info">
						<div class="triangle-left"></div>
						<div class="follow-content">
							<p>
								<span class="name">{{item.userName}}</span>
								<span>{{item.userIdentity}}</span>
								<el-dropdown trigger="click">
								  <span class="el-dropdown-link">
								    {{item.createTime | date('HH:mm')}}<i v-if="item.userId != -1" class="iconfont icon-caretdown"></i>
								  </span>
								  <el-dropdown-menu slot="dropdown" v-if="item.userId != -1">
								    <el-dropdown-item @click.native="edit(item)">编辑</el-dropdown-item>
								    <el-dropdown-item @click.native="delet(item.commentId)">删除</el-dropdown-item>
								  </el-dropdown-menu>
								</el-dropdown>
							</p>
							<p>
								{{item.content}}
							</p>
							<div class="comment-image-wrap" v-zoomimage>
								<a class="slider-log-img" v-for="s in item.imageList" :href="s" track-by="$index">
									<img :src="compressImage(s, 60, 60)"/>
								</a>
							</div>
						</div>
					</div>	
				</li>
			</ul>
		</div>
		<div class="right">
			<div class="edit-follow-content">
				<el-input
				  type="textarea"
				  placeholder="请输入跟进记录内容"
				  v-model="comment.content">
				</el-input>
				<div class="pics-content">
					<a class="slider-small-img" v-for="m in comment.imageList" :href="m">
						<img :src="compressImage(m, 45, 45)"/>
						<span class="iconfont icon-times" @click.stop="delImage($event, m)"></span>
					</a>
				</div>
			</div>
			<div class="bottom">
				<el-tooltip class="item" effect="dark" content="上传图片" placement="top">
			      	<upload v-on:onFileChange="onFileChange" key="importFile"
			      		:multiple="false" 
			      		accept="image/gif, image/jpg, image/jpeg, image/png">
						<div class="upload-tip">
							<span class="iconfont icon-pic"></span>
							<span>上传图片</span>
						</div>	
					</upload>
			    </el-tooltip>
			    <div>
			    	<label>跟进方式: </label>
			    	<el-select v-model="comment.followType">
				    	<el-option
					      v-for="item in followOptions"
					      :label="item.label"
					      :value="item.value">
				    	</el-option>
				    </el-select>
			    </div>
			    <div>
			    	<label>发送学生微信: </label>
			    	<el-radio class="radio" v-model="send" :label="2">全部学生</el-radio>
  					<el-radio class="radio" v-model="send" :label="1">部分学生</el-radio>
  					<el-radio class="radio no-send" v-model="send" :label="0">不发送</el-radio>
			    </div>
			    <transition name="md-fade-bottom">
				    <div v-show="send == '1'">
				    	<label>选择学生: </label>
				    	<el-select v-model="studentIds" multiple>
					    	<el-option
						      v-for="item in options"
						      :label="item.name"
						      :value="item.id">
					    	</el-option>
					    </el-select>
				    </div>
			    </transition>
				<div>
					<el-button type="primary" @click.native="save">发布</el-button>	
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import $ from 'jquery';
	import Vue from 'vue';
	import Upload from '../../../common/components/Upload.vue';
	import data from '../data';
	import {followList, followDetail, delFollow, addFollow, editFollow, getBindStudent} from '../request';
	const imageCompress = require('../../../common/plugin/compressImage'); 
	export default {
		data() {
			return {
				commentList: '',
				comment: {
					storageIds: [],
					imageList: [],
					content: ''
				},
				editId: null,
				pageDto: {
			        count: 7,
			        curPageCount: 7,
			        pageNum: 1,
			        pageSize: 20,
			        totalPageNum: 1
			    },
			    followOptions: [
			    	{
			    		label: '电话跟进',
			    		value: 1
			    	},
			    	{
			    		label: '当面沟通',
			    		value: 2
			    	},
			    	{
			    		label: '微信沟通',
			    		value: 3
			    	},
			    	{
			    		label: 'QQ沟通',
			    		value: 4
			    	},
			    	{
			    		label: '其他',
			    		value: 5
			    	},
			    ],
				options: [],
		        studentIds: [],
		        send: 0,
		        file: null,
		        fileName: null
			}
		},
		props: {
			id: {
				type: Number
			}
		},
		created() {
			//let list = this.comments;
			this.getFollowList();		
		},
		watch: {
			send (val) {
				if (val == 1) {
					this.getBindList();
				}
			}
		},
		methods: {
			getBindList () {
				var param = {
					orgId: this.id
				};
				getBindStudent(param)
					.then((res) => {
						this.options = res.data;
					});
			},
			refresh () {
				this.getFollowList();
			},
			/**
			 * 获取跟进记录列表
			 */
			getFollowList () {
				var param = {
					orgId: this.id,
					pageNum: this.pageDto.pageNum
				};
				followList(param)
					.then( (res) => {
						this.commentList = res.data;
						this.commentList.forEach((item) => {
							let d = new Date(item.createTime);
							item.zhTime = d.getMonth() + 1 + '月' + d.getDate() + '日';

							let imageList = item.urls.length > 0 ? item.urls.split(',') : [];
							Vue.set(item, 'imageList', imageList);
							item.storageIds = item.storageIds.length > 0 ? item.storageIds.split(',') : [];
							item.hasImage = item.imageList.length > 0 ? true: false;
							item.disabled = item.userId == -1 ? true : false;
						});
					} );
			},
			/**
			 * 编辑单条跟进记录
			 */
			edit(item) {
				var edit = {};
				this.comment = $.extend(true, edit, item);
				this.editId = item.commentId;
			},
			/**
			 * 删除图片
			 */
			delImage(event, m) {
				event.preventDefault();
				let target = $(event.target);
				let index = -1;
				for (let i = 0; i < this.comment.imageList.length; i++) {
					if (m == this.comment.imageList[i]) {
						index = i;
						break;
					}
				};
				if (index != -1) {
					this.comment.imageList.splice(index, 1);
					this.comment.storageIds.splice(index, 1);
				}
			},
			/**
			 * 保存修改和新增内容
			 */
			save () {
				var storageIds = '';
				var studentIds = '';
				if (this.comment.storageIds.length) {
					storageIds = this.comment.storageIds.join(',');
				} 
				if (this.studentIds.length) {
					studentIds = this.studentIds.join(',');
				}

				var param = {
					orgId: this.id,
					storageIds: storageIds,
					content: this.comment.content,
					followType: this.comment.followType,
					studentIds: studentIds,
					sendRange: this.send
				};
				if (this.comment.content.length || this.comment.storageIds.length) {
					if(this.editId) {
						$.extend(param, {
							commentId: this.comment.commentId
						});
						editFollow(param)
							.then((res) => {
								this.refresh();
							});
					} else {
						addFollow(param)
							.then((res) => {
								this.refresh();
							});
					}
				} else {
					toast('error', '请输入跟进记录内容');
					return false;
				}
				
			},
			delet(id) {
				var param = {
					commentId: id,
					orgId: this.id
				};
				this.$confirm('此操作将删除该纪录, 是否继续?', '提示', {
                    type: 'warning'
                }).then(() => {
					delFollow(param)
						.then((res) => {
							this.refresh();
						});
				});
			},
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
				if (self.comment.imageList.length > 5) {
					toast('error', '上传图片数量超过限制');
					return;
				}
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
	                		toast('success', '上传成功');
	                		self.comment.storageIds.push(res.data.storageId);
	                		self.comment.imageList.push(res.data.url);
	                		self.$nextTick(function(){
								refreshSmallImages(false);
							})
	                		//self.scene = 'process';
	                		//self.checkUploadProcessStatusHandler(res.data.taskId);

	                	} else {
	                		toast('error', res.msg);
	                	}
	                }
	            })
			}
		},
		components: {
			Upload
		},
		beforeDestroy() {
			$('div.zoomimage').remove();
		}
	}
</script>
<style lang="sass">
	.edit-follow-content {
		textarea {
			border: none;
			outline: none;
		}
	}
</style>