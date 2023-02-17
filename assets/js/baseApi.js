$.ajaxPrefilter(function (options) {
  // 在这个函数中，可以拿到我们给Ajax提供的配置对象
  // options对象里面有一项url属性
  // 发起真正的ajax请求之前，统一拼接请求的根路径
  options.url = 'http://big-event-api-t.itheima.net' + options.url
})