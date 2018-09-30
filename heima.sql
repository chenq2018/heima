/*
Navicat MySQL Data Transfer

Source Server         : itcast
Source Server Version : 50553
Source Host           : localhost:3306
Source Database       : heima

Target Server Type    : MYSQL
Target Server Version : 50553
File Encoding         : 65001

Date: 2018-09-30 15:01:14
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for article
-- ----------------------------
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `content` varchar(255) NOT NULL,
  `ctime` datetime NOT NULL,
  `authorID` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of article
-- ----------------------------
INSERT INTO `article` VALUES ('1', '1', '** hello **', '2018-09-29 15:25:34', '7');
INSERT INTO `article` VALUES ('2', 'zhao', '** hello zhao**', '2018-09-29 15:36:37', '5');
INSERT INTO `article` VALUES ('20', '2323232323', '** hello **232323232', '2018-09-29 21:22:34', '5');
INSERT INTO `article` VALUES ('21', '76767667676', '** hello **76767667676', '2018-09-29 21:24:20', '5');
INSERT INTO `article` VALUES ('16', '7778', '** hello **\r\n* 7777788888', '2018-09-29 21:16:06', '5');
INSERT INTO `article` VALUES ('17', '9999999', '** hello **9999999999', '2018-09-29 21:18:21', '5');
INSERT INTO `article` VALUES ('18', '1010110', '** hello **1010110', '2018-09-29 21:20:01', '5');
INSERT INTO `article` VALUES ('19', '111155555111', '** hello **111155555111', '2018-09-29 21:21:07', '5');
INSERT INTO `article` VALUES ('11', 'zhaoyu', '** hello **\r\n* zhaoyun', '2018-09-29 19:51:58', '5');
INSERT INTO `article` VALUES ('12', '11111', '** hello **\r\n* 1111111', '2018-09-29 19:52:52', '5');
INSERT INTO `article` VALUES ('13', '222', '** hello **\r\n* 222', '2018-09-29 21:01:22', '7');
INSERT INTO `article` VALUES ('14', '555', '** hello **\r\n* 55555666', '2018-09-29 21:06:05', '7');
INSERT INTO `article` VALUES ('15', '668', '** hello **\r\n* 888', '2018-09-29 21:11:13', '5');

-- ----------------------------
-- Table structure for heima
-- ----------------------------
DROP TABLE IF EXISTS `heima`;
CREATE TABLE `heima` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `nickname` varchar(255) NOT NULL,
  `ctime` datetime NOT NULL,
  `isdel` tinyint(4) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of heima
-- ----------------------------
INSERT INTO `heima` VALUES ('5', '赵云', '123', '飞将军', '2018-09-28 15:12:24', '0');
INSERT INTO `heima` VALUES ('6', '关羽', '123', '忠义侯', '2018-09-28 04:43:54', '0');
INSERT INTO `heima` VALUES ('7', '吕布', '123', '万人敌', '2018-09-29 10:33:17', '0');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uname` varchar(255) NOT NULL,
  `age` int(11) NOT NULL,
  `gender` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('1', '蜡笔小新', '3', '男');
