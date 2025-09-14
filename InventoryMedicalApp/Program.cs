using InventoryMedicalApp.Data;
using InventoryMedicalApp.Models;
using InventoryMedicalApp.Services;
using Microsoft.EntityFrameworkCore;

//initializing the app builder
var builder = WebApplication.CreateBuilder(args);

//adding services
builder.Services.AddControllers();


//to enable CORS for the React app running on localhost:3000
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
      builder =>
      {
          builder.WithOrigins("http://localhost:3000", "https://localhost:3000")
                     .AllowAnyHeader()
           .AllowAnyMethod();
      });
});

//adding and configuring the database context to use SQLite
builder.Services.AddDbContext<DatabaseContext>(options => options.UseSqlite("Data Source=articles.db"));

//registering the ArticlesServices for dependency injection
builder.Services.AddScoped<ArticlesServices>();

//adding Swagger for API documentation and testing
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//building the app
var app = builder.Build();

//creating a db if it does't exist and inserts initial data
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<DatabaseContext>();

    //creates tables if missing
    db.Database.EnsureCreated();

    //adding data is its empty
    if (!db.Articles.Any())
    {
        db.Articles.AddRange(
            new Article { Namn = "Plåster", Antal = 100, Enhet = "st" },
            new Article { Namn = "Paracetamol", Antal = 3, Enhet = "st" },
            new Article { Namn = "Munskydd", Antal = 2500, Enhet = "st" }
        );
        db.SaveChanges();
    }
}
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI();
}

//to allow CORS and enable HTTPS redirection and authorization
//!!!!!important

app.UseCors("AllowReactApp");

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();