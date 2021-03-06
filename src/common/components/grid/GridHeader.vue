<template>
  <div></div>
</template>

<style>
</style>

<script>
  import Vue from 'vue';
  export default {
    props: {
      cols: {},
      fixed: {}
    },
    data() {
      return {
        columns: {}
      }
    },
    created() {
      let columns = this.$options.cols.slice(0);
      let columnsMap = {};
      let hasColumnGroup = false;

      columns.forEach((column) => {
        if (column.isColumnGroup) {
          let childColumns = column.columns;
          childColumns.forEach(function(childColumn) {
            columnsMap[childColumn.id] = childColumn;
          });

          hasColumnGroup = true;
        }
        columnsMap[column.id] = column;
      });

      this.columnsMap = columnsMap;

      let rowTemplate = '';
      let colgroupsTemplate = '';

      if (hasColumnGroup) {
        let rows = [ columns, [] ];
        columns.forEach(function(column) {
          if (column.isColumnGroup) {
            rows[1].push.apply(rows[1], column.columns);

            colgroupsTemplate += `<colgroup name="${column.id}">`;

            column.columns.forEach(function(childColumn) {
              colgroupsTemplate += `<col name="${childColumn.id}" width="${childColumn.realWidth}" />`;
            });

            colgroupsTemplate += '</colgroup>';
          } else {
            colgroupsTemplate += `<colgroup name="${column.id}" width="${column.realWidth}"></colgroup>`;
          }
        });

        rows.forEach((columns, rowIndex) => {
          rowTemplate += '<tr>';

          columns.forEach((column) => {
            let columnId = column.id;
            let columnTemplate = column.headerTemplate || `{{ columnsMap['${columnId}'].label }}`;

            if (column.isColumnGroup) {
              let childColumns = column.columns;

              rowTemplate += `<th class="${columnId} d-grid-columngroup" colspan="${childColumns.length}"><div>{{ columnsMap['${columnId}'].label }}</div></th>`;
            } else {
              rowTemplate += `<th ${rowIndex === 0 ? 'rowspan="2"' : ''} @mousemove="handleMouseMove($event, columnsMap['${columnId}'])" @mouseout="handleMouseOut"
                @mousedown="handleMouseDown($event, columnsMap['${columnId}'])" @click="$parent.handleHeaderClick(columnsMap['${columnId}'], $event)"
                class="${columnId} {{ columnsMap['${columnId}'].direction }}" ><div>${ columnTemplate }</div><i class="sort-caret"></i></th>`;
            }
          });

          if (rowIndex === 0 && !this.$options.fixed) {
            rowTemplate += `<th class="gutter" rowspan="2" :style="{ width: (this.$parent.showVertScrollbar ? this.$parent.gutterWidth : 0) + 'px' }">&nbsp;</th>`;
          }

          rowTemplate += '</tr>';
        });

        this.$options.template = colgroupsTemplate + '<thead>' + rowTemplate + '</thead>';
      } else {
        columns.forEach((column) => {
          let columnId = column.id;
          let columnTemplate = column.headerTemplate || `{{ columnsMap['${columnId}'].label }}`;

          colgroupsTemplate += `<colgroup name="${column.id}" width="${column.realWidth}"></colgroup>`;

          rowTemplate += `<th onselectstart="return false" @mousemove="handleMouseMove($event, columnsMap['${columnId}'])" @mouseout="handleMouseOut"
            @mousedown="handleMouseDown($event, columnsMap['${columnId}'])" @click="$parent.handleHeaderClick(columnsMap['${columnId}'], $event)"
            class="${columnId} {{ columnsMap['${columnId}'].direction }}" ><div>${ columnTemplate }</div><i class="sort-caret"></i></th>`;
        });

        if (!this.$options.fixed) {
          rowTemplate += `<th class="gutter" :style="{ width: (this.$parent.showVertScrollbar ? this.$parent.gutterWidth : 0) + 'px' }">&nbsp;</th>`;
        }

        this.$options.template = colgroupsTemplate + '<thead><tr>' + rowTemplate + '</tr></thead>';
      }

      this.columns = columns;
      this.fixed = this.$options.fixed;
    },

    methods: {
      updateColGroup() {
        if (!this.$el) return;
        let columnsMap = this.columnsMap;
        let update = function(groupEl) {
          let name = groupEl.getAttribute('name');
          let columnConfig = columnsMap[name];
          if (columnConfig && !columnConfig.isColumnGroup) {
            groupEl.setAttribute('width', columnsMap[name].realWidth);
          }
        };
        let colGroups = [].slice.call(this.$el.querySelectorAll('colgroup'), 0);
        let cols = [].slice.call(this.$el.querySelectorAll('col'), 0);

        colGroups.forEach(update);
        cols.forEach(update);
      },

      handleMouseDown(event, column) {
        if (this.dragReadyColumn) {
          this.dragging = true;

          this.$parent.resizeProxyVisible = true;

          var gridEl = this.$parent.$el;
          var gridLeft = gridEl.getBoundingClientRect().left;
          var columnEl = this.$el.querySelector(`th.${column.id}`);
          var columnRect = columnEl.getBoundingClientRect();
          var minLeft = columnRect.left - gridLeft + 30;
          $(columnEl).addClass('noclick');

          this.dragState = {
            startMouseLeft: event.clientX,
            startLeft: columnRect.right - gridLeft,
            startColumnLeft: columnRect.left - gridLeft,
            gridLeft: gridLeft
          };

          let resizeProxy = this.$parent.$refs['resize-proxy'];
          resizeProxy.style.left = this.dragState.startLeft + 'px';

          document.onselectstart = function() { return false; };
          document.ondragstart = function() { return false; };

          let mousemove = (event) => {
            var deltaLeft = event.clientX - this.dragState.startMouseLeft;
            var proxyLeft = this.dragState.startLeft + deltaLeft;

            resizeProxy.style.left = Math.max(minLeft, proxyLeft) + 'px';
          };

          let mouseup = () => {
            if (this.dragging) {
              var finalLeft = parseInt(resizeProxy.style.left, 10);
              var columnWidth = finalLeft - this.dragState.startColumnLeft;
              column.width = column.realWidth = columnWidth;

              Vue.nextTick(() => {
                this.$parent.$calcColumns();
              });

              document.body.style.cursor = '';
              this.dragging = false;
              this.dragReadyColumn = null;
              this.dragState = {};

              this.$parent.resizeProxyVisible = false;
            }

            document.removeEventListener('mousemove', mousemove);
            document.removeEventListener('mouseup', mouseup);
            document.onselectstart = null;
            document.ondragstart = null;

            setTimeout(function() {
                $(columnEl).removeClass('noclick');
            }, 0);
          };

          document.addEventListener('mousemove', mousemove);
          document.addEventListener('mouseup', mouseup);
        }
      },

      handleMouseMove(event, column) {
        let target = event.target;
        if (!column || !column.resizable) return;

        if (!this.dragging) {
          let rect = target.getBoundingClientRect();

          if (rect.right - event.pageX < 8) {
            document.body.style.cursor = 'e-resize';
            this.dragReadyColumn = column;
          } else if (!this.dragging) {
            document.body.style.cursor = '';
            this.dragReadyColumn = null;
          }
        }
      },

      handleMouseOut() {
        document.body.style.cursor = '';
      }
    },

    data() {
      return {
        dragReadyColumn: false,
        dragging: false,
        dragState: {},
        columnsMap: null
      };
    }
  };
</script>