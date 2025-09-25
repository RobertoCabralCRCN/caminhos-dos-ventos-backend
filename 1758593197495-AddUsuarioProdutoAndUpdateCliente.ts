import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUsuarioProdutoAndUpdateCliente1758593197495 implements MigrationInterface {
    name = 'AddUsuarioProdutoAndUpdateCliente1758593197495'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "usuario" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying NOT NULL, "email" character varying NOT NULL, "senha" character varying NOT NULL, "superUser" boolean NOT NULL DEFAULT false, "isActive" boolean NOT NULL DEFAULT true, "dataCriacao" TIMESTAMP NOT NULL DEFAULT now(), "dataAtualizacao" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_2863682842e688ca198eb25c124" UNIQUE ("email"), CONSTRAINT "PK_a56c58e5cabaa04fb2c98d2d7e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "produto" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying NOT NULL, "descricao" text NOT NULL, "preco" numeric(10,2) NOT NULL, "ativo" boolean NOT NULL DEFAULT true, "categoria" character varying, "imagem" character varying, "dataCriacao" TIMESTAMP NOT NULL DEFAULT now(), "dataAtualizacao" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_99c4351f9168c50c0736e6a66be" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "cliente" ADD "numero" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cliente" DROP COLUMN "numero"`);
        await queryRunner.query(`DROP TABLE "produto"`);
        await queryRunner.query(`DROP TABLE "usuario"`);
    }

}
