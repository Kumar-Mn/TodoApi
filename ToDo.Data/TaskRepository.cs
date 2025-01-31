using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ToDo.Data.Entities;

namespace ToDo.Data
{
    public class TaskRepository : ITaskRepository
    {
        private readonly AppDbContext _context;

        public TaskRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<ToDoTask>> GetTasksAsync(bool? status)
        {
            var query = _context.Tasks.AsQueryable();

            if (status.HasValue)
                query = query.Where(t => t.IsCompleted == status);

            return await query.ToListAsync();
        }

        public async Task<ToDoTask> GetByIdAsync(int id)
        {
            ToDoTask? toDoTask = await _context.Tasks.FindAsync(id);
            return toDoTask;

        }

        public async Task UpdateAsync(ToDoTask task)
        {
            _context.Tasks.Update(task);  // Marks the entity as modified
            await SaveAsync();
        }

        public async Task SaveAsync()
        {
            await _context.SaveChangesAsync();
        }

    }
}
