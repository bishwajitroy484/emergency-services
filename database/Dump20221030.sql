CREATE DATABASE  IF NOT EXISTS `es_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `es_db`;
-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: localhost    Database: es_db
-- ------------------------------------------------------
-- Server version	8.0.30

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
-- Table structure for table `administrator_master`
--

DROP TABLE IF EXISTS `administrator_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `administrator_master` (
  `admin_id` int NOT NULL,
  `fname` varchar(45) NOT NULL,
  `lname` varchar(45) NOT NULL,
  PRIMARY KEY (`admin_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `administrator_master`
--

LOCK TABLES `administrator_master` WRITE;
/*!40000 ALTER TABLE `administrator_master` DISABLE KEYS */;
/*!40000 ALTER TABLE `administrator_master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `alert_maker_master`
--

DROP TABLE IF EXISTS `alert_maker_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `alert_maker_master` (
  `alert_maker_id` int NOT NULL AUTO_INCREMENT,
  `call_id` int NOT NULL,
  `action_id` int NOT NULL,
  PRIMARY KEY (`alert_maker_id`),
  KEY `alert_call_idx` (`call_id`),
  KEY `alert_status_idx` (`action_id`),
  CONSTRAINT `alert_call` FOREIGN KEY (`call_id`) REFERENCES `call_info_master` (`call_id`),
  CONSTRAINT `alert_status` FOREIGN KEY (`action_id`) REFERENCES `rescue_system_master` (`rescue_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alert_maker_master`
--

LOCK TABLES `alert_maker_master` WRITE;
/*!40000 ALTER TABLE `alert_maker_master` DISABLE KEYS */;
INSERT INTO `alert_maker_master` VALUES (2,4,1);
/*!40000 ALTER TABLE `alert_maker_master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `call_info_master`
--

DROP TABLE IF EXISTS `call_info_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `call_info_master` (
  `call_id` int NOT NULL AUTO_INCREMENT,
  `notes` varchar(45) DEFAULT NULL,
  `phone_number` double NOT NULL,
  `call_status_id` int NOT NULL,
  `call_start_time` timestamp NULL DEFAULT NULL,
  `call_end_time` timestamp NULL DEFAULT NULL,
  `operator_id` int NOT NULL,
  PRIMARY KEY (`call_id`),
  KEY `call_status_idx` (`call_status_id`),
  KEY `call_user_master_idx` (`phone_number`),
  KEY `call_operator_master_idx` (`operator_id`),
  CONSTRAINT `call_operator` FOREIGN KEY (`operator_id`) REFERENCES `operator_master` (`operator_id`),
  CONSTRAINT `call_status` FOREIGN KEY (`call_status_id`) REFERENCES `call_status_master` (`id`),
  CONSTRAINT `call_user_master` FOREIGN KEY (`phone_number`) REFERENCES `user_master` (`phone_no`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `call_info_master`
--

LOCK TABLES `call_info_master` WRITE;
/*!40000 ALTER TABLE `call_info_master` DISABLE KEYS */;
INSERT INTO `call_info_master` VALUES (3,'No Notes',9716011484,1,'2022-10-30 07:46:03','2022-10-30 07:46:27',1),(4,'Its an Emergency',9716011484,1,'2022-10-30 07:52:30','2022-10-30 07:52:55',1);
/*!40000 ALTER TABLE `call_info_master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `call_status_master`
--

DROP TABLE IF EXISTS `call_status_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `call_status_master` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `call_status_master`
--

LOCK TABLES `call_status_master` WRITE;
/*!40000 ALTER TABLE `call_status_master` DISABLE KEYS */;
INSERT INTO `call_status_master` VALUES (1,'Successful Call'),(2,'Call Rerouted'),(3,'Call Interrupted'),(4,'Call Dropped');
/*!40000 ALTER TABLE `call_status_master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `city_master`
--

DROP TABLE IF EXISTS `city_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `city_master` (
  `city_id` int NOT NULL,
  `name` varchar(45) NOT NULL,
  `state_id` int NOT NULL,
  PRIMARY KEY (`city_id`),
  UNIQUE KEY `city_id_UNIQUE` (`city_id`),
  KEY `city_state_idx` (`state_id`),
  CONSTRAINT `city_state` FOREIGN KEY (`state_id`) REFERENCES `state_master` (`state_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `city_master`
--

LOCK TABLES `city_master` WRITE;
/*!40000 ALTER TABLE `city_master` DISABLE KEYS */;
INSERT INTO `city_master` VALUES (1,'Delhi',33),(2,'Thane',13);
/*!40000 ALTER TABLE `city_master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `location_master`
--

DROP TABLE IF EXISTS `location_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `location_master` (
  `location_id` int NOT NULL AUTO_INCREMENT,
  `street` varchar(45) NOT NULL,
  `pincode` varchar(45) NOT NULL,
  `house_no` varchar(45) NOT NULL,
  PRIMARY KEY (`location_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `location_master`
--

LOCK TABLES `location_master` WRITE;
/*!40000 ALTER TABLE `location_master` DISABLE KEYS */;
INSERT INTO `location_master` VALUES (1,'sarita Vihar','11001','10-E'),(2,'Sector-18','110065','13-B'),(3,'Delhi','110077','q-10');
/*!40000 ALTER TABLE `location_master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `operator_master`
--

DROP TABLE IF EXISTS `operator_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `operator_master` (
  `operator_id` int NOT NULL AUTO_INCREMENT,
  `fname` varchar(45) NOT NULL,
  `lname` varchar(45) NOT NULL,
  `username` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  PRIMARY KEY (`operator_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `operator_master`
--

LOCK TABLES `operator_master` WRITE;
/*!40000 ALTER TABLE `operator_master` DISABLE KEYS */;
INSERT INTO `operator_master` VALUES (1,'Vicky','Roy','VickyRoy1','admin');
/*!40000 ALTER TABLE `operator_master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `phone_number_status`
--

DROP TABLE IF EXISTS `phone_number_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `phone_number_status` (
  `phone_number_id` int NOT NULL,
  `call_id` int NOT NULL,
  `phone_status` varchar(45) NOT NULL,
  PRIMARY KEY (`phone_number_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `phone_number_status`
--

LOCK TABLES `phone_number_status` WRITE;
/*!40000 ALTER TABLE `phone_number_status` DISABLE KEYS */;
/*!40000 ALTER TABLE `phone_number_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rescue_system_master`
--

DROP TABLE IF EXISTS `rescue_system_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rescue_system_master` (
  `rescue_id` int NOT NULL,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`rescue_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rescue_system_master`
--

LOCK TABLES `rescue_system_master` WRITE;
/*!40000 ALTER TABLE `rescue_system_master` DISABLE KEYS */;
INSERT INTO `rescue_system_master` VALUES (1,'Lifegaurd'),(2,'Mountain'),(3,'Fire'),(4,'Ambulence'),(5,'Police'),(6,'Flood'),(7,'Earthquake');
/*!40000 ALTER TABLE `rescue_system_master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `state_master`
--

DROP TABLE IF EXISTS `state_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `state_master` (
  `state_id` int NOT NULL,
  `name` varchar(45) NOT NULL,
  `capital` varchar(45) NOT NULL,
  PRIMARY KEY (`state_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `state_master`
--

LOCK TABLES `state_master` WRITE;
/*!40000 ALTER TABLE `state_master` DISABLE KEYS */;
INSERT INTO `state_master` VALUES (1,'Arunachal Pradesh','Itanagar'),(2,'Assam','Dispur'),(3,'Bihar','Patna'),(4,'Chhattisgarh ','Raipur'),(5,'Goa','Panaji'),(6,'Gujarat','Gandhinagar'),(7,'Haryana','Chandigarh'),(8,'Himachal Pradesh','Shimla'),(9,'Jharkhand','Ranchi'),(10,'Karnataka','Bengaluru'),(11,'Kerala','Thiruvananthapuram'),(12,'Madhya Pradesh','Bhopal'),(13,'Maharashtra','Mumbai'),(14,'Manipur','Imphal'),(15,'Meghalaya','Shillong'),(16,'Mizoram','Aizawl'),(17,'Nagaland','Kohima'),(18,'Orissa','Bhubaneswar'),(19,'Punjab','Chandigarh'),(20,'Rajasthan','Jaipur'),(21,'Seemandra (Andhra Pradesh','Amaravathi'),(22,'Sikkim','Gangtok'),(23,'Tamil Nadu','Chennai'),(24,'Telangana','Hyderabad'),(25,'Tripura','Agartala'),(26,'Uttar Pradesh','Lucknow'),(27,'Uttarakhand ','Dehradun'),(28,'West Bengal','Kolkata'),(29,'Andaman & Nicobar','Port Blair'),(30,'Chandigarh','Chandigarh'),(31,'Dandra & Nagar Haveli','Silvassa'),(32,'Daman & Diu','Daman'),(33,'Delhi','Delhi'),(34,'Jammu & Kashmir','Srinagar'),(35,'Lakshadweep','Kavaratti '),(36,'Pondicherry','Pondicherry');
/*!40000 ALTER TABLE `state_master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_master`
--

DROP TABLE IF EXISTS `user_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_master` (
  `id` int NOT NULL AUTO_INCREMENT,
  `Adhar` int DEFAULT NULL,
  `city_id` int NOT NULL,
  `phone_no` double NOT NULL,
  `location_id` int NOT NULL,
  PRIMARY KEY (`id`,`phone_no`),
  KEY `user_city_idx` (`city_id`),
  KEY `user_location_idx` (`location_id`),
  KEY `userM_location` (`location_id`),
  KEY `user_phone_idx` (`phone_no`),
  CONSTRAINT `user_city` FOREIGN KEY (`city_id`) REFERENCES `city_master` (`city_id`),
  CONSTRAINT `user_loc` FOREIGN KEY (`location_id`) REFERENCES `location_master` (`location_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_master`
--

LOCK TABLES `user_master` WRITE;
/*!40000 ALTER TABLE `user_master` DISABLE KEYS */;
INSERT INTO `user_master` VALUES (1,123456,1,9716011484,1),(2,NULL,1,9716011485,2),(3,123456789,1,9716011486,3);
/*!40000 ALTER TABLE `user_master` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-10-30 13:27:48
