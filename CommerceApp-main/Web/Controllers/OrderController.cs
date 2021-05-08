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

    public class OrderController : Controller
    {
        private ApiHelper apiHelper = new ApiHelper();


        [HttpGet]
        public async  Task<IActionResult> Create(int id)
        {

            var order = new OrderModel { productId = id };

            HttpClient client = apiHelper.Initial();
            string token = HttpContext.Request.Cookies["token"];
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
            var postTask = await client.PostAsJsonAsync<OrderModel>("Order" , order );
            if (postTask.IsSuccessStatusCode)
            {
                var readTask = await postTask.Content.ReadAsStringAsync();

               

            }
            else
            {
                ModelState.AddModelError(string.Empty, string.Format("StatusCode: {0} Reason: {1}", postTask.StatusCode, postTask.ReasonPhrase));

            }

            return Ok();

            
           
        }
    }
}
