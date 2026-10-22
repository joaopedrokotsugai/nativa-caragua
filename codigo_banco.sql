USE nativa_caragua;

CREATE DATABASE IF NOT EXISTS nativa_caragua;
USE nativa_caragua;

CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS campanhas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    data DATETIME NOT NULL,
    local VARCHAR(200) NOT NULL,
    vagas INT NOT NULL,
    imagem VARCHAR(255),
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS projetos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    descricao TEXT NOT NULL,
    meta DECIMAL(10,2) NOT NULL,
    valor_arrecadado DECIMAL(10,2) DEFAULT 0.00,
    imagem VARCHAR(255),
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS doacoes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_projeto INT NOT NULL,
    valor DECIMAL(10,2) NOT NULL,
    data DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id),
    FOREIGN KEY (id_projeto) REFERENCES projetos(id)
);

CREATE TABLE IF NOT EXISTS denuncias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    titulo VARCHAR(150) NOT NULL,
    descricao TEXT NOT NULL,
    local VARCHAR(200) NOT NULL,
    imagem VARCHAR(255),
    data DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
);

CREATE TABLE IF NOT EXISTS participacoes (
    id_usuario INT NOT NULL,
    id_campanha INT NOT NULL,
    data_inscricao DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id_usuario, id_campanha),
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id),
    FOREIGN KEY (id_campanha) REFERENCES campanhas(id)
);

SELECT id, nome, email, data_criacao, senha
FROM usuarios;

select * from campanhas;
select * from projetos;

USE nativa_caragua;

-- Campanhas de teste
INSERT INTO campanhas (titulo, data, local, vagas, imagem)
SELECT 'Mutirão de limpeza da praia',
       '2026-11-15 09:00:00',
       'Praia de Caraguatatuba',
       30,
       NULL
WHERE NOT EXISTS (
    SELECT 1 FROM campanhas
    WHERE titulo = 'Mutirão de limpeza da praia'
);

INSERT INTO campanhas (titulo, data, local, vagas, imagem)
SELECT 'Plantio de mudas nativas',
       '2026-11-22 08:30:00',
       'Parque da cidade',
       20,
       NULL
WHERE NOT EXISTS (
    SELECT 1 FROM campanhas
    WHERE titulo = 'Plantio de mudas nativas'
);

-- Projetos de teste
INSERT INTO projetos (titulo, descricao, meta, valor_arrecadado, imagem)
SELECT 'Recuperação da vegetação nativa',
       'Projeto de recuperação de áreas degradadas com espécies nativas.',
       5000.00,
       0.00,
       NULL
WHERE NOT EXISTS (
    SELECT 1 FROM projetos
    WHERE titulo = 'Recuperação da vegetação nativa'
);

INSERT INTO projetos (titulo, descricao, meta, valor_arrecadado, imagem)
SELECT 'Proteção da fauna local',
       'Iniciativa de conscientização e proteção dos animais silvestres.',
       3000.00,
       0.00,
       NULL
WHERE NOT EXISTS (
    SELECT 1 FROM projetos
    WHERE titulo = 'Proteção da fauna local'
);

SELECT * FROM campanhas;
SELECT * FROM projetos;

select * from usuarios;