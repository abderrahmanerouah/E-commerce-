using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.IO;
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
        public async Task<IActionResult> Create(int id)
        {
            var order = new OrderModel { productId = id };

            HttpClient client = apiHelper.Initial();
            string token = HttpContext.Request.Cookies["token"];
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
            var postTask = await client.PostAsJsonAsync<OrderModel>("Order", order);
            if (postTask.IsSuccessStatusCode)
            {
                var readTask = await postTask.Content.ReadAsStringAsync();


            }
            else
            {
                ModelState.AddModelError(string.Empty, string.Format("StatusCode: {0} Reason: {1}", postTask.StatusCode, postTask.ReasonPhrase));

            }

            return RedirectToAction("Index");



        }


    

            /*       public async Task<IActionResult> Index()
                    {
                        IEnumerable<OrderModel> orders = new List<OrderModel>();

                        using (var client = new HttpClient())
                        {
                            client.BaseAddress = new Uri("https://localhost:44333/api/");
                            //HTTP GET
                            var response = await client.GetAsync("Order");


                            if (response.IsSuccessStatusCode)
                            {
                                var resulString = await response.Content.ReadAsStreamAsync();
                                orders = await JsonSerializer.DeserializeAsync<IEnumerable<OrderModel>>(resulString);
                             *//*   orders = Newtonsoft.Json.JsonConvert.DeserializeObject<IEnumerable<OrderModel>>(resulString.ToString());*//*
                            }
                            else
                            {
                                ModelState.AddModelError(string.Empty, "Server error. Please contact administrator.");
                            }
                        }
                        return View(orders);
                    }*/

                  public async Task<IActionResult> Index()
                   {
                       IEnumerable<OrderModel> OrderList = await GetOrders();
                       return View(OrderList);
                   }

                   private async Task<IEnumerable<OrderModel>> GetOrders( )
                   {

                       IEnumerable<OrderModel> OrderList = new List<OrderModel>();
                       HttpClient client = apiHelper.Initial();
                       string token = HttpContext.Request.Cookies["token"];
                       client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);


                       var responseTask = await client.GetAsync("Order");
                       if (responseTask.IsSuccessStatusCode)
                       {
                           var readTask = await responseTask.Content.ReadAsStringAsync();
                           OrderList = JsonSerializer.Deserialize<IEnumerable<OrderModel>>(readTask, new JsonSerializerOptions
                           {
                               PropertyNameCaseInsensitive = true,
                           });
                       }
                       else
                       {
                           ModelState.AddModelError(string.Empty, string.Format("StatusCode: {0} Reason: {1}", responseTask.StatusCode, responseTask.ReasonPhrase));
                           OrderList = Enumerable.Empty<OrderModel>();
                       }
                       return OrderList;
                   }
        }
    }

