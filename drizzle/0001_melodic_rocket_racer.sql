CREATE TABLE `assistantFollowUps` (
	`id` int AUTO_INCREMENT NOT NULL,
	`email` varchar(320) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `assistantFollowUps_id` PRIMARY KEY(`id`),
	CONSTRAINT `assistantFollowUps_email_unique` UNIQUE(`email`)
);
