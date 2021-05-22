using Microsoft.EntityFrameworkCore.Migrations;

namespace CommerceWebApi.Migrations
{
    public partial class C : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "nameOrder",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "price",
                table: "Orders");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "nameOrder",
                table: "Orders",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "price",
                table: "Orders",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
