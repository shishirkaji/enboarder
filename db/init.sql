
CREATE TABLE `mission-control`.`ship` ( `id` VARCHAR(30) NOT NULL , `type` VARCHAR(20) NOT NULL 
, `weight` INT(10) NOT NULL , `homeport` VARCHAR(30) ,
 `name` VARCHAR(30) NOT NULL , `class` VARCHAR(20) , `icon` 
 VARCHAR(30) ,creation_time DATETIME DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (`id`(30))) ENGINE = InnoDB;