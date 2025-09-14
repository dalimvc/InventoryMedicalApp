using InventoryMedicalApp.Data;
using InventoryMedicalApp.Models;
using Microsoft.EntityFrameworkCore;

namespace InventoryMedicalApp.Services
{
    //this service class will be used to inteact with Article objects in the db
    public class ArticlesServices
    {
        private readonly DatabaseContext _context;


        public ArticlesServices(DatabaseContext context)
        {
            //_context is an instance of DatabaseContext, it is injected via constructor
            _context = context;
        }

        //method to get all articles from the database
        public async Task<List<Article>> GetAllArticles() => await _context.Articles.ToListAsync();

        //method to create new articles in the database
        public async Task<Article> CreateNewArticle(Article article)
        {
            _context.Articles.Add(article);  //adds the new article
            await _context.SaveChangesAsync(); //saves changes to the database
            return article; //retuns article
        }

        //method to update the saldo of articles
        public async Task<Article> UpdateSaldo(int id, int newSaldo)
        {
            var article = await _context.Articles.FindAsync(id); //finds the article by its id
            if (article == null) return null; //if not found, return null
            article.Antal = newSaldo; //new saldo is asigned
            await _context.SaveChangesAsync(); //saving changes
            return article; //retutning article
        }

        //method to remove an article by its id
        public async Task<bool> RemoveArticle(int id)
        {
            var article = await _context.Articles.FindAsync(id); //finding the article by its id
            if (article == null) return false; //if not found, return false
            _context.Articles.Remove(article); //removing the article
            await _context.SaveChangesAsync(); //saving changes
            return true; //returning true
        }







    }
}
