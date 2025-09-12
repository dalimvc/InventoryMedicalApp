namespace InventoryMedicalApp.Models
{
    public class Article
    {
        //primary key, it will be auto-incremented
        public int Id { get; set; }
        //name of the article
        public string Namn { get; set; }
        //number of items in stock
        public int Antal { get; set; }
        //in what unit is measured
        public string Enhet { get; set; }
        //it will ckeck if the stock is low, asumption is if less than 10 items
        public bool IsLowStock => Antal < 10;

    }

}
