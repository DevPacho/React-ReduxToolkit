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
    <div>

      <header>
        <h1>Your tasks: {tasksState.length}</h1>
        <Link to="/createTask">Create task</Link>
      </header>

      {
        tasksState.map(task => (
          <div key={task.id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>

            <button onClick={() => handleDelete(task.id)}>Delete</button>
            <Link to={`/editTask/${task.id}`}>Edit</Link>
          </div>
        ))
      }
    </div>
  )
}

export default TasksList;
