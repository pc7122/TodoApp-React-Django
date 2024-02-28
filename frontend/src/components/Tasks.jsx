import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Tasks() {
    const navigator = useNavigate();
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [user, setUser] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("access");

        if (!token) {
            navigator("/login");
            return;
        }

        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        axios.get("http://127.0.0.1:8000/auth/token/verify/")
            .then((res) => {
                console.log(res.data);
                setUser(res.data.username);
            })
            .catch((err) => {
                console.log(err);
                navigator("/login");
            });

        axios.get("http://127.0.0.1:8000/api/tasks/")
            .then((res) => {
                console.log(res.data);
                setTasks(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [navigator]);

    const addNewTask = () => {
        console.log(newTask);

        if (newTask === "") {
            alert("Task cannot be empty!");
            return;
        }

        axios.post("http://127.0.0.1:8000/api/tasks/", { title: newTask })
            .then((res) => {
                console.log(res.data);
                setTasks((prevTasks) => {
                    return [...prevTasks, res.data];
                });
                setNewTask("");
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const updateTask = (id) => {
        axios.put(`http://127.0.0.1:8000/api/tasks/${id}/`)
            .then((res) => {
                console.log(res.data);
                setTasks((prevTasks) => {
                    return prevTasks.map((task) => {
                        if (task.id === id) {
                            return { ...task, completed: !task.completed };
                        }
                        return task;
                    });
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const deleteTask = (id) => {
        axios.delete(`http://127.0.0.1:8000/api/tasks/${id}/`)
            .then((res) => {
                console.log(res.data);
                setTasks((prevTasks) => {
                    return prevTasks.filter((task) => task.id !== id);
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <div className="flex flex-col items-center justify-start px-6 py-8 mx-auto md:h-screen lg:py-4">
            <div className="w-full bg-white bg-opacity-50 rounded-lg shadow dark:border mb-10 p-4 dark:bg-gray-800 dark:border-gray-700">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold leading-tight tracking-normal text-gray-900 dark:text-white">Welcome {user}</h2>
                    <button className="bg-teal-800 hover:bg-teal-600 text-white py-2 px-4 rounded-lg" onClick={() => { localStorage.clear(); navigator('/login') }}>Logout</button>
                </div>
            </div>

            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-3xl xl-p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h2 className="text-3xl text-center font-bold leading-tight tracking-normal text-gray-900 dark:text-white">Tasks</h2>

                    <div className="flex gap-2 justify-center items-center">
                        <input
                            type="text"
                            className="flex-1 px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 focus:border-blue-500 focus:outline-none"
                            placeholder="Enter a task..."
                            value={newTask}
                            onChange={(e) => setNewTask(e.target.value)}
                        />
                        <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg" onClick={addNewTask}>Add Task</button>
                    </div>

                    <div className="w-full mt-4 flex flex-col gap-3">
                        {tasks.map((task) => (
                            <div key={task.id} className="flex justify-between items-center bg-white shadow-md rounded-md dark:bg-gray-800 dark:border-gray-700">
                                <div className="px-4 py-2">
                                    {task.completed
                                        ? <h3 className="text-lg font-medium text-gray-500 dark:text-white line-through">{task.title}</h3>
                                        : <h3 className="text-lg font-medium text-gray-900 dark:text-white">{task.title}</h3>
                                    }
                                </div>
                                <div className="flex gap-2 items-center px-2">
                                    <button className="bg-purple-500 hover:bg-purple-600 text-white py-1 px-2 rounded-lg" onClick={() => updateTask(task.id)}>Update</button>
                                    <button className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded-lg" onClick={() => deleteTask(task.id)}>Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Tasks;