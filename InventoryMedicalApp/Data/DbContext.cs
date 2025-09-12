using InventoryMedicalApp.Models;
using Microsoft.EntityFrameworkCore;

namespace InventoryMedicalApp.Data
{
    //defining the class AppDbContext that inherits from DbContext
    //DbContext allows interaction with the database, it uses Entity Framework Core
    public class DatabaseContext : DbContext
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options) { }

        //Articles representation in the database
        public DbSet<Article> Articles { get; set; }
    }

}
