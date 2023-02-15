package com.zj.web.User;

import com.alibaba.fastjson.JSON;
import com.zj.pojo.User;
import com.zj.service.UserService;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.io.BufferedReader;
import java.io.IOException;

@WebServlet("/selectAllByUserNameServlet")
public class SelectAllByUserNameServlet extends HttpServlet {

    private final UserService userService = new UserService();
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        BufferedReader reader = request.getReader();
        String parse = reader.readLine();
        User userName = JSON.parseObject(parse, User.class);
        User user1 = userService.selectAllByUserName(userName.getUserName());
        if (user1 == null){
            response.getWriter().write("success");
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        this.doGet(request,response);
    }
}
