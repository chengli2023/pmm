环境搭建过程记录：
update user set host ='%' where user='root';
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY 'mypassword' WITH GRANT OPTION 

在服务端MySQL文件夹下找到/etc/mysql/my.cnf文件。修改bind-address=127.0.0.1 为 bind-address=0.0.0.0

service mysql restart;

mongodb
nodejs
mysqlmo
0B99E5