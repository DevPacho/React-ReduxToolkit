import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTask, updateTask } from "../features/tasks/taskSlice";
import { useNavigate, useParams } from "react-router-dom";
import {v4 as uuid} from "uuid";

function TaskForm() {

  const tasksState = useSelector(state => state.tasks);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const [task, setTask] = useState({
    title: "",
    description: ""
  });

  const handleChange = (evnt) => {
    setTask({
      ...task,
      [evnt.target.name]: evnt.target.value,
    });
  };

  const handleSubmit = (evnt) => {
    evnt.preventDefault();

    if (params.id) {
      dispatch(updateTask(task));
    } else {
      dispatch(addTask({
        ...task,
        id: uuid(),
      })
      );
    }
    navigate("/");
  };

  useEffect(() => {
    if (params.id) {
      const taskFound = tasksState.find(task => task.id === params.id);
      setTask(taskFound);
    }
  }, [params.id, tasksState]);

  return (
    <form onSubmit={handleSubmit} className="bg-zinc-800 max-w-sm p-4">
      <label htmlFor="title" className="block text-xs font-bold mb-2">Task:</label>
      <input
        name="title"
        type="text"
        placeholder="Title"
        onChange={handleChange}
        value={task.title}
        className="w-full p-2 rounded-md bg-zinc-600 mb-2"
      />

      <label htmlFor="description" className="block text-xs font-bold mb-2 mt-2">Description:</label>
      <textarea
        name="description"
        placeholder="Description"
        onChange={handleChange}
        value={task.description}
        className="w-full p-2 rounded-md bg-zinc-600 mb-2"
      >
      </textarea>

      <button className="bg-indigo-600 rounded-md py-1 px-2">Save</button>
    </form>
  )
}

export default TaskForm;
