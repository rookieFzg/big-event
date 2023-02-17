$(function () {
  // 点击“去注册”的链接
  document.querySelector('#link_reg').addEventListener('click', function () {
    $('.login-box').hide()
    $('.reg-box').show()
  })

  // 点击“去登录”的链接
  $('#link_login').on('click', function () {
    $('.login-box').show()
    $('.reg-box').hide()
  })
  // 2.实现自定义检验规则
  let form = layui.form
  let layer = layui.layer
  form.verify({
    pwd: [/^[\S]{5,14}$/, '密码必须5到14位,且不能出现空格'],
    // 确认密码
    repwd: function (val) {
      // 通过形参拿到的是确认密码框中的内容即 val
      // 还需要拿到密码框中的内容
      let pswd = $('.reg-box [name=password]').val().trim()
      // 两个密码框需要做一个判断
      if (pswd !== val) return '密码不一致'
    }
  })
  // 3.实现用户注册功能
  // 监听注册表单的提价事件
  $('#form_reg').on('submit', function (e) {
    // 阻止默认提交
    e.preventDefault();
    // 发起ajax的post请求
    let username = $('#form_reg [name=username]').val()
    let password = $('#form_reg [name=password]').val()
    $.ajax({
      method: 'post',
      url: "/api/reguser",
      data: { username, password },
      success: function (res) {
        console.log(res);
        if (res.status !== 0) return layer.msg(res.message)
        layer.msg('注册成功，请登录！')
        // 调用点击事件跳转到登录
        $('#link_login').click()
        // 清除输入框
        $('#form_reg')[0].reset()
      }
    })
  })
  // 4.实现用户登录功能
  $('#form_login').submit(function (e) {
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/api/login',
      // 快速获取表单中的数据
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) return layer.msg('登录失败！')
        layer.msg('登录成功！')
        // 将登陆成功得到的 token保存到本地存储
        localStorage.setItem('token', res.token)
        // 跳转到index.html
        location.href = '/index.html'
      }
    })
  })
})
