-- database: e:\Documents\GitHub\Projeto-APS-implementacao\backend\src\data\database.sqlite
-- Pressione o botão ▷ no canto superior direito da janela para executar todo o arquivo.

DROP TABLE "Users";
DROP TABLE "Orders";

CREATE TABLE "Users" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "name" TEXT DEFAULT NULL,
  "type" TEXT DEFAULT NULL,
  "apartment" TEXT DEFAULT NULL
);

CREATE TABLE "Orders" (
  "id" INTEGER PRIMARY KEY UNIQUE DEFAULT CURRENT_TIMESTAMP,
  "userID" INTEGER NOT NULL,
  "name" TEXT DEFAULT NULL,
  "description" TEXT DEFAULT NULL,
  "image" TEXT DEFAULT NULL
);
ALTER TABLE Orders ADD COLUMN status TEXT;

SELECT * FROM Orders;
SELECT * FROM Users;

INSERT INTO Users (name, apartment, type)
VALUES 
    ('João', '101', 'admin'), 
    ('Maria', '102', 'resident'), 
    ('Pedro', '103', 'resident'), 
    ('Ana', '104', 'resident'), 
    ('Lucas', '201', 'resident'), 
    ('Julia', '202', 'resident'), 
    ('Fernando', '203', 'resident'), 
    ('Mariana', '204', 'resident'), 
    ('Rafael', '301', 'resident'), 
    ('Carla', '301', 'doorman');

INSERT INTO Orders (name, userID, description)
VALUES
    ('Pedido 1', 1, 'Descrição do Pedido 1'),
    ('Pedido 2', 2, 'Descrição do Pedido 2'),
    ('Pedido 3', 3, 'Descrição do Pedido 3'),
    ('Pedido 4', 4, 'Descrição do Pedido 4'),
    ('Pedido 5', 5, 'Descrição do Pedido 5'),
    ('Pedido 6', 6, 'Descrição do Pedido 6'),
    ('Pedido 7', 7, 'Descrição do Pedido 7'),
    ('Pedido 8', 8, 'Descrição do Pedido 8'),
    ('Pedido 9', 9, 'Descrição do Pedido 9'),
    ('Pedido 10', 10, 'Descrição do Pedido 10');
