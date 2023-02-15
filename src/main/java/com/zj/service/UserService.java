package com.zj.service;

import com.zj.mapper.UserMapper;
import com.zj.pojo.User;
import com.zj.util.SqlSessionFactoryUtils;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;

public class UserService {
    //1. 创建SqlSessionFactory 工厂对象
    SqlSessionFactory factory = SqlSessionFactoryUtils.getSqlSessionFactory();

//    用户登陆验证查询数据库 参数：(String userName,String password) 返回值(User对象)
    public User selectAllByUserNameAndPasswordUser(String userName,String password){

        //2. 获取SqlSession对象
        SqlSession sqlSession = factory.openSession();

        //3. 获取UserMapper
        UserMapper mapper = sqlSession.getMapper(UserMapper.class);

//        4.执行selectAllByUserNameAndPasswordUser接口
        User user = mapper.selectAllByUserNameAndPasswordUser(userName, password);

        //5. 释放资源
        sqlSession.close();

//        6.返回User对象
        return user;

    }

//    用户注册查询数据库用户是否存在 参数(String userName) 返回值(User对象)
    public User selectAllByUserName(String userName){
        //2. 获取SqlSession对象
        SqlSession sqlSession = factory.openSession();

        //3. 获取UserMapper
        UserMapper mapper = sqlSession.getMapper(UserMapper.class);

//        4.执行mapper.selectAllByUserNameUser接口
        User user = mapper.selectAllByUserNameUser(userName);

//        释放资源
        sqlSession.close();

//        6.返回User对象
        return user;
    }

//    用户注册添加信息到数据库 参数(User user) 返回值(Integer)
    public Integer addAll(User user){
        //2. 获取SqlSession对象
        SqlSession sqlSession = factory.openSession();

        //3. 获取UserMapper
        UserMapper mapper = sqlSession.getMapper(UserMapper.class);

//        4.执行mapper.selectAllByUserNameUser接口
        Integer i = mapper.addAll(user);

//        提交事务

        sqlSession.commit();
//        释放资源
        sqlSession.close();
//        6.返回Integer对象
        return i;
    }
}
