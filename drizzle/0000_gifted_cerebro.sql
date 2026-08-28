CREATE TABLE `projectInquiries` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(120) NOT NULL,
	`email` varchar(320) NOT NULL,
	`company` varchar(160),
	`projectType` varchar(80) NOT NULL,
	`budget` varchar(80) NOT NULL,
	`timeline` varchar(80) NOT NULL,
	`details` text NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `projectInquiries_id` PRIMARY KEY(`id`)
);
