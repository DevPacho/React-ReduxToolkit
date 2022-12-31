import { useSelector, useDispatch } from "react-redux";
import { deleteTask } from "../features/tasks/taskSlice";
import { Link } from "react-router-dom";

function TasksList() {

  const tasksState = useSelector(state => state.tasks);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteTask(id));
  };

  return (
    <div className="w-4/6">
      <header className="flex justify-between items-center py-4">
        <h1>Your tasks: {tasksState.length}</h1>
        <Link
          to="/createTask"
          className="bg-indigo-600 px-2 py-1 rounded-sm text-sm"
          >
            Create task
        </Link>
      </header>

      <div className="grid grid-cols-3 gap-4">
        {
          tasksState.map(task => (
            <div key={task.id} className="bg-neutral-800 rounded-md p-4">

              <header className="flex justify-between">
                <h3>{task.title}</h3>

                <div className="flex gap-x-2">
                  <Link
                    to={`/editTask/${task.id}`}
                    className="bg-zinc-600 rounded-md text-xs px-2 py-1"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(task.id)}
                    className="bg-red-500 rounded-md text-xs px-2 py-1"
                  >
                    Delete
                  </button>
                </div>

              </header>
              <p>{task.description}</p>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default TasksList;
