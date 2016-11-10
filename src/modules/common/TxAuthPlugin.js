import { getAuth } from './request';
import override from './override';

export default {
    install(Vue) {
        override(Vue);
        Vue.prototype.$TX_AUTH = {};
        getAuth()
            .done((response) => {
                if (response) {
                    let data = response.data;
                    if (data) {
                        data.forEach((item) => {
                            Vue.set(Vue.prototype.$TX_AUTH, item.tag, true);
                        });
                    }
                }
            });
    }
}
