package com.zj.web.User;

import com.alibaba.fastjson.JSON;
import com.zj.pojo.User;
import com.zj.service.UserService;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.io.BufferedReader;
import java.io.IOException;

@WebServlet("/loginServlet")
public class LoginServlet extends HttpServlet {

    private final UserService userService = new UserService();
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
//        获取Ajax请求数据
        BufferedReader reader = request.getReader();
        String parse = reader.readLine();
//        将JSON数据转为User对象
        User user = JSON.parseObject(parse, User.class);
//        调用userService.selectAllByUserNameAndPasswordUser方法验证用户
        User user1 = userService.selectAllByUserNameAndPasswordUser(user.getUserName(), user.getPassword());

//        判断
        if (user1 != null) {
//            验证成功
//       将用户名存入session
            HttpSession session = request.getSession();
            session.setAttribute("userName",user.getUserName());
//            响应成功的标识
            response.getWriter().write("success");

        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        this.doGet(request,response);
    }
}
