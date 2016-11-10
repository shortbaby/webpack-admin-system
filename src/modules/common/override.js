
export default function (Vue) {

  const {
    extend,
    isArray,
    defineReactive
  } = Vue.util;

    // override Vue's init and destroy process to keep track of router instances
    const init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
        options = options || {};
        const root = options._parent || options.parent || this;
        const $TX_AUTH = root.$TX_AUTH;

        if ($TX_AUTH) {
            // expose router
            /* istanbul ignore if */
            if (this._defineMeta) {
                // 0.12
                this._defineMeta('$TX_AUTH', $TX_AUTH);
            } else {
                // 1.0
                defineReactive(this, '$TX_AUTH', $TX_AUTH);
            }
        }
        init.call(this, options)
    };

  const destroy = Vue.prototype._destroy;
  Vue.prototype._destroy = function () {
    destroy.apply(this, arguments)
  }
}