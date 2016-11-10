<template>
	<div class="educational-div">
		<transition name="slide-down">
			<div class="educational-schedule" v-show="!showArrangement">
				<div class="top clearfix">
					<span class="iconfont icon-home"></span>
					<span>课表</span>
					<el-button type="primary" @click.native="schedule(0)" v-if="$TX_AUTH[152]">排课</el-button>
				</div>
				<div class="timetable-wrap">
					<div>
						<div class="filter-wrap">
							<span>筛选:</span>
							<el-input placeholder="请输入班级名" style="width: 250px;" class="input-first" v-model="className">
			                    <el-button slot="append" icon="search" @click.native="getLessons"></el-button>
			                </el-input>
			                <region mode="city" :all="true" @selectcity="selectCity"></region>
							<tx-suggest
                              :value="teacherName"
                              :fetch-suggestions="querySearchTeacher"
                              custom-item="my-item"
                              placeholder="请输入老师名称搜索"
                              :trigger-on-focus="true"
                              @select="handleSelectTeacher">
                            </tx-suggest>
				            <el-button-group>
								<el-button type="primary" icon="arrow-left" @click.native="previousWeek">上一周</el-button>
								<el-button type="primary" @click.native="nextWeek">下一周<i class="el-icon-arrow-right el-icon-right"></i></el-button>
								<el-button type="primary" @click.native="currentWeek">本周</el-button>
							</el-button-group>
							<div class="time-txt">
								<span>{{year}}年{{month}}月第{{week}}周</span>
							</div>
						</div>
						<div class="time-table-div">
							<time-table :time="time" v-on:scheduleclass="schedule" v-on:refresh="refresh"></time-table>
						</div>
					</div>
					
				</div>
			</div>
		</transition>
		<transition name="slide-right">
			<arrangement v-if="showArrangement" :time="scheduleTime" v-on:closeArrangement="closeArrangement">
			</arrangement>
		</transition>
	</div>
	
</template>
<script>
	const breadcrumbs = [
        {
            name: '教务管理',
            path: '/educational/classes'
        },
        {
            name:  '排课管理',
            path: '/educational/schedule'
        }
    ];
    import Vue from 'vue';
    import Region from '../../common/components/region/region.vue';
	import TimeTable from './components/TimeTable.vue';
	import getMonthWeek from '../../common/function/getWeek';
	import getDate from '../../common/function/getDate';
	import Arrangement from './components/arrangement.vue';
	import TxSuggest from '../../common/components/TxSuggest.vue';
	import {searchLessons, dropDownList, queryTeacher} from './request';
	Vue.component('my-item', {
        functional: true,
        render: function (h, ctx){
            var item = ctx.props.item;
            return h('li', ctx.data, [
                h('div', { attrs: { class: 'name' } }, [item.name]),
            ]);
        },
        props: {
          item: { type: Object, required: true }
        }
    });
	export default {

		name: 'schedule',
		created() {
			this.time = new Date();
			this.calcDate();
			this.getLessons();
			//this.getOrgCities();
		},
		mounted() {
			this.$store.dispatch('updateBreadNavs', breadcrumbs);
		},
		data() {
			return {
				orgCities: null,
				time: new Date(),
				teacher: null,
				teacherName: '',
				className: '',
				cityId: 0,
				scheduleTime: 0,
				teacherId: '',
				year: 0,
				month: 0,
				week: 0,
				showArrangement: false,
				teacherOptions: []
			}
		},
		computed: {
			startTime() {
				let nowDay = this.time.getDay();
               	let d = null;
                if (nowDay === 0) {
                   	d = getDate(this.time, -6);
                } else {
                    d = getDate(this.time, 1 - nowDay);
                }
                return d.getTime();
			},
			endTime() {
				let nowDay = this.time.getDay();
               	let d = null;
                if (nowDay === 0) {
                   	d = this.time;
                } else {
                    d = getDate(this.time, 7 - nowDay);
                }
                return d.getTime();
			}
		},
		watch: {
			cityId(val) {
			},
			time(val) {
				this.calcDate();
				this.getLessons();
			}
		},
		methods: {
			getOrgCities() {

			},
			refresh() {
				this.getLessons();
			},
			getLessons() {
				let params = {};
				if (this.className) {
					params.className = this.className;
				}
				if (this.cityId) {
					params.cityIds = this.cityId;
				}
				if (this.teacher) {
					params.teacherIds = this.teacher.id;
				}
				params.startTime = this.startTime;
				params.endTime = this.endTime;

				this.$store.dispatch('showLoading');

				searchLessons(params)
					.then((res) => {
						this.$store.dispatch('setScheduleLessons', res.data);
					})
					.always(() => {
						this.$store.dispatch('hideLoading');
					})

			},
			selectCity(val) {
				if (val.areaLevel == 'city') {
					this.cityId = val.areaId;
					this.getLessons();
				} 
			},
			querySearchTeacher(queryString, cb) {
                let params = {
                    key: queryString,
                    pageNum: 1
                }
                queryTeacher(params)
                    .then((res) => {
                        cb(res.data);
                    })
            },
			handleSelectTeacher(item) {
                this.teacher = item;
                this.teacherName = item.name;
                this.getLessons();
            },
			calcDate() {
                this.year = this.time.getFullYear();
                this.month = this.time.getMonth() + 1;
                this.week = getMonthWeek(this.time);
            },
            previousWeek() {
            	this.time = getDate(this.time, -7);
            },
            nextWeek() {
            	this.time = getDate(this.time, 7);
            },
            currentWeek() {
            	this.time = new Date();
            },
            closeArrangement() {
            	this.showArrangement = false;
            	this.getLessons();
            },
			schedule(time) {
				this.scheduleTime = time || 0;
				this.showArrangement = true;
			}
		},
		components: {
			TimeTable,
			Arrangement,
			Region,
			TxSuggest
		}
	}
</script>