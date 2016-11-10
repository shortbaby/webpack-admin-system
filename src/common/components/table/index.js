import ElTable from './src/table';
import ElTableColumn from './src/table-column';
import Vue from 'vue'; 
/* istanbul ignore next */
ElTable.install = function(Vue) {
  Vue.component(ElTable.name, ElTable);
  Vue.component(ElTableColumn.name, ElTableColumn);
};

export default ElTable;
