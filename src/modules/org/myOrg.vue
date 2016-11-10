<!--
	@file 我的机构
	@author xujin
-->
<template>
	<div style="position: relative;">
		<div class="bread-navs">
            <el-breadcrumb separator=".">
                <el-breadcrumb-item v-for="item in breadOptions" 
                    @click.native="click(item)">
                    {{item.name}}
                </el-breadcrumb-item>
            </el-breadcrumb>
    	</div>
    	<transition name="slide-down">
	     	<div v-show="!showAddClass">
	    		<transition name="slide-right">
			    	<org-detail 
			    		v-if="showOrg"
			    		:id="selectId" 
			            v-on:hide="hideDetail"
			            :type="my"> 
			        </org-detail>
			    </transition>
				<transition name="slide-down">
					<div class="org-wrap" v-show="!showOrg">
						<ul class="org-tab clearfix">
							<li :class="{current: isFirst}" @click="changeTabs('first')">
								已生效<!-- <router-link :to="{name: 'effective'}">已生效</router-link> -->
							</li>
							<li :class="{current: isSecond}" @click="changeTabs('second')">
								未生效<!-- <router-link :to="{name: 'uneffective'}">未生效</router-link> -->
							</li>
						</ul>
						<div style="position:relative;">
							<transition name="slide-down">
								<!-- <router-view v-on:show="showDetail"></router-view> -->	
								<component :is="currentView" v-on:show="showType" :type="my"></component>
							</transition>
						</div>
						
					</div>
				</transition>	   			    	
    		</div>
    	</transition>
		<transition name="slide-right">
			<add-class v-if="showAddClass" v-on:hide="hideClass()" :id="orgId" :type="my"></add-class>
		</transition>
	</div>
</template>

<script>
	import orgDetail from './components/orgDetail.vue';
	import uneffective from './components/unEffective.vue';
	import effective from './components/orgEffective.vue';
	import addClass from './components/addClass.vue';
	export default {
		data() {
			return {
				isFirst: true,
				isSecond: false,
				showOrg: false,
				selectId: 0,
				currentView: 'effective',
				showAddClass: false,
				orgId: 0,
				my:'my'
			}
		},
		created () {
		},
		methods: {
			changeTabs(type) {
				if (type == 'first') {
					this.isSecond = false;
					this.isFirst = true;
					this.currentView = 'effective';
					//router.push({ name: 'effective' });
				}
				if (type == 'second') {
					this.isFirst = false;
					this.isSecond = true;
					this.currentView = 'uneffective';
					//router.push({ name: 'uneffective' });
				}
			},
			/**
			 * 显示机构详情页面
			 */
			showType(type, id) {
				if (type == 'detail') {
					this.showOrg = true;
					this.selectId = id;
				}
				if (type == 'class') {
					this.showAddClass = true;
					this.orgId = id;
				}
				
			},
			/**
			 * 关闭机构详情页面
			 */
            hideDetail() {
            	this.showOrg = false;
            },
            /**
			 * 关闭报班页面
			 */
            hideClass() {
            	this.showAddClass = false;
            },
			click(item) {
                window.router.push(item.path);
            }
        },
        computed: {
            breadOptions() {
                return this.$store.state.breadCrumbs;
            }
        },
		components: {
			orgDetail: orgDetail,
			effective: effective,
			uneffective: uneffective,
			addClass: addClass
		}
	}
	
</script>
<style lang="sass">
	.org-wrap {
		padding: 25px;
		.org-tab {	
			> li {
				float: left;
				background-color: #e6e6e6;
				height: 40px;
				font-size: 14px;
				width: 120px;
				line-height: 40px;
				text-align: center;
				border-radius: 0 5px 5px 0;
				cursor: pointer;
				&:first-child {
					border-radius: 5px 0 0 5px;
				}
			}
			.current {
				background-color: #fcba47;
				color: #fff;
			}
		}
	}
</style>