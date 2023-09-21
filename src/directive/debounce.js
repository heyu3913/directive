//第一次触发也需要等待
export default {
    beforeMount(el, binding) {
        const { value } = binding;

        // 需要回调函数以及监听事件类型
        if (typeof value.fn !== 'function' || !value.event) return;

        el.timer = null
        el.handler = function() {
            if (el.timer) {
                clearTimeout(el.timer);
                el.timer = null;
            };
            el.timer = setTimeout(() => {
                binding.value.fn.apply(this, arguments)
                el.timer = null;
            }, value.delay || 300);
        }

        el.addEventListener(value.event, el.handler)
    },
    beforeUnmount(el, binding) {
        // 在组件卸载前清除定时器，防止内存泄漏
        if (el.timer) {
            clearTimeout(el.timer);
            el.timer = null;
        }
        el.removeEventListener(binding.value.event, el.handler)
    }
}


//第一次触发直接执行
// export default {
//     beforeMount(el, binding) {
//         const { value } = binding;
//
//         // 需要回调函数以及监听事件类型
//         if (typeof value.fn !== 'function' || !value.event) return;
//
//         let isFirstTrigger = true; // 判断是否是第一次触发
//
//         el.timer = null;
//         el.handler = function () {
//             if (el.timer) {
//                 clearTimeout(el.timer);
//                 el.timer = null;
//             }
//
//             if (isFirstTrigger) {
//                 value.fn.apply(this, arguments); // 第一次触发直接执行回调函数
//                 isFirstTrigger = false;
//                 return;
//             }
//
//             el.timer = setTimeout(() => {
//                 value.fn.apply(this, arguments);
//                 el.timer = null;
//             }, value.delay || 300);
//         };
//
//         el.addEventListener(value.event, el.handler);
//     },
//     beforeUnmount(el, binding) {
//         // 在组件卸载前清除定时器，防止内存泄漏
//         if (el.timer) {
//             clearTimeout(el.timer);
//             el.timer = null;
//         }
//         el.removeEventListener(binding.value.event, el.handler);
//     },
// };
