-- CreateTable
CREATE TABLE `Respondent` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `StepResponse` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `step` INTEGER NOT NULL,
    `question` VARCHAR(191) NOT NULL,
    `answer` VARCHAR(191) NOT NULL,
    `respondentId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `StepResponse` ADD CONSTRAINT `StepResponse_respondentId_fkey` FOREIGN KEY (`respondentId`) REFERENCES `Respondent`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
