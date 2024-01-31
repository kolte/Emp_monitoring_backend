-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 31, 2024 at 10:18 AM
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
-- Database: `employee_monitor`
--

-- --------------------------------------------------------

--
-- Table structure for table `em_employee_attendance_pc_screenshot`
--

CREATE TABLE `em_employee_attendance_pc_screenshot` (
  `id` int(11) NOT NULL,
  `employee_id` int(11) NOT NULL COMMENT 'PK of em_employee',
  `employee_attendance_id` int(11) NOT NULL COMMENT 'PK of em_employee_attendance',
  `screenshot_url` varchar(255) NOT NULL,
  `active_screen` varchar(255) NOT NULL,
  `mouse_click` int(11) NOT NULL,
  `keyboard_click` int(11) NOT NULL,
  `screenshot_time` datetime DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `em_employee_attendance_pc_screenshot`
--
ALTER TABLE `em_employee_attendance_pc_screenshot`
  ADD PRIMARY KEY (`id`),
  ADD KEY `employee_id` (`employee_id`),
  ADD KEY `employee_attendance_id` (`employee_attendance_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `em_employee_attendance_pc_screenshot`
--
ALTER TABLE `em_employee_attendance_pc_screenshot`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `em_employee_attendance_pc_screenshot`
--
ALTER TABLE `em_employee_attendance_pc_screenshot`
  ADD CONSTRAINT `em_employee_attendance_pc_screenshot_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `em_employee` (`id`),
  ADD CONSTRAINT `em_employee_attendance_pc_screenshot_ibfk_2` FOREIGN KEY (`employee_attendance_id`) REFERENCES `em_employee_attendance` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
