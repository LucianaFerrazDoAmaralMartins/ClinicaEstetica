CREATE DATABASE  IF NOT EXISTS `dbcomercial` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `dbcomercial`;
-- MySQL dump 10.13  Distrib 8.0.18, for Win64 (x86_64)
--
-- Host: localhost    Database: dbcomercial
-- ------------------------------------------------------
-- Server version	8.0.27

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
-- Table structure for table `produto`
--

DROP TABLE IF EXISTS `produto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `produto` (
  `idproduto` bigint NOT NULL AUTO_INCREMENT,
  `nomeproduto` varchar(50) NOT NULL,
  `descricao` text NOT NULL,
  `preco` decimal(10,2) NOT NULL,
  `foto1` varchar(100) NOT NULL,
  `foto2` varchar(100) NOT NULL,
  `foto3` varchar(100) NOT NULL,
  PRIMARY KEY (`idproduto`)
) ENGINE=MyISAM AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `produto`
--

LOCK TABLES `produto` WRITE;
/*!40000 ALTER TABLE `produto` DISABLE KEYS */;
INSERT INTO `produto` VALUES (5,'Ventosaterapia','Terapia aplicada com técnica feita através de copos para produzir sucção na pele para liberar estagnação de energia Qi e Xue nos canais de energia. Facial e corporal para diversas finalidades terapêuticas.',110.00,'Ventosaterapia.jpg','',''),(2,'Acupuntura ','Seu principal objetivo é promover desbloqueio das energias estagnadas, melhorar a circulação nos canais de energia nos meridianos e fluxo da energia vital.',170.00,'Acupuntura.jpg','',''),(3,'Massagem terapêutica','Tem como objetivo modular o stress, aliviar tensões musculares, estimular a circulação e energia vital através de manobras manuais no corpo.',150.00,'Massagem.png','',''),(4,'Reflexologia Podal','Tem como objetivo atuar na prevenção e tratamento de disfunções energéticas e desbloqueios do chakras através de massagem que utiliza pressão nos pontos dos pés correspondentes aos órgãos e víceras do corpo humano.',125.00,'Reflexologia.jpg','',''),(11,'Moxabustão','A Moxaterapia é uma técnica que utiliza Artemísa seca para doar energia, esquentando os pontos dos canais de energia, cujo benefício é promover o bem estar como um todo. ',35.00,'Moxabustao.jpg','',''),(8,'Aromaterapia','Prática integrativa e complementares que utiliza os aromas naturais extraídos de óleos essenciais de plantas e flores.',85.00,'Aromaterapia.jpg','','');
/*!40000 ALTER TABLE `produto` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-03-21 17:37:52
