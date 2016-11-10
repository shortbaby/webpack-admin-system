<template>
	<el-dialog title="添加机构" v-model="show">
		<div class="org-dialog-content">
			<div class="top-tab">
				<el-tabs v-on:tab-click="changeTab">
				    <el-tab-pane label="选择机构" name="selectOrg"></el-tab-pane>
				    <el-tab-pane label="新增机构" name="newOrg"></el-tab-pane>
				</el-tabs>
			</div>
			<transition name="component-fade" mode="out-in">
				<keep-alive>
					<component v-bind:is="view" ref="component" v-on:change="change" v-on:selectOrg="selectOrg"></component>
				</keep-alive>
			</transition>
		</div>
		<span slot="footer" class="dialog-footer">
	        <el-button @click.native="close">取 消</el-button>
	        <el-button type="primary" :disabled="submitting" @click.native.prevent="handleSubmit">确 定</el-button>
        </span>
	</el-dialog>
</template>
<script>
	import SelectOrg from './select-org.vue';
	import NewOrg from './new-org.vue';
	export default {
		data() {
			return {
				show: true,
				view: 'selectOrg',
				submitting: false
			}
		},
		watch: {
			show(val) {
				if(!val) {
					this.$emit('closedialog');
				}
			}
		},
		methods: {
			close() {
				this.show = false;
			},
			handleSubmit() {
				if (this.view == 'selectOrg') {
					this.$emit('addOrg', this.$refs.component.selection);
					this.show = false;
				} else if (this.view == 'newOrg') {
					this.$refs.component.submit();
				}
				
			},
			selectOrg(val) {
				this.$emit('addOrg', val);
				this.show = false;
			},
			change(disable) {
				this.submitting = disable;
			},
			changeTab(val) {
				this.view = val;
			}
		},
		components: {
			SelectOrg,
			NewOrg
		}
	}
</script>