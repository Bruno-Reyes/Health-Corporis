-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: localhost    Database: honeypot2
-- ------------------------------------------------------
-- Server version	5.7.17-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `honeypot2`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `honeypot2` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `honeypot2`;

--
-- Table structure for table `agrupar_alimento`
--

DROP TABLE IF EXISTS `agrupar_alimento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `agrupar_alimento` (
  `id_ada` int(11) NOT NULL AUTO_INCREMENT,
  `id_gal` int(11) NOT NULL,
  `id_ali` int(11) NOT NULL,
  PRIMARY KEY (`id_ada`),
  KEY `id_gal` (`id_gal`),
  KEY `id_ali` (`id_ali`),
  CONSTRAINT `agrupar_alimento_ibfk_1` FOREIGN KEY (`id_gal`) REFERENCES `grupo_alimenticio` (`id_gal`),
  CONSTRAINT `agrupar_alimento_ibfk_2` FOREIGN KEY (`id_ali`) REFERENCES `alimento` (`id_ali`)
) ENGINE=InnoDB AUTO_INCREMENT=431 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `agrupar_alimento`
--

LOCK TABLES `agrupar_alimento` WRITE;
/*!40000 ALTER TABLE `agrupar_alimento` DISABLE KEYS */;
INSERT INTO `agrupar_alimento` VALUES (2,5,2),(3,5,3),(4,5,4),(5,5,5),(6,5,6),(7,5,7),(8,5,8),(9,5,9),(10,5,10),(11,5,11),(12,5,12),(13,5,13),(14,5,14),(15,5,15),(16,5,16),(17,5,17),(18,5,18),(19,5,19),(20,5,20),(21,5,21),(22,5,22),(23,5,23),(24,5,24),(25,5,25),(26,5,26),(27,5,27),(28,5,28),(29,5,29),(30,5,30),(31,5,31),(32,5,32),(33,5,33),(34,5,34),(35,5,35),(36,5,36),(37,5,37),(38,5,38),(39,5,39),(40,5,40),(41,5,41),(42,5,42),(43,5,43),(44,5,44),(45,5,45),(46,5,46),(47,5,47),(48,5,48),(49,5,49),(50,5,50),(51,5,51),(52,5,52),(54,5,54),(55,5,55),(56,5,56),(57,5,57),(58,5,58),(59,5,59),(60,5,60),(61,5,61),(62,5,62),(63,5,63),(64,5,64),(65,5,65),(66,5,66),(68,5,68),(69,5,69),(70,5,70),(71,5,71),(72,5,72),(73,5,73),(74,5,74),(75,5,75),(76,5,76),(77,5,77),(78,5,78),(79,5,79),(80,5,80),(81,5,81),(82,5,82),(83,5,83),(84,5,84),(85,5,85),(86,5,86),(87,5,87),(88,5,88),(89,5,89),(90,5,90),(91,5,91),(92,5,92),(93,5,93),(94,5,94),(95,5,95),(96,5,96),(97,5,97),(98,5,98),(99,5,99),(100,5,100),(101,5,101),(102,5,102),(103,5,103),(104,5,104),(105,5,105),(106,5,106),(107,5,107),(108,5,108),(109,5,109),(110,5,110),(111,5,111),(112,5,112),(113,5,113),(114,5,114),(115,5,115),(116,5,116),(117,5,117),(118,5,118),(119,5,119),(120,5,120),(121,5,121),(122,5,122),(123,5,123),(124,5,124),(125,5,125),(126,5,126),(127,5,127),(128,5,128),(129,5,129),(130,5,130),(131,5,131),(132,5,132),(133,5,133),(134,5,134),(135,5,135),(136,5,136),(137,5,137),(138,5,138),(139,5,139),(140,5,140),(141,5,141),(142,5,142),(143,5,143),(144,5,144),(145,5,145),(146,5,146),(147,8,147),(148,8,148),(149,8,149),(150,8,150),(151,8,151),(152,8,152),(153,8,153),(154,8,154),(155,8,155),(156,8,156),(157,8,157),(158,8,158),(159,8,159),(160,8,160),(161,8,161),(162,8,162),(163,8,163),(164,8,164),(165,8,165),(166,8,166),(167,8,167),(168,8,168),(169,8,169),(170,8,170),(171,8,171),(172,8,172),(173,8,173),(174,8,174),(175,8,175),(176,8,176),(177,8,177),(178,8,178),(179,8,179),(180,8,180),(181,8,181),(182,8,182),(183,8,183),(184,8,184),(185,8,185),(186,8,186),(187,8,187),(188,8,188),(189,8,189),(190,8,190),(191,8,191),(192,8,192),(193,8,193),(194,8,194),(195,8,195),(196,8,196),(197,8,197),(198,8,198),(199,8,199),(200,8,200),(201,8,201),(202,8,202),(203,8,203),(204,8,204),(205,8,205),(206,8,206),(207,8,207),(208,8,208),(209,8,209),(210,8,210),(211,6,211),(212,6,212),(213,6,213),(214,6,214),(215,6,215),(216,6,216),(217,6,217),(218,6,218),(220,2,220),(221,2,221),(222,2,222),(223,2,223),(224,2,224),(225,2,225),(226,2,226),(227,2,227),(228,2,228),(229,2,229),(230,2,230),(231,2,231),(232,2,232),(233,2,233),(234,2,234),(235,2,235),(236,2,236),(237,2,237),(238,2,238),(239,2,239),(240,2,240),(241,2,241),(242,2,242),(243,2,243),(244,2,244),(245,2,245),(246,2,246),(247,2,247),(248,2,248),(249,2,249),(250,2,250),(251,2,251),(252,2,252),(253,2,253),(254,2,254),(255,2,255),(256,2,256),(257,2,257),(258,2,258),(259,2,259),(260,2,260),(261,2,261),(262,2,262),(263,2,263),(264,2,264),(265,2,265),(266,2,266),(267,2,267),(268,2,268),(269,2,269),(270,2,270),(271,2,271),(272,2,272),(273,2,273),(274,2,274),(275,2,275),(276,2,276),(277,2,277),(278,2,278),(279,2,279),(280,2,280),(281,2,281),(282,2,282),(283,2,283),(284,2,284),(285,2,285),(286,4,286),(287,4,287),(288,4,288),(289,4,289),(290,4,290),(291,4,291),(292,4,292),(293,4,293),(294,4,294),(295,4,295),(296,4,296),(297,4,297),(298,4,298),(299,4,299),(300,4,300),(301,4,301),(302,4,302),(303,4,303),(304,4,304),(305,4,305),(306,4,306),(307,4,307),(308,4,308),(309,4,309),(310,4,310),(311,4,311),(312,4,312),(313,4,313),(314,4,314),(315,4,315),(316,4,316),(317,4,317),(318,4,318),(319,4,319),(320,4,320),(321,4,321),(322,4,322),(323,4,323),(324,4,324),(325,1,325),(326,1,326),(327,1,327),(328,1,328),(329,1,329),(330,1,330),(331,1,331),(332,1,332),(333,1,333),(334,1,334),(335,1,335),(336,1,336),(337,1,337),(338,1,338),(339,1,339),(340,1,340),(341,1,341),(342,1,342),(343,1,343),(344,1,344),(345,1,345),(346,1,346),(347,1,347),(348,1,348),(349,1,349),(350,1,350),(351,1,351),(352,1,352),(353,1,353),(354,1,354),(355,1,355),(356,1,356),(357,1,357),(358,1,358),(359,1,359),(360,1,360),(361,1,361),(362,1,362),(363,1,363),(364,1,364),(365,1,365),(366,1,366),(367,1,367),(368,1,368),(369,1,369),(370,1,370),(371,1,371),(372,1,372),(373,1,373),(374,1,374),(375,7,375),(376,7,376),(378,7,378),(379,7,379),(380,7,380),(381,7,381),(382,7,382),(383,7,383),(384,7,384),(385,7,385),(386,7,386),(387,7,387),(388,7,388),(389,7,389),(390,7,390),(391,7,391),(392,7,392),(393,7,393),(394,7,394),(395,7,395),(396,7,396),(397,7,397),(398,7,398),(399,7,399),(400,7,400),(401,7,401),(402,7,402),(403,7,403),(404,7,404),(405,7,405),(406,7,406),(407,7,407),(408,7,408),(409,7,409),(410,7,410),(411,7,411),(412,7,412),(413,7,413),(414,7,414),(415,7,415),(416,7,416),(417,3,417),(418,3,418),(419,3,419),(420,3,420),(421,3,421),(422,3,422),(423,3,423),(424,3,424),(425,3,425),(426,3,426),(427,3,427),(428,3,428),(429,3,429),(430,5,430);
/*!40000 ALTER TABLE `agrupar_alimento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `agruparejercicio`
--

DROP TABLE IF EXISTS `agruparejercicio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `agruparejercicio` (
  `id_eag` int(11) NOT NULL AUTO_INCREMENT,
  `id_tde` int(11) NOT NULL,
  `id_eje` int(11) NOT NULL,
  PRIMARY KEY (`id_eag`),
  KEY `id_tde` (`id_tde`),
  KEY `id_eje` (`id_eje`),
  CONSTRAINT `agruparejercicio_ibfk_1` FOREIGN KEY (`id_tde`) REFERENCES `tipoejercicio` (`id_tde`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `agruparejercicio_ibfk_2` FOREIGN KEY (`id_eje`) REFERENCES `ejercicios` (`id_eje`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `agruparejercicio`
--

LOCK TABLES `agruparejercicio` WRITE;
/*!40000 ALTER TABLE `agruparejercicio` DISABLE KEYS */;
INSERT INTO `agruparejercicio` VALUES (1,1,1),(2,1,2),(3,1,3),(4,1,4),(5,1,5),(6,1,6),(7,1,7),(8,1,8),(9,1,9),(10,1,10),(11,1,11),(12,1,12),(13,1,13),(14,1,14),(15,1,15),(16,1,16),(17,1,17),(18,1,18),(19,3,19),(20,3,20),(21,3,21),(22,3,22),(23,3,23),(24,3,24),(25,3,25),(26,3,26),(27,3,27),(28,3,28),(29,3,29),(30,3,30),(31,3,31),(32,3,32),(33,3,33),(34,3,34),(35,3,35),(36,2,36),(37,2,37),(38,2,38),(39,2,39),(40,2,40),(41,2,41),(42,2,42),(43,2,43),(44,2,44),(45,2,45),(46,2,46),(47,2,47),(48,2,48),(49,2,49),(50,2,50),(51,2,51),(52,2,52);
/*!40000 ALTER TABLE `agruparejercicio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `alimento`
--

DROP TABLE IF EXISTS `alimento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `alimento` (
  `id_ali` int(11) NOT NULL AUTO_INCREMENT,
  `nda_ali` varchar(100) NOT NULL,
  `id_udm` int(11) NOT NULL,
  PRIMARY KEY (`id_ali`),
  KEY `id_udm` (`id_udm`),
  CONSTRAINT `alimento_ibfk_1` FOREIGN KEY (`id_udm`) REFERENCES `unidadmedida` (`id_udm`)
) ENGINE=InnoDB AUTO_INCREMENT=431 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alimento`
--

LOCK TABLES `alimento` WRITE;
/*!40000 ALTER TABLE `alimento` DISABLE KEYS */;
INSERT INTO `alimento` VALUES (2,'atun en agua',7),(3,'bistec de res',7),(4,'cabrito',7),(5,'calamar',7),(6,'camaron cocido',5),(7,'cangrajo',5),(8,'carne de res seca',1),(9,'carne molida de pollo',7),(10,'clara de huevo',5),(11,'falda de reso',7),(12,'filete de pescadoo',7),(13,'filete de res',7),(14,'guachinango',7),(15,'jaiba cocida',7),(16,'liebre',7),(17,'medallon de filete de res',5),(18,'milanesa de pollo',7),(19,'molleja de pollo',7),(20,'pancita de res',7),(21,'pechuga de pavo',8),(22,'pescado en trozo',7),(23,'puntas de res',7),(24,'queso cotttage',1),(25,'requeson',1),(26,'robalo',7),(27,'surimi',8),(28,'vendo cocido',7),(29,'abulon fresco',7),(30,'acociles',7),(31,'aguayon',7),(32,'bacalao seco',1),(33,'bagre',7),(34,'blanco de nilo',7),(35,'cabeza de pescado',7),(36,'camaron gigante',5),(37,'camaron pacotilla',5),(38,'camaron seco',1),(39,'carne de aveztruz',7),(40,'carne de jaiba',7),(41,'cazon',7),(42,'chambarete',7),(43,'charales frescos',7),(44,'charales secos',1),(45,'cuete de res',7),(46,'escalopa de res',7),(47,'escamoles',7),(48,'fajitas de pollo sin piel',7),(49,'filete de guachinango',7),(50,'filete de mero',7),(51,'filete de mojarra',7),(52,'filete de merluza',7),(54,'jugo de almeja',6),(55,'machaca',1),(56,'maciza de res',7),(57,'mejillones',5),(58,'molida de pollo',7),(59,'muslo de pollo sin piel',5),(60,'pargo',7),(61,'pata de res',7),(62,'pechuga a la plancha',7),(63,'pechuga asada',7),(64,'pechuga cocida',7),(65,'pechuga de pollo deshuesada',7),(66,'pierna de pollo sin piel',5),(68,'agujas de res',7),(69,'anchoa con aceite',5),(70,'arrachera',7),(71,'atun en aceite',7),(72,'barbacoa maciza',7),(73,'bistec de ternera',7),(74,'bonito',7),(75,'carne de cerdo',7),(76,'carpa cocida',7),(77,'cecina',7),(78,'conejo',7),(79,'falda de cerdo',7),(80,'filete de cerdo',7),(81,'filete de salmon',7),(82,'guajolote de pavo',7),(83,'higado de pollo',7),(84,'higado de res',7),(85,'jamon de pavo',8),(86,'jamon de pierna',8),(87,'lomo de cerdo',7),(88,'maciza de res',7),(89,'molida de cerdo',7),(90,'molida de res',7),(91,'ostion',7),(92,'ostion en lata',7),(93,'pescuezo de pollo',5),(94,'pierda de cerdo',7),(95,'queso de cabra',7),(96,'queso fresco',7),(97,'queso panela',7),(98,'salmon',7),(99,'trucha cocida',7),(100,'bistec de bola',7),(101,'carne de suadero',7),(102,'chicharron',7),(103,'costillas de cerdo',7),(104,'gusanos de maguey',7),(105,'huevo',5),(106,'longaniza',7),(107,'pecho de res',7),(108,'queso mozarela',7),(109,'queso parmesano',1),(110,'salami de pavo',8),(111,'salchicha de cerdo',5),(112,'salchicha de pavo',5),(113,'sardina en aceite',5),(114,'sardina en tomate',5),(115,'sierra',7),(116,'suadero',7),(117,'alon de pollo con piel cocido',5),(118,'cerdo en canal',7),(119,'costilla de res',7),(120,'espaldilla',7),(121,'lengua de cerdo',7),(122,'maciza de cerdo',7),(123,'moronga',8),(124,'mortadela',8),(125,'nuggets de pollo',5),(126,'ostion ahumado',7),(127,'palitos de pescado congelados',5),(128,'paloma',7),(129,'pastel de pavo y puerco',8),(130,'peperoni',8),(131,'pollo rostizado',7),(132,'queso amarillo',8),(133,'queso americano',8),(134,'queso asadero',8),(135,'queso blanco',7),(136,'queso canasto',7),(137,'queso chihuahua',7),(138,'queso fundido',6),(139,'queso manchego',7),(140,'queso oaxaca',7),(141,'retazo de pollo',7),(142,'salchicha',5),(143,'yema de huevo',5),(144,'sesos de cerdo',7),(145,'sesos de res',7),(146,'tripas de res',7),(147,'amaranto tostado',6),(148,'avena en hojuelas',6),(149,'avena cocida',6),(150,'arroz blanco',6),(151,'baguette',5),(152,'barrita de granola',5),(153,'bolillo sin migajon',5),(154,'bollo de hamburguesa',5),(155,'camote',5),(156,'canelones',5),(157,'cascara de papa',6),(158,'8 de caja',6),(159,'crepas',5),(160,'elote blanco',5),(161,'galleta habanera',5),(162,'galleta maria',5),(163,'galleta para sopa',5),(164,'galleta salada',5),(165,'granola con 1 seca',1),(166,'harina de arroz',1),(167,'harina de maiz',1),(168,'hot cake',5),(169,'maicena de sabor',1),(170,'maiz',7),(171,'masa de maiz',7),(172,'palitos de pan',5),(173,'palomitas naturales',6),(174,'media noche',5),(175,'pan arabe',5),(176,'pan birote',5),(177,'pan de caja',5),(178,'pan molido',1),(179,'pan tostado',5),(180,'papa',5),(181,'pasta hervida',5),(182,'peneques',5),(183,'tlacoyo',5),(184,'tortilla de maiz',5),(185,'tortilla de maiz azul',5),(186,'tortilla de harina',5),(187,'tortilla de harina light',5),(188,'tostada horneada',5),(189,'salvado de maiz',1),(190,'salvado de trigo',1),(191,'yuca',5),(192,'galleta de animalitos',5),(193,'barra de granola',5),(194,'chicharron de harina enchilado',7),(195,'frituras de maiz',4),(196,'galleta con chispas de chocolate',5),(197,'galleta de avena con pasas',5),(198,'galleta integral con miel',5),(199,'galleta tipo sandwich',5),(200,'palomitas con mantequilla',6),(201,'pan dulce',5),(202,'panque',5),(203,'papas fritas',5),(204,'pure de papa preparado',5),(205,'Roles de canela o pasas',5),(206,'tamal',5),(207,'tostada',5),(208,'tostada',5),(209,'totopos y nachos',5),(210,'waffle',5),(211,'garbanzo',6),(212,'habas',6),(213,'lentejas',6),(214,'alverjon',6),(215,'frijol negro',6),(216,'soya cocida',6),(217,'soya texturada seca',7),(218,'alubias',6),(220,'alcachofa',5),(221,'apio cocido',6),(222,'champinon cocido rebanado',6),(223,'chilacas',5),(224,'chilacayote',6),(225,'cilantro',6),(226,'col cruda',6),(227,'colecita de bruselas',5),(228,'coliflor cocida',6),(229,'esparragos crudos',5),(230,'espinaca cruda',6),(231,'flor de calabaza cocida',6),(232,'flor de maguey',7),(233,'lechuga',6),(234,'nabo',6),(235,'nopal cocido',6),(236,'pepino rebanado',6),(237,'pimiento morron',5),(238,'rabano',6),(239,'salsa mexicana',6),(240,'setas cocidas',6),(241,'tomate verde',5),(242,'berenjena',6),(243,'brocoli cocido',6),(244,'calabaza cocido',6),(245,'cebolla blanca',6),(246,'chayote cocido',6),(247,'chicharo',1),(248,'jicama picada',6),(249,'jitomate bola',5),(250,'pure de tomate',6),(251,'verdolagas',6),(252,'zanahoria picada',5),(253,'zanahoria miniatura',6),(254,'acelga cruda',6),(255,'apio crudo',6),(256,'champinon crudo entero',6),(257,'ejotes cocidos picados',6),(258,'espinaca cocida',5),(259,'nopal crudo',5),(260,'nopal de cambray',6),(261,'berro cocido',6),(262,'berro crudo',6),(263,'betable rallado',6),(264,'brocoli crudo',5),(265,'cebolla de cambray',5),(266,'chile de arbol',5),(267,'chile habanero',5),(268,'chile jalapeno',5),(269,'chile poblano',6),(270,'germen de alfalfa',6),(271,'germen de lenteja',6),(272,'huazontle',5),(273,'jitomate cherry',6),(274,'jugo de tomate natural',6),(275,'jugo de 2',6),(276,'jugo de zanahoria',6),(277,'pepinillos',6),(278,'poro crudo',6),(279,'quelite',6),(280,'romeritos cocidos',6),(281,'romeritos crudos',5),(282,'xoconostle',6),(283,'toronja',6),(284,'naranja',6),(285,'acelga cocida',1),(286,'achiote',6),(287,'agua mineral',1),(288,'ajo en polvo',1),(289,'alcaparras',6),(290,'cafe americano descafeinado',6),(291,'caldo de pollo',1),(292,'canela en polvo',1),(293,'chile en polvo',1),(294,'cocoa en polvo',1),(295,'consome en pollo',1),(296,'eneldo',6),(297,'flor de jamaica',7),(298,'hierbabuena',1),(299,'hojas de laurel',5),(300,'limon',7),(301,'manzanilla',1),(302,'oregano',1),(303,'sal',1),(304,'vainilla',6),(305,'caldo de res des7do',5),(306,'chicles sin azucar',2),(307,'mejorana',2),(308,'mostaza',2),(309,'pimienta',3),(310,'refrescos de dieta',2),(311,'romero',2),(312,'sal de ajo',6),(313,'gelatina baja en calorias',2),(314,'hierbas de olor',2),(315,'salsa barbecue',2),(316,'salsa de soya',2),(317,'salsa inglesa',2),(318,'salsa tabasco',2),(319,'salsa teriyaki',10),(320,'sustituto de azucar',10),(321,'te sin azucar',2),(322,'tomillo',2),(323,'vinagre',6),(324,'rghtn',6),(325,'arandanos',5),(326,'capulin',5),(327,'carambolo',5),(328,'chabacano',5),(329,'chicozapote',5),(330,'chirimoya',5),(331,'ciruela',5),(332,'datil',6),(333,'durazno',6),(334,'frambueza',6),(335,'fresa rebanada',5),(336,'gajos de manarina',5),(337,'granada china',5),(338,'granada roja',5),(339,'guanabana',5),(340,'guayaba',5),(341,'guayaba rosa',6),(342,'higo',6),(343,'jugo de naranja',6),(344,'agua de coco',5),(345,'kiwi',5),(346,'lichis',5),(347,'lima',5),(348,'limon real',5),(349,'mamey',5),(350,'mandarina',5),(351,'mango ataulfo',5),(352,'mango petacon',6),(353,'manzana',6),(354,'melon picado',5),(355,'nanche',5),(356,'naranja',5),(357,'nectarina',6),(358,'nispero',5),(359,'papaya picada',5),(360,'pasas',5),(361,'pera',6),(362,'peron',5),(363,'pina picada',5),(364,'platano dominico',5),(365,'platano macho',6),(366,'platano tabasco',6),(367,'sandia picada',6),(368,'tangerina',5),(369,'tejocote',5),(370,'toronja',5),(371,'tuna',5),(372,'uva',6),(373,'zapote negro',5),(374,'zarzamora',5),(375,'aceituna negra',5),(376,'aceituna verde',1),(378,'aguacate',5),(379,'ajonjoli',5),(380,'almendras',5),(381,'avellana',7),(382,'cacahuates',1),(383,'cacahuates con cascara',1),(384,'guacamole',5),(385,'mayonesa',5),(386,'nuez',1),(387,'pistaches',1),(388,'aceite de canola',1),(389,'aceite de girasol',9),(390,'aceite de maiz',1),(391,'aceite de spray',1),(392,'pepitas sin cascara',1),(393,'pinon',1),(394,'chilorio de pavo',1),(395,'chistorra',1),(396,'chorizo',7),(397,'chorizo de pavo',1),(398,'coco',1),(399,'coco rallado',1),(400,'crema',1),(401,'crema acida',1),(402,'crema chantilly',2),(403,'crema para cafe',2),(404,'manteca de cerdo vegetal',2),(405,'mantequilla',2),(406,'mantequilla de cacahuate',2),(407,'margarina baja en 7',2),(408,'media crema',1),(409,'mole poblano',1),(410,'pate de cerdo',1),(411,'pate de ganso',8),(412,'pate de pollo',1),(413,'pepperoni',7),(414,'queso crema',8),(415,'queso de crema',6),(416,'tocino',6),(417,'leche de soya baja en 7',1),(418,'leche descremada',6),(419,'leche en polvo descremada',6),(420,'leche evaporada descremada',1),(421,'yogurt light',6),(422,'leche en polvo',1),(423,'leche entera',6),(424,'leche liconsa en polvo',6),(425,'leche liconsa liquida',5),(426,'yogurt natural',6),(427,'yogurt para beber bajo en 7 y azucar',6),(428,'leche evaporada',6),(429,'yogurt para beber con 1',6),(430,'Leche de cabra',6);
/*!40000 ALTER TABLE `alimento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `consejos`
--

DROP TABLE IF EXISTS `consejos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `consejos` (
  `id_con` int(11) NOT NULL AUTO_INCREMENT,
  `tit_con` varchar(40) NOT NULL,
  `des_con` varchar(250) NOT NULL,
  PRIMARY KEY (`id_con`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `consejos`
--

LOCK TABLES `consejos` WRITE;
/*!40000 ALTER TABLE `consejos` DISABLE KEYS */;
INSERT INTO `consejos` VALUES (2,'Come sano','Tu deber es comer bien'),(3,' Haz 45 minutos','Tu cuerpo es tu templo y por eso debes cuidarlo siempre. Ejercitarte 45 minutos diariamente será suficiente para que notes cambios en tu rendimiento físico.El cardio es el mejor ejercicio para mantener sano tu corazón y  oxigenar el cerebro.');
/*!40000 ALTER TABLE `consejos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `datosusuario`
--

DROP TABLE IF EXISTS `datosusuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `datosusuario` (
  `id_ddu` int(11) NOT NULL AUTO_INCREMENT,
  `id_per` int(11) NOT NULL,
  `id_gen` int(11) NOT NULL,
  `id_his` int(11) NOT NULL,
  `id_seg` int(11) NOT NULL,
  `eda_usu` int(11) NOT NULL,
  `cal_nec` int(11) NOT NULL,
  `ren_dep` text,
  `fre_rep` varchar(5) DEFAULT NULL,
  PRIMARY KEY (`id_ddu`),
  KEY `id_per` (`id_per`),
  KEY `id_gen` (`id_gen`),
  KEY `id_his` (`id_his`),
  KEY `id_seg` (`id_seg`),
  CONSTRAINT `datosusuario_ibfk_1` FOREIGN KEY (`id_per`) REFERENCES `nombre` (`id_per`),
  CONSTRAINT `datosusuario_ibfk_2` FOREIGN KEY (`id_gen`) REFERENCES `genero` (`id_gen`),
  CONSTRAINT `datosusuario_ibfk_3` FOREIGN KEY (`id_his`) REFERENCES `historial` (`id_his`),
  CONSTRAINT `datosusuario_ibfk_4` FOREIGN KEY (`id_seg`) REFERENCES `seguimiento` (`id_seg`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `datosusuario`
--

LOCK TABLES `datosusuario` WRITE;
/*!40000 ALTER TABLE `datosusuario` DISABLE KEYS */;
INSERT INTO `datosusuario` VALUES (10,42,1,20,20,18,2000,NULL,NULL),(11,43,1,21,21,18,2000,NULL,NULL),(12,44,1,22,22,18,2000,NULL,NULL),(13,45,1,23,23,18,2000,NULL,NULL);
/*!40000 ALTER TABLE `datosusuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dieta`
--

DROP TABLE IF EXISTS `dieta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dieta` (
  `id_die` int(11) NOT NULL AUTO_INCREMENT,
  `can_die` int(11) NOT NULL,
  `cal_die` int(11) NOT NULL,
  `id_ada` int(11) NOT NULL,
  `id_usu` int(11) NOT NULL,
  PRIMARY KEY (`id_die`),
  KEY `id_ada` (`id_ada`),
  KEY `id_usu` (`id_usu`),
  CONSTRAINT `dieta_ibfk_1` FOREIGN KEY (`id_ada`) REFERENCES `agrupacionalimento` (`id_ada`),
  CONSTRAINT `dieta_ibfk_2` FOREIGN KEY (`id_usu`) REFERENCES `usuario` (`id_usu`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dieta`
--

LOCK TABLES `dieta` WRITE;
/*!40000 ALTER TABLE `dieta` DISABLE KEYS */;
/*!40000 ALTER TABLE `dieta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ejercicios`
--

DROP TABLE IF EXISTS `ejercicios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ejercicios` (
  `id_eje` int(11) NOT NULL AUTO_INCREMENT,
  `nom_eje` varchar(40) NOT NULL,
  `des_eje` varchar(1000) NOT NULL,
  `img_eje` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`id_eje`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ejercicios`
--

LOCK TABLES `ejercicios` WRITE;
/*!40000 ALTER TABLE `ejercicios` DISABLE KEYS */;
INSERT INTO `ejercicios` VALUES (1,'El patinador','Cruza la pierna izquierda detrás de la pierna derecha mientras doblas la rodilla derecha 90 grados. Extiende el brazo derecho hacia un lado y gire el brazo izquierdo sobre la pierna derecha. Salta hacia el otro lado, cambiando la posición de tus piernas y brazos. Esa es una repetición. Series y repeticiones recomendadas: 6-8 series de 8 repeticiones.','/img/patinador.png'),(2,'RollBacks','Comienza de pie. Con un solo movimiento, siéntate en el suelo y rueda hacia atrás, llevando las caderas y los talones hacia el techo. Vuelve a poner los pies en el suelo y a ponerte de pie. Esa es una repetición. Series y repeticiones recomendadas: 4-5 series de 10 repeticiones.','/img/rollbacks.png'),(3,'Burpee con salto de 180°','Comienza en posición de sentadilla, con los pies separados al ancho de los hombros. Deja caer las caderas y coloca las palmas en el suelo, luego salta con los pies hacia atrás y baja tu cuerpo hasta el suelo. Ponte de pie y luego salta con los pies hacia delante para volver a la posición de sentadilla. Finalmente, salta hacia arriba girando 180 grados. Luego repite hacia el otro lado. Esa es una repetición. Series y repeticiones recomendadas: 6-8 series de 8 repeticiones.','/img/burpee.png'),(4,'Lateral Toe Taps','Coloca un cono, mancuerna, pesas rusas (kettlebell) o algún tipo de objetivo entre tus pies. Comienza con el pie derecho sobre el objetivo, manteniendo el peso en el pie izquierdo. Cambia rápidamente los pies para que tu pie izquierdo esté sobre el objetivo. Esa es una repetición. Continúa alternando pies mientras golpeas ligeramente la punta del pie en el objetivo. Series y repeticiones recomendadas: 6-8 series de 8 repeticiones.','/img/toetaps.png'),(5,'Salto de la rana con mini banda','De pie en una posición atlética, con los pies más separados que la distancia entre las caderas, arrastra el pie un par de pasos hacia la izquierda y luego toca el suelo. Vuelve a arrastrar el pie y toca el suelo una vez que alcances el punto de partida. Esa es una repetición. Continuar alternando.vSeries y repeticiones recomendadas: 4-5 series de 10 repeticiones.','/img/ranita.png'),(6,'Sit outs','Comienza en plancha con las rodillas ligeramente separadas del suelo, los hombros sobre las muñecas, las rodillas debajo de las caderas. Lleva una pierna hacia adelante a través del cuerpo, pasándola por debajo de la otra pierna y levantando el brazo opuesto mientras dejas caer tu cadera al suelo. Lleva el talón hacia atrás para volver a comenzar, luego haz lo mismo en el lado opuesto. Esa es una repetición. Series y repeticiones recomendadas: 4-5 series de 10 repeticiones.','/img/sit_outs.png'),(7,'Bench Runners','Párate directamente frente al cajón con el pie derecho firmemente colocado en la parte superior del banco y el pie izquierdo en el suelo. Toca el cajón con el pie derecho e inmediatamente cambie de pie, tocando el cajón con el izquierdo. Esa es una repetición. Series y repeticiones recomendadas: 4-5 series de 10 repeticiones.','/img/benchrunners.png'),(8,'Saltar a la comba','Comienza con el movimiento de la comba tradicional. Mantén los codos cerca de las costillas con los brazos estirados y mantén la columna vertebral estirada hacia arriba. Después, explora diferentes planos saltando hacia delante y hacia atrás, así como saltando lateralmente. Series y repeticiones recomendadas: 6-8 series de 20 segundos.','/img/comba.png'),(9,'Zancadas con carga','Sostén con las dos manos una banda de resistencia o una comba directamente sobre la cabeza con los brazos rectos. Mantén los hombros girados hacia afuera para apoyar la espalda, mueve el pie izquierdo hacia adelante y dobla las rodillas dando una zancada. Empuja el talón izquierdo para ponerte de pie y, a continuación, mueve el pie derecho hacia adelante y repite. Esa es una repetición. Series y repeticiones recomendadas: 4 series de 12 repeticiones.','/img/zancadas_con_carga.png'),(10,'Jacks verticales con bandas',': Colócate una mini banda sobre los tobillos. Mirando hacia adelante, salta y separa las piernas hacia adelante y hacia atrás, moviendo los brazos en dirección opuesta a las piernas. Concéntrate en mantener la resistencia en la banda mientras mantienes la velocidad. Series y repeticiones recomendadas: 4-5 series de 10 repeticiones.','/img/jacks_verticales_con_banda.png'),(11,'Sprint static y caída','Comienza en una posición atlética con la columna vertebral larga y las caderas hacia atrás. Empieza a mover los pies rápidamente en sprint pero sin mnoverte del sitio. Cada cinco segundos, deja caer el pecho, los muslos y las caderas al suelo, y vuelve a saltar rápidamente para mover los pies rápidamente.','/img/spring_static_y_caida.png'),(12,'Salto en cunclillas','Extiende tu pierna izquierda detrás de ti, con la punta del pie tocando el suelo. Con el pecho erguido y el core apretado, dobla ambas rodillas y baja las caderas hasta que la rodilla forme un ángulo de 90 grados. Empuja con tu talón derecho y salta. Cae suavemente y repite el ejercicio. Series y repeticiones recomendadas: 4 series de 12 repeticiones.','/img/salto_en_cunclillas.png'),(13,'Plancha con toque en los hombros','Comienza en plancha con las rodillas ligeramente separadas del suelo. Manteniendo el peso nivelado entre la parte superior del cuerpo y la parte inferior del cuerpo, levanta una mano del suelo y toca el hombro opuesto. Vuelve al centro y repite con el otro lado. Esa es una repetición.','/img/plancha.png'),(14,'Escaladores con flexiones','Comienza con una plancha alta, con los hombros sobre las muñecas, las caderas hacia el ombligo y las costillas hacia las caderas. Lleva una rodilla hacia tu pecho y luego la otra. Después de alternar ocho veces, realiza dos flexiones, manteniendo los hombros hacia adelante y los codos hacia las costillas.Series y repeticiones recomendadas: 6-8 series de 20 segundos.','/img/escalador_con_flexiones.png'),(15,'Levantamiento de mancuernas','Sostén las pesas a la altura de los hombros, los codos doblados y las muñecas una enfrente de la otra, con los pies separados al ancho de los hombros. Flexiona las rodillas y apoya las caderas hacia atrás bajando hasta la posición de sentadillas. Sube en un tiempo hacia arriba, empujando las pesas hacia arriba hasta que los brazos estén completamente extendidos. Haz una pausa y luego baja las pesas mientras te agachas. Esa es una repetición. Series y repeticiones recomendadas: 6-8 series de 8 repeticiones.','/img/levantamiento_de_mancuernas.png'),(16,'Subir y bajar mancuernas','De pie con los pies separados a la altura de las caderas y con las pesas sobre tus hombros. Extiende una pesa hasta una posición elevada mientras mantiene la pesa opuesta en el hombro. Alterna las pesas, permitiéndoles moverse al mismo tiempo. Esa es una repetición. (Usa un peso más bajo del que normalmente usarías para un press de hombros). Series y repeticiones recomendadas: 4 series de 12 repeticiones.','/img/subir_y_bajar_mancuernas.png'),(17,'Remo con mancuernas en flexion','Cómo se hace: Coloca un par de mancuernas separadas al ancho de los hombros en el suelo. Agarra las mancuernas y colócate sobre ellas en posición de flexión. Baja el cuerpo hacia el suelo y empuja de nuevo hacia arriba. Separa los pies de las manos y levanta el pecho ligeramente con las rodillas todavía dobladas. Luego, tira de los codos hacia las costillas. Coloca las mancuernas de nuevo en el suelo y repite desde el principio. Esa es una repetición. Series y repeticiones recomendadas: 6-8 series de 8 repeticiones.','/img/remo_con_mancuernas.png'),(18,'Sprints','Coloca un cono u objeto a unos 6 m de su posición inicial y otro cono u objeto a 12 pies de la posición inicial. Corre hacia el primer cono, tócalo y vuelve a la posición inicial. Luego corre hasta el segundo cono y vuelve a empezar. Alternativamente, solo puedes elegir un punto y correr de un lado a otro.','/img/sprints.png'),(19,'Saltos de esqui','Es hora de saltar, amiga. Y lo haremos como una auténtica esquiadora, para trabajar piernas y glúteos al completo, incluyendo la zona externa de las cartucheras, que tan difícil es de atacar. La idea es trasladar el peso cuando damos el salto, pasándolo de una pierna a otra y cruzando la otra por detrás tal y como se ve en el siguiente vídeo. Haremos 30 repeticiones (15 por cada lado).','/img/saltos_de_esqui.png'),(20,'Burpees combinados','¿Querías caña? Pues con este ejercicio vas a sudar. El típico burpee se completa con dos zancadas, una con cada pierna y una sentadilla de sumo, para repetir a continuación toda la serie. De este modo, quemamos calorías a tope y lo hacemos en tiempo récord. Prueba con un minuto para empezar y ve aumentando según vayas resistiendo más.','/img/burpees_zancada_sentadilla.png'),(21,'Sentadilla con patada y peso','Si a la potencia de las sentadillas y su capacidad para tonificar los glúteos le sumamos una patada delantera para trabajar los cuádriceps y añadimos peso (puedes usar una botella o un paquete de pasta o arroz si no tienes pesas) para complicar la ecuación, tenemos un ejercicio súper completo. Reliza 20 repeticiones y verás resultados en poco tiempo.','/img/sentadilla_patada_peso.png'),(22,'Crunch de una pierna','Vamos ahora con los abdominales. Si quieres trabajarlos a fondo, el crunch es una idea perfecta. Sentada en el suelo, con las piernas flexionadas, elevamos de la rodilla hacia arriba y mantenemos la espalda erguida. A continuación, vamos estirando y doblando cada vez una pierna mientras mantenemos el abdomen apretado. Empieza por 15 repeticiones con cada lado y ve subiendo poco a poco. ','/img/crunch_pierna.png'),(23,'Sentadilla con salto','Para machacarnos del todo, terminaremos con estas sentadillas que rematan en salto. De este modo, el trabajo del tren inferior que se realiza con las sentadillas normales, se multiplica, y, al mismo tiempo, le damos una dosis extra de cardio a la rutina. Procura flexionar bien las piernas al caer y mantener la espalda recta para evitar lesiones. Empieza por 30 segundos y sube hasta el minuto en cuanto te sea posible.','/img/sentadilla_salto.png'),(24,'Sentadillas','De pie, con las piernas separadas a la altura de los hombros, desciende hasta que tus piernas traspasen la línea imaginaria que les hace estar paralelas al suelo. Nota: Cuanto más desciendas, mejor. Que las rodillas no sobrepasen las puntas de los pies.  ','/img/sentadillas.png'),(25,'Splits','De pie, como en el ejercicio anterior, con el pie derecho da un gran paso adelante y dobla la rodilla, hasta que esta pierna quede paralela al suelo. Vuelve atrás y repite con la otra pierna. Nota: Si lo haces saltando, el ejercicio será más exigente.','/img/splits.png'),(26,'Escalador','A cuatro patas, con las manos apoyadas en el suelo, con una separación del ancho de los hombros, acerca la rodilla de la pierna izquierda a la mano del mismo lado. Repite alternando ambas piernas.','/img/escalador.png'),(27,'Elevacion piernas','Tumbado boca abajo, con las manos apoyadas en el suelo bajo tu cadera, eleva las piernas unos 15-20 cm, y empuja alternativamente con cada pie como si tuvieras que empujar algo con tu pie hacia atrás. Nota: Al realizar el empuje con cada pie, trata de apretar los abdominales.','/img/elevacion_piernas.png'),(28,'Abdominales bicicleta','Tumbado boca arriba, eleva las piernas hasta formar un ángulo de 90º con el resto del cuerpo e imita el movimiento de pedaleo.','/img/abdominales_bicicleta.png'),(29,'Dominadas','En una barra (columpios, portería de fútbol, etc) utiliza un agarre a la altura de los hombros y, suspendido en el aire, trata de elevar tu barbilla por encima de esta cuantas veces puedas. Nota: Si no puedes, ayúdate con un salto, apoyando los pies en el suelo.','/img/dominadas.png'),(30,'Fondos','Tumbado boca abajo, apoyado sobre las puntas de los pies y las manos a la altura de los hombros, sube y baja manteniendo el cuerpo recto como una tabla.','/img/fondos.png'),(31,'Triceps','Colócate de espaldas a una silla, apoyando en el borde de la silla, ambas manos con la mínima separación que seas capaz. Aleja los pies de la silla, todo lo que seas capaz. Baja el cuerpo y sube cuantas veces puedas durante el tiempo señalado para cada serie','/img/triceps.png'),(32,'Abdominales twist','Sentado en el suelo, eleva tus pies del suelo, de modo que tu torso y tus piernas formen una V. En esta posición con las manos tras la nuca, gira el torso alternativamente a cada lado y trata de tocar con las manos en el lugar del suelo más alejado al cuerpo que puedas. Nota: Mientras haces el ejercicio, trata de mantener los abdominales apretados y en tensión.','/img/twist.png'),(33,'Sentadillas estaticas en pared','Sentado en el suelo, eleva tus pies del suelo, de modo que tu torso y tus piernas formen una V. En esta posición con las manos tras la nuca, gira el torso alternativamente a cada lado y trata de tocar con las manos en el lugar del suelo más alejado al cuerpo que puedas. Nota: Mientras haces el ejercicio, trata de mantener los abdominales apretados y en tensión.','/img/sentadillas_estaticas.png'),(34,'Pesas rusas','El principio de esta herramienta se basa en la forma de su agarre, de modo que mantiene desplazado el centro de gravedad (a diferencia de una mancuerna convencional) y lo que obliga a que tengamos que generar una fuerza de estabilización extra. Esto se aplica a los diferentes ejercicios, siendo uno de los más habituales el Balanceo. El control postural en este ejercicio es clave, asimismo también lo será el control de la respiración, la cual comprobaremos tras varias repeticiones cómo se incrementará exponencialmente.','/img/pesas_rusas.png'),(35,'Correr','Correr no es de cobardes? Es el movimiento por excelencia que el ser humano ha repetido desde que se puso de pie. Ello nos ha permitido sobrevivir al ataque de un depredador escapando airosamente, o conseguir nuestra presa para el banquete nocturno. Sin embargo, mi punto de vista sobre el running en general, es que no recomendaría una duración prolongada, a menos que, por supuesto, nuestro objetivo fuera la competencia. De cualquier otra forma, no es digamos lo más eficiente si buscas el control del peso, y sí te puede dar algún que otro quebradero de cabeza a nivel lesivo.','/img/correr.png'),(36,'Caminatas','Perfecto para cualquier edad, sobre todo se aconseja para personas mayores o aquellas que refieran problemas de salud o de lesiones. La frecuencia cardíaca variará dependiendo del ritmo que se imprima al caminar, por lo que se recomienda controlarla de alguna forma, para evitar que se supere el 50% de la máxima. se recomienda que se hagan paseos de unos 20 minutos de duración. Después de unas cuatro semanas, se puede aumentar en 10 minutos hasta alcanzar la media hora de ejercicio.','/img/caminatas.png'),(37,'Natacion','Se aconseja empezar con unos 30 minutos de natación, siempre evitando hacer un gran esfuerzo para no superar la mitad de la frecuencia cardíaca máxima. Se puede ir aumentando el tiempo progresivamente, pero no la intensidad. hay que añadir que se puede realizar de una manera suave, perfecta para que comiencen a realizar actividad física personas sedentarias o con algún tipo de lesión. ','/img/natacion.png'),(38,'Yoga','es una buena actividad para cumplir los requisitos de la baja intensidad, sino porque además se trabaja todo el cuerpo, estirando los músculos y aumentando la flexibilidad. También ayuda a aliviar dolores producidos por malas posturas o por lesiones.','/img/yoga.png'),(39,'Ciclismo','Siempre y cuando no se supere el 50% de la frecuencia cardíaca máxima. Por tanto, se mantendrá un ritmo suave, de paseo, que no exija un sobreesfuerzo y que permita hablar y no provoque sudoración.','/img/ciclismo.png'),(40,'Bailes','Una forma de ejercicio entretenida y grupal, que utiliza numerosas rutinas musculares para ejercitar la resistencia, la coordinación y la capacidad respiratoria, ya que puede extenderse durante varios temas musicales que brindan el acompañamiento rítmico necesario. Es una forma de ejercicio socialmente útil, además.','/img/bailes.png'),(41,'Saltos aerobicos','La clásica rutina de aeróbics de gimnasio es el mejor ejemplo posible de este tipo de actividades de alto consumo de oxígeno, en las que se sostiene el movimiento durante diversas rutinas sucesivas y se depende casi exclusivamente de la resistencia cardiovascular del organismo.','/img/saltos_aerobicos.png'),(42,'Saltar la cuerda','El uso de las cuerdas para saltar ha sido tradicionalmente uno de los juegos favoritos de los niños. Los ejercicios con comba se suelen utilizar como calentamiento deportivo previo a otros ejercicios, y resultan un entrenamiento ideal para los deportes que requieren vigor, coordinación y ritmo','/img/saltar_cuerda.png'),(43,'Trotar lentamente','Contacto con el suelo con la bola del pie con los dedos apuntando hacia adelante y no hacia abajo. El contacto debe ser leve y ligero con la superficie, sin dejar que el talón toque el suelo. ','/img/trotar.png'),(44,'Usar bicicleta estatica','Se recomienda pedalear sentado/a durante 5 minutos. También se recomienda para bajar de peso que la sesión de ejercicios sea corta, por ejemplo de 15 minutos al levantarse y 15 minutos antes de irse a dormir, 1 hora después de haber cenado de preferencia sin haber consumido carbohidratos. Lógicamente los ejercicios deben ser más duros y rápidos para agilizar la baja de peso.','/img/bicicleta_estatica.png'),(45,'Maquina de remo','Nuestra espalda debe permanecer neutra lo máximo posible, pudiendo inclinarnos ligeramente hacia atrás cuando tiremos pero sin llegar a inclinarnos hacia delante tanto como para adoptar una posición chepada. marcarse un tiempo límite durante el cual estaremos remando sin importar ni la distancia total recorrida ni la resistencia de la máquina.','/img/maquina_remo.png'),(46,'Estocadas','Ejercicio de fuerza de piernas y estabilidad del tronco. Se realiza dando un paso largo hacia adelante (aproximadamente un metro) y flexionando las rodillas hasta apoyar la de abajo en el piso, con la espalda erguida. 3 series de 6 repeticiones.','/img/estocadas.png'),(47,'Mantener posicion espinal','Ejercicio contrario al Hollow Hold, se realiza boca abajo apoyando en el piso solamente la zona abdominal intentando mantener la elevación de piernas, pecho y brazos al mismo tiempo. 3 series de 20 seg.','/img/back_extension.png'),(48,'Plancha boca abajo','Hay muchas variedades de planchas. En este caso se realizará apoyando en el piso únicamente puntas de pies y antebrazos, elevando el tronco con la zona media del cuerpo contraída. Es importante mantener todos los segmentos en un ángulo llano (no elevar la cola ni aflojar la espalda). 3 series de 15 seg.','/img/plank.png'),(49,'Abdominales','Sentadas en el piso, flexionamos las piernas y juntamos las plantas de los pies bien cerca de la cola. Nos inclinamos hacia atrás hasta tocar el piso con las manos y volvemos hasta tocar delante de los pies. 3 series de 15 repeticiones.','/img/sit_ups.png'),(50,'Jumping jacks','Comenzamos parados con piernas juntas y brazos a los lados del cuerpo, realizamos un salto abriendo las piernas y juntando los brazos extendidos arriba de la cabeza, y saltando nuevamente volvemos a la posición inicial. 2 series de 40 repeticiones.','/img/jumping_jacks.png'),(51,'Push ups','Debemos contraer la zona media para mantener la postura correcta y no arquear la espalda, apoyar las manos ancho de hombros y con los dedos apuntando hacia delante, y las puntas de los pies (juntas) en el piso. Flexionamos los brazos hasta apoyar tanto el pecho como la cadera en el piso y empujando volvemos a la posición inicial con los codos extendidos. Si este ejercicio te representa mucha dificultad, se puede realizar con las manos apoyadas en una superficie más elevada (silla, mesa, etc.) y pies en el suelo. 3 series de 6 repeticiones.','/img/push_ups.png'),(52,'Pilates','Ejercicio y movimiento físico diseñado para estirar, fortalecer y equilibrar el cuerpo. Con la práctica sistemática de ejercicios específicos junto con los patrones de respiración, Pilates ha demostrado tener un valor incalculable no sólo para las personas que quieren mantener su condición física, sino también como un importante complemento a la práctica deportiva y rehabilitación física de todo tipo.','/img/pilates.png');
/*!40000 ALTER TABLE `ejercicios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `genero`
--

DROP TABLE IF EXISTS `genero`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `genero` (
  `id_gen` int(11) NOT NULL AUTO_INCREMENT,
  `nom_gen` varchar(10) NOT NULL,
  PRIMARY KEY (`id_gen`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `genero`
--

LOCK TABLES `genero` WRITE;
/*!40000 ALTER TABLE `genero` DISABLE KEYS */;
INSERT INTO `genero` VALUES (1,'Masculino'),(2,'Femenino');
/*!40000 ALTER TABLE `genero` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `grupo_alimenticio`
--

DROP TABLE IF EXISTS `grupo_alimenticio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `grupo_alimenticio` (
  `id_gal` int(11) NOT NULL AUTO_INCREMENT,
  `nga_gal` varchar(30) NOT NULL,
  PRIMARY KEY (`id_gal`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `grupo_alimenticio`
--

LOCK TABLES `grupo_alimenticio` WRITE;
/*!40000 ALTER TABLE `grupo_alimenticio` DISABLE KEYS */;
INSERT INTO `grupo_alimenticio` VALUES (1,'Fruta'),(2,'Verdura'),(3,'Leche Y Sustitutos'),(4,'Colacion'),(5,'Origen Animal'),(6,'Leguminosa'),(7,'Grasa'),(8,'cereal');
/*!40000 ALTER TABLE `grupo_alimenticio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `historial`
--

DROP TABLE IF EXISTS `historial`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `historial` (
  `id_his` int(11) NOT NULL AUTO_INCREMENT,
  `pes_his` varchar(10) NOT NULL,
  `est_his` varchar(10) NOT NULL,
  `imc_his` varchar(10) NOT NULL,
  `fdr_his` varchar(10) NOT NULL,
  `tpo_his` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_his`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `historial`
--

LOCK TABLES `historial` WRITE;
/*!40000 ALTER TABLE `historial` DISABLE KEYS */;
INSERT INTO `historial` VALUES (20,'65','1.68','23.03','2020/1/23','2020-01-24 00:39:24'),(21,'68','1.68','24.09','2020/1/23','2020-01-24 00:44:25'),(22,'68','1.68','24.09','2020/1/23','2020-01-24 00:46:25'),(23,'68','1.68','24.09','2020/1/23','2020-01-24 00:48:03');
/*!40000 ALTER TABLE `historial` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nombre`
--

DROP TABLE IF EXISTS `nombre`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nombre` (
  `id_per` int(11) NOT NULL AUTO_INCREMENT,
  `pri_nom` varchar(50) NOT NULL,
  `sec_nom` varchar(50) DEFAULT NULL,
  `ape_pat` varchar(50) NOT NULL,
  `ape_mat` varchar(50) NOT NULL,
  PRIMARY KEY (`id_per`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nombre`
--

LOCK TABLES `nombre` WRITE;
/*!40000 ALTER TABLE `nombre` DISABLE KEYS */;
INSERT INTO `nombre` VALUES (37,'Uziel','Bruno','Reyes','Garnelo'),(38,'Bruno','Batman','Diaz','Wayne'),(39,'Diego','Fernando','Badillo','Vega'),(40,'diego','','gutierrez','gonzalez'),(41,'Diego','Andre','Gonzalez','Gutierrez'),(42,'Uziel','Bruno','Reyes','Garnelo'),(43,'sdfsdd','dhjvfs','bfsdjf','dsjbfs'),(44,'sdfsdd','dhjvfs','bfsdjf','dsjbfs'),(45,'sdfsdd','dhjvfs','bfsdjf','dsjbfs');
/*!40000 ALTER TABLE `nombre` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `preferencias`
--

DROP TABLE IF EXISTS `preferencias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `preferencias` (
  `id_pre` int(11) NOT NULL AUTO_INCREMENT,
  `id_ali` int(11) NOT NULL,
  `id_usu` int(11) NOT NULL,
  PRIMARY KEY (`id_pre`),
  KEY `id_ali` (`id_ali`),
  KEY `id_usu` (`id_usu`),
  CONSTRAINT `preferencias_ibfk_1` FOREIGN KEY (`id_ali`) REFERENCES `alimento` (`id_ali`),
  CONSTRAINT `preferencias_ibfk_2` FOREIGN KEY (`id_usu`) REFERENCES `usuario` (`id_usu`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `preferencias`
--

LOCK TABLES `preferencias` WRITE;
/*!40000 ALTER TABLE `preferencias` DISABLE KEYS */;
/*!40000 ALTER TABLE `preferencias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `seguimiento`
--

DROP TABLE IF EXISTS `seguimiento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `seguimiento` (
  `id_seg` int(11) NOT NULL AUTO_INCREMENT,
  `pes_usu` varchar(10) NOT NULL,
  `est_usu` varchar(10) NOT NULL,
  `imc_usu` varchar(10) NOT NULL,
  `fdr_usu` varchar(10) NOT NULL,
  PRIMARY KEY (`id_seg`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seguimiento`
--

LOCK TABLES `seguimiento` WRITE;
/*!40000 ALTER TABLE `seguimiento` DISABLE KEYS */;
INSERT INTO `seguimiento` VALUES (20,'65','1.68','23.03','2020/1/23'),(21,'68','1.68','24.09','2020/1/23'),(22,'68','1.68','24.09','2020/1/23'),(23,'68','1.68','24.09','2020/1/23');
/*!40000 ALTER TABLE `seguimiento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) unsigned NOT NULL,
  `data` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES ('1zJtT64CNXw853I7FC_O3Lr_qBzvKNTJ',1581027037,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),('86Yye6lq33HUQZo_GzGhhB5gggJ_tuqx',1581027037,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),('9I3in0XnG6j5yNOEVf3FFfU6UKEUtlvL',1581027037,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),('KB_rolaXNhl3JP-eiq84gQtGsEgiFDPl',1581027037,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),('LgRN7ma0UMcVlHGEPbnx8LkqFIRCe62O',1581029172,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{\"Exito\":[\"Bienvenido \",\"Bienvenido \",\"Bienvenido \",\"Bienvenido \",\"Gracias, has agregado un nuevo consejo. ♥\"]},\"passport\":{\"user\":23}}'),('NbWepdEazSJ-xVdxwa9ndf-5AqfkbZ9q',1581027456,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),('NmwlLJ8xSihYogC-Jyt2uRWzBXmPPHsk',1581027037,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),('Ow6cJzglIOy-YFLW9jNxwJqEc3SdjmCk',1581027640,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),('VjAxM7DbrAK5k8cRwaJiBpmzChhojCt9',1581027043,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),('WO6yTqur4i8DnVHdpgi-oZuZS2y28dLh',1581027043,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),('fVuUahpSVSgZiCZO-lkwaAriDN9WcM9J',1581027037,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}');
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipoejercicio`
--

DROP TABLE IF EXISTS `tipoejercicio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tipoejercicio` (
  `id_tde` int(11) NOT NULL AUTO_INCREMENT,
  `int_eje` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id_tde`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipoejercicio`
--

LOCK TABLES `tipoejercicio` WRITE;
/*!40000 ALTER TABLE `tipoejercicio` DISABLE KEYS */;
INSERT INTO `tipoejercicio` VALUES (1,'Media'),(2,'Baja'),(3,'Alta');
/*!40000 ALTER TABLE `tipoejercicio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipousuario`
--

DROP TABLE IF EXISTS `tipousuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tipousuario` (
  `id_tdu` int(11) NOT NULL AUTO_INCREMENT,
  `nom_tdu` varchar(20) NOT NULL,
  PRIMARY KEY (`id_tdu`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipousuario`
--

LOCK TABLES `tipousuario` WRITE;
/*!40000 ALTER TABLE `tipousuario` DISABLE KEYS */;
INSERT INTO `tipousuario` VALUES (1,'Administrador'),(2,'Usuario');
/*!40000 ALTER TABLE `tipousuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `unidadmedida`
--

DROP TABLE IF EXISTS `unidadmedida`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `unidadmedida` (
  `id_udm` int(11) NOT NULL AUTO_INCREMENT,
  `num_udm` varchar(30) NOT NULL,
  PRIMARY KEY (`id_udm`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `unidadmedida`
--

LOCK TABLES `unidadmedida` WRITE;
/*!40000 ALTER TABLE `unidadmedida` DISABLE KEYS */;
INSERT INTO `unidadmedida` VALUES (1,'Cucharada(s)'),(2,'Cucharadita(s)'),(3,'Lata(s)'),(4,'Bolsa(s)'),(5,'Pieza(s)'),(6,'Taza(s)'),(7,'Gramo(s)'),(8,'Rebanada(s)'),(9,'Disparo(s)'),(10,'-');
/*!40000 ALTER TABLE `unidadmedida` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuario` (
  `id_usu` int(11) NOT NULL AUTO_INCREMENT,
  `nom_usu` varchar(30) NOT NULL,
  `con_usu` varchar(100) NOT NULL,
  `id_tdu` int(11) NOT NULL,
  `id_ddu` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_usu`),
  KEY `id_tdu` (`id_tdu`),
  KEY `id_ddu` (`id_ddu`),
  CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`id_tdu`) REFERENCES `tipousuario` (`id_tdu`),
  CONSTRAINT `usuario_ibfk_2` FOREIGN KEY (`id_ddu`) REFERENCES `datosusuario` (`id_ddu`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (22,'Softyboy','a432f3a3de41d684a7',2,13),(23,'Administrador','$alfa6IV7delta$',1,10);
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-02-05 16:48:45
