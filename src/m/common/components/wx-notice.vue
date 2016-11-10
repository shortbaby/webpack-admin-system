<template>
	<div class="notice-detail">
		<h3>{{msg.title}}</h3>
		<p class="time">{{msg.msgTime}}</p>
		<p class="content">{{msg.content}}</p>
		<div>
			<img :src="item" v-for="item in msg.urls">
		</div>	
	</div>
</template>
<script>
	let compressImage = require('../../../common/plugin/compressImage');
	import {getMsgDetail} from '../request';
	import getUrlSearch from '../../../common/function/getUrlSearch';
	export default {
		data() {
			return {
				msg: {
					urls: []
				}
			}
		},
		created(){
			let search = getUrlSearch();
			let param = search.param;
			getMsgDetail({
				param: param
			})
				.then((res) => {
					this.msg = res.data;
					if (this.msg.urls.length > 0) {
						this.msg.urls = this.msg.urls.split(',');
						this.msg.urls.forEach((item) => {
							item = compressImage(item, {
								width: 100,
								height: 100
							})
						})
					}
				})
		}
	}
</script>