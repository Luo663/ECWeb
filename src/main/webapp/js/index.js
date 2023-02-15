new Vue({
    el: "#app",
    methods: {
        //跳转注册页面
        check(){
          window.location.href="http://localhost:8080/ECweb/Register.html"
        },
        //提交表单方法
        onsubmitFrom() {
            var _this = this;
            axios({
                method: "post",
                url: "http://localhost:8080/ECweb/loginServlet",
                data: _this.user
            }).then(function (resp) {

                if (resp.data === "success") {
                    //    验证成功

                    $('.box_correct').show(400);
                    var aaa = 0
                    let a = setInterval(function () {
                        aaa++
                        if (aaa >= 3) {
                            aaa = 0
                            clearInterval(a)
                            $('.box_correct').hide(400)
                            // 跳转页面
                            window.location.href = "http://localhost:8080/ECweb/home.html";
                        }
                    }, 1000)
                } else {
                    //    验证失败
                    // 右上弹窗警告动画
                    var time_variables = 0

                    $('.box_error_prompt').show(400)
                    var a = setInterval(function(){
                        time_variables++
                        if(time_variables >= 3){
                            time_variables = 0
                            clearInterval(a)
                            $('.box_error_prompt').hide(400)
                        }
                    },1000)
                }
            })
        }
    },
    data() {
        return {
            //    用户数据模型
            user: {
                userName: '',
                password: ''
            }
        }
    }
})