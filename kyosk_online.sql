/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

CREATE DATABASE IF NOT EXISTS `kyosk_online` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `kyosk_online`;

CREATE TABLE IF NOT EXISTS `consumo` (
  `CODIGO` int(11) NOT NULL AUTO_INCREMENT,
  `COD_MESA` int(11) NOT NULL,
  `COD_USUARIO` varchar(6) DEFAULT NULL,
  `COD_PRODUTO` varchar(6) DEFAULT NULL,
  `PRODUTO` varchar(100) DEFAULT NULL,
  `QTDE` float DEFAULT NULL,
  `UNITARIO` float DEFAULT NULL,
  `TOTAL` float DEFAULT NULL,
  `TRANSF_MESA` int(11) DEFAULT NULL,
  `CANCELADO` int(11) DEFAULT NULL,
  `HORA` varchar(10) DEFAULT NULL,
  `COMPLEMENTO` varchar(100) DEFAULT NULL,
  `COMPLEMENTO2` varchar(200) DEFAULT NULL,
  `IMPRESSO` int(11) DEFAULT NULL,
  `COD_AGRUP` varchar(10) DEFAULT NULL,
  `CODSUBGRUPO` varchar(6) DEFAULT NULL,
  `ADICIONAL` varchar(2) DEFAULT NULL,
  `ADC_CODITEM` varchar(10) DEFAULT NULL,
  `COD_TEMP` varchar(45) DEFAULT NULL,
  `NAOSINCRONIZADO` int(11) DEFAULT NULL,
  `DATA` varchar(45) DEFAULT NULL,
  `DISPOSITIVO` varchar(60) DEFAULT NULL,
  `PAGO` varchar(5) DEFAULT NULL,
  PRIMARY KEY (`CODIGO`),
  KEY `fk_consumo_mesa1_idx` (`COD_MESA`),
  KEY `fk_consumo_produto1_idx` (`COD_PRODUTO`),
  CONSTRAINT `fk_consumo_mesa1` FOREIGN KEY (`COD_MESA`) REFERENCES `mesa` (`COD_MESA`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_consumo_produto1` FOREIGN KEY (`COD_PRODUTO`) REFERENCES `produto` (`CODIGO`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*!40000 ALTER TABLE `consumo` DISABLE KEYS */;
/*!40000 ALTER TABLE `consumo` ENABLE KEYS */;

CREATE TABLE IF NOT EXISTS `empresa` (
  `CODIGO` varchar(6) NOT NULL,
  `FILIAL` varchar(100) DEFAULT NULL,
  `FANTASIA` varchar(60) DEFAULT NULL,
  `ENDERECO` varchar(50) DEFAULT NULL,
  `NUMERO` varchar(10) DEFAULT NULL,
  `BAIRRO` varchar(45) DEFAULT NULL,
  `CIDADE` varchar(50) DEFAULT NULL,
  `UF` varchar(3) DEFAULT NULL,
  `CEP` varchar(45) DEFAULT NULL,
  `CNPJ` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`CODIGO`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*!40000 ALTER TABLE `empresa` DISABLE KEYS */;
INSERT INTO `empresa` (`CODIGO`, `FILIAL`, `FANTASIA`, `ENDERECO`, `NUMERO`, `BAIRRO`, `CIDADE`, `UF`, `CEP`, `CNPJ`) VALUES
	('000001', 'empresa teste', 'empresa teste', 'rua teste', '100', 'centro', 'rolim de moura', 'ro', '76940000', '15105777000198');
/*!40000 ALTER TABLE `empresa` ENABLE KEYS */;

CREATE TABLE IF NOT EXISTS `grupo` (
  `CODIGO` varchar(6) NOT NULL,
  `GRUPO` varchar(60) NOT NULL,
  `NAO_MOSTRA_KYOSK` varchar(2) DEFAULT NULL,
  PRIMARY KEY (`CODIGO`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*!40000 ALTER TABLE `grupo` DISABLE KEYS */;
INSERT INTO `grupo` (`CODIGO`, `GRUPO`, `NAO_MOSTRA_KYOSK`) VALUES
	('000001', 'PORCOES', 'N'),
	('000002', 'BURGUER GOURMET', 'N'),
	('000003', 'LANCHES', 'N'),
	('000004', 'CARNES NA PARRILHA', 'N'),
	('000005', 'GRELHADOS', 'N'),
	('000006', 'GUARNICOES', 'N'),
	('000007', 'BEBIDAS', 'N'),
	('000008', 'CHOPP E CERVEJAS', 'N'),
	('000009', 'DRINKS', 'N'),
	('000010', 'VINHOS E DESTILADOS', 'N'),
	('000011', 'SOBREMESA', 'N'),
	('000012', 'COMBOS - LANCHES', 'N'),
	('000013', 'PIZZAS', 'N'),
	('000014', 'AD. LANCHES', 'N'),
	('000015', 'BORDAS SALGADAS', 'N'),
	('000016', 'OPICIONAIS LANCHES', 'N');
/*!40000 ALTER TABLE `grupo` ENABLE KEYS */;

CREATE TABLE IF NOT EXISTS `ingrediente` (
  `CODIGO` varchar(6) NOT NULL,
  `NOME` varchar(50) NOT NULL,
  PRIMARY KEY (`CODIGO`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*!40000 ALTER TABLE `ingrediente` DISABLE KEYS */;
INSERT INTO `ingrediente` (`CODIGO`, `NOME`) VALUES
	('000001', 'QUEIJO'),
	('000002', 'FARINHA'),
	('000003', 'PEPINO');
/*!40000 ALTER TABLE `ingrediente` ENABLE KEYS */;

CREATE TABLE IF NOT EXISTS `item_adicional` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `CODADICIONAL` varchar(6) DEFAULT NULL,
  `QTDE` double DEFAULT NULL,
  `PRECO` double DEFAULT NULL,
  `CODITEM` varchar(6) DEFAULT NULL,
  `CONSUMO` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `fk_item_ingrediente_consumo1_idx` (`CONSUMO`),
  CONSTRAINT `item_adicional_ibfk_1` FOREIGN KEY (`CONSUMO`) REFERENCES `consumo` (`CODIGO`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

/*!40000 ALTER TABLE `item_adicional` DISABLE KEYS */;
/*!40000 ALTER TABLE `item_adicional` ENABLE KEYS */;

CREATE TABLE IF NOT EXISTS `item_ingrediente` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `CODIGO` varchar(45) DEFAULT NULL,
  `CODVENDA` int(11) DEFAULT NULL,
  `CODPRODUTO` varchar(6) DEFAULT NULL,
  `CODINGREDIENTE` varchar(6) DEFAULT NULL,
  `CODITEM` varchar(6) DEFAULT NULL,
  `CANCELADO` int(11) DEFAULT NULL,
  `PAGO` varchar(5) DEFAULT NULL,
  `CONSUMO` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `fk_item_ingrediente_consumo1_idx` (`CONSUMO`),
  CONSTRAINT `fk_item_ingrediente_consumo1` FOREIGN KEY (`CONSUMO`) REFERENCES `consumo` (`CODIGO`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*!40000 ALTER TABLE `item_ingrediente` DISABLE KEYS */;
/*!40000 ALTER TABLE `item_ingrediente` ENABLE KEYS */;

CREATE TABLE IF NOT EXISTS `item_opcional` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `CODOPCIONAL` varchar(6) DEFAULT NULL,
  `CODITEM` varchar(6) DEFAULT NULL,
  `CONSUMO` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `fk_item_ingrediente_consumo1_idx` (`CONSUMO`),
  CONSTRAINT `item_adicional_ibfk_1` FOREIGN KEY (`CONSUMO`) REFERENCES `consumo` (`CODIGO`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

/*!40000 ALTER TABLE `item_adicional` DISABLE KEYS */;
/*!40000 ALTER TABLE `item_adicional` ENABLE KEYS */;

CREATE TABLE IF NOT EXISTS `mesa` (
  `COD_MESA` int(11) NOT NULL,
  `DATA` varchar(45) DEFAULT NULL,
  `HORA` varchar(10) DEFAULT NULL,
  `COD_FUNCIONARIO` varchar(45) DEFAULT NULL,
  `NUM_MESA_ACOMODACAO` int(11) DEFAULT NULL,
	`QUANT_DIVIDIR_CONTA` int(11) DEFAULT NULL,
  `ACRESCIMO` float DEFAULT NULL,
  `SITUACAO` int(11) DEFAULT NULL,
  `EMPRESA` varchar(6) DEFAULT NULL,
  PRIMARY KEY (`COD_MESA`),
  KEY `fk_mesa_empresa1_idx` (`EMPRESA`),
  CONSTRAINT `fk_mesa_empresa1` FOREIGN KEY (`EMPRESA`) REFERENCES `empresa` (`CODIGO`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*!40000 ALTER TABLE `mesa` DISABLE KEYS */;
/*!40000 ALTER TABLE `mesa` ENABLE KEYS */;

CREATE TABLE IF NOT EXISTS `produto` (
  `CODIGO` varchar(6) NOT NULL,
  `PRODUTO` varchar(100) NOT NULL,
  `UNIDADE` varchar(3) DEFAULT NULL,
  `PRECOVENDA` float NOT NULL,
  `SITUACAO` int(11) NOT NULL,
  `ADICIONAL` varchar(2) DEFAULT 'N',
  `CODGRUPO` varchar(6) DEFAULT NULL,
  `CODSUBGRUPO` varchar(6) DEFAULT '000000',
  `PRODUTO_MONTADO` varchar(2) DEFAULT NULL,
  `MOSTRA_KYOSK_APP` varchar(2) DEFAULT NULL,
  `PRECO_PROMOCAO` float DEFAULT NULL,
  `DT_INICIO_PROMOCAO` varchar(45) DEFAULT NULL,
  `DT_FIM_PROMOCAO` varchar(45) DEFAULT NULL,
  `HORA_INICIO_PROMOCAO` varchar(45) DEFAULT NULL,
  `HORA_FIM_PROMOCAO` varchar(45) DEFAULT NULL,
  `HORARIO_PROMOCAO` int(11) DEFAULT NULL,
  `USA_BALANCA` int(11) DEFAULT NULL,
  `USA_TALHERES` int(11) DEFAULT NULL,
  `USA_PONTO_CARNE` int(11) DEFAULT NULL,
  `USA_COPOS` int(11) DEFAULT NULL,
  `ACOMPANHAMENTO` varchar(200) DEFAULT NULL,
  `FOTO` varchar(200) DEFAULT NULL,
  `OPCIONAL` varchar(2) DEFAULT 'N',
	`DESTAQUE` varchar(2) DEFAULT 'N',
  `PROMO_DIAS_SEMANA` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`CODIGO`),
  KEY `fk_produto_grupo_idx` (`CODGRUPO`),
  CONSTRAINT `fk_produto_grupo` FOREIGN KEY (`CODGRUPO`) REFERENCES `grupo` (`CODIGO`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*!40000 ALTER TABLE `produto` DISABLE KEYS */;
INSERT INTO `produto` (`CODIGO`, `PRODUTO`, `UNIDADE`, `PRECOVENDA`, `SITUACAO`, `ADICIONAL`, `CODGRUPO`, `CODSUBGRUPO`, `PRODUTO_MONTADO`, `MOSTRA_KYOSK_APP`, `PRECO_PROMOCAO`, `DT_INICIO_PROMOCAO`, `DT_FIM_PROMOCAO`, `HORA_INICIO_PROMOCAO`, `HORA_FIM_PROMOCAO`, `HORARIO_PROMOCAO`, `USA_BALANCA`, `USA_TALHERES`, `USA_PONTO_CARNE`, `USA_COPOS`, `ACOMPANHAMENTO`, `FOTO`, `OPCIONAL`, `PROMO_DIAS_SEMANA`) VALUES
	('000003', 'BIFE ACEBOLADO', 'UN', 26, 0, '', '000005', '', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', '', '[]'),
	('000004', 'FILE DE FRANGO GRELHADO', 'KG', 26, 0, '', '000005', '', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', '', '[]'),
	('000005', 'BISTECA SUINA GRELHADA', 'KG', 26, 0, '', '000005', '', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', '', '[]'),
	('000008', 'FEIJAO TROPEIRO', 'UN', 10, 0, '', '000006', '', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', '', '[]'),
	('000010', 'SALADA', 'UN', 7, 0, '', '000006', '', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', '', '[]'),
	('000011', 'PICANHA GRELHADA', 'UN', 38, 0, '', '000005', '', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', '', '[]'),
	('000019', 'FRITAS', 'UN', 9, 0, '', '000001', '', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', '', '[]'),
	('000022', 'FILE ACEBOLADO COM MANDIOCA', 'UN', 62, 0, '', '000001', '', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 1, 1, 0, 'FILE CEBOLA MANDIOCA', '', '', '[]'),
	('000023', 'PICANHA COM MANDIOCA', 'UN', 71, 0, '', '000001', '', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', '', '[]'),
	('000029', 'COSTELINHA SUINA COM FRITAS', 'UN', 45, 0, '', '000001', '', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', '', '[]'),
	('000033', 'COSTELINHA DE TAMBAQUI', 'UN', 58, 0, '', '000001', '', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', '', '[]'),
	('000034', 'FILE DE TILAPIA', 'UN', 58, 0, '', '000001', '', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', '', '[]'),
	('000039', 'FRANGO BACON', 'UN', 46, 0, '', '000001', '', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 1, 0, 0, 'DELICIOSA PIZZA DE FRANGO COM BACON', '', '', '[]'),
	('000040', 'CALABRESA', 'UN', 39, 0, '', '000001', '', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', '', '[]'),
	('000047', 'BATATA PALITO', 'UN', 30, 0, '', '000001', '', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', '', '[]'),
	('000048', 'CHEESE FRANGO', 'UN', 17, 0, '', '000003', '', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', '', '[]'),
	('000049', 'CHEESE FRANGO CATUPIRY', 'UN', 18, 0, '', '000003', '', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', '', '[]'),
	('000050', 'PICANHA CATUPIRY', 'UN', 26, 0, '', '000003', '', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', '', '[]'),
	('000057', 'FILE GRAU', 'UN', 23, 0, '', '000003', '', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', '', '[]'),
	('000061', 'FILE CATUPIRY', 'UN', 24, 0, '', '000003', '', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', '', '[]'),
	('000065', 'FILE CEBOLA PICANTE', 'UN', 25, 0, '', '000003', '', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', '', '[]'),
	('000074', 'ZERINHO', 'UN', 13, 0, '', '000003', '', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', '', '[]'),
	('000075', 'CHEESE SALADA', 'UN', 15, 0, '', '000003', '', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', '', '[]'),
	('000077', 'CHEESE BACON', 'UN', 21, 0, '', '000003', '', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', '', '[]'),
	('000083', 'TRI GRAU', 'UN', 28, 0, '', '000003', '', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', '', '[]'),
	('000084', 'X - TUDO', 'UN', 29, 0, '', '000003', '', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', '', '[]'),
	('000089', 'MEGA GRAU', 'UN', 26, 0, '', '000003', '', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', '', '[]'),
	('000093', 'FILE MIGNON - MEDIO', 'UN', 72, 0, '', '000004', '000003', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', '', '[]'),
	('000094', 'FILE MIGNON - GRANDE', 'UN', 126, 0, '', '000004', '000003', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', '', '[]'),
	('000095', 'VINAGRETE', 'UN', 6, 0, '', '000006', '', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', '', '[]'),
	('000100', 'PICANHA GRIL- MEDIA', 'UN', 104, 0, '', '000004', '000001', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', '', '[]'),
	('000101', 'PICANHA GRIL - GRANDE', 'UN', 159, 0, '', '000004', '000001', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', '', '[]'),
	('000116', 'CERVEJA SUJA - DUPLO MALTE', 'UN', 17, 0, '', '000008', '000008', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', '', '[]'),
	('000117', 'CERVEJA SUJA - BRAHMA', 'UN', 15, 0, '', '000008', '000008', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', '', '[]'),
	('000120', 'BRAHMA 600ML', 'UN', 9, 0, '', '000008', '', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', '', '[]'),
	('000121', 'SKOL 600ML', 'UN', 9, 0, '', '000008', '', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', '', '[]'),
	('000125', 'CERVEJA BUDWEISER LONG NECK', 'UN', 8, 0, '', '000008', '', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', '', '[]'),
	('000139', 'VODKA SMIRNOFF - DOSE', 'UN', 9, 0, '', '000010', '', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', '', '[]'),
	('000140', 'OLD PARR - DOSE', 'UN', 22, 0, '', '000010', '', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', '', '[]'),
	('000142', 'TEQUILA - DOSE', 'UN', 14, 0, '', '000010', '', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', '', '[]'),
	('000180', 'CERVEJA SUJA - BRAHMA SEM ALCOOL', 'UN', 15, 0, '', '000008', '000008', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', '', '[]'),
	('000204', 'AD. BORDA CHEDDAR', 'UN', 8, 0, 'S', '000015', '', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', '', '[]'),
	('000214', 'CAIPIRINHA', 'UN', 18, 0, '', '000009', '', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', '', '[]'),
	('000247', 'BRAHMA ZERO LONG NECK', 'UN', 7, 0, '', '000008', '', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', '', '[]'),
	('000251', 'FRANGO A MILANESA', 'UN', 38, 0, '', '000001', '', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', '', '[]'),
	('000337', 'CALABRESA', 'UN', 49, 0, '', '000013', '000010', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', '', '[]'),
	('000343', 'CALABRESA', 'UN', 39, 0, '', '000013', '000009', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', '', '[]'),
	('000345', 'QUATRO QUEIJOS', 'UN', 49, 0, '', '000013', '000010', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', '', '[]'),
	('000350', 'PORTUGUESA', 'UN', 39, 0, '', '000013', '000009', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', '', '[]'),
	('000353', 'MARGARITA', 'UN', 49, 0, '', '000013', '000010', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', '', '[]'),
	('000356', 'BEIJINHO', 'UN', 26, 0, '', '000013', '000012', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', '', '[]'),
	('000358', 'BEIJINHO', 'UN', 21, 0, '', '000013', '000011', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', '', '[]'),
	('000363', 'BRIGADEIRO', 'UN', 26, 0, '', '000013', '000012', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', '', '[]'),
	('000364', 'PRESTIGIO', 'UN', 21, 0, '', '000013', '000011', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', '', '[]'),
	('000366', 'CHOCOLATE COM MORANGO', 'UN', 21, 0, '', '000013', '000011', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', '', '[]'),
	('000369', 'STROGONOFF DE FRANGO COM BATATAS CHIPS', 'UN', 49, 0, '', '000013', '000010', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 1, 0, 0, 'TESTE TESTE TESTE', '', '', '[]'),
	('000371', 'STROGONOFF DE FRANGO COM BATATAS CHIPS', 'UN', 39, 0, '', '000013', '000009', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', '', '[]'),
	('000373', 'FRANGO C/ CATUPIRY', 'UN', 39, 0, '', '000013', '000009', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', '', '[]'),
	('000374', 'STROGONOFF DE CARNE COM BATATAS CHIPS', 'UN', 49, 0, '', '000013', '000010', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', '', '[]'),
	('000375', 'STROGONOFF DE CARNE COM BATATAS CHIPS', 'UN', 39, 0, '', '000013', '000009', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', '', '[]'),
	('000376', 'BAIANA COM DORITOS', 'UN', 39, 0, '', '000013', '000009', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', '', '[]'),
	('001374', 'BRIGADEIRO', 'UN', 21, 0, '', '000013', '000011', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', '', '[]'),
	('001375', 'LOMBINHO AO BARBECUE', 'UN', 39, 0, '', '000013', '000009', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', '', '[]'),
	('001376', 'PROVENCAL', 'UN', 39, 0, '', '000013', '000009', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', '', '[]'),
	('001377', 'MOQUECA DE CAMARAO', 'UN', 44, 0, '', '000013', '000009', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', '', '[]'),
	('001381', 'CHURRASQUITO', 'UN', 44, 0, '', '000013', '000009', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', '', '[]'),
	('001384', 'FRANGO A PASSARINHO', 'UN', 33, 0, '', '000001', '', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', '', '[]'),
	('001386', 'BATATA GOURMET CHEDDAR E BACON', 'UN', 34, 0, '', '000001', '', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', '', '[]'),
	('001388', 'ONION RINGS', 'UN', 17, 0, '', '000001', '', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', '', '[]'),
	('001397', 'BURGUER BACON GRAU', 'UN', 26, 0, '', '000002', '', 'S', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 1, 0, 'PAO BRIOCHE HAMBURGUER 200 G BACON', '', '', '[]'),
	('001399', 'BURGUER ONION PESTO GRAU', 'UN', 24, 0, '', '000002', '', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', '', '[]'),
	('001400', 'BURGUER CARAMELO GRAU', 'UN', 26, 0, '', '000002', '', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', '', '[]'),
	('001401', 'BURGUER SALAD GRAU', 'UN', 24, 0, '', '000002', '', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', '', '[]'),
	('001402', 'BURGUER CRISPY GRAU', 'UN', 24, 0, '', '000002', '', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', '', '[]'),
	('001403', 'BURGUER CASCATA GRAU', 'UN', 30, 0, '', '000002', '', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', '', '[]'),
	('001407', 'ARROZ BIRO BIRO', 'UN', 10, 0, '', '000006', '', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', '', '[]'),
	('001410', 'ARROZ BRANCO', 'UN', 6, 0, '', '000006', '', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', '', '[]'),
	('001412', 'ARROZ COM BROCOLIS', 'UN', 8, 0, '', '000006', '', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', '', '[]'),
	('001414', 'BANANA A MILANESA', 'UN', 5, 0, '', '000006', '', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', '', '[]'),
	('001415', 'BANANA DA TERRA', 'UN', 5, 0, '', '000006', '', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', '', '[]'),
	('001416', 'FAROFA DA CASA', 'UN', 7, 0, '', '000006', '', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', '', '[]'),
	('001418', 'QUEIJO PROVOLONE', 'UN', 16, 0, '', '000006', '', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', '', '[]'),
	('001421', 'FRALDINHA INTEIRA', 'UN', 126, 0, '', '000004', '000002', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', '', '[]'),
	('001422', 'FRALDINHA MEIA', 'UN', 74, 0, '', '000004', '000002', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', '', '[]'),
	('001437', 'MOQUECA DE CAMARAO', 'UN', 54, 0, '', '000013', '000010', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', '', '[]'),
	('001441', 'CERVEJA SUJA - SKOL', 'UN', 16, 0, '', '000008', '000008', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', '', '[]'),
	('001442', 'CERVEJA SUJA - ORIGINAL', 'UN', 17, 0, '', '000008', '000008', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', '', '[]'),
	('001446', 'VODKA ABSOLUT DOSE', 'UN', 13, 0, '', '000010', '', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', '', '[]'),
	('001451', 'MANDIOCA FRITA', 'UN', 24, 0, '', '000001', '', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', '', '[]'),
	('001452', 'COSTELINHA SUINA COM MANDIOCA', 'UN', 45, 0, '', '000001', '', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', '', '[]'),
	('001456', 'CHURROS GOURMET', 'UN', 16, 0, '', '000011', '', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', '', '[]'),
	('001483', 'CDB (LIMAO C/ SAL)', 'UN', 2, 0, '', '000008', '', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', '', '[]'),
	('001522', 'WHITE RUSSIAN', 'UN', 20, 0, '', '000009', '', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', '', '[]'),
	('001523', 'MARGARITA', 'UN', 39, 0, '', '000013', '000009', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', '', '[]'),
	('001575', 'BRAHMA DUPLO MALTE 600ML', 'UN', 8, 0, '', '000008', '', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', '', '[]'),
	('001581', 'RUCULA C/ TOMATE SECO', 'UN', 49, 0, '', '000013', '000010', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', '', '[]'),
	('001583', 'ATUM', 'UN', 49, 0, '', '000013', '000010', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', '', '[]'),
	('001586', 'RUCULA C/ TOMATE SECO', 'UN', 39, 0, '', '000013', '000009', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', '', '[]'),
	('001588', 'ATUM', 'UN', 39, 0, '', '000013', '000009', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', '', '[]'),
	('001598', 'BANANA C/ CANELA', 'UN', 21, 0, '', '000013', '000011', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', '', '[]'),
	('001613', 'COZUMEL', 'UN', 11, 0, '', '000008', '', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', '', '[]'),
	('001615', 'BECKS LONG NECK', 'UN', 9, 0, '', '000008', '', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', '', '[]'),
	('001617', 'APEROL SPRITZ', 'UN', 22, 0, '', '000009', '', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', '', '[]'),
	('001620', 'MAITAI', 'UN', 22, 0, '', '000009', '', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', '', '[]'),
	('001621', 'MOSCOW MULE', 'UN', 22, 0, '', '000009', '', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', '', '[]'),
	('001622', 'BIGODE ROXO', 'UN', 22, 0, '', '000009', '', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', '', '[]'),
	('001623', 'TREE LEMON', 'UN', 20, 0, '', '000009', '', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', '', '[]'),
	('001624', 'LEMON RAPADURA', 'UN', 20, 0, '', '000009', '', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', '', '[]'),
	('001625', 'STRAWBERRY GIN', 'UN', 22, 0, '', '000009', '', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', '', '[]'),
	('001627', 'CAIPIROSKA MINI SAIA MARACUJA', 'UN', 20, 0, '', '000009', '', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', '', '[]'),
	('001628', 'CAIPIROSKA MINI SAIA LIMAO', 'UN', 20, 0, '', '000009', '', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', '', '[]'),
	('001629', 'CAIPIROSKA COM CHA DE LIMAO', 'UN', 20, 0, '', '000009', '', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', '', '[]'),
	('001630', 'CAIPIROSKA COM CHA DE MORANGO', 'UN', 20, 0, '', '000009', '', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', '', '[]'),
	('001631', 'CAIPIROSKA COM RAPADURA', 'UN', 20, 0, '', '000009', '', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', '', '[]'),
	('001632', 'CAIPIROSKA TREE LEMON', 'UN', 20, 0, '', '000009', '', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', '', '[]'),
	('001633', 'DRINK ZERO GRAU', 'UN', 25, 0, '', '000009', '', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', '', '[]'),
	('001634', 'DRINK ZERO ALCOOL', 'UN', 18, 0, '', '000009', '', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', '', '[]'),
	('001635', 'AMORA GIN', 'UN', 20, 0, '', '000009', '', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', '', '[]'),
	('001636', 'CAIPIROSKA TRADICIONAL', 'UN', 18, 0, '', '000009', '', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', '', '[]'),
	('001667', 'BOHEMIA PURO MALTE 600ML', 'UN', 7, 0, '', '000008', '', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', '', '[]'),
	('001675', 'CERVEJA SUJA - BOHEMIA', 'UN', 15, 0, '', '000008', '000008', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 1, '', '', '', '[]'),
	('001678', 'CHEVETTE TURBO', 'UN', 22, 0, '', '000009', '', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', '', '[]'),
	('001679', 'SAFIRA', 'UN', 25, 0, '', '000009', '', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', '', '[]'),
	('001691', 'COMBO - X SALADA', 'UN', 25, 0, '', '000012', '', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '01- X - SALADA\r\n01 - REFRIGERANTE GUARANA ANTARTICA 269 ML\r\n01 - BATATA FRITA - PEQUENA', '', '', '[]'),
	('001692', 'COMBO CHEDDAR GRAU', 'UN', 25, 0, '', '000012', '', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '01 - CHEDDAR GRAU\r\n01 - REFRIGERANTE GUARANA ANTARTICA 269 ML\r\n01 - BATATA FRITA - PEQUENA', '', '', '[]'),
	('001693', 'COMBO PICANHA GRAU', 'UN', 32, 0, '', '000012', '', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '01 - PICANHA GRAUS\r\n01 - REFRIGERANTE GUANRA ANTARITCA 269 ML\r\n01 - BATATA FRITA - PEQUENA', '', '', '[]'),
	('001694', 'COMBO - X FRANGO', 'UN', 26, 0, '', '000012', '', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 1, 1, 0, '01 - X - FRANGO\r\n01 - REFRIGERANTE GUARANA ANTARTICA 269 ML\r\n01 - BATATA FRITA - PEQUENA', '', '', '[]'),
	('001697', 'CHEDDAR GRAU', 'UN', 17, 0, '', '000003', '', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', '', '[]'),
	('001698', 'PICANHA GRAU', 'UN', 26, 0, '', '000003', '', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', '', '[]'),
	('001708', 'HEINEKEN LONG NECK', 'UN', 11, 0, '', '000008', '', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', '', '[]'),
	('001744', 'VINHO TINTO SUAVE NATURELLE', 'UN', 100, 0, '', '000010', '', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', '', '[]'),
	('001748', 'BATATA CONE', 'UN', 11, 0, '', '000001', '', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', '', '[]'),
	('001753', 'VINHO TINTO SECO DON GUERINO SINAIS', 'UN', 100, 0, '', '000010', '', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', '', '[]'),
	('001763', 'FRITAS', 'UN', 8, 0, '', '000006', '', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', '', '[]'),
	('001764', 'PORTUGUESA', 'UN', 49, 0, '', '000013', '000010', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', '', '[]'),
	('001765', 'FRANGO C/ CATUPIRY', 'UN', 49, 0, '', '000013', '000010', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 1, 0, 0, 'FRANGO CATUPIRY CEBOLA TOMATE', '', '', '[]'),
	('001766', 'BAIANA COM DORITOS', 'UN', 49, 0, '', '000013', '000010', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', '', '[]'),
	('001767', 'LOMBINHO AO BARBECUE', 'UN', 49, 0, '', '000013', '000010', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', '', '[]'),
	('001768', 'PROVENCAL', 'UN', 49, 0, '', '000013', '000010', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', '', '[]'),
	('001769', 'CHURRASQUITO', 'UN', 54, 0, '', '000013', '000010', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', '', '[]'),
	('001770', 'PRESTIGIO', 'UN', 26, 0, '', '000013', '000012', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', '', '[]'),
	('001771', 'CHOCOLATE COM MORANGO', 'UN', 26, 0, '', '000013', '000012', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', '', '[]'),
	('001772', 'BANANA C/ CANELA', 'UN', 26, 0, '', '000013', '000012', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', '', '[]'),
	('001774', 'AD. BORDA REQUEIJAO', 'UN', 7, 0, 'S', '000015', '', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', '', '[]'),
	('001775', 'AD. BORDA CATUPIRY', 'UN', 6, 0, 'S', '000015', '', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', '', '[]'),
	('001776', 'OP .  CATUPIRY', 'UN', 0, 0, 'N', '000016', '', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', 'S', '[]'),
	('001777', 'OP .  MILHO', 'UN', 0, 0, 'N', '000016', '', '', '1', 0, '1899/12/30', '1899/12/30', '00:00:01', '23:59:00', 0, 0, 0, 0, 0, '', '', 'S', '[]');
/*!40000 ALTER TABLE `produto` ENABLE KEYS */;

CREATE TABLE IF NOT EXISTS `produto_adicional` (
  `CODIGO` varchar(6) NOT NULL,
  `CODPRODUTO` varchar(6) NOT NULL,
  `PROD_ADICIONAL` varchar(6) NOT NULL,
  PRIMARY KEY (`CODIGO`),
  KEY `fk_produto_adicional_produto1_idx` (`CODPRODUTO`),
  CONSTRAINT `fk_produto_adicional_produto1` FOREIGN KEY (`CODPRODUTO`) REFERENCES `produto` (`CODIGO`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*!40000 ALTER TABLE `produto_adicional` DISABLE KEYS */;
INSERT INTO `produto_adicional` (`CODIGO`, `CODPRODUTO`, `PROD_ADICIONAL`) VALUES
	('000001', '001765', '001775'),
	('000002', '001765', '000204'),
	('000003', '001765', '001774'),
	('000004', '000369', '001775'),
	('000005', '000369', '000204'),
	('000006', '000369', '001774'),
	('000007', '000022', '000167'),
	('000008', '000022', '000155'),
	('000009', '001397', '001773'),
	('000010', '001397', '001775'),
	('000011', '001397', '000204'),
	('000012', '001397', '001774'),
	('000013', '001397', '000167'),
	('000014', '001397', '000155'),
	('000015', '001397', '000161');
/*!40000 ALTER TABLE `produto_adicional` ENABLE KEYS */;

CREATE TABLE IF NOT EXISTS `produto_ingrediente` (
  `CODIGO` varchar(6) NOT NULL,
  `CODPRODUTO` varchar(6) NOT NULL,
  `CODINGREDIENTE` varchar(6) DEFAULT NULL,
  PRIMARY KEY (`CODIGO`),
  KEY `fk_produto_ingrediente_produto1_idx` (`CODPRODUTO`),
  KEY `fk_produto_ingrediente_ingrediente1_idx` (`CODINGREDIENTE`),
  CONSTRAINT `fk_produto_ingrediente_ingrediente1` FOREIGN KEY (`CODINGREDIENTE`) REFERENCES `ingrediente` (`CODIGO`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_produto_ingrediente_produto1` FOREIGN KEY (`CODPRODUTO`) REFERENCES `produto` (`CODIGO`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*!40000 ALTER TABLE `produto_ingrediente` DISABLE KEYS */;
INSERT INTO `produto_ingrediente` (`CODIGO`, `CODPRODUTO`, `CODINGREDIENTE`) VALUES
	('000001', '001765', '000002'),
	('000002', '001765', '000003'),
	('000003', '001765', '000001'),
	('000004', '000369', '000002'),
	('000005', '000369', '000003'),
	('000006', '000369', '000001'),
	('000007', '000022', '000002'),
	('000008', '000022', '000003'),
	('000009', '000022', '000001'),
	('000010', '001397', '000003'),
	('000011', '001397', '000001');
/*!40000 ALTER TABLE `produto_ingrediente` ENABLE KEYS */;

CREATE TABLE IF NOT EXISTS `produto_opcional` (
  `CODIGO` int(11) NOT NULL,
  `CODPRODUTO` varchar(6) NOT NULL,
  `CODOPCIONAL` varchar(6) NOT NULL,
  PRIMARY KEY (`CODIGO`),
  KEY `fk_produto_opcional_produto1_idx` (`CODPRODUTO`),
  CONSTRAINT `fk_produto_opcional_produto1` FOREIGN KEY (`CODPRODUTO`) REFERENCES `produto` (`CODIGO`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*!40000 ALTER TABLE `produto_opcional` DISABLE KEYS */;
INSERT INTO `produto_opcional` (`CODIGO`, `CODPRODUTO`, `CODOPCIONAL`) VALUES
	(1, '001765', '001776'),
	(2, '001765', '001777'),
	(3, '000369', '001776'),
	(4, '000369', '001777'),
	(5, '001397', '001777'),
	(6, '001397', '001776');
/*!40000 ALTER TABLE `produto_opcional` ENABLE KEYS */;

CREATE TABLE IF NOT EXISTS `subgrupo` (
  `CODIGO` varchar(6) NOT NULL,
  `CODGRUPO` varchar(6) NOT NULL,
  `SUBGRUPO` varchar(50) NOT NULL,
	`TITULO_SELETOR` varchar(50) NOT NULL,
  `QTDE_MAX_KYOSK` int(11) DEFAULT NULL,
  `NAO_MOSTRA_KYOSK` varchar(2) DEFAULT NULL,
	`DESTAQUE` varchar(2) DEFAULT 'N',
  PRIMARY KEY (`CODIGO`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*!40000 ALTER TABLE `subgrupo` DISABLE KEYS */;
INSERT INTO `subgrupo` (`CODIGO`, `CODGRUPO`, `SUBGRUPO`, `QTDE_MAX_KYOSK`, `NAO_MOSTRA_KYOSK`) VALUES
	('000001', '000004', 'PICANHA NA CHAPA', 1, 'N'),
	('000002', '000004', 'FRALDINHA NA CHAPA', 1, 'N'),
	('000003', '000004', 'FILE NA CHAPA', 1, 'N'),
	('000004', '000007', 'AGUA MINERAL', 1, 'S'),
	('000005', '000007', 'REFRIGERANTE LATA 350ML', 1, 'N'),
	('000006', '000007', 'COPO DE SUCO', 1, 'N'),
	('000007', '000007', 'JARRA DE SUCO', 1, 'N'),
	('000008', '000008', 'CERVEJA SUJA', 1, 'N'),
	('000009', '000013', 'PIZZA MEDIA', 2, 'N'),
	('000010', '000013', 'PIZZA GRANDE', 3, 'N'),
	('000011', '000013', 'PIZZA DOCE PEQUENA', 1, 'N'),
	('000012', '000013', 'PIZZA DOCE MEDIA', 2, 'N');
/*!40000 ALTER TABLE `subgrupo` ENABLE KEYS */;

CREATE TABLE IF NOT EXISTS `token` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uuid` varchar(36) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE IF NOT EXISTS `item_montado` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `CODPRODUTO` varchar(6) DEFAULT NULL,
  `PRECO` double DEFAULT NULL,
  `CONSUMO` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `fk_item_montado_consumo1_idx` (`CONSUMO`),
  CONSTRAINT `item_montado_ibfk_1` FOREIGN KEY (`CONSUMO`) REFERENCES `consumo` (`CODIGO`) ON DELETE NO ACTION ON UPDATE NO ACTION,
	KEY `fk_item_montado_produto1_idx` (`CODPRODUTO`),
  CONSTRAINT `item_montado_ibfk_2` FOREIGN KEY (`CODPRODUTO`) REFERENCES `produto` (`CODIGO`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;


/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
