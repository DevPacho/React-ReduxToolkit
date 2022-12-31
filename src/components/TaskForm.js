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
    <form onSubmit={handleSubmit}>
      <input
        name="title"
        type="text"
        placeholder="Title"
        onChange={handleChange}
        value={task.title}
      />

      <textarea
        name="description"
        placeholder="Description"
        onChange={handleChange}
        value={task.description}
      >
      </textarea>

      <button>Save</button>
    </form>
  )
}

export default TaskForm;
