<template>
	<div id="app" v-txloading.fullscreen="loading">
		<side-bar></side-bar>
        <div id="main" class="main">
            <el-popover
              ref="msgPopover"
              placement="bottom-end"
              width="280"
              trigger="click"
              class="msg-popover">
              <div class="quick-message-wrap">
                  <p class="t-p">您有{{newCount}}条新消息</p>
                  <div v-if="messageList.length == 0">
                      暂无新消息
                  </div>
                  <ul>
                      <li v-for="item in messageList">
                          <p>{{item.messageInfo.content}}</p>
                          <p><span></span></p>
                      </li>
                  </ul>
                  <p class="bottom" @click="toList">查看所有消息 <span class="iconfont icon-arrowright"></span></p>
              </div>
            </el-popover>
            <ul class="top-nav">
                <li class="message" v-popover:msgPopover>
                    <span class="iconfont icon-message"></span>
                    <span class="badge" v-if="newCount">{{newCount}}</span>
                </li>
                <li class="brandlogo">
                </li>
                <li class="user-info">
                    <div class="logo-wrap"></div>
                    <img width="40" height="40" class="logo" :src="user.headurl">
                    <el-dropdown trigger="click">
                      <span class="el-dropdown-link dropdown-link">
                        {{user.name}}<i class="iconfont icon-down"></i>
                      </span>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                </li>
            </ul>
            <div class="main-content"> 
            	<transition name="fade" mode="out-in">
            	   <router-view></router-view>
            	</transition>

            </div>
        </div>
	</div>
</template>
<script>
	import SideBar from './common/components/SideBar.vue';
    import {queryNewBell, getUserInfo} from './request';
	export default {
		name: 'app',
        data() {
            return {
                timer: null,
                user: {},
                messageList: []
            }
        },
        computed: {
            newCount() {
                if (this.messageList.length == 0) {
                    return '';
                } else if (this.messageList.length > 0 && this.messageList.length < 100) {
                    return this.messageList.length;
                } else {
                    return '99+'
                }
            },
            loading() {
                return this.$store.state.loading;
            }
        },
        created() {
            getUserInfo()
                .then((res) => {
                    this.user = res.data;
                })
        },
        methods: {
            toList() {
                this.$router.push('/message/list');
                this.$refs.msgPopover.showPopper = false;
            },
            logout() {
                window.location.href = "/ac/logout.json";
            },
            getNewMessages() {
                queryNewBell()
                    .then((res) => {
                        this.messageList = res.data;
                    });
            }
        },
        mounted() {
            this.timer = setInterval(() => {
                this.getNewMessages();
            }, 60000);
            this.getNewMessages();
        },
        beforeDestroy() {
            if (this.timer) {
                clearInterval(this.timer);
            }
        },
		components: {
			SideBar: SideBar
		},

	}
</script>