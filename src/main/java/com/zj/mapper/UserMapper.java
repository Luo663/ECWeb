package com.zj.mapper;

import com.zj.pojo.User;
import org.apache.ibatis.annotations.Param;

public interface UserMapper {
//    用户登陆验证查询数据库 参数：(String userName,String password) 返回值(User对象)
    User selectAllByUserNameAndPasswordUser(@Param("userName") String userName,@Param("password") String password);

    //    用户注册验证查询数据库 参数：(String userName) 返回值(User对象)
    User selectAllByUserNameUser(String userName);
//    用户注册提交数据到数据库 参数：(User user) 返回值(Integer)
    Integer addAll(User user);
}
