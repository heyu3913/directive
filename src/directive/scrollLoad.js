import { onMounted, onUnmounted } from 'vue';

export default {
    mounted(el, binding) {
        const { fn, distance = 100 } = binding.value;
        console.log(fn)
        console.log(el)
        console.log(distance)
        function handleScroll() {
            const scrollHeight = el.scrollHeight;
            const offsetHeight = el.offsetHeight;
            const scrollTop = el.scrollTop;
            if (scrollHeight - offsetHeight - scrollTop <= distance) {
                fn();
            }
        }

        // 监听滚动事件，调用 handleScroll
        el.addEventListener('scroll', handleScroll);

        // 在组件卸载前移除事件监听
        onUnmounted(() => {
            el.removeEventListener('scroll', handleScroll);
        });
    }
}
