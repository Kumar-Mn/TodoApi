using Microsoft.AspNetCore.Mvc;
using ToDo.Data;
using ToDo.Data.Entities;

namespace TodoApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        private readonly ITaskRepository _taskRepository;

        public TasksController(ITaskRepository repo)
        {
            _taskRepository = repo;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ToDoTask>>> GetTasks([FromQuery] bool? status)
        {
            var tasks = await _taskRepository.GetTasksAsync(status);
            return Ok(tasks);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] ToDoTask task)
        {

            if (task == null)
            {
                return BadRequest("Invalid data.");
            }

            var taskToUpdate = await _taskRepository.GetByIdAsync(id);

            if (taskToUpdate == null)
            {
                return NotFound($"Task with ID {id} not found.");
            }

            taskToUpdate.Name = task.Name;
            taskToUpdate.IsCompleted = !task.IsCompleted;
            await _taskRepository.UpdateAsync(taskToUpdate);


            return NoContent();
        }
    }
}
