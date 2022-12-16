/*
SQLyog Community v13.1.9 (64 bit)
MySQL - 5.7.38 : Database - inventory
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`inventory` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `inventory`;

/*Table structure for table `categories` */

DROP TABLE IF EXISTS `categories`;

CREATE TABLE `categories` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) CHARACTER SET latin1 NOT NULL,
  `name` varchar(255) CHARACTER SET latin1 NOT NULL,
  `description` text CHARACTER SET latin1,
  `enabled` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;

/*Table structure for table `products` */

DROP TABLE IF EXISTS `products`;

CREATE TABLE `products` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) CHARACTER SET latin1 NOT NULL,
  `id_category` int(5) NOT NULL,
  `name` varchar(255) CHARACTER SET latin1 NOT NULL,
  `description` text CHARACTER SET latin1,
  `brand` varchar(255) CHARACTER SET latin1 DEFAULT NULL,
  `batch` varchar(255) CHARACTER SET latin1 DEFAULT NULL,
  `due_date` date DEFAULT NULL,
  `enabled` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `category_id` (`id_category`),
  CONSTRAINT `products_ibfk_2` FOREIGN KEY (`id_category`) REFERENCES `categories` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;

/*Table structure for table `stocks` */

DROP TABLE IF EXISTS `stocks`;

CREATE TABLE `stocks` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) CHARACTER SET latin1 NOT NULL,
  `name` varchar(255) CHARACTER SET latin1 NOT NULL,
  `code` varchar(255) CHARACTER SET latin1 DEFAULT NULL,
  `description` text,
  `enabled` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) NOT NULL,
  `id_profile` int(5) NOT NULL DEFAULT '2' COMMENT '1 - SUPER / 2 - DEFAULT',
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `role` varchar(255) DEFAULT NULL,
  `laboratory` varchar(255) DEFAULT NULL,
  `description` text,
  `enabled` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;

/*Table structure for table `stock_movements` */

DROP TABLE IF EXISTS `stock_movements`;

CREATE TABLE `stock_movements` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) CHARACTER SET latin1 NOT NULL,
  `id_product` int(5) NOT NULL,
  `id_stock` int(5) NOT NULL,
  `id_user` int(5) NOT NULL,
  `type` int(2) NOT NULL COMMENT '1 - Entrada / 2 - Saída',
  `amount` int(10) NOT NULL,
  `description` text CHARACTER SET latin1,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_stock_product` (`id_stock`),
  KEY `id_product` (`id_product`),
  KEY `stock_movements_ibfk_2` (`id_user`),
  CONSTRAINT `stock_movements_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `stock_movements_ibfk_3` FOREIGN KEY (`id_product`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  CONSTRAINT `stock_movements_ibfk_4` FOREIGN KEY (`id_stock`) REFERENCES `stocks` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `stock_products` */

DROP TABLE IF EXISTS `stock_products`;

CREATE TABLE `stock_products` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) CHARACTER SET latin1 NOT NULL,
  `id_stock` int(5) NOT NULL,
  `id_product` int(5) NOT NULL,
  `amount` int(10) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_stock` (`id_stock`),
  KEY `id_product` (`id_product`),
  CONSTRAINT `stock_products_ibfk_1` FOREIGN KEY (`id_stock`) REFERENCES `stocks` (`id`) ON DELETE CASCADE,

  CONSTRAINT `stock_products_ibfk_2` FOREIGN KEY (`id_product`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;

insert into users (uuid, id_profile, username, password, name, enabled)
values ('9445143a-57d4-4bd9-8212-1673588da388', 1, 'user', 'pass', 'usuário', true);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
