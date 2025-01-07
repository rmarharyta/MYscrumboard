CREATE DATABASE MyScrumDb;
USE MyScrumDb;

-- Create the Users table
CREATE TABLE Users(
userId VARCHAR(265) PRIMARY KEY,
email VARCHAR(265) UNIQUE NOT NULL,
userPassword VARCHAR(265) not null
);

-- Create the Projects table
CREATE TABLE Projects(
projectId VARCHAR(265) PRIMARY KEY,
ownerId VARCHAR(265) NOT NULL,
projectName VARCHAR(100) NOT NULL,
FOREIGN KEY(ownerId) REFERENCES Users(userId)
ON DELETE CASCADE
);

-- Create the Collaboration table
CREATE TABLE Collaboration(
projectId VARCHAR(265) NOT NULL,
userId VARCHAR(265) NOT NULL,
FOREIGN KEY(projectId) REFERENCES Projects(projectId)
ON DELETE CASCADE,
FOREIGN KEY(userId) REFERENCES Users(userId) 
ON DELETE CASCADE,
PRIMARY KEY(projectId, userId)
);

-- Create the Scrum table
CREATE TABLE Scrum(
scrumId VARCHAR(265) PRIMARY KEY,
projectId VARCHAR (265) NOT NULL,
scrumName VARCHAR(100) NOT NULL,
FOREIGN KEY (projectId) REFERENCES Projects(projectId)
ON DELETE CASCADE
);

-- Create the Statuses table
CREATE TABLE Statuses(
statusId INT PRIMARY KEY,
statusDescription VARCHAR (100) NOT NULL
);

-- Create the Note table
CREATE TABLE Notes(
noteId VARCHAR(265) PRIMARY KEY,
scrumId VARCHAR(265) NOT NULL,
statusId INT NOT NULL,
noteValue VARCHAR (255),
FOREIGN KEY (scrumId) REFERENCES Scrum(scrumId)
ON DELETE CASCADE,
FOREIGN KEY (statusId) REFERENCES Statuses(statusId)
ON DELETE CASCADE
);

-- Create the Deleted table
CREATE TABLE DELETED (
noteId VARCHAR(265) PRIMARY KEY,
scrumId VARCHAR(265) NOT NULL,
statusId INT NOT NULL,
noteValue VARCHAR (255),
FOREIGN KEY (scrumId) REFERENCES Scrum(scrumId)
ON DELETE CASCADE,
FOREIGN KEY (statusId) REFERENCES Statuses(statusId)
ON DELETE CASCADE
);

-- Add Indexes for optimization (optional but recommended)
CREATE INDEX idx_collaboration_userid ON Collaboration(userId);
CREATE INDEX idx_collaboration_projectid ON Collaboration(projectId);

CREATE INDEX idx_notes_scrumid ON Notes(scrumId);

CREATE INDEX idx_deleted_scrumid ON Deleted(scrumId);

CREATE INDEX idx_scrum_projectid ON Scrum(projectId);

INSERT INTO Statuses
VALUES  (1,"Story/PBI"),
		(2,"To do"),
        (3,"In process"),
        (4,"To verify/testing"),
        (5,"Done");

select * from statuses;