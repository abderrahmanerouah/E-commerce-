using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CommerceWebApi.Entities
{
    public class Order
    {
        public int Id { get; set; }
        public Product products { get; set; }
        public ApplicationUser user { get; set; } 
     

    }
}
