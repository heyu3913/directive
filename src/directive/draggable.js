export default {
    mounted: function (el, binding) {
        let offsetX = 0;
        let offsetY = 0;

        el.addEventListener('mousedown', (e) => {
            offsetX = e.clientX - el.getBoundingClientRect().left;
            offsetY = e.clientY - el.getBoundingClientRect().top;
            document.addEventListener('mousemove', move);
            document.addEventListener('mouseup', stop);
        });

        function move(e) {
            el.style.left = `${e.clientX - offsetX}px`;
            el.style.top = `${e.clientY - offsetY}px`;
        }

        function stop() {
            document.removeEventListener('mousemove', move);
            document.removeEventListener('mouseup', stop);
        }
    }
}

