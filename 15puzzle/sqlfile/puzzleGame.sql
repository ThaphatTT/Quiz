-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 15, 2024 at 06:00 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `puzzleGame`
--

-- --------------------------------------------------------

--
-- Table structure for table `leaderboard`
--

CREATE TABLE `leaderboard` (
  `id` int(255) NOT NULL,
  `playerId` int(255) NOT NULL,
  `timeToplay` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `leaderboard`
--

INSERT INTO `leaderboard` (`id`, `playerId`, `timeToplay`) VALUES
(12, 95, 28),
(13, 98, 40),
(14, 99, 45),
(15, 100, 56),
(16, 101, 49),
(17, 101, 90),
(18, 101, 120),
(19, 101, 300),
(20, 101, 200),
(23, 114, 9);

-- --------------------------------------------------------

--
-- Table structure for table `players`
--

CREATE TABLE `players` (
  `id` int(255) NOT NULL,
  `playerName` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `players`
--

INSERT INTO `players` (`id`, `playerName`) VALUES
(46, ''),
(37, 'adfafcqefgeqfqefqwf'),
(39, 'adsxvfgqfqwf'),
(83, 'advasdgeqwfgtqewfadsfe'),
(64, 'afddasdvasdavdaadadadadf'),
(105, 'asdasd'),
(106, 'asdasdasd'),
(67, 'asdfacfvxcv'),
(56, 'asdfafvsdgff'),
(113, 'asdfasdfasdf'),
(102, 'asdfaxfwqef'),
(77, 'asdfzxvdg'),
(97, 'asf'),
(110, 'asfadfdasfqef'),
(109, 'asfadsfadfa'),
(52, 'asfafcasdf'),
(103, 'asfasdfgwe'),
(111, 'asfasdxfewq'),
(104, 'asfasf'),
(41, 'asfvadsgwgqewqwq'),
(70, 'bnjmhjh'),
(76, 'cvssvdsvdsv'),
(43, 'cxaacx'),
(60, 'cxzcxzxzzxzcx'),
(72, 'ddvbdbfdsb'),
(82, 'dehghegwgw'),
(38, 'dfvacfvasfcaxvcaqsf'),
(40, 'fafcascvweqgeqw'),
(87, 'fdbdnterhjnr'),
(34, 'GWDFWDF'),
(112, 'Hiii'),
(108, 'Hiiii'),
(101, 'Madadaa'),
(96, 'mon'),
(95, 'monbi'),
(71, 'nndfbdfsb'),
(84, 'scbvsfbnhrwhwegh'),
(69, 'scvsvcvcsz'),
(78, 'sczvsxcbbnghewg'),
(98, 'sfcbvwgewgewg'),
(44, 'szcfvadwfqf'),
(42, 'vasdvcavaa'),
(53, 'vczcvbnnbvmm,h'),
(45, 'vzvzxcvzcvxz'),
(32, 'wdscvgwg'),
(35, 'xcvxasffasf'),
(66, 'xzcxzccxzzxv'),
(100, 'Yaa'),
(99, 'Yaluuu'),
(114, 'Yoooo'),
(73, 'zcvxzvvzb'),
(58, 'zvcxvzxvzvzvz'),
(62, 'zxcascfvsf'),
(88, 'ดกหิำดิ้ืำพไเ้ไ'),
(85, 'ผปแผปแอฟกหเดอำ'),
(75, 'ผแอปผออผอ'),
(89, 'ฟกหดเฟเดำๆไเๆ'),
(90, 'ฟกหอไกเไำเ'),
(93, 'ฟหกดฟหดแฟหดฟๆหดไๆ'),
(55, 'ฟหดฟหดำๆดๆไำพๆไ'),
(94, 'ฟหดเฟดำๆไดเำๆดพๆ'),
(54, 'ฟหดๆดไๆดพๆไ'),
(91, 'ฟหอฟกไอเำๆดเๆำไดเ'),
(79, 'ฟหอหไิอไ'),
(33, 'ฟๆดอฟหกอำๆไเๆำไ'),
(36, 'หกกดๆดๆไดไ'),
(92, 'หกิดพำหไิ้ไเไำ'),
(86, 'หอกฟหเอำไดเำๆได'),
(80, 'หอฟกหอดไๆดพ'),
(81, 'หแกอพไำ้afafไพๆasdfaddwgfweqft'),
(68, 'อผืิืเ้ดเๆไ'),
(74, 'เม่เเ่มเ่่มเมเม');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `leaderboard`
--
ALTER TABLE `leaderboard`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `players`
--
ALTER TABLE `players`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `playerName` (`playerName`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `leaderboard`
--
ALTER TABLE `leaderboard`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `players`
--
ALTER TABLE `players`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=115;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `leaderboard`
--
ALTER TABLE `leaderboard`
  ADD CONSTRAINT `leaderboard_ibfk_1` FOREIGN KEY (`playerId`) REFERENCES `players` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
