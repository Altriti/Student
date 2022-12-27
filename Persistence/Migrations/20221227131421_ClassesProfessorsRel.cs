using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    public partial class ClassesProfessorsRel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "ClassId",
                table: "Professors",
                type: "TEXT",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Professors_ClassId",
                table: "Professors",
                column: "ClassId");

            migrationBuilder.AddForeignKey(
                name: "FK_Professors_Classes_ClassId",
                table: "Professors",
                column: "ClassId",
                principalTable: "Classes",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Professors_Classes_ClassId",
                table: "Professors");

            migrationBuilder.DropIndex(
                name: "IX_Professors_ClassId",
                table: "Professors");

            migrationBuilder.DropColumn(
                name: "ClassId",
                table: "Professors");
        }
    }
}
