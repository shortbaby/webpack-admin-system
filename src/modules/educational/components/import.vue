<!--
	@file 班级-导入班级
	@author xuguanlong
-->

<template>
	<el-dialog title="导入班级" v-model="visiable" class="upload-dialog">
		<div>
			<ul class="upload-progress">
				<li class="num active">
					<span>1</span>
				</li>
				<li class="progress-item">
					<span v-if="scene=='upload'"></span>
					<span v-if="scene=='process' || scene=='complete'" class="full"></span>
				</li>
				<li class="num" :class="{active: scene=='process' || scene=='complete'}"><span>2</span></li>
				<li class="progress-item">
					<span v-if="scene=='process'"></span>
					<span v-if="scene=='complete'" class="full"></span>
				</li>
				<li class="num" :class="{active:scene=='complete'}"><span>3</span></li>
			</ul>
			<ul class="step">
				<li>上传文档</li>
				<li>导入数据</li>
				<li>完成</li>
			</ul>
			<ul class="upload-notice" v-if="scene=='upload'">
				<li>
					<div>
						<span>1.</span>
						<span>按要求填写模版文件</span>
						<a download="线索导入模板" href="http://file.gsxservice.com/0baijiatools/f02c6aa7f436d8003435ae7d52e35810/线索导入模板.xlsx">下载线索模板文件</a>
					</div>
					<ol class="upload-body">
						<li>模板中的表头名称不可更改，顺序不能更改，表头不能删除</li>
						<li>姓名、手机号为必填项</li>
					</ol>
				</li>
				<li>
					<div>
						<span>2.</span>
						<span>按要求填写模板文件</span>
					</div>
					<div class="upload-body">
						<p>说明：姓名+手机号重复视为重复数据,姓名、手机号为必填项</p>
						<ul class="import-type-select">
							<li>
								<label>
									 <el-radio class="radio" v-model="importType" label="1">覆盖导入</el-radio>
  
								<!-- <input type="radio" name="importType" value="1" v-model="importType">覆盖导入 -->
								</label>
							</li>
							<li>
								<label>
									<el-radio class="radio" v-model="importType" label="0">不覆盖重复数据不导入</el-radio>
								<!-- <input type="radio" name="importType" value="0" v-model="importType">不覆盖重复数据不导入 -->
								</label>
							</li>
						</ul>
					</div>
				</li>
				<li>
					<div>
						<span>3.</span>
						<span>选择需要导入的文件，并开始导入</span>
					</div>
					<div class="upload-body">
						<div v-if="!fileName">
								<upload v-on:onFileChange="onFileChange" key="importFile" tip="文件大小不能超过4M" :multiple="false" accept="text/csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet">
									<div><span class="btn btn-primary">点击选取文件</span></div>
								</upload>
						</div>

						<div v-if="fileName">
							<ul>
								<li class="file-name">
									{{ fileName }}
									<span class="icon-times" title="删除文件" @click.stop="removeFile"></span>
								</li>
							</ul>
						</div>
					</div>
				</li>
			</ul>
			<ul class="process-progress" v-if="scene=='process'">
				<li><span :style="'width:' + processProgress + '%'">&nbsp;</span></li>
			</ul>

			<ul class="complete" v-if="scene=='complete'">
				<li>
					<span>本次导入数据共</span>
					<span >{{ processStatus.totalCount }}</span>
					<span>条</span>
				</li>
				<li>
					<span>成功导入数据</span>
					<span class="brand">{{ processStatus.successCount }}</span>
					<span>条</span>
				</li>
				<li>
					<span>错误数据</span>
					<span class="text-danger">{{ processStatus.failCount }}</span>
					<span>条</span>
				</li>
				<li>
					<span>重复数据</span>
					<span class="text-repeat">{{ processStatus.repeatCount }}</span>
					<span>条</span>
				</li>
				<!-- <li class="complete-sign">
					<span class="icon-chenggong"></span>导入完成
				</li> -->
			</ul>
	  	</div>
	  	<span slot="footer" class="dialog-footer">
	  		<div v-if="scene=='upload'">
	  			<el-button type="primary" @click.native.stop="uploadFile($event)">开始上传</el-button>
	  			<!-- <button @click.stop="uploadFile($event)" class="btn btn-primary">开始上传</button> -->
	  		</div>

	  		<div v-if="scene=='process'">
	  			<el-button type="primary" @click.native.stop="reUpload()" >
	  				重新上传
	  			</el-button>
	  		</div>

	  		<div v-if="scene=='complete'">
	  			<el-button @click.native.stop="exportError()" 
	  				v-if=" processStatus.totalCount != processStatus.successCount ">
	  				开始上传
	  			</el-button>
	  			<el-button type="primary" @click.native.stop="complete()">完成</el-button>
	  		</div>
        </span>
	</el-dialog>
</template>

<script>
	import ImportMixins from './importMixins';

	export default {
		mixins: [ImportMixins]
	}
</script>