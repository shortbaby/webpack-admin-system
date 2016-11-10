<template>
	<div class="teacher-all-students-wrapper">
		<mt-header title="全部学员人">
		  <router-link to="/classdetail" slot="left">
		    <mt-button icon="back"></mt-button>
		  </router-link>
		</mt-header>
		<ul class="list">
			<li v-for="n in students">
				<img class="avatar" :src="n.pic"/>
				<p class="name">{{n.name}}</p>
				<p class="tel">{{n.mobile}}</p>
			</li>
		</ul>	
		<copyright></copyright>
	</div>
</template>
<script>
	export default {
		data() {
			return {
			}
		},
		computed: {
			students() {
				return this.$store.state.students;
			}
		},
		methods: {
		}
	}
</script>
