��������̼�¼��
update user set host ='%' where user='root';
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY 'mypassword' WITH GRANT OPTION 

�ڷ����MySQL�ļ������ҵ�/etc/mysql/my.cnf�ļ����޸�bind-address=127.0.0.1 Ϊ bind-address=0.0.0.0

service mysql restart;

mongodb
nodejs
mysqlmo
0B99E5