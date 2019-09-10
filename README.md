# olimpiadasjs
Sistema de login hecho con HTML5, CSS3, Express, pug, MySQL y node.js

- Se necesita crear una base de datos llamada 'nodelogin'
```
CREATE DATABASE IF NOT EXISTS `nodelogin` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `nodelogin`;

CREATE TABLE IF NOT EXISTS `accounts` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

INSERT INTO `accounts` (`id`, `username`, `password`, `email`) VALUES (1, 'test', 'test', 'test@test.com');

ALTER TABLE `accounts` ADD PRIMARY KEY (`id`);
ALTER TABLE `accounts` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
```
- Es necesario instalar Express, MySQL y pug usando:
```
sudo npm install express
sudo npm install express-session
sudo npm install mysql
sudo npm install pug
```
- La estructura final debería quedar de la siguiente manera:
```
/folder
  | index.js
  | /node_modules
  | /views
    | index.pug
    | indexWarning.pug
    | authFail.pug
    | home.pug
  | package.json
```
- Si desea usarlo en conjunto con Apache instale ```pm2``` y configure el archivo ```/etc/apache2/sites-available/000-default.conf```
```
<VirtualHost *:80>
        ServerAdmin webmaster@localhost
        DocumentRoot /var/www/html
        ErrorLog ${APACHE_LOG_DIR}/error.log
        CustomLog ${APACHE_LOG_DIR}/access.log combined
        
        ServerName example.com

        ProxyRequests Off
        ProxyPreserveHost On
        ProxyVia Full
        <Proxy *>
                Require all granted
        </Proxy>

        <Location /(your_project_directory)>
                ProxyPass http://127.0.0.1:8080
                ProxyPassReverse http://127.0.0.1:8080
        </Location>

        <Directory "/var/www/html">
                AllowOverride All
        </Directory>
</VirtualHost>
```
