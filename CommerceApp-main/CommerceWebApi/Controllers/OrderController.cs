using AutoMapper;
using CommerceWebApi.Entities;
using CommerceWebApi.Interfaces;
using CommerceWebApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace CommerceWebApi.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    
    public class OrderController : ControllerBase
    {
        private IRepository<Order> repository;
        private readonly ApplicationDbContext applicationDbContext;
        private readonly UserManager<ApplicationUser> userManager;
        private readonly IMapper mapper;

        public OrderController(IRepository<Order> _repository, IMapper mapper, ApplicationDbContext applicationDbContext , UserManager<ApplicationUser> userManager)
        {
            this.repository = _repository;
            this.applicationDbContext = applicationDbContext;
            this.mapper = mapper;
            this.userManager = userManager; 
        }


        // GET api/<OrderController>
        [HttpGet]
        public IEnumerable<OrderModel> Get()
        {
            List<OrderModel> result = new List<OrderModel>();
            var orders = applicationDbContext.Orders.FromSqlRaw("select * from Orders");

   
            foreach (var item in orders)
            {
                result.Add(mapper.Map<OrderModel>(item));
            }
            return result;
        }

  

        // POST api/<OrderController>
        [HttpPost]
        public IActionResult Post(OrderModel OrderModel)
        {
            if (!ModelState.IsValid)
                return BadRequest("Invalid data.");


       
            string userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value; 
            var user =  applicationDbContext.Users.FindAsync(userId).Result;
            var product = applicationDbContext.Products.FindAsync(OrderModel.productId).Result;

            Order order = new Order { user = user,
                products = product  
            };

            
            
            repository.Insert(order);

            return Ok();
        }


           
        // DELETE api/<OrderController>/
        [HttpDelete("{id}")]
        public void Delete(int id)
        {

            Order order = repository.GetById(id);

            if(order != null)
            {
                repository.Delete(order);
            } 
        }

    };
}
