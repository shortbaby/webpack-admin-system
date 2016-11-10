<template>
  <div class="el-autocomplete" v-clickoutside="handleBlur">
    <el-input v-model="query"
      :disabled="disabled"
      :placeholder="placeholder"
      :name='name'
      @onfocus="handleFocus"
      @keydown.up.native="highlight(highlightedIndex - 1)"
      @keydown.down.native="highlight(highlightedIndex + 1)"
      @keydown.enter.native="select(highlightedIndex)"
    ></el-input>
    <transition name="md-fade-bottom">
      <ul
        v-if="suggestionVisible"
        class="el-autocomplete__suggestions"
        :class="{ 'is-loading': loading }"
        ref="suggestions"
      >
        <li v-if="loading"><i class="el-icon-loading"></i></li>
        <template v-for="(item, index) in suggestions" v-else>
          <li
            v-if="!customItem"
            :class="{'highlighted': highlightedIndex === index}"
            :key="item.id"
            @click="select(index)"
          >
            {{item.value}}
          </li>
          <component
            v-else
            :class="{'highlighted': highlightedIndex === index}"
            @click="select(index)"
            :is="customItem"
            :item="item"
            :index="index"
            :key="item.id">
          </component>
        </template>
      </ul>
    </transition>
  </div>
</template>
<script>
  export default {
    name: 'TxSuggest',
    props: {
      placeholder: String,
      disabled: Boolean,
      name: String,
      value: String,
      fetchSuggestions: Function,
      triggerOnFocus: {
        type: Boolean,
        default: true
      },
      customItem: String
    },
    created() {
      if (this.value) {
        this.query = value;
      }
    },
    data() {
      return {
        suggestAble: false,
        query: '',
        suggestions: [],
        suggestionVisible: false,
        loading: false,
        highlightedIndex: -1,
        timer: null
      };
    },
    watch: {
      value(val) {
        this.suggestAble = false;
        this.query = val;
      },
      query(val) {
        if(this.timer){
           clearTimeout(this.timer);
        }
        this.timer = setTimeout(() => {
          this.showSuggestions(val);
        }, 200);
      }
    },
    methods: {
      handleChange(value) {
        this.$emit('input', value);
        this.showSuggestions(value);
      },
      handleFocus() {
        this.suggestAble = true;
        if (this.triggerOnFocus) {
          this.showSuggestions(this.query);
        }
      },
      handleBlur() {
        this.hideSuggestions();
      },
      select(index) {
        if (this.suggestions && this.suggestions[index]) {
          this.$emit('input', this.suggestions[index].value);
          this.$emit('select', this.suggestions[index]);
          this.$nextTick(() => {
            this.query = this.suggestions[index].name;
            this.suggestAble = false;
            this.hideSuggestions();

          });
        }
      },
      hideSuggestions() {
        this.suggestionVisible = false;
        this.suggestions = [];
        this.loading = false;
      },
      showSuggestions(value) {
        if (!this.suggestAble) {
            return;
        }
        this.suggestionVisible = true;
        this.loading = true;
        this.fetchSuggestions(value, (suggestions) => {
          this.loading = false;
          if (Array.isArray(suggestions) && suggestions.length > 0) {
            this.suggestions = suggestions;
          } else {
            this.hideSuggestions();
          }
        });
      },
      highlight(index) {
        if (!this.suggestionVisible || this.loading) { return; }
        if (index < 0) {
          index = 0;
        } else if (index >= this.suggestions.length) {
          index = this.suggestions.length - 1;
        }

        var elSuggestions = this.$refs.suggestions;
        var elSelect = elSuggestions.children[index];
        var scrollTop = elSuggestions.scrollTop;
        var offsetTop = elSelect.offsetTop;

        if (offsetTop + elSelect.scrollHeight > (scrollTop + elSuggestions.clientHeight)) {
          elSuggestions.scrollTop += elSelect.scrollHeight;
        }
        if (offsetTop < scrollTop) {
          elSuggestions.scrollTop -= elSelect.scrollHeight;
        }

        this.highlightedIndex = index;
      }
    }
  };
</script>
