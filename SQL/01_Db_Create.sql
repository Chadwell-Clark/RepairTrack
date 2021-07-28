USE [master]

IF db_id('RepairTrack') IS NULL
  CREATE DATABASE [RepairTrack]
GO

USE [RepairTrack]
GO


DROP TABLE IF EXISTS [RepairNote];
DROP TABLE IF EXISTS [RepairIssue];
DROP TABLE IF EXISTS [IssueTicket];
DROP TABLE IF EXISTS [Inventory];
DROP TABLE IF EXISTS [UserProfile];
DROP TABLE IF EXISTS [UserType];
GO


CREATE TABLE [UserType] (
  [Id] int PRIMARY KEY IDENTITY,
  [Name] varchar(30) NOT NULL
)

CREATE TABLE [UserProfile] (
  [Id] int PRIMARY KEY IDENTITY,
  [FirebaseUserId] varchar(28) NOT NULL,
  [FirstName] varchar(35) NOT NULL,
  [LastName] varchar(35) NOT NULL,
  [Email] varchar(255) NOT NULL,
  [UserTypeId] int NOT NULL,
  [IsActive] bit NOT NULL DEFAULT (1),

  CONSTRAINT [FK_User_UserType] FOREIGN KEY ([UserTypeId]) REFERENCES [UserType] ([Id]),
  CONSTRAINT UQ_FirebaseUserId UNIQUE(FirebaseUserId)
  
)

CREATE TABLE [Inventory] (
  [Id] int PRIMARY KEY IDENTITY,
  [Manufacturer] varchar(50) NOT NULL,
  [Model] varchar(50) NOT NULL,
  [SerialNumber] varchar(50),
  [InCommission] bit NOT NULL DEFAULT (1),
  [FirmWare] varchar(50),
  [ImageLoc] varchar
)

CREATE TABLE [IssueTicket] (
  [Id] int PRIMARY KEY IDENTITY,
  [Issue] varchar(500) NOT NULL,
  [CreateDateTime] datetime NOT NULL,
  [InventoryId] int NOT NULL,
  [IsResolved] bit NOT NULL DEFAULT (0),

  CONSTRAINT [FK_IssueTicket_Inventory] FOREIGN KEY ([InventoryId]) REFERENCES [Inventory] ([Id]),
)

CREATE TABLE [RepairNote] (
  [Id] int PRIMARY KEY IDENTITY,
  [Note] varchar(500) NOT NULL,
  [PartsNeeded] varchar(200),
  [CreateDateTime] datetime NOT NULL,
  [IssueTicketId] int NOT NULL,
  [UserProfileId] int NOT NULL,
  [PartsOrdered] int NOT NULL,

  CONSTRAINT [FK_RepairNote_IssueTicket] FOREIGN KEY ([IssueTicketId]) REFERENCES [IssueTicket] ([Id]),
  CONSTRAINT [FK_RepairNote_UserProfile] FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id])
  
)
GO

-- ALTER TABLE [RepairNote] ADD FOREIGN KEY ([RepairIssueId]) REFERENCES [RepairIssue] ([Id])
-- GO

-- ALTER TABLE [UserProfile] ADD FOREIGN KEY ([Id]) REFERENCES [RepairNote] ([UserProfileId])
-- GO

-- ALTER TABLE [UserTpye] ADD FOREIGN KEY ([Id]) REFERENCES [UserProfile] ([UserTypeId])
-- GO

-- ALTER TABLE [Inventory] ADD FOREIGN KEY ([Id]) REFERENCES [RepairIssue] ([InventoryId])
-- GO