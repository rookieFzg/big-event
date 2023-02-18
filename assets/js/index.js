let layer = layui.layer
function getUserInfo() {
  // 1.获取用户个人信息
  $.ajax({
    method: 'GET',
    url: '/my/userinfo',
    success: function (res) {
      console.log(res);
      if (res.status !== 0) return layui.layer.msg('获取用户信息失败！')
      // 调用 renderAvatar 渲染用户的头像
      renderAvatar(res.data)
    }
  })
}
getUserInfo()
// 2.展示用户头像和用户名
function renderAvatar(user) {
  // 获取用户名称
  let uname = user.nickname || user.username
  // 设置欢迎的文本
  $('#welcome').html('欢迎&nbsp;&nbsp;' + uname)
  // 按需渲染用户的头像
  if (user.user_pic !== null) {
    // 渲染图片头像
    $('.layui-nav-img')
      .attr('src', user.user_pic)
      .show()
    $('.text-avatar').hide()
  } else {
    // 渲染文本头像
    $('.layui-nav-img').hide()
    var first = uname[0].toUpperCase()
    $('.text-avatar')
      .html(first)
      .show()
  }
}
// 3.点击按钮，实现退出功能
$('#btnLogout').on('click', function () {
  console.log(22);
  // 提示用户是否确认退出
  layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
    //do something
    // 1. 清空本地存储中的 token
    localStorage.removeItem('token')
    // 2. 重新跳转到登录页面
    location.href = '/login.html'
    // 关闭 confirm 询问框
    layer.close(index)
  })
})