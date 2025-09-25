-- Script para verificar e corrigir a tabela cliente
-- Execute no DBeaver conectado ao banco caminho_dos_ventos_db

-- 1. Verificar estrutura atual da tabela cliente
SELECT 
    column_name, 
    data_type, 
    is_nullable, 
    column_default
FROM information_schema.columns 
WHERE table_name = 'cliente' 
ORDER BY ordinal_position;

-- 2. Adicionar colunas que estão faltando (se não existirem)
DO $$
BEGIN
    -- Adicionar coluna role se não existir
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'cliente' AND column_name = 'role'
    ) THEN
        ALTER TABLE cliente ADD COLUMN role character varying NOT NULL DEFAULT 'client';
        RAISE NOTICE 'Coluna role adicionada';
    ELSE
        RAISE NOTICE 'Coluna role já existe';
    END IF;

    -- Adicionar coluna ativo se não existir
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'cliente' AND column_name = 'ativo'
    ) THEN
        ALTER TABLE cliente ADD COLUMN ativo boolean NOT NULL DEFAULT true;
        RAISE NOTICE 'Coluna ativo adicionada';
    ELSE
        RAISE NOTICE 'Coluna ativo já existe';
    END IF;

    -- Adicionar coluna dataCriacao se não existir
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'cliente' AND column_name = 'dataCriacao'
    ) THEN
        ALTER TABLE cliente ADD COLUMN "dataCriacao" TIMESTAMP NOT NULL DEFAULT now();
        RAISE NOTICE 'Coluna dataCriacao adicionada';
    ELSE
        RAISE NOTICE 'Coluna dataCriacao já existe';
    END IF;

    -- Adicionar coluna dataAtualizacao se não existir
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'cliente' AND column_name = 'dataAtualizacao'
    ) THEN
        ALTER TABLE cliente ADD COLUMN "dataAtualizacao" TIMESTAMP NOT NULL DEFAULT now();
        RAISE NOTICE 'Coluna dataAtualizacao adicionada';
    ELSE
        RAISE NOTICE 'Coluna dataAtualizacao já existe';
    END IF;
END $$;

-- 3. Verificar estrutura final da tabela cliente
SELECT 
    column_name, 
    data_type, 
    is_nullable, 
    column_default
FROM information_schema.columns 
WHERE table_name = 'cliente' 
ORDER BY ordinal_position;

-- 4. Verificar se todas as tabelas estão criadas
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;

-- 5. Teste: Inserir um cliente de teste (opcional)
-- INSERT INTO cliente (nome, email, senha, rua, numero, cidade, cep, telefone, role, ativo)
-- VALUES ('Teste', 'teste@teste.com', 'senha123', 'Rua Teste', '123', 'São Paulo', '01234-567', '+5511999999999', 'client', true);

-- 6. Verificar se o cliente foi inserido (se executou o INSERT acima)
-- SELECT * FROM cliente WHERE email = 'teste@teste.com';


