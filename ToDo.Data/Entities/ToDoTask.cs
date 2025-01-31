using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ToDo.Data.Entities
{
    public class ToDoTask
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public bool IsCompleted { get; set; }  // Example: "Pending", "Completed"
    }
}
