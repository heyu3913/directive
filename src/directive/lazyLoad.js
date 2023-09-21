export default {
    mounted(el, binding) {
        // 使用 Intersection Observer 实现图片懒加载
        const io = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    el.src = binding.value;
                    observer.unobserve(el);
                }
            });
        });
        io.observe(el);
    }
}
