<template>
	<div class="new-org-div">
		<header>机构信息</header>
		<el-form :model="orgform" ref="orgform" :rules="orgrules" class="new-org-form">
            <el-form-item label="机构名称" prop="name" class="item-1">
              <el-input v-model="orgform.name" auto-complete="off" placeholder="请输入机构名称"></el-input>
            </el-form-item>
            <el-form-item label="机构城市" prop="city" class="item-4">
            	<region mode="city" v-on:selectcity="selectCity"></region>
            </el-form-item>
            <el-form-item label="品类" class="item-3">
              <el-select v-model="orgform.category" placeholder="请选择">
			        <el-option
				      	v-for="item in categoryOptions"
				      	:label="item.label"
				      	:value="item.value">
				    </el-option>
			  </el-select>
            </el-form-item>
            <el-form-item label="年收入" class="item-2">
              <el-select v-model="orgform.annualIncome" placeholder="请选择">
				    <el-option
				      	v-for="item in incomeOptions"
				      	:label="item.label"
				      	:value="item.value">
				    </el-option>
			  </el-select>
            </el-form-item>
            <el-form-item label="年利润" class="item-2">
              <el-select v-model="orgform.annualProfit" placeholder="请选择">
			      	<el-option
			      		v-for="item in incomeOptions"
			      		:label="item.label"
			      		:value="item.value">
			      	</el-option>
			  </el-select>
            </el-form-item>
            <el-form-item label="年利润率水平" class="item-3">
              <el-select v-model="orgform.profitRateLevel" placeholder="请选择">
				    <el-option
				      	v-for="item in profitLevelOptions"
				      	:label="item.label"
				      	:value="item.value">
				    </el-option>
			  </el-select>
            </el-form-item>
            <el-form-item label="合伙人/核心管理者数量" class="item-2">
              <el-select v-model="orgform.coreManagers" placeholder="请选择">
			      	<el-option
			      		v-for="item in coreManagersOptions"
			      		:label="item.label"
			      		:value="item.value">
			      	</el-option>
			  </el-select>
            </el-form-item>
            <el-form-item label="中层员工数量" class="item-2">
              <el-select v-model="orgform.middleManagers" placeholder="请选择">
			      	<el-option
			      		v-for="item in middleManagersOptions"
			      		:label="item.label"
			      		:value="item.value">
			      	</el-option>
			  </el-select>
            </el-form-item>
            <el-form-item label="专职导师数量" class="item-3">
              <el-select v-model="orgform.fullTimeTeachers" placeholder="请选择">
			      	<el-option
			      		v-for="item in staffsOptions"
			      		:label="item.label"
			      		:value="item.value">
			      	</el-option>
			  </el-select>
            </el-form-item>
            <el-form-item label="兼职导师数量" class="item-2">
              <el-select v-model="orgform.partTimeTeachers" placeholder="请选择">
			      	<el-option
			      		v-for="item in staffsOptions"
			      		:label="item.label"
			      		:value="item.value">
			      	</el-option>
			  </el-select>
            </el-form-item>
            <el-form-item label="专职员工数量(不含导师)" class="item-2">
              <el-select v-model="orgform.fullTimeStaffs" placeholder="请选择">
			      	<el-option
			      		v-for="item in staffsOptions"
			      		:label="item.label"
			      		:value="item.value">
			      	</el-option>
			  </el-select>
            </el-form-item>
            <el-form-item label="兼职导师数量(不含导师)" class="item-3">
              <el-select v-model="orgform.partTimeStaffs" placeholder="请选择">
			      	<el-option
			      		v-for="item in staffsOptions"
			      		:label="item.label"
			      		:value="item.value">
			      	</el-option>
			  </el-select>
            </el-form-item>
            <el-form-item label="校区数量" class="item-2">
              <el-select v-model="orgform.schools" placeholder="请选择">
			      	<el-option
			      		v-for="item in schoolsOptions"
			      		:label="item.label"
			      		:value="item.value">
			      	</el-option>
			  </el-select>
            </el-form-item>
            <el-form-item label="总教学面积" class="item-2">
              <el-select v-model="orgform.teachingArea" placeholder="请选择">
			      	<el-option
			      		v-for="item in areaOptions"
			      		:label="item.label"
			      		:value="item.value">
			      	</el-option>
			  </el-select>
            </el-form-item>
            <el-form-item label="平均班容量" class="item-3">
              <el-select v-model="orgform.averageCapacity" placeholder="请选择">
			      	<el-option
			      		v-for="item in capacityOptions"
			      		:label="item.label"
			      		:value="item.value">
			      	</el-option>
			  </el-select>
            </el-form-item>
            <el-form-item label="非考试类班级续班率" class="item-2">
              	<el-select v-model="orgform.renewRate" placeholder="请选择课程">
			      	<el-option
			      		v-for="item in renewRateOptions"
			      		:label="item.label"
			      		:value="item.value">
			      	</el-option>
			  	</el-select>
            </el-form-item>
            <el-form-item label="平均满班率" class="item-2">
              	<el-select v-model="orgform.averageFullRate" placeholder="请选择">
			      	<el-option
			      		v-for="item in fullRateOptions"
			      		:label="item.label"
			      		:value="item.value">
			      	</el-option>
			  	</el-select>
            </el-form-item>
            <el-form-item label="机构身份" class="item-1">
              <el-input v-model="orgform.identity" auto-complete="off" placeholder="请输入机构身份"></el-input>
            </el-form-item>      
        </el-form>
        <header>学员信息</header>
        <el-form :model="studentform" ref="studentform" :rules="studentrules" class="new-org-form">
            <el-form-item label="姓名" prop="name" class="item-1">
              	<el-input v-model="studentform.name" auto-complete="off" placeholder="请输入姓名"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="gender" class="item-2">
	            <el-select v-model="studentform.gender" placeholder="请选择">
					<el-option
			      		v-for="item in genderOptions"
			      		:label="item.label"
			      		:value="item.value">
			      	</el-option>
				</el-select>
            </el-form-item>
            <el-form-item label="职务" prop="duty" class="item-2">
              	<el-input v-model="studentform.duty" auto-complete="off" placeholder="请输入职务"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="mobile" class="item-1">
              	<el-input v-model="studentform.mobile" auto-complete="off" placeholder="请输入手机号"></el-input>
            </el-form-item>
            <el-form-item label="出生日期" class="item-2">
            	 <el-date-picker type="date" placeholder="请选择日期" :picker-options="pickerOptions" v-model="studentform.birthday"></el-date-picker>
            </el-form-item>          
            <el-form-item label="邮箱" class="item-2">
	              <el-input v-model="studentform.email" auto-complete="off" placeholder="请输入邮箱"></el-input>
            </el-form-item>
            <el-form-item label="微信号" class="item-1">
              	<el-input v-model="studentform.wechat" auto-complete="off" placeholder="请输入微信号"></el-input>
            </el-form-item>
            <el-form-item label="文化衫尺寸" class="item-2">
              	<el-select v-model="studentform.tShirtSize" placeholder="请选择">
					<el-option
			      		v-for="item in clothSizeOptions"
			      		:label="item.label"
			      		:value="item.value">
			      	</el-option>
				</el-select>
            </el-form-item>
            <el-form-item label="身份证号" class="item-2">
	              <el-input v-model="studentform.identityCard" auto-complete="off" placeholder="请输入身份证号"></el-input>
            </el-form-item>   
        </el-form>
	</div>
</template>
<script>
	import Region from '../../../common/components/region/index.vue';
	import config from '../../org/config';
	import {saveAdd} from '../request';
	import $ from 'jquery';
	let options = config();
	export default {
		data() {
			var checkOrgName = (rule, value, callback) => {
				var val = $.trim(value);
				if (val.length > 20) {
					callback(new Error('机构名称不能超过20个字符'));
				} else if(val.length == 0){
					callback(new Error('请输入非空的机构名称'));
				} else {
					callback();
				}
			};
			var checkCity = (rule, value, callback) => {
				if (this.orgform.cityName) {
					callback();
				} else {
					callback(new Error('城市不能为空'));
				}
			};
			var checkOrgIdentity = (rule, value, callback) => {
				var val = $.trim(value);
				if (val.length > 10) {
					callback(new Error('机构身份不能超过10个字符'));
				} else if(val.length == 0){
					callback(new Error('请输入非空的机构身份'));
				} else {
					callback();
				}
			};
			var checkStudentName = (rule, value, callback) => {
				var val = $.trim(value);
				if (val.length > 20) {
					callback(new Error('学员姓名不能超过20个字符'));
				} else if(val.length == 0){
					callback(new Error('请输入非空的学员姓名'));
				} else {
					callback();
				}
			};
			var checkDuty = (rule, value, callback) => {
				var val = $.trim(value);
				if (val.length > 20) {
					callback(new Error('职务不能超过20个字符'));
				} else {
					callback();
				}
			};
			var checkEmail = (rule, value, callback) => {
				var val = $.trim(value);
				if (val.length > 0) {
						if (!(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(val))) {
						callback(new Error('请输入正确的邮箱'));
					} else {
						callback();
					}
				} else {
					callback();
				}
				
			};
			var checkMoblie = (rule, value, callback) => {
				var val = $.trim(value);
				if (!(/^1[34578]\d{9}$/.test(val))) {
					callback(new Error('请输入正确的手机号'));
				} else {
					callback();
				}
			};
			var checkIdentity = (rule, value, callback) => {
				var val = $.trim(value);
				var reg = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
				if (val.length > 0 && !(reg.test(val))) {
					callback(new Error('请输入正确的身份证号'));
				} else {
					callback();
				}
			};
			return {
				orgform: {
					name: '',
					province: '',
			        cityId: '',
			        cityName: '',
			        category: '',
			        annualIncome: '',
			        annualProfit: '',
			        profitRateLevel: '',
			        coreManagers: '',
			        middleManagers: '',
			        fullTimeTeachers: '',
			        partTimeTeachers: '',
			        fullTimeStaffs: '',
			        partTimeStaffs: '',
			        schools: '',
			        teachingArea: '',
			        averageCapacity: '',
			        renewRate: '',
			        averageFullRate: '',
			        identity: ''
				},
				pickerOptions: {
                  disabledDate(time) {
                    return time.getTime() > Date.now();
                  }
                },
				studentform: {
					name: '',
        			mobile: '',
			        gender: '',
			        duty: '',
			        email: '',
			        wechat: '',
			        tshirtSize: '',
			        identityCard: '',
			        birthday: ''
				},
				orgrules: {
					name: [
						{ required: true, message: '请输入机构名称', trigger: 'blur'},
						{ validator: checkOrgName}
					],
					city: [ { required: true, trigger: 'change', validator: checkCity}
					]
				},
				studentrules: {
					name: [
						{ required: true, message: '请输入姓名', trigger: 'blur'},
						{ validator: checkStudentName}
					],
					gender: [
						{ type:'number', required: true, message: '性别必选', trigger: 'change'}
					],
					mobile: [
						{ required: true, message: '请输入手机号', trigger: 'blur'},
						{ validator: checkMoblie}
					],
					duty: [
						{ validator: checkDuty, trigger: 'blur'}
					],
					email: [
						{
							trigger: 'blur', validator: checkEmail
						}
					],
					identityCard: [
						{
							trigger: 'blur', validator: checkIdentity
						}
					]
				},
				categoryOptions: options.categoryOptions,
				incomeOptions: options.incomeOptions,
				profitLevelOptions: options.profitLevelOptions,
				coreManagersOptions: options.coreManagersOptions,
				middleManagersOptions: options.middleManagersOptions,
				staffsOptions: options.staffsOptions,
				schoolsOptions: options.schoolsOptions,
				areaOptions: options.areaOptions,
				capacityOptions: options.capacityOptions,
				renewRateOptions: options.renewRateOptions,
				fullRateOptions: options.fullRateOptions,
				genderOptions: options.genderOptions,
				clothSizeOptions: options.clothSizeOptions
			}
		},
		methods: {
			selectCity(val) {
				this.orgform.province = val.province;
				this.orgform.cityName = val.city;
				this.orgform.cityId = val.areaId;
			},
			submit() {
				var self = this;
				self.$refs.orgform.validate((org) => {
					var orgValidate = org;
					self.$refs.studentform.validate((student) => {
						if (student && orgValidate) {
							this.save();
						} else {
							return false;
						}
					})
		        });
			},
			save () {
				if (this.studentform.birthday) {
					if (typeof(this.studentform.birthday) == 'object') {
						this.studentform.birthday = this.studentform.birthday.getTime();
					}
				}
				var param = {
					orgBaseInfo: this.orgform
				};

				if (this.type) {
					$.extend(param, {
						studentInfo: this.studentform
					});
				}
				this.$emit('change', true);
				this.$store.dispatch('showLoading');
				saveAdd(param)
					.then((res) => {
						toast('success', '新增机构成功');
						setTimeout(() => {
							$.extend(this.orgform, res.data);
							this.$emit('selectOrg', this.orgform);
						}, 1000);
					})
					.always(() => {
						this.$emit('change', false);
						this.$store.dispatch('hideLoading');
					})
			}
		},
		components: {
			Region
		}
	}
</script>