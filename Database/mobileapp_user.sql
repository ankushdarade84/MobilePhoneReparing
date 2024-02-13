-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: mobileapp
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `count` int NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `mobile_no` bigint NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Nashik',0,'ankush@gmail.com',8446231090,'Ankush','294db2b9dc79754b81fbd020062fbf7889c09825927db827aecd1697a1870188','admin'),(2,'Nashik',0,'pankaj@gmail.com',7038875693,'Pankaj','ca25e689a49f4b8e4a09ec1daa597c7fd86a04ffe2bb9acf2dd0fa3668233eab','user'),(3,'Nashik',0,'ajinkya@gmail.com',7757564404,'Ajikya','4d8f7fbc3c15ff5ea62d4371a4ac31ba194d53cc5795ffdc731d00acc5826483','user'),(4,'Nashik',0,'krushna@gmail.com',7757564404,'Krushna','05886fc663eb358b9c7cbb71a719d044b2b9c7d5e1e9d4aeb0e6cba033bde927','user'),(5,'Nashik',0,'akhilesh@gmail.com',7757564404,'Akhilesh','bd03a06e67ae7be3f3f163d55898427a42494fe0347fb136772f4c7f90e98806','user'),(6,'Nashik',0,'namrata@gmail.com',7757564404,'Namrata','c3ad2df571a6a3aff4558b168a52ddcbcad3ece81c83f5bbfe3a685c16ee9eac','user'),(7,'Pune',0,'hetal@gmail.com',7757564404,'Hetal','7e7ac11c6033a6b84f9cfd10bbf3f33ee00ef6948a874ffa00b9787c725ffc0f','user'),(8,'Nashik',0,'bharat@gmail.com',1234567890,'Bharat','d9192cb60ad447af5b146acc50025ceab6dc62d69c373728ba56675a787b373d','user');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-14 17:49:23
