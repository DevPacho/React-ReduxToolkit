import TaskForm from "./components/TaskForm";
import TasksList from "./components/TasksList";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TasksList />} />
          <Route path="/createTask" element={<TaskForm />} />
          <Route path="/editTask/:id" element={<TaskForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
