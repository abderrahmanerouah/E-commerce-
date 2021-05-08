using AutoMapper;
using CommerceWebApi.Entities;
using CommerceWebApi.Interfaces;
using CommerceWebApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CommerceWebApi.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    
    public class OrderController : ControllerBase
    {
        private IRepository<Order> repository;
        private readonly ApplicationDbContext applicationDbContext;
        private readonly IMapper mapper;

        public OrderController(IRepository<Order> _repository, IMapper mapper, ApplicationDbContext applicationDbContext)
        {
            this.repository = _repository;
            this.applicationDbContext = applicationDbContext;
            this.mapper = mapper;
        }




        // GET api/<OrderController>/
        [HttpGet("{id}")]
        public ActionResult<OrderModel> Get(int id)
        {
            Order result = repository.TableNoTracking.Where(p => p.Id == id).Include(p => p.products).FirstOrDefault();

            OrderModel Order = mapper.Map<OrderModel>(result);

            if (result == null)
            {
                return NotFound();
            }
            return Order;
        }

        // POST api/<OrderController>
        [HttpPost]
        public IActionResult Post(OrderModel OrderModel)
        {
            if (!ModelState.IsValid)
                return BadRequest("Invalid data.");
            Order order = mapper.Map<Order>(OrderModel);
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
