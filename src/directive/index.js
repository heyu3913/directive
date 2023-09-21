import permission from './permission'
import debounce from "./debounce";
import throttle from "./throttle";
import resize from "./resize";
import scrollLoad from "./scrollLoad";
import lazyLoad from "./lazyLoad";
import regRule from "./regRule";
import draggable from "./draggable";
import waterMarker from "./waterMarker";
// 自定义指令
const directives = {
    permission,
    debounce,
    throttle,
    resize,
    scrollLoad,
    lazyLoad,
    regRule,
    draggable,
    waterMarker
}

export default {
    install(app) {
        Object.keys(directives).forEach((key) => {
            app.directive(key, directives[key])
        })
    },
}
