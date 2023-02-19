$(function () {
  let form = layui.form
  console.log(form);
  form.verify({
    pwd: [/^[\S]{5,14}$/, '密码必须5到14位,且不能出现空格'],
    samePwd: function (val) {
      if ($('[name=oldPwd]').val() == val) return '新旧密码不能一致！'
    },
    rePwd: function (val) {
      if ($('[name=newPwd]').val() !== val) return '两次密码不一致！'
    }
  })

  $('.layui-form').on('submit', function (e) {
    e.preventDefault();
    $.ajax({
      method: 'post',
      url: '/my/updatepwd',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) return layer.msg('更新密码失败,请检查密码是否正确！')
        layui.layer.msg('更新密码成功！')
        // 重置表单
        $('.layui-form')[0].reset()
        // layui弹出层带回掉的
        layer.alert(res.message, function (index) {
          //do something
          window.parent.location.href = '/login.html'
          localStorage.removeItem('token')
          layer.close(index);
        });

      }
    })
  })

})