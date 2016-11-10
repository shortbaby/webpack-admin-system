<template>
	<el-dialog :title="title" v-model="visiable">
        <el-form :model="form" ref="form" :rules="rules" class="new-clazz-form" label-position="top">
            <el-form-item label="班级名称" prop="className" class="item-1">
              <el-input v-model="form.className" auto-complete="off" placeholder="请输入班级名称"></el-input>
            </el-form-item>
            <el-form-item label="期数" prop="periods" class="item-2">
              <el-input v-model="form.periods" auto-complete="off" placeholder="请输入期数"></el-input>
            </el-form-item>
            <el-form-item label="课程" prop="courses" class="item-3">
              <el-select v-model="form.courses" placeholder="请选择课程" multiple>
              	<el-option v-for="item in lessonOptions"
              		:key="item.id"
              		:label="item.name" 
              		:value="item.id">
              	</el-option>
			  </el-select>
            </el-form-item>
            <el-form-item label="课程封面" class="item-9">
            	<tx-upload action="/common/upload.json"
				  type="drag"
				  accept="image/gif, image/jpg, image/jpeg, image/png"
				  :thumbnail-mode="true"
				  :multiple="false"
				  :show-upload-list="false"
				  :on-success="uploadSuccess"
				  :on-error="uploadFail"
				  :on-remove="deleteUrl"
				  ref="upload">
				  <!-- <div class="preview-wrapper" v-show="form.url">
				  	<div class="modal-mask">
				  		<span class="iconfont icon-upload"></span>
				  		<span class="iconfont icon-trash" @click.stop="deleteUrl"></span>
				  	</div>
				  	<img :src="form.url">
				  </div> -->
				  <i class="el-icon-upload"></i>
				  <div class="el-dragger__text"><em>点击上传封面</em></div>
				  <div class="el-upload__tip" slot="tip">
				  	<p style="line-height: 21px;">
				  		<span class="iconfont icon-warn-copy"></span>请上传分辨率为960×540的图片,大小不要超过2M
				  	</p>
				  </div>
				</tx-upload>
            </el-form-item>
            <el-form-item label="上课地址" prop="city" class="item-4">
            	<region mode="city" ref="region" @selectcity="selectCity"></region>
            </el-form-item>
            <el-form-item class="item-5" prop="address">
            	<el-input v-model="form.address" auto-complete="off" placeholder="详细地址"></el-input>
            </el-form-item>
            <el-form-item label="开班日期" prop="startDate" class="item-6">
            	 <el-date-picker type="date" placeholder="选择开班日期" v-model="form.startDate" style="width: 100%;"></el-date-picker>
            </el-form-item>
            <span>--</span>
            <el-form-item label="结束日期" prop="endDate" class="item-7">
            	 <el-date-picker type="date" placeholder="选择结束日期" v-model="form.endDate" style="width: 100%;"></el-date-picker>
            </el-form-item>
            <el-form-item label="报名截止日期" prop="closingDate" class="item-8">
            	 <el-date-picker type="date" placeholder="选择报名截止日期" 
            	 	v-model="form.closingDate" style="width: 100%;">
            	 </el-date-picker>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
	        <el-button @click.native="close">取 消</el-button>
	        <el-button type="primary" @click.native.prevent="handleSubmit">确 定</el-button>
        </span>
    </el-dialog>
</template>
<script>
	import Region from '../../../common/components/region/index.vue';
	import {classAdd, classUpdate, fuzzyQuery, classDetail} from '../request';
	import $ from 'jquery';
	export default {
		props: {
			id: null
		},
		data() {
			var checkName = (rule, value, callback) => {
				if (value.length > 30) {
					callback(new Error('班级名称不能超过30个字符'));
				} else {
					callback();
				}
			}
			var checkPeriods = (rule, value, callback) => {
				var periods = parseInt(value, 10);
				if (!Number.isInteger(periods)) {
		            callback(new Error('请输入数字值'));
		        } else {
		        	callback();
		        }
			}
			return {
				visiable: true,
				lessonOptions: [],
				form: {
					className: '',
					periods: undefined,
					courses: [],
					address: '',
					startDate: '',
					endDate: '',
					closingDate: '',
					provName: '',
					city: '',
					url: '',
					cityId: 0
				},
				rules: {
					className: [
						{ required: true, message: '请输入班级名称', trigger: 'blur'},
						{ validator: checkName}
					],
					periods: [
						{ required: true, validator: checkPeriods}
					],
					courses: [
						{ type: 'array', required: true, message: '请至少选择一个课程', trigger: 'change'}
					],
					city: [
						{
						  required: true, message: '城市必选', trigger: 'change'
						}
					],
					address: [
						{ required: true, message: '详细地址必填', trigger: 'blur'}
					],
					startDate: [
						{ type: 'date', required: true, message: '请输入开班日期', trigger: 'change'}
					],
					endDate: [
						{ type: 'date', required: true, message: '请输入结束日期', trigger: 'change'}
					],
					closingDate: [
						{ type: 'date', required: true, message: '请输入报名截止日期', trigger: 'change'}
					]
				},
				regionData: {
	                province: '',
	                city: '',
	                district: '',
	                areaId: 0
	            }
			}
		},
		created() {
			if (this.id) {
				this.getClazzDetail();
			}
			this.getLessonOptions();
		},
		watch: {
			visiable(val) {
				if (!val) {
					this.$emit('closedialog');
				}
			}
		},
		computed: {
			title() {
				return this.id ? '编辑班级' : '新增班级';
			}
		},
		components: {
			Region: Region
		},
		methods: {
			uploadSuccess(file) {
				console.log(file);
				this.form.url = file.response.data.url;
			},
			uploadFail(err, file) {
				toast('error', err.msg);
				//console.log(file);
			},
			getClazzDetail() {
				classDetail({
					classId: this.id
				})
					.then((res) => {
						this.form.className = res.data.className;
						this.form.periods = res.data.periods;
						this.form.courses = this.mapCourses(res.data.courses);
						this.form.address = res.data.address;
						this.form.startDate = Date.parseFormatted(res.data.startTime, 'yyyy-MM-dd');
						this.form.endDate = Date.parseFormatted(res.data.endTime, 'yyyy-MM-dd');
						this.form.closingDate = new Date(res.data.cutTime);
						this.form.provName = res.data.provName;
						this.form.city = res.data.cityName;
						this.form.cityId = res.data.cityId;
						this.form.url = res.data.url;
						if (this.form.url) {
							this.$refs.upload.setImage(this.form.url);
						}
						this.$refs.region.setProvinceAndCity({
							province: this.form.provName,
							city: this.form.city,
							areaId: this.form.cityId
						})
					})
			},
			mapCourses(courses) {
				let res = [];
				if (courses instanceof Array) {
					courses.forEach((item) => {
						res.push(item.id);
					})
				}
				return res;
			},
			getLessonOptions() {
				let params = {
					type: 0
				}
				fuzzyQuery(params)
					.then((res) => {
						
						this.lessonOptions = res.data;
					})
			},
			checkParams() {
				let params = {};
				params.className = $.trim(this.form.className);
				params.periods = this.form.periods;
				params.courses = this.form.courses;
				params.provName = this.regionData.province;
				params.cityName = this.regionData.city;
				params.cityId = this.regionData.areaId;
				params.address = this.form.address;
				params.startTimeStr = this.form.startDate.toFormattedString('yyyy-MM-dd');
				params.endTimeStr = this.form.endDate.toFormattedString('yyyy-MM-dd');
				params.cutTime = this.form.closingDate.getTime();
				params.url = this.form.url;
				return params;
			},
			addClass() {
				let params = this.checkParams();
				this.$store.dispatch('showLoading');
				classAdd(params)
					.then((res) => {
						toast('success', '新增班级成功');
						setTimeout(() => {
							this.$emit('refresh');
							this.visiable = false;
						}, 1000);
					})
					.always(() => {
						this.$store.dispatch('hideLoading');
					})

			},
			updateClass() {
				let params = this.checkParams();
				params.classId = this.id;
				this.$store.dispatch('showLoading');
				classUpdate(params)
					.then((res) => {
						toast('success', '更新班级信息成功');
						setTimeout(() => {
							this.$emit('refresh');
							this.visiable = false;
						}, 1000);
					})
					.always(() => {
						this.$store.dispatch('hideLoading');
					})
			},
			deleteUrl(img) {
				this.form.url = '';
			},
			selectCity(val) {
				this.regionData = val;
				this.form.city = this.regionData.city;
				this.form.cityId = this.regionData.areaId;
				this.form.provName = this.regionData.province;
			},
			close() {
				this.visiable = false;
			},
			handleSubmit() {
				this.$refs.form.validate((valid) => {
					if (valid) {
						if (this.id) {
							this.updateClass();
						} else {
							this.addClass();
						}
					} else {
						return false;
					}
		        });
			}

		}

	}
</script>