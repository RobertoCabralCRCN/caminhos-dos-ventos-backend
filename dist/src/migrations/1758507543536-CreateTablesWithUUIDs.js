"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTablesWithUUIDs1758507543536 = void 0;
class CreateTablesWithUUIDs1758507543536 {
    constructor() {
        this.name = 'CreateTablesWithUUIDs1758507543536';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "cliente" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying NOT NULL, "email" character varying NOT NULL, "senha" character varying NOT NULL, "rua" character varying NOT NULL, "cidade" character varying NOT NULL, "cep" character varying NOT NULL, "telefone" character varying NOT NULL, CONSTRAINT "UQ_503f81286c5e49acd6a832abf43" UNIQUE ("email"), CONSTRAINT "PK_18990e8df6cf7fe71b9dc0f5f39" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."pedido_status_enum" AS ENUM('aguardando_producao', 'pronto', 'entregue')`);
        await queryRunner.query(`CREATE TABLE "pedido" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "itens" jsonb NOT NULL, "dataCriacao" TIMESTAMP NOT NULL DEFAULT now(), "status" "public"."pedido_status_enum" NOT NULL DEFAULT 'aguardando_producao', "preco" numeric(10,2) NOT NULL, "taxaEntrega" numeric(10,2) NOT NULL, "responsavel" character varying, "clienteId" uuid, CONSTRAINT "PK_af8d8b3d07fae559c37f56b3f43" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "pedido" ADD CONSTRAINT "FK_2730a0c3947641edf256551f10c" FOREIGN KEY ("clienteId") REFERENCES "cliente"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "pedido" DROP CONSTRAINT "FK_2730a0c3947641edf256551f10c"`);
        await queryRunner.query(`DROP TABLE "pedido"`);
        await queryRunner.query(`DROP TYPE "public"."pedido_status_enum"`);
        await queryRunner.query(`DROP TABLE "cliente"`);
    }
}
exports.CreateTablesWithUUIDs1758507543536 = CreateTablesWithUUIDs1758507543536;
//# sourceMappingURL=1758507543536-CreateTablesWithUUIDs.js.map