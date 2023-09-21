## 1.VUE常用指令大全
本项目所有指令均为全局注册，使用时直接在组件中使用即可。

指令目录：`src/directives`

页面目录：`src/views`

具体可查看源码
### 1.1 权限指令
封装一个权限指令，在模板中根据用户权限来控制元素的显示或隐藏。
permission.js
```javascript
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
```
Permission.vue
```javascript
<template>
  <div>
    <button v-permission="'view'">View Button</button>
    <button v-permission="'edit'">Edit Button</button>
    <button v-permission="'delete'">Delete Button</button>
  </div>
</template>

<script>
export default {
  name: "Permission"
}
</script>

<style scoped>

</style>
```

### 1.2 防抖函数指令
在模板中使用防抖功能，可以用于减少频繁触发的事件的执行次数，比如在输入框中的实时搜索场景

debounce.js
```javascript
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
```
Debounce.vue
```javascript
<template>
  <div>
    <input v-model="inputValue" v-debounce="handleInput" />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const inputValue = ref('');


const handleInput = {
  event: 'input',
  fn (event) {
    console.log('Debounced Input:', event.target.value);
  },
  delay: 500
}
</script>
```
### 1.3 节流指令
节流是限制执行频率，有节奏的执行，有规律， 更关注过程。一般用于 DOM 操作频次限制，优化性能，如拖拽、滚动、resize 等操作

throttle.js
```javascript
// //第一次触发不直接执行回调函数
// export default {
//     mounted(el, binding) {
//         // 至少需要回调函数以及监听事件类型
//         if (typeof binding.value.fn !== 'function' || !binding.value.event) return;
//         let delay = 200;
//         el.timer = null;
//         el.handler = function() {
//             if (el.timer) return;
//             el.timer = setTimeout(() => {
//                 binding.value.fn.apply(this, arguments)
//                 el.timer = null;
//             }, binding.value.delay || delay);
//         }
//         el.addEventListener(binding.value.event, el.handler)
//     },
//     // 元素卸载前也记得清理定时器并且移除监听事件
//     beforeUnmount(el, binding) {
//         if (el.timer) {
//             clearTimeout(el.timer);
//             el.timer = null;
//         }
//         el.removeEventListener(binding.value.event, el.handler)
//     }
// }
// //第一次触发直接执行回调函数
export default {
    mounted(el, binding) {
        // 至少需要回调函数以及监听事件类型
        if (typeof binding.value.fn !== 'function' || !binding.value.event) return;

        let isFirstTrigger = true; // 判断是否是第一次触发
        let delay = 200;

        el.timer = null;
        el.handler = function () {
            if (el.timer) return;

            if (isFirstTrigger) {
                binding.value.fn.apply(this, arguments); // 第一次触发直接执行回调函数
                isFirstTrigger = false;
                return;
            }

            el.timer = setTimeout(() => {
                binding.value.fn.apply(this, arguments);
                el.timer = null;
            }, binding.value.delay || delay);
        };

        el.addEventListener(binding.value.event, el.handler);
    },
    // 元素卸载前也记得清理定时器并且移除监听事件
    beforeUnmount(el, binding) {
        if (el.timer) {
            clearTimeout(el.timer);
            el.timer = null;
        }
        el.removeEventListener(binding.value.event, el.handler);
    },
};
```
Throttle.vue
```javascript   
<template>
  <div>
    <h1>Throttle</h1>
    <p>Welcome to the Throttle!</p>
    <button v-throttle="handleTest">测试</button>
  </div>
</template>

<script setup>
  const handleTest = {
    event: 'click',
    fn (event) {
      console.log('Throttled Click:', event.target);
    },
    delay: 1000
  }
</script>

<style scoped>

</style>
```
### 1.4 resize 指令
resize 在模板中使用该指令来监听元素大小的变化，执行相应的业务逻辑代码
resize.js
```javascript   
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
```
```javascript
<template>
  <div v-resize="resize">
    <h1>Resize</h1>
    <p>Resize the window to see the effect.</p>
    <p>Window width: {{ windowWidth }}</p>
    <p>Window height: {{ windowHeight }}</p>
  </div>
</template>
<script setup>
import { ref } from 'vue';
const windowWidth = ref(window.innerWidth);
const windowHeight = ref(window.innerHeight);
const resize=(size)=>{
  console.log('Window size changed:', size);
}

</script>
```
### 1.5 滚动加载指令
封装一个滚动加载监听指令，在模板中使用该指令来实现滚动加载的功能

scrollLoad.js
```javascript   
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
```
scrollLoad.vue
```javascript
<template>
  <div v-scroll-load="loadMore"
       style="overflow: auto; height: 200px;
        border: 1px solid #ccc;">
    <ul style="height: 500px">
      <li v-for="item in items" :key="item">{{ item }}</li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const items = ref([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15])


const loadMore = {
  fn() {
    // 模拟加载更多数据
    for (let i = 0; i < 10; i++) {
      items.value.push('Item ' + (items.value.length + 1));
    }
  },
  distance: 100
}
</script>
```

### 1.6 图片懒加载指令
在图片元素上使用指令，实现图片的懒加载
lazyLoad.js
```javascript
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
```
lazyLoad.vue
```javascript
<template>
  <div>
    <!-- 其他内容 -->
    <div class="block">
      空白
    </div>
    <img v-lazy-load="lazyImageSrc" alt="Lazy Image">
  </div>
</template>

<script setup>
import {ref} from "vue";
const lazyImageSrc = ref('https://img1.baidu.com/it/u=1632607226,1185621596&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=728')
</script>
<style>
.block {
  height: 1000px;
}
</style>
```
### 1.7 正则指令
开发中遇到的表单输入，往往会有对输入内容的限制，比如不能输入表情和特殊字符，只能输入数字或字母等。
根据正则表达式，设计自定义处理表单输入规则的指令，下面以禁止输入数字为例
regRule.js
```javascript
export default {
    mounted(el) {
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
```
regRule.vue
```javascript
<template>
    <div>
        <input tyep="text" v-reg-rule="handleInput">
    </div>
</template>

<script setup>
    import {ref} from "vue";
    const handleInput = (value)=>{
    console.log('value',value)
}

</script>

```
### 1.8
在元素上使用指令，实现拖拽功能。

鼠标按下(onmousedown)时记录目标元素当前的 left 和 top 值。

鼠标移动(onmousemove)时计算每次移动的横向距离和纵向距离的变化值，并改变元素的 left 和 top 值

鼠标松开(onmouseup)时完成一次拖拽

draggable.js
```javascript
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
```
Draggable.vue
```javascript
<template>
  <button class="drag" v-draggable>
    Drag Me
  </button>
</template>

<script>
</script>
<style>
.drag{
  position: absolute;
}
</style>

```

### 1.9 水印指令
给页面添加背景水印。

使用 canvas 特性生成 base64 格式的图片文件，设置其字体大小，颜色等。

将其设置为背景图片，从而实现页面或组件水印效果
waterMarker.js
```javascript
const addWaterMarker = (str, parentNode, font, textColor) => {
    // 水印文字，父元素，字体，文字颜色
    let can = document.createElement("canvas");
    parentNode.appendChild(can);
    can.width = 200;
    can.height = 150;
    can.style.display = "none";
    let cans = can.getContext("2d");
    cans.rotate((-20 * Math.PI) / 180);
    cans.font = font || "16px Microsoft JhengHei";
    cans.fillStyle = textColor || "rgba(180, 180, 180, 0.3)";
    cans.textAlign = "left";
    cans.textBaseline = "Middle";
    cans.fillText(str, can.width / 10, can.height / 2);
    parentNode.style.backgroundImage = "url(" + can.toDataURL("image/png") + ")";
};

const waterMarker = {
    mounted(el, binding) {
        addWaterMarker(binding.value.text, el, binding.value.font, binding.value.textColor);
    }
};
export default waterMarker;
```
warterMarker.vue
```javascript

<template>
  <div
      class="content-box"
      v-waterMarker="{
      text: 'Watermark Direct',
      textColor: 'rgba(180, 180, 180, 0.6)'
    }"
  >
    <span class="text">水印指令</span>
  </div>
</template>

<style scoped >
.content-box {
  width:  600px;
  height: 600px;
}
</style>

```
## 2、源码
### 2.1 地址

[https://github.com/heyu3913/directive](https://github.com/heyu3913/directive)
### 2.2 运行
```javascript
cd my-vue-app
npm i
npm run dev
ps:本项目采用路由根据文件自动生成，所以大家注意查看路由生成规则'pages/文件名',具体可查看路由文件
```
## 3、免费的gpt地址
### [https://www.hangyejingling.cn/](https://www.hangyejingling.cn/)






