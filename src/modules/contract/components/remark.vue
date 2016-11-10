<template>
	<div class="remark-info">
		<div class="info-head">
			<span>备注</span>
			<span class="tip" v-if="data.relevancerName">
				{{data.relevancerPositon}}-{{data.relevancerName}} {{data.relevanceTime | date('yyyy.MM.dd')}}
			</span>
		</div>
		<div class="info-panel">
			<p>
				{{data.remark}}
			</p>
		</div>
	</div>
</template>
<script>
	export default {
		props: {
			data: {
				type: Object
			}
		}
	}
</script>