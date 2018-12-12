-- Adminer 4.7.0 MySQL dump

SET NAMES utf8;
SET time_zone = '+00:00';

USE `Expedia`;

DELIMITER ;;

DROP PROCEDURE IF EXISTS `DataFilling`;;
CREATE PROCEDURE `DataFilling`()
BEGIN
	-- create 10k users
	DECLARE counter INT DEFAULT 1;
    DECLARE detailsCounter INT DEFAULT 1;
	DECLARE baseBirthDate DATETIME DEFAULT '1970-01-01';
    
    WHILE counter <= 10000 DO 
		INSERT INTO Contact(UserID,Title,Name,BirthDate,IsFavorite)
        VALUES (
			counter,  -- ID
			CASE WHEN counter % 2 = 0  THEN 'MR' ELSE 'MRS' END, -- title
			Concat('User ',CAST(counter as char(10))), -- name
			DATE_ADD(baseBirthDate, INTERVAL (CAST(RAND() * 500 AS UNSIGNED) + 1) MONTH),
			case when counter % 3 = 0  THEN 1 ELSE 0 END -- favorite
		);
        
        -- add some contact details        
        SET detailsCounter = 1;
		WHILE detailsCounter <= 5 DO 
			INSERT INTO ContactDetail(UserID, ContactDetailType, ContactDetailContent)
            VALUES (
				counter,  
				CASE WHEN counter%2=0 THEN 'Phone' ELSE 'EMAIL' END,
                CASE WHEN counter%2=0 THEN CONCAT('000 123 45',counter) ELSE CONCAT('user',counter,'@mail.com') END
			);				
 
			SET detailsCounter = detailsCounter + 1;
        END WHILE;  
		SET counter = counter + 1;
	END WHILE;      
END;;

DELIMITER ;

DROP TABLE IF EXISTS `Book`;
CREATE TABLE `Book` (
  `BookId` int(11) NOT NULL COMMENT 'Primary_key',
  `Title` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT 'Book Title',
  `Book_Detail_Id` int(11) DEFAULT NULL COMMENT '外键，关联到详情',
  `Author` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT 'Book Author',
  `Price` decimal(2,2) unsigned NOT NULL DEFAULT '0.00' COMMENT 'Book Price',
  `ISBN` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT 'ISN number',
  `Front_Page_img_addr` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT 'Book Front Page image',
  `Vendor_Id` int(11) DEFAULT NULL COMMENT '书本出版商',
  `Book_Contact_Id` int(11) DEFAULT NULL COMMENT '联系方式',
  PRIMARY KEY (`BookId`),
  KEY `Book_Detail_Id` (`Book_Detail_Id`),
  KEY `Vendor_Id` (`Vendor_Id`),
  KEY `Book_Contact_Id` (`Book_Contact_Id`),
  CONSTRAINT `Book_ibfk_1` FOREIGN KEY (`Book_Detail_Id`) REFERENCES `BookDetail` (`bookid`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `Book_ibfk_2` FOREIGN KEY (`Vendor_Id`) REFERENCES `BookVendor` (`id`) ON DELETE RESTRICT,
  CONSTRAINT `Book_ibfk_3` FOREIGN KEY (`Book_Contact_Id`) REFERENCES `BookContactInfo` (`id`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `BookChapter`;
CREATE TABLE `BookChapter` (
  `id` int(11) NOT NULL COMMENT 'Primary_key',
  `book_chapter_page_id` int(11) NOT NULL COMMENT '外键关联到章节内容',
  `title` varchar(10) NOT NULL COMMENT '章节名称',
  `summary` varchar(100) NOT NULL COMMENT '章节总结',
  `total_page` int(11) NOT NULL COMMENT '章节页数',
  PRIMARY KEY (`id`),
  KEY `book_chapter_page_id` (`book_chapter_page_id`),
  CONSTRAINT `BookChapter_ibfk_1` FOREIGN KEY (`book_chapter_page_id`) REFERENCES `BookChapter_Page` (`id`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `BookChapter_Page`;
CREATE TABLE `BookChapter_Page` (
  `id` int(11) NOT NULL,
  `content` longtext NOT NULL,
  `page_index` int(11) NOT NULL,
  KEY `id` (`id`),
  CONSTRAINT `BookChapter_Page_ibfk_1` FOREIGN KEY (`id`) REFERENCES `BookChapter` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `BookContactInfo`;
CREATE TABLE `BookContactInfo` (
  `Id` int(11) NOT NULL COMMENT 'Primary_key',
  `desc` varchar(20) NOT NULL COMMENT '描述',
  `contact_weibo` varchar(20) NOT NULL COMMENT '新浪微博',
  `contact_mail` varchar(30) NOT NULL COMMENT '反馈邮箱',
  `contact_weichat_public` varchar(30) NOT NULL COMMENT '微信共众号',
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `BookContent`;
CREATE TABLE `BookContent` (
  `Id` int(11) NOT NULL COMMENT 'Primary_key',
  `Book_Chapter_Id` int(11) NOT NULL COMMENT '章节',
  PRIMARY KEY (`Id`),
  KEY `Book_Chapter_Id` (`Book_Chapter_Id`),
  CONSTRAINT `BookContent_ibfk_1` FOREIGN KEY (`Book_Chapter_Id`) REFERENCES `BookChapter` (`id`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `BookDetail`;
CREATE TABLE `BookDetail` (
  `BookId` int(11) NOT NULL COMMENT 'Primary_key',
  `Book_Conent_Id` int(11) NOT NULL COMMENT '外键关联到书内容',
  `Book_Preview` varchar(300) NOT NULL COMMENT '前言',
  PRIMARY KEY (`BookId`),
  KEY `Book_Conent_Id` (`Book_Conent_Id`),
  CONSTRAINT `BookDetail_ibfk_1` FOREIGN KEY (`Book_Conent_Id`) REFERENCES `BookContent` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `BookVendor`;
CREATE TABLE `BookVendor` (
  `Id` int(11) NOT NULL COMMENT 'Primary_key',
  `vendor_name` varchar(15) NOT NULL COMMENT '供应商名称',
  `vendor_addr` varchar(50) NOT NULL COMMENT '供应商地址',
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


SET NAMES utf8mb4;

DROP TABLE IF EXISTS `Contact`;
CREATE TABLE `Contact` (
  `UserID` int(11) NOT NULL,
  `Title` varchar(5) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `Name` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `BirthDate` datetime NOT NULL,
  `IsFavorite` int(11) DEFAULT NULL,
  PRIMARY KEY (`UserID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


DROP TABLE IF EXISTS `ContactDetail`;
CREATE TABLE `ContactDetail` (
  `UserID` int(11) NOT NULL,
  `ContactDetailType` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `ContactDetailContent` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- 2018-12-12 13:50:20