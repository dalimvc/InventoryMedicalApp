using InventoryMedicalApp.Models;
using InventoryMedicalApp.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace InventoryMedicalApp.Controllers
{
    [ApiController] //for automatic validation
    [Route("api/[controller]")] //used for ading endpoints
    public class ArticlesController : ControllerBase
    {
        //dependency injection of the ArticlesServices
        private readonly ArticlesServices _service;

        public ArticlesController(ArticlesServices service)
        {
            _service = service;
        }

        //returns all articles
        [HttpGet]
        public async Task<IActionResult> GetArticles() => Ok(await _service.GetAllArticles());

        //creating a new article
        [HttpPost]
        public async Task<IActionResult> CreateArticle(Article article)
        {
            if(string.IsNullOrWhiteSpace(article.Namn))
            {
                return BadRequest("Artikel måste ha ett namn.");
            } 
            else if(article.Antal < 0)
            {
                return BadRequest("Antal kan inte vara negativt.");
            } 
            else if(string.IsNullOrWhiteSpace(article.Enhet))
            {
                return BadRequest("En artikel måste ha en enhet.");
            }
            var newArticle = await _service.CreateNewArticle(article);
            return CreatedAtAction(nameof(GetArticles), new { id = newArticle.Id }, newArticle);
        }

        //updating the saldo of an article
        [HttpPut("{id}/saldo")]
        public async Task<IActionResult> UpdateSaldo(int id, [FromBody] int newSaldo)
        {
            if (newSaldo < 0) return BadRequest("Saldo får inte vara negativt.");
            var updatedArticle = await _service.UpdateSaldo(id, newSaldo);
            if (updatedArticle == null) return NotFound();
            return Ok(updatedArticle);
        }
    }
}
