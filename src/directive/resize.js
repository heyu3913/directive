import { ref, onMounted, onUnmounted } from 'vue';

export default {
    mounted(el, binding) {
        const { value: callback } = binding;
        const width = ref(0);
        const height = ref(0);
        console.log('callback',callback)
        function handleResize() {
            width.value = el.clientWidth;
            height.value = el.clientHeight;
            callback({ width: width.value, height: height.value });
        }
        // 监听窗口大小变化，调用 handleResize
        window.addEventListener('resize', handleResize);

        // 初始时调用一次 handleResize
        handleResize();

        // 在组件卸载前移除事件监听
        onUnmounted(() => {
            window.removeEventListener('resize', handleResize);
        });
    }
}
