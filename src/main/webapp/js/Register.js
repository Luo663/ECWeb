new Vue({
    el: "#res",
    methods: {

        clicko(){
            window.location.href="http://localhost:8080/ECweb/index.html"
        },
        //    判断用户名是否合法
        blurUserName() {
            let _this = this;
            //通过数据模型获取用户名
            let userName = this.user.userName.trim();
//    判断用户名是否合法执行相应的分支
//        正则表达式：{6,12}:6-12字符，\w:单词字符
            let reg = /^\w{6,12}$/;
            let flag = reg.test(userName);
            if (flag) {
                document.getElementById("User").style.display = "none";
                //    发送axios请求查询用户名是否重复
                axios({
                    method: "post",
                    url: "http://localhost:8080/ECweb/selectAllByUserNameServlet",
                    data: _this.user
                }).then(function (resp) {
                    if (resp.data === "success") {
                        //    验证成功
                        document.getElementById("User1").style.display = "none";
                    } else {
                        //验证失败
                        document.getElementById("User1").style.display = '';
                    }
                })
            } else {
                document.getElementById("User").style.display = '';
            }
            return flag;
        },
        //    判断两次密码是否一致是否合法
        blurPassword() {
            //通过数据模型获取用户密码
            let password = this.user.password.trim();
            let pass = this.comparison.password.trim();
            //    判断用户名密码否合法执行相应的分支
//        正则表达式：{6,12}:6-12字符，\w:单词字符
            let reg = /^\w{6,12}$/;
            let flag = reg.test(password);
            if (flag) {
                document.getElementById("pass").style.display = "none";
                if (password === pass) {
                    document.getElementById("pass1").style.display = "none";
                } else {
                    document.getElementById("pass1").style.display = '';
                }
            } else {
                document.getElementById("pass").style.display = '';
            }
            return flag;
        },
        //提交表单数据
        onsubmitFrom() {
            if (this.blurUserName() && this.blurPassword() === true) {

                var _this = this;
                axios({
                    method: "post",
                    url: "http://localhost:8080/ECweb/addUserServlet",
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
                                window.location.href = 'http://localhost:8080/ECweb/index.html'
                            }
                        }, 1000)


                    } else {
                        //    验证失败
                        // 右上弹窗警告动画
                        var time_variables = 0

                        $('.box_error_prompt').show(400)
                        var a = setInterval(function () {
                            time_variables++
                            if (time_variables >= 3) {
                                time_variables = 0
                                clearInterval(a)
                                $('.box_error_prompt').hide(400)
                            }
                        }, 1000)
                    }
                })
            } else {
                //    验证失败
                // 右上弹窗警告动画
                var time_variables = 0

                $('.box_error_prompt').show(400)
                var a = setInterval(function () {
                    time_variables++
                    if (time_variables >= 3) {
                        time_variables = 0
                        clearInterval(a)
                        $('.box_error_prompt').hide(400)
                    }
                }, 1000)
            }
        }

    },
    data() {
        return {
            //    用户数据模型
            user: {
                id: 'null',
                userName: ''.trim(),
                password: ''.trim(),
            },
            //    比对数据模型
            comparison: {
                password: ''.trim(),
            }
        }
    }
})