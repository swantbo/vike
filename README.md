# vike

|作者|xwvike|
|:---:|:---:|
|email|xwvike@gmail.com|

所用技术栈:  
*[React](https://www.reactjscn.com/)  
*[Redux](https://www.redux.org.cn/)  
*[react-route](https://reacttraining.com/react-router/web/guides/quick-start)  
*[sass](http://sass.bootcss.com/docs/sass-reference/)  
*[Ant.d](https://ant.design/index-cn)  
*[Express](http://www.expressjs.com.cn/)  
*[Mongodb](https://www.mongodb.com/)  
*[Mongoose](https://mongoosejs.com/)  
*[Nginx](http://nginx.org/en/)

前端部分完全使用了react进行构建，由于是初次尝试做项目。包括redux中store的设计，以及整体的组件
封装都不太完善。虽然 不至于无法维护，但是离‘优美’的差距还是比较大的。截至目前的
项目中，已经完成了基本的注册，登录，发帖，评论，点赞，收藏，动态通知，等基本功能。如果下一步需要
进行优化的话，就要把canvas截图进行优化，目前图片没有进行缩放的情况下，进行了剪裁。造成剪裁后的图片文件体积依旧 
很大。其次就是部分页面数据无法及时更新的bug。至于整体体验想要质的提升，只能对store进行重新设计。以及所有页面的
数据请求进行规范化处理。这两方面在刚开始，是没有预料到的。

后端部分用Nginx做服务。接口用node写然后Nginx代理。数据库用了mongodb。为了减轻服务器压力，以及响应速度。只做了最基本的
数据缓存，不至于每次请求都从数据库里进行读写。

水平有限，这个项目只是用来练练手。接下来的话，可以给发帖提供一个发多图的功能，以及小视频的功能，用户之间聊天的功能。
 
 
