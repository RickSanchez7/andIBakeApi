-- CREATE DATABASE andibake;

CREATE TABLE Cake_name (
  id SERIAL PRIMARY KEY,
  nome_bolo TEXT,
  quantidade INTEGER
);

CREATE TABLE Ingredientes (
  id SERIAL PRIMARY KEY,
  nome_ingrediente TEXT,
  unidade TEXT
);

CREATE TABLE Cake (
  id SERIAL PRIMARY KEY,
  nome_id INTEGER REFERENCES Cake_name (id),
  ingredientes_id INTEGER REFERENCES Ingredientes (id),
  quantidade INTEGER
);


-- INSERT INTO Cake_name (nome_bolo, quantidade) VALUES ('Bolo de Chocolate', 2);
-- INSERT INTO Cake_name (nome_bolo, quantidade) VALUES ('Bolo de cenoura', 2);
-- INSERT INTO Cake_name (nome_bolo, quantidade) VALUES ('Bolo de morango', 1);

INSERT INTO Ingredientes (nome_ingrediente, unidade) VALUES ('ovos', 'uni');
INSERT INTO Ingredientes (nome_ingrediente, unidade) VALUES ('farinha', 'g');
INSERT INTO Ingredientes (nome_ingrediente, unidade) VALUES ('açucar', 'g');
INSERT INTO Ingredientes (nome_ingrediente, unidade) VALUES ('chocolate', 'g');
INSERT INTO Ingredientes (nome_ingrediente, unidade) VALUES ('cenoura', 'g');

-- INSERT INTO Cake (nome_id, ingredientes_id, quantidade) VALUES (1, 1, 2);
-- INSERT INTO Cake (nome_id, ingredientes_id, quantidade) VALUES (1, 2, 200);
-- INSERT INTO Cake (nome_id, ingredientes_id, quantidade) VALUES (1, 3, 150);
-- INSERT INTO Cake (nome_id, ingredientes_id, quantidade) VALUES (1, 4, 150);

-- INSERT INTO Cake (nome_id, ingredientes_id, quantidade) VALUES (2, 1, 2);
-- INSERT INTO Cake (nome_id, ingredientes_id, quantidade) VALUES (2, 2, 200);
-- INSERT INTO Cake (nome_id, ingredientes_id, quantidade) VALUES (2, 3, 150);
-- INSERT INTO Cake (nome_id, ingredientes_id, quantidade) VALUES (2, 5, 150);

-- Down

-- DROP TABLE Cake;
-- DROP TABLE Ingredientes;
-- DROP TABLE Cake_name;