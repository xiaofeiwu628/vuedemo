## main.js 是配置,有用的东西大概是下面这些
```
//引入echarts
import echarts from 'echarts'
//注册全局组件
Vue.prototype.$echarts = echarts
//引入elementui
import ElementUI from 'element-ui';
//引入elementui样式
import 'element-ui/lib/theme-chalk/index.css';
//注册全局组件
Vue.prototype.$Elementui = ElementUI
//use elementui
Vue.use(ElementUI)
```
## views文件夹里面两个可视化页面，看着贴，里面有注释
## app.vue看着改，改了views里面的页面名，加到你的app.vue里就行
## router链接，index.js自己配个想要的
##
