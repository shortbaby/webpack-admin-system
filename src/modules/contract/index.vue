<template>
	<div class="contract_wrap">
         <div class="bread-navs">
            <el-breadcrumb separator=".">
                <el-breadcrumb-item v-for="item in breadOptions" 
                    @click.native="click(item)">
                    {{item.name}}
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <transition name="fade" mode="out-in">
            <router-view></router-view>
        </transition>
	</div>
</template>
<script>
    
    export default {
        methods: {
            click(item) {
                window.router.push(item.path);
            }
        },
        
        computed: {
            breadOptions() {
                return this.$store.state.breadCrumbs;
            }
        }
    }
</script>

<style lang="sass">
</style>