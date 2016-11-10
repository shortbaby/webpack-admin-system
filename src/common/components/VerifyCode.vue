<!--
    @file VerifyCode 验证码组件
    @author xuguanlong
-->
<template>
    <div id="verify-code" v-show="show" >
        <div class="form-li">
            <input type="text" class="code" name="verifycode" v-model="code" placeholder="请输入验证码" :class="{'error': check}">
            <a class="code-wrap" @click="refreshCode()">
                <img v-bind:src="codeUrl">
                <span>点击刷新验证码</span>
            </a>
        </div>
  </div>
</template>

<script>
    export default {
        props: {
            code: {
                type: String
            },
            show: {
                type: Boolean
            },
            check: {
                type: Boolean
            },
            mobile: {
                type: String
            }
        },
        computed: {
            codeUrl () {
                return 'www';
            }
        },
        methods: {
            refreshCode() {
                //dispatch('CHANGE_CODE_URL');
            }
        }
    }
</script>
