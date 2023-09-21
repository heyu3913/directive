import { ref, watchEffect } from 'vue';

const hasPermission = (permission) => {
    // 在实际项目中，根据后端返回的用户权限进行判断
    const userPermissions = ['view', 'edit'];
    return userPermissions.includes(permission);
};

export default {
    beforeMount(el, binding) {
        const { value } = binding;
        const visible = ref(false);

        // 监听权限变化，当权限发生改变时重新判断是否显示元素
        watchEffect(() => {
            visible.value = hasPermission(value);
        });

        // 根据 visible 的值来显示或隐藏元素
        el.style.display = visible.value ? 'block' : 'none';
    }
}
