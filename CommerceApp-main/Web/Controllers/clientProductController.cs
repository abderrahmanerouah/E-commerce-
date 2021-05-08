using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text.Json;
using System.Threading.Tasks;
using Web.Helper;
using Web.Models;

namespace Web.Controllers
{
    public class clientProductController : Controller
    {
        private ApiHelper apiHelper = new ApiHelper();

        public async Task<IActionResult> Index()
        {
            IEnumerable<ProductModel> productList = await GetProducts();
            return View(productList);
        }


        private async Task<IEnumerable<ProductModel>> GetProducts()
        {
            IEnumerable<ProductModel> productList = new List<ProductModel>();

            HttpClient client = apiHelper.Initial();
            string token = HttpContext.Request.Cookies["token"];
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
            var responseTask = await client.GetAsync("Product");
            if (responseTask.IsSuccessStatusCode)
            {
                var readTask = await responseTask.Content.ReadAsStringAsync();
                productList = JsonSerializer.Deserialize<IEnumerable<ProductModel>>(readTask, new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true,
                });
            }
            else
            {
                ModelState.AddModelError(string.Empty, string.Format("StatusCode: {0} Reason: {1}", responseTask.StatusCode, responseTask.ReasonPhrase));
                productList = Enumerable.Empty<ProductModel>();
            }
            return productList;
        }
    }
}
