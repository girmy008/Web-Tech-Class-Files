using AOWebApp.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using System.Linq;

namespace AOWebApp.Controllers
{
    public class ReportsController : Controller
    {
        private readonly AmazonDbContext _context;

        public ReportsController(AmazonDbContext context)
        {
            _context = context;
        }

        public IActionResult Index()
        {
            // Get distinct years from CustomerOrders' orderDate, sorted descending
            var years = _context.CustomerOrders
                .Select(o => o.OrderDate.Year)
                .Distinct()
                .OrderByDescending(y => y)
                .ToList();

            // Create a SelectList from the list of years
            var yearSelectList = new SelectList(years.Select(y => new { Value = y, Text = y }), "Value", "Text");

            // Pass SelectList as model to the view
            return View("AnnualSalesReport", yearSelectList);
        }

        public IActionResult AnnualSalesReportData(int Year)
        {
            if (Year > 0)
            {
                var orderSummary = _context.ItemsInOrders
                    .Where(iio => iio.OrderNumberNavigation.OrderDate.Year == Year)
                    .GroupBy(iio => new
                    {
                        iio.OrderNumberNavigation.OrderDate.Year,
                        iio.OrderNumberNavigation.OrderDate.Month
                    })
                    .Select(group => new
                    {
                        year = group.Key.Year,
                        monthNo = group.Key.Month,
                        totalItems = group.Sum(iio => iio.NumberOf),
                        totalSales = group.Sum(iio => iio.TotalItemCost)
                    })
                    .AsEnumerable() // Switch to in-memory processing
                    .Select(data => new
                    {
                        data.year,
                        data.monthNo,
                        monthName = System.Globalization.CultureInfo.CurrentCulture.DateTimeFormat.GetMonthName(data.monthNo),
                        data.totalItems,
                        data.totalSales
                    })
                    .OrderBy(data => data.monthNo)
                    .ToList();

                return Json(orderSummary);
            }
            else
            {
                return BadRequest();
            }
        }
    }
}
