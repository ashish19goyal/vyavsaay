-- MySQL dump 10.13  Distrib 5.5.43, for debian-linux-gnu (i686)
--
-- Host: localhost    Database: re_user_nikki
-- ------------------------------------------------------
-- Server version	5.5.43-0ubuntu0.14.04.1

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
-- Current Database: `re_user_nikki`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `re_user_nikki` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `re_user_nikki`;

--
-- Table structure for table `access_control`
--

DROP TABLE IF EXISTS `access_control`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `access_control` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `element_id` varchar(10) DEFAULT NULL,
  `element_name` varchar(100) DEFAULT NULL,
  `username` varchar(50) DEFAULT NULL,
  `re` varchar(10) DEFAULT NULL,
  `cr` varchar(10) DEFAULT NULL,
  `up` varchar(10) DEFAULT NULL,
  `del` varchar(10) DEFAULT NULL,
  `status` varchar(10) DEFAULT NULL,
  `last_updated` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=194 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `access_control`
--

LOCK TABLES `access_control` WRITE;
/*!40000 ALTER TABLE `access_control` DISABLE KEYS */;
INSERT INTO `access_control` VALUES (1,'sync','sync_data','master','checked','checked','checked','checked','active',1),(2,'sync_mode','mode_of_operation','master','checked','checked','checked','checked','active',1),(3,'notif','notifications','master','checked','checked','checked','checked','active',1),(4,'activities','activities','master','checked','checked','checked','checked','active',1),(5,'report1','signage_changes','master','checked','checked','checked','checked','active',1),(6,'report4','modes_of_payment','master','checked','checked','checked','checked','active',1),(7,'report5','customer_account_balance','master','checked','checked','checked','checked','active',1),(8,'report6','payments_due_from_customers','master','checked','checked','checked','checked','active',1),(9,'report9','product_sales_report','master','checked','checked','checked','checked','active',1),(10,'report14','expenses_by_period','master','checked','checked','checked','checked','active',1),(11,'report15','financial_summary','master','checked','checked','checked','checked','active',1),(12,'report17','staff_performance','master','checked','checked','checked','checked','active',1),(13,'report26','sales_by_customers','master','checked','checked','checked','checked','active',1),(14,'report27','expiring_inventory','master','checked','checked','checked','checked','active',1),(15,'report28','short_inventory','master','checked','checked','checked','checked','active',1),(16,'report29','product_pre-requisites','master','checked','checked','checked','checked','active',1),(17,'report30','tasks_performed','master','checked','checked','checked','checked','active',1),(18,'report31','customer_map_by_credit','master','checked','checked','checked','checked','active',1),(19,'report32','staff_map','master','checked','checked','checked','checked','active',1),(20,'report33','supplier_map_by_debit','master','checked','checked','checked','checked','active',1),(21,'report34','effective_margin','master','checked','checked','checked','checked','active',1),(22,'report35','customer_map_by_products','master','checked','checked','checked','checked','active',1),(23,'report36','supplier_map_by_products','master','checked','checked','checked','checked','active',1),(24,'report37','payments_due_to_suppliers','master','checked','checked','checked','checked','active',1),(25,'report38','sales_by_products','master','checked','checked','checked','checked','active',1),(26,'report39','sales_by_services','master','checked','checked','checked','checked','active',1),(27,'report40','surplus_inventory','master','checked','checked','checked','checked','active',1),(28,'report41','service_pre-requisites','master','checked','checked','checked','checked','active',1),(29,'report42','feedback','master','checked','checked','checked','checked','active',1),(30,'report43','customer_behaviour','master','checked','checked','checked','checked','active',1),(31,'report44','compare_products','master','checked','checked','checked','checked','active',1),(32,'report45','virtual_store','master','checked','checked','checked','checked','active',1),(33,'report46','supplier_account_balance','master','checked','checked','checked','checked','active',1),(34,'report47','inventory_value','master','checked','checked','checked','checked','active',1),(35,'report48','resource_analysis','master','checked','checked','checked','checked','active',1),(36,'report50','margin_by_products','master','checked','checked','checked','checked','active',1),(37,'report51','dead_items','master','checked','checked','checked','checked','active',1),(38,'report52','product_purchase_report','master','checked','checked','checked','checked','active',1),(39,'report53','sales_tax','master','checked','checked','checked','checked','active',1),(40,'report54','best_days_by_sales','master','checked','checked','checked','checked','active',1),(41,'report55','worst_days_by_sales','master','checked','checked','checked','checked','active',1),(42,'report56','service_requests_report','master','checked','checked','checked','checked','active',1),(43,'report57','subscription_status','master','checked','checked','checked','checked','active',1),(44,'report58','ledger','master','checked','checked','checked','checked','active',1),(45,'report60','trial_balance','master','checked','checked','checked','checked','active',1),(46,'report61','expiring_inventory','master','checked','checked','checked','checked','active',1),(47,'report62','inventory_prediction','master','checked','checked','checked','checked','active',1),(48,'report63','item_picklist','master','checked','checked','checked','checked','active',1),(49,'report64','packing_instructions','master','checked','checked','checked','checked','active',1),(50,'report65','pricing_update_report','master','checked','checked','checked','checked','active',1),(51,'form1','update_inventory','master','checked','checked','checked','checked','active',1),(52,'form2','create_pamphlet','master','checked','checked','checked','checked','active',1),(53,'form5','manage_assets','master','checked','checked','checked','checked','active',1),(54,'form7','attendance','master','checked','checked','checked','checked','active',1),(55,'form8','manage_staff','master','checked','checked','checked','checked','active',1),(56,'form10','create_service_bills','master','checked','checked','checked','checked','active',1),(57,'form11','manage_payments','master','checked','checked','checked','checked','active',1),(58,'form12','create_bill','master','checked','checked','checked','checked','active',1),(59,'form14','manage_tasks','master','checked','checked','checked','checked','active',1),(60,'form15','accept_customer_returns','master','checked','checked','checked','checked','active',1),(61,'form16','manage_customer_returns','master','checked','checked','checked','checked','active',1),(62,'form17','manage_supplier_returns','master','checked','checked','checked','checked','active',1),(63,'form19','enter_supplier_returns','master','checked','checked','checked','checked','active',1),(64,'form21','enter_supplier_bills','master','checked','checked','checked','checked','active',1),(65,'form24','create_purchase_order','master','checked','checked','checked','checked','active',1),(66,'form30','manage_customers','master','checked','checked','checked','checked','active',1),(67,'form35','manage_offers','master','checked','checked','checked','checked','active',1),(68,'form38','store_placement','master','checked','checked','checked','checked','active',1),(69,'form39','manage_products','master','checked','checked','checked','checked','active',1),(70,'form40','manage_suppliers','master','checked','checked','checked','checked','active',1),(71,'form41','verify_customer_addresses','master','checked','checked','checked','checked','active',1),(72,'form42','manage_bills','master','checked','checked','checked','checked','active',1),(73,'form43','manage_purchase_orders','master','checked','checked','checked','checked','active',1),(74,'form44','manage_pamphlets','master','checked','checked','checked','checked','active',1),(75,'form46','set_defaults','master','checked','checked','checked','checked','active',1),(76,'form47','change_password','master','checked','checked','checked','checked','active',1),(77,'form48','select_reports','master','checked','checked','checked','checked','active',1),(78,'form49','select_forms','master','checked','checked','checked','checked','active',1),(79,'form50','set_accounting_defaults','master','checked','checked','checked','checked','active',1),(80,'form51','access_control','master','checked','checked','checked','checked','active',1),(81,'form53','manage_supplier_bills','master','checked','checked','checked','checked','active',1),(82,'form54','select_print_templates','master','checked','checked','checked','checked','active',1),(83,'form56','cash_register','master','checked','checked','checked','checked','active',1),(84,'form57','manage_services','master','checked','checked','checked','checked','active',1),(85,'form58','service_pre-requisites','master','checked','checked','checked','checked','active',1),(86,'form59','product_pre-requisites','master','checked','checked','checked','checked','active',1),(87,'form60','product_attributes','master','checked','checked','checked','checked','active',1),(88,'form61','service_attributes','master','checked','checked','checked','checked','active',1),(89,'form62','product_reviews','master','checked','checked','checked','checked','active',1),(90,'form63','service_reviews','master','checked','checked','checked','checked','active',1),(91,'form64','service_cross_sell','master','checked','checked','checked','checked','active',1),(92,'form66','product_cross_sell','master','checked','checked','checked','checked','active',1),(93,'form69','create_sale_order','master','checked','checked','checked','checked','active',1),(94,'form70','manage_sale_orders','master','checked','checked','checked','checked','active',1),(95,'form71','manage_accounts','master','checked','checked','checked','checked','active',1),(96,'form72','create_bill','master','checked','checked','checked','checked','active',1),(97,'form74','completed_sale_orders','master','checked','checked','checked','checked','active',1),(98,'form75','pending_sale_orders','master','checked','checked','checked','checked','active',1),(99,'form76','track_payments','master','checked','checked','checked','checked','active',1),(100,'form77','set_shortcuts','master','checked','checked','checked','checked','active',1),(101,'form78','promotion_mails','master','checked','checked','checked','checked','active',1),(102,'form79','manage_task_types','master','checked','checked','checked','checked','active',1),(103,'form80','de-duplication_mapping','master','checked','checked','checked','checked','active',1),(104,'form81','sale_leads','master','checked','checked','checked','checked','active',1),(105,'form82','scan_items','master','checked','checked','checked','checked','active',1),(106,'form83','storage_areas','master','checked','checked','checked','checked','active',1),(107,'form84','manage_subscriptions','master','checked','checked','checked','checked','active',1),(108,'form85','verify_supplier_addresses','master','checked','checked','checked','checked','active',1),(109,'form86','staff_geo_tracking','master','checked','checked','checked','checked','active',1),(110,'form87','manage_products','master','checked','checked','checked','checked','active',1),(111,'form88','manufacturing_schedule','master','checked','checked','checked','checked','active',1),(112,'form89','appointments','master','checked','checked','checked','checked','active',1),(113,'form90','billing_types','master','checked','checked','checked','checked','active',1),(114,'form91','create_bills_multi_register','master','checked','checked','checked','checked','active',1),(115,'form92','manage_bills_multi_register','master','checked','checked','checked','checked','active',1),(116,'form93','manage_loans','master','checked','checked','checked','checked','active',1),(117,'form94','discard_items','master','checked','checked','checked','checked','active',1),(118,'form95','data_import','master','checked','checked','checked','checked','active',1),(119,'form96','customer_attributes','master','checked','checked','checked','checked','active',1),(120,'form97','supplier_attributes','master','checked','checked','checked','checked','active',1),(121,'form98','staff_attributes','master','checked','checked','checked','checked','active',1),(122,'form99','delete_storage','master','checked','checked','checked','checked','active',1),(123,'form100','selective_sync','master','checked','checked','checked','checked','active',1),(124,'form101','manage_projects','master','checked','checked','checked','checked','active',1),(125,'form102','project_team','master','checked','checked','checked','checked','active',1),(126,'form103','project_phases','master','checked','checked','checked','checked','active',1),(127,'form104','project_tasks','master','checked','checked','checked','checked','active',1),(128,'form105','data_access','master','checked','checked','checked','checked','active',1),(129,'form108','manage_sale_orders_multi_register','master','checked','checked','checked','checked','active',1),(130,'form109','asset_attributes','master','checked','checked','checked','checked','active',1),(131,'form110','manage_reports','master','checked','checked','checked','checked','active',1),(132,'form111','create_reports','master','checked','checked','checked','checked','active',1),(133,'form112','add_unbilled_sale_items','master','checked','checked','checked','checked','active',1),(134,'form113','manage_unbilled_sale_items','master','checked','checked','checked','checked','active',1),(135,'form114','add_unbilled_purchase_items','master','checked','checked','checked','checked','active',1),(136,'form115','manage_unbilled_purchase_items','master','checked','checked','checked','checked','active',1),(137,'form116','manage_loyalty_programs','master','checked','checked','checked','checked','active',1),(138,'form118','create_bills_loyalty','master','checked','checked','checked','checked','active',1),(139,'form119','create_bills_multi_register_unbilled','master','checked','checked','checked','checked','active',1),(140,'form120','manage_loyalty_customers','master','checked','checked','checked','checked','active',1),(141,'form121','adjust_loyalty_points','master','checked','checked','checked','checked','active',1),(142,'form122','enter_supplier_bill_unbilled_items','master','checked','checked','checked','checked','active',1),(143,'form123','mandatory_attributes','master','checked','checked','checked','checked','active',1),(144,'form124','receipts','master','checked','checked','checked','checked','active',1),(145,'form125','customer_accounts','master','checked','checked','checked','checked','active',1),(146,'form126','issues_list','master','checked','checked','checked','checked','active',1),(147,'form128','manage_service_requests','master','checked','checked','checked','checked','active',1),(148,'form129','engineer_locations','master','checked','checked','checked','checked','active',1),(149,'form130','job_orders','master','checked','checked','checked','checked','active',1),(150,'form131','assign_tasks','master','checked','checked','checked','checked','active',1),(151,'form132','create_service_request','master','checked','checked','checked','checked','active',1),(152,'form133','service_documents','master','checked','checked','checked','checked','active',1),(153,'form134','service_request_detail','master','checked','checked','checked','checked','active',1),(154,'form135','project_dashboard','master','checked','checked','checked','checked','active',1),(155,'form136','enter_supplier_bill_wholesale','master','checked','checked','checked','checked','active',1),(156,'form137','project_expenses','master','checked','checked','checked','checked','active',1),(157,'form138','project_schedule','master','checked','checked','checked','checked','active',1),(158,'form141','manage_orders_app','master','checked','checked','checked','checked','active',1),(159,'form142','create_questionnaire','master','checked','checked','checked','checked','active',1),(160,'form143','manage_questionnaire','master','checked','checked','checked','checked','active',1),(161,'form144','project_budgeting','master','checked','checked','checked','checked','active',1),(162,'form145','store_placement','master','checked','checked','checked','checked','active',1),(163,'form146','manufacturing','master','checked','checked','checked','checked','active',1),(164,'form147','manage_roles','master','checked','checked','checked','checked','active',1),(165,'form148','create_roles','master','checked','checked','checked','checked','active',1),(166,'form149','assign_roles','master','checked','checked','checked','checked','active',1),(167,'form150','project_feeds','master','checked','checked','checked','checked','active',1),(168,'form151','service_request_billing','master','checked','checked','checked','checked','active',1),(169,'form152','manage_quotations','master','checked','checked','checked','checked','active',1),(170,'form153','prepare_quotation','master','checked','checked','checked','checked','active',1),(171,'form154','create_bill_dlm','master','checked','checked','checked','checked','active',1),(172,'form155','manage_inventory_dlm','master','checked','checked','checked','checked','active',1),(173,'form156','store_placement_dlm','master','checked','checked','checked','checked','active',1),(174,'form157','store_movement_dlm','master','checked','checked','checked','checked','active',1),(175,'form158','enter_purchases_dlm','master','checked','checked','checked','checked','active',1),(176,'form159','issue_grn','master','checked','checked','checked','checked','active',1),(177,'form160','manage_grn','master','checked','checked','checked','checked','active',1),(178,'form161','checklist_items','master','checked','checked','checked','checked','active',1),(179,'form162','product_checklist','master','checked','checked','checked','checked','active',1),(180,'form163','product_dimensions','master','checked','checked','checked','checked','active',1),(181,'form164','storage_dimensions','master','checked','checked','checked','checked','active',1),(182,'form165','put_away_suggestions','master','checked','checked','checked','checked','active',1),(183,'form166','manage_sale_prices','master','checked','checked','checked','checked','active',1),(184,'form167','storage_structure','master','checked','checked','checked','checked','active',1),(185,'form170','store_areas_nikki','master','checked','checked','checked','checked','active',1),(186,'report66','inventory_level_store','master','checked','checked','checked','checked','active',1),(187,'form169','manage_products_nikki','master','checked','checked','checked','checked','active',1),(188,'form171','manage_channels','master','checked','checked','checked','checked','active',1),(189,'form172','pricing_sheet','master','checked','checked','checked','checked','active',1),(190,'form173','sku_mapping','master','checked','checked','checked','checked','active',1),(191,'form174','pickup_charges','master','checked','checked','checked','checked','active',1),(192,'form175','channel_category','master','checked','checked','checked','checked','active',1),(193,'form176','category_sku_mapping','master','checked','checked','checked','checked','active',1);
/*!40000 ALTER TABLE `access_control` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `accounts`
--

DROP TABLE IF EXISTS `accounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `accounts` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(200) DEFAULT NULL,
  `acc_name` varchar(100) DEFAULT NULL,
  `description` text,
  `type` varchar(20) DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  `last_updated` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1432669160113189 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounts`
--

LOCK TABLES `accounts` WRITE;
/*!40000 ALTER TABLE `accounts` DISABLE KEYS */;
INSERT INTO `accounts` VALUES (1,NULL,NULL,'cash bill',NULL,'customer',NULL,1),(2,'master','$2y$10$nikki1234567891234567urF5u.L64sGw/EWpTB1dJGaXpsexiUjK','Rohit (9818005232)',NULL,'master','active',1432327112000),(1432371075431282,NULL,NULL,'supplier1 ()','','supplier',NULL,1432371075431),(1432663619687011,'ashish',NULL,'Ashish Goyal (9818005232)','account for staff Ashish Goyal','staff','active',1432663619687),(1432664496621619,'ashish',NULL,'Anish Goyal (9818005232)','account for staff Anish Goyal','staff','active',1432664496621),(1432667516204185,NULL,NULL,'Customer x (893243298)','','customer',NULL,1432667516204),(1432669160113188,NULL,NULL,'supplier y (9324329)','werwef','supplier',NULL,1432669160113);
/*!40000 ALTER TABLE `accounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `activities`
--

DROP TABLE IF EXISTS `activities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `activities` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `title` varchar(300) DEFAULT NULL,
  `notes` text,
  `link_to` varchar(300) DEFAULT NULL,
  `tablename` varchar(30) DEFAULT NULL,
  `type` varchar(10) DEFAULT NULL,
  `data_id` bigint(20) DEFAULT NULL,
  `data_xml` text,
  `user_display` varchar(3) DEFAULT NULL,
  `status` varchar(20) DEFAULT NULL,
  `updated_by` varchar(100) DEFAULT NULL,
  `last_updated` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1434227982899247 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `activities`
--

LOCK TABLES `activities` WRITE;
/*!40000 ALTER TABLE `activities` DISABLE KEYS */;
INSERT INTO `activities` VALUES (1,'Updated','Selected storage_structure form','form49','user_preferences','update',223,'<user_preferences><id>223</id><name unique=\'yes\'>form167</name><display_name>storage_structure</display_name><value>checked</value><type>form</type><status>active</status><last_updated>1432327384766</last_updated></user_preferences>','yes','online','Rohit',1432327384000),(2,'Updated','Selected manage_sale_prices form','form49','user_preferences','update',222,'<user_preferences><id>222</id><name unique=\'yes\'>form166</name><display_name>manage_sale_prices</display_name><value>checked</value><type>form</type><status>active</status><last_updated>1432327384775</last_updated></user_preferences>','yes','online','Rohit',1432327384000),(3,'Updated','Selected put_away_suggestions form','form49','user_preferences','update',221,'<user_preferences><id>221</id><name unique=\'yes\'>form165</name><display_name>put_away_suggestions</display_name><value>checked</value><type>form</type><status>active</status><last_updated>1432327384783</last_updated></user_preferences>','yes','online','Rohit',1432327384000),(4,'Updated','Selected storage_dimensions form','form49','user_preferences','update',220,'<user_preferences><id>220</id><name unique=\'yes\'>form164</name><display_name>storage_dimensions</display_name><value>checked</value><type>form</type><status>active</status><last_updated>1432327384789</last_updated></user_preferences>','yes','online','Rohit',1432327385000),(5,'Updated','Selected manage_grn form','form49','user_preferences','update',216,'<user_preferences><id>216</id><name unique=\'yes\'>form160</name><display_name>manage_grn</display_name><value>checked</value><type>form</type><status>active</status><last_updated>1432327384812</last_updated></user_preferences>','yes','online','Rohit',1432327385000),(6,'Updated','Selected product_dimensions form','form49','user_preferences','update',219,'<user_preferences><id>219</id><name unique=\'yes\'>form163</name><display_name>product_dimensions</display_name><value>checked</value><type>form</type><status>active</status><last_updated>1432327384795</last_updated></user_preferences>','yes','online','Rohit',1432327385000),(7,'Updated','Selected enter_purchases_dlm form','form49','user_preferences','update',214,'<user_preferences><id>214</id><name unique=\'yes\'>form158</name><display_name>enter_purchases_dlm</display_name><value>unchecked</value><type>form</type><status>active</status><last_updated>1432327384822</last_updated></user_preferences>','yes','online','Rohit',1432327385000),(8,'Updated','Selected store_movement_dlm form','form49','user_preferences','update',213,'<user_preferences><id>213</id><name unique=\'yes\'>form157</name><display_name>store_movement_dlm</display_name><value>unchecked</value><type>form</type><status>active</status><last_updated>1432327384830</last_updated></user_preferences>','yes','online','Rohit',1432327385000),(9,'Updated','Selected issue_grn form','form49','user_preferences','update',215,'<user_preferences><id>215</id><name unique=\'yes\'>form159</name><display_name>issue_grn</display_name><value>checked</value><type>form</type><status>active</status><last_updated>1432327384817</last_updated></user_preferences>','yes','online','Rohit',1432327385000),(10,'Updated','Selected manage_inventory_dlm form','form49','user_preferences','update',211,'<user_preferences><id>211</id><name unique=\'yes\'>form155</name><display_name>manage_inventory_dlm</display_name><value>unchecked</value><type>form</type><status>active</status><last_updated>1432327384839</last_updated></user_preferences>','yes','online','Rohit',1432327385000),(11,'Updated','Selected create_bill_dlm form','form49','user_preferences','update',210,'<user_preferences><id>210</id><name unique=\'yes\'>form154</name><display_name>create_bill_dlm</display_name><value>unchecked</value><type>form</type><status>active</status><last_updated>1432327384844</last_updated></user_preferences>','yes','online','Rohit',1432327385000),(12,'Updated','Selected prepare_quotation form','form49','user_preferences','update',209,'<user_preferences><id>209</id><name unique=\'yes\'>form153</name><display_name>prepare_quotation</display_name><value>unchecked</value><type>form</type><status>active</status><last_updated>1432327384848</last_updated></user_preferences>','yes','online','Rohit',1432327385000),(13,'Updated','Selected manage_quotations form','form49','user_preferences','update',208,'<user_preferences><id>208</id><name unique=\'yes\'>form152</name><display_name>manage_quotations</display_name><value>unchecked</value><type>form</type><status>active</status><last_updated>1432327384852</last_updated></user_preferences>','yes','online','Rohit',1432327385000),(14,'Updated','Selected checklist_items form','form49','user_preferences','update',217,'<user_preferences><id>217</id><name unique=\'yes\'>form161</name><display_name>checklist_items</display_name><value>checked</value><type>form</type><status>active</status><last_updated>1432327384807</last_updated></user_preferences>','yes','online','Rohit',1432327385000),(15,'Updated','Selected project_feeds form','form49','user_preferences','update',206,'<user_preferences><id>206</id><name unique=\'yes\'>form150</name><display_name>project_feeds</display_name><value>unchecked</value><type>form</type><status>active</status><last_updated>1432327384860</last_updated></user_preferences>','yes','online','Rohit',1432327385000),(16,'Updated','Selected assign_roles form','form49','user_preferences','update',205,'<user_preferences><id>205</id><name unique=\'yes\'>form149</name><display_name>assign_roles</display_name><value>checked</value><type>form</type><status>active</status><last_updated>1432327384864</last_updated></user_preferences>','yes','online','Rohit',1432327385000),(17,'Updated','Selected service_request_billing form','form49','user_preferences','update',207,'<user_preferences><id>207</id><name unique=\'yes\'>form151</name><display_name>service_request_billing</display_name><value>unchecked</value><type>form</type><status>active</status><last_updated>1432327384857</last_updated></user_preferences>','yes','online','Rohit',1432327385000),(18,'Updated','Selected store_placement_dlm form','form49','user_preferences','update',212,'<user_preferences><id>212</id><name unique=\'yes\'>form156</name><display_name>store_placement_dlm</display_name><value>unchecked</value><type>form</type><status>active</status><last_updated>1432327384835</last_updated></user_preferences>','yes','online','Rohit',1432327385000),(19,'Updated','Selected manufacturing form','form49','user_preferences','update',202,'<user_preferences><id>202</id><name unique=\'yes\'>form146</name><display_name>manufacturing</display_name><value>unchecked</value><type>form</type><status>active</status><last_updated>1432327384876</last_updated></user_preferences>','yes','online','Rohit',1432327386000),(20,'Updated','Selected manage_roles form','form49','user_preferences','update',203,'<user_preferences><id>203</id><name unique=\'yes\'>form147</name><display_name>manage_roles</display_name><value>checked</value><type>form</type><status>active</status><last_updated>1432327384872</last_updated></user_preferences>','yes','online','Rohit',1432327386000),(21,'Updated','Selected create_roles form','form49','user_preferences','update',204,'<user_preferences><id>204</id><name unique=\'yes\'>form148</name><display_name>create_roles</display_name><value>checked</value><type>form</type><status>active</status><last_updated>1432327384868</last_updated></user_preferences>','yes','online','Rohit',1432327386000),(22,'Updated','Selected manage_questionnaire form','form49','user_preferences','update',199,'<user_preferences><id>199</id><name unique=\'yes\'>form143</name><display_name>manage_questionnaire</display_name><value>unchecked</value><type>form</type><status>active</status><last_updated>1432327384888</last_updated></user_preferences>','yes','online','Rohit',1432327386000),(23,'Updated','Selected product_checklist form','form49','user_preferences','update',218,'<user_preferences><id>218</id><name unique=\'yes\'>form162</name><display_name>product_checklist</display_name><value>checked</value><type>form</type><status>active</status><last_updated>1432327384801</last_updated></user_preferences>','yes','online','Rohit',1432327386000),(24,'Updated','Selected store_movement form','form49','user_preferences','update',201,'<user_preferences><id>201</id><name unique=\'yes\'>form145</name><display_name>store_movement</display_name><value>checked</value><type>form</type><status>active</status><last_updated>1432327384880</last_updated></user_preferences>','yes','online','Rohit',1432327386000),(25,'Updated','Selected project_budgeting form','form49','user_preferences','update',200,'<user_preferences><id>200</id><name unique=\'yes\'>form144</name><display_name>project_budgeting</display_name><value>unchecked</value><type>form</type><status>active</status><last_updated>1432327384884</last_updated></user_preferences>','yes','online','Rohit',1432327386000),(26,'Updated','Selected create_questionnaire form','form49','user_preferences','update',198,'<user_preferences><id>198</id><name unique=\'yes\'>form142</name><display_name>create_questionnaire</display_name><value>checked</value><type>form</type><status>active</status><last_updated>1432327464200</last_updated></user_preferences>','yes','online','Rohit',1432327464000),(27,'Updated','Selected project_schedule form','form49','user_preferences','update',196,'<user_preferences><id>196</id><name unique=\'yes\'>form138</name><display_name>project_schedule</display_name><value>unchecked</value><type>form</type><status>active</status><last_updated>1432327464220</last_updated></user_preferences>','yes','online','Rohit',1432327464000),(28,'Updated','Selected manage_orders_app form','form49','user_preferences','update',197,'<user_preferences><id>197</id><name unique=\'yes\'>form141</name><display_name>manage_orders_app</display_name><value>unchecked</value><type>form</type><status>active</status><last_updated>1432327464210</last_updated></user_preferences>','yes','online','Rohit',1432327464000),(29,'Updated','Selected project_expenses form','form49','user_preferences','update',195,'<user_preferences><id>195</id><name unique=\'yes\'>form137</name><display_name>project_expenses</display_name><value>unchecked</value><type>form</type><status>active</status><last_updated>1432327464228</last_updated></user_preferences>','yes','online','Rohit',1432327464000),(30,'Updated','Selected service_documents form','form49','user_preferences','update',191,'<user_preferences><id>191</id><name unique=\'yes\'>form133</name><display_name>service_documents</display_name><value>unchecked</value><type>form</type><status>active</status><last_updated>1432327464254</last_updated></user_preferences>','yes','online','Rohit',1432327464000),(31,'Updated','Selected project_dashboard form','form49','user_preferences','update',193,'<user_preferences><id>193</id><name unique=\'yes\'>form135</name><display_name>project_dashboard</display_name><value>unchecked</value><type>form</type><status>active</status><last_updated>1432327464242</last_updated></user_preferences>','yes','online','Rohit',1432327464000),(32,'Updated','Selected enter_supplier_bill_wholesale form','form49','user_preferences','update',194,'<user_preferences><id>194</id><name unique=\'yes\'>form136</name><display_name>enter_supplier_bill_wholesale</display_name><value>unchecked</value><type>form</type><status>active</status><last_updated>1432327464235</last_updated></user_preferences>','yes','online','Rohit',1432327464000),(33,'Updated','Selected assign_tasks form','form49','user_preferences','update',189,'<user_preferences><id>189</id><name unique=\'yes\'>form131</name><display_name>assign_tasks</display_name><value>unchecked</value><type>form</type><status>active</status><last_updated>1432327464266</last_updated></user_preferences>','yes','online','Rohit',1432327464000),(34,'Updated','Selected job_orders form','form49','user_preferences','update',188,'<user_preferences><id>188</id><name unique=\'yes\'>form130</name><display_name>job_orders</display_name><value>unchecked</value><type>form</type><status>active</status><last_updated>1432327464275</last_updated></user_preferences>','yes','online','Rohit',1432327464000),(35,'Updated','Selected engineer_locations form','form49','user_preferences','update',187,'<user_preferences><id>187</id><name unique=\'yes\'>form129</name><display_name>engineer_locations</display_name><value>unchecked</value><type>form</type><status>active</status><last_updated>1432327464280</last_updated></user_preferences>','yes','online','Rohit',1432327464000),(36,'Updated','Selected service_request_detail form','form49','user_preferences','update',192,'<user_preferences><id>192</id><name unique=\'yes\'>form134</name><display_name>service_request_detail</display_name><value>unchecked</value><type>form</type><status>active</status><last_updated>1432327464248</last_updated></user_preferences>','yes','online','Rohit',1432327464000),(37,'Updated','Selected customer_accounts form','form49','user_preferences','update',184,'<user_preferences><id>184</id><name unique=\'yes\'>form125</name><display_name>customer_accounts</display_name><value>unchecked</value><type>form</type><status>active</status><last_updated>1432327464294</last_updated></user_preferences>','yes','online','Rohit',1432327464000),(38,'Updated','Selected manage_service_requests form','form49','user_preferences','update',186,'<user_preferences><id>186</id><name unique=\'yes\'>form128</name><display_name>manage_service_requests</display_name><value>unchecked</value><type>form</type><status>active</status><last_updated>1432327464285</last_updated></user_preferences>','yes','online','Rohit',1432327465000),(39,'Updated','Selected receipts form','form49','user_preferences','update',183,'<user_preferences><id>183</id><name unique=\'yes\'>form124</name><display_name>receipts</display_name><value>unchecked</value><type>form</type><status>active</status><last_updated>1432327464298</last_updated></user_preferences>','yes','online','Rohit',1432327465000),(40,'Updated','Selected adjust_loyalty_points form','form49','user_preferences','update',180,'<user_preferences><id>180</id><name unique=\'yes\'>form121</name><display_name>adjust_loyalty_points</display_name><value>unchecked</value><type>form</type><status>active</status><last_updated>1432327464311</last_updated></user_preferences>','yes','online','Rohit',1432327465000),(41,'Updated','Selected mandatory_attributes form','form49','user_preferences','update',182,'<user_preferences><id>182</id><name unique=\'yes\'>form123</name><display_name>mandatory_attributes</display_name><value>unchecked</value><type>form</type><status>active</status><last_updated>1432327464302</last_updated></user_preferences>','yes','online','Rohit',1432327465000),(42,'Updated','Selected create_bills_multi_register_unbilled form','form49','user_preferences','update',178,'<user_preferences><id>178</id><name unique=\'yes\'>form119</name><display_name>create_bills_multi_register_unbilled</display_name><value>unchecked</value><type>form</type><status>active</status><last_updated>1432327464319</last_updated></user_preferences>','yes','online','Rohit',1432327465000),(43,'Updated','Selected enter_supplier_bill_unbilled_items form','form49','user_preferences','update',181,'<user_preferences><id>181</id><name unique=\'yes\'>form122</name><display_name>enter_supplier_bill_unbilled_items</display_name><value>unchecked</value><type>form</type><status>active</status><last_updated>1432327464307</last_updated></user_preferences>','yes','online','Rohit',1432327465000),(44,'Updated','Selected manage_loyalty_programs form','form49','user_preferences','update',176,'<user_preferences><id>176</id><name unique=\'yes\'>form116</name><display_name>manage_loyalty_programs</display_name><value>unchecked</value><type>form</type><status>active</status><last_updated>1432327464327</last_updated></user_preferences>','yes','online','Rohit',1432327465000),(45,'Updated','Selected manage_loyalty_customers form','form49','user_preferences','update',179,'<user_preferences><id>179</id><name unique=\'yes\'>form120</name><display_name>manage_loyalty_customers</display_name><value>unchecked</value><type>form</type><status>active</status><last_updated>1432327464315</last_updated></user_preferences>','yes','online','Rohit',1432327465000),(46,'Updated','Selected create_service_request form','form49','user_preferences','update',190,'<user_preferences><id>190</id><name unique=\'yes\'>form132</name><display_name>create_service_request</display_name><value>unchecked</value><type>form</type><status>active</status><last_updated>1432327464260</last_updated></user_preferences>','yes','online','Rohit',1432327465000),(47,'Updated','Selected add_unbilled_purchase_items form','form49','user_preferences','update',174,'<user_preferences><id>174</id><name unique=\'yes\'>form114</name><display_name>add_unbilled_purchase_items</display_name><value>unchecked</value><type>form</type><status>active</status><last_updated>1432327464335</last_updated></user_preferences>','yes','online','Rohit',1432327465000),(48,'Updated','Selected manage_unbilled_purchase_items form','form49','user_preferences','update',175,'<user_preferences><id>175</id><name unique=\'yes\'>form115</name><display_name>manage_unbilled_purchase_items</display_name><value>unchecked</value><type>form</type><status>active</status><last_updated>1432327464332</last_updated></user_preferences>','yes','online','Rohit',1432327465000),(49,'Updated','Selected issues_list form','form49','user_preferences','update',185,'<user_preferences><id>185</id><name unique=\'yes\'>form126</name><display_name>issues_list</display_name><value>unchecked</value><type>form</type><status>active</status><last_updated>1432327464289</last_updated></user_preferences>','yes','online','Rohit',1432327465000),(50,'Updated','Selected create_bills_loyalty form','form49','user_preferences','update',177,'<user_preferences><id>177</id><name unique=\'yes\'>form118</name><display_name>create_bills_loyalty</display_name><value>unchecked</value><type>form</type><status>active</status><last_updated>1432327464323</last_updated></user_preferences>','yes','online','Rohit',1432327465000),(51,'Updated','Selected manage_unbilled_sale_items form','form49','user_preferences','update',173,'<user_preferences><id>173</id><name unique=\'yes\'>form113</name><display_name>manage_unbilled_sale_items</display_name><value>unchecked</value><type>form</type><status>active</status><last_updated>1432327537901</last_updated></user_preferences>','yes','online','Rohit',1432327537000),(52,'Updated','Selected add_unbilled_sale_items form','form49','user_preferences','update',172,'<user_preferences><id>172</id><name unique=\'yes\'>form112</name><display_name>add_unbilled_sale_items</display_name><value>unchecked</value><type>form</type><status>active</status><last_updated>1432327537910</last_updated></user_preferences>','yes','online','Rohit',1432327538000),(53,'Updated','Selected asset_attributes form','form49','user_preferences','update',169,'<user_preferences><id>169</id><name unique=\'yes\'>form109</name><display_name>asset_attributes</display_name><value>unchecked</value><type>form</type><status>active</status><last_updated>1432327537935</last_updated></user_preferences>','yes','online','Rohit',1432327538000),(54,'Updated','Selected data_access form','form49','user_preferences','update',167,'<user_preferences><id>167</id><name unique=\'yes\'>form105</name><display_name>data_access</display_name><value>checked</value><type>form</type><status>active</status><last_updated>1432327537949</last_updated></user_preferences>','yes','online','Rohit',1432327538000),(55,'Updated','Selected project_tasks form','form49','user_preferences','update',166,'<user_preferences><id>166</id><name unique=\'yes\'>form104</name><display_name>project_tasks</display_name><value>unchecked</value><type>form</type><status>active</status><last_updated>1432327537955</last_updated></user_preferences>','yes','online','Rohit',1432327538000),(56,'Updated','Selected create_reports form','form49','user_preferences','update',171,'<user_preferences><id>171</id><name unique=\'yes\'>form111</name><display_name>create_reports</display_name><value>checked</value><type>form</type><status>active</status><last_updated>1432327537918</last_updated></user_preferences>','yes','online','Rohit',1432327538000),(57,'Updated','Selected project_phases form','form49','user_preferences','update',165,'<user_preferences><id>165</id><name unique=\'yes\'>form103</name><display_name>project_phases</display_name><value>unchecked</value><type>form</type><status>active</status><last_updated>1432327537960</last_updated></user_preferences>','yes','online','Rohit',1432327538000),(58,'Updated','Selected project_team form','form49','user_preferences','update',164,'<user_preferences><id>164</id><name unique=\'yes\'>form102</name><display_name>project_team</display_name><value>unchecked</value><type>form</type><status>active</status><last_updated>1432327537965</last_updated></user_preferences>','yes','online','Rohit',1432327538000),(59,'Updated','Selected manage_projects form','form49','user_preferences','update',163,'<user_preferences><id>163</id><name unique=\'yes\'>form101</name><display_name>manage_projects</display_name><value>unchecked</value><type>form</type><status>active</status><last_updated>1432327537970</last_updated></user_preferences>','yes','online','Rohit',1432327538000),(60,'Updated','Selected selective_sync form','form49','user_preferences','update',162,'<user_preferences><id>162</id><name unique=\'yes\'>form100</name><display_name>selective_sync</display_name><value>unchecked</value><type>form</type><status>active</status><last_updated>1432327537975</last_updated></user_preferences>','yes','online','Rohit',1432327538000),(61,'Updated','Selected manage_reports form','form49','user_preferences','update',170,'<user_preferences><id>170</id><name unique=\'yes\'>form110</name><display_name>manage_reports</display_name><value>checked</value><type>form</type><status>active</status><last_updated>1432327537927</last_updated></user_preferences>','yes','online','Rohit',1432327538000),(62,'Updated','Selected supplier_attributes form','form49','user_preferences','update',159,'<user_preferences><id>159</id><name unique=\'yes\'>form97</name><display_name>supplier_attributes</display_name><value>unchecked</value><type>form</type><status>active</status><last_updated>1432327537990</last_updated></user_preferences>','yes','online','Rohit',1432327538000),(63,'Updated','Selected delete_storage form','form49','user_preferences','update',161,'<user_preferences><id>161</id><name unique=\'yes\'>form99</name><display_name>delete_storage</display_name><value>checked</value><type>form</type><status>active</status><last_updated>1432327537980</last_updated></user_preferences>','yes','online','Rohit',1432327538000),(64,'Updated','Selected customer_attributes form','form49','user_preferences','update',158,'<user_preferences><id>158</id><name unique=\'yes\'>form96</name><display_name>customer_attributes</display_name><value>unchecked</value><type>form</type><status>active</status><last_updated>1432327537994</last_updated></user_preferences>','yes','online','Rohit',1432327538000),(65,'Updated','Selected discard_items form','form49','user_preferences','update',156,'<user_preferences><id>156</id><name unique=\'yes\'>form94</name><display_name>discard_items</display_name><value>checked</value><type>form</type><status>active</status><last_updated>1432327538003</last_updated></user_preferences>','yes','online','Rohit',1432327538000),(66,'Updated','Selected manage_sale_orders_multi_register form','form49','user_preferences','update',168,'<user_preferences><id>168</id><name unique=\'yes\'>form108</name><display_name>manage_sale_orders_multi_register</display_name><value>checked</value><type>form</type><status>active</status><last_updated>1432327537942</last_updated></user_preferences>','yes','online','Rohit',1432327538000),(67,'Updated','Selected staff_attributes form','form49','user_preferences','update',160,'<user_preferences><id>160</id><name unique=\'yes\'>form98</name><display_name>staff_attributes</display_name><value>unchecked</value><type>form</type><status>active</status><last_updated>1432327537985</last_updated></user_preferences>','yes','online','Rohit',1432327539000),(68,'Updated','Selected create_bills_multi_register form','form49','user_preferences','update',153,'<user_preferences><id>153</id><name unique=\'yes\'>form91</name><display_name>create_bills_multi_register</display_name><value>checked</value><type>form</type><status>active</status><last_updated>1432327538016</last_updated></user_preferences>','yes','online','Rohit',1432327539000),(69,'Updated','Selected billing_types form','form49','user_preferences','update',152,'<user_preferences><id>152</id><name unique=\'yes\'>form90</name><display_name>billing_types</display_name><value>checked</value><type>form</type><status>active</status><last_updated>1432327538020</last_updated></user_preferences>','yes','online','Rohit',1432327539000),(70,'Updated','Selected appointments form','form49','user_preferences','update',151,'<user_preferences><id>151</id><name unique=\'yes\'>form89</name><display_name>appointments</display_name><value>unchecked</value><type>form</type><status>active</status><last_updated>1432327538024</last_updated></user_preferences>','yes','online','Rohit',1432327539000),(71,'Updated','Selected manufacturing_schedule form','form49','user_preferences','update',150,'<user_preferences><id>150</id><name unique=\'yes\'>form88</name><display_name>manufacturing_schedule</display_name><value>unchecked</value><type>form</type><status>active</status><last_updated>1432327538028</last_updated></user_preferences>','yes','online','Rohit',1432327539000),(72,'Updated','Selected manage_loans form','form49','user_preferences','update',155,'<user_preferences><id>155</id><name unique=\'yes\'>form93</name><display_name>manage_loans</display_name><value>unchecked</value><type>form</type><status>active</status><last_updated>1432327538007</last_updated></user_preferences>','yes','online','Rohit',1432327539000),(73,'Updated','Selected data_import form','form49','user_preferences','update',157,'<user_preferences><id>157</id><name unique=\'yes\'>form95</name><display_name>data_import</display_name><value>checked</value><type>form</type><status>active</status><last_updated>1432327537999</last_updated></user_preferences>','yes','online','Rohit',1432327539000),(74,'Updated','Selected manage_bills_multi_register form','form49','user_preferences','update',154,'<user_preferences><id>154</id><name unique=\'yes\'>form92</name><display_name>manage_bills_multi_register</display_name><value>checked</value><type>form</type><status>active</status><last_updated>1432327538012</last_updated></user_preferences>','yes','online','Rohit',1432327539000),(75,'Updated','Selected manage_products form','form49','user_preferences','update',149,'<user_preferences><id>149</id><name unique=\'yes\'>form87</name><display_name>manage_products</display_name><value>unchecked</value><type>form</type><status>active</status><last_updated>1432327538032</last_updated></user_preferences>','yes','online','Rohit',1432327539000),(76,'Updated','Selected staff_geo_tracking form','form49','user_preferences','update',148,'<user_preferences><id>148</id><name unique=\'yes\'>form86</name><display_name>staff_geo_tracking</display_name><value>unchecked</value><type>form</type><status>active</status><last_updated>1432327633643</last_updated></user_preferences>','yes','online','Rohit',1432327633000),(77,'Updated','Selected manage_subscriptions form','form49','user_preferences','update',146,'<user_preferences><id>146</id><name unique=\'yes\'>form84</name><display_name>manage_subscriptions</display_name><value>unchecked</value><type>form</type><status>active</status><last_updated>1432327633660</last_updated></user_preferences>','yes','online','Rohit',1432327633000),(78,'Updated','Selected verify_supplier_addresses form','form49','user_preferences','update',147,'<user_preferences><id>147</id><name unique=\'yes\'>form85</name><display_name>verify_supplier_addresses</display_name><value>unchecked</value><type>form</type><status>active</status><last_updated>1432327633652</last_updated></user_preferences>','yes','online','Rohit',1432327633000),(79,'Updated','Selected storage_areas form','form49','user_preferences','update',145,'<user_preferences><id>145</id><name unique=\'yes\'>form83</name><display_name>storage_areas</display_name><value>checked</value><type>form</type><status>active</status><last_updated>1432327633670</last_updated></user_preferences>','yes','online','Rohit',1432327633000),(80,'Updated','Selected de-duplication_mapping form','form49','user_preferences','update',142,'<user_preferences><id>142</id><name unique=\'yes\'>form80</name><display_name>de-duplication_mapping</display_name><value>unchecked</value><type>form</type><status>active</status><last_updated>1432327633690</last_updated></user_preferences>','yes','online','Rohit',1432327633000),(81,'Updated','Selected promotion_mails form','form49','user_preferences','update',140,'<user_preferences><id>140</id><name unique=\'yes\'>form78</name><display_name>promotion_mails</display_name><value>unchecked</value><type>form</type><status>active</status><last_updated>1432327633701</last_updated></user_preferences>','yes','online','Rohit',1432327634000),(82,'Updated','Selected scan_items form','form49','user_preferences','update',144,'<user_preferences><id>144</id><name unique=\'yes\'>form82</name><display_name>scan_items</display_name><value>checked</value><type>form</type><status>active</status><last_updated>1432327633676</last_updated></user_preferences>','yes','online','Rohit',1432327634000),(83,'Updated','Selected track_payments form','form49','user_preferences','update',138,'<user_preferences><id>138</id><name unique=\'yes\'>form76</name><display_name>track_payments</display_name><value>unchecked</value><type>form</type><status>active</status><last_updated>1432327633716</last_updated></user_preferences>','yes','online','Rohit',1432327634000),(84,'Updated','Selected set_shortcuts form','form49','user_preferences','update',139,'<user_preferences><id>139</id><name unique=\'yes\'>form77</name><display_name>set_shortcuts</display_name><value>unchecked</value><type>form</type><status>active</status><last_updated>1432327633708</last_updated></user_preferences>','yes','online','Rohit',1432327634000),(85,'Updated','Selected sale_leads form','form49','user_preferences','update',143,'<user_preferences><id>143</id><name unique=\'yes\'>form81</name><display_name>sale_leads</display_name><value>unchecked</value><type>form</type><status>active</status><last_updated>1432327633684</last_updated></user_preferences>','yes','online','Rohit',1432327634000),(86,'Updated','Selected pending_sale_orders form','form49','user_preferences','update',137,'<user_preferences><id>137</id><name unique=\'yes\'>form75</name><display_name>pending_sale_orders</display_name><value>unchecked</value><type>form</type><status>active</status><last_updated>1432327633722</last_updated></user_preferences>','yes','online','Rohit',1432327634000),(87,'Updated','Selected manage_accounts form','form49','user_preferences','update',134,'<user_preferences><id>134</id><name unique=\'yes\'>form71</name><display_name>manage_accounts</display_name><value>checked</value><type>form</type><status>active</status><last_updated>1432327633736</last_updated></user_preferences>','yes','online','Rohit',1432327634000),(88,'Updated','Selected manage_task_types form','form49','user_preferences','update',141,'<user_preferences><id>141</id><name unique=\'yes\'>form79</name><display_name>manage_task_types</display_name><value>unchecked</value><type>form</type><status>active</status><last_updated>1432327633695</last_updated></user_preferences>','yes','online','Rohit',1432327634000),(89,'Updated','Selected create_bill form','form49','user_preferences','update',135,'<user_preferences><id>135</id><name unique=\'yes\'>form72</name><display_name>create_bill</display_name><value>unchecked</value><type>form</type><status>active</status><last_updated>1432327633731</last_updated></user_preferences>','yes','online','Rohit',1432327634000),(90,'Updated','Selected manage_sale_orders form','form49','user_preferences','update',133,'<user_preferences><id>133</id><name unique=\'yes\'>form70</name><display_name>manage_sale_orders</display_name><value>checked</value><type>form</type><status>active</status><last_updated>1432327633740</last_updated></user_preferences>','yes','online','Rohit',1432327634000),(91,'Updated','Selected service_cross_sell form','form49','user_preferences','update',130,'<user_preferences><id>130</id><name unique=\'yes\'>form64</name><display_name>service_cross_sell</display_name><value>unchecked</value><type>form</type><status>active</status><last_updated>1432327633753</last_updated></user_preferences>','yes','online','Rohit',1432327634000),(92,'Updated','Selected product_cross_sell form','form49','user_preferences','update',131,'<user_preferences><id>131</id><name unique=\'yes\'>form66</name><display_name>product_cross_sell</display_name><value>unchecked</value><type>form</type><status>active</status><last_updated>1432327633749</last_updated></user_preferences>','yes','online','Rohit',1432327634000),(93,'Updated','Selected product_reviews form','form49','user_preferences','update',128,'<user_preferences><id>128</id><name unique=\'yes\'>form62</name><display_name>product_reviews</display_name><value>checked</value><type>form</type><status>active</status><last_updated>1432327633761</last_updated></user_preferences>','yes','online','Rohit',1432327634000),(94,'Updated','Selected service_attributes form','form49','user_preferences','update',127,'<user_preferences><id>127</id><name unique=\'yes\'>form61</name><display_name>service_attributes</display_name><value>unchecked</value><type>form</type><status>active</status><last_updated>1432327633766</last_updated></user_preferences>','yes','online','Rohit',1432327634000),(95,'Updated','Selected service_reviews form','form49','user_preferences','update',129,'<user_preferences><id>129</id><name unique=\'yes\'>form63</name><display_name>service_reviews</display_name><value>unchecked</value><type>form</type><status>active</status><last_updated>1432327633757</last_updated></user_preferences>','yes','online','Rohit',1432327634000),(96,'Updated','Selected product_attributes form','form49','user_preferences','update',126,'<user_preferences><id>126</id><name unique=\'yes\'>form60</name><display_name>product_attributes</display_name><value>unchecked</value><type>form</type><status>active</status><last_updated>1432327633770</last_updated></user_preferences>','yes','online','Rohit',1432327635000),(97,'Updated','Selected product_pre-requisites form','form49','user_preferences','update',125,'<user_preferences><id>125</id><name unique=\'yes\'>form59</name><display_name>product_pre-requisites</display_name><value>unchecked</value><type>form</type><status>active</status><last_updated>1432327633774</last_updated></user_preferences>','yes','online','Rohit',1432327635000),(98,'Updated','Selected service_pre-requisites form','form49','user_preferences','update',124,'<user_preferences><id>124</id><name unique=\'yes\'>form58</name><display_name>service_pre-requisites</display_name><value>unchecked</value><type>form</type><status>active</status><last_updated>1432327633777</last_updated></user_preferences>','yes','online','Rohit',1432327635000),(99,'Updated','Selected create_sale_order form','form49','user_preferences','update',132,'<user_preferences><id>132</id><name unique=\'yes\'>form69</name><display_name>create_sale_order</display_name><value>unchecked</value><type>form</type><status>active</status><last_updated>1432327633744</last_updated></user_preferences>','yes','online','Rohit',1432327635000),(100,'Updated','Selected completed_sale_orders form','form49','user_preferences','update',136,'<user_preferences><id>136</id><name unique=\'yes\'>form74</name><display_name>completed_sale_orders</display_name><value>unchecked</value><type>form</type><status>active</status><last_updated>1432327633726</last_updated></user_preferences>','yes','online','Rohit',1432327635000),(101,'Updated','Selected manage_services form','form49','user_preferences','update',123,'<user_preferences><id>123</id><name unique=\'yes\'>form57</name><display_name>manage_services</display_name><value>unchecked</value><type>form</type><status>active</status><last_updated>1432327688396</last_updated></user_preferences>','yes','online','Rohit',1432327688000),(102,'Updated','Selected cash_register form','form49','user_preferences','update',122,'<user_preferences><id>122</id><name unique=\'yes\'>form56</name><display_name>cash_register</display_name><value>unchecked</value><type>form</type><status>active</status><last_updated>1432327688406</last_updated></user_preferences>','yes','online','Rohit',1432327688000),(103,'Updated','Selected manage_supplier_bills form','form49','user_preferences','update',120,'<user_preferences><id>120</id><name unique=\'yes\'>form53</name><display_name>manage_supplier_bills</display_name><value>unchecked</value><type>form</type><status>active</status><last_updated>1432327688425</last_updated></user_preferences>','yes','online','Rohit',1432327688000),(104,'Updated','Selected set_accounting_defaults form','form49','user_preferences','update',118,'<user_preferences><id>118</id><name unique=\'yes\'>form50</name><display_name>set_accounting_defaults</display_name><value>checked</value><type>form</type><status>active</status><last_updated>1432327688440</last_updated></user_preferences>','yes','online','Rohit',1432327688000),(105,'Updated','Selected access_control form','form49','user_preferences','update',119,'<user_preferences><id>119</id><name unique=\'yes\'>form51</name><display_name>access_control</display_name><value>checked</value><type>form</type><status>active</status><last_updated>1432327688433</last_updated></user_preferences>','yes','online','Rohit',1432327688000),(106,'Updated','Selected select_print_templates form','form49','user_preferences','update',121,'<user_preferences><id>121</id><name unique=\'yes\'>form54</name><display_name>select_print_templates</display_name><value>unchecked</value><type>form</type><status>active</status><last_updated>1432327688417</last_updated></user_preferences>','yes','online','Rohit',1432327688000),(107,'Updated','Selected change_password form','form49','user_preferences','update',115,'<user_preferences><id>115</id><name unique=\'yes\'>form47</name><display_name>change_password</display_name><value>checked</value><type>form</type><status>active</status><last_updated>1432327688458</last_updated></user_preferences>','yes','online','Rohit',1432327688000),(108,'Updated','Selected set_defaults form','form49','user_preferences','update',114,'<user_preferences><id>114</id><name unique=\'yes\'>form46</name><display_name>set_defaults</display_name><value>checked</value><type>form</type><status>active</status><last_updated>1432327688462</last_updated></user_preferences>','yes','online','Rohit',1432327688000),(109,'Updated','Selected manage_pamphlets form','form49','user_preferences','update',113,'<user_preferences><id>113</id><name unique=\'yes\'>form44</name><display_name>manage_pamphlets</display_name><value>unchecked</value><type>form</type><status>active</status><last_updated>1432327688467</last_updated></user_preferences>','yes','online','Rohit',1432327688000),(110,'Updated','Selected select_forms form','form49','user_preferences','update',117,'<user_preferences><id>117</id><name unique=\'yes\'>form49</name><display_name>select_forms</display_name><value>checked</value><type>form</type><status>active</status><last_updated>1432327688447</last_updated></user_preferences>','yes','online','Rohit',1432327689000),(111,'Updated','Selected manage_bills form','form49','user_preferences','update',111,'<user_preferences><id>111</id><name unique=\'yes\'>form42</name><display_name>manage_bills</display_name><value>unchecked</value><type>form</type><status>active</status><last_updated>1432327688477</last_updated></user_preferences>','yes','online','Rohit',1432327689000),(112,'Updated','Selected manage_suppliers form','form49','user_preferences','update',109,'<user_preferences><id>109</id><name unique=\'yes\'>form40</name><display_name>manage_suppliers</display_name><value>checked</value><type>form</type><status>active</status><last_updated>1432327688486</last_updated></user_preferences>','yes','online','Rohit',1432327689000),(113,'Updated','Selected select_reports form','form49','user_preferences','update',116,'<user_preferences><id>116</id><name unique=\'yes\'>form48</name><display_name>select_reports</display_name><value>checked</value><type>form</type><status>active</status><last_updated>1432327688452</last_updated></user_preferences>','yes','online','Rohit',1432327689000),(114,'Updated','Selected verify_customer_addresses form','form49','user_preferences','update',110,'<user_preferences><id>110</id><name unique=\'yes\'>form41</name><display_name>verify_customer_addresses</display_name><value>unchecked</value><type>form</type><status>active</status><last_updated>1432327688482</last_updated></user_preferences>','yes','online','Rohit',1432327689000),(115,'Updated','Selected store_placement form','form49','user_preferences','update',107,'<user_preferences><id>107</id><name unique=\'yes\'>form38</name><display_name>store_placement</display_name><value>checked</value><type>form</type><status>active</status><last_updated>1432327688495</last_updated></user_preferences>','yes','online','Rohit',1432327689000),(116,'Updated','Selected create_purchase_order form','form49','user_preferences','update',104,'<user_preferences><id>104</id><name unique=\'yes\'>form24</name><display_name>create_purchase_order</display_name><value>checked</value><type>form</type><status>active</status><last_updated>1432327688508</last_updated></user_preferences>','yes','online','Rohit',1432327689000),(117,'Updated','Selected manage_offers form','form49','user_preferences','update',106,'<user_preferences><id>106</id><name unique=\'yes\'>form35</name><display_name>manage_offers</display_name><value>unchecked</value><type>form</type><status>active</status><last_updated>1432327688499</last_updated></user_preferences>','yes','online','Rohit',1432327689000),(118,'Updated','Selected manage_purchase_orders form','form49','user_preferences','update',112,'<user_preferences><id>112</id><name unique=\'yes\'>form43</name><display_name>manage_purchase_orders</display_name><value>checked</value><type>form</type><status>active</status><last_updated>1432327688472</last_updated></user_preferences>','yes','online','Rohit',1432327689000),(119,'Updated','Selected manage_customers form','form49','user_preferences','update',105,'<user_preferences><id>105</id><name unique=\'yes\'>form30</name><display_name>manage_customers</display_name><value>checked</value><type>form</type><status>active</status><last_updated>1432327688503</last_updated></user_preferences>','yes','online','Rohit',1432327689000),(120,'Updated','Selected manage_supplier_returns form','form49','user_preferences','update',101,'<user_preferences><id>101</id><name unique=\'yes\'>form17</name><display_name>manage_supplier_returns</display_name><value>unchecked</value><type>form</type><status>active</status><last_updated>1432327688521</last_updated></user_preferences>','yes','online','Rohit',1432327689000),(121,'Updated','Selected enter_supplier_bills form','form49','user_preferences','update',103,'<user_preferences><id>103</id><name unique=\'yes\'>form21</name><display_name>enter_supplier_bills</display_name><value>unchecked</value><type>form</type><status>active</status><last_updated>1432327688512</last_updated></user_preferences>','yes','online','Rohit',1432327689000),(122,'Updated','Selected enter_supplier_returns form','form49','user_preferences','update',102,'<user_preferences><id>102</id><name unique=\'yes\'>form19</name><display_name>enter_supplier_returns</display_name><value>unchecked</value><type>form</type><status>active</status><last_updated>1432327688516</last_updated></user_preferences>','yes','online','Rohit',1432327689000),(123,'Updated','Selected manage_customer_returns form','form49','user_preferences','update',100,'<user_preferences><id>100</id><name unique=\'yes\'>form16</name><display_name>manage_customer_returns</display_name><value>checked</value><type>form</type><status>active</status><last_updated>1432327688526</last_updated></user_preferences>','yes','online','Rohit',1432327689000),(124,'Updated','Selected manage_products form','form49','user_preferences','update',108,'<user_preferences><id>108</id><name unique=\'yes\'>form39</name><display_name>manage_products</display_name><value>checked</value><type>form</type><status>active</status><last_updated>1432327688491</last_updated></user_preferences>','yes','online','Rohit',1432327689000),(125,'Updated','Selected accept_customer_returns form','form49','user_preferences','update',99,'<user_preferences><id>99</id><name unique=\'yes\'>form15</name><display_name>accept_customer_returns</display_name><value>checked</value><type>form</type><status>active</status><last_updated>1432327688530</last_updated></user_preferences>','yes','online','Rohit',1432327690000),(126,'Updated','Selected manage_tasks form','form49','user_preferences','update',98,'<user_preferences><id>98</id><name unique=\'yes\'>form14</name><display_name>manage_tasks</display_name><value>unchecked</value><type>form</type><status>active</status><last_updated>1432327708020</last_updated></user_preferences>','yes','online','Rohit',1432327708000),(127,'Updated','Selected manage_payments form','form49','user_preferences','update',96,'<user_preferences><id>96</id><name unique=\'yes\'>form11</name><display_name>manage_payments</display_name><value>unchecked</value><type>form</type><status>active</status><last_updated>1432327708039</last_updated></user_preferences>','yes','online','Rohit',1432327708000),(128,'Updated','Selected create_bill form','form49','user_preferences','update',97,'<user_preferences><id>97</id><name unique=\'yes\'>form12</name><display_name>create_bill</display_name><value>unchecked</value><type>form</type><status>active</status><last_updated>1432327708030</last_updated></user_preferences>','yes','online','Rohit',1432327708000),(129,'Updated','Selected create_service_bills form','form49','user_preferences','update',95,'<user_preferences><id>95</id><name unique=\'yes\'>form10</name><display_name>create_service_bills</display_name><value>unchecked</value><type>form</type><status>active</status><last_updated>1432327708047</last_updated></user_preferences>','yes','online','Rohit',1432327708000),(130,'Updated','Selected create_pamphlet form','form49','user_preferences','update',91,'<user_preferences><id>91</id><name unique=\'yes\'>form2</name><display_name>create_pamphlet</display_name><value>unchecked</value><type>form</type><status>active</status><last_updated>1432327708075</last_updated></user_preferences>','yes','online','Rohit',1432327708000),(131,'Updated','Selected update_inventory form','form49','user_preferences','update',90,'<user_preferences><id>90</id><name unique=\'yes\'>form1</name><display_name>update_inventory</display_name><value>checked</value><type>form</type><status>active</status><last_updated>1432327708080</last_updated></user_preferences>','yes','online','Rohit',1432327708000),(132,'Updated','Selected manage_assets form','form49','user_preferences','update',92,'<user_preferences><id>92</id><name unique=\'yes\'>form5</name><display_name>manage_assets</display_name><value>unchecked</value><type>form</type><status>active</status><last_updated>1432327708068</last_updated></user_preferences>','yes','online','Rohit',1432327708000),(133,'Updated','Selected attendance form','form49','user_preferences','update',93,'<user_preferences><id>93</id><name unique=\'yes\'>form7</name><display_name>attendance</display_name><value>checked</value><type>form</type><status>active</status><last_updated>1432327708061</last_updated></user_preferences>','yes','online','Rohit',1432327708000),(134,'Updated','Selected manage_staff form','form49','user_preferences','update',94,'<user_preferences><id>94</id><name unique=\'yes\'>form8</name><display_name>manage_staff</display_name><value>checked</value><type>form</type><status>active</status><last_updated>1432327708053</last_updated></user_preferences>','yes','online','Rohit',1432327708000),(135,'Updated','Selected pricing_update_report report for display','form48','user_preferences','update',89,'<user_preferences><id>89</id><name unique=\'yes\'>report65</name><display_name>pricing_update_report</display_name><value>checked</value><type>report</type><status>active</status><last_updated>1432327932136</last_updated></user_preferences>','yes','online','Rohit',1432327932000),(136,'Updated','Selected packing_instructions report for display','form48','user_preferences','update',88,'<user_preferences><id>88</id><name unique=\'yes\'>report64</name><display_name>packing_instructions</display_name><value>checked</value><type>report</type><status>active</status><last_updated>1432327932149</last_updated></user_preferences>','yes','online','Rohit',1432327932000),(137,'Updated','Selected item_picklist report for display','form48','user_preferences','update',87,'<user_preferences><id>87</id><name unique=\'yes\'>report63</name><display_name>item_picklist</display_name><value>checked</value><type>report</type><status>active</status><last_updated>1432327932159</last_updated></user_preferences>','yes','online','Rohit',1432327932000),(138,'Updated','Selected ledger report for display','form48','user_preferences','update',83,'<user_preferences><id>83</id><name unique=\'yes\'>report58</name><display_name>ledger</display_name><value>unchecked</value><type>report</type><status>active</status><last_updated>1432327932185</last_updated></user_preferences>','yes','online','Rohit',1432327932000),(139,'Updated','Selected expiring_inventory report for display','form48','user_preferences','update',85,'<user_preferences><id>85</id><name unique=\'yes\'>report61</name><display_name>expiring_inventory</display_name><value>checked</value><type>report</type><status>active</status><last_updated>1432327932173</last_updated></user_preferences>','yes','online','Rohit',1432327932000),(140,'Updated','Selected subscription_status report for display','form48','user_preferences','update',82,'<user_preferences><id>82</id><name unique=\'yes\'>report57</name><display_name>subscription_status</display_name><value>unchecked</value><type>report</type><status>active</status><last_updated>1432327932191</last_updated></user_preferences>','yes','online','Rohit',1432327932000),(141,'Updated','Selected worst_days_by_sales report for display','form48','user_preferences','update',80,'<user_preferences><id>80</id><name unique=\'yes\'>report55</name><display_name>worst_days_by_sales</display_name><value>unchecked</value><type>report</type><status>active</status><last_updated>1432327932202</last_updated></user_preferences>','yes','online','Rohit',1432327932000),(142,'Updated','Selected sales_tax report for display','form48','user_preferences','update',78,'<user_preferences><id>78</id><name unique=\'yes\'>report53</name><display_name>sales_tax</display_name><value>unchecked</value><type>report</type><status>active</status><last_updated>1432327932212</last_updated></user_preferences>','yes','online','Rohit',1432327932000),(143,'Updated','Selected inventory_prediction report for display','form48','user_preferences','update',86,'<user_preferences><id>86</id><name unique=\'yes\'>report62</name><display_name>inventory_prediction</display_name><value>checked</value><type>report</type><status>active</status><last_updated>1432327932165</last_updated></user_preferences>','yes','online','Rohit',1432327932000),(144,'Updated','Selected dead_items report for display','form48','user_preferences','update',76,'<user_preferences><id>76</id><name unique=\'yes\'>report51</name><display_name>dead_items</display_name><value>unchecked</value><type>report</type><status>active</status><last_updated>1432327932223</last_updated></user_preferences>','yes','online','Rohit',1432327932000),(145,'Updated','Selected margin_by_products report for display','form48','user_preferences','update',75,'<user_preferences><id>75</id><name unique=\'yes\'>report50</name><display_name>margin_by_products</display_name><value>unchecked</value><type>report</type><status>active</status><last_updated>1432327932227</last_updated></user_preferences>','yes','online','Rohit',1432327932000),(146,'Updated','Selected resource_analysis report for display','form48','user_preferences','update',74,'<user_preferences><id>74</id><name unique=\'yes\'>report48</name><display_name>resource_analysis</display_name><value>unchecked</value><type>report</type><status>active</status><last_updated>1432327932232</last_updated></user_preferences>','yes','online','Rohit',1432327932000),(147,'Updated','Selected best_days_by_sales report for display','form48','user_preferences','update',79,'<user_preferences><id>79</id><name unique=\'yes\'>report54</name><display_name>best_days_by_sales</display_name><value>unchecked</value><type>report</type><status>active</status><last_updated>1432327932207</last_updated></user_preferences>','yes','online','Rohit',1432327933000),(148,'Updated','Selected supplier_account_balance report for display','form48','user_preferences','update',72,'<user_preferences><id>72</id><name unique=\'yes\'>report46</name><display_name>supplier_account_balance</display_name><value>unchecked</value><type>report</type><status>active</status><last_updated>1432327932241</last_updated></user_preferences>','yes','online','Rohit',1432327933000),(149,'Updated','Selected trial_balance report for display','form48','user_preferences','update',84,'<user_preferences><id>84</id><name unique=\'yes\'>report60</name><display_name>trial_balance</display_name><value>unchecked</value><type>report</type><status>active</status><last_updated>1432327932179</last_updated></user_preferences>','yes','online','Rohit',1432327933000),(150,'Updated','Selected product_purchase_report report for display','form48','user_preferences','update',77,'<user_preferences><id>77</id><name unique=\'yes\'>report52</name><display_name>product_purchase_report</display_name><value>checked</value><type>report</type><status>active</status><last_updated>1432327932218</last_updated></user_preferences>','yes','online','Rohit',1432327933000),(151,'Updated','Selected inventory_value report for display','form48','user_preferences','update',73,'<user_preferences><id>73</id><name unique=\'yes\'>report47</name><display_name>inventory_value</display_name><value>unchecked</value><type>report</type><status>active</status><last_updated>1432327932236</last_updated></user_preferences>','yes','online','Rohit',1432327933000),(152,'Updated','Selected virtual_store report for display','form48','user_preferences','update',71,'<user_preferences><id>71</id><name unique=\'yes\'>report45</name><display_name>virtual_store</display_name><value>unchecked</value><type>report</type><status>active</status><last_updated>1432327932245</last_updated></user_preferences>','yes','online','Rohit',1432327933000),(153,'Updated','Selected compare_products report for display','form48','user_preferences','update',70,'<user_preferences><id>70</id><name unique=\'yes\'>report44</name><display_name>compare_products</display_name><value>unchecked</value><type>report</type><status>active</status><last_updated>1432327932249</last_updated></user_preferences>','yes','online','Rohit',1432327933000),(154,'Updated','Selected feedback report for display','form48','user_preferences','update',68,'<user_preferences><id>68</id><name unique=\'yes\'>report42</name><display_name>feedback</display_name><value>unchecked</value><type>report</type><status>active</status><last_updated>1432327932258</last_updated></user_preferences>','yes','online','Rohit',1432327933000),(155,'Updated','Selected sales_by_services report for display','form48','user_preferences','update',65,'<user_preferences><id>65</id><name unique=\'yes\'>report39</name><display_name>sales_by_services</display_name><value>unchecked</value><type>report</type><status>active</status><last_updated>1432327932270</last_updated></user_preferences>','yes','online','Rohit',1432327933000),(156,'Updated','Selected customer_behaviour report for display','form48','user_preferences','update',69,'<user_preferences><id>69</id><name unique=\'yes\'>report43</name><display_name>customer_behaviour</display_name><value>unchecked</value><type>report</type><status>active</status><last_updated>1432327932254</last_updated></user_preferences>','yes','online','Rohit',1432327933000),(157,'Updated','Selected surplus_inventory report for display','form48','user_preferences','update',66,'<user_preferences><id>66</id><name unique=\'yes\'>report40</name><display_name>surplus_inventory</display_name><value>unchecked</value><type>report</type><status>active</status><last_updated>1432327932266</last_updated></user_preferences>','yes','online','Rohit',1432327933000),(158,'Updated','Selected service_requests_report report for display','form48','user_preferences','update',81,'<user_preferences><id>81</id><name unique=\'yes\'>report56</name><display_name>service_requests_report</display_name><value>unchecked</value><type>report</type><status>active</status><last_updated>1432327932196</last_updated></user_preferences>','yes','online','Rohit',1432327933000),(159,'Updated','Selected service_pre-requisites report for display','form48','user_preferences','update',67,'<user_preferences><id>67</id><name unique=\'yes\'>report41</name><display_name>service_pre-requisites</display_name><value>unchecked</value><type>report</type><status>active</status><last_updated>1432327932262</last_updated></user_preferences>','yes','online','Rohit',1432327933000),(160,'Updated','Selected sales_by_products report for display','form48','user_preferences','update',64,'<user_preferences><id>64</id><name unique=\'yes\'>report38</name><display_name>sales_by_products</display_name><value>unchecked</value><type>report</type><status>active</status><last_updated>1432327979169</last_updated></user_preferences>','yes','online','Rohit',1432327979000),(161,'Updated','Selected payments_due_to_suppliers report for display','form48','user_preferences','update',63,'<user_preferences><id>63</id><name unique=\'yes\'>report37</name><display_name>payments_due_to_suppliers</display_name><value>unchecked</value><type>report</type><status>active</status><last_updated>1432327979180</last_updated></user_preferences>','yes','online','Rohit',1432327979000),(162,'Updated','Selected customer_map_by_products report for display','form48','user_preferences','update',61,'<user_preferences><id>61</id><name unique=\'yes\'>report35</name><display_name>customer_map_by_products</display_name><value>unchecked</value><type>report</type><status>active</status><last_updated>1432327979199</last_updated></user_preferences>','yes','online','Rohit',1432327979000),(163,'Updated','Selected staff_map report for display','form48','user_preferences','update',58,'<user_preferences><id>58</id><name unique=\'yes\'>report32</name><display_name>staff_map</display_name><value>unchecked</value><type>report</type><status>active</status><last_updated>1432327979224</last_updated></user_preferences>','yes','online','Rohit',1432327979000),(164,'Updated','Selected effective_margin report for display','form48','user_preferences','update',60,'<user_preferences><id>60</id><name unique=\'yes\'>report34</name><display_name>effective_margin</display_name><value>unchecked</value><type>report</type><status>active</status><last_updated>1432327979208</last_updated></user_preferences>','yes','online','Rohit',1432327979000),(165,'Updated','Selected customer_map_by_credit report for display','form48','user_preferences','update',57,'<user_preferences><id>57</id><name unique=\'yes\'>report31</name><display_name>customer_map_by_credit</display_name><value>unchecked</value><type>report</type><status>active</status><last_updated>1432327979229</last_updated></user_preferences>','yes','online','Rohit',1432327979000),(166,'Updated','Selected supplier_map_by_products report for display','form48','user_preferences','update',62,'<user_preferences><id>62</id><name unique=\'yes\'>report36</name><display_name>supplier_map_by_products</display_name><value>unchecked</value><type>report</type><status>active</status><last_updated>1432327979190</last_updated></user_preferences>','yes','online','Rohit',1432327979000),(167,'Updated','Selected supplier_map_by_debit report for display','form48','user_preferences','update',59,'<user_preferences><id>59</id><name unique=\'yes\'>report33</name><display_name>supplier_map_by_debit</display_name><value>unchecked</value><type>report</type><status>active</status><last_updated>1432327979217</last_updated></user_preferences>','yes','online','Rohit',1432327979000),(168,'Updated','Selected product_pre-requisites report for display','form48','user_preferences','update',55,'<user_preferences><id>55</id><name unique=\'yes\'>report29</name><display_name>product_pre-requisites</display_name><value>unchecked</value><type>report</type><status>active</status><last_updated>1432327979240</last_updated></user_preferences>','yes','online','Rohit',1432327979000),(169,'Updated','Selected tasks_performed report for display','form48','user_preferences','update',56,'<user_preferences><id>56</id><name unique=\'yes\'>report30</name><display_name>tasks_performed</display_name><value>unchecked</value><type>report</type><status>active</status><last_updated>1432327979234</last_updated></user_preferences>','yes','online','Rohit',1432327979000),(170,'Updated','Selected short_inventory report for display','form48','user_preferences','update',54,'<user_preferences><id>54</id><name unique=\'yes\'>report28</name><display_name>short_inventory</display_name><value>unchecked</value><type>report</type><status>active</status><last_updated>1432327979250</last_updated></user_preferences>','yes','online','Rohit',1432327979000),(171,'Updated','Selected staff_performance report for display','form48','user_preferences','update',51,'<user_preferences><id>51</id><name unique=\'yes\'>report17</name><display_name>staff_performance</display_name><value>unchecked</value><type>report</type><status>active</status><last_updated>1432327979264</last_updated></user_preferences>','yes','online','Rohit',1432327979000),(172,'Updated','Selected expiring_inventory report for display','form48','user_preferences','update',53,'<user_preferences><id>53</id><name unique=\'yes\'>report27</name><display_name>expiring_inventory</display_name><value>unchecked</value><type>report</type><status>active</status><last_updated>1432327979256</last_updated></user_preferences>','yes','online','Rohit',1432327980000),(173,'Updated','Selected product_sales_report report for display','form48','user_preferences','update',48,'<user_preferences><id>48</id><name unique=\'yes\'>report9</name><display_name>product_sales_report</display_name><value>checked</value><type>report</type><status>active</status><last_updated>1432327979277</last_updated></user_preferences>','yes','online','Rohit',1432327980000),(174,'Updated','Selected payments_due_from_customers report for display','form48','user_preferences','update',47,'<user_preferences><id>47</id><name unique=\'yes\'>report6</name><display_name>payments_due_from_customers</display_name><value>unchecked</value><type>report</type><status>active</status><last_updated>1432327979281</last_updated></user_preferences>','yes','online','Rohit',1432327980000),(175,'Updated','Selected sales_by_customers report for display','form48','user_preferences','update',52,'<user_preferences><id>52</id><name unique=\'yes\'>report26</name><display_name>sales_by_customers</display_name><value>unchecked</value><type>report</type><status>active</status><last_updated>1432327979260</last_updated></user_preferences>','yes','online','Rohit',1432327980000),(176,'Updated','Selected financial_summary report for display','form48','user_preferences','update',50,'<user_preferences><id>50</id><name unique=\'yes\'>report15</name><display_name>financial_summary</display_name><value>unchecked</value><type>report</type><status>active</status><last_updated>1432327979269</last_updated></user_preferences>','yes','online','Rohit',1432327980000),(177,'Updated','Selected customer_account_balance report for display','form48','user_preferences','update',46,'<user_preferences><id>46</id><name unique=\'yes\'>report5</name><display_name>customer_account_balance</display_name><value>unchecked</value><type>report</type><status>active</status><last_updated>1432327979285</last_updated></user_preferences>','yes','online','Rohit',1432327980000),(178,'Updated','Selected expenses_by_period report for display','form48','user_preferences','update',49,'<user_preferences><id>49</id><name unique=\'yes\'>report14</name><display_name>expenses_by_period</display_name><value>unchecked</value><type>report</type><status>active</status><last_updated>1432327979273</last_updated></user_preferences>','yes','online','Rohit',1432327980000),(179,'Updated','Selected modes_of_payment report for display','form48','user_preferences','update',45,'<user_preferences><id>45</id><name unique=\'yes\'>report4</name><display_name>modes_of_payment</display_name><value>unchecked</value><type>report</type><status>active</status><last_updated>1432327979290</last_updated></user_preferences>','yes','online','Rohit',1432327980000),(180,'Updated','Selected signage_changes report for display','form48','user_preferences','update',44,'<user_preferences><id>44</id><name unique=\'yes\'>report1</name><display_name>signage_changes</display_name><value>unchecked</value><type>report</type><status>active</status><last_updated>1432327979294</last_updated></user_preferences>','yes','online','Rohit',1432327980000),(181,'Updated','Selected compare_products report for display','form48','user_preferences','update',70,'<user_preferences><id>70</id><name unique=\'yes\'>report44</name><display_name>compare_products</display_name><value>checked</value><type>report</type><status>active</status><last_updated>1432327992880</last_updated></user_preferences>','yes','online','Rohit',1432327992000),(182,'Updated','System setting for official_address','form46','user_preferences','update',22,'<user_preferences><id>22</id><name>address</name><display_name>official_address</display_name><value>Okhla</value><type>other</type><status>active</status><last_updated>1432328101539</last_updated></user_preferences>','yes','online','Rohit',1432328101000),(183,'Updated','System setting for email','form46','user_preferences','update',29,'<user_preferences><id>29</id><name>email</name><display_name>email</display_name><value>contact@riseconsulting.com</value><type>other</type><status>active</status><last_updated>1432328128701</last_updated></user_preferences>','yes','online','Rohit',1432328128000),(184,'Updated','System setting for business_title','form46','user_preferences','update',31,'<user_preferences><id>31</id><name>title</name><display_name>business_title</display_name><value>Nikki overseas</value><type>other</type><status>active</status><last_updated>1432356474436</last_updated></user_preferences>','yes','online','Rohit',1432356474000),(185,'Updated','Selected manage_sale_orders form','form49','user_preferences','update',133,'<user_preferences><id>133</id><name unique=\'yes\'>form70</name><display_name>manage_sale_orders</display_name><value>unchecked</value><type>form</type><status>active</status><last_updated>1432356519189</last_updated></user_preferences>','yes','online','Rohit',1432356519000),(186,'Updated','Selected scan_items form','form49','user_preferences','update',144,'<user_preferences><id>144</id><name unique=\'yes\'>form82</name><display_name>scan_items</display_name><value>unchecked</value><type>form</type><status>active</status><last_updated>1432356591424</last_updated></user_preferences>','yes','online','Rohit',1432356591000),(187,'Updated','Selected manage_accounts form','form49','user_preferences','update',134,'<user_preferences><id>134</id><name unique=\'yes\'>form71</name><display_name>manage_accounts</display_name><value>unchecked</value><type>form</type><status>active</status><last_updated>1432356607738</last_updated></user_preferences>','yes','online','Rohit',1432356607000),(188,'Updated','Selected create_sale_order form','form49','user_preferences','update',132,'<user_preferences><id>132</id><name unique=\'yes\'>form69</name><display_name>create_sale_order</display_name><value>checked</value><type>form</type><status>active</status><last_updated>1432357937389</last_updated></user_preferences>','yes','online','Rohit',1432357937000),(189,'Added','Product Product 1 to inventory','form39','product_master','create',1432357993955717,'<product_master><id>1432357993955717</id><make>Make1</make><name>Product 1</name><description>Some product</description><tax>13.125</tax><bar_code unique=\'yes\'>1432357974166</bar_code><last_updated>1432357993955</last_updated></product_master>','yes','online','Rohit',1432357993000),(190,'Added','New batch Batch1 for product Product 1','form1','product_instances','create',1432358018517676,'<product_instances><id>1432358018517676</id><product_name>Product 1</product_name><batch>Batch1</batch><expiry>1435602600000</expiry><manufacture_date>1430418600000</manufacture_date><mrp>100</mrp><cost_price>90</cost_price><sale_price>98</sale_price><last_updated>1432358018517</last_updated></product_instances>','yes','online','Rohit',1432358018000),(191,'Updated','Inventory for batch number Batch1 of Product 1','form1','product_instances','update',1432358018517676,'<product_instances><id>1432358018517676</id><product_name>Product 1</product_name><batch>Batch1</batch><expiry>1435602600000</expiry><cost_price>90.00</cost_price><last_updated>1432358025832</last_updated></product_instances>','yes','online','Rohit',1432358025000),(192,'Added','Billing type Snapdeal','form90','bill_types','create',1432358034629682,'<bill_types><id>1432358034629682</id><name unique=\'yes\'>Snapdeal</name><notes></notes><status>active</status><last_updated>1432358038594</last_updated></bill_types>','yes','online','Rohit',1432358038000),(193,'Added','Billing type Retail','form90','bill_types','create',1432358040417157,'<bill_types><id>1432358040417157</id><name unique=\'yes\'>Retail</name><notes></notes><status>active</status><last_updated>1432358044578</last_updated></bill_types>','yes','online','Rohit',1432358044000),(194,'Saved','Bill no 1','form92','bills','create',1432369218527401,'<bills><id>1432369218527401</id><bill_num>1</bill_num><customer_name>cash bill</customer_name><bill_date>1432319400000</bill_date><amount>98</amount><total>111</total><type>product</type><billing_type>Retail</billing_type><offer></offer><discount>0</discount><tax>12.8625</tax><transaction_id>1432369218527401</transaction_id><last_updated>1432369235376</last_updated></bills>','yes','online','Rohit',1432369235000),(195,'Updated','Payment of 111 from cash bill','form11','payments','update',1432369235402366,'<payments><id>1432369235402366</id><acc_name>cash bill</acc_name><type>received</type><total_amount>111</total_amount><paid_amount>111</paid_amount><status>closed</status><due_date>1434911400000</due_date><mode>cash</mode><last_updated>1432369237424</last_updated></payments>','yes','online','Rohit',1432369237000),(196,'Added','Supplier supplier1','form40','suppliers','create',1432371075431282,'<suppliers><id>1432371075431282</id><name>supplier1</name><phone></phone><email></email><notes></notes><acc_name unique=\'yes\'>supplier1 ()</acc_name><address></address><pincode></pincode><city></city><state></state><country></country><address_status>pending analysis</address_status><last_updated>1432371075431</last_updated></suppliers>','yes','online','Rohit',1432371075000),(197,'Updated','Selected mandatory_attributes form','form49','user_preferences','update',182,'<user_preferences><id>182</id><name unique=\'yes\'>form123</name><display_name>mandatory_attributes</display_name><value>checked</value><type>form</type><status>active</status><last_updated>1432622684860</last_updated></user_preferences>','yes','online','Rohit',1432622684000),(198,'Added','Mandatory attribute Billing address for staff','form123','mandatory_attributes','create',1432656217671657,'<mandatory_attributes><id>1432656217671657</id><object>staff</object><attribute>Billing address</attribute><value></value><status>active</status><last_updated>1432656232224</last_updated></mandatory_attributes>','yes','online','Rohit',1432656232000),(199,'Added','Mandatory attribute Id proof for staff','form123','mandatory_attributes','create',1432656523246889,'<mandatory_attributes><id>1432656523246889</id><object>staff</object><attribute>Id proof</attribute><value>license;PAN;Voter ID;Adhar</value><status>active</status><last_updated>1432656567283</last_updated></mandatory_attributes>','yes','online','Rohit',1432656567000),(1432657769198,'Deleted','Mandatory attribute Id proof for staff','form123','mandatory_attributes','delete',1432656523246889,'<mandatory_attributes><id>1432656523246889</id></mandatory_attributes>','yes','online','Rohit',1432657769000),(1432657770589,'Deleted','Mandatory attribute Billing address for staff','form123','mandatory_attributes','delete',1432656217671657,'<mandatory_attributes><id>1432656217671657</id></mandatory_attributes>','yes','online','Rohit',1432657770000),(1432657770590,'Added','Mandatory attribute company email for staff','form123','mandatory_attributes','create',1432658058502248,'<mandatory_attributes><id>1432658058502248</id><object>staff</object><attribute>company email</attribute><value></value><status>active</status><last_updated>1432658081283</last_updated></mandatory_attributes>','yes','online','Rohit',1432658081000),(1432657770591,'Added','Mandatory attribute personal email for staff','form123','mandatory_attributes','create',1432658082820163,'<mandatory_attributes><id>1432658082820163</id><object>staff</object><attribute>personal email</attribute><value></value><status>active</status><last_updated>1432658094211</last_updated></mandatory_attributes>','yes','online','Rohit',1432658094000),(1432657770592,'Added','Mandatory attribute Educational Background for staff','form123','mandatory_attributes','create',1432658099662427,'<mandatory_attributes><id>1432658099662427</id><object>staff</object><attribute>Educational Background</attribute><value></value><status>active</status><last_updated>1432658132493</last_updated></mandatory_attributes>','yes','online','Rohit',1432658132000),(1432657770593,'Added','Mandatory attribute Id proof for staff','form123','mandatory_attributes','create',1432658139747113,'<mandatory_attributes><id>1432658139747113</id><object>staff</object><attribute>Id proof</attribute><value>License;Adhar;Voter Id;PAN;Passport</value><status>required</status><last_updated>1432658181461</last_updated></mandatory_attributes>','yes','online','Rohit',1432658181000),(1432657770594,'Added','Mandatory attribute Designation for staff','form123','mandatory_attributes','create',1432658187484490,'<mandatory_attributes><id>1432658187484490</id><object>staff</object><attribute>Designation</attribute><value></value><status>required</status><last_updated>1432658200852</last_updated></mandatory_attributes>','yes','online','Rohit',1432658200000),(1432657770595,'Added','Mandatory attribute Overtime Applicable for staff','form123','mandatory_attributes','create',1432658205746339,'<mandatory_attributes><id>1432658205746339</id><object>staff</object><attribute>Overtime Applicable</attribute><value></value><status>active</status><last_updated>1432658219335</last_updated></mandatory_attributes>','yes','online','Rohit',1432658219000),(1432658224783,'Deleted','Mandatory attribute personal email for staff','form123','mandatory_attributes','delete',1432658082820163,'<mandatory_attributes><id>1432658082820163</id></mandatory_attributes>','yes','online','Rohit',1432658224000),(1432658226259,'Deleted','Mandatory attribute company email for staff','form123','mandatory_attributes','delete',1432658058502248,'<mandatory_attributes><id>1432658058502248</id></mandatory_attributes>','yes','online','Rohit',1432658226000),(1432658226260,'Added','Mandatory attribute Billing Address for customer','form123','mandatory_attributes','create',1432658250884337,'<mandatory_attributes><id>1432658250884337</id><object>customer</object><attribute>Billing Address</attribute><value></value><status>active</status><last_updated>1432658396064</last_updated></mandatory_attributes>','yes','online','Rohit',1432658396000),(1432658411214,'Deleted','Mandatory attribute Billing Address for customer','form123','mandatory_attributes','delete',1432658250884337,'<mandatory_attributes><id>1432658250884337</id></mandatory_attributes>','yes','online','Rohit',1432658411000),(1432658411215,'Added','Mandatory attribute Shipping Address for customer','form123','mandatory_attributes','create',1432658397655957,'<mandatory_attributes><id>1432658397655957</id><object>customer</object><attribute>Shipping Address</attribute><value></value><status>active</status><last_updated>1432658420937</last_updated></mandatory_attributes>','yes','online','Rohit',1432658420000),(1432658411216,'Added','Mandatory attribute VAT# for customer','form123','mandatory_attributes','create',1432658425157074,'<mandatory_attributes><id>1432658425157074</id><object>customer</object><attribute>VAT#</attribute><value></value><status>active</status><last_updated>1432658433325</last_updated></mandatory_attributes>','yes','online','Rohit',1432658433000),(1432658411217,'Added','Mandatory attribute PAN# for customer','form123','mandatory_attributes','create',1432658435609655,'<mandatory_attributes><id>1432658435609655</id><object>customer</object><attribute>PAN#</attribute><value></value><status>active</status><last_updated>1432658444714</last_updated></mandatory_attributes>','yes','online','Rohit',1432658444000),(1432658411218,'Added','Mandatory attribute CST# for customer','form123','mandatory_attributes','create',1432658447456770,'<mandatory_attributes><id>1432658447456770</id><object>customer</object><attribute>CST#</attribute><value></value><status>active</status><last_updated>1432658458605</last_updated></mandatory_attributes>','yes','online','Rohit',1432658458000),(1432658411219,'Added','Mandatory attribute Alias for customer','form123','mandatory_attributes','create',1432658463028687,'<mandatory_attributes><id>1432658463028687</id><object>customer</object><attribute>Alias</attribute><value></value><status>active</status><last_updated>1432658470601</last_updated></mandatory_attributes>','yes','online','Rohit',1432658470000),(1432658411220,'Added','Mandatory attribute Shipping Address for supplier','form123','mandatory_attributes','create',1432658502128907,'<mandatory_attributes><id>1432658502128907</id><object>supplier</object><attribute>Shipping Address</attribute><value></value><status>active</status><last_updated>1432658512482</last_updated></mandatory_attributes>','yes','online','Rohit',1432658512000),(1432658411221,'Added','Mandatory attribute Alias for supplier','form123','mandatory_attributes','create',1432658519744430,'<mandatory_attributes><id>1432658519744430</id><object>supplier</object><attribute>Alias</attribute><value></value><status>active</status><last_updated>1432658532930</last_updated></mandatory_attributes>','yes','online','Rohit',1432658532000),(1432658411222,'Added','Mandatory attribute TIN# for supplier','form123','mandatory_attributes','create',1432658535040395,'<mandatory_attributes><id>1432658535040395</id><object>supplier</object><attribute>TIN#</attribute><value></value><status>active</status><last_updated>1432658586087</last_updated></mandatory_attributes>','yes','online','Rohit',1432658586000),(1432658411223,'Added','Mandatory attribute PAN# for supplier','form123','mandatory_attributes','create',1432658589830409,'<mandatory_attributes><id>1432658589830409</id><object>supplier</object><attribute>PAN#</attribute><value></value><status>active</status><last_updated>1432658599859</last_updated></mandatory_attributes>','yes','online','Rohit',1432658599000),(1432658411224,'Added','Mandatory attribute CST# for supplier','form123','mandatory_attributes','create',1432658607827364,'<mandatory_attributes><id>1432658607827364</id><object>supplier</object><attribute>CST#</attribute><value></value><status>active</status><last_updated>1432658614324</last_updated></mandatory_attributes>','yes','online','Rohit',1432658614000),(1432658411225,'Added','Mandatory attribute Bank Name for supplier','form123','mandatory_attributes','create',1432658623733222,'<mandatory_attributes><id>1432658623733222</id><object>supplier</object><attribute>Bank Name</attribute><value></value><status>active</status><last_updated>1432658636537</last_updated></mandatory_attributes>','yes','online','Rohit',1432658636000),(1432658411226,'Added','Mandatory attribute Bank Account # for supplier','form123','mandatory_attributes','create',1432658638691598,'<mandatory_attributes><id>1432658638691598</id><object>supplier</object><attribute>Bank Account #</attribute><value></value><status>active</status><last_updated>1432658650229</last_updated></mandatory_attributes>','yes','online','Rohit',1432658650000),(1432658411227,'Added','Mandatory attribute IFSC code for supplier','form123','mandatory_attributes','create',1432658652270137,'<mandatory_attributes><id>1432658652270137</id><object>supplier</object><attribute>IFSC code</attribute><value></value><status>active</status><last_updated>1432658663276</last_updated></mandatory_attributes>','yes','online','Rohit',1432658663000),(1432658411228,'Added','Staff Ashish Goyal','form8','staff','create',1432663619687011,'<staff><id>1432663619687011</id><name>Ashish Goyal</name><phone>9818005232</phone><email>ashish.19goyal@gmail.com</email><acc_name unique=\'yes\'>Ashish Goyal (9818005232)</acc_name><address>Gurgaon</address><pincode>122002</pincode><city>Gurgaon</city><state>Haryana</state><country>India</country><address_status>pending analysis</address_status><status>active</status><last_updated>1432663619687</last_updated></staff>','yes','online','Rohit',1432663619000),(1432658411229,'Added','Staff Anish Goyal','form8','staff','create',1432664496621619,'<staff><id>1432664496621619</id><name>Anish Goyal</name><phone>9818005232</phone><email>ashish.19goyal@gmail.com</email><acc_name unique=\'yes\'>Anish Goyal (9818005232)</acc_name><address>Gurgaon</address><pincode>122002</pincode><city>Gurgaon</city><state>Haryana</state><country>India</country><address_status>pending analysis</address_status><status>active</status><last_updated>1432664496621</last_updated></staff>','yes','online','Rohit',1432664496000),(1432658411230,'Added','New customer Customer x','form30','customers','create',1432667516204185,'<customers><id>1432667516204185</id><name>Customer x</name><phone>893243298</phone><email>assdl@dsklf</email><notes></notes><acc_name unique=\'yes\'>Customer x (893243298)</acc_name><status>active</status><address>ddwqdq</address><pincode>122002</pincode><city>Gurgaon</city><state>Haryana</state><country>India</country><address_status>pending analysis</address_status><last_updated>1432667516204</last_updated></customers>','yes','online','Rohit',1432667516000),(1432658411231,'Added','Supplier supplier y','form40','suppliers','create',1432669160113188,'<suppliers><id>1432669160113188</id><name>supplier y</name><phone>9324329</phone><email>aslkd@dsfs</email><notes>werwef</notes><acc_name unique=\'yes\'>supplier y (9324329)</acc_name><address>sdfd</address><pincode>122020</pincode><city>Gurgaon</city><state>Haryana</state><country>India</country><address_status>pending analysis</address_status><last_updated>1432669160113</last_updated></suppliers>','yes','online','Rohit',1432669160000),(1432658411232,'Updated','Contact details of supplier supplier y','form40','suppliers','update',1432669160113188,'<suppliers><id>1432669160113188</id><name>supplier y</name><phone>932432932</phone><email>aslkd@dsfs</email><last_updated>1432669214570</last_updated></suppliers>','yes','online','Rohit',1432669214000),(1432658411233,'Updated','Staff profile of Anish Goyal','form8','staff','update',1432664496621619,'<staff><id>1432664496621619</id><name>Anish Goyal</name><phone>9818005232</phone><email>ashish.19goyal@gmail.co.in</email><status>active</status><last_updated>1432670203536</last_updated></staff>','yes','online','Rohit',1432670203000),(1432658411234,'Added','Mandatory attribute Margin for supplier','form123','mandatory_attributes','create',1432736514240247,'<mandatory_attributes><id>1432736514240247</id><object>supplier</object><attribute>Margin</attribute><value></value><status>required</status><last_updated>1432736528422</last_updated></mandatory_attributes>','yes','online','Rohit',1432736528000),(1432658411235,'Updated','Selected mandatory_attributes form','form49','user_preferences','update',182,'<user_preferences><id>182</id><name unique=\'yes\'>form123</name><display_name>mandatory_attributes</display_name><value>checked</value><type>form</type><status>active</status><last_updated>1432736557980</last_updated></user_preferences>','yes','online','Rohit',1432736558000),(1432658411236,'Updated','Selected product_attributes form','form49','user_preferences','update',126,'<user_preferences><id>126</id><name unique=\'yes\'>form60</name><display_name>product_attributes</display_name><value>unchecked</value><type>form</type><status>active</status><last_updated>1432736557990</last_updated></user_preferences>','yes','online','Rohit',1432736558000),(1432658411237,'Updated','Selected customer_attributes form','form49','user_preferences','update',158,'<user_preferences><id>158</id><name unique=\'yes\'>form96</name><display_name>customer_attributes</display_name><value>checked</value><type>form</type><status>active</status><last_updated>1432736558007</last_updated></user_preferences>','yes','online','Rohit',1432736558000),(1432658411238,'Updated','Selected service_attributes form','form49','user_preferences','update',127,'<user_preferences><id>127</id><name unique=\'yes\'>form61</name><display_name>service_attributes</display_name><value>unchecked</value><type>form</type><status>active</status><last_updated>1432736557999</last_updated></user_preferences>','yes','online','Rohit',1432736558000),(1432658411239,'Updated','Selected asset_attributes form','form49','user_preferences','update',169,'<user_preferences><id>169</id><name unique=\'yes\'>form109</name><display_name>asset_attributes</display_name><value>unchecked</value><type>form</type><status>active</status><last_updated>1432736558027</last_updated></user_preferences>','yes','online','Rohit',1432736558000),(1432658411240,'Updated','Selected supplier_attributes form','form49','user_preferences','update',159,'<user_preferences><id>159</id><name unique=\'yes\'>form97</name><display_name>supplier_attributes</display_name><value>checked</value><type>form</type><status>active</status><last_updated>1432736558014</last_updated></user_preferences>','yes','online','Rohit',1432736558000),(1432658411241,'Updated','Selected staff_attributes form','form49','user_preferences','update',160,'<user_preferences><id>160</id><name unique=\'yes\'>form98</name><display_name>staff_attributes</display_name><value>checked</value><type>form</type><status>active</status><last_updated>1432736558021</last_updated></user_preferences>','yes','online','Rohit',1432736558000),(1432658411242,'Added','Attribute Margin for supplier supplier y (9324329)','form97','attributes','create',1432736756577186,'<attributes><id>1432736756577186</id><name>supplier y (9324329)</name><type>supplier</type><attribute>Margin</attribute><value>5</value><last_updated>1432736767840</last_updated></attributes>','yes','online','Rohit',1432736767000),(1432658411243,'Created','Purchase order # 2','form43','purchase_orders','create',1433166701462141,'<purchase_orders><id>1433166701462141</id><supplier>supplier y (9324329)</supplier><order_date>1433097000000</order_date><status>draft</status><order_num>2</order_num><last_updated>1433166713905</last_updated></purchase_orders>','yes','online','Rohit',1433166713000),(1432658411244,'Updated','System setting for business_intro','form46','user_preferences','update',28,'<user_preferences><id>28</id><name>business_intro</name><display_name>business_intro</display_name><value>Distributor and wholesaler</value><type>other</type><status>active</status><last_updated>1433188889769</last_updated></user_preferences>','yes','online','Rohit',1433188889000),(1432658411245,'Updated','System setting for website','form46','user_preferences','update',27,'<user_preferences><id>27</id><name>website</name><display_name>website</display_name><value>nikkioverseas.com</value><type>other</type><status>active</status><last_updated>1433188902713</last_updated></user_preferences>','yes','online','Rohit',1433188902000),(1432658411246,'Updated','System setting for business_title','form46','user_preferences','update',31,'<user_preferences><id>31</id><name>title</name><display_name>business_title</display_name><value>Nikki International</value><type>other</type><status>active</status><last_updated>1433189028727</last_updated></user_preferences>','yes','online','Rohit',1433189028000),(1432658411247,'Updated','System setting for email','form46','user_preferences','update',29,'<user_preferences><id>29</id><name>email</name><display_name>email</display_name><value>nikki_overseasqq@yahoo.co.in</value><type>other</type><status>active</status><last_updated>1433189057939</last_updated></user_preferences>','yes','online','Rohit',1433189057000),(1432658411248,'Updated','System setting for official_address','form46','user_preferences','update',22,'<user_preferences><id>22</id><name>address</name><display_name>official_address</display_name><value>Z-71, 1st floor, Okhla industrial area Phase-II, New Delhi-110020</value><type>other</type><status>active</status><last_updated>1433189117851</last_updated></user_preferences>','yes','online','Rohit',1433189117000),(1432658411249,'Updated','System setting for phone_no','form46','user_preferences','update',26,'<user_preferences><id>26</id><name>phone</name><display_name>phone_no</display_name><value>+91-9310492780</value><type>other</type><status>active</status><last_updated>1433189141585</last_updated></user_preferences>','yes','online','Rohit',1433189141000),(1432658411250,'Updated','TIN # accounting property','form50','user_preferences','update',7,'<user_preferences><id>7</id><name>tin</name><display_name>TIN #</display_name><value>07680252201</value><type>accounting</type><status>active</status><last_updated>1433189335857</last_updated></user_preferences>','yes','online','Rohit',1433189335000),(1432658411251,'Updated','VAT # accounting property','form50','user_preferences','update',8,'<user_preferences><id>8</id><name>vat</name><display_name>VAT #</display_name><value>07680252201</value><type>accounting</type><status>active</status><last_updated>1433189347538</last_updated></user_preferences>','yes','online','Rohit',1433189347000),(1432658411252,'Updated','System setting for print_size','form46','user_preferences','update',23,'<user_preferences><id>23</id><name>print_size</name><display_name>print_size</display_name><value>.8</value><type>other</type><status>active</status><last_updated>1433189997247</last_updated></user_preferences>','yes','online','Rohit',1433189997000),(1432658411253,'Updated','System setting for bill_message','form46','user_preferences','update',16,'<user_preferences><id>16</id><name>bill_message</name><display_name>bill_message</display_name><value>1. Goods once sold will not be taken back.\n2. Interest @ 18% p.a. will be charged if the payment is not made within the stipulated time.\n3. Subject to Delhi Jurisdiction only.</value><type>other</type><status>active</status><last_updated>1433190398963</last_updated></user_preferences>','yes','online','Rohit',1433190399000),(1432658411254,'Added','Store area Warehouse 1','form83','store_areas','create',1433230929772399,'<store_areas><id>1433230929772399</id><name unique=\'yes\'>Warehouse 1</name><owner>Ashish Goyal (9818005232)</owner><area_type>store</area_type><last_updated>1433230929772</last_updated></store_areas>','yes','online','Rohit',1433230929000),(1432658411255,'Added','Store area Warehouse 2','form83','store_areas','create',1433230945153639,'<store_areas><id>1433230945153639</id><name unique=\'yes\'>Warehouse 2</name><owner></owner><area_type>store</area_type><last_updated>1433230945153</last_updated></store_areas>','yes','online','Rohit',1433230945000),(1432658411256,'Added','Storage type of Warehouse to structure','form167','storage_structure','create',1433266173370957,'<storage_structure><id>1433266173370957</id><name>Warehouse</name><parent></parent><length>120</length><breadth>100</breadth><height>10</height><unit>m</unit><last_updated>1433266190141</last_updated></storage_structure>','yes','online','Rohit',1433266190000),(1432658411257,'Added','Storage type of Rack to structure','form167','storage_structure','create',1433266192101962,'<storage_structure><id>1433266192101962</id><name>Rack</name><parent>Warehouse</parent><length>10</length><breadth>100</breadth><height>10</height><unit>m</unit><last_updated>1433266210202</last_updated></storage_structure>','yes','online','Rohit',1433266210000),(1432658411258,'Added','Storage type of Row to structure','form167','storage_structure','create',1433266216180992,'<storage_structure><id>1433266216180992</id><name>Row</name><parent>Warehouse</parent><length>10</length><breadth>100</breadth><height>10</height><unit>m</unit><last_updated>1433266237081</last_updated></storage_structure>','yes','online','Rohit',1433266237000),(1433266238154,'Removed','Storage type of Rack from structure','form167','storage_structure','delete',1433266192101962,'<storage_structure><id>1433266192101962</id></storage_structure>','yes','online','Rohit',1433266238000),(1433266238155,'Added','Storage type of Rack to structure','form167','storage_structure','create',1433266240459085,'<storage_structure><id>1433266240459085</id><name>Rack</name><parent>Row</parent><length>10</length><breadth>10</breadth><height>10</height><unit>m</unit><last_updated>1433266250859</last_updated></storage_structure>','yes','online','Rohit',1433266250000),(1433266238156,'Updated','Storage type of Rack structure','form167','storage_structure','update',1433266240459085,'<storage_structure><id>1433266240459085</id><name>Rack</name><parent>Row</parent><length>10</length><breadth>15</breadth><height>10.0000</height><unit>m</unit><last_updated>1433266553166</last_updated></storage_structure>','yes','online','Rohit',1433266553000),(1433266238157,'Updated','Selected storage_areas form','form49','user_preferences','update',145,'<user_preferences><id>145</id><name unique=\'yes\'>form83</name><display_name>storage_areas</display_name><value>unchecked</value><type>form</type><status>active</status><last_updated>1433273097275</last_updated></user_preferences>','yes','online','Rohit',1433273097000),(1433266238158,'Updated','Selected store_areas_nikki form','form49','user_preferences','update',1432358040417164,'<user_preferences><id>1432358040417164</id><name unique=\'yes\'>form170</name><display_name>store_areas_nikki</display_name><value>checked</value><type>form</type><status>active</status><last_updated>1433273206991</last_updated></user_preferences>','yes','online','Rohit',1433273207000),(1433273780279,'Deleted','Storage area Warehouse 1','form170','store_areas','delete',1433230929772399,'<store_areas><id>1433230929772399</id><name>Warehouse 1</name></store_areas>','yes','online','Rohit',1433273780000),(1433273780280,'Added','Storage area Warehouse 1','form170','store_areas','create',1433274059218281,'<store_areas><id>1433274059218281</id><name unique=\'yes\'>Warehouse 1</name><owner>Ashish Goyal (9818005232)</owner><area_type>Warehouse</area_type><parent></parent><length>120</length><breadth>100.0000</breadth><height>10.0000</height><unit>m</unit><last_updated>1433274059219</last_updated></store_areas>','yes','online','Rohit',1433274059000),(1433273780281,'Added','Storage area Row 1','form170','store_areas','create',1433274077643574,'<store_areas><id>1433274077643574</id><name unique=\'yes\'>Row 1</name><owner>Ashish Goyal (9818005232)</owner><area_type>Row</area_type><parent>Warehouse 1</parent><length>10</length><breadth>100.0000</breadth><height>10.0000</height><unit>m</unit><last_updated>1433274077643</last_updated></store_areas>','yes','online','Rohit',1433274077000),(1433273780282,'Updated','Selected store_movement form','form49','user_preferences','update',201,'<user_preferences><id>201</id><name unique=\'yes\'>form145</name><display_name>store_movement</display_name><value>unchecked</value><type>form</type><status>active</status><last_updated>1433274396898</last_updated></user_preferences>','yes','online','Rohit',1433274396000),(1433273780283,'Updated','Selected store_movement form','form49','user_preferences','update',201,'<user_preferences><id>201</id><name unique=\'yes\'>form145</name><display_name>store_movement</display_name><value>checked</value><type>form</type><status>active</status><last_updated>1433315897683</last_updated></user_preferences>','yes','online','Rohit',1433315897000),(1433273780284,'Updated','Selected store_placement form','form49','user_preferences','update',107,'<user_preferences><id>107</id><name unique=\'yes\'>form38</name><display_name>store_placement</display_name><value>unchecked</value><type>form</type><status>active</status><last_updated>1433315913432</last_updated></user_preferences>','yes','online','Rohit',1433315913000),(1433316645188,'Deleted','Storage area Warehouse 2','form170','store_areas','delete',1433230945153639,'<store_areas><id>1433230945153639</id><name>Warehouse 2</name></store_areas>','yes','online','Rohit',1433316645000),(1433316645189,'Updated','System setting for po_message','form46','user_preferences','update',1432358040417162,'<user_preferences><id>1432358040417162</id><name>po_message</name><display_name>po_message</display_name><value>T.B.D</value><type>other</type><status>active</status><last_updated>1433316714936</last_updated></user_preferences>','yes','online','Rohit',1433316714000),(1433316645190,'Added','Storage area Rack1','form170','store_areas','create',1433317366836815,'<store_areas><id>1433317366836815</id><name unique=\'yes\'>Rack1</name><owner>Ashish Goyal (9818005232)</owner><area_type>Rack</area_type><parent>Row 1</parent><length>10</length><breadth>15.0000</breadth><height>10.0000</height><unit>m</unit><last_updated>1433317366837</last_updated></store_areas>','yes','online','Rohit',1433317366000),(1433316645191,'Added','Storage area Rack 2','form170','store_areas','create',1433317380274622,'<store_areas><id>1433317380274622</id><name unique=\'yes\'>Rack 2</name><owner>Ashish Goyal (9818005232)</owner><area_type>Rack</area_type><parent>Row 1</parent><length>10</length><breadth>15.0000</breadth><height>10.0000</height><unit>m</unit><last_updated>1433317380274</last_updated></store_areas>','yes','online','Rohit',1433317380000),(1433316645192,'Updated','Storage Rack 2','form170','store_areas','update',1433317380274622,'<store_areas><id>1433317380274622</id><owner>Rohit (9818005232)</owner><parent>Row 1</parent><area_type>Rack</area_type><length>10</length><breadth>15.0000</breadth><height>10.0000</height><last_updated>1433317484637</last_updated></store_areas>','yes','online','Rohit',1433317484000),(1433316645193,'Updated','Storage Rack1','form170','store_areas','update',1433317366836815,'<store_areas><id>1433317366836815</id><owner>Rohit (9818005232)</owner><parent>Row 1</parent><area_type>Rack</area_type><length>10</length><breadth>15.0000</breadth><height>10.0000</height><last_updated>1433317497921</last_updated></store_areas>','yes','online','Rohit',1433317497000),(1433316645194,'New','Store movement initiated for item Product 1 from storage area Rack1','form145','store_movement','create',1433317509182569,'<store_movement><id>1433317509182569</id><item_name>Product 1</item_name><batch>Batch1</batch><quantity>0</quantity><source>Rack1</source><target>Rack 2</target><status>pending</status><dispatcher>Rohit (9818005232)</dispatcher><receiver></receiver><last_updated>1433317523749</last_updated></store_movement>','yes','online','Rohit',1433317523000),(1433316645195,'Dispatched','Product Product 1 from store Rack1','form145','store_movement','update',1433317509182569,'<store_movement><id>1433317509182569</id><status>dispatched</status><last_updated>1433317547969</last_updated></store_movement>','yes','online','Rohit',1433317548000),(1433316645196,'Updated','Storage Rack 2','form170','store_areas','update',1433317380274622,'<store_areas><id>1433317380274622</id><owner>Ashish Goyal (9818005232)</owner><parent>Row 1</parent><area_type>Rack</area_type><length>10</length><breadth>15.0000</breadth><height>10.0000</height><last_updated>1433350325872</last_updated></store_areas>','yes','online','Rohit',1433350325000),(1433316645197,'Updated','Selected product_attributes form','form49','user_preferences','update',126,'<user_preferences><id>126</id><name unique=\'yes\'>form60</name><display_name>product_attributes</display_name><value>checked</value><type>form</type><status>active</status><last_updated>1433411421631</last_updated></user_preferences>','yes','online','Rohit',1433411421000),(1433316645198,'Added','Attribute Packing for product Product 1','form60','attributes','create',1433411812180786,'<attributes><id>1433411812180786</id><name>Product 1</name><type>product</type><attribute>Packing</attribute><value>use the following items for packing:\n1. small cardboards\n2. Bubble wrap</value><last_updated>1433411857836</last_updated></attributes>','yes','online','Rohit',1433411857000),(1433316645199,'Discarded','2 of Batch number Batch1 of item ','form94','discarded','create',1433420045860316,'<discarded><id>1433420045860316</id><product_name>Product 1</product_name><batch>Batch1</batch><quantity>2</quantity><storage>Rack1</storage><last_updated>1433420045861</last_updated></discarded>','yes','online','Rohit',1433420045000),(1433316645200,'Updated','Selected manage_products form','form49','user_preferences','update',108,'<user_preferences><id>108</id><name unique=\'yes\'>form39</name><display_name>manage_products</display_name><value>unchecked</value><type>form</type><status>active</status><last_updated>1433438388625</last_updated></user_preferences>','yes','online','Rohit',1433438388000),(1433316645201,'Added','Product werwr3','form39','product_master','create',1433439310686630,'<product_master><id>1433439310686630</id><make>sdgsg</make><name>werwr3</name><description>sefsef</description><tax>12.5</tax><length>12</length><breadth>1</breadth><height>12</height><volume>144</volume><unit></unit><weight>200</weight><packing>sfdwfwe</packing><bar_code unique=\'yes\'>1433439279973</bar_code><last_updated>1433439310686</last_updated></product_master>','yes','online','Rohit',1433439310000),(1433316645202,'Updated','Selected add_unbilled_sale_items form','form49','user_preferences','update',172,'<user_preferences><id>172</id><name unique=\'yes\'>form112</name><display_name>add_unbilled_sale_items</display_name><value>checked</value><type>form</type><status>active</status><last_updated>1433440622225</last_updated></user_preferences>','yes','online','Rohit',1433440622000),(1433316645203,'Updated','Selected manage_unbilled_sale_items form','form49','user_preferences','update',173,'<user_preferences><id>173</id><name unique=\'yes\'>form113</name><display_name>manage_unbilled_sale_items</display_name><value>checked</value><type>form</type><status>active</status><last_updated>1433440622236</last_updated></user_preferences>','yes','online','Rohit',1433440622000),(1433316645204,'Updated','Selected add_unbilled_purchase_items form','form49','user_preferences','update',174,'<user_preferences><id>174</id><name unique=\'yes\'>form114</name><display_name>add_unbilled_purchase_items</display_name><value>checked</value><type>form</type><status>active</status><last_updated>1433440622244</last_updated></user_preferences>','yes','online','Rohit',1433440622000),(1433316645205,'Updated','Selected enter_supplier_bill_unbilled_items form','form49','user_preferences','update',181,'<user_preferences><id>181</id><name unique=\'yes\'>form122</name><display_name>enter_supplier_bill_unbilled_items</display_name><value>unchecked</value><type>form</type><status>active</status><last_updated>1433440622265</last_updated></user_preferences>','yes','online','Rohit',1433440622000),(1433316645206,'Updated','Selected manage_unbilled_purchase_items form','form49','user_preferences','update',175,'<user_preferences><id>175</id><name unique=\'yes\'>form115</name><display_name>manage_unbilled_purchase_items</display_name><value>checked</value><type>form</type><status>active</status><last_updated>1433440622252</last_updated></user_preferences>','yes','online','Rohit',1433440622000),(1433316645207,'Updated','Selected create_bills_multi_register_unbilled form','form49','user_preferences','update',178,'<user_preferences><id>178</id><name unique=\'yes\'>form119</name><display_name>create_bills_multi_register_unbilled</display_name><value>unchecked</value><type>form</type><status>active</status><last_updated>1433440622258</last_updated></user_preferences>','yes','online','Rohit',1433440622000),(1433316645208,'Added','Attribute Category for product Product 1','form60','attributes','create',1433476675425350,'<attributes><id>1433476675425350</id><name>Product 1</name><type>product</type><attribute>Category</attribute><value>Skincare</value><last_updated>1433476688508</last_updated></attributes>','yes','online','Rohit',1433476688000),(1433476690429,'Deleted','Attribute Packing for product Product 1','form60','attributes','delete',1433411812180786,'<attributes><id>1433411812180786</id><name>Product 1</name><type>product</type><attribute>Packing</attribute><value>use the following items for packing:\n1. small cardboards\n2. Bubble wrap</value></attributes>','yes','online','Rohit',1433476690000),(1433476690430,'Updated','Selected manage_sale_prices form','form49','user_preferences','update',222,'<user_preferences><id>222</id><name unique=\'yes\'>form166</name><display_name>manage_sale_prices</display_name><value>unchecked</value><type>form</type><status>active</status><last_updated>1433476764526</last_updated></user_preferences>','yes','online','Rohit',1433476764000),(1433479112815,'Delete','Billing type Snapdeal','form90','bill_types','delete',1432358034629682,'<bill_types><id>1432358034629682</id><name>Snapdeal</name><notes></notes></bill_types>','yes','online','Rohit',1433479112000),(1433585294712,'Deleted','Product Product 2','form169','product_master','delete',1433583434624107,'<product_master><id>1433583434624107</id><make>sdfsa</make><name>Product 2</name><description>sada</description><tax>0.0000</tax></product_master>','yes','online','Rohit',1433585294000),(1434212275092,'Deleted','Sale channel Retail','form171','sale_channels','delete',1434212257190767,'<sale_channels><id>1434212257190767</id><name>Retail</name></sale_channels>','yes','online','Rohit',1434212275000),(1434219124792,'Deleted','Product werwr3','form169','product_master','delete',1433439310686630,'<product_master><id>1433439310686630</id><make>sdgsg</make><name>werwr3</name><description>sefsef</description><tax>12.5000</tax></product_master>','yes','online','Rohit',1434219124000),(1434227981354,'Deleted','Sale channel Flipkart','form171','sale_channels','delete',1434227846961351,'<sale_channels><id>1434227846961351</id><name>Flipkart</name></sale_channels>','yes','online','Rohit',1434227981000),(143421227666268,NULL,NULL,NULL,'category_sku_mapping','delete',1434212263255901,'<category_sku_mapping><channel exact=\'yes\'>Retail</channel></category_sku_mapping>','no','online',NULL,1434212276000),(143421912452742,NULL,NULL,NULL,'documents','delete',1433439310686259,'<documents><doc_type>product_master</doc_type><target_id>1433439310686630</target_id></documents>','no','online',NULL,1434219124000),(143422798131889,NULL,NULL,NULL,'category_sku_mapping','delete',1434227854430292,'<category_sku_mapping><channel exact=\'yes\'>Flipkart</channel></category_sku_mapping>','no','online',NULL,1434227981000),(143422798147860,NULL,NULL,NULL,'pickup_charges','delete',1434227854322817,'<pickup_charges><channel exact=\'yes\'>Flipkart</channel></pickup_charges>','no','online',NULL,1434227981000),(143422798150146,NULL,NULL,NULL,'sku_mapping','delete',1434227854430292,'<sku_mapping><channel exact=\'yes\'>Flipkart</channel></sku_mapping>','no','online',NULL,1434227981000),(1433479112427674,NULL,NULL,NULL,'user_preferences','delete',1432358034629682,'<user_preferences><id>1432358034629682</id><name unique=\'yes\'>Snapdeal_bill_num</name><type>accounting</type></user_preferences>','no','online',NULL,1433479112000),(1433479112993878,NULL,NULL,NULL,'sale_prices','delete',1432358038722310,'<sale_prices><billing_type exact=\'yes\'>Snapdeal</billing_type></sale_prices>','no','online',NULL,1433479112000),(1433479112993879,'Updated','Storage Rack 2','form170','store_areas','update',1433317380274622,'<store_areas><id>1433317380274622</id><owner>Rohit (9818005232)</owner><parent>Row 1</parent><area_type>Rack</area_type><length>10</length><breadth>15.0000</breadth><height>10.0000</height><last_updated>1433485067297</last_updated></store_areas>','yes','online','Rohit',1433485067000),(1433479112993880,'Added','Product Product 2','form39','product_master','create',1433583434624107,'<product_master><id>1433583434624107</id><make>sdfsa</make><name>Product 2</name><description>sada</description><tax></tax><length></length><breadth></breadth><height></height><volume></volume><unit></unit><weight></weight><packing></packing><bar_code unique=\'yes\'>1433583421985</bar_code><last_updated>1433583434624</last_updated></product_master>','yes','online','Rohit',1433583434000),(1433585294443765,NULL,NULL,NULL,'documents','delete',1433583434624496,'<documents><doc_type>product_master</doc_type><target_id>1433583434624107</target_id></documents>','no','online',NULL,1433585294000),(1433585294443766,'Added','Sale channel Snapdeal','form171','sale_channels','create',1433877349890627,'<sale_channels><id>1433877349890627</id><name unique=\'yes\'>Snapdeal</name><details></details><dead_weight_factor>1.2</dead_weight_factor><last_updated>1433877358387</last_updated></sale_channels>','yes','online','Rohit',1433877358000),(1433585294443767,'Added','Billing type Tax','form90','bill_types','create',1433877720002246,'<bill_types><id>1433877720002246</id><name unique=\'yes\'>Tax</name><notes></notes><status>active</status><last_updated>1433877724671</last_updated></bill_types>','yes','online','Rohit',1433877724000),(1433585294443768,'Saved','Bill no 1','form92','bills','create',1434182507759436,'<bills><id>1434182507759436</id><bill_num>1</bill_num><customer_name>Customer x (893243298)</customer_name><bill_date>1434133800000</bill_date><amount>100</amount><total>113</total><type>product</type><billing_type>Tax</billing_type><offer></offer><discount>0</discount><tax>13.125</tax><transaction_id>1434182507759436</transaction_id><last_updated>1434182519888</last_updated></bills>','yes','online','Rohit',1434182520000),(1433585294443769,'Updated','Payment of 113 from Customer x (893243298)','form11','payments','update',1434182519937724,'<payments><id>1434182519937724</id><acc_name>Customer x (893243298)</acc_name><type>received</type><total_amount>113</total_amount><paid_amount>113</paid_amount><status>closed</status><due_date>1436725800000</due_date><mode>cash</mode><last_updated>1434182522035</last_updated></payments>','yes','online','Rohit',1434182522000),(1433585294443770,'Created','Sale order no 1434189412565924','form70','sale_orders','create',1434189412565924,'<sale_orders><id>1434189412565924</id><customer_name>Customer x (893243298)</customer_name><order_date>1434133800000</order_date><type>product</type><status>pending</status><last_updated>1434189435849</last_updated></sale_orders>','yes','online','Rohit',1434189435000),(1433585294443771,'Added','Product Coffee','form39','product_master','create',1434200814656156,'<product_master><id>1434200814656156</id><make>BRU</make><name>Coffee</name><description>Bru coffee</description><tax></tax><length></length><breadth></breadth><height></height><volume></volume><unit></unit><weight></weight><packing></packing><bar_code unique=\'yes\'>8901764012709</bar_code><last_updated>1434200814656</last_updated></product_master>','yes','online','Rohit',1434200814000),(1433585294443772,'Added','New batch abc123 for product Coffee','form1','product_instances','create',1434201015632797,'<product_instances><id>1434201015632797</id><product_name>Coffee</product_name><batch>abc123</batch><expiry></expiry><manufacture_date></manufacture_date><mrp>300</mrp><cost_price>324</cost_price><sale_price>432</sale_price><last_updated>1434201015632</last_updated></product_instances>','yes','online','Rohit',1434201015000),(1433585294443773,'Updated','Product Coffee','form169','product_master','update',1434200814656156,'<product_master><id>1434200814656156</id><make>BRU</make><name>Coffee</name><description>Bru coffee</description><tax>12.5</tax><last_updated>1434201065400</last_updated></product_master>','yes','online','Rohit',1434201065000),(1434201212331390,NULL,NULL,NULL,'unbilled_purchase_items','delete',1434201085232903,'<unbilled_purchase_items><id>1434201085232903</id></unbilled_purchase_items>','no','online',NULL,1434201212000),(1434208413357663,NULL,NULL,NULL,'unbilled_purchase_items','delete',1434189610924391,'<unbilled_purchase_items><id>1434189610924391</id></unbilled_purchase_items>','no','online',NULL,1434208413000),(1434209818201209,NULL,NULL,NULL,'unbilled_purchase_items','delete',1434208422497968,'<unbilled_purchase_items><id>1434208422497968</id></unbilled_purchase_items>','no','online',NULL,1434209818000),(1434209818201210,'Added','Sale channel Retail','form171','sale_channels','create',1434212257190767,'<sale_channels><id>1434212257190767</id><name unique=\'yes\'>Retail</name><details></details><dead_weight_factor></dead_weight_factor><last_updated>1434212263103</last_updated></sale_channels>','yes','online','Rohit',1434212263000),(1434212275182283,NULL,NULL,NULL,'sku_mapping','delete',1434212263255902,'<sku_mapping><channel exact=\'yes\'>Retail</channel></sku_mapping>','no','online',NULL,1434212275000),(1434212275385765,NULL,NULL,NULL,'pickup_charges','delete',1434212263103051,'<pickup_charges><channel exact=\'yes\'>Retail</channel></pickup_charges>','no','online',NULL,1434212275000),(1434212275617258,NULL,NULL,NULL,'sku_mapping','delete',1434212263255901,'<sku_mapping><channel exact=\'yes\'>Retail</channel></sku_mapping>','no','online',NULL,1434212275000),(1434212276160652,NULL,NULL,NULL,'category_sku_mapping','delete',1434212263255903,'<category_sku_mapping><channel exact=\'yes\'>Retail</channel></category_sku_mapping>','no','online',NULL,1434212276000),(1434212276525812,NULL,NULL,NULL,'sku_mapping','delete',1434212263255903,'<sku_mapping><channel exact=\'yes\'>Retail</channel></sku_mapping>','no','online',NULL,1434212276000),(1434212276853540,NULL,NULL,NULL,'category_sku_mapping','delete',1434212263255902,'<category_sku_mapping><channel exact=\'yes\'>Retail</channel></category_sku_mapping>','no','online',NULL,1434212276000),(1434212276853541,'Added','Sale channel Retail','form171','sale_channels','create',1434212277187526,'<sale_channels><id>1434212277187526</id><name unique=\'yes\'>Retail</name><details></details><dead_weight_factor>1.1</dead_weight_factor><last_updated>1434212285485</last_updated></sale_channels>','yes','online','Rohit',1434212285000),(1434213165099310,NULL,NULL,NULL,'unbilled_sale_items','delete',1434213082734163,'<unbilled_sale_items><id>1434213082734163</id></unbilled_sale_items>','no','online',NULL,1434213165000),(1434213165099311,'Added','Sale channel Flipkart','form171','sale_channels','create',1434227846961351,'<sale_channels><id>1434227846961351</id><name unique=\'yes\'>Flipkart</name><details></details><dead_weight_factor>1</dead_weight_factor><last_updated>1434227854321</last_updated></sale_channels>','yes','online','Rohit',1434227854000),(1434227981192830,NULL,NULL,NULL,'category_sku_mapping','delete',1434227854430291,'<category_sku_mapping><channel exact=\'yes\'>Flipkart</channel></category_sku_mapping>','no','online',NULL,1434227981000),(1434227981567417,NULL,NULL,NULL,'sku_mapping','delete',1434227854430291,'<sku_mapping><channel exact=\'yes\'>Flipkart</channel></sku_mapping>','no','online',NULL,1434227981000),(1434227982868981,NULL,NULL,NULL,'channel_prices','delete',1434227854430291,'<channel_prices><channel exact=\'yes\'>Flipkart</channel></channel_prices>','no','online',NULL,1434227982000),(1434227982899241,NULL,NULL,NULL,'channel_prices','delete',1434227854430292,'<channel_prices><channel exact=\'yes\'>Flipkart</channel></channel_prices>','no','online',NULL,1434227982000),(1434227982899242,'Added','Sale channel Flipkart','form171','sale_channels','create',1434227983882239,'<sale_channels><id>1434227983882239</id><name unique=\'yes\'>Flipkart</name><details></details><dead_weight_factor>1</dead_weight_factor><last_updated>1434227989837</last_updated></sale_channels>','yes','online','Rohit',1434227989000),(1434227982899243,'Updated','Item to category mapping of   for channel Flipkart','form176','category_sku_mapping','update',1434227989961563,'<category_sku_mapping><id>1434227989961563</id><cat_type>category</cat_type><cat_name>Consumable</cat_name><last_updated>1434228740088</last_updated></category_sku_mapping>','yes','online','Rohit',1434228740000),(1434227982899244,'Updated','Item to category mapping of   for channel Flipkart','form176','category_sku_mapping','update',1434227989961562,'<category_sku_mapping><id>1434227989961562</id><cat_type>category</cat_type><cat_name>Consumable</cat_name><last_updated>1434228752095</last_updated></category_sku_mapping>','yes','online','Rohit',1434228752000),(1434227982899245,'Updated','Pickup charges for pincode all for channel ','form174','pickup_charges','update',1434227989837075,'<pickup_charges><id>1434227989837075</id><channel>Flipkart</channel><pincode>all</pincode><min_charges>100</min_charges><max_charges>200</max_charges><rate>1</rate><last_updated>1434228817140</last_updated></pickup_charges>','yes','online','Rohit',1434228817000),(1434227982899246,'Updated','Pickup charges for pincode all for channel ','form174','pickup_charges','update',1434227989837075,'<pickup_charges><id>1434227989837075</id><channel>Flipkart</channel><pincode>all</pincode><min_charges>10</min_charges><max_charges>20</max_charges><rate>.1</rate><last_updated>1434229281344</last_updated></pickup_charges>','yes','online','Rohit',1434229281000);
/*!40000 ALTER TABLE `activities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `appointments`
--

DROP TABLE IF EXISTS `appointments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `appointments` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `customer` varchar(100) DEFAULT NULL,
  `schedule` bigint(20) DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  `assignee` varchar(100) DEFAULT NULL,
  `hours` decimal(5,2) DEFAULT NULL,
  `notes` text,
  `last_updated` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `appointments`
--

LOCK TABLES `appointments` WRITE;
/*!40000 ALTER TABLE `appointments` DISABLE KEYS */;
/*!40000 ALTER TABLE `appointments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `area_utilization`
--

DROP TABLE IF EXISTS `area_utilization`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `area_utilization` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(25) DEFAULT NULL,
  `item_name` varchar(90) DEFAULT NULL,
  `batch` varchar(50) DEFAULT NULL,
  `last_updated` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1433358727464035 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `area_utilization`
--

LOCK TABLES `area_utilization` WRITE;
/*!40000 ALTER TABLE `area_utilization` DISABLE KEYS */;
INSERT INTO `area_utilization` VALUES (1433356656561702,'Rack1','Product 1','Batch1',1433356656561),(1433358727464034,'Rack 2','Product 1','Batch1',1433358727464);
/*!40000 ALTER TABLE `area_utilization` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `assets`
--

DROP TABLE IF EXISTS `assets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `assets` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `type` varchar(25) DEFAULT NULL,
  `owner_type` varchar(25) DEFAULT NULL,
  `description` text,
  `location` text,
  `area` text,
  `floors` int(11) DEFAULT NULL,
  `notes` text,
  `owner` varchar(100) DEFAULT NULL,
  `last_updated` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `assets`
--

LOCK TABLES `assets` WRITE;
/*!40000 ALTER TABLE `assets` DISABLE KEYS */;
/*!40000 ALTER TABLE `assets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `attendance`
--

DROP TABLE IF EXISTS `attendance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `attendance` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `acc_name` varchar(100) DEFAULT NULL,
  `date` bigint(20) DEFAULT NULL,
  `presence` varchar(10) DEFAULT NULL,
  `hours_worked` decimal(12,2) DEFAULT NULL,
  `last_updated` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1434228106615795 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attendance`
--

LOCK TABLES `attendance` WRITE;
/*!40000 ALTER TABLE `attendance` DISABLE KEYS */;
INSERT INTO `attendance` VALUES (1432327218583412,'Rohit (9818005232)',1432319400000,'present',8.00,1432327218583),(1432585952620880,'Rohit (9818005232)',1432578600000,'present',8.00,1432585952620),(1432667538308207,'Anish Goyal (9818005232)',1432665000000,'present',8.00,1432667538308),(1432667538310761,'Ashish Goyal (9818005232)',1432665000000,'present',8.00,1432667538310),(1432667538313108,'Rohit (9818005232)',1432665000000,'present',8.00,1432667538313),(1433154404863965,'Anish Goyal (9818005232)',1433097000000,'present',8.00,1433154404863),(1433154404869443,'Ashish Goyal (9818005232)',1433097000000,'present',8.00,1433154404869),(1433154404871507,'Rohit (9818005232)',1433097000000,'present',8.00,1433154404871),(1433183450519923,'Anish Goyal (9818005232)',1433183400000,'present',8.00,1433183450520),(1433183450523825,'Ashish Goyal (9818005232)',1433183400000,'present',8.00,1433183450523),(1433183450526751,'Rohit (9818005232)',1433183400000,'present',8.00,1433183450526),(1433273185197797,'Anish Goyal (9818005232)',1433269800000,'present',8.00,1433273185197),(1433273185200156,'Ashish Goyal (9818005232)',1433269800000,'present',8.00,1433273185200),(1433273185202740,'Rohit (9818005232)',1433269800000,'present',8.00,1433273185202),(1433356409307266,'Anish Goyal (9818005232)',1433356200000,'present',8.00,1433356409307),(1433356409309109,'Ashish Goyal (9818005232)',1433356200000,'present',8.00,1433356409309),(1433356409312812,'Rohit (9818005232)',1433356200000,'present',8.00,1433356409312),(1433442740358988,'Anish Goyal (9818005232)',1433442600000,'present',8.00,1433442740358),(1433442740361911,'Ashish Goyal (9818005232)',1433442600000,'present',8.00,1433442740361),(1433442740363184,'Rohit (9818005232)',1433442600000,'present',8.00,1433442740363),(1433574373633240,'Anish Goyal (9818005232)',1433529000000,'present',8.00,1433574373633),(1433574373636453,'Ashish Goyal (9818005232)',1433529000000,'present',8.00,1433574373636),(1433574373638605,'Rohit (9818005232)',1433529000000,'present',8.00,1433574373638),(1433616163854706,'Anish Goyal (9818005232)',1433615400000,'present',8.00,1433616163854),(1433616163858843,'Ashish Goyal (9818005232)',1433615400000,'present',8.00,1433616163858),(1433616163859831,'Rohit (9818005232)',1433615400000,'present',8.00,1433616163859),(1433871239800650,'Anish Goyal (9818005232)',1433788200000,'present',8.00,1433871239800),(1433871239802566,'Ashish Goyal (9818005232)',1433788200000,'present',8.00,1433871239802),(1433871239804223,'Rohit (9818005232)',1433788200000,'present',8.00,1433871239804),(1433877417983642,'Anish Goyal (9818005232)',1433874600000,'present',8.00,1433877417983),(1433877417985698,'Ashish Goyal (9818005232)',1433874600000,'present',8.00,1433877417985),(1433877417986698,'Rohit (9818005232)',1433874600000,'present',8.00,1433877417986),(1434130700669889,'Anish Goyal (9818005232)',1434047400000,'present',8.00,1434130700669),(1434130700674574,'Ashish Goyal (9818005232)',1434047400000,'present',8.00,1434130700674),(1434130700677124,'Rohit (9818005232)',1434047400000,'present',8.00,1434130700677),(1434141362258017,'Anish Goyal (9818005232)',1434133800000,'present',8.00,1434141362258),(1434141362262647,'Ashish Goyal (9818005232)',1434133800000,'present',8.00,1434141362262),(1434141362264794,'Rohit (9818005232)',1434133800000,'present',8.00,1434141362265),(1434228106609722,'Anish Goyal (9818005232)',1434220200000,'present',8.00,1434228106610),(1434228106612184,'Ashish Goyal (9818005232)',1434220200000,'present',8.00,1434228106612),(1434228106615794,'Rohit (9818005232)',1434220200000,'present',8.00,1434228106615);
/*!40000 ALTER TABLE `attendance` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `attributes`
--

DROP TABLE IF EXISTS `attributes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `attributes` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `type` varchar(10) DEFAULT NULL,
  `attribute` varchar(50) DEFAULT NULL,
  `value` text,
  `last_updated` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1433476675425351 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attributes`
--

LOCK TABLES `attributes` WRITE;
/*!40000 ALTER TABLE `attributes` DISABLE KEYS */;
INSERT INTO `attributes` VALUES (1432664496626164,'Anish Goyal (9818005232)','staff','Overtime Applicable','No',1432664496621),(1432664496626165,'Anish Goyal (9818005232)','staff','Designation','Developer',1432664496621),(1432664496626166,'Anish Goyal (9818005232)','staff','Id proof','Voter Id',1432664496621),(1432664496626167,'Anish Goyal (9818005232)','staff','Educational Background','B.Tech',1432664496621),(1432667516210527,'Customer x (893243298)','customer','Alias','cusx',1432667516204),(1432667516210528,'Customer x (893243298)','customer','CST#','12312',1432667516204),(1432667516210529,'Customer x (893243298)','customer','PAN#','57675',1432667516204),(1432667516210530,'Customer x (893243298)','customer','VAT#','34534',1432667516204),(1432667516210531,'Customer x (893243298)','customer','Shipping Address','Gurgaon',1432667516204),(1432669160118346,'supplier y (9324329)','supplier','IFSC code','2342',1432669160113),(1432669160118347,'supplier y (9324329)','supplier','Bank Account #','3453454565755',1432669160113),(1432669160118348,'supplier y (9324329)','supplier','Bank Name','HDFC',1432669160113),(1432669160118349,'supplier y (9324329)','supplier','CST#','w5434',1432669160113),(1432669160118350,'supplier y (9324329)','supplier','PAN#','4231qeqwe23',1432669160113),(1432669160118351,'supplier y (9324329)','supplier','TIN#','23432',1432669160113),(1432669160118352,'supplier y (9324329)','supplier','Alias','supy',1432669160113),(1432669160118353,'supplier y (9324329)','supplier','Shipping Address','dsfertg4554',1432669160113),(1432736756577186,'supplier y (9324329)','supplier','Margin','5',1432736767840),(1433476675425350,'Product 1','product','Category','Skincare',1433476688508);
/*!40000 ALTER TABLE `attributes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bill_items`
--

DROP TABLE IF EXISTS `bill_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bill_items` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `bill_id` bigint(20) DEFAULT NULL,
  `item_name` varchar(90) DEFAULT NULL,
  `quantity` decimal(12,2) DEFAULT NULL,
  `p_quantity` decimal(12,2) DEFAULT NULL,
  `f_quantity` decimal(12,2) DEFAULT NULL,
  `unit_price` decimal(12,2) DEFAULT NULL,
  `mrp` decimal(12,2) DEFAULT NULL,
  `amount` decimal(12,2) DEFAULT NULL,
  `total` decimal(12,2) DEFAULT NULL,
  `discount` decimal(12,2) DEFAULT NULL,
  `offer` text,
  `type` varchar(10) DEFAULT NULL,
  `batch` varchar(50) DEFAULT NULL,
  `notes` text,
  `staff` varchar(100) DEFAULT NULL,
  `tax` decimal(12,2) DEFAULT NULL,
  `from_date` bigint(20) DEFAULT NULL,
  `to_date` bigint(20) DEFAULT NULL,
  `free_with` varchar(90) DEFAULT NULL,
  `storage` varchar(25) DEFAULT NULL,
  `hired` varchar(25) DEFAULT NULL,
  `last_updated` bigint(20) DEFAULT NULL,
  `item_desc` text,
  `service_tax` decimal(12,2) DEFAULT NULL,
  `fresh` varchar(25) DEFAULT NULL,
  `picked_status` varchar(25) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1434182511052425 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bill_items`
--

LOCK TABLES `bill_items` WRITE;
/*!40000 ALTER TABLE `bill_items` DISABLE KEYS */;
INSERT INTO `bill_items` VALUES (1432369222755853,1432369218527401,'Product 1',1.00,NULL,NULL,98.00,NULL,98.00,111.00,0.00,'','bought','Batch1',NULL,NULL,12.86,NULL,NULL,'','Rack1',NULL,1434186005664,NULL,NULL,NULL,'pending'),(1434182511052424,1434182507759436,'Product 1',1.00,NULL,NULL,100.00,NULL,100.00,113.00,0.00,'','bought','Batch1',NULL,NULL,13.13,NULL,NULL,'','Rack 2',NULL,1434186002611,NULL,NULL,NULL,'pending');
/*!40000 ALTER TABLE `bill_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bill_types`
--

DROP TABLE IF EXISTS `bill_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bill_types` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(25) DEFAULT NULL,
  `notes` text,
  `status` varchar(45) DEFAULT NULL,
  `last_updated` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1433877720002247 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bill_types`
--

LOCK TABLES `bill_types` WRITE;
/*!40000 ALTER TABLE `bill_types` DISABLE KEYS */;
INSERT INTO `bill_types` VALUES (1432358040417157,'Retail','','active',1432358044578),(1433877720002246,'Tax','','active',1433877724671);
/*!40000 ALTER TABLE `bill_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bills`
--

DROP TABLE IF EXISTS `bills`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bills` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `customer_name` varchar(100) DEFAULT NULL,
  `bill_num` varchar(10) DEFAULT NULL,
  `bill_date` bigint(20) DEFAULT NULL,
  `amount` decimal(12,2) DEFAULT NULL,
  `total` decimal(12,2) DEFAULT NULL,
  `type` varchar(10) DEFAULT NULL,
  `billing_type` varchar(20) DEFAULT NULL,
  `offer` text,
  `discount` decimal(12,2) DEFAULT NULL,
  `cartage` decimal(12,2) DEFAULT NULL,
  `tax` decimal(12,2) DEFAULT NULL,
  `transaction_id` bigint(20) DEFAULT NULL,
  `storage` varchar(25) DEFAULT NULL,
  `last_updated` bigint(20) DEFAULT NULL,
  `service_tax` decimal(12,2) DEFAULT NULL,
  `print_1_job` varchar(25) DEFAULT NULL,
  `notes` text,
  `order_id` varchar(20) DEFAULT NULL,
  `channel` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1434182507759437 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bills`
--

LOCK TABLES `bills` WRITE;
/*!40000 ALTER TABLE `bills` DISABLE KEYS */;
INSERT INTO `bills` VALUES (1432369218527401,'cash bill','1',1432319400000,98.00,111.00,'product','Retail','',0.00,NULL,12.86,1432369218527401,NULL,1432369235376,NULL,NULL,NULL,NULL,NULL),(1434182507759436,'Customer x (893243298)','1',1434133800000,100.00,113.00,'product','Tax','',0.00,NULL,13.13,1434182507759436,NULL,1434182519888,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `bills` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cash_register`
--

DROP TABLE IF EXISTS `cash_register`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cash_register` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `type` varchar(10) DEFAULT NULL,
  `amount` decimal(12,2) DEFAULT NULL,
  `acc_name` varchar(100) DEFAULT NULL,
  `notes` text,
  `transaction_id` bigint(20) DEFAULT NULL,
  `last_updated` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cash_register`
--

LOCK TABLES `cash_register` WRITE;
/*!40000 ALTER TABLE `cash_register` DISABLE KEYS */;
/*!40000 ALTER TABLE `cash_register` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category_sku_mapping`
--

DROP TABLE IF EXISTS `category_sku_mapping`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `category_sku_mapping` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `channel` text,
  `cat_type` varchar(25) DEFAULT NULL,
  `cat_name` text,
  `sku` text,
  `last_updated` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1434227989961564 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category_sku_mapping`
--

LOCK TABLES `category_sku_mapping` WRITE;
/*!40000 ALTER TABLE `category_sku_mapping` DISABLE KEYS */;
INSERT INTO `category_sku_mapping` VALUES (1433877358595057,'Snapdeal',NULL,NULL,'werwr3',1433877358595),(1433877358595058,'Snapdeal',NULL,NULL,'Product 1',1433877358595),(1434212285629131,'Retail',NULL,NULL,'Coffee',1434212285630),(1434212285629132,'Retail',NULL,NULL,'Product 1',1434212285630),(1434212285629133,'Retail',NULL,NULL,'werwr3',1434212285630),(1434227989961562,'Flipkart','category','Consumable','Coffee',1434228752095),(1434227989961563,'Flipkart','category','Consumable','Product 1',1434228740088);
/*!40000 ALTER TABLE `category_sku_mapping` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `channel_category`
--

DROP TABLE IF EXISTS `channel_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `channel_category` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `channel` text,
  `type` varchar(25) DEFAULT NULL,
  `name` text,
  `parent` text,
  `commission` decimal(12,2) DEFAULT NULL,
  `last_updated` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1434228197063424 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `channel_category`
--

LOCK TABLES `channel_category` WRITE;
/*!40000 ALTER TABLE `channel_category` DISABLE KEYS */;
INSERT INTO `channel_category` VALUES (1434228197063423,'Flipkart','category','Consumable','',6.00,1434228238625);
/*!40000 ALTER TABLE `channel_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `channel_prices`
--

DROP TABLE IF EXISTS `channel_prices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `channel_prices` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `item` text,
  `sale_price` decimal(12,2) DEFAULT NULL,
  `channel` text,
  `latest` varchar(5) DEFAULT NULL,
  `from_time` bigint(20) DEFAULT NULL,
  `to_time` bigint(20) DEFAULT NULL,
  `last_updated` bigint(20) DEFAULT NULL,
  `freight` decimal(12,2) DEFAULT NULL,
  `discount_customer` decimal(12,2) DEFAULT NULL,
  `profit_mrp` decimal(5,2) DEFAULT NULL,
  `profit_sp` decimal(5,2) DEFAULT NULL,
  `profit` decimal(12,2) DEFAULT NULL,
  `gateway_charges` decimal(12,2) DEFAULT NULL,
  `storage_charges` decimal(12,2) DEFAULT NULL,
  `total_charges` decimal(12,2) DEFAULT NULL,
  `service_tax` decimal(12,2) DEFAULT NULL,
  `total_payable` decimal(12,2) DEFAULT NULL,
  `total_receivable` decimal(12,2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1434229863573671 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `channel_prices`
--

LOCK TABLES `channel_prices` WRITE;
/*!40000 ALTER TABLE `channel_prices` DISABLE KEYS */;
INSERT INTO `channel_prices` VALUES (1434227989961562,'Coffee',NULL,'Flipkart','yes',1434227989961,NULL,1434227989961,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(1434227989961563,'Product 1',NULL,'Flipkart','no',1434227989961,1434229863558,1434229863558,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(1434229863573670,'Product 1',95.00,'Flipkart','yes',1434229863573,0,1434229863573,20.00,5.00,11.40,12.00,11.40,0.00,0.00,20.70,2.90,23.60,91.40);
/*!40000 ALTER TABLE `channel_prices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `checklist_items`
--

DROP TABLE IF EXISTS `checklist_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `checklist_items` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `check_point` text,
  `threshold_value` text,
  `last_updated` bigint(20) DEFAULT NULL,
  `checkpoint` text,
  `desired_result` text,
  `status` varchar(25) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `checklist_items`
--

LOCK TABLES `checklist_items` WRITE;
/*!40000 ALTER TABLE `checklist_items` DISABLE KEYS */;
/*!40000 ALTER TABLE `checklist_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `checklist_mapping`
--

DROP TABLE IF EXISTS `checklist_mapping`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `checklist_mapping` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `item` varchar(100) DEFAULT NULL,
  `check_point` text,
  `threshold_value` text,
  `last_updated` bigint(20) DEFAULT NULL,
  `checkpoint` text,
  `desired_result` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `checklist_mapping`
--

LOCK TABLES `checklist_mapping` WRITE;
/*!40000 ALTER TABLE `checklist_mapping` DISABLE KEYS */;
/*!40000 ALTER TABLE `checklist_mapping` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `credit_notes`
--

DROP TABLE IF EXISTS `credit_notes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `credit_notes` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `amount` decimal(12,2) DEFAULT NULL,
  `transaction_id` bigint(20) DEFAULT NULL,
  `acc_name` varchar(100) DEFAULT NULL,
  `status` varchar(15) DEFAULT NULL,
  `last_updated` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `credit_notes`
--

LOCK TABLES `credit_notes` WRITE;
/*!40000 ALTER TABLE `credit_notes` DISABLE KEYS */;
/*!40000 ALTER TABLE `credit_notes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cross_sells`
--

DROP TABLE IF EXISTS `cross_sells`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cross_sells` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(90) DEFAULT NULL,
  `type` varchar(10) DEFAULT NULL,
  `cross_type` varchar(10) DEFAULT NULL,
  `cross_name` varchar(90) DEFAULT NULL,
  `last_updated` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cross_sells`
--

LOCK TABLES `cross_sells` WRITE;
/*!40000 ALTER TABLE `cross_sells` DISABLE KEYS */;
/*!40000 ALTER TABLE `cross_sells` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer_return_items`
--

DROP TABLE IF EXISTS `customer_return_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `customer_return_items` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `return_id` bigint(20) DEFAULT NULL,
  `item_name` varchar(90) DEFAULT NULL,
  `batch` varchar(50) DEFAULT NULL,
  `notes` text,
  `quantity` decimal(12,2) DEFAULT NULL,
  `type` varchar(25) DEFAULT NULL,
  `refund_amount` decimal(12,2) DEFAULT NULL,
  `exchange_batch` varchar(50) DEFAULT NULL,
  `saleable` varchar(25) DEFAULT NULL,
  `storage` varchar(25) DEFAULT NULL,
  `tax` decimal(12,2) DEFAULT NULL,
  `last_updated` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer_return_items`
--

LOCK TABLES `customer_return_items` WRITE;
/*!40000 ALTER TABLE `customer_return_items` DISABLE KEYS */;
/*!40000 ALTER TABLE `customer_return_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer_returns`
--

DROP TABLE IF EXISTS `customer_returns`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `customer_returns` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `customer` varchar(100) DEFAULT NULL,
  `return_date` bigint(20) DEFAULT NULL,
  `total` decimal(12,2) DEFAULT NULL,
  `type` varchar(10) DEFAULT NULL,
  `tax` decimal(12,2) DEFAULT NULL,
  `transaction_id` bigint(20) DEFAULT NULL,
  `last_updated` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer_returns`
--

LOCK TABLES `customer_returns` WRITE;
/*!40000 ALTER TABLE `customer_returns` DISABLE KEYS */;
/*!40000 ALTER TABLE `customer_returns` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `customers` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(90) DEFAULT NULL,
  `acc_name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  `notes` text,
  `address` varchar(100) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  `pincode` varchar(15) DEFAULT NULL,
  `state` varchar(45) DEFAULT NULL,
  `country` varchar(45) DEFAULT NULL,
  `address_status` varchar(45) DEFAULT NULL,
  `lat` decimal(14,10) DEFAULT NULL,
  `lng` decimal(14,10) DEFAULT NULL,
  `shipping` tinyint(1) DEFAULT NULL,
  `business_type` text,
  `last_updated` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1432667516204186 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
INSERT INTO `customers` VALUES (1,'cash bill','cash bill','','','active','',NULL,NULL,NULL,NULL,NULL,NULL,28.6000000000,77.2300000000,NULL,NULL,1),(1432667516204185,'Customer x','Customer x (893243298)','assdl@dsklf','893243298','active','','Sushant lok-1','Gurgaon','122001','Haryana','India','pending analysis',NULL,NULL,NULL,NULL,1432668159679);
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `data_access`
--

DROP TABLE IF EXISTS `data_access`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `data_access` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `tablename` varchar(100) DEFAULT NULL,
  `record_id` varchar(20) DEFAULT NULL,
  `access_type` varchar(25) DEFAULT NULL,
  `user_type` varchar(25) DEFAULT NULL,
  `user` varchar(100) DEFAULT NULL,
  `user_field` varchar(100) DEFAULT NULL,
  `criteria_field` varchar(100) DEFAULT NULL,
  `criteria_value` text,
  `last_updated` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1433325589869711 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `data_access`
--

LOCK TABLES `data_access` WRITE;
/*!40000 ALTER TABLE `data_access` DISABLE KEYS */;
INSERT INTO `data_access` VALUES (1,'ques_data','all','read','field','','submitter','','',1),(2,'ques_data','all','read','field','','reviewer','','',1),(3,'ques_data','all','read','field','','approver','','',1),(4,'ques_data','all','update','field','','reviewer','status','submitted',1),(5,'ques_data','all','update','field','','approver','status','reviewed',1),(6,'store_movement','all','read','field','','dispatcher','','',1),(7,'store_movement','all','read','field','','receiver','','',1),(8,'store_movement','all','update','field','','dispatcher','status','pending',1),(9,'store_movement','all','update','field','','receiver','status','dispatched',1),(10,'task_instances','all','update','field','','assignee','status','pending',1),(11,'task_instances','all','read','field','','assignee','','',1),(12,'service_requests','all','read','field','','customer','','',1),(13,'service_requests','all','read','field','','reported_by','','',1),(1433325589869710,'store_areas','all','all','field','','owner','','',1433325597463);
/*!40000 ALTER TABLE `data_access` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `de_duplication`
--

DROP TABLE IF EXISTS `de_duplication`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `de_duplication` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `object` varchar(50) DEFAULT NULL,
  `tablename` varchar(50) DEFAULT NULL,
  `keycolumn` varchar(50) DEFAULT NULL,
  `slave_id` bigint(20) DEFAULT NULL,
  `slave_value` varchar(100) DEFAULT NULL,
  `master_id` bigint(20) DEFAULT NULL,
  `master_value` varchar(100) DEFAULT NULL,
  `references_value` text,
  `references_id` text,
  `status` varchar(25) DEFAULT NULL,
  `last_updated` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `de_duplication`
--

LOCK TABLES `de_duplication` WRITE;
/*!40000 ALTER TABLE `de_duplication` DISABLE KEYS */;
/*!40000 ALTER TABLE `de_duplication` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `de_duplication_ref`
--

DROP TABLE IF EXISTS `de_duplication_ref`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `de_duplication_ref` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `object` varchar(50) DEFAULT NULL,
  `tablename` varchar(50) DEFAULT NULL,
  `keycolumn` varchar(50) DEFAULT NULL,
  `references_value` text,
  `references_id` text,
  `last_updated` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `de_duplication_ref`
--

LOCK TABLES `de_duplication_ref` WRITE;
/*!40000 ALTER TABLE `de_duplication_ref` DISABLE KEYS */;
INSERT INTO `de_duplication_ref` VALUES (1,'product','product_master','name','bill_items--item_name;product_instances--product_name;supplier_bill_items--product_name;purchase_order_items--product_name;supplier_return_items--item_name;offers--product_name;offers--free_product_name;sale_order_items--item_name;bill_items--item_name;bill_items--free_with;customer_return_items--item_name;attributes--item_name;cross_sells--name;cross_sells--cross_name;reviews--name;pre_requisites--name;pre_requisites--requisite_name;area_utilization--product_name;newsletter_items--item_name','',1),(2,'service','services','name','bill_items--item_name;offers--service;offers--free_service_name;sale_order_items--item_name;bill_items--item_name;bill_items--free_with;service_instances--service_name;attributes--item_name;cross_sells--name;cross_sells--cross_name;reviews--name;pre_requisites--name;pre_requisites--requisite_name;area_utilization--service_name;newsletter_items--item_name','task_instances--source_id',1),(3,'staff','staff','acc_name','accounts--acc_name;attendance--acc_name;task_instances--assignee;transactions--receiver;transactions--giver;cash_register--acc_name;payments--acc_name;bill_items--staff','',1),(4,'customer','customers','acc_name','accounts--acc_name;transactions--receiver;transactions--giver;cash_register--acc_name;payments--acc_name;credit_notes--acc_name;sale_orders--customer_name;bills--customer_name;customer_returns--customer','',1),(5,'supplier','suppliers','acc_name','accounts--acc_name;purchase_orders--supplier;supplier_bills--supplier;supplier_returns--supplier;transactions--receiver;transactions--giver;cash_register--acc_name;payments--acc_name','',1),(6,'account','accounts','acc_name','transactions--receiver;transactions--giver;cash_register--acc_name;payments--acc_name','',1),(7,'offer','offers','name','bills--offer;bill_items--offer;newsletter_items--offer_name','',1),(8,'asset','assets','name','pre_requisites--requisite_name;asset_valuations--asset_name;asset_maintenance--asset_name','',1),(9,'task','task_type','name','task_instances--name;pre_requisites--requisite_name','',1);
/*!40000 ALTER TABLE `de_duplication_ref` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `discarded`
--

DROP TABLE IF EXISTS `discarded`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `discarded` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `batch` varchar(45) DEFAULT NULL,
  `bar_code` varchar(45) DEFAULT NULL,
  `quantity` decimal(12,2) DEFAULT NULL,
  `product_name` varchar(90) DEFAULT NULL,
  `source` varchar(25) DEFAULT NULL,
  `source_link` varchar(25) DEFAULT NULL,
  `source_id` bigint(20) DEFAULT NULL,
  `storage` varchar(25) DEFAULT NULL,
  `last_updated` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1433420045860317 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `discarded`
--

LOCK TABLES `discarded` WRITE;
/*!40000 ALTER TABLE `discarded` DISABLE KEYS */;
INSERT INTO `discarded` VALUES (1433420045860316,'Batch1',NULL,2.00,'Product 1',NULL,NULL,NULL,'Rack1',1433420045861);
/*!40000 ALTER TABLE `discarded` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `documents`
--

DROP TABLE IF EXISTS `documents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `documents` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `url` mediumblob,
  `doc_name` text,
  `doc_type` varchar(50) DEFAULT NULL,
  `target_id` bigint(20) DEFAULT NULL,
  `last_updated` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1434200814656507 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `documents`
--

LOCK TABLES `documents` WRITE;
/*!40000 ALTER TABLE `documents` DISABLE KEYS */;
INSERT INTO `documents` VALUES (1432357993955898,'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wAARCABwAMgDAREAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4 Tl5ufo6erx8vP09fb3 Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3 Pn6/9oADAMBAAIRAxEAPwD6gtNE0vULIfYbiSAw4crJKzjg/wBwnaOueBXyOeYbE4id2/8AI vyutQpU WOx166db3cyT3qQu8cYGGJ7ccDp0/nXnSxeIo09Vsv6/A63Ro1J3NqxsyButii27NuMRX7gx0x6VxSxlPGwv8Aen0BwdB2NhTAVWOTBQE468VFBQj7vQwnJ79RsYPzQSbXiI4J7enNepSgvkc1SV9UWILP5Qw5BPBrup0tFY4ZyszW0qOwuHMf2uISfxRnhuuOh969TBPD1JcnMubts/x8zkre0irpaGvJo9oEbzIfNU8Yxyo716s8JSmuVq5xxxEr6OxnyaBp8Mc1wlsnmlTtcjDY9M15GMyHDRjOtTprntv1/rsd9HH1eaMJS0ucXBrcd3qJ0 SzltbmLeoLMGQ 6njOR64/rX5wsWq IVGpF0qiutXdeqemj87dkfSui4U3OL5ouxieJdciTzNOWMARIDG 7bkhuAMcj8fTvXzOZ5g61R0Le6uvo n/AAfU9LC4fkXP1Z5zqms61cS/aPtDW8kYKhxIcgdMZrmpYmPxNts7o001ZDxpekX3h6KKa8F5ql63JkkdY4zuxnnjcASck4/lXsYWvQjBJP339y1/PrfZGNSFRzd17q 9/wBfeeYeJvDUumwyXAt32Z27lyea93CVpxlaWhx14QlG8Tzu8FhOJAxAPow719FSpvc8ipNHHavpunzlwXjwBzgivUoU6is4o4akoPc53 ydN5IuHC5wVB6 9ewlUitTz26cnoWtM8E3 vpcyaBaXF3HYIJLgxxlliBzgsR0zg4z1xWdXGxw9vbaXLp4aVa/s1exlX lyWigTxbQ3IyMZ967cPiVNe4znq0LP3jDu7Lzm3q2SvQZrq55nO6cWZGpxXMq WIzgcGr9o7HPVpNqyMC60q9lOyKBiPYVccTys4KmDlLoS2 i3sQ/eQuFHJyDQ8TzMSwE0WrexYwujqVwcjbjn61tHEE/VXqrHbafrGhR6HHb6lof2qSBJitzHcvFKZDD5cauDlDGjHzNqqrMwUF9oZWHXrNpRnZaaWT/HfVafjudSo0uS8o3du7/LY yb34m6THCjaJJPFM0R3OzqwDHGMeo65yK MxGMr1VaUEj7Shg6NPWEmbmifFG71QxLfiGC3WMIdoIcnu2SeQR2/WvBq4lwclUjdM9WOF50nB6o9E8J NdBhsFsf7bkCow efPf8ApXi062Gw8HTu0vM6K2GrVWpWR01v4q0iVSwuo3QHBcsBkdsDr/nr0rnpZlRc XZd3/lv933nNWwNSKv17EyeINNEpgSeN5B0O7CHg8BufTHp74rqlndCi/ZR96S Sfo9fTa3nbU5fqM5Lmei/H9Da0rW9Iuo3aLUIlMLhJUlbY0bEdCD h6Hsa93LM5wWJXMqiVt1J2afmn ez6M83FYStTbTi35o6CP ykurcywo1y 7ymCZPHX5un15zz0r66M8JGtBOKdR7afr/wbnlctdwk0/dW v6HRxgKg4wfrXpvVnmSd3cp6tNFbQedcELCOHY9F9z7Vy4qvHDU/aVHaPXy8/kdWEpyrS5IfF0OM1qDR9SW4a02yRxfI7DKgMVDAKSMMOQcg4HH4fBZy8DmftFRtKC0b26Jqzas 7d9NPl9PgfrGG5faaN9PnbXXQ8l8UalCkrR74WbZj5UYZ9Acmvx3E1KcqjjdP0v p9ZGNlqcReX8ZG24uJFUHJKgADmuum/dskbQ7hqN5aWFjFq2kSecY22ovnqrb8A9Pvdefzwa7cPzuSvZfmOTTTucNqfxemGmvZjTY7eeIPGEMh2Mrffyp4yeOf8AZHoK tw2FnNxvPRHkVq0IJ2jqeGeJ/El5LO/2cQordAFUV97l1CkormZ8vja829Lfcc3e/bZ7aK4gkaTdw Gzz64r14V6dObi0efOlUnHmuUbN4jqEcU9z5WSAzFC2B9B1ratWvTbiiKdJKdmbemeKdW8G I7jXPAV/cab9qt0gki8wMzKAhkDEKBtZ03bSDgcEtyTwVVTxNFUsRrb5HXSc8PVdShoV/F3jKLxLfXGqNaLbNcTPKURNoBJ6DHHFGAorCpQ5r2DF1XXvK1jiXvrhZflQlSeDivdVSFtzyHGaewyTVLlGG9iR7AU1Km0S/aJm3oPiSGC4iTUYvNt/402g5FcuIjGUXyPU6qE2mufY6jQPGmhWxu7PVvDcOp2c4zHGztE0bD7pDKeOpBByDnpnmvMxNKpKK9nOzXXc76NWEW eN122MmJfCH9pl7u0vYLUtuBQqzAenoat1K6p 402T7Oi53knYyNeis7aXbbzKYZAXUIfur2zXVh8Q5K0tzmxFGMdtj6F0zwL4ognEV/4SvYCpwziJiuPXdvC4/GvgsZnUFG8an9fcfZYbL53s6f8AX3nd6X8PtWtbVdTWb7PbNKF2TW4LYJ4YESnPp0718ris3nUjzJNrvf8A4B7lHCKFk7L vU9WHgPSprMGLUYlm2g5SIMgbAzwD ma5J03Xgpc7uaxk4SaUTndZ0XxNozRpaWtxfQOo2y2ihhn6DmvOlSlF 9/mjSpGFRFXf4qtgJZ9I1JAOpeFgMe/FZVJRiryOF4e7903bfx3q8ll9kv5yYR8oV0DED64zn61jUzB8nJe6MpYe2rNvQvHcnhaeK7WwUfaR 7LowDgnGVGQCcgge9d T8SPKKqqU47 v4dOhy4nL44qHJLY950LxRqGp2qtN4fvrefyhKY5UCHBOB94jrg/lX7fl2bzx1PmlQlGVr2atvtvbc JxWWwoS0qJq9tNfyuZHjbwVrPxD8PPZPqlzodwH3RBWDo2OAJFBxg oOR6dq8nO8lxfEeEcJSdGS1SvdPtzJPT1Wq7dDqwWNoZXV/drnT3drNel1 H4nF23gDxH4e0t9J1QS3Vuk 9ZbNiySIccbCwKnPJG0j3I4r8nxvDma5RGVHFQcqad703zJp2 zzJrX 5bTVtJH1NDM8Li7Sg0peejX4fqc1q/hTVL9bi6uLK7t8ybUVsEpgc55 YHjkGvj8TTxK5q1WnKKvbXdf5377HpU6lKVoqSf9f1ochceAfEFzMYo8Ju/wCep2j/ABrKhiarmoSVn56HZH2aV7mhb/DrVhoc2mXmsRxpIxfy1UlQ3GG7c8Y54r3KdOu0mpL0uL2lNvU881/4TeIIrZ5hbfaipIURfvGYf8BBI/GvWw OxNFpTi7eWv5GNShCom4s8s8Q C9NSNk1O2vra5QZVJLL5SfZiR6enNfU4LNqjs4T/E8fE4OK KP4FO5 At1e2cWo GteS4EybthjMB57ck8/lXuRzucdJWZ5jwMXtoJoH7OtxPdmbxTq7W8Kkbo4GDyye248L9efpW/9uTkrRsjF4GK1Z3sPwf8Ah5ZqBDpsx2rtLPMSx9TnHWuGri61V/xH H R0QhCC BED/Bz4ePZpara3qFGZt3n7s57cjGPp61k8Vio1OaNX8EaRjRcLSh JgXH7PvgqWcytqd qE52JsGPbODXoUs1xMI2ck2cs8NRlK9tB8fwL HUICXEN3c88tJNgj8FxWv9pYqS92dvkv1M/q9BPWJcPwh G8KhbPSnhPQyCYsx98NkD8K4KuYY9O/Pfy0OyFDCP7NjL1H4WeGkmU2IveDyWEeB Q5q8PmOLm7VNvn/AJk1qGHhrEzJ/hjYurIduOxzz/6DXp0sRUvds4JyhayRjXfwdtLrG 9MQHBI bP0yBj9a64YqaerOapyNaI xrXT5bd5JY1bdKdzEknJr8tnGunc/UIRpksmnvcqVni3qwIKknHPtXJVhWludEY0xLbw sEUkNtG0CSEFtjkcjoetcM6NfZFN0oov6VojWW4LLcSl12v5j5Dc56dB GBWDp143Te5z1KlNbHQW2kXdwgga5mjhzzGjlQfqRz tTCniJ 4m0u1zz6uJpwd1FN9zotD8K2UJIkaaSNsAo8hI le5l2TwbvWu0 lzx8ZmVRr3bJ h6PpxiS2SGJVVUAUKOwFfrOR4qnSgqSSSWnyR8RjFJzcpF8MPpX1KalqjgvF9RGOKyq14UVeTLi09jK1IrztPJ618HmuM56snDqerhU7K5zF pJOBivhcfOVRvSx7tB2OfvllAOVBH0r5ytTqN6o9eg1cw7kNuJClfYVzqlUvoepTatqZlyLnOUxwe4ropSrR2OpU6cjKuxcSkrIhYHg16NOpVe5MqEe5jz6ejEnyQv4V2RqTOSWHiUJtHchig/D1raNWoYPDwM6XQrkjPlHJ6j0raNaqjF4eBVl0W8AwqcZ5zWsZ1W7kSoQtYoyaTqCjPkE wNdcZVGc7oxW5Tl0zUx/y7nmuqE52MZUolZ9OvwP8AVkfhW8XJmDiitJp9/wD3Dn6VtFSZlKCKsunX5/gx FdUFIwlFFWTTb7 5XRFSZi4o4u38VeK9Qkit9J8UeMpEkDlLj 3Y4ySrNnCySsD8vTLc4JAPb6upHAt8vsY/wDgMf8AJnzUKuZP4cTJv1f Z0Nr4c J11awzJ4/8ZxszBvIOs2sqYI3D9756Mcg9MdCDngVy1MHgVq4R 6P R2wlmjWmJl97/zR0qWHjJJ7e1n1zxH5pULKJtbSCNSy8SZW8eRV4kIUo5 T73XHnYrD4RaQpQfyS/Q9KjWxsdZ1pv5/8E6q4tNEgvI9M1r4lyzRpmVImmeWYbifvp57uCF7qFwrdhurxK2Aw1SfLyRS7qK890melDFVoK0qjb7XL1x4r8N2txBZt8V79nuCSsllJJcCIbSNskce9ozkqf3hH3T05xyvJ8KnyySV vLf5W7 un6Esdr8bv2NF/iR4IES20fjXxJPMikEx2t/GGJUH0BHTIyx5YjpUVctwUY6K9r7Ra6f11 5EfW3J6v vuNDwp4u1C8kVI/GEv2eedYkOo212gSMd3kcoozj5mDDALexryo4blkveSTaXvJ6Lu3dWXdp6K5rOakm0n32/wCBuelWerX66OmqXni3QVjKGQLbizQyMAdimaaZx8w25xF BOWPsQpxWGVWVSHolS1dml705StdWv7nyvdvzqkGqzVnbv736JfLX/I82vfiZ4FjkuJbG4uTdTKyyGxjmhN1IWcqzL5fynlR8rE8nHQ7vl6lDAvmmoPmd7tXV3dtNqzta6Ts/wBb9scQ0 Ryuui7bLsN0bxvfalBcPpUOpXkrosRSXzFW1YdWVSAWHbLPuPXtgYU8BTqqT9ndtW12j6X1fq3d/I35nLWDIr/AFTxTE2Xt5J4MMXmZ0QqFGeAJsN055X6nJzzTyylHWUE 7sunz1/D59dqc6y0Zgz3DateD yfEkM8EmfNKh5FiJGAFIlOcE9M5960jQwaqcsYqz8tvTf8/Q7YTrNXTOC8XeGPHMyMLHxHGJWXymi xyomcKTJuEhZcc89MgYAzkexg6FCMl7q/8AAUcmK tOL5J2PL5vB/xTW6lh1PXHd0VWCJHMWZS3BVt4X0B5zyPUmvqsLh8PL4Yx/wDAUfN1pZlCXv1fuv8A5nEy6bqEgmVNe1C5Chcu93koWYfKQvUjcOp6AHvx6McNRjtCP3I8mpiMRZxdVv5/8MYmq2TxzrEup6g7HguJ227M5JA3g5B68fyyehU6UXb2a 5Hl1a K5rKrL vmV7TwxY3cipd I9cRpW3IIoTMCmAUORLnJ78HGQct0rsjCn0gvuRze2xK KtJ/16jf8AhC/Dd6s8M3ivxZDMAwgW300MknoXZp125PBxux6knFVH2cN4L7kVKVSaSVaafp/wUYzfD 1aKO4vPEesBSuWEP71snG3A3DOSfbHvzWkKsFtSX3I5nGpFXniZL vUqN4S8AJGiN8RfEbysDuT7BCoDZI4Juunvgd/StlVp7qmvuRzufLrLFy 7/7cp/8Ip4HaT954 1tFLYBNkjk uQLn8q6I1oLakvuRk6yvb62/u/ 3Hp4E8FyTmMeP9Txnj/iXYH/AH19ox0961jWvqqat6ITnG9vrTv/AIf/ALYs2fw38A3TOj/EHU4wvQnTojn8Dd/nXTGtH/n3 CJ0f/MV C/ SNCX4O AoVmc/E2bK48qOXTY97g9/kunCjBHfPUYyME sxje1P8AAfs4yVvrT 5f/JBL8EPCy6V9vs/iVokkkpby4bm4ihZtpAJKiR3XGV6r3z0yQvrkN3FDqYSty3p4lP10/V/kfVVj8NfhbrDySaNo/wA /HmW97LC6HkHhWCjnIOc8A8evPiXCKvBJfgfYYTDUVK8U7 rNLRfg/4Ytvs8dmnjXw/IY1nurmzvjJDKzMMRO7ozkqcnIUd eleJWxPKttvme1Swy5tLr5l6P4K F4dZEeoaZ4g1Ky2eYt3LfRhd3UAqNp3EdMA9OSua8yv7StO9S1lt/wANsdaw1JdG/wCvkdangzwXp95Z2Nr4FiZJpd8ktxJGdp2k YFZiWbIQHAycg9qzrTu1BrT8zelQpQXuos6voV/qhilDWGjWdy6ebK2tXCtJFgk4SPyxvbeRnewwTwd3PLOCcU4NRT7v/hu5u076m3pXhPw8ls81p4n1WWKTHmpFq1zLGyA5bCo 8k/MPlIyT909Ki1O3x ttfXbX tmV7O6/4L/wAzRax8IaPqtlba546uNKF0fKhe61jVYApUrlo2e52tjPPOMNgdM1hVUXUjCc S l2p2XmnzWt87a7GbhaLdr26XWvl/X3nZeGtL8K61mXwx8Vr aWIkSreazqLxjccBlxdQkqGDLwXzuQ5G7nTCfU60nDD4y0lupOStdtaWnSfxXWjk9Yu65jz8TGtFXlh210a12 U1tZ6pLdLYsa1e/D 8nttKvPF0OsT3SeTdxWus3LNtR2AkWISyN14wXz0IPrzZlUy9TpqpX9qp6SUZye2zs5yfyc7v7OqbfRg6OIcJxVPla1V0lv00ivvUXbr2Xl/jDxLpUls8uiXOm3kVzebJ4W1 Sylg2liW2okjJGgxkhVHLBtoQivK5Y117VJ8rk9E7PR6d9LPR2t06WPUqS5P3ce3Vv8  m2/XzMweNNA0TT7m7tdek1GaWJZ/s8VwtzG0jnACSlgqr97K5IBB74xo4Sjdfaa2fd d1Zd0r6 drQpwhre/o7mc2vHVjdXFiJ7jMJMToZJLeZFVmUoUB2t1 YDPQYPy7uGOFqOTVr/N2t0 fnfy9d1iI2uvyPPp/E3h3xdqkmkW/iC5sIfLeK4ZdBnkUygth87OMBuT8nTuThe3D0JRqRTirdzlq4unO65n9z/wAjk/EOrfDZJpIdG8SvqVxHLunN5YXDktj/AFYEoTC5zzvc98n5RX0eGhOL1V/uPDxGKwtS8VL70/1Ob1fw0tvI93pmu6dK1wFiC dCiRsQGUANIrgfMwOQORz2NeortXaZ5NbDxqN zkjCXwuul3Rj1XxFohaVDKSl3CAqlgFAbzwBjDHAwfxPFOaTszgjgnTv7SpH8P8AM57VPC8oRtSlXQ4o3eWNI3jlfy1G0lhncCpLgBhk88HgV0Kel0edWwLhK75Wu1v CULSCe1t5bZ9IsdRgBaPaRkvleSD5o2bSoYHBzzngYpc92EoSUeWya/rzMnxBo9lpwW0uPCF7aS7mJ3RsrcMQdoJ5wePqPrnSnPzPPr4WMNPZO/p/wAELSx0a4tjDdX1lZxOpMH2yGUyoAM/wIQd2AucHnuAM1qm 4RpU2tV8ramfcy6PFBIsOn28rkjYSXXGCepyhOQecAfTOCN6blezZzVKEFG8YmW9w9lO6CwZyvA3K7YP0YnOOvPXvkcV30mrHm4ijUTvb8B8 rx3DSSx6Y8COykoIehx1AzwPp6e9dFmtrGPLo73XyJbRrVGku4nuo1jBZ2H ryT6Fj645546ZrQ55Jx1hcvq8t6Bcf2q1v5rNuQzRqqnpwMk4xnPuOxrNy6WLUZzfM5WPeF/aPv57WRoY2t3WRZEEds8fzAHoSSMHIBDZHycep frVk04rmb7W/Wx sxzOklzaIpR/tMfEa7vAumaPGkcYLNglUbJYhmA UY3diAdoyDznlpUMRUd1Cy9bfglY5KnESUrRjcq3/wAY/inq5Fhca7JBGyndAsAAnXrgsVO7 HkDj1zVTy b0d7dk/1OefEFeo7QfL8jf8K PfihZRRrouqxWFrbFFt3m0 3kmlL/IrFpkZjksoByAvAGMACa2Gk9NE116/jfc1w aYq3ut29N/nY1tM PvxasrpZdR1a11RZ90BtHtYIyZTgbleNQS69OQycqCCSMed9Vr2bcr36af0/wAtkejSzeunqrnZaV8c/i1Fr5WK10ZTLGsEGkN 9lV8NuXKsCr4Rn/eDaAOeuDnLDyw9pqTta1tH/TPRpZjWrycHFJ6aa3/ADNWTxr471bxFFNcfDn4f6elyyXVwkqQxR3Kc5y87lir42/3ywAU9M FiqM5uVSjyxW9uXS2r15u/XVN9NT0aWIqRahUjd9XfXX0X6addD3Wx IHijSNQubRvgPqGmTSTDeLbXH062hieTZG8qROwVeGJlZUHsM1q8YsBKpKrhnDW75KlSlFRb0ckny/9ve6uuiJeHnioQ5KqktlzRhN3620b Wr9SHxP448f6hMY7v4K6dqUeoQNLFO oxQOYhBNyIp1IwqqxG8JlQ4wSwNRWxGLxDf1mjBSmm07Waiozs2pbcqTaTS0T3ck1rThDD2jQm3GLSaut3KN1olu3Z6vVromn5w3jnxDqttJof/AAhPh28tp2EctlY3dtqL2aLGpUTZdU5UKPlztwcldpA8acKij7KE1Z2d7J6W0ta/Td20tbSzR6kKzfxw2urf1br/AFrczNU I1pe3QGp6fYWV o8mFLm/hhdXywMarE7bt2IfmEwUAHPI2nWVJ1WpVJarRW0S3ve2uvdNbdSPrH2bL57mH4h IWg6XBdXsmr Xb2d2bTI86VZ1SUoSrMV2sxzIASflUZUcsMJYWopc022lpfvr3/AB/RdIqY2nCN9EcX4g JWbVms9ohu7SOeE39u4WZ2YZGxVYj5Dk5ycMp5DKD24fD zSbuu39W/rzPPrY9SXu21XZnISavdfZmnRNHASUyzzW9xN/pCKOSny4VwCzZYkY3Y5AV/osPKTWjPEqYyUXqo28nuVLm68B2zGJ7LVXZ7VWFtHc7Xjl5Yu5EC5QhowMY6E5weO6Nara119z/wAzkniMLG65f6 45fVm8MQXN0NOn1EWspjVo5bOQb1JBCbuTwFBGRgnGNwG46qU09Vc4p1MG20rpfP/AIcy30jw1c309na6xbMkabiy20gwADk8wll/iJ3Y6cdqr2j2t/X3HO6OFk9H/X3EOoeHvD62p2zxG5xEY7eTcJZEYZLKduzHTgdMnOCOa9skZ1cLh3H3dbFZdE8Fw6gIbG/1hmlj82U2sIDx45ZdgbDFV b5TjHftWirPocjoYOjL3b362GXmkabaSC30PxJqMtqs/7sm2lixKFj cKxyPurzjICoSo4A1jVlfWJhKdGP8OT/FHPSyma1 yx6rMYmcMxkQhc425HViQMA8Zxj0ranVXY4qk4y 2ytJHqTSxh9TuLpoFyomVpQi53YAYdMlj9c11e0i9bHNaeijUb9dS8D4imAn 3QpAq7B5MaRIcdMoFABxzyMn8c1cakHsjGpGundz0K0lhriB/PiuJRIvnDYoXevHzfTHpW8KkZbOxzzhWSak7oqI2 IvAlwkj4KggYHbrkY6H0/rXRJylszzr7NM sNN8A HZ7aX7fbQWN6C8kKfZobichshX3bzxnnPrlcfxVwyxag/ch H6n61HK6b1mzX0vwTpekyQlLxbosyIk13ZFvL RwGEYKhN3GDyMnqTxXmYjHSktbp qO hl9KnK6SfyOotvh/poubTUL63Y3QAXzWLrEhHLlItxXLFRnI7MBtBw3kV8yqQSSdvM9SGWUpSUmtTc/sHTrW7jjaz0toIGVbdrl9zKECkIiheACMj5iQQCOB8uKruqm5y Zu8NCDtGKLVv4VsoNNubnU4bS2tDGIpJLeNIrVB8wjB3RHGQXOC5XO7HXNS26tNqT9Gr28uhcaMYO7077F2LTdE8SasrG21YaHND5Lf2hYqlrGA7ESSxzDezMyoMkyDHzAAkFonW5JNJNRXV7a9evl1b1el7GipRnZtX8v6t i/M7v/AIVbrGsSwaz4J8VapbzGwu3fT9K8SjS7i5cjZlswSZwc7SSCrGLfyCR0YelXrQc8NPmk4t8qmoydnt8Ltrom9VonZ3tx4ydKk0qsWknbm5W46r1Wyfzs7XOiT9nW91O7TVNY IWux2Ai 0xWV7b2hmjl8uJd11JhxM5CPvf7zbYyzsY1NOtwrDMF7XE1HGLTdpKN02lrPVxb/m72V5HNHOnhpKFGN2mldN62vbl0Tt29dhdZ GPw/uLyzh8SahaT6jYW81oJ7WKWEiMlnKkxvKyhZd4WFZIlzlNjJsSuCthMsjUhh8XWi5wTWicVZX3s5pNSulFSp2fupW5YnbRqY2rCVajTajJrdpvV9LqLa5bNu09NW07s8j Jtv4ItbfUtE0rWY9NurCKBTpouIrbZJK370IA6yRqRJCu7eGKQxRE7Qvl NjKk2peyUnyW0a05n8Vl2s1ZybklFRd94 tGlTiveaTl5626dlfulo73XnzWpWXhXQJre12XVnA8U1yJ76Wya5v541Yx3DTyXDmBQhYjzFUHLM5LbaKjjU5ZUPeVr30u3ra vu j063elhRjTbU9Pn vXy/I4f4g6l8ObpXitfF0WpQ3KNfXSS6xJcSC4WQEtmMOFdvMZdrksGa5ZSqOxG1R1ZyjJN66v179Gr r1v0Z5tV4WF43Ta8389r3f6Gcfiz4NstKg002n2yBphPcvdOzbZlm3eQYmkWVi0hRjIcEKGyrFm23hcPUS5r6/N9 m/bVNdTDFZhhqdovb5HGS/EXTr2yhax06zt7WYT20WYQ32fzGOyJHJ2gbldi4AbDjkEMa9WhGUdWzyKuNhUsox01/4BlJ4kW/bGomz0 zjuFna0ggZopE Zsvl9sjK0khJbHDYHHyV6ELNXbPLlVnf37JJ9Fv8Aj h5tqurJPrVx5l3bmNJmdwjMYpWDY UBQcHBPODz0WtFduzPCqT557la7vg1lFbqIUDIifvIQSmOhxjrgfkfxrqjC8bBODktSGbU9bighgsfEl3GqIUCpO QvQqMHCg46fh0qORR0M5Rq/Zm182UZr3xBcO7zeI9RnZslw1yxzxjnLHPH9K0vBq1jjnRxO/tG/Vv/Mqtd60I/Ka5kKcAq TwOgDHnt0zUWSldGEqWJ5eVvQqG/v4YTbRztEkn sGOH5yMnHPJJrop2OZwrRtFMZNd3FwrBxGd2RjylUHnOMAY6jrWlm9noQ6VR7otf2hfLbrbK6hFPZVzzyRzwPwranHVE1Y1FDl6EcbzI4eNwFzkl1BAPPGa3tfqcrpuOyLMEl08sdusMbowJ RSCTjvycdsYxVpzi7boy9m5O1j3dvihqEqC28PwQI0SiJbq5YuGZOmWH3jkFSSoySCSvOex0o1NIrQ 2eaVk7osQfFO d1mWR7q7jV5QqQBbcthg6PEDtKkEEj5SSud2AKUsHRS2FHN8U5aM1YPF3xF1ZTbalLPZRyOWWeO5msgsmWY7FU7pZACzbVR/uD5C3zV5WIwVBaTS 49ihjsdVS5b/Jtfl/kXdK8R LNa8 w8LXXiN7G4jL3kl9Lm2CSFl2rJKoZlzG7jfJGzEGMEYGeSVGnB20SWp6FPEYisv3ak/Xb9L/No6jRdU PUsU6JZX10LhozDLLZ2wS1kjVWk/dYFvKriTaA7oAqkjL1yyoYSTU07r0b1/r10O6jVzGMXFrXpt Wz 9F9Nb MCWFhr9npN7fLqhSS6l0uZZUUG5EgXy9klyFwRu8udh5bFUZQxrz6mGpTXNSab7ta9OulvwdtOp2062J0c07eW3Xpq38mz0OxOpavpWnaR4g0DwfNpWh/aNV1C51fVnubx4F2u0RS78mWIInyhdxX5k3FR8w8XFKVVQhScfdbb5mk2raRtzptaO0U1f8V6lNuN5VE3dJK12lru7xst9W09FbyM7UvD3xXXULe9 Gfxf1nSvBb7YANQui nw8qm2OTTnuLVhI0hVULI5bqpO126MQvq9L2anONO292op9U3Byjr0s7t6Wu1zclGlPGVeZRjz7pO12uluZJ6eaS0uvKDxl4I MWh J9IsdY1DRQmqhop59NSxhvjcnzhCTJbwrdFGEcjCMNucBgCHVguKw8qFKNPEUYxcnpZRk9bpXcbt31tffXqtNI1ZV6jqUqj0Wt24/dft5PT0evMz D/jBoVnazXN7oyzwm5ihH m3l7DNuRp4508ucLOVmj 8ynG3J UkZKOEp2cbrVrl0Wq3Vrqz1V7q/obw tT0uns76vR3s9ne vU0Lj4feNtB14XGstYR2dvFOIbe/uLWzNzIg by1tkYkkNtRWYBsspQgkAnRpwvzaPXr29Xv0Vt3or62uPtXJdVp PojiPE3hHXbnWnstT0iyt5YQgWKGLzWuYZF3hUmmjAXKNkAAoVkGD0J5I1nTXK7t fZ6q3k1qtbNbCqYb2suayttpr6/NbM4/xT4VsjexaRdeHJrm4mjmuRPC8Ej WJMtNIU VXxEdyOAFEoOdrbh2Yeu2lzSX9f1/SPOxeApTunC/9fcYvi2DTLQRaNpNxNNPGQIvNsTH5qmQBTIH2sq /wA4J6BFxXq0qkpxvF3PJxOFhTShFa n9WOHlutBW8eNdO824Z2idWmYhHyAV3HgDOSCuOvWtozjfRank1KNNN2X5kDwxys8UWnTrDFLJIxV98jhRkKRwuEAJ3YHXJz0rsppykjinRV9EZNxCFVguqWu2JGJSRAigHoOME9 2M9ua9JWS3OdwsQywW06xxWs8Bfb85S4XBOOmeB lZPyDkuMGm3lrD5kM80W9HX93IGDgjDAbD7nIx6 9JMXsjL8i4EmwytuxxuVkOPxo925DpMlE0UMQie23ybgWkaUHI/u42g/ Pd/amnZ6CcGlqiOGbykbzLKGUO3Qs64HHTBwOnH45zxWykkZWktkWba4095B9psJgHBV2juCSD2OCCP5fWk6klsSoRbvKJa zae8aKWZZOm5kDZ9uGGM041pPQidKl2GfZbSVAQUfDD5C5BJ9gCea19u4bHJ9Wpzep75B4X8Jw6hcWOqtPqtxvkkVPDaG/xa/IPtKsVWI5JReQGU5DgNgjmXElOWkbO/wB336I/QZcM0k2pX RCNO8O2FvcSw6VZz28ksCxNd6pDFcFZlDqxjBbcEwVdd6cNtderHGvxDNJOWze5rR4eoU9YrXzZt2eifETU4G1Lwr4F1DVtLSQSW/9m20skTjarqq7C2dgR12jDRsFi4cc8083dVKUIua8lp/X/DevasulSvpZFm/i NVpZafqNtovjJGmLxT3Hkz25E3yoVaJXiC7QigmQEjJkL5cMeKvmsfY83w9PT77bf8AD e1PLq0pq3M vbf0t2K2tXnxfSQ6Fqdv4ispJfOgl1K6Lm3mBKbFM53LCd8SAMoVQxDFtuHHlrGwknCdS/py2t57W/4Y7J4OvF6QafzDw74M1bxpY3t5rVpfLqckgVGc3svnRqwZ3fyGc702xx5ZdpWTjJQVM8zouNoSe3p181/WlrmkMsqTfNUjZ r/Tr/AF0NnxlrHxH06TS/DOoeHY7HT475p7LUprs30bRu/mRETTxyTKClsGWMbJPL25jw/wA0ctHFJKpre/XpdPtdLRNbaNPrq3TrUHzxW3nf mdDfeM/jAnhjS7/AFm 1e5tHVZ7PRrVorUPK3mGR4/sreZJtjmRyg8pgZ2BURRDOVbknSVNSajDz91PXZd2pPs9bPSxtClWg eSvJ9l71rdettNtuvcZqvxQ OHiOKW70jX7Tw xikSeGHUlh y24jID3KFykLFSyK4Hnq0EafKfJJxwOO5X7OpU1XR6aLr5vZX1eit9kMTg6tXWELX63v8vLq i3OW8F6H8Q4vE1v4m0bwHL4lWKSW3bWYrO 1F7gMpAmWObKkL5sbRGaFcmNA3R8 phU6ikqTvy3921191r9t/mjz50qlNqdSO/2uvyd7d/xsyhpGpfFa70HXtf0vW9UvrBgyXEV29rqTSrJ5mE zzEeYP3cm5kjbciSttCowrz7qonJJ2Vtey6Lpe35X7O3Ry14qzlq/T56a/wBfIxL467oTT6H4M1fxJpj6dx9l1ZlWV2jMiuY0coEkwiAQfvGDow3ngN3RwcKsXOKTfpr n aaMajrxX7uTWnX9OhVsfil4zutNk0fxHq1lqNrJtklWJIY7rMZRm8uQoWTzFCRAOjoN0j7B8xq4ZfBRvypv8fxv6LR97HIsViZO057/Ibqnimx8TafOun BdDtXWOJGvNKuBbF0Vt8gnWQlcM8gCyOqk Ug3SMCTk6OKdS9JaeT079fu6Xsuu 7dKcbOK9epm3GkWKabdX8vhLVYUjuUtUvnKw2qPhi0busYR3bKMgDEbGyWxk1tTjjYRd196t309drdLa3MZ4fDt7WKGjeD/EHjvz9P0rUJYCiobb7VYNDAZHkRShcMQmVLYwCXKIigs6itqGYYiMnGUNV/VlcxnlKrW5Zaemhd0n4B6hqUpivviH4RjjwyIP9Mlkdyp8tQpiGFLbQxJyoJIDEBW7f7QcI801 v8AXc5Vw9OpK3PG3z/yMm7 A3irSTcvH4Wv9RgjvGsUvNPikltZZQ4QeW 0FgxK7c4PzDik8wp2utNbbW19Wc88hrQdnG/pqLJ8B/EEaWMMujX9tqV5LJG9pLFJ5lvtDFfOCr 6Zir7Y2w5CltoTazEcdFy9n1/rT1I/sKpZS1XqUtS D/iXRJYrR723V52ZRElykqHAHJ5xg8bWxtYDKkjBOU80jTaUo6eRpHh2s9VIevwd8R3WlNqtvLp9zBE7KyxZVwwKDBQDPJdcHGOeucgaxzSk9UN8P17X0KWlfDLxNqbTw6boM pPEjSsLVt7RxjqzKucDr1PY1pDMYzbjHVnP8A2DW3sVG8Ga7JC0yaQ0gXBxCm5gpIGTjOOSB6/MPWtaePpy0ckc1XJq6TtAkPgHxTbiO6k0C/jhkikmjDwMPMjiJEjLkEEJsfcei7GzjBreNZTej3OGpldaMbyjsZc1mUmwsDKrYOVAAB6c8AVp7RvZnG8Drse0Xfxv8Aixb2Fp4f Hng /v7yC5kv7DUItARbuJH8zJUQx/KqNISOoDYI27VC/Jck8PGnCpPkad07JN76L0u3 N9Fb9ceI5 b2MOZfN9un9fizY0nVPjBb E4tR1XQtM0JpJLpr/AFy41W0tpL3LksyLF /JbyU81hveRUjCY3ZbnwOGh7V1/aucVey5m90t/u6 mlzbE1aqioezUG93Zf19xPP4p8R298L7xRpHhTVpI7uC9OuKHmmeT7OFEmwIilt6lj5oG5wCTKNzv7qyWGMcq2JgrPe/X5bP576t3e/nPMp4e1OD/r13/r0OJaW31QSXOp OtW3CQQw7rbzVdR1fHnKVYbU4ydxTJ6msfqOGwdFQw1NN asvwFHE1MRNyq1Gl9/6nq3gLxV4Oj1JNBi0DVb2FrkyMHummaS1Ekk7PNkMGSL7xRAu9UHmeYACvm0MtxM67jOkrNdNPOz6NbaHpfXMPGKcZt2fX8zgtd0jxb4i1CfXLDV49JDhyypCtraRSqrSMqKm4YLnaqlQQGXO1cmvar5GqkPfirem3y7adDzI46opXjIl0Tx58RdO8QR6t4beS3ntLUQxyWqJJcXDkZa5eWQZmncuxMvDHfhdqkLXLHI3zqcYpuOzXnro/wBfkW8wm04v4XumZRHxNu7S9hu9SDNfyRz3EbXpVw0QePa8RKBjhj1U4GNrY3Z0p5DUpyfLFK v3XXXt vqZVMdOoveZSv4vGdlcQC01dLGKdVjhtortxFDwyjauAu7MjKGGQMsSfmJrircPKd/bRVm/l5eurOiGYVINOnJrQs GpPiVLeyaFa/EiGGGQ3D3sN/dSvDDM0alldAjfO5UKu1WO6IH5dqtWFfJFJexgtO3S73uvOyW3RdjbD4 rGXM5a9X/wSfxn8VrPRtSutB0zwb4FH2W38uS8tdNmRJpZgGd2LqrmQLI0YKqihvnjVCsZTD6hVpSlS5uTS3fzvrdX6bNJbJWTWk8bTb53Hm69vlpZ/jr1um0chafFfwwdVN6fA2lXCxMxKeZeTwWwLkJ 6ebDqGkXIcsHCIpHL77hgq1LmVKbSd9LaLp5u3rfpe qec8XRm4udNaf1tt/XQ3Nf8XeIfE2talqnhrwTaWotbqeeNxpVqLiKFCy V5wjUvKrSADYoIKJtVdiKu8MnxGIUtZSfW76a37XettuiVtElE8fCMrqMV5266d7v8f8zI0v4p Hr7wpc C/E2k3P2Zbx7m11CGYl7QuMeX5XmBHXeFOXORg/N97cUquKw9P2CtKO2u6/R mn3aBNUK75paN/d/n8xNP8a2Hhuy0geHby uNRlvRcWVzDc7H8pHbzDMo4DK6AIVcHCs2AWDVvGpipRUIws2t7u716Wem3kZ8lGnrzaX6f1/mddpGv NZ7e6uH8P3OpXCm1uY7uAPNKlxPHtjjlmj fMm9yUDg YGwuGIq5ZfVcYybtby6 v3sqGKjFyVm30OTTUorqxbw9P4IL6vKF828e4kEsDPc8vHGrIuWUxxkOHCqrsFXkjopYDEYiSjNJpL56v v6ucsq9KEdNHcrzaoLYRWumpqVuoidp3lXY7zFRyFBGE3qyqQAdp56DClljm5NJr07jWMUUki/4V K3jRFNnY6ndW0UcbPObFvKluYxJvMZaP5nUEgruyAQOOBjbL8HO nTe2718iMRjHJWO10L4o HmudWmHgrT5TdwKFlW5lt5LdVAAVlh2xuGG3fhFZznDDJz2xwGGraRir21d2tvJd vcyWMnGTbK1v8V/D0GpyW9x4SsYLa6hWwLweaHQhVLtGJGYJIQrAO6sV3kqAcERTwODVXldPXbm17Xen YSxtVrR6GaNb8GxzT/2V4ju5bUOZfsst1HuPy/ICwUbyGxkgAkAKOcMN1keDlG8Kmpl9eqRdraEmrfFqSysjpZvLhba3PmSRiL92XI4dlCnJwQC/OQFB4AA58VgKeGouGrt/X9MuOKnVd0YknxmubwTW41bbC8aQrstYjIqBnbCPw8fMjk4OTuIPHFeLUxlSNTkp6R22/po1cZSjeTL l/E7ybiF7OC3nlsv3cbtbQ aGJJDFwmc5JGSdwGBkADHbTq1qlNwpK7jo72uzn5YwmpSOeay8I2 p3lyfHUUe8pChRGV5EPzFsSFUC4AIChgN2Oxr0quV4TES5qtRaNeb/HRfIqGLq0tIpnUaR4w0Hwzp9pEuvnxAtmd0NuLl2Ej53fvfLbOPmIxx/FgZYmurDYHAYCN6bTf5 tvu7fMipi69bSV7FHV/iDdeIZrqaDQbOz2OqxWVij Vhm3MAjZj2IUVuvuON1VLHxS5d7f1ttoR7OU3e1jmdT1jWmf7TYW1vAIlJjPkogwSdzfKcZyTjA9R715tbFQcnKFtPkbRpSRraJ4j1l75RqVsbe2jjbCxEk8HGBjBTnAzzjOcV0UczhGVpqyF7Cb2NqDxbBdJHa3mpyW5UmRBMxaMBEB2/uUfy85A3EhuTwQRjt uUqsVedu1/8AgXsLklHSxf0/xF4dtrZ47W/mZJpklMrEkBZFADGN1LLnJ 7jHJA4K1pTq4eHwz3/AF9dv60FJSktibUPHQjg/s wFtPbWLs8bGNZZzkjDM6qpfjbgHABIwPm YqYujTbcZJ/O5KhNqzRiX3xMvbe1WFNNaeV2JijEUgZR94Nh1wTx1G48 nNctTNaXLpq/n/AJf5lqjNPYqn4t6voEUohhmlub2CW3mmt2TY0BwWjYqdxzhPlbg8enGFXGwhZys5feXFTtogtfiDpt3/AKW6LHMkTHJ0xpvK4DNhdo/hJHB59eMDrhjcNNKUpK/pexjKFTZIR/Gvh/V5fLvYLkafEEZ7eSBcOcjD/vQQDgnGF4Jzk9KUsThMQ7OXu9v HHy1YLYdf/FnXpLl4r/xHeapDaxiGElHdAiKAioM7CoGBgHH0yAGswpYeTi53/r7hSpVKivY469vvDl/ItwtnqFvLNITIIyiGUk5Lk7WOfmIxnseec15mIeBrT57O7/q50QVZRsael65oOiqj2en3HkwK0aQqMliBnCsTuAJPBYD5gc9K7aOLw1BXi9NV v3a/eZOlUk9jq9F8eaLqrySDURp8Nujwz2MbzxboTkM0ZIO3hgdzDbuYbt3zCux4jD4qleLV 2v3kwjUpzXNsdJea4kNze3lrpF/FavaTQ2tj9oH2W3uNuzzDLIsokQL0X5ZNw4eIgGsoyxipezTs j6fr/XY2n7Fy5rfI5qDU/slxa2C29paiHFwyGVJ51dxHuRtw3EDChQ2VXqDlmJ6sPTnSkm qTev4WOWrNNWSOb1nxbPbPc2smgyGQybWFiqrOy8EmQbU nOc5/LSeIUIyUo6 W/zWhkoOTTTMCHxXJLfO1toJWMxBWeMKjBdwIYgHDHdj5ictnn0rzvr0HPSHTyv/Xn1Nvqs7XuOuvEekag6XF9oty67myZghViRg9CQCQc8dwOaxxOPpOz5X9yKhhpxV7lGD/hHrGKd7eLypLhSouACSoBBVOMEHB5OOec9qujXoQjzLr BEqU5MuWc j6rizsWZpIeIlljUb1AP3Q3OQfmK47Lkn5q7KcqGItFPVd/ CZThUp62NOXw1bWtvHGvkyySPuMkVwkTyHo2WKDrkDOTzyc4yet5dSSu0r99n562Ob6zNyersV18PXMSqIYUAaEER5A TrtDsGBI68dzwBWUcuUJWgrK34dru5bxF1qehDwgkMkgudLmhkjuDGjTQmCPG0bixIAURlkBDN1YYBWvh62Pm07aLufUU8JGLTepNe DPtmlJa6HoVrcappoc37280UkEUfniONnlWT9 zsWAEShQPJbc291XhWKrTXLGXr/wAB b7aWtrqzaNCF03Fbf1p/wAG/wCuhJ4ftdLs7vTPEllbW93aS3cRkacWkkcgdI1RvMY aEZZeEUNkSbmAAkjyliqyk3zWa9PL lbU2WFpyhzW0f/AAdV/wAHQ0pfBum6dp9zPrOjXwkuLRblPMLyJBHJDZuZvs8cbkHy7mFxJK4BPmBlyNjixuIfuTtd628tHe1 q3fr1Vi44Si7OOq2/Py3uu7NL4X EdT1KW9vtV8Pwz2kkskF1eXkAmto4YImneGZYJRLHKxggGVTeQ8mwORhoniJV2rPvo9Nt07arbydr2TNKWGjSi bV3W1urtp0e u6vY7FPgbo9g9/eXerabfa3fzIbe0W6togPNhZ5gxnKukgOJIx 5yBuTcHkKZQeInR9nzXk3o7paWerulZ6p2fbS6ba6VDCuunyPlW jet ndeav52tZ9M3gfwFrzzreeHYLaHyoGtLm6ba1 kk0lxFDDG1wZEJt7hycxyD5lyB5eBU61eUZ8rtZRfm7tvRX6x1 1bbTd1LC0VJJxd22vJdN XVKd1vG/4LkbXwH4Z1W6sb3RJLmTw9JFHPPfXmkTqyzK8SzxTSvcBpNwkXcsEheJolUIy bI0xxfKuac/d1V/mrXvJdGm0tbW0a95wsGre ktdr3drPtHTVaOVl530MfWPgI2ofFS88F2AVdH0yXzPs6Ost59llhLrMwVVXySf3bbGJTbgBnBB1qYvml7KDfk0r30vpsnpur6Wd1oc1LCxbU5tcvXda9tVvfbo99tuG1z4V3emeRJb6ZfOlzGPs0k06TQskSolxKt1FH5Tqj5bzGZYdm0Bm2E1FPGSelRfNNNdrp9Ve60vqrdLjrZeoaQfbRqz11SfZ272utia88BWWl21prMWhancXF3GY200XQkJvIzMXL7USbbsiifZErqUl WYFgFqtjFSfKnd9VfXe3bpp30e 9roYCMm/aJq3p12633722dkyhF4Oto2m8WXegMulXUYuE0nTbwedZCRikEdy0od4fM3BolYSGRBhB84lFyrTUVO115Pbtff8ALWzt3WLw1PncVp6r/hr/AC2v8iPWfCPw6stUgs11vUDosVxDHJdxPDJPMhaLfLJaIwe3ZUdztJOWVY8P5cs1OeIirKMtHs9NVpfS m/fstXqZrCvlvJa9V2 du m3mYH/CDaXq3i7T/DvhvX4HtL5xC2p6kFtI0Z2P38yEYCAPhcMxJVA52FqjilOp7NSXrt/X9W6GcsMox5rfIxR4W1S21FdJkjiuHLJsit2y0ok6AEdyGAwMnJC4zRHGq/LbXyJeGae g220fQLJpJru4cXMZ8yJIkIOVAHzSB/lHLEYBPyLg4JNZf2jUj70Fr/XmWsJB6SZAnhyKWNn0q6u41gjIea3Zl8uJcqAdoB2ksBnPJIBxwK2hnOIht Hb v0Jll9KRnDw1AJzJcTO9yFKsdnzs2TneTyc5PofcYxT/ALanKXNJX ZP9nRS3J7aynW8l3atMUAC4R2 b/Z5OOf0963qZ3VS9xv7xRwEb 8tCJobu2/0i3v5S8bFY85LA55IPbk8fn2p088rXtMJZfC14lXZdwyyOtsu10IJTjdjgn2OCByPfjiuulm0XK7aOaeDko2sRyWcrxG5aGSFDiIukLFSzdcYG0HjA/H0FenHFU6kVKLt8jldGUN0QSWscgJe3XzNvmHaQcE9CT2OQOp/TgaL2UtVuR7y0GWo1C3tHtYQXsyPLUGRht7gYzjjGc 3vg70qtSimou8DKVOE3d7gZLuFhHY6hdQK5LbfP75znDdMkk hJ/CpliqkHek2k/P8Q9jCWkkfRF34jjutFVL TTre4S7iuhbxabb2yIUTZtKi3AeJm2jyw5D W29PnBPyf1qXJoo3/wx09fd/J3080e 6Cbs29P7z/DUt6V4uistQgtbXRrK ksdIS3uZJLK0nigCSiV7qUJHcJIRFKgeVVWXcQGYmJt2EsVUtzUrPT WG9 vuv/AIHyd6jShe0r3/xS2 //AD/K3UN4 1e9uYdE1nxd4et9M1CxUR6bHotteRW7yqViI2WRz5DkRSrln3RzKocyR5HXrp zqOLuv5VZaej2vZ6X3tfrp7Clb2keZeV3d mq3tpr2vY6Cx/tLxLpUs9ppOjXVlYywzXNpOIbS3SSe5guJSYRGjbIraxZTI0Ekios7FWieNq0pzqVIuyhaO/uxdvlyp6JO9k7Lme1mqnQpUrRlzXe2srPtd3tq9tU3ou6IfB3jLT7/WrnRW0iLw458ic6lFaQiW0ljlcWse62jij2ooCtC0Mm79/5gjjjkK8kcU5QlD3Y67uMPu0ja7W109nZq9zpnhINRd232UpdtftbLrqktNHaxuy6lqF34ih IMmlaBpWj3tudUMJ8J263c1r9ohjkl3PCMEsqztm6d/ImEihdoc6c9ZN1XGPLpK3LFabaX76at35XfYUKUNKEObm G/PLfV/Pa1lG11Y2dQ8Q2t3qunaXJJpOrzazpMTQXEcenzX1hIbW0jYQRyW2C07SqjfaY4yRImE RQFWzB0rRowU1K2qUHrb0TTb0tbR330KjgZTUueThKLf2pWavve7vprdP1djIv/AAvrR8Q6b4k13TLZreKa10bTtButPS5V/LVY2uLwTLNFDOzyWYYxziR03R cJFQSbVMVNRVNpNNuy5I/Zsmn0T1Xurzu17pFKnSqJu8k0leXtJOzeq5Vo3bVp27OzTlbTbXPGZPl6fHY63b6vbw2ekWemabbXUVg8hktTLFI0aSMqPbxFw0YZTlWiIbiViFK0bJp/DaMbtNtaLl3aW1otvSx01MLTpe/Jyi4v3m3LdWbTfM1b3nquZdVIwdMu9f1iSL7P4I8P6XawS/bblIdCs7iQWDpOz3T7UjjeCISPGu3a0vnAB5z5lZ0cZVrtcyitL/Ar8vVpNaqOq6J81o8z0FXwdKlFyjOUtlZyfxN6Rve93votOX3uVb8XpXiq10PxJK9pf8Ag4N4evr3Vo7i4gju4IZTHhJI5rYuwJbYkUY8pf8AR4E58wBJjjcRTqct4XXNa0Y2sr2d1DdaPdLTW5NTCUa9PXm1tf3pbvdNN6Lfz3W9jItdVvdP1y98ZeI/DUnijW9RaR9Xm1mzt7yz xxyxwfbYJHhEMGZUaJXaOVGBGeVBkazCfx1IJuyuuWO217pfzaK91r3sY/UYwfJGTjq7Lml91r3210tsXNU8eR F/EWr6LqGjaLbx21y5tVuPCum29yiG2H2Uqvlq7uqKsiYwDuwwxKGhuWJUOenOK76wirLo9t 19O 6I qxn7/M/O0pPXtv8A8H7jmR4s8Yarpsi2vhHwxI1wptLW5Gg2Z3SR4dkhR12lgfMZtgJzcAN8xiVcfrc3FWpx1292PZPt/wADX0s5YWHN8T/8Cl/n/VvU5zUfFtxdXBtwmgrBbzxXMUkWh6fHhlO4ZaGPMiAgja2VYZyo 6MXi6ik4pRt/gh/kL6rTet3/wCBS/zL7 NtXkZZ4LbwzAg by5fDGmq23sQxt QMfmvGM84rHzWiUf/AAGP RTwsH1l/wCBS/zID8QNZXzmkt9FEJbyGhh8OaZE5j3KxAfySV9jtbDbTjJzWkcwqR2Uf/AY7fcJ4Sm r/8AApf5mFLr rx3GrxGx06Oe/2xXXmaLaJ5YVRGRGohBt2A5Ji2ncM8tzWv1 cnZqN/8Ef/AJEj6rC97y/8Cl/mOHxB8RxHEuleFB1VwPC m/MuCcki39iR245p/W5NaKP/AIDH/ISw8et//Apf5kdx8Q/EUI8ttP8AC7lwCAvhfSzjIz2t/rx7URxM76qP/gMf8geHjbd/ BS/zKtv4s1W3sl0z zdHKCMIGbRLOSQ7YxGMyNFvJwOSWzuO45bJNPGTTvaP/gEP8hLDx2bf/gUv8x l ONW0g3JXT/AA8UuZmnkNzoVlcDeygEL5kR8tBgDamFGSQASSdFjqm1o/8AgMf8iXhYLq//AAKX Zq6h471VDCsNloLAQ bceZ4V0iLM247ljxE2eCmCSDkElRXZHH1aNuRpP0iv0OeWFhU K7 b/zMu/8AFOozTm/srLw7G8KZMaeH7BACu4EFVhHUSEEMCCQo5IUjoebYhxsrX9I/5Gf9m0U9b29X/mInjC6e4muo9K0O3nuBGHR/DthJCdicFEeEqhOSTsCqxbJxjm4Z5O3LVSt6L/IUsrhe8G/vf Z//9k=',NULL,'product_master',1432357993955717,1432357993955),(1433438961016790,'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wAARCABwAMgDAREAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4 Tl5ufo6erx8vP09fb3 Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3 Pn6/9oADAMBAAIRAxEAPwD6gtNE0vULIfYbiSAw4crJKzjg/wBwnaOueBXyOeYbE4id2/8AI vyutQpU WOx166db3cyT3qQu8cYGGJ7ccDp0/nXnSxeIo09Vsv6/A63Ro1J3NqxsyButii27NuMRX7gx0x6VxSxlPGwv8Aen0BwdB2NhTAVWOTBQE468VFBQj7vQwnJ79RsYPzQSbXiI4J7enNepSgvkc1SV9UWILP5Qw5BPBrup0tFY4ZyszW0qOwuHMf2uISfxRnhuuOh969TBPD1JcnMubts/x8zkre0irpaGvJo9oEbzIfNU8Yxyo716s8JSmuVq5xxxEr6OxnyaBp8Mc1wlsnmlTtcjDY9M15GMyHDRjOtTprntv1/rsd9HH1eaMJS0ucXBrcd3qJ0 SzltbmLeoLMGQ 6njOR64/rX5wsWq IVGpF0qiutXdeqemj87dkfSui4U3OL5ouxieJdciTzNOWMARIDG 7bkhuAMcj8fTvXzOZ5g61R0Le6uvo n/AAfU9LC4fkXP1Z5zqms61cS/aPtDW8kYKhxIcgdMZrmpYmPxNts7o001ZDxpekX3h6KKa8F5ql63JkkdY4zuxnnjcASck4/lXsYWvQjBJP339y1/PrfZGNSFRzd17q 9/wBfeeYeJvDUumwyXAt32Z27lyea93CVpxlaWhx14QlG8Tzu8FhOJAxAPow719FSpvc8ipNHHavpunzlwXjwBzgivUoU6is4o4akoPc53 ydN5IuHC5wVB6 9ewlUitTz26cnoWtM8E3 vpcyaBaXF3HYIJLgxxlliBzgsR0zg4z1xWdXGxw9vbaXLp4aVa/s1exlX lyWigTxbQ3IyMZ967cPiVNe4znq0LP3jDu7Lzm3q2SvQZrq55nO6cWZGpxXMq WIzgcGr9o7HPVpNqyMC60q9lOyKBiPYVccTys4KmDlLoS2 i3sQ/eQuFHJyDQ8TzMSwE0WrexYwujqVwcjbjn61tHEE/VXqrHbafrGhR6HHb6lof2qSBJitzHcvFKZDD5cauDlDGjHzNqqrMwUF9oZWHXrNpRnZaaWT/HfVafjudSo0uS8o3du7/LY yb34m6THCjaJJPFM0R3OzqwDHGMeo65yK MxGMr1VaUEj7Shg6NPWEmbmifFG71QxLfiGC3WMIdoIcnu2SeQR2/WvBq4lwclUjdM9WOF50nB6o9E8J NdBhsFsf7bkCow efPf8ApXi062Gw8HTu0vM6K2GrVWpWR01v4q0iVSwuo3QHBcsBkdsDr/nr0rnpZlRc XZd3/lv933nNWwNSKv17EyeINNEpgSeN5B0O7CHg8BufTHp74rqlndCi/ZR96S Sfo9fTa3nbU5fqM5Lmei/H9Da0rW9Iuo3aLUIlMLhJUlbY0bEdCD h6Hsa93LM5wWJXMqiVt1J2afmn ez6M83FYStTbTi35o6CP ykurcywo1y 7ymCZPHX5un15zz0r66M8JGtBOKdR7afr/wbnlctdwk0/dW v6HRxgKg4wfrXpvVnmSd3cp6tNFbQedcELCOHY9F9z7Vy4qvHDU/aVHaPXy8/kdWEpyrS5IfF0OM1qDR9SW4a02yRxfI7DKgMVDAKSMMOQcg4HH4fBZy8DmftFRtKC0b26Jqzas 7d9NPl9PgfrGG5faaN9PnbXXQ8l8UalCkrR74WbZj5UYZ9Acmvx3E1KcqjjdP0v p9ZGNlqcReX8ZG24uJFUHJKgADmuum/dskbQ7hqN5aWFjFq2kSecY22ovnqrb8A9Pvdefzwa7cPzuSvZfmOTTTucNqfxemGmvZjTY7eeIPGEMh2Mrffyp4yeOf8AZHoK tw2FnNxvPRHkVq0IJ2jqeGeJ/El5LO/2cQordAFUV97l1CkormZ8vja829Lfcc3e/bZ7aK4gkaTdw Gzz64r14V6dObi0efOlUnHmuUbN4jqEcU9z5WSAzFC2B9B1ratWvTbiiKdJKdmbemeKdW8G I7jXPAV/cab9qt0gki8wMzKAhkDEKBtZ03bSDgcEtyTwVVTxNFUsRrb5HXSc8PVdShoV/F3jKLxLfXGqNaLbNcTPKURNoBJ6DHHFGAorCpQ5r2DF1XXvK1jiXvrhZflQlSeDivdVSFtzyHGaewyTVLlGG9iR7AU1Km0S/aJm3oPiSGC4iTUYvNt/402g5FcuIjGUXyPU6qE2mufY6jQPGmhWxu7PVvDcOp2c4zHGztE0bD7pDKeOpBByDnpnmvMxNKpKK9nOzXXc76NWEW eN122MmJfCH9pl7u0vYLUtuBQqzAenoat1K6p 402T7Oi53knYyNeis7aXbbzKYZAXUIfur2zXVh8Q5K0tzmxFGMdtj6F0zwL4ognEV/4SvYCpwziJiuPXdvC4/GvgsZnUFG8an9fcfZYbL53s6f8AX3nd6X8PtWtbVdTWb7PbNKF2TW4LYJ4YESnPp0718ris3nUjzJNrvf8A4B7lHCKFk7L vU9WHgPSprMGLUYlm2g5SIMgbAzwD ma5J03Xgpc7uaxk4SaUTndZ0XxNozRpaWtxfQOo2y2ihhn6DmvOlSlF 9/mjSpGFRFXf4qtgJZ9I1JAOpeFgMe/FZVJRiryOF4e7903bfx3q8ll9kv5yYR8oV0DED64zn61jUzB8nJe6MpYe2rNvQvHcnhaeK7WwUfaR 7LowDgnGVGQCcgge9d T8SPKKqqU47 v4dOhy4nL44qHJLY950LxRqGp2qtN4fvrefyhKY5UCHBOB94jrg/lX7fl2bzx1PmlQlGVr2atvtvbc JxWWwoS0qJq9tNfyuZHjbwVrPxD8PPZPqlzodwH3RBWDo2OAJFBxg oOR6dq8nO8lxfEeEcJSdGS1SvdPtzJPT1Wq7dDqwWNoZXV/drnT3drNel1 H4nF23gDxH4e0t9J1QS3Vuk 9ZbNiySIccbCwKnPJG0j3I4r8nxvDma5RGVHFQcqad703zJp2 zzJrX 5bTVtJH1NDM8Li7Sg0peejX4fqc1q/hTVL9bi6uLK7t8ybUVsEpgc55 YHjkGvj8TTxK5q1WnKKvbXdf5377HpU6lKVoqSf9f1ochceAfEFzMYo8Ju/wCep2j/ABrKhiarmoSVn56HZH2aV7mhb/DrVhoc2mXmsRxpIxfy1UlQ3GG7c8Y54r3KdOu0mpL0uL2lNvU881/4TeIIrZ5hbfaipIURfvGYf8BBI/GvWw OxNFpTi7eWv5GNShCom4s8s8Q C9NSNk1O2vra5QZVJLL5SfZiR6enNfU4LNqjs4T/E8fE4OK KP4FO5 At1e2cWo GteS4EybthjMB57ck8/lXuRzucdJWZ5jwMXtoJoH7OtxPdmbxTq7W8Kkbo4GDyye248L9efpW/9uTkrRsjF4GK1Z3sPwf8Ah5ZqBDpsx2rtLPMSx9TnHWuGri61V/xH H R0QhCC BED/Bz4ePZpara3qFGZt3n7s57cjGPp61k8Vio1OaNX8EaRjRcLSh JgXH7PvgqWcytqd qE52JsGPbODXoUs1xMI2ck2cs8NRlK9tB8fwL HUICXEN3c88tJNgj8FxWv9pYqS92dvkv1M/q9BPWJcPwh G8KhbPSnhPQyCYsx98NkD8K4KuYY9O/Pfy0OyFDCP7NjL1H4WeGkmU2IveDyWEeB Q5q8PmOLm7VNvn/AJk1qGHhrEzJ/hjYurIduOxzz/6DXp0sRUvds4JyhayRjXfwdtLrG 9MQHBI bP0yBj9a64YqaerOapyNaI xrXT5bd5JY1bdKdzEknJr8tnGunc/UIRpksmnvcqVni3qwIKknHPtXJVhWludEY0xLbw sEUkNtG0CSEFtjkcjoetcM6NfZFN0oov6VojWW4LLcSl12v5j5Dc56dB GBWDp143Te5z1KlNbHQW2kXdwgga5mjhzzGjlQfqRz tTCniJ 4m0u1zz6uJpwd1FN9zotD8K2UJIkaaSNsAo8hI le5l2TwbvWu0 lzx8ZmVRr3bJ h6PpxiS2SGJVVUAUKOwFfrOR4qnSgqSSSWnyR8RjFJzcpF8MPpX1KalqjgvF9RGOKyq14UVeTLi09jK1IrztPJ618HmuM56snDqerhU7K5zF pJOBivhcfOVRvSx7tB2OfvllAOVBH0r5ytTqN6o9eg1cw7kNuJClfYVzqlUvoepTatqZlyLnOUxwe4ropSrR2OpU6cjKuxcSkrIhYHg16NOpVe5MqEe5jz6ejEnyQv4V2RqTOSWHiUJtHchig/D1raNWoYPDwM6XQrkjPlHJ6j0raNaqjF4eBVl0W8AwqcZ5zWsZ1W7kSoQtYoyaTqCjPkE wNdcZVGc7oxW5Tl0zUx/y7nmuqE52MZUolZ9OvwP8AVkfhW8XJmDiitJp9/wD3Dn6VtFSZlKCKsunX5/gx FdUFIwlFFWTTb7 5XRFSZi4o4u38VeK9Qkit9J8UeMpEkDlLj 3Y4ySrNnCySsD8vTLc4JAPb6upHAt8vsY/wDgMf8AJnzUKuZP4cTJv1f Z0Nr4c J11awzJ4/8ZxszBvIOs2sqYI3D9756Mcg9MdCDngVy1MHgVq4R 6P R2wlmjWmJl97/zR0qWHjJJ7e1n1zxH5pULKJtbSCNSy8SZW8eRV4kIUo5 T73XHnYrD4RaQpQfyS/Q9KjWxsdZ1pv5/8E6q4tNEgvI9M1r4lyzRpmVImmeWYbifvp57uCF7qFwrdhurxK2Aw1SfLyRS7qK890melDFVoK0qjb7XL1x4r8N2txBZt8V79nuCSsllJJcCIbSNskce9ozkqf3hH3T05xyvJ8KnyySV vLf5W7 un6Esdr8bv2NF/iR4IES20fjXxJPMikEx2t/GGJUH0BHTIyx5YjpUVctwUY6K9r7Ra6f11 5EfW3J6v vuNDwp4u1C8kVI/GEv2eedYkOo212gSMd3kcoozj5mDDALexryo4blkveSTaXvJ6Lu3dWXdp6K5rOakm0n32/wCBuelWerX66OmqXni3QVjKGQLbizQyMAdimaaZx8w25xF BOWPsQpxWGVWVSHolS1dml705StdWv7nyvdvzqkGqzVnbv736JfLX/I82vfiZ4FjkuJbG4uTdTKyyGxjmhN1IWcqzL5fynlR8rE8nHQ7vl6lDAvmmoPmd7tXV3dtNqzta6Ts/wBb9scQ0 Ryuui7bLsN0bxvfalBcPpUOpXkrosRSXzFW1YdWVSAWHbLPuPXtgYU8BTqqT9ndtW12j6X1fq3d/I35nLWDIr/AFTxTE2Xt5J4MMXmZ0QqFGeAJsN055X6nJzzTyylHWUE 7sunz1/D59dqc6y0Zgz3DateD yfEkM8EmfNKh5FiJGAFIlOcE9M5960jQwaqcsYqz8tvTf8/Q7YTrNXTOC8XeGPHMyMLHxHGJWXymi xyomcKTJuEhZcc89MgYAzkexg6FCMl7q/8AAUcmK tOL5J2PL5vB/xTW6lh1PXHd0VWCJHMWZS3BVt4X0B5zyPUmvqsLh8PL4Yx/wDAUfN1pZlCXv1fuv8A5nEy6bqEgmVNe1C5Chcu93koWYfKQvUjcOp6AHvx6McNRjtCP3I8mpiMRZxdVv5/8MYmq2TxzrEup6g7HguJ227M5JA3g5B68fyyehU6UXb2a 5Hl1a K5rKrL vmV7TwxY3cipd I9cRpW3IIoTMCmAUORLnJ78HGQct0rsjCn0gvuRze2xK KtJ/16jf8AhC/Dd6s8M3ivxZDMAwgW300MknoXZp125PBxux6knFVH2cN4L7kVKVSaSVaafp/wUYzfD 1aKO4vPEesBSuWEP71snG3A3DOSfbHvzWkKsFtSX3I5nGpFXniZL vUqN4S8AJGiN8RfEbysDuT7BCoDZI4Juunvgd/StlVp7qmvuRzufLrLFy 7/7cp/8Ip4HaT954 1tFLYBNkjk uQLn8q6I1oLakvuRk6yvb62/u/ 3Hp4E8FyTmMeP9Txnj/iXYH/AH19ox0961jWvqqat6ITnG9vrTv/AIf/ALYs2fw38A3TOj/EHU4wvQnTojn8Dd/nXTGtH/n3 CJ0f/MV C/ SNCX4O AoVmc/E2bK48qOXTY97g9/kunCjBHfPUYyME sxje1P8AAfs4yVvrT 5f/JBL8EPCy6V9vs/iVokkkpby4bm4ihZtpAJKiR3XGV6r3z0yQvrkN3FDqYSty3p4lP10/V/kfVVj8NfhbrDySaNo/wA /HmW97LC6HkHhWCjnIOc8A8evPiXCKvBJfgfYYTDUVK8U7 rNLRfg/4Ytvs8dmnjXw/IY1nurmzvjJDKzMMRO7ozkqcnIUd eleJWxPKttvme1Swy5tLr5l6P4K F4dZEeoaZ4g1Ky2eYt3LfRhd3UAqNp3EdMA9OSua8yv7StO9S1lt/wANsdaw1JdG/wCvkdangzwXp95Z2Nr4FiZJpd8ktxJGdp2k YFZiWbIQHAycg9qzrTu1BrT8zelQpQXuos6voV/qhilDWGjWdy6ebK2tXCtJFgk4SPyxvbeRnewwTwd3PLOCcU4NRT7v/hu5u076m3pXhPw8ls81p4n1WWKTHmpFq1zLGyA5bCo 8k/MPlIyT909Ki1O3x ttfXbX tmV7O6/4L/wAzRax8IaPqtlba546uNKF0fKhe61jVYApUrlo2e52tjPPOMNgdM1hVUXUjCc S l2p2XmnzWt87a7GbhaLdr26XWvl/X3nZeGtL8K61mXwx8Vr aWIkSreazqLxjccBlxdQkqGDLwXzuQ5G7nTCfU60nDD4y0lupOStdtaWnSfxXWjk9Yu65jz8TGtFXlh210a12 U1tZ6pLdLYsa1e/D 8nttKvPF0OsT3SeTdxWus3LNtR2AkWISyN14wXz0IPrzZlUy9TpqpX9qp6SUZye2zs5yfyc7v7OqbfRg6OIcJxVPla1V0lv00ivvUXbr2Xl/jDxLpUls8uiXOm3kVzebJ4W1 Sylg2liW2okjJGgxkhVHLBtoQivK5Y117VJ8rk9E7PR6d9LPR2t06WPUqS5P3ce3Vv8  m2/XzMweNNA0TT7m7tdek1GaWJZ/s8VwtzG0jnACSlgqr97K5IBB74xo4Sjdfaa2fd d1Zd0r6 drQpwhre/o7mc2vHVjdXFiJ7jMJMToZJLeZFVmUoUB2t1 YDPQYPy7uGOFqOTVr/N2t0 fnfy9d1iI2uvyPPp/E3h3xdqkmkW/iC5sIfLeK4ZdBnkUygth87OMBuT8nTuThe3D0JRqRTirdzlq4unO65n9z/wAjk/EOrfDZJpIdG8SvqVxHLunN5YXDktj/AFYEoTC5zzvc98n5RX0eGhOL1V/uPDxGKwtS8VL70/1Ob1fw0tvI93pmu6dK1wFiC dCiRsQGUANIrgfMwOQORz2NeortXaZ5NbDxqN zkjCXwuul3Rj1XxFohaVDKSl3CAqlgFAbzwBjDHAwfxPFOaTszgjgnTv7SpH8P8AM57VPC8oRtSlXQ4o3eWNI3jlfy1G0lhncCpLgBhk88HgV0Kel0edWwLhK75Wu1v CULSCe1t5bZ9IsdRgBaPaRkvleSD5o2bSoYHBzzngYpc92EoSUeWya/rzMnxBo9lpwW0uPCF7aS7mJ3RsrcMQdoJ5wePqPrnSnPzPPr4WMNPZO/p/wAELSx0a4tjDdX1lZxOpMH2yGUyoAM/wIQd2AucHnuAM1qm 4RpU2tV8ramfcy6PFBIsOn28rkjYSXXGCepyhOQecAfTOCN6blezZzVKEFG8YmW9w9lO6CwZyvA3K7YP0YnOOvPXvkcV30mrHm4ijUTvb8B8 rx3DSSx6Y8COykoIehx1AzwPp6e9dFmtrGPLo73XyJbRrVGku4nuo1jBZ2H ryT6Fj645546ZrQ55Jx1hcvq8t6Bcf2q1v5rNuQzRqqnpwMk4xnPuOxrNy6WLUZzfM5WPeF/aPv57WRoY2t3WRZEEds8fzAHoSSMHIBDZHycep frVk04rmb7W/Wx sxzOklzaIpR/tMfEa7vAumaPGkcYLNglUbJYhmA UY3diAdoyDznlpUMRUd1Cy9bfglY5KnESUrRjcq3/wAY/inq5Fhca7JBGyndAsAAnXrgsVO7 HkDj1zVTy b0d7dk/1OefEFeo7QfL8jf8K PfihZRRrouqxWFrbFFt3m0 3kmlL/IrFpkZjksoByAvAGMACa2Gk9NE116/jfc1w aYq3ut29N/nY1tM PvxasrpZdR1a11RZ90BtHtYIyZTgbleNQS69OQycqCCSMed9Vr2bcr36af0/wAtkejSzeunqrnZaV8c/i1Fr5WK10ZTLGsEGkN 9lV8NuXKsCr4Rn/eDaAOeuDnLDyw9pqTta1tH/TPRpZjWrycHFJ6aa3/ADNWTxr471bxFFNcfDn4f6elyyXVwkqQxR3Kc5y87lir42/3ywAU9M FiqM5uVSjyxW9uXS2r15u/XVN9NT0aWIqRahUjd9XfXX0X6addD3Wx IHijSNQubRvgPqGmTSTDeLbXH062hieTZG8qROwVeGJlZUHsM1q8YsBKpKrhnDW75KlSlFRb0ckny/9ve6uuiJeHnioQ5KqktlzRhN3620b Wr9SHxP448f6hMY7v4K6dqUeoQNLFO oxQOYhBNyIp1IwqqxG8JlQ4wSwNRWxGLxDf1mjBSmm07Waiozs2pbcqTaTS0T3ck1rThDD2jQm3GLSaut3KN1olu3Z6vVromn5w3jnxDqttJof/AAhPh28tp2EctlY3dtqL2aLGpUTZdU5UKPlztwcldpA8acKij7KE1Z2d7J6W0ta/Td20tbSzR6kKzfxw2urf1br/AFrczNU I1pe3QGp6fYWV o8mFLm/hhdXywMarE7bt2IfmEwUAHPI2nWVJ1WpVJarRW0S3ve2uvdNbdSPrH2bL57mH4h IWg6XBdXsmr Xb2d2bTI86VZ1SUoSrMV2sxzIASflUZUcsMJYWopc022lpfvr3/AB/RdIqY2nCN9EcX4g JWbVms9ohu7SOeE39u4WZ2YZGxVYj5Dk5ycMp5DKD24fD zSbuu39W/rzPPrY9SXu21XZnISavdfZmnRNHASUyzzW9xN/pCKOSny4VwCzZYkY3Y5AV/osPKTWjPEqYyUXqo28nuVLm68B2zGJ7LVXZ7VWFtHc7Xjl5Yu5EC5QhowMY6E5weO6Nara119z/wAzkniMLG65f6 45fVm8MQXN0NOn1EWspjVo5bOQb1JBCbuTwFBGRgnGNwG46qU09Vc4p1MG20rpfP/AIcy30jw1c309na6xbMkabiy20gwADk8wll/iJ3Y6cdqr2j2t/X3HO6OFk9H/X3EOoeHvD62p2zxG5xEY7eTcJZEYZLKduzHTgdMnOCOa9skZ1cLh3H3dbFZdE8Fw6gIbG/1hmlj82U2sIDx45ZdgbDFV b5TjHftWirPocjoYOjL3b362GXmkabaSC30PxJqMtqs/7sm2lixKFj cKxyPurzjICoSo4A1jVlfWJhKdGP8OT/FHPSyma1 yx6rMYmcMxkQhc425HViQMA8Zxj0ranVXY4qk4y 2ytJHqTSxh9TuLpoFyomVpQi53YAYdMlj9c11e0i9bHNaeijUb9dS8D4imAn 3QpAq7B5MaRIcdMoFABxzyMn8c1cakHsjGpGundz0K0lhriB/PiuJRIvnDYoXevHzfTHpW8KkZbOxzzhWSak7oqI2 IvAlwkj4KggYHbrkY6H0/rXRJylszzr7NM sNN8A HZ7aX7fbQWN6C8kKfZobichshX3bzxnnPrlcfxVwyxag/ch H6n61HK6b1mzX0vwTpekyQlLxbosyIk13ZFvL RwGEYKhN3GDyMnqTxXmYjHSktbp qO hl9KnK6SfyOotvh/poubTUL63Y3QAXzWLrEhHLlItxXLFRnI7MBtBw3kV8yqQSSdvM9SGWUpSUmtTc/sHTrW7jjaz0toIGVbdrl9zKECkIiheACMj5iQQCOB8uKruqm5y Zu8NCDtGKLVv4VsoNNubnU4bS2tDGIpJLeNIrVB8wjB3RHGQXOC5XO7HXNS26tNqT9Gr28uhcaMYO7077F2LTdE8SasrG21YaHND5Lf2hYqlrGA7ESSxzDezMyoMkyDHzAAkFonW5JNJNRXV7a9evl1b1el7GipRnZtX8v6t i/M7v/AIVbrGsSwaz4J8VapbzGwu3fT9K8SjS7i5cjZlswSZwc7SSCrGLfyCR0YelXrQc8NPmk4t8qmoydnt8Ltrom9VonZ3tx4ydKk0qsWknbm5W46r1Wyfzs7XOiT9nW91O7TVNY IWux2Ai 0xWV7b2hmjl8uJd11JhxM5CPvf7zbYyzsY1NOtwrDMF7XE1HGLTdpKN02lrPVxb/m72V5HNHOnhpKFGN2mldN62vbl0Tt29dhdZ GPw/uLyzh8SahaT6jYW81oJ7WKWEiMlnKkxvKyhZd4WFZIlzlNjJsSuCthMsjUhh8XWi5wTWicVZX3s5pNSulFSp2fupW5YnbRqY2rCVajTajJrdpvV9LqLa5bNu09NW07s8j Jtv4ItbfUtE0rWY9NurCKBTpouIrbZJK370IA6yRqRJCu7eGKQxRE7Qvl NjKk2peyUnyW0a05n8Vl2s1ZybklFRd94 tGlTiveaTl5626dlfulo73XnzWpWXhXQJre12XVnA8U1yJ76Wya5v541Yx3DTyXDmBQhYjzFUHLM5LbaKjjU5ZUPeVr30u3ra vu j063elhRjTbU9Pn vXy/I4f4g6l8ObpXitfF0WpQ3KNfXSS6xJcSC4WQEtmMOFdvMZdrksGa5ZSqOxG1R1ZyjJN66v179Gr r1v0Z5tV4WF43Ta8389r3f6Gcfiz4NstKg002n2yBphPcvdOzbZlm3eQYmkWVi0hRjIcEKGyrFm23hcPUS5r6/N9 m/bVNdTDFZhhqdovb5HGS/EXTr2yhax06zt7WYT20WYQ32fzGOyJHJ2gbldi4AbDjkEMa9WhGUdWzyKuNhUsox01/4BlJ4kW/bGomz0 zjuFna0ggZopE Zsvl9sjK0khJbHDYHHyV6ELNXbPLlVnf37JJ9Fv8Aj h5tqurJPrVx5l3bmNJmdwjMYpWDY UBQcHBPODz0WtFduzPCqT557la7vg1lFbqIUDIifvIQSmOhxjrgfkfxrqjC8bBODktSGbU9bighgsfEl3GqIUCpO QvQqMHCg46fh0qORR0M5Rq/Zm182UZr3xBcO7zeI9RnZslw1yxzxjnLHPH9K0vBq1jjnRxO/tG/Vv/Mqtd60I/Ka5kKcAq TwOgDHnt0zUWSldGEqWJ5eVvQqG/v4YTbRztEkn sGOH5yMnHPJJrop2OZwrRtFMZNd3FwrBxGd2RjylUHnOMAY6jrWlm9noQ6VR7otf2hfLbrbK6hFPZVzzyRzwPwranHVE1Y1FDl6EcbzI4eNwFzkl1BAPPGa3tfqcrpuOyLMEl08sdusMbowJ RSCTjvycdsYxVpzi7boy9m5O1j3dvihqEqC28PwQI0SiJbq5YuGZOmWH3jkFSSoySCSvOex0o1NIrQ 2eaVk7osQfFO d1mWR7q7jV5QqQBbcthg6PEDtKkEEj5SSud2AKUsHRS2FHN8U5aM1YPF3xF1ZTbalLPZRyOWWeO5msgsmWY7FU7pZACzbVR/uD5C3zV5WIwVBaTS 49ihjsdVS5b/Jtfl/kXdK8R LNa8 w8LXXiN7G4jL3kl9Lm2CSFl2rJKoZlzG7jfJGzEGMEYGeSVGnB20SWp6FPEYisv3ak/Xb9L/No6jRdU PUsU6JZX10LhozDLLZ2wS1kjVWk/dYFvKriTaA7oAqkjL1yyoYSTU07r0b1/r10O6jVzGMXFrXpt Wz 9F9Nb MCWFhr9npN7fLqhSS6l0uZZUUG5EgXy9klyFwRu8udh5bFUZQxrz6mGpTXNSab7ta9OulvwdtOp2062J0c07eW3Xpq38mz0OxOpavpWnaR4g0DwfNpWh/aNV1C51fVnubx4F2u0RS78mWIInyhdxX5k3FR8w8XFKVVQhScfdbb5mk2raRtzptaO0U1f8V6lNuN5VE3dJK12lru7xst9W09FbyM7UvD3xXXULe9 Gfxf1nSvBb7YANQui nw8qm2OTTnuLVhI0hVULI5bqpO126MQvq9L2anONO292op9U3Byjr0s7t6Wu1zclGlPGVeZRjz7pO12uluZJ6eaS0uvKDxl4I MWh J9IsdY1DRQmqhop59NSxhvjcnzhCTJbwrdFGEcjCMNucBgCHVguKw8qFKNPEUYxcnpZRk9bpXcbt31tffXqtNI1ZV6jqUqj0Wt24/dft5PT0evMz D/jBoVnazXN7oyzwm5ihH m3l7DNuRp4508ucLOVmj 8ynG3J UkZKOEp2cbrVrl0Wq3Vrqz1V7q/obw tT0uns76vR3s9ne vU0Lj4feNtB14XGstYR2dvFOIbe/uLWzNzIg by1tkYkkNtRWYBsspQgkAnRpwvzaPXr29Xv0Vt3or62uPtXJdVp PojiPE3hHXbnWnstT0iyt5YQgWKGLzWuYZF3hUmmjAXKNkAAoVkGD0J5I1nTXK7t fZ6q3k1qtbNbCqYb2suayttpr6/NbM4/xT4VsjexaRdeHJrm4mjmuRPC8Ej WJMtNIU VXxEdyOAFEoOdrbh2Yeu2lzSX9f1/SPOxeApTunC/9fcYvi2DTLQRaNpNxNNPGQIvNsTH5qmQBTIH2sq /wA4J6BFxXq0qkpxvF3PJxOFhTShFa n9WOHlutBW8eNdO824Z2idWmYhHyAV3HgDOSCuOvWtozjfRank1KNNN2X5kDwxys8UWnTrDFLJIxV98jhRkKRwuEAJ3YHXJz0rsppykjinRV9EZNxCFVguqWu2JGJSRAigHoOME9 2M9ua9JWS3OdwsQywW06xxWs8Bfb85S4XBOOmeB lZPyDkuMGm3lrD5kM80W9HX93IGDgjDAbD7nIx6 9JMXsjL8i4EmwytuxxuVkOPxo925DpMlE0UMQie23ybgWkaUHI/u42g/ Pd/amnZ6CcGlqiOGbykbzLKGUO3Qs64HHTBwOnH45zxWykkZWktkWba4095B9psJgHBV2juCSD2OCCP5fWk6klsSoRbvKJa zae8aKWZZOm5kDZ9uGGM041pPQidKl2GfZbSVAQUfDD5C5BJ9gCea19u4bHJ9Wpzep75B4X8Jw6hcWOqtPqtxvkkVPDaG/xa/IPtKsVWI5JReQGU5DgNgjmXElOWkbO/wB336I/QZcM0k2pX RCNO8O2FvcSw6VZz28ksCxNd6pDFcFZlDqxjBbcEwVdd6cNtderHGvxDNJOWze5rR4eoU9YrXzZt2eifETU4G1Lwr4F1DVtLSQSW/9m20skTjarqq7C2dgR12jDRsFi4cc8083dVKUIua8lp/X/DevasulSvpZFm/i NVpZafqNtovjJGmLxT3Hkz25E3yoVaJXiC7QigmQEjJkL5cMeKvmsfY83w9PT77bf8AD e1PLq0pq3M vbf0t2K2tXnxfSQ6Fqdv4ispJfOgl1K6Lm3mBKbFM53LCd8SAMoVQxDFtuHHlrGwknCdS/py2t57W/4Y7J4OvF6QafzDw74M1bxpY3t5rVpfLqckgVGc3svnRqwZ3fyGc702xx5ZdpWTjJQVM8zouNoSe3p181/WlrmkMsqTfNUjZ r/Tr/AF0NnxlrHxH06TS/DOoeHY7HT475p7LUprs30bRu/mRETTxyTKClsGWMbJPL25jw/wA0ctHFJKpre/XpdPtdLRNbaNPrq3TrUHzxW3nf mdDfeM/jAnhjS7/AFm 1e5tHVZ7PRrVorUPK3mGR4/sreZJtjmRyg8pgZ2BURRDOVbknSVNSajDz91PXZd2pPs9bPSxtClWg eSvJ9l71rdettNtuvcZqvxQ OHiOKW70jX7Tw xikSeGHUlh y24jID3KFykLFSyK4Hnq0EafKfJJxwOO5X7OpU1XR6aLr5vZX1eit9kMTg6tXWELX63v8vLq i3OW8F6H8Q4vE1v4m0bwHL4lWKSW3bWYrO 1F7gMpAmWObKkL5sbRGaFcmNA3R8 phU6ikqTvy3921191r9t/mjz50qlNqdSO/2uvyd7d/xsyhpGpfFa70HXtf0vW9UvrBgyXEV29rqTSrJ5mE zzEeYP3cm5kjbciSttCowrz7qonJJ2Vtey6Lpe35X7O3Ry14qzlq/T56a/wBfIxL467oTT6H4M1fxJpj6dx9l1ZlWV2jMiuY0coEkwiAQfvGDow3ngN3RwcKsXOKTfpr n aaMajrxX7uTWnX9OhVsfil4zutNk0fxHq1lqNrJtklWJIY7rMZRm8uQoWTzFCRAOjoN0j7B8xq4ZfBRvypv8fxv6LR97HIsViZO057/Ibqnimx8TafOun BdDtXWOJGvNKuBbF0Vt8gnWQlcM8gCyOqk Ug3SMCTk6OKdS9JaeT079fu6Xsuu 7dKcbOK9epm3GkWKabdX8vhLVYUjuUtUvnKw2qPhi0busYR3bKMgDEbGyWxk1tTjjYRd196t309drdLa3MZ4fDt7WKGjeD/EHjvz9P0rUJYCiobb7VYNDAZHkRShcMQmVLYwCXKIigs6itqGYYiMnGUNV/VlcxnlKrW5Zaemhd0n4B6hqUpivviH4RjjwyIP9Mlkdyp8tQpiGFLbQxJyoJIDEBW7f7QcI801 v8AXc5Vw9OpK3PG3z/yMm7 A3irSTcvH4Wv9RgjvGsUvNPikltZZQ4QeW 0FgxK7c4PzDik8wp2utNbbW19Wc88hrQdnG/pqLJ8B/EEaWMMujX9tqV5LJG9pLFJ5lvtDFfOCr 6Zir7Y2w5CltoTazEcdFy9n1/rT1I/sKpZS1XqUtS D/iXRJYrR723V52ZRElykqHAHJ5xg8bWxtYDKkjBOU80jTaUo6eRpHh2s9VIevwd8R3WlNqtvLp9zBE7KyxZVwwKDBQDPJdcHGOeucgaxzSk9UN8P17X0KWlfDLxNqbTw6boM pPEjSsLVt7RxjqzKucDr1PY1pDMYzbjHVnP8A2DW3sVG8Ga7JC0yaQ0gXBxCm5gpIGTjOOSB6/MPWtaePpy0ckc1XJq6TtAkPgHxTbiO6k0C/jhkikmjDwMPMjiJEjLkEEJsfcei7GzjBreNZTej3OGpldaMbyjsZc1mUmwsDKrYOVAAB6c8AVp7RvZnG8Drse0Xfxv8Aixb2Fp4f Hng /v7yC5kv7DUItARbuJH8zJUQx/KqNISOoDYI27VC/Jck8PGnCpPkad07JN76L0u3 N9Fb9ceI5 b2MOZfN9un9fizY0nVPjBb E4tR1XQtM0JpJLpr/AFy41W0tpL3LksyLF /JbyU81hveRUjCY3ZbnwOGh7V1/aucVey5m90t/u6 mlzbE1aqioezUG93Zf19xPP4p8R298L7xRpHhTVpI7uC9OuKHmmeT7OFEmwIilt6lj5oG5wCTKNzv7qyWGMcq2JgrPe/X5bP576t3e/nPMp4e1OD/r13/r0OJaW31QSXOp OtW3CQQw7rbzVdR1fHnKVYbU4ydxTJ6msfqOGwdFQw1NN asvwFHE1MRNyq1Gl9/6nq3gLxV4Oj1JNBi0DVb2FrkyMHummaS1Ekk7PNkMGSL7xRAu9UHmeYACvm0MtxM67jOkrNdNPOz6NbaHpfXMPGKcZt2fX8zgtd0jxb4i1CfXLDV49JDhyypCtraRSqrSMqKm4YLnaqlQQGXO1cmvar5GqkPfirem3y7adDzI46opXjIl0Tx58RdO8QR6t4beS3ntLUQxyWqJJcXDkZa5eWQZmncuxMvDHfhdqkLXLHI3zqcYpuOzXnro/wBfkW8wm04v4XumZRHxNu7S9hu9SDNfyRz3EbXpVw0QePa8RKBjhj1U4GNrY3Z0p5DUpyfLFK v3XXXt vqZVMdOoveZSv4vGdlcQC01dLGKdVjhtortxFDwyjauAu7MjKGGQMsSfmJrircPKd/bRVm/l5eurOiGYVINOnJrQs GpPiVLeyaFa/EiGGGQ3D3sN/dSvDDM0alldAjfO5UKu1WO6IH5dqtWFfJFJexgtO3S73uvOyW3RdjbD4 rGXM5a9X/wSfxn8VrPRtSutB0zwb4FH2W38uS8tdNmRJpZgGd2LqrmQLI0YKqihvnjVCsZTD6hVpSlS5uTS3fzvrdX6bNJbJWTWk8bTb53Hm69vlpZ/jr1um0chafFfwwdVN6fA2lXCxMxKeZeTwWwLkJ 6ebDqGkXIcsHCIpHL77hgq1LmVKbSd9LaLp5u3rfpe qec8XRm4udNaf1tt/XQ3Nf8XeIfE2talqnhrwTaWotbqeeNxpVqLiKFCy V5wjUvKrSADYoIKJtVdiKu8MnxGIUtZSfW76a37XettuiVtElE8fCMrqMV5266d7v8f8zI0v4p Hr7wpc C/E2k3P2Zbx7m11CGYl7QuMeX5XmBHXeFOXORg/N97cUquKw9P2CtKO2u6/R mn3aBNUK75paN/d/n8xNP8a2Hhuy0geHby uNRlvRcWVzDc7H8pHbzDMo4DK6AIVcHCs2AWDVvGpipRUIws2t7u716Wem3kZ8lGnrzaX6f1/mddpGv NZ7e6uH8P3OpXCm1uY7uAPNKlxPHtjjlmj fMm9yUDg YGwuGIq5ZfVcYybtby6 v3sqGKjFyVm30OTTUorqxbw9P4IL6vKF828e4kEsDPc8vHGrIuWUxxkOHCqrsFXkjopYDEYiSjNJpL56v v6ucsq9KEdNHcrzaoLYRWumpqVuoidp3lXY7zFRyFBGE3qyqQAdp56DClljm5NJr07jWMUUki/4V K3jRFNnY6ndW0UcbPObFvKluYxJvMZaP5nUEgruyAQOOBjbL8HO nTe2718iMRjHJWO10L4o HmudWmHgrT5TdwKFlW5lt5LdVAAVlh2xuGG3fhFZznDDJz2xwGGraRir21d2tvJd vcyWMnGTbK1v8V/D0GpyW9x4SsYLa6hWwLweaHQhVLtGJGYJIQrAO6sV3kqAcERTwODVXldPXbm17Xen YSxtVrR6GaNb8GxzT/2V4ju5bUOZfsst1HuPy/ICwUbyGxkgAkAKOcMN1keDlG8Kmpl9eqRdraEmrfFqSysjpZvLhba3PmSRiL92XI4dlCnJwQC/OQFB4AA58VgKeGouGrt/X9MuOKnVd0YknxmubwTW41bbC8aQrstYjIqBnbCPw8fMjk4OTuIPHFeLUxlSNTkp6R22/po1cZSjeTL l/E7ybiF7OC3nlsv3cbtbQ aGJJDFwmc5JGSdwGBkADHbTq1qlNwpK7jo72uzn5YwmpSOeay8I2 p3lyfHUUe8pChRGV5EPzFsSFUC4AIChgN2Oxr0quV4TES5qtRaNeb/HRfIqGLq0tIpnUaR4w0Hwzp9pEuvnxAtmd0NuLl2Ej53fvfLbOPmIxx/FgZYmurDYHAYCN6bTf5 tvu7fMipi69bSV7FHV/iDdeIZrqaDQbOz2OqxWVij Vhm3MAjZj2IUVuvuON1VLHxS5d7f1ttoR7OU3e1jmdT1jWmf7TYW1vAIlJjPkogwSdzfKcZyTjA9R715tbFQcnKFtPkbRpSRraJ4j1l75RqVsbe2jjbCxEk8HGBjBTnAzzjOcV0UczhGVpqyF7Cb2NqDxbBdJHa3mpyW5UmRBMxaMBEB2/uUfy85A3EhuTwQRjt uUqsVedu1/8AgXsLklHSxf0/xF4dtrZ47W/mZJpklMrEkBZFADGN1LLnJ 7jHJA4K1pTq4eHwz3/AF9dv60FJSktibUPHQjg/s wFtPbWLs8bGNZZzkjDM6qpfjbgHABIwPm YqYujTbcZJ/O5KhNqzRiX3xMvbe1WFNNaeV2JijEUgZR94Nh1wTx1G48 nNctTNaXLpq/n/AJf5lqjNPYqn4t6voEUohhmlub2CW3mmt2TY0BwWjYqdxzhPlbg8enGFXGwhZys5feXFTtogtfiDpt3/AKW6LHMkTHJ0xpvK4DNhdo/hJHB59eMDrhjcNNKUpK/pexjKFTZIR/Gvh/V5fLvYLkafEEZ7eSBcOcjD/vQQDgnGF4Jzk9KUsThMQ7OXu9v HHy1YLYdf/FnXpLl4r/xHeapDaxiGElHdAiKAioM7CoGBgHH0yAGswpYeTi53/r7hSpVKivY469vvDl/ItwtnqFvLNITIIyiGUk5Lk7WOfmIxnseec15mIeBrT57O7/q50QVZRsael65oOiqj2en3HkwK0aQqMliBnCsTuAJPBYD5gc9K7aOLw1BXi9NV v3a/eZOlUk9jq9F8eaLqrySDURp8Nujwz2MbzxboTkM0ZIO3hgdzDbuYbt3zCux4jD4qleLV 2v3kwjUpzXNsdJea4kNze3lrpF/FavaTQ2tj9oH2W3uNuzzDLIsokQL0X5ZNw4eIgGsoyxipezTs j6fr/XY2n7Fy5rfI5qDU/slxa2C29paiHFwyGVJ51dxHuRtw3EDChQ2VXqDlmJ6sPTnSkm qTev4WOWrNNWSOb1nxbPbPc2smgyGQybWFiqrOy8EmQbU nOc5/LSeIUIyUo6 W/zWhkoOTTTMCHxXJLfO1toJWMxBWeMKjBdwIYgHDHdj5ictnn0rzvr0HPSHTyv/Xn1Nvqs7XuOuvEekag6XF9oty67myZghViRg9CQCQc8dwOaxxOPpOz5X9yKhhpxV7lGD/hHrGKd7eLypLhSouACSoBBVOMEHB5OOec9qujXoQjzLr BEqU5MuWc j6rizsWZpIeIlljUb1AP3Q3OQfmK47Lkn5q7KcqGItFPVd/ CZThUp62NOXw1bWtvHGvkyySPuMkVwkTyHo2WKDrkDOTzyc4yet5dSSu0r99n562Ob6zNyersV18PXMSqIYUAaEER5A TrtDsGBI68dzwBWUcuUJWgrK34dru5bxF1qehDwgkMkgudLmhkjuDGjTQmCPG0bixIAURlkBDN1YYBWvh62Pm07aLufUU8JGLTepNe DPtmlJa6HoVrcappoc37280UkEUfniONnlWT9 zsWAEShQPJbc291XhWKrTXLGXr/wAB b7aWtrqzaNCF03Fbf1p/wAG/wCuhJ4ftdLs7vTPEllbW93aS3cRkacWkkcgdI1RvMY aEZZeEUNkSbmAAkjyliqyk3zWa9PL lbU2WFpyhzW0f/AAdV/wAHQ0pfBum6dp9zPrOjXwkuLRblPMLyJBHJDZuZvs8cbkHy7mFxJK4BPmBlyNjixuIfuTtd628tHe1 q3fr1Vi44Si7OOq2/Py3uu7NL4X EdT1KW9vtV8Pwz2kkskF1eXkAmto4YImneGZYJRLHKxggGVTeQ8mwORhoniJV2rPvo9Nt07arbydr2TNKWGjSi bV3W1urtp0e u6vY7FPgbo9g9/eXerabfa3fzIbe0W6togPNhZ5gxnKukgOJIx 5yBuTcHkKZQeInR9nzXk3o7paWerulZ6p2fbS6ba6VDCuunyPlW jet ndeav52tZ9M3gfwFrzzreeHYLaHyoGtLm6ba1 kk0lxFDDG1wZEJt7hycxyD5lyB5eBU61eUZ8rtZRfm7tvRX6x1 1bbTd1LC0VJJxd22vJdN XVKd1vG/4LkbXwH4Z1W6sb3RJLmTw9JFHPPfXmkTqyzK8SzxTSvcBpNwkXcsEheJolUIy bI0xxfKuac/d1V/mrXvJdGm0tbW0a95wsGre ktdr3drPtHTVaOVl530MfWPgI2ofFS88F2AVdH0yXzPs6Ost59llhLrMwVVXySf3bbGJTbgBnBB1qYvml7KDfk0r30vpsnpur6Wd1oc1LCxbU5tcvXda9tVvfbo99tuG1z4V3emeRJb6ZfOlzGPs0k06TQskSolxKt1FH5Tqj5bzGZYdm0Bm2E1FPGSelRfNNNdrp9Ve60vqrdLjrZeoaQfbRqz11SfZ272utia88BWWl21prMWhancXF3GY200XQkJvIzMXL7USbbsiifZErqUl WYFgFqtjFSfKnd9VfXe3bpp30e 9roYCMm/aJq3p12633722dkyhF4Oto2m8WXegMulXUYuE0nTbwedZCRikEdy0od4fM3BolYSGRBhB84lFyrTUVO115Pbtff8ALWzt3WLw1PncVp6r/hr/AC2v8iPWfCPw6stUgs11vUDosVxDHJdxPDJPMhaLfLJaIwe3ZUdztJOWVY8P5cs1OeIirKMtHs9NVpfS m/fstXqZrCvlvJa9V2 du m3mYH/CDaXq3i7T/DvhvX4HtL5xC2p6kFtI0Z2P38yEYCAPhcMxJVA52FqjilOp7NSXrt/X9W6GcsMox5rfIxR4W1S21FdJkjiuHLJsit2y0ok6AEdyGAwMnJC4zRHGq/LbXyJeGae g220fQLJpJru4cXMZ8yJIkIOVAHzSB/lHLEYBPyLg4JNZf2jUj70Fr/XmWsJB6SZAnhyKWNn0q6u41gjIea3Zl8uJcqAdoB2ksBnPJIBxwK2hnOIht Hb v0Jll9KRnDw1AJzJcTO9yFKsdnzs2TneTyc5PofcYxT/ALanKXNJX ZP9nRS3J7aynW8l3atMUAC4R2 b/Z5OOf0963qZ3VS9xv7xRwEb 8tCJobu2/0i3v5S8bFY85LA55IPbk8fn2p088rXtMJZfC14lXZdwyyOtsu10IJTjdjgn2OCByPfjiuulm0XK7aOaeDko2sRyWcrxG5aGSFDiIukLFSzdcYG0HjA/H0FenHFU6kVKLt8jldGUN0QSWscgJe3XzNvmHaQcE9CT2OQOp/TgaL2UtVuR7y0GWo1C3tHtYQXsyPLUGRht7gYzjjGc 3vg70qtSimou8DKVOE3d7gZLuFhHY6hdQK5LbfP75znDdMkk hJ/CpliqkHek2k/P8Q9jCWkkfRF34jjutFVL TTre4S7iuhbxabb2yIUTZtKi3AeJm2jyw5D W29PnBPyf1qXJoo3/wx09fd/J3080e 6Cbs29P7z/DUt6V4uistQgtbXRrK ksdIS3uZJLK0nigCSiV7qUJHcJIRFKgeVVWXcQGYmJt2EsVUtzUrPT WG9 vuv/AIHyd6jShe0r3/xS2 //AD/K3UN4 1e9uYdE1nxd4et9M1CxUR6bHotteRW7yqViI2WRz5DkRSrln3RzKocyR5HXrp zqOLuv5VZaej2vZ6X3tfrp7Clb2keZeV3d mq3tpr2vY6Cx/tLxLpUs9ppOjXVlYywzXNpOIbS3SSe5guJSYRGjbIraxZTI0Ekios7FWieNq0pzqVIuyhaO/uxdvlyp6JO9k7Lme1mqnQpUrRlzXe2srPtd3tq9tU3ou6IfB3jLT7/WrnRW0iLw458ic6lFaQiW0ljlcWse62jij2ooCtC0Mm79/5gjjjkK8kcU5QlD3Y67uMPu0ja7W109nZq9zpnhINRd232UpdtftbLrqktNHaxuy6lqF34ih IMmlaBpWj3tudUMJ8J263c1r9ohjkl3PCMEsqztm6d/ImEihdoc6c9ZN1XGPLpK3LFabaX76at35XfYUKUNKEObm G/PLfV/Pa1lG11Y2dQ8Q2t3qunaXJJpOrzazpMTQXEcenzX1hIbW0jYQRyW2C07SqjfaY4yRImE RQFWzB0rRowU1K2qUHrb0TTb0tbR330KjgZTUueThKLf2pWavve7vprdP1djIv/AAvrR8Q6b4k13TLZreKa10bTtButPS5V/LVY2uLwTLNFDOzyWYYxziR03R cJFQSbVMVNRVNpNNuy5I/Zsmn0T1Xurzu17pFKnSqJu8k0leXtJOzeq5Vo3bVp27OzTlbTbXPGZPl6fHY63b6vbw2ekWemabbXUVg8hktTLFI0aSMqPbxFw0YZTlWiIbiViFK0bJp/DaMbtNtaLl3aW1otvSx01MLTpe/Jyi4v3m3LdWbTfM1b3nquZdVIwdMu9f1iSL7P4I8P6XawS/bblIdCs7iQWDpOz3T7UjjeCISPGu3a0vnAB5z5lZ0cZVrtcyitL/Ar8vVpNaqOq6J81o8z0FXwdKlFyjOUtlZyfxN6Rve93votOX3uVb8XpXiq10PxJK9pf8Ag4N4evr3Vo7i4gju4IZTHhJI5rYuwJbYkUY8pf8AR4E58wBJjjcRTqct4XXNa0Y2sr2d1DdaPdLTW5NTCUa9PXm1tf3pbvdNN6Lfz3W9jItdVvdP1y98ZeI/DUnijW9RaR9Xm1mzt7yz xxyxwfbYJHhEMGZUaJXaOVGBGeVBkazCfx1IJuyuuWO217pfzaK91r3sY/UYwfJGTjq7Lml91r3210tsXNU8eR F/EWr6LqGjaLbx21y5tVuPCum29yiG2H2Uqvlq7uqKsiYwDuwwxKGhuWJUOenOK76wirLo9t 19O 6I qxn7/M/O0pPXtv8A8H7jmR4s8Yarpsi2vhHwxI1wptLW5Gg2Z3SR4dkhR12lgfMZtgJzcAN8xiVcfrc3FWpx1292PZPt/wADX0s5YWHN8T/8Cl/n/VvU5zUfFtxdXBtwmgrBbzxXMUkWh6fHhlO4ZaGPMiAgja2VYZyo 6MXi6ik4pRt/gh/kL6rTet3/wCBS/zL7 NtXkZZ4LbwzAg by5fDGmq23sQxt QMfmvGM84rHzWiUf/AAGP RTwsH1l/wCBS/zID8QNZXzmkt9FEJbyGhh8OaZE5j3KxAfySV9jtbDbTjJzWkcwqR2Uf/AY7fcJ4Sm r/8AApf5mFLr rx3GrxGx06Oe/2xXXmaLaJ5YVRGRGohBt2A5Ji2ncM8tzWv1 cnZqN/8Ef/AJEj6rC97y/8Cl/mOHxB8RxHEuleFB1VwPC m/MuCcki39iR245p/W5NaKP/AIDH/ISw8et//Apf5kdx8Q/EUI8ttP8AC7lwCAvhfSzjIz2t/rx7URxM76qP/gMf8geHjbd/ BS/zKtv4s1W3sl0z zdHKCMIGbRLOSQ7YxGMyNFvJwOSWzuO45bJNPGTTvaP/gEP8hLDx2bf/gUv8x l ONW0g3JXT/AA8UuZmnkNzoVlcDeygEL5kR8tBgDamFGSQASSdFjqm1o/8AgMf8iXhYLq//AAKX Zq6h471VDCsNloLAQ bceZ4V0iLM247ljxE2eCmCSDkElRXZHH1aNuRpP0iv0OeWFhU K7 b/zMu/8AFOozTm/srLw7G8KZMaeH7BACu4EFVhHUSEEMCCQo5IUjoebYhxsrX9I/5Gf9m0U9b29X/mInjC6e4muo9K0O3nuBGHR/DthJCdicFEeEqhOSTsCqxbJxjm4Z5O3LVSt6L/IUsrhe8G/vf Z//9k=',NULL,'product_master',1433438961016099,1433438961016),(1434200814656506,'undefined',NULL,'product_master',1434200814656156,1434201065400);
/*!40000 ALTER TABLE `documents` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `emails`
--

DROP TABLE IF EXISTS `emails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `emails` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `receivers` text,
  `sender` text,
  `subject` text,
  `message` text,
  `status` varchar(25) DEFAULT NULL,
  `type` varchar(25) DEFAULT NULL,
  `last_updated` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `emails`
--

LOCK TABLES `emails` WRITE;
/*!40000 ALTER TABLE `emails` DISABLE KEYS */;
/*!40000 ALTER TABLE `emails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `expenses`
--

DROP TABLE IF EXISTS `expenses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `expenses` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `status` varchar(45) DEFAULT NULL,
  `person` varchar(100) DEFAULT NULL,
  `amount` decimal(12,2) DEFAULT NULL,
  `detail` text,
  `source` varchar(50) DEFAULT NULL,
  `source_id` bigint(20) DEFAULT NULL,
  `last_updated` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `expenses`
--

LOCK TABLES `expenses` WRITE;
/*!40000 ALTER TABLE `expenses` DISABLE KEYS */;
/*!40000 ALTER TABLE `expenses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feed_comments`
--

DROP TABLE IF EXISTS `feed_comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `feed_comments` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `feed_id` bigint(20) DEFAULT NULL,
  `person` varchar(100) DEFAULT NULL,
  `comment_text` text,
  `last_updated` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feed_comments`
--

LOCK TABLES `feed_comments` WRITE;
/*!40000 ALTER TABLE `feed_comments` DISABLE KEYS */;
/*!40000 ALTER TABLE `feed_comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feed_likes`
--

DROP TABLE IF EXISTS `feed_likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `feed_likes` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `feed_id` bigint(20) DEFAULT NULL,
  `person` varchar(100) DEFAULT NULL,
  `last_updated` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feed_likes`
--

LOCK TABLES `feed_likes` WRITE;
/*!40000 ALTER TABLE `feed_likes` DISABLE KEYS */;
/*!40000 ALTER TABLE `feed_likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feedback`
--

DROP TABLE IF EXISTS `feedback`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `feedback` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `provider` varchar(100) DEFAULT NULL,
  `type` varchar(15) DEFAULT NULL,
  `detail` text,
  `rating` varchar(10) DEFAULT NULL,
  `date` bigint(20) DEFAULT NULL,
  `last_updated` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedback`
--

LOCK TABLES `feedback` WRITE;
/*!40000 ALTER TABLE `feedback` DISABLE KEYS */;
/*!40000 ALTER TABLE `feedback` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feeds`
--

DROP TABLE IF EXISTS `feeds`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `feeds` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `status` varchar(45) DEFAULT NULL,
  `content_type` varchar(30) DEFAULT NULL,
  `content_title` text,
  `content_detail` text,
  `content_blob` mediumblob,
  `content_url` text,
  `source` varchar(50) DEFAULT NULL,
  `source_id` bigint(20) DEFAULT NULL,
  `target_user` text,
  `owner` varchar(100) DEFAULT NULL,
  `last_updated` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feeds`
--

LOCK TABLES `feeds` WRITE;
/*!40000 ALTER TABLE `feeds` DISABLE KEYS */;
/*!40000 ALTER TABLE `feeds` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inventory_adjust`
--

DROP TABLE IF EXISTS `inventory_adjust`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `inventory_adjust` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `batch` varchar(45) DEFAULT NULL,
  `quantity` decimal(12,2) DEFAULT NULL,
  `product_name` varchar(90) DEFAULT NULL,
  `source` varchar(50) DEFAULT NULL,
  `source_id` bigint(20) DEFAULT NULL,
  `last_updated` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1432358025832741 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventory_adjust`
--

LOCK TABLES `inventory_adjust` WRITE;
/*!40000 ALTER TABLE `inventory_adjust` DISABLE KEYS */;
INSERT INTO `inventory_adjust` VALUES (1432358025832740,'Batch1',10.00,'Product 1',NULL,NULL,1432358025832);
/*!40000 ALTER TABLE `inventory_adjust` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `issues`
--

DROP TABLE IF EXISTS `issues`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `issues` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `short_desc` text,
  `detail` text,
  `status` varchar(25) DEFAULT NULL,
  `last_updated` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `issues`
--

LOCK TABLES `issues` WRITE;
/*!40000 ALTER TABLE `issues` DISABLE KEYS */;
/*!40000 ALTER TABLE `issues` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `loans`
--

DROP TABLE IF EXISTS `loans`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `loans` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `type` varchar(45) DEFAULT NULL,
  `account` varchar(100) DEFAULT NULL,
  `date_initiated` bigint(20) DEFAULT NULL,
  `loan_amount` decimal(12,2) DEFAULT NULL,
  `repayment_method` varchar(25) DEFAULT NULL,
  `interest_paid` decimal(12,2) DEFAULT NULL,
  `interest_rate` decimal(5,3) DEFAULT NULL,
  `interest_period` int(11) DEFAULT NULL,
  `next_interest_date` bigint(20) DEFAULT NULL,
  `interest_type` varchar(45) DEFAULT NULL,
  `emi` decimal(12,2) DEFAULT NULL,
  `emi_period` int(11) DEFAULT NULL,
  `next_emi_date` bigint(20) DEFAULT NULL,
  `pending_emi` int(11) DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  `last_updated` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `loans`
--

LOCK TABLES `loans` WRITE;
/*!40000 ALTER TABLE `loans` DISABLE KEYS */;
/*!40000 ALTER TABLE `loans` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `location_history`
--

DROP TABLE IF EXISTS `location_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `location_history` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `acc_name` varchar(100) DEFAULT NULL,
  `lat` decimal(14,10) DEFAULT NULL,
  `lng` decimal(14,10) DEFAULT NULL,
  `location` text,
  `log_time` bigint(20) DEFAULT NULL,
  `last_updated` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `location_history`
--

LOCK TABLES `location_history` WRITE;
/*!40000 ALTER TABLE `location_history` DISABLE KEYS */;
/*!40000 ALTER TABLE `location_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `loyalty_customers`
--

DROP TABLE IF EXISTS `loyalty_customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `loyalty_customers` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `program_name` varchar(100) DEFAULT NULL,
  `customer` varchar(100) DEFAULT NULL,
  `tier` varchar(100) DEFAULT NULL,
  `status` varchar(25) DEFAULT NULL,
  `last_updated` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `loyalty_customers`
--

LOCK TABLES `loyalty_customers` WRITE;
/*!40000 ALTER TABLE `loyalty_customers` DISABLE KEYS */;
/*!40000 ALTER TABLE `loyalty_customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `loyalty_points`
--

DROP TABLE IF EXISTS `loyalty_points`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `loyalty_points` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `program_name` varchar(100) DEFAULT NULL,
  `customer` varchar(100) DEFAULT NULL,
  `points` decimal(12,4) DEFAULT NULL,
  `points_addition` decimal(12,2) DEFAULT NULL,
  `date` bigint(20) DEFAULT NULL,
  `source` varchar(50) DEFAULT NULL,
  `source_id` bigint(20) DEFAULT NULL,
  `last_updated` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `loyalty_points`
--

LOCK TABLES `loyalty_points` WRITE;
/*!40000 ALTER TABLE `loyalty_points` DISABLE KEYS */;
/*!40000 ALTER TABLE `loyalty_points` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `loyalty_programs`
--

DROP TABLE IF EXISTS `loyalty_programs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `loyalty_programs` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `type` varchar(50) DEFAULT NULL,
  `tier` varchar(100) DEFAULT NULL,
  `tier_criteria_lower` decimal(12,2) DEFAULT NULL,
  `tier_criteria_upper` decimal(12,2) DEFAULT NULL,
  `redemption_criteria` decimal(12,2) DEFAULT NULL,
  `points_addition` decimal(12,2) DEFAULT NULL,
  `discount` decimal(12,4) DEFAULT NULL,
  `cashback` decimal(12,4) DEFAULT NULL,
  `reward_product` varchar(100) DEFAULT NULL,
  `status` varchar(25) DEFAULT NULL,
  `last_updated` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `loyalty_programs`
--

LOCK TABLES `loyalty_programs` WRITE;
/*!40000 ALTER TABLE `loyalty_programs` DISABLE KEYS */;
/*!40000 ALTER TABLE `loyalty_programs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mandatory_attributes`
--

DROP TABLE IF EXISTS `mandatory_attributes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mandatory_attributes` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `object` varchar(100) DEFAULT NULL,
  `attribute` varchar(50) DEFAULT NULL,
  `status` varchar(20) DEFAULT NULL,
  `last_updated` bigint(20) DEFAULT NULL,
  `value` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1432736514240248 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mandatory_attributes`
--

LOCK TABLES `mandatory_attributes` WRITE;
/*!40000 ALTER TABLE `mandatory_attributes` DISABLE KEYS */;
INSERT INTO `mandatory_attributes` VALUES (1432658099662427,'staff','Educational Background','active',1432658132493,''),(1432658139747113,'staff','Id proof','required',1432658181461,'License;Adhar;Voter Id;PAN;Passport'),(1432658187484490,'staff','Designation','required',1432658200852,''),(1432658205746339,'staff','Overtime Applicable','active',1432658219335,''),(1432658397655957,'customer','Shipping Address','active',1432658420937,''),(1432658425157074,'customer','VAT#','active',1432658433325,''),(1432658435609655,'customer','PAN#','active',1432658444714,''),(1432658447456770,'customer','CST#','active',1432658458605,''),(1432658463028687,'customer','Alias','active',1432658470601,''),(1432658502128907,'supplier','Shipping Address','active',1432658512482,''),(1432658519744430,'supplier','Alias','active',1432658532930,''),(1432658535040395,'supplier','TIN#','active',1432658586087,''),(1432658589830409,'supplier','PAN#','active',1432658599859,''),(1432658607827364,'supplier','CST#','active',1432658614324,''),(1432658623733222,'supplier','Bank Name','active',1432658636537,''),(1432658638691598,'supplier','Bank Account #','active',1432658650229,''),(1432658652270137,'supplier','IFSC code','active',1432658663276,''),(1432736514240247,'supplier','Margin','required',1432736528422,'');
/*!40000 ALTER TABLE `mandatory_attributes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `manufacturing_schedule`
--

DROP TABLE IF EXISTS `manufacturing_schedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `manufacturing_schedule` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `product` varchar(100) DEFAULT NULL,
  `batch` varchar(100) DEFAULT NULL,
  `quantity` decimal(12,2) DEFAULT NULL,
  `process_notes` text,
  `status` varchar(25) DEFAULT NULL,
  `schedule` bigint(20) DEFAULT NULL,
  `iteration_notes` text,
  `last_updated` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `manufacturing_schedule`
--

LOCK TABLES `manufacturing_schedule` WRITE;
/*!40000 ALTER TABLE `manufacturing_schedule` DISABLE KEYS */;
/*!40000 ALTER TABLE `manufacturing_schedule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `newsletter`
--

DROP TABLE IF EXISTS `newsletter`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `newsletter` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `description` text,
  `count_items` int(11) DEFAULT NULL,
  `valid_until` bigint(20) DEFAULT NULL,
  `last_updated` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `newsletter`
--

LOCK TABLES `newsletter` WRITE;
/*!40000 ALTER TABLE `newsletter` DISABLE KEYS */;
/*!40000 ALTER TABLE `newsletter` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `newsletter_items`
--

DROP TABLE IF EXISTS `newsletter_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `newsletter_items` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `nl_id` bigint(20) DEFAULT NULL,
  `item_type` varchar(25) DEFAULT NULL,
  `item_name` varchar(90) DEFAULT NULL,
  `item_detail` text,
  `data_blob` mediumblob,
  `pic_url` text,
  `url` text,
  `column_size` int(11) DEFAULT NULL,
  `last_updated` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `newsletter_items`
--

LOCK TABLES `newsletter_items` WRITE;
/*!40000 ALTER TABLE `newsletter_items` DISABLE KEYS */;
/*!40000 ALTER TABLE `newsletter_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `notifications` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `t_generated` bigint(20) DEFAULT NULL,
  `data_id` bigint(20) DEFAULT NULL,
  `title` varchar(300) DEFAULT NULL,
  `notes` text,
  `link_to` varchar(300) DEFAULT NULL,
  `status` varchar(20) DEFAULT NULL,
  `target_user` text,
  `last_updated` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1433321010063809 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifications`
--

LOCK TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
INSERT INTO `notifications` VALUES (1433321010063808,1433321010042,1433317509182569,'Store Movement','0.00 units of Product 1 have been dispatched from store Rack1 for store Rack 2','form145','pending','',1433321010042);
/*!40000 ALTER TABLE `notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `offers`
--

DROP TABLE IF EXISTS `offers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `offers` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `offer_name` varchar(30) DEFAULT NULL,
  `offer_type` varchar(10) DEFAULT NULL,
  `product_name` varchar(90) DEFAULT NULL,
  `batch` varchar(50) DEFAULT NULL,
  `service` varchar(45) DEFAULT NULL,
  `criteria_type` varchar(25) DEFAULT NULL,
  `criteria_amount` decimal(12,0) DEFAULT NULL,
  `criteria_quantity` decimal(12,0) DEFAULT NULL,
  `result_type` varchar(25) DEFAULT NULL,
  `discount_percent` decimal(4,2) DEFAULT NULL,
  `discount_amount` decimal(12,2) DEFAULT NULL,
  `quantity_add_percent` decimal(4,2) DEFAULT NULL,
  `quantity_add_amount` decimal(12,2) DEFAULT NULL,
  `free_product_name` varchar(90) DEFAULT NULL,
  `free_product_quantity` decimal(12,2) DEFAULT NULL,
  `free_service_name` varchar(90) DEFAULT NULL,
  `end_date` bigint(20) DEFAULT NULL,
  `offer_detail` text,
  `status` varchar(10) DEFAULT NULL,
  `last_updated` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `offers`
--

LOCK TABLES `offers` WRITE;
/*!40000 ALTER TABLE `offers` DISABLE KEYS */;
/*!40000 ALTER TABLE `offers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payments`
--

DROP TABLE IF EXISTS `payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `payments` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `acc_name` varchar(100) DEFAULT NULL,
  `type` varchar(10) DEFAULT NULL,
  `total_amount` decimal(12,2) DEFAULT NULL,
  `paid_amount` decimal(12,2) DEFAULT NULL,
  `status` varchar(10) DEFAULT NULL,
  `date` bigint(20) DEFAULT NULL,
  `due_date` bigint(20) DEFAULT NULL,
  `mode` varchar(15) DEFAULT NULL,
  `transaction_id` bigint(20) DEFAULT NULL,
  `bill_id` bigint(20) DEFAULT NULL,
  `source_info` text,
  `notes` text,
  `last_updated` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1434182519937725 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payments`
--

LOCK TABLES `payments` WRITE;
/*!40000 ALTER TABLE `payments` DISABLE KEYS */;
INSERT INTO `payments` VALUES (1432369235402366,'cash bill','received',111.00,111.00,'closed',1432369235402,1434911400000,'cash',1432369235402366,1432369218527401,'for sale bill #1',NULL,1432369237424),(1434182519937724,'Customer x (893243298)','received',113.00,113.00,'closed',1434182519937,1436725800000,'cash',1434182519937724,1434182507759436,'for sale bill #1',NULL,1434182522035);
/*!40000 ALTER TABLE `payments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pickup_charges`
--

DROP TABLE IF EXISTS `pickup_charges`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pickup_charges` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `channel` text,
  `rate` decimal(12,2) DEFAULT NULL,
  `min_charges` decimal(12,2) DEFAULT NULL,
  `max_charges` decimal(12,2) DEFAULT NULL,
  `pincode` text,
  `last_updated` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1434227989837076 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pickup_charges`
--

LOCK TABLES `pickup_charges` WRITE;
/*!40000 ALTER TABLE `pickup_charges` DISABLE KEYS */;
INSERT INTO `pickup_charges` VALUES (1433877358388625,'Snapdeal',NULL,NULL,NULL,'all',1433877358387),(1434212285485767,'Retail',NULL,NULL,NULL,'all',1434212285485),(1434227989837075,'Flipkart',0.10,10.00,20.00,'all',1434229281344);
/*!40000 ALTER TABLE `pickup_charges` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pre_requisites`
--

DROP TABLE IF EXISTS `pre_requisites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pre_requisites` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(90) DEFAULT NULL,
  `type` varchar(10) DEFAULT NULL,
  `requisite_type` varchar(10) DEFAULT NULL,
  `requisite_name` varchar(90) DEFAULT NULL,
  `quantity` decimal(10,2) DEFAULT NULL,
  `last_updated` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pre_requisites`
--

LOCK TABLES `pre_requisites` WRITE;
/*!40000 ALTER TABLE `pre_requisites` DISABLE KEYS */;
/*!40000 ALTER TABLE `pre_requisites` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_instances`
--

DROP TABLE IF EXISTS `product_instances`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product_instances` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `product_name` varchar(90) DEFAULT NULL,
  `batch` varchar(45) DEFAULT NULL,
  `manufacture_date` bigint(20) DEFAULT NULL,
  `expiry` bigint(20) DEFAULT NULL,
  `cost_price` decimal(12,2) DEFAULT NULL,
  `sale_price` decimal(12,2) DEFAULT NULL,
  `mrp` decimal(12,2) DEFAULT NULL,
  `last_updated` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1434201015632798 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_instances`
--

LOCK TABLES `product_instances` WRITE;
/*!40000 ALTER TABLE `product_instances` DISABLE KEYS */;
INSERT INTO `product_instances` VALUES (1432358018517676,'Product 1','Batch1',1430418600000,1435602600000,90.00,100.00,100.00,1432586129631),(1434201015632797,'Coffee','abc123',0,0,324.00,432.00,300.00,1434201015632);
/*!40000 ALTER TABLE `product_instances` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_master`
--

DROP TABLE IF EXISTS `product_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product_master` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `bar_code` varchar(45) DEFAULT NULL,
  `name` varchar(90) DEFAULT NULL,
  `description` text,
  `make` varchar(45) DEFAULT NULL,
  `tax` decimal(12,4) DEFAULT NULL,
  `length` decimal(12,4) DEFAULT NULL,
  `breadth` decimal(12,4) DEFAULT NULL,
  `height` decimal(12,4) DEFAULT NULL,
  `last_updated` bigint(20) DEFAULT NULL,
  `volume` decimal(12,4) DEFAULT NULL,
  `unit` varchar(50) DEFAULT NULL,
  `packing` text,
  `weight` decimal(12,4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1434200814656157 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_master`
--

LOCK TABLES `product_master` WRITE;
/*!40000 ALTER TABLE `product_master` DISABLE KEYS */;
INSERT INTO `product_master` VALUES (1432357993955717,'8901764012709','Product 1','Some product','Make1',13.1250,10.0000,10.0000,2.0000,1433877619853,200.0000,NULL,'',200.0000),(1434200814656156,'8901764709','Coffee','Bru coffee','BRU',12.5000,0.0000,0.0000,0.0000,1434201065400,0.0000,'','',0.0000);
/*!40000 ALTER TABLE `product_master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_phases`
--

DROP TABLE IF EXISTS `project_phases`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `project_phases` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `project_id` bigint(20) DEFAULT NULL,
  `phase_name` varchar(100) DEFAULT NULL,
  `details` text,
  `start_date` bigint(20) DEFAULT NULL,
  `due_date` bigint(20) DEFAULT NULL,
  `percent_complete` int(11) DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  `last_updated` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_phases`
--

LOCK TABLES `project_phases` WRITE;
/*!40000 ALTER TABLE `project_phases` DISABLE KEYS */;
/*!40000 ALTER TABLE `project_phases` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_team`
--

DROP TABLE IF EXISTS `project_team`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `project_team` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `project_id` bigint(20) DEFAULT NULL,
  `member` varchar(100) DEFAULT NULL,
  `notes` text,
  `role` text,
  `access_type` varchar(25) DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  `last_updated` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_team`
--

LOCK TABLES `project_team` WRITE;
/*!40000 ALTER TABLE `project_team` DISABLE KEYS */;
/*!40000 ALTER TABLE `project_team` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projects`
--

DROP TABLE IF EXISTS `projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `projects` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `details` text,
  `start_date` bigint(20) DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  `last_updated` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projects`
--

LOCK TABLES `projects` WRITE;
/*!40000 ALTER TABLE `projects` DISABLE KEYS */;
/*!40000 ALTER TABLE `projects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `purchase_order_items`
--

DROP TABLE IF EXISTS `purchase_order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `purchase_order_items` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `order_id` bigint(20) DEFAULT NULL,
  `product_name` varchar(90) DEFAULT NULL,
  `quantity` decimal(12,2) DEFAULT NULL,
  `make` varchar(100) DEFAULT NULL,
  `price` decimal(12,2) DEFAULT NULL,
  `last_updated` bigint(20) DEFAULT NULL,
  `item_name` text,
  `mrp` decimal(12,2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1433166709523807 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `purchase_order_items`
--

LOCK TABLES `purchase_order_items` WRITE;
/*!40000 ALTER TABLE `purchase_order_items` DISABLE KEYS */;
INSERT INTO `purchase_order_items` VALUES (1433166709523806,1433166701462141,NULL,1.00,'Make1',0.00,1433166713921,'Product 1',0.00);
/*!40000 ALTER TABLE `purchase_order_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `purchase_orders`
--

DROP TABLE IF EXISTS `purchase_orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `purchase_orders` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `order_date` bigint(20) DEFAULT NULL,
  `supplier` varchar(100) DEFAULT NULL,
  `status` varchar(25) DEFAULT NULL,
  `notes` text,
  `last_updated` bigint(20) DEFAULT NULL,
  `order_num` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1433166701462142 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `purchase_orders`
--

LOCK TABLES `purchase_orders` WRITE;
/*!40000 ALTER TABLE `purchase_orders` DISABLE KEYS */;
INSERT INTO `purchase_orders` VALUES (1433166701462141,1433097000000,'supplier y (9324329)','draft',NULL,1433166713905,'2');
/*!40000 ALTER TABLE `purchase_orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ques_data`
--

DROP TABLE IF EXISTS `ques_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ques_data` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `ques_struct_id` bigint(20) NOT NULL,
  `submitter` varchar(100) DEFAULT NULL,
  `reviewer` varchar(100) DEFAULT NULL,
  `approver` varchar(100) DEFAULT NULL,
  `sub_date` bigint(20) DEFAULT NULL,
  `rev_date` bigint(20) DEFAULT NULL,
  `app_date` bigint(20) DEFAULT NULL,
  `status` varchar(25) DEFAULT NULL,
  `last_updated` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ques_data`
--

LOCK TABLES `ques_data` WRITE;
/*!40000 ALTER TABLE `ques_data` DISABLE KEYS */;
/*!40000 ALTER TABLE `ques_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ques_fields`
--

DROP TABLE IF EXISTS `ques_fields`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ques_fields` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `ques_id` bigint(20) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `display_name` text,
  `description` text,
  `type` varchar(30) DEFAULT NULL,
  `fvalues` text,
  `fcol` int(11) DEFAULT NULL,
  `forder` int(11) DEFAULT NULL,
  `freq` varchar(15) DEFAULT NULL,
  `last_updated` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ques_fields`
--

LOCK TABLES `ques_fields` WRITE;
/*!40000 ALTER TABLE `ques_fields` DISABLE KEYS */;
/*!40000 ALTER TABLE `ques_fields` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ques_fields_data`
--

DROP TABLE IF EXISTS `ques_fields_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ques_fields_data` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `ques_id` bigint(20) NOT NULL,
  `field_id` bigint(20) NOT NULL,
  `field_value` text,
  `last_updated` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ques_fields_data`
--

LOCK TABLES `ques_fields_data` WRITE;
/*!40000 ALTER TABLE `ques_fields_data` DISABLE KEYS */;
/*!40000 ALTER TABLE `ques_fields_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ques_struct`
--

DROP TABLE IF EXISTS `ques_struct`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ques_struct` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `display_name` varchar(100) DEFAULT NULL,
  `func` varchar(100) DEFAULT NULL,
  `description` text,
  `reviewer` varchar(100) DEFAULT NULL,
  `approver` varchar(100) DEFAULT NULL,
  `status` varchar(25) DEFAULT NULL,
  `last_updated` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ques_struct`
--

LOCK TABLES `ques_struct` WRITE;
/*!40000 ALTER TABLE `ques_struct` DISABLE KEYS */;
/*!40000 ALTER TABLE `ques_struct` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quotation`
--

DROP TABLE IF EXISTS `quotation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `quotation` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `customer` varchar(100) DEFAULT NULL,
  `date` bigint(20) DEFAULT NULL,
  `amount` decimal(12,2) DEFAULT NULL,
  `total` decimal(12,2) DEFAULT NULL,
  `billing_type` varchar(20) DEFAULT NULL,
  `offer` text,
  `discount` decimal(12,2) DEFAULT NULL,
  `tax` decimal(12,2) DEFAULT NULL,
  `intro_notes` text,
  `status` varchar(25) DEFAULT NULL,
  `last_updated` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quotation`
--

LOCK TABLES `quotation` WRITE;
/*!40000 ALTER TABLE `quotation` DISABLE KEYS */;
/*!40000 ALTER TABLE `quotation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quotation_items`
--

DROP TABLE IF EXISTS `quotation_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `quotation_items` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `quotation_id` bigint(20) DEFAULT NULL,
  `item_name` varchar(90) DEFAULT NULL,
  `description` text,
  `unit` varchar(30) DEFAULT NULL,
  `quantity` decimal(12,2) DEFAULT NULL,
  `p_quantity` decimal(12,2) DEFAULT NULL,
  `f_quantity` decimal(12,2) DEFAULT NULL,
  `unit_price` decimal(12,2) DEFAULT NULL,
  `mrp` decimal(12,2) DEFAULT NULL,
  `amount` decimal(12,2) DEFAULT NULL,
  `total` decimal(12,2) DEFAULT NULL,
  `discount` decimal(12,2) DEFAULT NULL,
  `offer` text,
  `type` varchar(10) DEFAULT NULL,
  `notes` text,
  `tax` decimal(12,2) DEFAULT NULL,
  `last_updated` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quotation_items`
--

LOCK TABLES `quotation_items` WRITE;
/*!40000 ALTER TABLE `quotation_items` DISABLE KEYS */;
/*!40000 ALTER TABLE `quotation_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `receipts`
--

DROP TABLE IF EXISTS `receipts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `receipts` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `receipt_id` varchar(20) DEFAULT NULL,
  `payment_id` bigint(20) DEFAULT NULL,
  `type` varchar(10) DEFAULT NULL,
  `amount` decimal(12,2) DEFAULT NULL,
  `acc_name` varchar(100) DEFAULT NULL,
  `date` bigint(20) DEFAULT NULL,
  `last_updated` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `receipts`
--

LOCK TABLES `receipts` WRITE;
/*!40000 ALTER TABLE `receipts` DISABLE KEYS */;
/*!40000 ALTER TABLE `receipts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `report_items`
--

DROP TABLE IF EXISTS `report_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `report_items` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `report_id` bigint(20) DEFAULT NULL,
  `table1` varchar(100) DEFAULT NULL,
  `table2` varchar(100) DEFAULT NULL,
  `field1` varchar(100) DEFAULT NULL,
  `field2` varchar(100) DEFAULT NULL,
  `condition1` varchar(30) DEFAULT NULL,
  `value` text,
  `last_updated` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `report_items`
--

LOCK TABLES `report_items` WRITE;
/*!40000 ALTER TABLE `report_items` DISABLE KEYS */;
/*!40000 ALTER TABLE `report_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reports`
--

DROP TABLE IF EXISTS `reports`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `reports` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) DEFAULT NULL,
  `description` text,
  `last_updated` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reports`
--

LOCK TABLES `reports` WRITE;
/*!40000 ALTER TABLE `reports` DISABLE KEYS */;
/*!40000 ALTER TABLE `reports` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `reviews` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(90) DEFAULT NULL,
  `type` varchar(10) DEFAULT NULL,
  `reviewer` varchar(100) DEFAULT NULL,
  `detail` text,
  `rating` decimal(4,2) DEFAULT NULL,
  `last_updated` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `roles` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `role_name` varchar(100) DEFAULT NULL,
  `description` text,
  `status` varchar(25) DEFAULT NULL,
  `last_updated` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sale_channels`
--

DROP TABLE IF EXISTS `sale_channels`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sale_channels` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` text,
  `details` text,
  `dead_weight_factor` text,
  `last_updated` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1434227983882240 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sale_channels`
--

LOCK TABLES `sale_channels` WRITE;
/*!40000 ALTER TABLE `sale_channels` DISABLE KEYS */;
INSERT INTO `sale_channels` VALUES (1433877349890627,'Snapdeal','','1.2',1433877358387),(1434212277187526,'Retail','','1.1',1434212285485),(1434227983882239,'Flipkart','','1',1434227989837);
/*!40000 ALTER TABLE `sale_channels` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sale_leads`
--

DROP TABLE IF EXISTS `sale_leads`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sale_leads` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `customer` varchar(100) DEFAULT NULL,
  `detail` text,
  `due_date` bigint(20) DEFAULT NULL,
  `identified_by` varchar(100) DEFAULT NULL,
  `source_id` bigint(20) DEFAULT NULL,
  `last_updated` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sale_leads`
--

LOCK TABLES `sale_leads` WRITE;
/*!40000 ALTER TABLE `sale_leads` DISABLE KEYS */;
/*!40000 ALTER TABLE `sale_leads` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sale_order_items`
--

DROP TABLE IF EXISTS `sale_order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sale_order_items` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `order_id` bigint(20) DEFAULT NULL,
  `item_name` varchar(90) DEFAULT NULL,
  `quantity` decimal(12,2) DEFAULT NULL,
  `notes` text,
  `last_updated` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1434189427843906 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sale_order_items`
--

LOCK TABLES `sale_order_items` WRITE;
/*!40000 ALTER TABLE `sale_order_items` DISABLE KEYS */;
INSERT INTO `sale_order_items` VALUES (1434189422667177,1434189412565924,'Product 1',11.00,'\n Total availability: 56\n Minimum price: 100\n Maximum price: 100',1434189435865),(1434189427843905,1434189412565924,'Product 1',7.00,'\n Total availability: 56\n Minimum price: 100\n Maximum price: 100',1434189435859);
/*!40000 ALTER TABLE `sale_order_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sale_orders`
--

DROP TABLE IF EXISTS `sale_orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sale_orders` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `customer_name` varchar(100) DEFAULT NULL,
  `order_date` bigint(20) DEFAULT NULL,
  `type` varchar(10) DEFAULT NULL,
  `status` varchar(25) DEFAULT NULL,
  `last_updated` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1434189412565925 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sale_orders`
--

LOCK TABLES `sale_orders` WRITE;
/*!40000 ALTER TABLE `sale_orders` DISABLE KEYS */;
INSERT INTO `sale_orders` VALUES (1434189412565924,'Customer x (893243298)',1434133800000,'product','pending',1434189435849);
/*!40000 ALTER TABLE `sale_orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sale_prices`
--

DROP TABLE IF EXISTS `sale_prices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sale_prices` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `product_name` varchar(90) DEFAULT NULL,
  `batch` varchar(45) DEFAULT NULL,
  `sale_price` decimal(12,2) DEFAULT NULL,
  `pi_id` bigint(20) DEFAULT NULL,
  `billing_type` varchar(25) DEFAULT NULL,
  `last_updated` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1434201015635292 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sale_prices`
--

LOCK TABLES `sale_prices` WRITE;
/*!40000 ALTER TABLE `sale_prices` DISABLE KEYS */;
INSERT INTO `sale_prices` VALUES (1432358044674221,'Product 1','Batch1',98.00,1432358018517676,'Retail',1432586129631),(1433877724817824,'Product 1','Batch1',100.00,1432358018517676,'Tax',1433877724817),(1434201015635290,'Coffee','abc123',34.00,1434201015632797,'Tax',1434201015632),(1434201015635291,'Coffee','abc123',432.00,1434201015632797,'Retail',1434201015632);
/*!40000 ALTER TABLE `sale_prices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `service_request_items`
--

DROP TABLE IF EXISTS `service_request_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `service_request_items` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `request_id` bigint(20) NOT NULL,
  `item_name` varchar(90) DEFAULT NULL,
  `quantity` decimal(12,2) DEFAULT NULL,
  `est_amount` decimal(12,2) DEFAULT NULL,
  `amount` decimal(12,2) DEFAULT NULL,
  `status` varchar(25) DEFAULT NULL,
  `last_updated` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `service_request_items`
--

LOCK TABLES `service_request_items` WRITE;
/*!40000 ALTER TABLE `service_request_items` DISABLE KEYS */;
/*!40000 ALTER TABLE `service_request_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `service_request_machines`
--

DROP TABLE IF EXISTS `service_request_machines`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `service_request_machines` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `request_id` bigint(20) NOT NULL,
  `problem_type` text,
  `machine_type` text,
  `machine` text,
  `problem` text,
  `closing_notes` text,
  `status` varchar(25) DEFAULT NULL,
  `last_updated` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `service_request_machines`
--

LOCK TABLES `service_request_machines` WRITE;
/*!40000 ALTER TABLE `service_request_machines` DISABLE KEYS */;
/*!40000 ALTER TABLE `service_request_machines` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `service_request_team`
--

DROP TABLE IF EXISTS `service_request_team`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `service_request_team` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `request_id` bigint(20) NOT NULL,
  `assignee` varchar(100) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `last_updated` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `service_request_team`
--

LOCK TABLES `service_request_team` WRITE;
/*!40000 ALTER TABLE `service_request_team` DISABLE KEYS */;
/*!40000 ALTER TABLE `service_request_team` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `service_requests`
--

DROP TABLE IF EXISTS `service_requests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `service_requests` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `customer` varchar(100) DEFAULT NULL,
  `reported_by` varchar(100) DEFAULT NULL,
  `notes` text,
  `problem_type` text,
  `closing_notes` text,
  `reported_time` bigint(20) DEFAULT NULL,
  `start_time` bigint(20) DEFAULT NULL,
  `end_time` bigint(20) DEFAULT NULL,
  `status` varchar(25) DEFAULT NULL,
  `last_updated` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `service_requests`
--

LOCK TABLES `service_requests` WRITE;
/*!40000 ALTER TABLE `service_requests` DISABLE KEYS */;
/*!40000 ALTER TABLE `service_requests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `service_subscriptions`
--

DROP TABLE IF EXISTS `service_subscriptions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `service_subscriptions` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `last_bill_id` bigint(20) DEFAULT NULL,
  `last_bill_date` bigint(20) DEFAULT NULL,
  `next_due_date` bigint(20) DEFAULT NULL,
  `customer` varchar(100) DEFAULT NULL,
  `service` varchar(45) DEFAULT NULL,
  `notes` text,
  `status` varchar(25) DEFAULT NULL,
  `last_updated` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `service_subscriptions`
--

LOCK TABLES `service_subscriptions` WRITE;
/*!40000 ALTER TABLE `service_subscriptions` DISABLE KEYS */;
/*!40000 ALTER TABLE `service_subscriptions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `services`
--

DROP TABLE IF EXISTS `services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `services` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `description` text,
  `price` decimal(12,2) DEFAULT NULL,
  `tax` decimal(12,2) DEFAULT NULL,
  `last_updated` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `services`
--

LOCK TABLES `services` WRITE;
/*!40000 ALTER TABLE `services` DISABLE KEYS */;
/*!40000 ALTER TABLE `services` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sku_mapping`
--

DROP TABLE IF EXISTS `sku_mapping`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sku_mapping` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `channel` text,
  `system_sku` text,
  `channel_sku` text,
  `channel_system_sku` text,
  `last_updated` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1434227989961564 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sku_mapping`
--

LOCK TABLES `sku_mapping` WRITE;
/*!40000 ALTER TABLE `sku_mapping` DISABLE KEYS */;
INSERT INTO `sku_mapping` VALUES (1433877358595057,'Snapdeal','werwr3',NULL,NULL,1433877358595),(1433877358595058,'Snapdeal','Product 1',NULL,NULL,1433877358595),(1434212285629131,'Retail','Coffee',NULL,NULL,1434212285630),(1434212285629132,'Retail','Product 1',NULL,NULL,1434212285630),(1434212285629133,'Retail','werwr3',NULL,NULL,1434212285630),(1434227989961562,'Flipkart','Coffee',NULL,NULL,1434227989961),(1434227989961563,'Flipkart','Product 1',NULL,NULL,1434227989961);
/*!40000 ALTER TABLE `sku_mapping` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sms`
--

DROP TABLE IF EXISTS `sms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sms` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `receiver` varchar(15) DEFAULT NULL,
  `message` text,
  `status` varchar(25) DEFAULT NULL,
  `type` varchar(25) DEFAULT NULL,
  `last_updated` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sms`
--

LOCK TABLES `sms` WRITE;
/*!40000 ALTER TABLE `sms` DISABLE KEYS */;
INSERT INTO `sms` VALUES (1,'9818005232','Congratulations!! Your vyavsaay account has been successfully setup.','sent','transaction',1432327124000);
/*!40000 ALTER TABLE `sms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `solutions`
--

DROP TABLE IF EXISTS `solutions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `solutions` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `issue_id` bigint(20) DEFAULT NULL,
  `detail` text,
  `status` varchar(25) DEFAULT NULL,
  `last_updated` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `solutions`
--

LOCK TABLES `solutions` WRITE;
/*!40000 ALTER TABLE `solutions` DISABLE KEYS */;
/*!40000 ALTER TABLE `solutions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `staff`
--

DROP TABLE IF EXISTS `staff`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `staff` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(90) DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  `acc_name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  `pincode` varchar(15) DEFAULT NULL,
  `state` varchar(45) DEFAULT NULL,
  `country` varchar(45) DEFAULT NULL,
  `address_status` varchar(45) DEFAULT NULL,
  `lat` decimal(14,10) DEFAULT NULL,
  `lng` decimal(14,10) DEFAULT NULL,
  `shipping` tinyint(1) DEFAULT NULL,
  `last_updated` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1432664496621620 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `staff`
--

LOCK TABLES `staff` WRITE;
/*!40000 ALTER TABLE `staff` DISABLE KEYS */;
INSERT INTO `staff` VALUES (1,'Rohit','active','Rohit (9818005232)','nikki@gmail.com','9818005232',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1432327112000),(1432663619687011,'Ashish Goyal','active','Ashish Goyal (9818005232)','ashish.19goyal@gmail.com','9818005232','Gurgaon','Gurgaon','122002','Haryana','India','pending analysis',NULL,NULL,NULL,1432663619687),(1432664496621619,'Anish Goyal','active','Anish Goyal (9818005232)','ashish.19goyal@gmail.co.in','9818005232','sushant lok-1','Gurgaon','122002','Haryana','India','pending analysis',NULL,NULL,NULL,1432670203536);
/*!40000 ALTER TABLE `staff` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `storage_structure`
--

DROP TABLE IF EXISTS `storage_structure`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `storage_structure` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(25) DEFAULT NULL,
  `parent` text,
  `length` decimal(12,4) DEFAULT NULL,
  `breadth` decimal(12,4) DEFAULT NULL,
  `height` decimal(12,4) DEFAULT NULL,
  `unit` varchar(50) DEFAULT NULL,
  `last_updated` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1433266240459086 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `storage_structure`
--

LOCK TABLES `storage_structure` WRITE;
/*!40000 ALTER TABLE `storage_structure` DISABLE KEYS */;
INSERT INTO `storage_structure` VALUES (1433266173370957,'Warehouse','',120.0000,100.0000,10.0000,'m',1433266190141),(1433266216180992,'Row','Warehouse',10.0000,100.0000,10.0000,'m',1433266237081),(1433266240459085,'Rack','Row',10.0000,15.0000,10.0000,'m',1433266553166);
/*!40000 ALTER TABLE `storage_structure` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `store_areas`
--

DROP TABLE IF EXISTS `store_areas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `store_areas` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(25) DEFAULT NULL,
  `owner` varchar(100) DEFAULT NULL,
  `area_type` varchar(90) DEFAULT NULL,
  `length` decimal(12,4) DEFAULT NULL,
  `breadth` decimal(12,4) DEFAULT NULL,
  `height` decimal(12,4) DEFAULT NULL,
  `last_updated` bigint(20) DEFAULT NULL,
  `parent` text,
  `unit` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1433317380274623 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `store_areas`
--

LOCK TABLES `store_areas` WRITE;
/*!40000 ALTER TABLE `store_areas` DISABLE KEYS */;
INSERT INTO `store_areas` VALUES (1433274059218281,'Warehouse 1','Ashish Goyal (9818005232)','Warehouse',120.0000,100.0000,10.0000,1433274059219,'','m'),(1433274077643574,'Row 1','Ashish Goyal (9818005232)','Row',10.0000,100.0000,10.0000,1433274077643,'Warehouse 1','m'),(1433317366836815,'Rack1','Rohit (9818005232)','Rack',10.0000,15.0000,10.0000,1433317497921,'Row 1','m'),(1433317380274622,'Rack 2','Rohit (9818005232)','Rack',10.0000,15.0000,10.0000,1433485067297,'Row 1','m');
/*!40000 ALTER TABLE `store_areas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `store_movement`
--

DROP TABLE IF EXISTS `store_movement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `store_movement` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `item_name` varchar(90) DEFAULT NULL,
  `batch` varchar(50) DEFAULT NULL,
  `quantity` decimal(12,2) DEFAULT NULL,
  `source` varchar(25) DEFAULT NULL,
  `target` varchar(25) DEFAULT NULL,
  `status` varchar(25) DEFAULT NULL,
  `dispatcher` varchar(100) DEFAULT NULL,
  `receiver` varchar(100) DEFAULT NULL,
  `last_updated` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1433317509182570 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `store_movement`
--

LOCK TABLES `store_movement` WRITE;
/*!40000 ALTER TABLE `store_movement` DISABLE KEYS */;
INSERT INTO `store_movement` VALUES (1433317509182569,'Product 1','Batch1',0.00,'Rack1','Rack 2','dispatched','Rohit (9818005232)','',1433317547969);
/*!40000 ALTER TABLE `store_movement` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `supplier_bill_items`
--

DROP TABLE IF EXISTS `supplier_bill_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `supplier_bill_items` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `quantity` decimal(12,2) DEFAULT NULL,
  `p_quantity` decimal(12,2) DEFAULT NULL,
  `f_quantity` decimal(12,2) DEFAULT NULL,
  `product_name` varchar(90) DEFAULT NULL,
  `batch` varchar(50) DEFAULT NULL,
  `bill_id` bigint(20) DEFAULT NULL,
  `unit_price` decimal(12,2) DEFAULT NULL,
  `amount` decimal(12,2) DEFAULT NULL,
  `tax` decimal(12,2) DEFAULT NULL,
  `total` decimal(12,2) DEFAULT NULL,
  `storage` varchar(25) DEFAULT NULL,
  `raw_price` decimal(12,2) DEFAULT NULL,
  `conversion_rate` decimal(12,2) DEFAULT NULL,
  `put_away` text,
  `last_updated` bigint(20) DEFAULT NULL,
  `put_away_status` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `supplier_bill_items`
--

LOCK TABLES `supplier_bill_items` WRITE;
/*!40000 ALTER TABLE `supplier_bill_items` DISABLE KEYS */;
INSERT INTO `supplier_bill_items` VALUES (1,10.00,NULL,NULL,'Product 1','Batch1',NULL,NULL,NULL,NULL,NULL,'Rack 2',NULL,NULL,NULL,1433485082279,'completed'),(2,15.00,NULL,NULL,'Product 1','Batch1',NULL,NULL,NULL,NULL,NULL,'Rack 2',NULL,NULL,NULL,NULL,'pending'),(3,25.00,NULL,NULL,'Product 1','Batch1',NULL,NULL,NULL,NULL,NULL,'',NULL,NULL,NULL,1433483676101,'pending');
/*!40000 ALTER TABLE `supplier_bill_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `supplier_bills`
--

DROP TABLE IF EXISTS `supplier_bills`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `supplier_bills` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `bill_id` varchar(50) DEFAULT NULL,
  `supplier` varchar(100) DEFAULT NULL,
  `bill_date` bigint(20) DEFAULT NULL,
  `entry_date` bigint(20) DEFAULT NULL,
  `amount` decimal(12,2) DEFAULT NULL,
  `discount` decimal(12,2) DEFAULT NULL,
  `tax` decimal(12,2) DEFAULT NULL,
  `total` decimal(12,2) DEFAULT NULL,
  `transaction_id` bigint(20) DEFAULT NULL,
  `imported` varchar(25) DEFAULT NULL,
  `notes` text,
  `last_updated` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `supplier_bills`
--

LOCK TABLES `supplier_bills` WRITE;
/*!40000 ALTER TABLE `supplier_bills` DISABLE KEYS */;
/*!40000 ALTER TABLE `supplier_bills` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `supplier_return_items`
--

DROP TABLE IF EXISTS `supplier_return_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `supplier_return_items` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `return_id` bigint(20) DEFAULT NULL,
  `item_name` varchar(90) DEFAULT NULL,
  `batch` varchar(50) DEFAULT NULL,
  `notes` text,
  `quantity` decimal(12,2) DEFAULT NULL,
  `refund_amount` decimal(12,2) DEFAULT NULL,
  `saleable` varchar(25) DEFAULT NULL,
  `tax` decimal(12,2) DEFAULT NULL,
  `storage` varchar(25) DEFAULT NULL,
  `last_updated` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `supplier_return_items`
--

LOCK TABLES `supplier_return_items` WRITE;
/*!40000 ALTER TABLE `supplier_return_items` DISABLE KEYS */;
/*!40000 ALTER TABLE `supplier_return_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `supplier_returns`
--

DROP TABLE IF EXISTS `supplier_returns`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `supplier_returns` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `supplier` varchar(100) DEFAULT NULL,
  `return_date` bigint(20) DEFAULT NULL,
  `total` decimal(12,2) DEFAULT NULL,
  `tax` decimal(12,2) DEFAULT NULL,
  `type` varchar(10) DEFAULT NULL,
  `transaction_id` bigint(20) DEFAULT NULL,
  `last_updated` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `supplier_returns`
--

LOCK TABLES `supplier_returns` WRITE;
/*!40000 ALTER TABLE `supplier_returns` DISABLE KEYS */;
/*!40000 ALTER TABLE `supplier_returns` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `suppliers`
--

DROP TABLE IF EXISTS `suppliers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `suppliers` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(90) DEFAULT NULL,
  `acc_name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `notes` text,
  `address` varchar(100) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  `pincode` varchar(15) DEFAULT NULL,
  `state` varchar(45) DEFAULT NULL,
  `country` varchar(45) DEFAULT NULL,
  `address_status` varchar(45) DEFAULT NULL,
  `lat` decimal(14,10) DEFAULT NULL,
  `lng` decimal(14,10) DEFAULT NULL,
  `shipping` tinyint(1) DEFAULT NULL,
  `business_type` text,
  `last_updated` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1432669160113189 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `suppliers`
--

LOCK TABLES `suppliers` WRITE;
/*!40000 ALTER TABLE `suppliers` DISABLE KEYS */;
INSERT INTO `suppliers` VALUES (1432371075431282,'supplier1','supplier1 ()','','','','','','','','','pending analysis',NULL,NULL,NULL,NULL,1432371075431),(1432669160113188,'supplier y','supplier y (9324329)','aslkd@dsfs','932432932','werwef','Sushant lok-1','Gurgaon','122002','Haryana','India','pending analysis',NULL,NULL,NULL,NULL,1432669214570);
/*!40000 ALTER TABLE `suppliers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `task_instances`
--

DROP TABLE IF EXISTS `task_instances`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `task_instances` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `description` text,
  `t_initiated` bigint(20) DEFAULT NULL,
  `t_due` bigint(20) DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  `assignee` varchar(100) DEFAULT NULL,
  `source` varchar(50) DEFAULT NULL,
  `source_id` bigint(20) DEFAULT NULL,
  `est_expense` decimal(12,2) DEFAULT NULL,
  `expense` decimal(12,2) DEFAULT NULL,
  `task_hours` decimal(5,2) DEFAULT NULL,
  `last_updated` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `task_instances`
--

LOCK TABLES `task_instances` WRITE;
/*!40000 ALTER TABLE `task_instances` DISABLE KEYS */;
/*!40000 ALTER TABLE `task_instances` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `task_type`
--

DROP TABLE IF EXISTS `task_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `task_type` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `description` text,
  `est_hours` decimal(5,2) DEFAULT NULL,
  `last_updated` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `task_type`
--

LOCK TABLES `task_type` WRITE;
/*!40000 ALTER TABLE `task_type` DISABLE KEYS */;
/*!40000 ALTER TABLE `task_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `templates`
--

DROP TABLE IF EXISTS `templates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `templates` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `type` varchar(20) DEFAULT NULL,
  `header` text,
  `footer` text,
  `row` text,
  `header_fields` int(11) DEFAULT NULL,
  `footer_fields` int(11) DEFAULT NULL,
  `row_fields` int(11) DEFAULT NULL,
  `status` varchar(10) DEFAULT NULL,
  `last_updated` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `templates`
--

LOCK TABLES `templates` WRITE;
/*!40000 ALTER TABLE `templates` DISABLE KEYS */;
INSERT INTO `templates` VALUES (1,'Default Sale Bill template','sale bill','Vyavsaay.com','2014','',1,1,5,'active',1),(2,'Default Purchase Order template','purchase order','Vyavsaay.com','2014','',1,1,5,'active',1),(3,'Default Payment Receipt template','payment receipt','Vyavsaay.com','2014','',1,1,5,'active',1),(4,'Default Credit Note template','credit note','Vyavsaay.com','2014','',1,1,5,'active',1),(5,'Default newsletter template','newsletter','Vyavsaay.com','2014','',1,1,5,'active',1),(6,'Default Service Receipt template','service receipt','Vyavsaay.com','2014','',1,1,5,'active',1),(7,'Default Return Receipt template','return receipt','Vyavsaay.com','2014','',1,1,5,'active',1);
/*!40000 ALTER TABLE `templates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transactions`
--

DROP TABLE IF EXISTS `transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `transactions` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `trans_date` bigint(20) DEFAULT NULL,
  `amount` decimal(12,2) DEFAULT NULL,
  `receiver` varchar(100) DEFAULT NULL,
  `giver` varchar(100) DEFAULT NULL,
  `tax` decimal(12,2) DEFAULT NULL,
  `last_updated` bigint(20) DEFAULT NULL,
  `service_tax` decimal(12,2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1434182519937725 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transactions`
--

LOCK TABLES `transactions` WRITE;
/*!40000 ALTER TABLE `transactions` DISABLE KEYS */;
INSERT INTO `transactions` VALUES (1432369218527401,1432369235402,111.00,'cash bill','master',12.86,1432369235376,NULL),(1432369235402366,1432369235402,111.00,'master','cash bill',0.00,1432369235376,NULL),(1434182507759436,1434182519937,113.00,'Customer x (893243298)','master',13.13,1434182519888,NULL),(1434182519937724,1434182519937,113.00,'master','Customer x (893243298)',0.00,1434182519888,NULL);
/*!40000 ALTER TABLE `transactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `unbilled_purchase_items`
--

DROP TABLE IF EXISTS `unbilled_purchase_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `unbilled_purchase_items` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `supplier` varchar(100) DEFAULT NULL,
  `item_name` varchar(100) DEFAULT NULL,
  `batch` varchar(100) DEFAULT NULL,
  `quantity` decimal(12,2) DEFAULT NULL,
  `purchase_date` bigint(20) DEFAULT NULL,
  `notes` text,
  `storage` varchar(25) DEFAULT NULL,
  `last_updated` bigint(20) DEFAULT NULL,
  `item_desc` text,
  `unit_price` decimal(12,2) DEFAULT NULL,
  `amount` decimal(12,2) DEFAULT NULL,
  `tax` decimal(12,2) DEFAULT NULL,
  `total` decimal(12,2) DEFAULT NULL,
  `put_away_status` varchar(25) DEFAULT NULL,
  `bill_status` varchar(25) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1434208422497969 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `unbilled_purchase_items`
--

LOCK TABLES `unbilled_purchase_items` WRITE;
/*!40000 ALTER TABLE `unbilled_purchase_items` DISABLE KEYS */;
/*!40000 ALTER TABLE `unbilled_purchase_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `unbilled_sale_items`
--

DROP TABLE IF EXISTS `unbilled_sale_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `unbilled_sale_items` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `customer` varchar(100) DEFAULT NULL,
  `item_name` varchar(100) DEFAULT NULL,
  `batch` varchar(100) DEFAULT NULL,
  `quantity` decimal(12,2) DEFAULT NULL,
  `sale_date` bigint(20) DEFAULT NULL,
  `notes` text,
  `storage` varchar(25) DEFAULT NULL,
  `last_updated` bigint(20) DEFAULT NULL,
  `bill_status` varchar(25) DEFAULT NULL,
  `item_desc` text,
  `mrp` decimal(12,2) DEFAULT NULL,
  `amount` decimal(12,2) DEFAULT NULL,
  `tax` decimal(12,2) DEFAULT NULL,
  `total` decimal(12,2) DEFAULT NULL,
  `discount` decimal(12,2) DEFAULT NULL,
  `picked_status` varchar(25) DEFAULT NULL,
  `unit_price` decimal(12,2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1434213082734164 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `unbilled_sale_items`
--

LOCK TABLES `unbilled_sale_items` WRITE;
/*!40000 ALTER TABLE `unbilled_sale_items` DISABLE KEYS */;
/*!40000 ALTER TABLE `unbilled_sale_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_fields_list`
--

DROP TABLE IF EXISTS `user_fields_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_fields_list` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `tablename` varchar(50) DEFAULT NULL,
  `field_name` varchar(50) DEFAULT NULL,
  `status` varchar(10) DEFAULT NULL,
  `last_updated` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_fields_list`
--

LOCK TABLES `user_fields_list` WRITE;
/*!40000 ALTER TABLE `user_fields_list` DISABLE KEYS */;
INSERT INTO `user_fields_list` VALUES (1,'customers','acc_name','active',1),(2,'suppliers','acc_name','active',1),(3,'staff','acc_name','active',1),(4,'accounts','acc_name','active',1),(5,'attendance','acc_name','active',1),(6,'expenses','person','active',1),(7,'task_instances','assignee','active',1),(8,'purchase_orders','supplier','active',1),(9,'supplier_bills','supplier','active',1),(10,'supplier_returns','supplier','active',1),(11,'transactions','receiver','active',1),(12,'transactions','giver','active',1),(13,'cash_register','acc_name','active',1),(14,'receipts','acc_name','active',1),(15,'payments','acc_name','active',1),(16,'credit_notes','acc_name','active',1),(17,'sale_orders','customer_name','active',1),(18,'bills','customer_name','active',1),(19,'customer_returns','customer','active',1),(20,'service_subscriptions','customer','active',1),(21,'reviews','reviewer','active',1),(22,'store_movement','dispatcher','active',1),(23,'store_movement','receiver','active',1),(24,'assets','owner','active',1),(25,'activities','updated_by','active',1),(26,'sale_leads','customer','active',1),(27,'sale_leads','identified_by','active',1),(28,'feedback','provider','active',1),(29,'appointments','customer','active',1),(30,'appointments','assignee','active',1),(31,'loans','account','active',1),(32,'project_team','member','active',1),(33,'data_access','user','active',1),(34,'unbilled_sale_items','customer','active',1),(35,'unbilled_purchase_items','supplier','active',1),(36,'loyalty_points','customer','active',1),(37,'loyalty_customers','customer','active',1),(38,'service_requests','customer','active',1),(39,'service_requests','reported_by','active',1),(40,'service_request_team','assignee','active',1),(41,'warranty','customer','active',1),(42,'ques_data','submitter','active',1),(43,'ques_data','reviewer','active',1),(44,'ques_data','approver','active',1),(45,'sms','receiver','active',1),(46,'feed_likes','person','active',1),(47,'feed_comments','person','active',1),(48,'quotation','customer','active',1),(49,'store_areas','owner','active',1);
/*!40000 ALTER TABLE `user_fields_list` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_preferences`
--

DROP TABLE IF EXISTS `user_preferences`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_preferences` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) DEFAULT NULL,
  `display_name` varchar(100) DEFAULT NULL,
  `value` text,
  `type` varchar(20) DEFAULT NULL,
  `shortcut` varchar(40) DEFAULT NULL,
  `sync` varchar(40) DEFAULT NULL,
  `tables` text,
  `status` varchar(10) DEFAULT NULL,
  `last_updated` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1433877720002247 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_preferences`
--

LOCK TABLES `user_preferences` WRITE;
/*!40000 ALTER TABLE `user_preferences` DISABLE KEYS */;
INSERT INTO `user_preferences` VALUES (1,'purchase_store','Store for purchased items','Store 1','accounting','','checked',NULL,'active',1),(2,'sales_store','Store for sold items','Store 1','accounting','','checked',NULL,'active',1),(3,'purchase_return_store','Store store for purchase returns','Store 1','accounting','','checked',NULL,'active',1),(4,'sales_return_store','Store for sales returns','Store 1','accounting','','checked',NULL,'active',1),(5,'discard_items_store','Store for discarded items','Store 1','accounting','','checked',NULL,'active',1),(6,'bill_num','Next Bill series number','1','accounting','','checked',NULL,'active',1),(7,'tin','TIN #','07680252201','accounting','','checked',NULL,'active',1433189335857),(8,'vat','VAT #','07680252201','accounting','','checked',NULL,'active',1433189347538),(9,'sales_tax_no','Sales Tax #','','accounting','','checked',NULL,'active',1),(10,'pan','PAN #','','accounting','','checked',NULL,'active',1),(11,'credit_period','Default Credit Period (days)','30','accounting','','checked',NULL,'active',1),(12,'debit_period','Default Debit Period (days)','30','accounting','','checked',NULL,'active',1),(13,'mode_of_payment','Default Mode of payment','cash','accounting','','checked',NULL,'active',1),(14,'footer_message','footer_message','Powered by Rise Consulting','hidden','','checked',NULL,'active',1),(15,'sms_enabled','sms_enabled','no','other','','checked',NULL,'active',1),(16,'bill_message','bill_message','1. Goods once sold will not be taken back.\n2. Interest @ 18% p.a. will be charged if the payment is not made within the stipulated time.\n3. Subject to Delhi Jurisdiction only.','other','','checked',NULL,'active',1433190398963),(17,'quot_message','quot_message','E.O.E.','other','','checked',NULL,'active',1),(18,'bill_print_items','bill_print_items','5','other','','checked',NULL,'active',1),(19,'worker_delay','worker_delay','25','other','','checked',NULL,'active',1),(20,'worker_repeat','worker_repeat','3600','other','','checked',NULL,'active',1),(21,'task_due_period','default_task_due_period','4','other','','checked',NULL,'active',1),(22,'address','official_address','Z-71, 1st floor, Okhla industrial area Phase-II, New Delhi-110020','other','','checked',NULL,'active',1433189117851),(23,'print_size','print_size','.8','other','','checked',NULL,'active',1433189997247),(24,'lat','latitude','28.6100','other','','checked',NULL,'active',1),(25,'lng','longitude','77.2300','other','','checked',NULL,'active',1),(26,'phone','phone_no','+91-9310492780','other','','checked',NULL,'active',1433189141585),(27,'website','website','nikkioverseas.com','other','','checked',NULL,'active',1433188902713),(28,'business_intro','business_intro','Distributor and wholesaler','other','','checked',NULL,'active',1433188889769),(29,'email','email','nikki_overseasqq@yahoo.co.in','other','','checked',NULL,'active',1433189057939),(30,'logo','logo','logo.jpeg','other','','checked',NULL,'active',1),(31,'title','business_title','Nikki International','other','','checked',NULL,'active',1433189028727),(32,'theme','theme','theme1','other','','checked',NULL,'active',1),(33,'offline','mode_of_operation','online','other','','checked',NULL,'active',1),(34,'locale','language','english','other','','checked',NULL,'active',1),(35,'sale_bill','sale_bill_print_template','default_sale_bill','template','','checked',NULL,'active',1),(36,'purchase_order','purchase_order_print_template','default_purchase_order','template','','checked',NULL,'active',1),(37,'payment_receipt','payment_receipt_print_template','default_payment_receipt','template','','checked',NULL,'active',1),(38,'credit_note','credit_note_print_template','default_credit_note','template','','checked',NULL,'active',1),(39,'newsletter','newsletter_print_template','default_newsletter','template','','checked',NULL,'active',1),(40,'service_bill','service_bill_print_template','default_service_sale_bill','template','','checked',NULL,'active',1),(41,'product_bill','product_bill_print_template','default_product_sale_bill','template','','checked',NULL,'active',1),(42,'return_receipt','return_receipt_print_template','default_return_receipt','template','','checked',NULL,'active',1),(43,'supplier_return','supplier_return_print_template','default_supplier_return','template','','checked',NULL,'active',1),(44,'report1','signage_changes','unchecked','report','','checked',NULL,'active',1432327979294),(45,'report4','modes_of_payment','unchecked','report','','checked',NULL,'active',1432327979290),(46,'report5','customer_account_balance','unchecked','report','','checked',NULL,'active',1432327979285),(47,'report6','payments_due_from_customers','unchecked','report','','checked',NULL,'active',1432327979281),(48,'report9','product_sales_report','checked','report','','checked',NULL,'active',1432327979277),(49,'report14','expenses_by_period','unchecked','report','','checked',NULL,'active',1432327979273),(50,'report15','financial_summary','unchecked','report','','checked',NULL,'active',1432327979269),(51,'report17','staff_performance','unchecked','report','','checked',NULL,'active',1432327979264),(52,'report26','sales_by_customers','unchecked','report','','checked',NULL,'active',1432327979260),(53,'report27','expiring_inventory','unchecked','report','','checked',NULL,'active',1432327979256),(54,'report28','short_inventory','unchecked','report','','checked',NULL,'active',1432327979250),(55,'report29','product_pre-requisites','unchecked','report','','checked',NULL,'active',1432327979240),(56,'report30','tasks_performed','unchecked','report','','checked',NULL,'active',1432327979234),(57,'report31','customer_map_by_credit','unchecked','report','','checked',NULL,'active',1432327979229),(58,'report32','staff_map','unchecked','report','','checked',NULL,'active',1432327979224),(59,'report33','supplier_map_by_debit','unchecked','report','','checked',NULL,'active',1432327979217),(60,'report34','effective_margin','unchecked','report','','checked',NULL,'active',1432327979208),(61,'report35','customer_map_by_products','unchecked','report','','checked',NULL,'active',1432327979199),(62,'report36','supplier_map_by_products','unchecked','report','','checked',NULL,'active',1432327979190),(63,'report37','payments_due_to_suppliers','unchecked','report','','checked',NULL,'active',1432327979180),(64,'report38','sales_by_products','unchecked','report','','checked',NULL,'active',1432327979169),(65,'report39','sales_by_services','unchecked','report','','checked',NULL,'active',1432327932270),(66,'report40','surplus_inventory','unchecked','report','','checked',NULL,'active',1432327932266),(67,'report41','service_pre-requisites','unchecked','report','','checked',NULL,'active',1432327932262),(68,'report42','feedback','unchecked','report','','checked',NULL,'active',1432327932258),(69,'report43','customer_behaviour','unchecked','report','','checked',NULL,'active',1432327932254),(70,'report44','compare_products','checked','report','','checked',NULL,'active',1432327992880),(71,'report45','virtual_store','unchecked','report','','checked',NULL,'active',1432327932245),(72,'report46','supplier_account_balance','unchecked','report','','checked',NULL,'active',1432327932241),(73,'report47','inventory_value','unchecked','report','','checked',NULL,'active',1432327932236),(74,'report48','resource_analysis','unchecked','report','','checked',NULL,'active',1432327932232),(75,'report50','margin_by_products','unchecked','report','','checked',NULL,'active',1432327932227),(76,'report51','dead_items','unchecked','report','','checked',NULL,'active',1432327932223),(77,'report52','product_purchase_report','checked','report','','checked',NULL,'active',1432327932218),(78,'report53','sales_tax','unchecked','report','','checked',NULL,'active',1432327932212),(79,'report54','best_days_by_sales','unchecked','report','','checked',NULL,'active',1432327932207),(80,'report55','worst_days_by_sales','unchecked','report','','checked',NULL,'active',1432327932202),(81,'report56','service_requests_report','unchecked','report','','checked',NULL,'active',1432327932196),(82,'report57','subscription_status','unchecked','report','','checked',NULL,'active',1432327932191),(83,'report58','ledger','unchecked','report','','checked',NULL,'active',1432327932185),(84,'report60','trial_balance','unchecked','report','','checked',NULL,'active',1432327932179),(85,'report61','expiring_inventory','checked','report','','checked',NULL,'active',1432327932173),(86,'report62','inventory_prediction','checked','report','','checked',NULL,'active',1432327932165),(87,'report63','item_picklist','checked','report','','checked',NULL,'active',1432327932159),(88,'report64','packing_instructions','checked','report','','checked',NULL,'active',1432327932149),(89,'report65','pricing_update_report','checked','report','','checked',NULL,'active',1432327932136),(90,'form1','update_inventory','checked','form','','checked','--product_instances--inventory_adjust--bill_items--supplier_bill_items--customer_returns--customer_return_items--sale_prices--','active',1432327708080),(91,'form2','create_pamphlet','unchecked','form','','checked','--newsletter--newsletter_items--','active',1432327708075),(92,'form5','manage_assets','unchecked','form','','checked','--assets--asset_valuations--asset_maintenance--','active',1432327708068),(93,'form7','attendance','checked','form','','checked','--attendance--staff--','active',1432327708061),(94,'form8','manage_staff','checked','form','','checked','--staff--','active',1432327708053),(95,'form10','create_service_bills','unchecked','form','','checked','--bill_items--bills--transactions--','active',1432327708047),(96,'form11','manage_payments','unchecked','form','','checked','--payments--transactions--','active',1432327708039),(97,'form12','create_bill','unchecked','form','','checked','--bill_items--bills--transactions--','active',1432327708030),(98,'form14','manage_tasks','unchecked','form','','checked','--task_instances--task_type--','active',1432327708020),(99,'form15','accept_customer_returns','checked','form','','checked','--customer_returns--customer_return_items--transactions--','active',1432327688530),(100,'form16','manage_customer_returns','checked','form','','checked','--customer_returns--customer_return_items--transactions--','active',1432327688526),(101,'form17','manage_supplier_returns','unchecked','form','','checked','--supplier_returns--supplier_return_items--transactions--','active',1432327688521),(102,'form19','enter_supplier_returns','unchecked','form','','checked','--supplier_returns--supplier_return_items--transactions--','active',1432327688516),(103,'form21','enter_supplier_bills','unchecked','form','','checked','--supplier_bills--supplier_bill_items--transactions--','active',1432327688512),(104,'form24','create_purchase_order','checked','form','','checked','--purchase_order_items--purchase_orders--','active',1432327688508),(105,'form30','manage_customers','checked','form','','checked','--customers--','active',1432327688503),(106,'form35','manage_offers','unchecked','form','','checked','--offers--','active',1432327688499),(107,'form38','store_placement','unchecked','form','','checked','--area_utilization--store_areas--','active',1433315913432),(108,'form39','manage_products','unchecked','form','','checked','--product_master--documents','active',1433438388625),(109,'form40','manage_suppliers','checked','form','','checked','--suppliers--','active',1432327688486),(110,'form41','verify_customer_addresses','unchecked','form','','checked','--customers--','active',1432327688482),(111,'form42','manage_bills','unchecked','form','','checked','--bills--bill_items--transactions--','active',1432327688477),(112,'form43','manage_purchase_orders','checked','form','','checked','--purchase_orders--purchase_order_items--','active',1432327688472),(113,'form44','manage_pamphlets','unchecked','form','','checked','--newsletter--newsletter_items--','active',1432327688467),(114,'form46','set_defaults','checked','form','','checked','--user_preferences--','active',1432327688462),(115,'form47','change_password','checked','form','','checked','--user_profiles--user_preferences--values_list--templates--','active',1432327688458),(116,'form48','select_reports','checked','form','','checked','--user_preferences--','active',1432327688452),(117,'form49','select_forms','checked','form','','checked','--user_preferences--','active',1432327688447),(118,'form50','set_accounting_defaults','checked','form','','checked','--user_preferences--','active',1432327688440),(119,'form51','access_control','checked','form','','checked','--access_control--user_profiles--','active',1432327688433),(120,'form53','manage_supplier_bills','unchecked','form','','checked','--supplier_bills--supplier_bill_items--transactions--','active',1432327688425),(121,'form54','select_print_templates','unchecked','form','','checked','--user_preferences--','active',1432327688417),(122,'form56','cash_register','unchecked','form','','checked','--cash_register--transactions--','active',1432327688406),(123,'form57','manage_services','unchecked','form','','checked','--services--','active',1432327688396),(124,'form58','service_pre-requisites','unchecked','form','','checked','--pre_requisites--','active',1432327633777),(125,'form59','product_pre-requisites','unchecked','form','','checked','--pre_requisites--','active',1432327633774),(126,'form60','product_attributes','checked','form','','checked','--attributes--','active',1433411421631),(127,'form61','service_attributes','unchecked','form','','checked','--attributes--','active',1432736557999),(128,'form62','product_reviews','checked','form','','checked','--reviews--','active',1432327633761),(129,'form63','service_reviews','unchecked','form','','checked','--reviews--','active',1432327633757),(130,'form64','service_cross_sell','unchecked','form','','checked','--cross_sells--','active',1432327633753),(131,'form66','product_cross_sell','unchecked','form','','checked','--cross_sells--','active',1432327633749),(132,'form69','create_sale_order','checked','form','','checked','--sale_orders--sale_order_items--','active',1432357937389),(133,'form70','manage_sale_orders','unchecked','form','','checked','--sale_orders--sale_order_items--','active',1432356519189),(134,'form71','manage_accounts','unchecked','form','','checked','--accounts--','active',1432356607738),(135,'form72','create_bill','unchecked','form','','checked','--bill_items--bills--transactions--','active',1432327633731),(136,'form74','completed_sale_orders','unchecked','form','','checked','--sale_orders--sale_order_items--','active',1432327633726),(137,'form75','pending_sale_orders','unchecked','form','','checked','--sale_orders--sale_order_items--','active',1432327633722),(138,'form76','track_payments','unchecked','form','','checked','--payments--transactions--','active',1432327633716),(139,'form77','set_shortcuts','unchecked','form','','checked','--user_preferences--','active',1432327633708),(140,'form78','promotion_mails','unchecked','form','','checked','--newsletter--newsletter_items--','active',1432327633701),(141,'form79','manage_task_types','unchecked','form','','checked','--task_instances--task_type--','active',1432327633695),(142,'form80','de-duplication_mapping','unchecked','form','','checked','--de_duplication--de_duplication_ref','active',1432327633690),(143,'form81','sale_leads','unchecked','form','','checked','--sale_leads--','active',1432327633684),(144,'form82','scan_items','unchecked','form','','checked','--bill_items--bills--transactions--','active',1432356591424),(145,'form83','storage_areas','unchecked','form','','checked','--store_areas--','active',1433273097275),(146,'form84','manage_subscriptions','unchecked','form','','checked','--services--service_subscriptions--','active',1432327633660),(147,'form85','verify_supplier_addresses','unchecked','form','','checked','--suppliers--','active',1432327633652),(148,'form86','staff_geo_tracking','unchecked','form','','checked','--staff--location_history--','active',1432327633643),(149,'form87','manage_products','unchecked','form','','checked','--product_master--','active',1432327538032),(150,'form88','manufacturing_schedule','unchecked','form','','checked','--manufacturing_schedule--','active',1432327538028),(151,'form89','appointments','unchecked','form','','checked','--appointments--','active',1432327538024),(152,'form90','billing_types','checked','form','','checked','--bill_types--','active',1432327538020),(153,'form91','create_bills_multi_register','checked','form','','checked','--bill_items--bills--transactions--','active',1432327538016),(154,'form92','manage_bills_multi_register','checked','form','','checked','--bill_items--bills--transactions--','active',1432327538012),(155,'form93','manage_loans','unchecked','form','','checked','--loans--','active',1432327538007),(156,'form94','discard_items','checked','form','','checked','--discarded--','active',1432327538003),(157,'form95','data_import','checked','form','','checked','','active',1432327537999),(158,'form96','customer_attributes','checked','form','','checked','--attributes--','active',1432736558007),(159,'form97','supplier_attributes','checked','form','','checked','--attributes--','active',1432736558014),(160,'form98','staff_attributes','checked','form','','checked','--attributes--','active',1432736558021),(161,'form99','delete_storage','checked','form','','checked','','active',1432327537980),(162,'form100','selective_sync','unchecked','form','','checked','--user_preferences--notifications--activities--values_list--templates--feedback--','active',1432327537975),(163,'form101','manage_projects','unchecked','form','','checked','--projects--','active',1432327537970),(164,'form102','project_team','unchecked','form','','checked','--project_team--','active',1432327537965),(165,'form103','project_phases','unchecked','form','','checked','--project_phases--','active',1432327537960),(166,'form104','project_tasks','unchecked','form','','checked','--task_instances--','active',1432327537955),(167,'form105','data_access','checked','form','','checked','--data_access--','active',1432327537949),(168,'form108','manage_sale_orders_multi_register','checked','form','','checked','--sale_orders--sale_order_items--','active',1432327537942),(169,'form109','asset_attributes','unchecked','form','','checked','--attributes--','active',1432736558027),(170,'form110','manage_reports','checked','form','','checked','--reports--report_items--','active',1432327537927),(171,'form111','create_reports','checked','form','','checked','--reports--report_items--','active',1432327537918),(172,'form112','add_unbilled_sale_items','checked','form','','checked','--unbilled_sale_items--','active',1433440622225),(173,'form113','manage_unbilled_sale_items','checked','form','','checked','--unbilled_sale_items--','active',1433440622236),(174,'form114','add_unbilled_purchase_items','checked','form','','checked','--unbilled_purchase_items--','active',1433440622244),(175,'form115','manage_unbilled_purchase_items','checked','form','','checked','--unbilled_purchase_items--','active',1433440622252),(176,'form116','manage_loyalty_programs','unchecked','form','','checked','--loyalty_programs--','active',1432327464327),(177,'form118','create_bills_loyalty','unchecked','form','','checked','--bill_items--','active',1432327464323),(178,'form119','create_bills_multi_register_unbilled','unchecked','form','','checked','--bill_items--bills--transactions--','active',1433440622258),(179,'form120','manage_loyalty_customers','unchecked','form','','checked','--loyalty_customers--','active',1432327464315),(180,'form121','adjust_loyalty_points','unchecked','form','','checked','--loyalty_points--','active',1432327464311),(181,'form122','enter_supplier_bill_unbilled_items','unchecked','form','','checked','--supplier_bills--supplier_bill_items--transactions--','active',1433440622265),(182,'form123','mandatory_attributes','checked','form','','checked','--mandatory_attributes--','active',1432736557980),(183,'form124','receipts','unchecked','form','','checked','--payments--transactions--','active',1432327464298),(184,'form125','customer_accounts','unchecked','form','','checked','--customers--accounts--','active',1432327464294),(185,'form126','issues_list','unchecked','form','','checked','--solutions--issues--','active',1432327464289),(186,'form128','manage_service_requests','unchecked','form','','checked','--service_requests--','active',1432327464285),(187,'form129','engineer_locations','unchecked','form','','checked','--staff--','active',1432327464280),(188,'form130','job_orders','unchecked','form','','checked','--bills--bill_items--transactions--','active',1432327464275),(189,'form131','assign_tasks','unchecked','form','','checked','--task_instances--','active',1432327464266),(190,'form132','create_service_request','unchecked','form','','checked','--service_requests--','active',1432327464260),(191,'form133','service_documents','unchecked','form','','checked','--service_requests--documents--','active',1432327464254),(192,'form134','service_request_detail','unchecked','form','','checked','--service_requests--documents--service_request_team--service_request_machines--','active',1432327464248),(193,'form135','project_dashboard','unchecked','form','','checked','--projects--documents--project_phases--project_team--task_instances--','active',1432327464242),(194,'form136','enter_supplier_bill_wholesale','unchecked','form','','checked','--supplier_bills--supplier_bill_items--transactions--','active',1432327464235),(195,'form137','project_expenses','unchecked','form','','checked','--expenses--projects--','active',1432327464228),(196,'form138','project_schedule','unchecked','form','','checked','--tasks--projects--project_phases--','active',1432327464220),(197,'form141','manage_orders_app','unchecked','form','','checked','--sale_orders--sale_order_items--','active',1432327464210),(198,'form142','create_questionnaire','checked','form','','checked','--ques_struct--ques_fields--ques_data--ques_fields_data--','active',1432327464200),(199,'form143','manage_questionnaire','unchecked','form','','checked','--ques_struct--ques_fields--ques_data--ques_fields_data--','active',1432327384888),(200,'form144','project_budgeting','unchecked','form','','checked','--projects--project_phases--task_instances--','active',1432327384884),(201,'form145','store_movement','checked','form','','checked','--store_movement--','active',1433315897683),(202,'form146','manufacturing','unchecked','form','','checked','--manufacturing_schedule--','active',1432327384876),(203,'form147','manage_roles','checked','form','','checked','--roles--','active',1432327384872),(204,'form148','create_roles','checked','form','','checked','--roles--access_control--','active',1432327384868),(205,'form149','assign_roles','checked','form','','checked','--roles--user_role_mapping--','active',1432327384864),(206,'form150','project_feeds','unchecked','form','','checked','--projects--feeds--feed_likes--feed_comments--','active',1432327384860),(207,'form151','service_request_billing','unchecked','form','','checked','--service_requests--service_request_items--expenses--','active',1432327384857),(208,'form152','manage_quotations','unchecked','form','','checked','--quotation--quotation_items--','active',1432327384852),(209,'form153','prepare_quotation','unchecked','form','','checked','--quotation--quotation_items--','active',1432327384848),(210,'form154','create_bill_dlm','unchecked','form','','checked','--bills--bill_items--transactions--','active',1432327384844),(211,'form155','manage_inventory_dlm','unchecked','form','','checked','--product_instances--inventory_adjust--bill_items--supplier_bill_items--supplier_return_items--customer_return_items--sale_prices--','active',1432327384839),(212,'form156','store_placement_dlm','unchecked','form','','checked','--area_utilization--store_areas--','active',1432327384835),(213,'form157','store_movement_dlm','unchecked','form','','checked','--store_movement--','active',1432327384830),(214,'form158','enter_purchases_dlm','unchecked','form','','checked','--supplier_bills--supplier_bill_items--transactions--','active',1432327384822),(215,'form159','issue_grn','checked','form','','checked','--supplier_bills--supplier_bill_items--transactions--','active',1432327384817),(216,'form160','manage_grn','checked','form','','checked','--supplier_bills--supplier_bill_items--transactions--','active',1432327384812),(217,'form161','checklist_items','checked','form','','checked','--checklist_items--checklist_mapping--','active',1432327384807),(218,'form162','product_checklist','checked','form','','checked','--checklist_items--checklist_mapping--','active',1432327384801),(219,'form163','product_dimensions','checked','form','','checked','--product_master--','active',1432327384795),(220,'form164','storage_dimensions','checked','form','','checked','--store_areas--','active',1432327384789),(221,'form165','put_away_suggestions','checked','form','','checked','--supplier_bill_items--','active',1432327384783),(222,'form166','manage_sale_prices','unchecked','form','','checked','--sale_prices--product_master--product_instances--','active',1433476764526),(223,'form167','storage_structure','checked','form','','checked','--store_areas--','active',1432327384766),(224,'industry','industry','general','other',NULL,NULL,NULL,'active',1432327112000),(1432358040417157,'Retail_bill_num','Next Retail Bill series number','2','accounting','','checked',NULL,'active',1432358044578),(1432358040417158,'capture_location','capture_location','no','other',NULL,'checked',NULL,'active',1),(1432358040417159,'po_num','Next Purchase Order series number','3','accounting',NULL,'checked',NULL,'active',1),(1432358040417160,'powered_by_link','powered_by_link','mailto:info@vyavsaay.com','hidden',NULL,'checked',NULL,'active',1),(1432358040417161,'powered_by','powered_by','Vyavsaay.com','hidden',NULL,'checked',NULL,'active',1),(1432358040417162,'po_message','po_message','T.B.D','other',NULL,'checked',NULL,'active',1433316714936),(1432358040417163,'email_enabled','email_enabled','yes','other',NULL,'checked',NULL,'active',1),(1432358040417164,'form170','store_areas_nikki','checked','form',NULL,'checked','--store_areas--storage_structure--','active',1433273206991),(1432358040417165,'storage_level','storage_level','Rack','other',NULL,'checked','','active',1),(1432358040417166,'report66','inventory_level_store','checked','report',NULL,'checked','','active',1),(1432358040417167,'form169','manage_products_nikki','checked','form',NULL,'checked','--product_master--documents--attributes--','active',1),(1432358040417168,'form171','manage_channels','checked','form',NULL,'checked','--manage_channels--','active',1),(1432358040417169,'form172','pricing_sheet','checked','form',NULL,'checked','--sale_prices--','active',1),(1432358040417170,'form173','sku_mapping','checked','form',NULL,'checked','--sku_mapping--','active',1),(1432358040417171,'form174','pickup_charges','checked','form',NULL,'checked','--pickup_charges--','active',1),(1432358040417172,'activities','activities','checked','form',NULL,'checked','--activities--','active',1),(1432358040417173,'form175','channel_categories','checked','form',NULL,'checked','--channel_category--','active',1),(1432358040417174,'form176','category_sku_mapping','checked','form',NULL,'checked','--category_sku_mapping--','active',1),(1433877720002246,'Tax_bill_num','Next Tax Bill series number','2','accounting','','checked',NULL,'active',1433877724671);
/*!40000 ALTER TABLE `user_preferences` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_role_mapping`
--

DROP TABLE IF EXISTS `user_role_mapping`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_role_mapping` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `role_name` varchar(100) DEFAULT NULL,
  `username` varchar(50) DEFAULT NULL,
  `status` varchar(25) DEFAULT NULL,
  `last_updated` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_role_mapping`
--

LOCK TABLES `user_role_mapping` WRITE;
/*!40000 ALTER TABLE `user_role_mapping` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_role_mapping` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `values_list`
--

DROP TABLE IF EXISTS `values_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `values_list` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `tablename` varchar(30) DEFAULT NULL,
  `listname` varchar(30) DEFAULT NULL,
  `name` varchar(30) DEFAULT NULL,
  `value` varchar(30) DEFAULT NULL,
  `status` varchar(10) DEFAULT NULL,
  `last_updated` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=429 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `values_list`
--

LOCK TABLES `values_list` WRITE;
/*!40000 ALTER TABLE `values_list` DISABLE KEYS */;
INSERT INTO `values_list` VALUES (1,'newsletter_items','item_type','offer','Offer','active',1),(2,'newsletter_items','item_type','header','Header','active',1),(3,'newsletter_items','item_type','footer','Footer','active',1),(4,'newsletter_items','item_type','product','Product','active',1),(5,'newsletter_items','item_type','service','Service','active',1),(6,'newsletter_items','item_type','news','News','active',1),(7,'newsletter_items','item_type','blog','Blog','active',1),(8,'newsletter_items','item_type','article','Article','active',1),(9,'supplier_bills','imported','yes','Yes','active',1),(10,'supplier_bills','imported','no','No','active',1),(11,'quotation','status','generated','Generated','active',1),(12,'quotation','status','approved','Approved','active',1),(13,'quotation','status','rejected','Rejected','active',1),(14,'quotation','type','product','Product','active',1),(15,'quotation','type','service','Service','active',1),(16,'quotation','type','both','Both','active',1),(17,'quotation_items','type','product','Product','active',1),(18,'quotation_items','type','service','Service','active',1),(19,'feeds','status','visible','Visible','active',1),(20,'feeds','status','hidden','Hidden','active',1),(21,'feeds','status','archived','Archived','active',1),(22,'feeds','content_type','text','Text','active',1),(23,'feeds','content_type','image','Image','active',1),(24,'feeds','content_type','url','URL','active',1),(25,'feeds','source','service request','Service request','active',1),(26,'feeds','source','project','Project','active',1),(27,'feeds','source','project phase','Project phase','active',1),(28,'feeds','source','task instance','Task instance','active',1),(29,'roles','status','active','Active','active',1),(30,'roles','status','inactive','Inactive','active',1),(31,'user_role_mapping','status','active','Active','active',1),(32,'user_role_mapping','status','inactive','Inactive','active',1),(33,'ques_data','status','submitted','Submitted','active',1),(34,'ques_data','status','reviewed','Reviewed','active',1),(35,'ques_data','status','approved','Approved','active',1),(36,'store_movement','status','pending','Pending','active',1),(37,'store_movement','status','dispatched','Dispatched','active',1),(38,'store_movement','status','received','Received','active',1),(39,'store_movement','status','cancelled','Cancelled','active',1),(40,'ques_struct','status','active','Active','active',1),(41,'ques_struct','status','inactive','Inactive','active',1),(42,'ques_struct','status','archived','Archived','active',1),(43,'ques_fields','type','text','Text','active',1),(44,'ques_fields','type','textarea','TextArea','active',1),(45,'ques_fields','type','number','Number','active',1),(46,'ques_fields','type','value list','Value list','active',1),(47,'sms','type','promotion','Promotion','active',1),(48,'sms','type','transaction','Transaction','active',1),(49,'sms','status','pending','Pending','active',1),(50,'sms','status','sent','Sent','active',1),(51,'sms','status','cancelled','Cancelled','active',1),(52,'modal106','type','debit','Debit','active',1),(53,'modal106','type','credit','Credit','active',1),(54,'warranty','status','In warranty','In warranty','active',1),(55,'warranty','status','Out of warranty','Out of warranty','active',1),(56,'warranty','status','amc with parts','AMC with parts','active',1),(57,'warranty','status','amc without parts','AMC without parts','active',1),(58,'issues','status','active','Active','active',1),(59,'issues','status','archived','Archived','active',1),(60,'solutions','status','active','Active','active',1),(61,'solutions','status','archived','Archived','active',1),(62,'service_requests','status','open','Open','active',1),(63,'service_requests','status','closed','Closed','active',1),(64,'service_requests','status','cancelled','Cancelled','active',1),(65,'service_request_machines','status','open','Open','active',1),(66,'service_request_machines','status','closed','Closed','active',1),(67,'service_request_machines','status','cancelled','Cancelled','active',1),(68,'service_request_items','status','requested','Requested','active',1),(69,'service_request_items','status','approved','Approved','active',1),(70,'service_request_items','status','rejected','Rejected','active',1),(71,'service_request_items','status','used','Used','active',1),(72,'expenses','status','approved','Approved','active',1),(73,'expenses','status','rejected','Rejected','active',1),(74,'expenses','status','pending','Pending','active',1),(75,'receipts','type','paid','Paid','active',1),(76,'receipts','type','received','Received','active',1),(77,'mandatory_attributes','status','active','Active','active',1),(78,'mandatory_attributes','status','inactive','Inactive','active',1),(79,'mandatory_attributes','object','account','Account','active',1),(80,'mandatory_attributes','object','task','Task','active',1),(81,'mandatory_attributes','object','storage','Storage','active',1),(82,'mandatory_attributes','object','loan','Loan','active',1),(83,'mandatory_attributes','object','loyalty program','Loyalty Program','active',1),(84,'mandatory_attributes','object','service','Service','active',1),(85,'mandatory_attributes','object','product','Product','active',1),(86,'mandatory_attributes','object','customer','Customer','active',1),(87,'mandatory_attributes','object','staff','Staff','active',1),(88,'mandatory_attributes','object','supplier','Supplier','active',1),(89,'mandatory_attributes','object','asset','Asset','active',1),(90,'report_items','condition1','none','None','active',1),(91,'report_items','condition1','equals value','Equals Value','active',1),(92,'report_items','condition1','not equals value','Not equals Value','active',1),(93,'report_items','condition1','greater than value','Greater than value','active',1),(94,'report_items','condition1','less than value','Less than value','active',1),(95,'report_items','condition1','equals field','Equals field','active',1),(96,'report_items','condition1','not equals field','Not equals field','active',1),(97,'report_items','condition1','greater than field','Greater than field','active',1),(98,'report_items','condition1','less than field','Less than field','active',1),(99,'loyalty_customers','status','active','Active','active',1),(100,'loyalty_customers','status','inactive','Inactive','active',1),(101,'loyalty_programs','type','discount','Discount','active',1),(102,'loyalty_programs','type','cashback','CashBack','active',1),(103,'loyalty_programs','type','reward product','Reward product','active',1),(104,'loyalty_programs','status','active','Active','active',1),(105,'loyalty_programs','status','retired','Retired','active',1),(106,'loyalty_points','source','sale','Sale','active',1),(107,'loyalty_points','source','sale return','Sale return','active',1),(108,'share','share_options','gmail','Gmail','active',1),(109,'share','share_options','outlook','Outlook','active',1),(110,'share','share_options','whatsapp','Whatsapp','active',1),(111,'projects','status','active','Active','active',1),(112,'projects','status','inactive','Inactive','active',1),(113,'projects','status','suspended','Suspended','active',1),(114,'projects','status','completed','Completed','active',1),(115,'project_team','status','active','Active','active',1),(116,'project_team','status','inactive','Inactive','active',1),(117,'project_team','status','left','Left','active',1),(118,'project_phases','status','active','Active','active',1),(119,'project_phases','status','Inactive','Inactive','active',1),(120,'project_phases','status','suspended','Suspended','active',1),(121,'project_phases','status','completed','Completed','active',1),(122,'data_access','user_type','user','User','active',1),(123,'data_access','user_type','field','Field','active',1),(124,'data_access','user_type','role','Role','active',1),(125,'data_access','access_type','all','All','active',1),(126,'data_access','access_type','read','Read','active',1),(127,'data_access','access_type','update','Update','active',1),(128,'data_access','access_type','delete','Delete','active',1),(129,'attributes','type','service','Service','active',1),(130,'attributes','type','supplier','Supplier','active',1),(131,'attributes','type','customer','Customer','active',1),(132,'attributes','type','product','Product','active',1),(133,'attributes','type','staff','Staff','active',1),(134,'customer_return_items','type','refund','Refund','active',1),(135,'customer_return_items','type','exchange','Exchange','active',1),(136,'bill_types','status','active','Active','active',1),(137,'bill_types','status','inactive','Inactive','active',1),(138,'loans','repayment_method','instalments','Instalments','active',1),(139,'loans','repayment_method','lump sum','Lump sum','active',1),(140,'loans','interest_type','paid','Paid','active',1),(141,'loans','interest_type','added to principal','Added to principal','active',1),(142,'loans','status','open','Open','active',1),(143,'loans','status','closed','Closed','active',1),(144,'loans','type','taken','Taken','active',1),(145,'loans','type','given','Given','active',1),(146,'appointments','status','pending','Pending','active',1),(147,'appointments','status','cancelled','Cancelled','active',1),(148,'appointments','status','closed','Closed','active',1),(149,'manufacturing_schedule','status','completed','Completed','active',1),(150,'manufacturing_schedule','status','in stock','In stock','active',1),(151,'manufacturing_schedule','status','out of stock','Out of stock','active',1),(152,'manufacturing_schedule','status','scheduled','Scheduled','active',1),(153,'manufacturing_schedule','status','suspended','Suspended','active',1),(154,'service_subscriptions','status','active','Active','active',1),(155,'service_subscriptions','status','cancelled','Cancelled','active',1),(156,'service_subscriptions','status','suspended','Suspended','active',1),(157,'de_duplication','status','pending','Pending','active',1),(158,'de_duplication','status','cancelled','Cancelled','active',1),(159,'de_duplication','status','closed','Clsoed','active',1),(160,'template','product_sale_bill','default_product_sale_bill','default_product_sale_bill','active',1),(161,'template','return_receipt','default_return_receipt','default_return_receipt','active',1),(162,'template','service_sale_bill','default_service_sale_bill','default_service_sale_bill','active',1),(163,'template','newsletter','default_newsletter','default_newsletter','active',1),(164,'template','credit_note','default_credit_note','default_credit_note','active',1),(165,'template','payment_receipt','default_payment_receipt','default_payment_receipt','active',1),(166,'template','purchase_order','default_purchase_order','default_purchase_order','active',1),(167,'template','supplier_return','default_supplier_return','default_supplier_return','active',1),(168,'cash_register','type','paid','Paid','active',1),(169,'cash_register','type','received','Received','active',1),(170,'ecommerce','categories','all','All','active',1),(171,'ecommerce','categories','Electronics','Electronics','active',1),(172,'ecommerce','categories','DVD','DVD','active',1),(173,'ecommerce','categories','Books','Books','active',1),(174,'ecommerce','sites','all','All','active',1),(175,'ecommerce','sites','snapdeal','Snapdeal','active',1),(176,'ecommerce','site','flipkart','Flipkart','active',1),(177,'ecommerce','site','ebay','E-bay','active',1),(178,'ecommerce','site','amazon','Amazon','active',1),(179,'purchase_orders','status','cancelled','Cancelled','active',1),(180,'purchase_orders','status','draft','Draft','active',1),(181,'purchase_orders','status','order placed','Order Placed','active',1),(182,'sale_orders','type','service','Service','active',1),(183,'sale_orders','type','product','Product','active',1),(184,'sale_orders','status','pending','Pending','active',1),(185,'sale_orders','status','cancelled','Cancelled','active',1),(186,'sale_orders','status','billed','Billed','active',1),(187,'feedback','type','positive','Positive','active',1),(188,'feedback','type','negative','Negative','active',1),(189,'feedback','rating','high','High','active',1),(190,'feedback','rating','medium','Medium','active',1),(191,'feedback','rating','low','Low','active',1),(192,'cross_sells','type','service','Service','active',1),(193,'cross_sells','type','product','Product','active',1),(194,'cross_sells','cross_type','service','Service','active',1),(195,'cross_sells','cross_type','product','Product','active',1),(196,'reviews','type','service','Service','active',1),(197,'reviews','type','product','Product','active',1),(198,'categories','type','service','Service','active',1),(199,'categories','type','product','Product','active',1),(200,'pre_requisites','requisite_type','service','Service','active',1),(201,'pre_requisites','requisite_type','product','Product','active',1),(202,'pre_requisites','requisite_type','task','Task','active',1),(203,'pre_requisites','requisite_type','asset','Asset','active',1),(204,'pre_requisites','type','service','Service','active',1),(205,'pre_requisites','type','product','Product','active',1),(206,'services','taxable','yes','Yes','active',1),(207,'services','taxable','no','No','active',1),(208,'product_master','manufactured','yes','Yes','active',1),(209,'product_master','manufactured','no','No','active',1),(210,'product_master','taxable','yes','Yes','active',1),(211,'product_master','taxable','no','No','active',1),(212,'product_master','unit','pieces','Pieces','active',1),(213,'product_master','unit','kgs','Kgs','active',1),(214,'product_master','unit','litres','Litres','active',1),(215,'product_master','unit','boxes','Boxes','active',1),(216,'product_master','unit','strips','Strips','active',1),(217,'tax','status','current','Current financial year','active',1),(218,'tax','status','past','Past financial years','active',1),(219,'payments','mode','cash','Cash','active',1),(220,'payments','mode','credit','Credit','active',1),(221,'payments','mode','card','Card','active',1),(222,'payments','mode','online banking','Online Banking','active',1),(223,'payments','mode','coupons','Coupons','active',1),(224,'payments','mode','cheque','Cheque','active',1),(225,'payments','mode','draft','Draft','active',1),(226,'customers','status','active','Active','active',1),(227,'customers','status','archived','Archived','active',1),(228,'customers','status','overcredit','Over Credit','active',1),(229,'address','status','pending analysis','Pending Analysis','active',1),(230,'address','status','unconfirmed','Unconfirmed','active',1),(231,'address','status','confirmed','Confirmed','active',1),(232,'address','status','incorrect','Incorrect','active',1),(233,'documents','doc_type','service','Service','active',1),(234,'documents','doc_type','service instance','Service Instance','active',1),(235,'documents','doc_type','staff','Staff','active',1),(236,'documents','doc_type','product','Product','active',1),(237,'documents','doc_type','product instance','Product Instance','active',1),(238,'documents','doc_type','asset','Asset','active',1),(239,'documents','doc_type','service request','Service request','active',1),(240,'documents','doc_type','project','Project','active',1),(241,'staff','status','active','Active','active',1),(242,'staff','status','retired','Retired','active',1),(243,'staff','status','suspended','Suspended','active',1),(244,'attendance','presence','present','Present','active',1),(245,'attendance','presence','absent','Absent','active',1),(246,'attendance','presence','not known','Not known','active',1),(247,'task_instances','status','pending','Pending','active',1),(248,'task_instances','status','completed','Completed','active',1),(249,'task_instances','status','cancelled','Cancelled','active',1),(250,'supplier_returns','reason','expired','Expired','active',1),(251,'supplier_returns','reason','damaged','Damaged','active',1),(252,'supplier_returns','reason','poor quality','Poor Quality','active',1),(253,'supplier_returns','reason','unsold','Not Sold','active',1),(254,'supplier_returns','reason','callback','Callback','active',1),(255,'transactions','status','pending','Pending','active',1),(256,'transactions','status','closed','Closed','active',1),(257,'transactions','status','cancelled','Cancelled','active',1),(258,'transactions','status','partial','Partial','active',1),(259,'accounts','status','suspended','Suspended','active',1),(260,'accounts','status','retired','Retired','active',1),(261,'accounts','status','active','Active','active',1),(262,'accounts','type','customer','Customer','active',1),(263,'accounts','type','staff','Staff','active',1),(264,'accounts','type','supplier','Supplier','active',1),(265,'accounts','type','financial','Financial','active',1),(266,'accounts','type','master','Master','active',1),(267,'salaries','type','regular','Regular','active',1),(268,'salaries','type','adhoc','Ad-hoc','active',1),(269,'salaries','type','contracted','Contracted','active',1),(270,'payments','status','pending','Pending','active',1),(271,'payments','status','closed','Closed','active',1),(272,'payments','status','cancelled','Cancelled','active',1),(273,'payments','type','received','Received','active',1),(274,'payments','type','paid','Paid','active',1),(275,'bill_items','type','free','Free','active',1),(276,'bill_items','type','bought','Bought','active',1),(277,'offers','status','active','Active','active',1),(278,'offers','status','closed','Closed','active',1),(279,'offers','status','expired','Expired','active',1),(280,'offers','status','extended','Extended','active',1),(281,'offers','offer_type','bill','Bill','active',1),(282,'offers','offer_type','product','Product','active',1),(283,'offers','offer_type','service','Service','active',1),(284,'offers','criteria_type','min amount crossed','Minimum amount is crossed','active',1),(285,'offers','criteria_type','min quantity crossed','Minimum quantity is crossed','active',1),(286,'offers','result_type','discount','Discount','active',1),(287,'offers','result_type','quantity addition','Quantity is added','active',1),(288,'offers','result_type','product free','Product Free','active',1),(289,'offers','result_type','service free','Service Free','active',1),(290,'stock_request','status','suggested','Suggested','active',1),(291,'stock_request','status','verified','Verified','active',1),(292,'stock_request','status','completed','Completed','active',1),(293,'stock_request','status','discarded','Discarded','active',1),(294,'predicted_orders','status','suggested','Suggested','active',1),(295,'predicted_orders','status','discarded','Discarded','active',1),(296,'predicted_orders','status','pursuing','Pursuing','active',1),(297,'predicted_orders','status','completed','Completed','active',1),(298,'enqueued_mails','status','pending','Pending','active',1),(299,'enqueued_mails','status','discarded','Discarded','active',1),(300,'enqueued_mails','status','completed','Completed','active',1),(301,'bills','type','service','Service','active',1),(302,'bills','type','product','Product','active',1),(303,'store_areas','area_type','office','Office','active',1),(304,'store_areas','area_type','bin','Bin','active',1),(305,'store_areas','area_type','rack','Rack','active',1),(306,'store_areas','area_type','storage','Storage','active',1),(307,'store_areas','area_type','row','Row','active',1),(308,'store_areas','area_type','store','Store','active',1),(309,'store_areas','loc_type','internal','Internal','active',1),(310,'store_areas','loc_type','external','External','active',1),(311,'store_areas','faceEast','yes','Yes','active',1),(312,'store_areas','faceEast','no','No','active',1),(313,'store_areas','faceWest','yes','Yes','active',1),(314,'store_areas','faceWest','no','No','active',1),(315,'store_areas','faceNorth','yes','Yes','active',1),(316,'store_areas','faceNorth','no','No','active',1),(317,'store_areas','faceSouth','yes','Yes','active',1),(318,'store_areas','faceSouth','no','No','active',1),(319,'assets','type','information','Information','active',1),(320,'assets','type','intellectual property','Intellectual Property','active',1),(321,'assets','type','machine','Machine','active',1),(322,'assets','type','facility','Facility','active',1),(323,'assets','type','computer system','Computer System','active',1),(324,'assets','type','pda','PDA','active',1),(325,'assets','type','others','Others','active',1),(326,'assets','ownership_type','purchased','Purchased','active',1),(327,'assets','ownership_type','licensed','Licensed','active',1),(328,'assets','ownership_type','leased','Leased','active',1),(329,'assets','ownership_type','rented','Rented','active',1),(330,'assets','maintained_by','self','Self','active',1),(331,'assets','maintained_by','contractor','Contractor','active',1),(332,'assets','maintained_by','manufacturer','Manufacturer','active',1),(333,'disposals','method','destroyed','Destroyed','active',1),(334,'disposals','method','sold','Sold','active',1),(335,'disposals','method','recycled','Recycled','active',1),(336,'activities','type','create','Create','active',1),(337,'activities','type','delete','Delete','active',1),(338,'activities','type','update','Update','active',1),(339,'activities','user_display','yes','Yes','active',1),(340,'activities','user_display','no','No','active',1),(341,'activities','status','synced','Synced','active',1),(342,'activities','status','unsynced','Unsynced','active',1),(343,'notifications','status','pending','Pending','active',1),(344,'notifications','status','reviewed','Reviewed','active',1),(345,'notifications','status','closed','Closed','active',1),(346,'user_preferences','type','function','Function','active',1),(347,'user_preferences','type','report','Report','active',1),(348,'user_preferences','type','form','Form','active',1),(349,'user_preferences','type','accounting','Accounting','active',1),(350,'user_preferences','type','other','Other','active',1),(351,'user_preferences','type','template','Template','active',1),(352,'user_preferences','status','active','Active','active',1),(353,'user_preferences','status','inactive','Inactive','active',1),(354,'user_profiles','status','active','Active','active',1),(355,'user_profiles','status','inactive','Inactive','active',1),(356,'access_control','re','checked','checked','active',1),(357,'access_control','re','unchecked','unchecked','active',1),(358,'access_control','cr','checked','checked','active',1),(359,'access_control','cr','unchecked','unchecked','active',1),(360,'access_control','up','checked','checked','active',1),(361,'access_control','up','unchecked','unchecked','active',1),(362,'access_control','del','checked','checked','active',1),(363,'access_control','del','unchecked','unchecked','active',1),(364,'access_control','status','active','Active','active',1),(365,'access_control','status','inactive','Inactive','active',1),(366,'shortcuts','key','ctrl+alt+q','ctrl+alt+q','active',1),(367,'shortcuts','key','ctrl+alt+w','ctrl+alt+w','active',1),(368,'shortcuts','key','ctrl+alt+e','ctrl+alt+e','active',1),(369,'shortcuts','key','ctrl+alt+r','ctrl+alt+r','active',1),(370,'shortcuts','key','ctrl+alt+t','ctrl+alt+t','active',1),(371,'shortcuts','key','ctrl+alt+y','ctrl+alt+y','active',1),(372,'shortcuts','key','ctrl+alt+u','ctrl+alt+u','active',1),(373,'shortcuts','key','ctrl+alt+i','ctrl+alt+i','active',1),(374,'shortcuts','key','ctrl+alt+o','ctrl+alt+o','active',1),(375,'shortcuts','key','ctrl+alt+p','ctrl+alt+p','active',1),(376,'shortcuts','key','ctrl+alt+a','ctrl+alt+a','active',1),(377,'shortcuts','key','ctrl+alt+s','ctrl+alt+s','active',1),(378,'shortcuts','key','ctrl+alt+d','ctrl+alt+d','active',1),(379,'shortcuts','key','ctrl+alt+f','ctrl+alt+f','active',1),(380,'shortcuts','key','ctrl+alt+g','ctrl+alt+g','active',1),(381,'shortcuts','key','ctrl+alt+h','ctrl+alt+h','active',1),(382,'shortcuts','key','ctrl+alt+j','ctrl+alt+j','active',1),(383,'shortcuts','key','ctrl+alt+k','ctrl+alt+k','active',1),(384,'shortcuts','key','ctrl+alt+l','ctrl+alt+l','active',1),(385,'shortcuts','key','ctrl+alt+z','ctrl+alt+z','active',1),(386,'shortcuts','key','ctrl+alt+x','ctrl+alt+x','active',1),(387,'shortcuts','key','ctrl+alt+c','ctrl+alt+c','active',1),(388,'shortcuts','key','ctrl+alt+v','ctrl+alt+v','active',1),(389,'shortcuts','key','ctrl+alt+b','ctrl+alt+b','active',1),(390,'shortcuts','key','ctrl+alt+n','ctrl+alt+n','active',1),(391,'shortcuts','key','ctrl+alt+m','ctrl+alt+m','active',1),(392,'templates','status','inactive','Inactive','active',1),(393,'templates','status','active','Active','active',1),(394,'templates','type','sale bill','Sale Bill','active',1),(395,'templates','type','purchase order','Purchase Order','active',1),(396,'templates','type','payment receipt','Payment Receipt','active',1),(397,'templates','type','credit note','Credit Note','active',1),(398,'templates','type','newsletter','Newsletter','active',1),(399,'templates','type','service receipt','Service Receipt','active',1),(400,'templates','type','return receipt','Return Receipt','active',1),(401,'mandatory_attributes','status','required','Required','active',1),(402,'dimensions','unit','m','meter','active',1),(403,'dimensions','unit','cm','centimeter','active',1),(404,'dimensions','unit','mm','milimeter','active',1),(405,'dimensions','unit','km','kilometer','active',1),(406,'dimensions','unit','in','inch','active',1),(407,'dimensions','unit','ft','foot','active',1),(408,'item_picklist','pick_type','aggregated','Aggregated','active',1),(409,'item_picklist','pick_type','order-wise','Order-wise','active',1),(410,'bill_items','picked_status','pending','Pending','active',1),(411,'bill_items','picked_status','picked','Picked','active',1),(412,'checklist_items','status','active','Active','active',1),(413,'checklist_items','status','inactive','Inactive','active',1),(414,'checklist_items','status','required','Required','active',1),(415,'channel_category','type','category','Category','active',1),(416,'channel_category','type','sub-category','Sub-category','active',1),(417,'category_sku_mapping','cat_type','sub-category','Sub-category','active',1),(418,'category_sku_mapping','cat_type','category','Category','active',1),(419,'channel_prices','latest','yes','Yes','active',1),(420,'channel_prices','latest','no','No','active',1),(421,'supplier_bill_items','put_away_status','completed','Completed','active',1),(422,'supplier_bill_items','put_away_status','pending','Pending','active',1),(423,'unbilled_purchase_items','put_away_status','pending','Pending','active',1),(424,'unbilled_purchase_items','put_away_status','completed','Completed','active',1),(425,'unbilled_purchase_items','bill_status','pending','Pending','active',1),(426,'unbilled_purchase_items','bill_status','completed','Completed','active',1),(427,'unbilled_sale_items','bill_status','pending','Pending','active',1),(428,'unbilled_sale_items','bill_status','completed','Completed','active',1);
/*!40000 ALTER TABLE `values_list` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2015-06-14 10:25:53
