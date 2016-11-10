<template>
	<div id="app">
		<transition name="slide-formright">
			<router-view></router-view>
		</transition>
	</div>
</template>
<script>
	import getUrlSearch from '../../common/function/getUrlSearch';
	export default {
		created() {
			let query = getUrlSearch();
			if (query.openId) {
				this.$store.dispatch('setOpenId', query.openId);
			}
		}
	}
</script>