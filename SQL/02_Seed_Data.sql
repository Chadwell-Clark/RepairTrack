USE [RepairTrack];
GO

SET identity_insert [UserType] ON
INSERT INTO [UserType] ([ID], [Name]) VALUES (1, 'Admin'), (2, 'Technician');
SET identity_insert [UserType] OFF

SET IDENTITY_INSERT [UserProfile] ON
INSERT INTO [UserProfile]
    ([Id], [FirstName], [LastName], [Email], [UserTypeId], [IsActive], [FirebaseUserId])
VALUES
    (1, 'Foobert', 'Barbo', 'foo@bar.com', 1, 1, 'Z22j8jN9JHhSI87D1uwHqDShU5d2'),
    (2, 'Emmaline', 'Cornfoot', 'emcornfoot@cnft.comx', 2, 1, 'f5YC7BolBdTTrdhdqHTvzpVRHZT2'),
    (3, 'Kyle', 'Stevens', 'kyle93@comcrust.orgx', 2, 1, 'jwlVMhCQ8JfkFD5tDutEpp4hKAt2'),
    (4, 'Frank', 'Greg', 'greg42@gmonk.comx', 2, 1, '3GkzANVnPRdZupM3k8Wti9f9H7B3'),
    (5, 'Falcus', 'Aruman', 'aruman@talon.orgx', 2, 1, '9tULrqDsrBOqmmj8ogDsTw74MGn2')
SET IDENTITY_INSERT [UserProfile] OFF


SET IDENTITY_INSERT [INVENTORY] ON
INSERT INTO [INVENTORY]
    ([Id], [Manufacturer], [Model], [SerialNumber], [ImageLoc], [Firmware], [InCommission])
VALUES
    (1, 'Teletronix', 'LA - 2A Leveling Amplifier', '#39A00456', 'Teletronix-LA-2A.png', NULL, 1),
    (2, 'Neve', '1073 Mic Preamp', '59967', '1073.png', NULL, 1),
    (3, 'Neve', '1081 Mic Preamp', '8954', '1081.png', NULL, 1),
    (4, 'Teletronix', 'LA - 2A Leveling Amplifier', '#39A01845', 'Teletronix-LA-2A.png', NULL, 1),
    (5, 'Neve', '1073 Mic Preamp', '59959', '1073.png', NULL, 1),
    (6, 'Neve', '1081 Mic Preamp', '8952', '1081.png', NULL, 1),
    (7, 'Neumann', 'U87 Condensor Microphone', '93351E', 'U87.png', NULL,1),
    (8, 'API','2500+ Stereo Bus Compressor ','API2500-23453', 'API2500.png',NULL, 1),
    (9, 'Solid State Logic','FX G384 G-Series Stereo Bus Compressor','G+87-4352', 'G384.png',NULL, 1),
    (10, 'Lexicon','480L Digital Effects System','55396-2', '480L.png','v4.10', 1),
    (11, 'tc Electronic','D-Two Multi-Tap Delay','TC-D2-34753', 'D-TWOwhtbgrd.png',NULL, 1),
    (12, 'tc Electronic','2290 Dynamic Digital Delay','512400', 'TC2290.png','VERSION 30.08', 1),
    (13, 'Yamaha','NS-10M Studio Monitor','180553', 'NS-10M.jpg',NULL, 0),
    (14, 'Yamaha','NS-10M Studio Monitor','180554', 'NS-10M.jpg',NULL, 0),
    (15, 'TubeTech','CL 1B','CL1B-33451', 'CL1B.jpg',NULL, 1),
    (16, 'Lexicon','PCM-70 Digital Reverb','70-25377', 'PCM-70.png','v3.01', 1),
    (17, 'Eventide','H3000-D/SX Ultra-Harmonizer ','S1231','H3000.png','v2.17', 1),
    (18, 'API','3124+ Mic Preamplifier','API3124P-345', 'API3124',NULL, 1),
    (19, 'Pultec','EQP-1A Tube Program Equalizer','8734', 'EQP-1A.png',NULL, 1),
    (20, 'GML','8200 Parametric Equalizer','82005436', 'GML8200.png',NULL, 1)

SET IDENTITY_INSERT [INVENTORY] OFF


SET IDENTITY_INSERT [IssueTicket] ON
INSERT INTO [IssueTicket]
    ([Id], [Issue], [CreateDateTime], [InventoryId], [IsResolved])
VALUES
    (1, 'Engineer complained that the unit was noisy, Note it may have been the aux send or channel in on the console. Please check', '2020-01-23',  1, 1),
    (2, 'Issue Two - Sed sagittis. Nam congue, risus semper porta volutpat', '2020-02-23',  10, 1),
    (3, 'Issue Three - In congue. Etiam justo. Etiam pretium iaculis justo.', '2020-03-23',  1, 0),
    (4, 'Issue Four - Sed sagittis. Nam congue, risus semper porta volutpat', '2020-04-23',  10, 0),
    (5, 'Issue Five - In congue. Etiam justo. Etiam pretium iaculis justo.', '2020-05-23',  2, 1),
    (6, 'Issue Six - Sed sagittis. Nam congue, risus semper porta volutpat', '2020-06-23',  8, 1),
    (7, 'Issue Seven - In congue. Etiam justo. Etiam pretium iaculis justo.', '2020-07-23',  2, 0),
    (8, 'Issue Eight - Sed sagittis. Nam congue, risus semper porta volutpat', '2020-08-23',  8, 0)
SET IDENTITY_INSERT [IssueTicket] OFF

SET IDENTITY_INSERT [RepairNote] ON
INSERT INTO [RepairNote]
    ([Id], [Note], [PartsNeeded], [PartsOrdered], [CreateDateTime], [IssueTicketId], [UserProfileId])
VALUES
    (1, 'Test note ', NULL, 0, '2021-03-21', 1, 4),
    (2, 'Test note another ', NULL, 0, '2021-03-21', 2, 2),
    (3, 'Test note 2 ', NULL, 0, '2021-03-22', 1, 4),
    (4, 'Test note another ', NULL, 0, '2021-03-23', 2, 2),
    (5, 'Test note ', NULL, 0, '2021-03-23', 1, 4),
    (6, 'Test note another ', NULL, 0, '2021-03-26', 2, 2),
    (7, 'Test note 2 ', NULL, 0, '2021-03-25', 1, 3),
    (8, 'Test note another ', NULL, 0, '2021-04-01', 2, 5)
SET IDENTITY_INSERT [RepairNote] OFF