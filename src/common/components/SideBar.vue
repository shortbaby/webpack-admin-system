<!--
    @file libra 左导
    @author XiaoBin Li(lixiaobin@baijiahulian.com)
-->

<template>
	<div class="nav-menu">
		<div class="left-sidebar">
			<div class="nav-list">
				<ul v-for="item in tabs" :class="{active: item.alias == current}">
					<li @click="getSubMenu(item)" :class="{active: item.alias == current}">
						<span v-bind:class="'iconfont icon-' + item.alias"></span>{{ item.text }}
						<span v-show="item.menus.length > 0" class="iconfont icon-down"></span>
					</li>
					<ul v-show="item.alias == current">
						<li v-for="child in item.menus" :class="{active: currentSubTab.indexOf(child.url) > -1 }" @click="forward(child)">
							<span class="i-circle"></span><a href="javascript:;">{{ child.text }}</a>
						</li>
					</ul>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
	import $ from 'jquery';
	// import sideBarList from '../config/sideBar';
	import {getModules} from '../request';
	const messageSubMenu = {
        "text": "消息中心",
        "alias": "message",
        "menus": [
	        {
	            "text": "消息列表",
	            "url": "/message/list"
	        }
        ]
    }
	export default {
		data () {
			return {
				config: {},
				showSubMenu: false,
				currentSubTab: window.location.hash.slice(1) || '',
				children: [],
				current: '',
				tabs: []
			}
		},
		computed: {
			router() {
				return this.$store.state.router;
			}
		},
		watch: {
			router(val) {
				this.setSideBarState();
			}
		},
		created () {
			this.$store.dispatch('showLoading');
			getModules()
				.then((res) => {
					let currentSubTab = this.$route.path;
					let sideBarList = res.data;
					sideBarList.unshift(messageSubMenu);
					sideBarList.some((item) => {
						let current = '';
						item.menus.some((child) => {
							if (child.url == currentSubTab) {
								this.current = item.alias;
								return;
							}
						});
						return;
					});
					this.tabs = sideBarList;
				})
				.always(() => {
					this.$store.dispatch('hideLoading');
				})
			
			
		},
		methods: {
			setSideBarState() {
				// debugger;
				this.current = this.router.matched[0].name;
				this.currentSubTab = this.router.path;
			},
			getSubMenu (item) {
				this.current = item.alias;
				if (item.menus.length == 0) {
					this.forward(item);
				}
			},
			forward (item) {
				var url = item.url;
				if (url) {
					//this.currentSubTab = url;
					window.router.push(url);
				}
			}
		}
	}
</script>

<style lang="sass">
	.nav-menu {
		height: 100%;
		overflow: hidden;
		float:left;
	}
	.left-sidebar {
		position: fixed;
		margin-top: 50px;
		top: 0;
		left: 0;
		z-index: 11;
		float: left;
	  	background: #393D40;
	  	width: 192px;
	  	height: 100%;
	  	overflow: hidden;
	  	overflow-y: auto;
	  	.nav-list {
	  		color: #FFF;
	  		min-height: 940px;
		  	> ul {
		  		&.active {
		  			background: #292D30;
		  			.icon-down {
		  				transform: rotateZ(180deg);
		  			}
		  		}
				> li {
					padding-left: 38px;
			  		vertical-align: middle;
			  		cursor: pointer;
			  		list-style: none;
					height: 44px;
					line-height: 44px;
					font-size: 14px;
			  		> .iconfont {
						font-size: 20px;
						margin-right: 15px;
						position: relative;
						top: 3px;
			  		}
			  		.icon-down {
			  			transition: transform .5s ease;
			  			float: right;
			  			margin-right: 20px;
			  			font-size: 14px;
			  		}
			  		&.active {
			  			position: relative;
						color: #FFBD47;
			  			&:after {
			  				content: '';
			  				border: 8px solid transparent;
			  				position: absolute;
			  				right: 0;
			  				top: 50%;
			  				-webkit-transform: translate(0, -50%);
			  				-ms-transform: translate(-50%, -50%);
	         				 -o-transform: translate(-50%, -50%);
				            	transform: translate(0, -50%);
			  				width: 0;
			  				height: 0;
			  				border-right-color: #FFF;
		  				}
			  		}
			  		&:not(.active) {
				  		&:hover {
					  		background: #515d6c;
				  		}
			  		}
			  	}
			  	> ul {
			  		position: relative;
			  		> li {
			  			font-size: 14px;
			  			list-style: none;
			  			// border-left: 2px solid #7a8fac;
			  			transition: all .2s ease;
			  			padding-left: 42px;
			  			height: 44px;
			  			line-height: 44px;
			  			.i-circle {
			  				display: inline-block;
			  				border: 1px solid #fff;
			  				width: 8px;
			  				height: 8px;
			  				border-radius: 5px;

			  			}
			  			&.active {
			  				// background: #515d6c;
			  				.i-circle {
			  					border-color: #ffbd47;
			  					background: #ffbd47;
			  				}
			  				// a {
			  				// 	color: #ffbd47;
			  				// }
			  			}
			  			&:hover {
			  				background: #515d6c;
			  			}
						a {
							color: #FFF;
							padding-left: 22px;
							font-size: 14px;
							&:hover {
								text-decoration: none;
							}
						}
					}
			  	}
		  	}
		}
	}
	.sub-item-transition {
		transition: all .1s ease;
	}
	.sub-item-enter, .sub-item-leave {
		opacity: 0;
	}
</style>