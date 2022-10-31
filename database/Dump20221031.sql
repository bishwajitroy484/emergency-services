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
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alert_maker_master`
--

LOCK TABLES `alert_maker_master` WRITE;
/*!40000 ALTER TABLE `alert_maker_master` DISABLE KEYS */;
INSERT INTO `alert_maker_master` VALUES (2,4,1),(3,5,1),(4,6,2),(5,7,4),(6,8,5),(7,9,5),(8,10,2),(9,11,7),(10,12,6);
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
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `call_info_master`
--

LOCK TABLES `call_info_master` WRITE;
/*!40000 ALTER TABLE `call_info_master` DISABLE KEYS */;
INSERT INTO `call_info_master` VALUES (3,'No Notes',9716011484,1,'2022-10-30 07:46:03','2022-10-30 07:46:27',1),(4,'Its an Emergency',9716011484,1,'2022-10-30 07:52:30','2022-10-30 07:52:55',1),(5,NULL,9716011484,1,'2022-10-30 08:17:40','2022-10-30 08:17:46',1),(6,NULL,9716011484,3,'2022-10-30 10:46:57','2022-10-30 10:47:03',1),(7,'',9716011444,3,'2022-10-30 10:48:01','2022-10-30 10:48:28',1),(8,NULL,9716011484,2,'2022-10-30 13:34:08','2022-10-30 13:34:21',1),(9,NULL,9716011484,2,'2022-10-30 14:05:18','2022-10-30 14:05:28',1),(10,'',9716114948,3,'2022-10-30 16:44:44','2022-10-30 16:45:13',1),(11,'',9192993475,3,'2022-10-31 04:56:07','2022-10-31 04:56:41',9),(12,NULL,9716011484,1,'2022-10-31 08:27:28','2022-10-31 08:27:56',1);
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
INSERT INTO `city_master` VALUES (1,'Delhi',33),(2,'Thane',13),(3,'New Delhi',33),(4,'Mumbai',13),(5,'Pune',13),(6,'Naharlagun',1),(7,'Pasighat',1),(8,'Guwahati',2),(9,'Silchar',2),(10,'Dibrugarh',2),(11,'Nagaon',2),(12,'Tinsukia',2),(13,'Jorhat',2),(14,'Bongaigaon City',2),(15,'Dhubri',2),(16,'Diphu',2),(17,'North Lakhimpur',2),(18,'Tezpur',2),(19,'Karimganj',2),(20,'Sibsagar',2),(21,'Goalpara',2),(22,'Barpeta',2),(23,'Lanka',2),(24,'Lumding',2),(25,'Mankachar',2),(26,'Nalbari',2),(27,'Rangia',2),(28,'Margherita',2),(29,'Mangaldoi',2),(30,'Silapathar',2),(31,'Mariani',2),(32,'Marigaon',2),(33,'Patna',3),(34,'Gaya',3),(35,'Bhagalpur',3),(36,'Muzaffarpur',3),(37,'Darbhanga',3),(38,'Arrah',3),(39,'Begusarai',3),(40,'Chhapra',3),(41,'Katihar',3),(42,'Munger',3),(43,'Purnia',3),(44,'Saharsa',3),(45,'Sasaram',3),(46,'Hajipur',3),(47,'Dehri-on-Sone',3),(48,'Bettiah',3),(49,'Motihari',3),(50,'Bagaha',3),(51,'Siwan',3),(52,'Kishanganj',3),(53,'Jamalpur',3),(54,'Buxar',3),(55,'Jehanabad',3),(56,'Aurangabad',3),(57,'Lakhisarai',3),(58,'Nawada',3),(59,'Jamui',3),(60,'Sitamarhi',3),(61,'Araria',3),(62,'Gopalganj',3),(63,'Madhubani',3),(64,'Masaurhi',3),(65,'Samastipur',3),(66,'Mokameh',3),(67,'Supaul',3),(68,'Dumraon',3),(69,'Arwal',3),(70,'Forbesganj',3),(71,'BhabUrban Agglomeration',3),(72,'Narkatiaganj',3),(73,'Naugachhia',3),(74,'Madhepura',3),(75,'Sheikhpura',3),(76,'Sultanganj',3),(77,'Raxaul Bazar',3),(78,'Ramnagar',3),(79,'Mahnar Bazar',3),(80,'Warisaliganj',3),(81,'Revelganj',3),(82,'Rajgir',3),(83,'Sonepur',3),(84,'Sherghati',3),(85,'Sugauli',3),(86,'Makhdumpur',3),(87,'Maner',3),(88,'Rosera',3),(89,'Nokha',3),(90,'Piro',3),(91,'Rafiganj',3),(92,'Marhaura',3),(93,'Mirganj',3),(94,'Lalganj',3),(95,'Murliganj',3),(96,'Motipur',3),(97,'Manihari',3),(98,'Sheohar',3),(99,'Maharajganj',3),(100,'Silao',3),(101,'Barh',3),(102,'Asarganj',3),(103,'Chandigarh',30),(104,'Raipur',4),(105,'Bhilai Nagar',4),(106,'Korba',4),(107,'Bilaspur',4),(108,'Durg',4),(109,'Rajnandgaon',4),(110,'Jagdalpur',4),(111,'Raigarh',4),(112,'Ambikapur',4),(113,'Mahasamund',4),(114,'Dhamtari',4),(115,'Chirmiri',4),(116,'Bhatapara',4),(117,'Dalli-Rajhara',4),(118,'Naila Janjgir',4),(119,'Tilda Newra',4),(120,'Mungeli',4),(121,'Manendragarh',4),(122,'Sakti',4),(123,'Silvassa',31),(124,'Marmagao',5),(125,'Panaji',5),(126,'Margao',5),(127,'Mapusa',5),(128,'Ahmedabad',6),(129,'Surat',6),(130,'Vadodara',6),(131,'Rajkot',6),(132,'Bhavnagar',6),(133,'Jamnagar',6),(134,'Nadiad',6),(135,'Porbandar',6),(136,'Anand',6),(137,'Morvi',6),(138,'Mahesana',6),(139,'Bharuch',6),(140,'Vapi',6),(141,'Navsari',6),(142,'Veraval',6),(143,'Bhuj',6),(144,'Godhra',6),(145,'Palanpur',6),(146,'Valsad',6),(147,'Patan',6),(148,'Deesa',6),(149,'Amreli',6),(150,'Anjar',6),(151,'Dhoraji',6),(152,'Khambhat',6),(153,'Mahuva',6),(154,'Keshod',6),(155,'Wadhwan',6),(156,'Ankleshwar',6),(157,'Savarkundla',6),(158,'Kadi',6),(159,'Visnagar',6),(160,'Upleta',6),(161,'Una',6),(162,'Sidhpur',6),(163,'Unjha',6),(164,'Mangrol',6),(165,'Viramgam',6),(166,'Modasa',6),(167,'Palitana',6),(168,'Petlad',6),(169,'Kapadvanj',6),(170,'Sihor',6),(171,'Wankaner',6),(172,'Limbdi',6),(173,'Mandvi',6),(174,'Thangadh',6),(175,'Vyara',6),(176,'Padra',6),(177,'Lunawada',6),(178,'Rajpipla',6),(179,'Vapi',6),(180,'Umreth',6),(181,'Sanand',6),(182,'Rajula',6),(183,'Radhanpur',6),(184,'Mahemdabad',6),(185,'Ranavav',6),(186,'Tharad',6),(187,'Mansa',6),(188,'Umbergaon',6),(189,'Talaja',6),(190,'Vadnagar',6),(191,'Manavadar',6),(192,'Salaya',6),(193,'Vijapur',6),(194,'Pardi',6),(195,'Rapar',6),(196,'Songadh',6),(197,'Lathi',6),(198,'Adalaj',6),(199,'Chhapra',6),(200,'Faridabad',7),(201,'Gurgaon',7),(202,'Hisar',7),(203,'Rohtak',7),(204,'Panipat',7),(205,'Karnal',7),(206,'Sonipat',7),(207,'Yamunanagar',7),(208,'Panchkula',7),(209,'Bhiwani',7),(210,'Bahadurgarh',7),(211,'Jind',7),(212,'Sirsa',7),(213,'Thanesar',7),(214,'Kaithal',7),(215,'Palwal',7),(216,'Rewari',7),(217,'Hansi',7),(218,'Narnaul',7),(219,'Fatehabad',7),(220,'Gohana',7),(221,'Tohana',7),(222,'Narwana',7),(223,'Mandi Dabwali',7),(224,'Charkhi Dadri',7),(225,'Shahbad',7),(226,'Pehowa',7),(227,'Samalkha',7),(228,'Pinjore',7),(229,'Ladwa',7),(230,'Sohna',7),(231,'Safidon',7),(232,'Taraori',7),(233,'Mahendragarh',7),(234,'Ratia',7),(235,'Rania',7),(236,'Sarsod',7),(237,'Shimla',8),(238,'Mandi',8),(239,'Solan',8),(240,'Nahan',8),(241,'Sundarnagar',8),(242,'Palampur',8),(243,'Srinagar',34),(244,'Jammu',34),(245,'Baramula',34),(246,'Anantnag',34),(247,'Sopore',34),(248,'KathUrban Agglomeration',34),(249,'Rajauri',34),(250,'Punch',34),(251,'Udhampur',34),(252,'Dhanbad',9),(253,'Ranchi',9),(254,'Jamshedpur',9),(255,'Bokaro Steel City',9),(256,'Deoghar',9),(257,'Phusro',9),(258,'Adityapur',9),(259,'Hazaribag',9),(260,'Giridih',9),(261,'Ramgarh',9),(262,'Jhumri Tilaiya',9),(263,'Saunda',9),(264,'Sahibganj',9),(265,'Medininagar (Daltonganj)',9),(266,'Chaibasa',9),(267,'Chatra',9),(268,'Gumia',9),(269,'Dumka',9),(270,'Madhupur',9),(271,'Chirkunda',9),(272,'Pakaur',9),(273,'Simdega',9),(274,'Musabani',9),(275,'Mihijam',9),(276,'Patratu',9),(277,'Lohardaga',9),(278,'Tenu dam-cum-Kathhara',9),(279,'Bengaluru',10),(280,'Hubli-Dharwad',10),(281,'Belagavi',10),(282,'Mangaluru',10),(283,'Davanagere',10),(284,'Ballari',10),(285,'Tumkur',10),(286,'Shivamogga',10),(287,'Raayachuru',10),(288,'Robertson Pet',10),(289,'Kolar',10),(290,'Mandya',10),(291,'Udupi',10),(292,'Chikkamagaluru',10),(293,'Karwar',10),(294,'Ranebennuru',10),(295,'Ranibennur',10),(296,'Ramanagaram',10),(297,'Gokak',10),(298,'Yadgir',10),(299,'Rabkavi Banhatti',10),(300,'Shahabad',10),(301,'Sirsi',10),(302,'Sindhnur',10),(303,'Tiptur',10),(304,'Arsikere',10),(305,'Nanjangud',10),(306,'Sagara',10),(307,'Sira',10),(308,'Puttur',10),(309,'Athni',10),(310,'Mulbagal',10),(311,'Surapura',10),(312,'Siruguppa',10),(313,'Mudhol',10),(314,'Sidlaghatta',10),(315,'Shahpur',10),(316,'Saundatti-Yellamma',10),(317,'Wadi',10),(318,'Manvi',10),(319,'Nelamangala',10),(320,'Lakshmeshwar',10),(321,'Ramdurg',10),(322,'Nargund',10),(323,'Tarikere',10),(324,'Malavalli',10),(325,'Savanur',10),(326,'Lingsugur',10),(327,'Vijayapura',10),(328,'Sankeshwara',10),(329,'Madikeri',10),(330,'Talikota',10),(331,'Sedam',10),(332,'Shikaripur',10),(333,'Mahalingapura',10),(334,'Mudalagi',10),(335,'Muddebihal',10),(336,'Pavagada',10),(337,'Malur',10),(338,'Sindhagi',10),(339,'Sanduru',10),(340,'Afzalpur',10),(341,'Maddur',10),(342,'Madhugiri',10),(343,'Tekkalakote',10),(344,'Terdal',10),(345,'Mudabidri',10),(346,'Magadi',10),(347,'Navalgund',10),(348,'Shiggaon',10),(349,'Shrirangapattana',10),(350,'Sindagi',10),(351,'Sakaleshapura',10),(352,'Srinivaspur',10),(353,'Ron',10),(354,'Mundargi',10),(355,'Sadalagi',10),(356,'Piriyapatna',10),(357,'Adyar',10),(358,'Mysore',10),(359,'Thiruvananthapuram',11),(360,'Kochi',11),(361,'Kozhikode',11),(362,'Kollam',11),(363,'Thrissur',11),(364,'Palakkad',11),(365,'Alappuzha',11),(366,'Malappuram',11),(367,'Ponnani',11),(368,'Vatakara',11),(369,'Kanhangad',11),(370,'Taliparamba',11),(371,'Koyilandy',11),(372,'Neyyattinkara',11),(373,'Kayamkulam',11),(374,'Nedumangad',11),(375,'Kannur',11),(376,'Tirur',11),(377,'Kottayam',11),(378,'Kasaragod',11),(379,'Kunnamkulam',11),(380,'Ottappalam',11),(381,'Thiruvalla',11),(382,'Thodupuzha',11),(383,'Chalakudy',11),(384,'Changanassery',11),(385,'Punalur',11),(386,'Nilambur',11),(387,'Cherthala',11),(388,'Perinthalmanna',11),(389,'Mattannur',11),(390,'Shoranur',11),(391,'Varkala',11),(392,'Paravoor',11),(393,'Pathanamthitta',11),(394,'Peringathur',11),(395,'Attingal',11),(396,'Kodungallur',11),(397,'Pappinisseri',11),(398,'Chittur-Thathamangalam',11),(399,'Muvattupuzha',11),(400,'Adoor',11),(401,'Mavelikkara',11),(402,'Mavoor',11),(403,'Perumbavoor',11),(404,'Vaikom',11),(405,'Palai',11),(406,'Panniyannur',11),(407,'Guruvayoor',11),(408,'Puthuppally',11),(409,'Panamattom',11),(410,'Indore',12),(411,'Bhopal',12),(412,'Jabalpur',12),(413,'Gwalior',12),(414,'Ujjain',12),(415,'Sagar',12),(416,'Ratlam',12),(417,'Satna',12),(418,'Murwara (Katni)',12),(419,'Morena',12),(420,'Singrauli',12),(421,'Rewa',12),(422,'Vidisha',12),(423,'Ganjbasoda',12),(424,'Shivpuri',12),(425,'Mandsaur',12),(426,'Neemuch',12),(427,'Nagda',12),(428,'Itarsi',12),(429,'Sarni',12),(430,'Sehore',12),(431,'Mhow Cantonment',12),(432,'Seoni',12),(433,'Balaghat',12),(434,'Ashok Nagar',12),(435,'Tikamgarh',12),(436,'Shahdol',12),(437,'Pithampur',12),(438,'Alirajpur',12),(439,'Mandla',12),(440,'Sheopur',12),(441,'Shajapur',12),(442,'Panna',12),(443,'Raghogarh-Vijaypur',12),(444,'Sendhwa',12),(445,'Sidhi',12),(446,'Pipariya',12),(447,'Shujalpur',12),(448,'Sironj',12),(449,'Pandhurna',12),(450,'Nowgong',12),(451,'Mandideep',12),(452,'Sihora',12),(453,'Raisen',12),(454,'Lahar',12),(455,'Maihar',12),(456,'Sanawad',12),(457,'Sabalgarh',12),(458,'Umaria',12),(459,'Porsa',12),(460,'Narsinghgarh',12),(461,'Malaj Khand',12),(462,'Sarangpur',12),(463,'Mundi',12),(464,'Nepanagar',12),(465,'Pasan',12),(466,'Mahidpur',12),(467,'Seoni-Malwa',12),(468,'Rehli',12),(469,'Manawar',12),(470,'Rahatgarh',12),(471,'Panagar',12),(472,'Wara Seoni',12),(473,'Tarana',12),(474,'Sausar',12),(475,'Rajgarh',12),(476,'Niwari',12),(477,'Mauganj',12),(478,'Manasa',12),(479,'Nainpur',12),(480,'Prithvipur',12),(481,'Sohagpur',12),(482,'Nowrozabad (Khodargama)',12),(483,'Shamgarh',12),(484,'Maharajpur',12),(485,'Multai',12),(486,'Pali',12),(487,'Pachore',12),(488,'Rau',12),(489,'Mhowgaon',12),(490,'Vijaypur',12),(491,'Narsinghgarh',12),(492,'Nagpur',13),(493,'Nashik',13),(494,'Kalyan-Dombivali',13),(495,'Vasai-Virar',13),(496,'Solapur',13),(497,'Mira-Bhayandar',13),(498,'Bhiwandi',13),(499,'Amravati',13),(500,'Nanded-Waghala',13),(501,'Sangli',13),(502,'Malegaon',13),(503,'Akola',13),(504,'Latur',13),(505,'Dhule',13),(506,'Ahmednagar',13),(507,'Ichalkaranji',13),(508,'Parbhani',13),(509,'Panvel',13),(510,'Yavatmal',13),(511,'Achalpur',13),(512,'Osmanabad',13),(513,'Nandurbar',13),(514,'Satara',13),(515,'Wardha',13),(516,'Udgir',13),(517,'Aurangabad',13),(518,'Amalner',13),(519,'Akot',13),(520,'Pandharpur',13),(521,'Shrirampur',13),(522,'Parli',13),(523,'Washim',13),(524,'Ambejogai',13),(525,'Manmad',13),(526,'Ratnagiri',13),(527,'Uran Islampur',13),(528,'Pusad',13),(529,'Sangamner',13),(530,'Shirpur-Warwade',13),(531,'Malkapur',13),(532,'Wani',13),(533,'Lonavla',13),(534,'Talegaon Dabhade',13),(535,'Anjangaon',13),(536,'Umred',13),(537,'Palghar',13),(538,'Shegaon',13),(539,'Ozar',13),(540,'Phaltan',13),(541,'Yevla',13),(542,'Shahade',13),(543,'Vita',13),(544,'Umarkhed',13),(545,'Warora',13),(546,'Pachora',13),(547,'Tumsar',13),(548,'Manjlegaon',13),(549,'Sillod',13),(550,'Arvi',13),(551,'Nandura',13),(552,'Vaijapur',13),(553,'Wadgaon Road',13),(554,'Sailu',13),(555,'Murtijapur',13),(556,'Tasgaon',13),(557,'Mehkar',13),(558,'Yawal',13),(559,'Pulgaon',13),(560,'Nilanga',13),(561,'Wai',13),(562,'Umarga',13),(563,'Paithan',13),(564,'Rahuri',13),(565,'Nawapur',13),(566,'Tuljapur',13),(567,'Morshi',13),(568,'Purna',13),(569,'Satana',13),(570,'Pathri',13),(571,'Sinnar',13),(572,'Uchgaon',13),(573,'Uran',13),(574,'Pen',13),(575,'Karjat',13),(576,'Manwath',13),(577,'Partur',13),(578,'Sangole',13),(579,'Mangrulpir',13),(580,'Risod',13),(581,'Shirur',13),(582,'Savner',13),(583,'Sasvad',13),(584,'Pandharkaoda',13),(585,'Talode',13),(586,'Shrigonda',13),(587,'Shirdi',13),(588,'Raver',13),(589,'Mukhed',13),(590,'Rajura',13),(591,'Vadgaon Kasba',13),(592,'Tirora',13),(593,'Mahad',13),(594,'Lonar',13),(595,'Sawantwadi',13),(596,'Pathardi',13),(597,'Pauni',13),(598,'Ramtek',13),(599,'Mul',13),(600,'Soyagaon',13),(601,'Mangalvedhe',13),(602,'Narkhed',13),(603,'Shendurjana',13),(604,'Patur',13),(605,'Mhaswad',13),(606,'Loha',13),(607,'Nandgaon',13),(608,'Warud',13),(609,'Imphal',14),(610,'Thoubal',14),(611,'Lilong',14),(612,'Mayang Imphal',14),(613,'Shillong',15),(614,'Tura',15),(615,'Nongstoin',15),(616,'Aizawl',16),(617,'Lunglei',16),(618,'Saiha',16),(619,'Dimapur',17),(620,'Kohima',17),(621,'Zunheboto',17),(622,'Tuensang',17),(623,'Wokha',17),(624,'Mokokchung',17),(625,'Bhubaneswar',18),(626,'Cuttack',18),(627,'Raurkela',18),(628,'Brahmapur',18),(629,'Sambalpur',18),(630,'Puri',18),(631,'Baleshwar Town',18),(632,'Baripada Town',18),(633,'Bhadrak',18),(634,'Balangir',18),(635,'Jharsuguda',18),(636,'Bargarh',18),(637,'Paradip',18),(638,'Bhawanipatna',18),(639,'Dhenkanal',18),(640,'Barbil',18),(641,'Kendujhar',18),(642,'Sunabeda',18),(643,'Rayagada',18),(644,'Jatani',18),(645,'Byasanagar',18),(646,'Kendrapara',18),(647,'Rajagangapur',18),(648,'Parlakhemundi',18),(649,'Talcher',18),(650,'Sundargarh',18),(651,'Phulabani',18),(652,'Pattamundai',18),(653,'Titlagarh',18),(654,'Nabarangapur',18),(655,'Soro',18),(656,'Malkangiri',18),(657,'Rairangpur',18),(658,'Tarbha',18),(659,'Ludhiana',19),(660,'Patiala',19),(661,'Amritsar',19),(662,'Jalandhar',19),(663,'Bathinda',19),(664,'Pathankot',19),(665,'Hoshiarpur',19),(666,'Batala',19),(667,'Moga',19),(668,'Malerkotla',19),(669,'Khanna',19),(670,'Mohali',19),(671,'Barnala',19),(672,'Firozpur',19),(673,'Phagwara',19),(674,'Kapurthala',19),(675,'Zirakpur',19),(676,'Kot Kapura',19),(677,'Faridkot',19),(678,'Muktsar',19),(679,'Rajpura',19),(680,'Sangrur',19),(681,'Fazilka',19),(682,'Gurdaspur',19),(683,'Kharar',19),(684,'Gobindgarh',19),(685,'Mansa',19),(686,'Malout',19),(687,'Nabha',19),(688,'Tarn Taran',19),(689,'Jagraon',19),(690,'Sunam',19),(691,'Dhuri',19),(692,'Firozpur Cantt.',19),(693,'Sirhind Fatehgarh Sahib',19),(694,'Rupnagar',19),(695,'Jalandhar Cantt.',19),(696,'Samana',19),(697,'Nawanshahr',19),(698,'Rampura Phul',19),(699,'Nangal',19),(700,'Nakodar',19),(701,'Zira',19),(702,'Patti',19),(703,'Raikot',19),(704,'Longowal',19),(705,'Urmar Tanda',19),(706,'Morinda, India',19),(707,'Phillaur',19),(708,'Pattran',19),(709,'Qadian',19),(710,'Sujanpur',19),(711,'Mukerian',19),(712,'Talwara',19),(713,'Jaipur',20),(714,'Jodhpur',20),(715,'Bikaner',20),(716,'Udaipur',20),(717,'Ajmer',20),(718,'Bhilwara',20),(719,'Alwar',20),(720,'Bharatpur',20),(721,'Pali',20),(722,'Barmer',20),(723,'Sikar',20),(724,'Tonk',20),(725,'Sadulpur',20),(726,'Sawai Madhopur',20),(727,'Nagaur',20),(728,'Makrana',20),(729,'Sujangarh',20),(730,'Sardarshahar',20),(731,'Ladnu',20),(732,'Ratangarh',20),(733,'Nokha',20),(734,'Nimbahera',20),(735,'Suratgarh',20),(736,'Rajsamand',20),(737,'Lachhmangarh',20),(738,'Rajgarh (Churu)',20),(739,'Nasirabad',20),(740,'Nohar',20),(741,'Phalodi',20),(742,'Nathdwara',20),(743,'Pilani',20),(744,'Merta City',20),(745,'Sojat',20),(746,'Neem-Ka-Thana',20),(747,'Sirohi',20),(748,'Pratapgarh',20),(749,'Rawatbhata',20),(750,'Sangaria',20),(751,'Lalsot',20),(752,'Pilibanga',20),(753,'Pipar City',20),(754,'Taranagar',20),(755,'Vijainagar, Ajmer',20),(756,'Sumerpur',20),(757,'Sagwara',20),(758,'Ramganj Mandi',20),(759,'Lakheri',20),(760,'Udaipurwati',20),(761,'Losal',20),(762,'Sri Madhopur',20),(763,'Ramngarh',20),(764,'Rawatsar',20),(765,'Rajakhera',20),(766,'Shahpura',20),(767,'Shahpura',20),(768,'Raisinghnagar',20),(769,'Malpura',20),(770,'Nadbai',20),(771,'Sanchore',20),(772,'Nagar',20),(773,'Rajgarh (Alwar)',20),(774,'Sheoganj',20),(775,'Sadri',20),(776,'Todaraisingh',20),(777,'Todabhim',20),(778,'Reengus',20),(779,'Rajaldesar',20),(780,'Sadulshahar',20),(781,'Sambhar',20),(782,'Prantij',20),(783,'Mount Abu',20),(784,'Mangrol',20),(785,'Phulera',20),(786,'Mandawa',20),(787,'Pindwara',20),(788,'Mandalgarh',20),(789,'Takhatgarh',20),(790,'Visakhapatnam',21),(791,'Vijayawada',21),(792,'Guntur',21),(793,'Nellore',21),(794,'Kurnool',21),(795,'Rajahmundry',21),(796,'Kakinada',21),(797,'Tirupati',21),(798,'Anantapur',21),(799,'Kadapa',21),(800,'Vizianagaram',21),(801,'Eluru',21),(802,'Ongole',21),(803,'Nandyal',21),(804,'Machilipatnam',21),(805,'Adoni',21),(806,'Tenali',21),(807,'Chittoor',21),(808,'Hindupur',21),(809,'Proddatur',21),(810,'Bhimavaram',21),(811,'Madanapalle',21),(812,'Guntakal',21),(813,'Dharmavaram',21),(814,'Gudivada',21),(815,'Srikakulam',21),(816,'Narasaraopet',21),(817,'Rajampet',21),(818,'Tadpatri',21),(819,'Tadepalligudem',21),(820,'Chilakaluripet',21),(821,'Yemmiganur',21),(822,'Kadiri',21),(823,'Chirala',21),(824,'Anakapalle',21),(825,'Kavali',21),(826,'Palacole',21),(827,'Sullurpeta',21),(828,'Tanuku',21),(829,'Rayachoti',21),(830,'Srikalahasti',21),(831,'Bapatla',21),(832,'Naidupet',21),(833,'Nagari',21),(834,'Gudur',21),(835,'Vinukonda',21),(836,'Narasapuram',21),(837,'Nuzvid',21),(838,'Markapur',21),(839,'Ponnur',21),(840,'Kandukur',21),(841,'Bobbili',21),(842,'Rayadurg',21),(843,'Samalkot',21),(844,'Jaggaiahpet',21),(845,'Tuni',21),(846,'Amalapuram',21),(847,'Bheemunipatnam',21),(848,'Venkatagiri',21),(849,'Sattenapalle',21),(850,'Pithapuram',21),(851,'Palasa Kasibugga',21),(852,'Parvathipuram',21),(853,'Macherla',21),(854,'Gooty',21),(855,'Salur',21),(856,'Mandapeta',21),(857,'Jammalamadugu',21),(858,'Peddapuram',21),(859,'Punganur',21),(860,'Nidadavole',21),(861,'Repalle',21),(862,'Ramachandrapuram',21),(863,'Kovvur',21),(864,'Tiruvuru',21),(865,'Uravakonda',21),(866,'Narsipatnam',21),(867,'Yerraguntla',21),(868,'Pedana',21),(869,'Puttur',21),(870,'Renigunta',21),(871,'Rajam',21),(872,'Srisailam',21),(873,'Sikkim',22),(874,'Chennai',23),(875,'Coimbatore',23),(876,'Madurai',23),(877,'Tiruchirappalli',23),(878,'Salem',23),(879,'Tirunelveli',23),(880,'Tiruppur',23),(881,'Ranipet',23),(882,'Nagercoil',23),(883,'Thanjavur',23),(884,'Vellore',23),(885,'Kancheepuram',23),(886,'Erode',23),(887,'Tiruvannamalai',23),(888,'Pollachi',23),(889,'Rajapalayam',23),(890,'Sivakasi',23),(891,'Pudukkottai',23),(892,'Neyveli (TS)',23),(893,'Nagapattinam',23),(894,'Viluppuram',23),(895,'Tiruchengode',23),(896,'Vaniyambadi',23),(897,'Theni Allinagaram',23),(898,'Udhagamandalam',23),(899,'Aruppukkottai',23),(900,'Paramakudi',23),(901,'Arakkonam',23),(902,'Virudhachalam',23),(903,'Srivilliputhur',23),(904,'Tindivanam',23),(905,'Virudhunagar',23),(906,'Karur',23),(907,'Valparai',23),(908,'Sankarankovil',23),(909,'Tenkasi',23),(910,'Palani',23),(911,'Pattukkottai',23),(912,'Tirupathur',23),(913,'Ramanathapuram',23),(914,'Udumalaipettai',23),(915,'Gobichettipalayam',23),(916,'Thiruvarur',23),(917,'Thiruvallur',23),(918,'Panruti',23),(919,'Namakkal',23),(920,'Thirumangalam',23),(921,'Vikramasingapuram',23),(922,'Nellikuppam',23),(923,'Rasipuram',23),(924,'Tiruttani',23),(925,'Nandivaram-Guduvancheri',23),(926,'Periyakulam',23),(927,'Pernampattu',23),(928,'Vellakoil',23),(929,'Sivaganga',23),(930,'Vadalur',23),(931,'Rameshwaram',23),(932,'Tiruvethipuram',23),(933,'Perambalur',23),(934,'Usilampatti',23),(935,'Vedaranyam',23),(936,'Sathyamangalam',23),(937,'Puliyankudi',23),(938,'Nanjikottai',23),(939,'Thuraiyur',23),(940,'Sirkali',23),(941,'Tiruchendur',23),(942,'Periyasemur',23),(943,'Sattur',23),(944,'Vandavasi',23),(945,'Tharamangalam',23),(946,'Tirukkoyilur',23),(947,'Oddanchatram',23),(948,'Palladam',23),(949,'Vadakkuvalliyur',23),(950,'Tirukalukundram',23),(951,'Uthamapalayam',23),(952,'Surandai',23),(953,'Sankari',23),(954,'Shenkottai',23),(955,'Vadipatti',23),(956,'Sholingur',23),(957,'Tirupathur',23),(958,'Manachanallur',23),(959,'Viswanatham',23),(960,'Polur',23),(961,'Panagudi',23),(962,'Uthiramerur',23),(963,'Thiruthuraipoondi',23),(964,'Pallapatti',23),(965,'Ponneri',23),(966,'Lalgudi',23),(967,'Natham',23),(968,'Unnamalaikadai',23),(969,'P.N.Patti',23),(970,'Tharangambadi',23),(971,'Tittakudi',23),(972,'Pacode',23),(973,'O\' Valley',23),(974,'Suriyampalayam',23),(975,'Sholavandan',23),(976,'Thammampatti',23),(977,'Namagiripettai',23),(978,'Peravurani',23),(979,'Parangipettai',23),(980,'Pudupattinam',23),(981,'Pallikonda',23),(982,'Sivagiri',23),(983,'Punjaipugalur',23),(984,'Padmanabhapuram',23),(985,'Thirupuvanam',23),(986,'Hyderabad',24),(987,'Warangal',24),(988,'Nizamabad',24),(989,'Karimnagar',24),(990,'Ramagundam',24),(991,'Khammam',24),(992,'Mahbubnagar',24),(993,'Mancherial',24),(994,'Adilabad',24),(995,'Suryapet',24),(996,'Jagtial',24),(997,'Miryalaguda',24),(998,'Nirmal',24),(999,'Kamareddy',24),(1000,'Kothagudem',24),(1001,'Bodhan',24),(1002,'Palwancha',24),(1003,'Mandamarri',24),(1004,'Koratla',24),(1005,'Sircilla',24),(1006,'Tandur',24),(1007,'Siddipet',24),(1008,'Wanaparthy',24),(1009,'Kagaznagar',24),(1010,'Gadwal',24),(1011,'Sangareddy',24),(1012,'Bellampalle',24),(1013,'Bhongir',24),(1014,'Vikarabad',24),(1015,'Jangaon',24),(1016,'Bhadrachalam',24),(1017,'Bhainsa',24),(1018,'Farooqnagar',24),(1019,'Medak',24),(1020,'Narayanpet',24),(1021,'Sadasivpet',24),(1022,'Yellandu',24),(1023,'Manuguru',24),(1024,'Kyathampalle',24),(1025,'Nagarkurnool',24),(1026,'Agartala',25),(1027,'Udaipur',25),(1028,'Dharmanagar',25),(1029,'Pratapgarh',25),(1030,'Kailasahar',25),(1031,'Belonia',25),(1032,'Khowai',25),(1033,'Lucknow',26),(1034,'Kanpur',26),(1035,'Firozabad',26),(1036,'Agra',26),(1037,'Meerut',26),(1038,'Varanasi',26),(1039,'Allahabad',26),(1040,'Amroha',26),(1041,'Moradabad',26),(1042,'Aligarh',26),(1043,'Saharanpur',26),(1044,'Noida',26),(1045,'Loni',26),(1046,'Jhansi',26),(1047,'Shahjahanpur',26),(1048,'Rampur',26),(1049,'Modinagar',26),(1050,'Hapur',26),(1051,'Etawah',26),(1052,'Sambhal',26),(1053,'Orai',26),(1054,'Bahraich',26),(1055,'Unnao',26),(1056,'Rae Bareli',26),(1057,'Lakhimpur',26),(1058,'Sitapur',26),(1059,'Lalitpur',26),(1060,'Pilibhit',26),(1061,'Chandausi',26),(1062,'Hardoi ',26),(1063,'Azamgarh',26),(1064,'Khair',26),(1065,'Sultanpur',26),(1066,'Tanda',26),(1067,'Nagina',26),(1068,'Shamli',26),(1069,'Najibabad',26),(1070,'Shikohabad',26),(1071,'Sikandrabad',26),(1072,'Shahabad, Hardoi',26),(1073,'Pilkhuwa',26),(1074,'Renukoot',26),(1075,'Vrindavan',26),(1076,'Ujhani',26),(1077,'Laharpur',26),(1078,'Tilhar',26),(1079,'Sahaswan',26),(1080,'Rath',26),(1081,'Sherkot',26),(1082,'Kalpi',26),(1083,'Tundla',26),(1084,'Sandila',26),(1085,'Nanpara',26),(1086,'Sardhana',26),(1087,'Nehtaur',26),(1088,'Seohara',26),(1089,'Padrauna',26),(1090,'Mathura',26),(1091,'Thakurdwara',26),(1092,'Nawabganj',26),(1093,'Siana',26),(1094,'Noorpur',26),(1095,'Sikandra Rao',26),(1096,'Puranpur',26),(1097,'Rudauli',26),(1098,'Thana Bhawan',26),(1099,'Palia Kalan',26),(1100,'Zaidpur',26),(1101,'Nautanwa',26),(1102,'Zamania',26),(1103,'Shikarpur, Bulandshahr',26),(1104,'Naugawan Sadat',26),(1105,'Fatehpur Sikri',26),(1106,'Shahabad, Rampur',26),(1107,'Robertsganj',26),(1108,'Utraula',26),(1109,'Sadabad',26),(1110,'Rasra',26),(1111,'Lar',26),(1112,'Lal Gopalganj Nindaura',26),(1113,'Sirsaganj',26),(1114,'Pihani',26),(1115,'Shamsabad, Agra',26),(1116,'Rudrapur',26),(1117,'Soron',26),(1118,'SUrban Agglomerationr',26),(1119,'Samdhan',26),(1120,'Sahjanwa',26),(1121,'Rampur Maniharan',26),(1122,'Sumerpur',26),(1123,'Shahganj',26),(1124,'Tulsipur',26),(1125,'Tirwaganj',26),(1126,'PurqUrban Agglomerationzi',26),(1127,'Shamsabad, Farrukhabad',26),(1128,'Warhapur',26),(1129,'Powayan',26),(1130,'Sandi',26),(1131,'Achhnera',26),(1132,'Naraura',26),(1133,'Nakur',26),(1134,'Sahaspur',26),(1135,'Safipur',26),(1136,'Reoti',26),(1137,'Sikanderpur',26),(1138,'Saidpur',26),(1139,'Sirsi',26),(1140,'Purwa',26),(1141,'Parasi',26),(1142,'Lalganj',26),(1143,'Phulpur',26),(1144,'Shishgarh',26),(1145,'Sahawar',26),(1146,'Samthar',26),(1147,'Pukhrayan',26),(1148,'Obra',26),(1149,'Niwai',26),(1150,'Dehradun',27),(1151,'Hardwar',27),(1152,'Haldwani-cum-Kathgodam',27),(1153,'Srinagar',27),(1154,'Kashipur',27),(1155,'Roorkee',27),(1156,'Rudrapur',27),(1157,'Rishikesh',27),(1158,'Ramnagar',27),(1159,'Pithoragarh',27),(1160,'Manglaur',27),(1161,'Nainital',27),(1162,'Mussoorie',27),(1163,'Tehri',27),(1164,'Pauri',27),(1165,'Nagla',27),(1166,'Sitarganj',27),(1167,'Bageshwar',27),(1168,'Kolkata',28),(1169,'Siliguri',28),(1170,'Asansol',28),(1171,'Raghunathganj',28),(1172,'Kharagpur',28),(1173,'Naihati',28),(1174,'English Bazar',28),(1175,'Baharampur',28),(1176,'Hugli-Chinsurah',28),(1177,'Raiganj',28),(1178,'Jalpaiguri',28),(1179,'Santipur',28),(1180,'Balurghat',28),(1181,'Medinipur',28),(1182,'Habra',28),(1183,'Ranaghat',28),(1184,'Bankura',28),(1185,'Nabadwip',28),(1186,'Darjiling',28),(1187,'Purulia',28),(1188,'Arambagh',28),(1189,'Tamluk',28),(1190,'AlipurdUrban Agglomerationr',28),(1191,'Suri',28),(1192,'Jhargram',28),(1193,'Gangarampur',28),(1194,'Rampurhat',28),(1195,'Kalimpong',28),(1196,'Sainthia',28),(1197,'Taki',28),(1198,'Murshidabad',28),(1199,'Memari',28),(1200,'Paschim Punropara',28),(1201,'Tarakeswar',28),(1202,'Sonamukhi',28),(1203,'PandUrban Agglomeration',28),(1204,'Mainaguri',28),(1205,'Malda',28),(1206,'Panchla',28),(1207,'Raghunathpur',28),(1208,'Mathabhanga',28),(1209,'Monoharpur',28),(1210,'Srirampore',28),(1211,'Adra',28),(1212,'Port Blair',29),(1213,'Pondicherry',36),(1214,'Karaikal',36),(1215,'Yanam',36),(1216,'Mahe',36),(1217,'Daman & Diu',32),(1218,'Lakshadweep',35);
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
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `location_master`
--

LOCK TABLES `location_master` WRITE;
/*!40000 ALTER TABLE `location_master` DISABLE KEYS */;
INSERT INTO `location_master` VALUES (1,'sarita Vihar','1100888','13-B'),(2,'Sector-18','110065','13-B'),(3,'Delhi','110077','q-10'),(7,'Sarita Vihar','7767666','8h'),(8,'Sarita Vihar','110088','7-C'),(9,'Agra','2033221','G-234'),(10,'Noida','230032','8-D'),(11,'sec-192','230021','d-10');
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
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `operator_master`
--

LOCK TABLES `operator_master` WRITE;
/*!40000 ALTER TABLE `operator_master` DISABLE KEYS */;
INSERT INTO `operator_master` VALUES (1,'Vicky','Roy','VickyRoy1','admin'),(9,'Bishwajit','Roy','Bishwajit.Roy1','admin');
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
  `Adhar` double DEFAULT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_master`
--

LOCK TABLES `user_master` WRITE;
/*!40000 ALTER TABLE `user_master` DISABLE KEYS */;
INSERT INTO `user_master` VALUES (1,999999,1,9716011484,1),(2,NULL,1,9716011485,2),(3,123456789,1,9716011486,3),(6,565555,1,9714432344,7),(7,123456789,1,9716011444,8),(8,46664888373,1044,9716114948,10),(9,57767409,1044,9192993475,11);
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

-- Dump completed on 2022-10-31 14:31:44
