using AOWebApp.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AOWebApp.Controllers
{
    public class ReportsController : Controller
    {
        DbContext _context;
        public IActionResult Index()
        {
            return View("AnnualSalesReport");
        }
        public ReportsController(AmazonDbContext context)
        {
            _context = context;
        }

    }
}
