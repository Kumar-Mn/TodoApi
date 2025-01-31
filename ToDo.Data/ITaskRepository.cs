using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ToDo.Data.Entities;

namespace ToDo.Data
{
    public interface ITaskRepository
    {
        Task<List<ToDoTask>> GetTasksAsync(bool? status);
        Task<ToDoTask> GetByIdAsync(int id);
        Task UpdateAsync(ToDoTask task);
        Task SaveAsync();
    }
}
