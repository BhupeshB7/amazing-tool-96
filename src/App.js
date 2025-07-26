
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Plus, Trash2, X, Circle, CheckCircle, ChevronDown, AlignLeft, Calendar as CalendarIcon, Hash } from 'lucide-react';

const ProjectManagementDashboard = () => {
    const [tasks, setTasks] = useState([
        { id: 1, title: 'Revamp marketing website', description: 'Update the homepage and pricing page with new branding.', priority: 'High', dueDate: '2024-08-15', completed: false },
        { id: 2, title: 'API Integration for new feature', description: 'Connect to the third-party weather API.', priority: 'High', dueDate: '2024-08-20', completed: false },
        { id: 3, title: 'Database schema design', description: 'Finalize the schema for the user profiles table.', priority: 'Medium', dueDate: '2024-08-22', completed: true },
        { id: 4, title: 'Onboarding flow UI/UX', description: 'Design and wireframe the new user onboarding experience.', priority: 'Low', dueDate: '2024-09-01', completed: false },
        { id: 5, title: 'Setup CI/CD pipeline', description: 'Automate the deployment process using GitHub Actions.', priority: 'Medium', dueDate: '2024-08-18', completed: false },
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filter, setFilter] = useState('All');
    const [sortBy, setSortBy] = useState('priority');

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    const handleAddTask = useCallback((newTask) => {
        setTasks(prevTasks => [...prevTasks, { ...newTask, id: Date.now(), completed: false }]);
    }, []);

    const handleToggleComplete = useCallback((id) => {
        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
    }, []);

    const handleDeleteTask = useCallback((id) => {
        setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    }, []);

    const filteredTasks = useMemo(() => {
        return tasks.filter(task => {
            if (filter === 'All') return true;
            if (filter === 'Active') return !task.completed;
            if (filter === 'Completed') return task.completed;
            return true;
        });
    }, [tasks, filter]);
    
    const sortedTasks = useMemo(() => {
        const priorityOrder = { 'High': 1, 'Medium': 2, 'Low': 3 };
        return [...filteredTasks].sort((a, b) => {
            if (sortBy === 'priority') {
                return priorityOrder[a.priority] - priorityOrder[b.priority];
            }
            if (sortBy === 'dueDate') {
                return new Date(a.dueDate) - new Date(b.dueDate);
            }
            return 0;
        });
    }, [filteredTasks, sortBy]);

    const tasksRemaining = useMemo(() => tasks.filter(task => !task.completed).length, [tasks]);

    const priorityStyles = {
        High: 'border-rose-500',
        Medium: 'border-amber-500',
        Low: 'border-emerald-500',
    };

    const priorityBgStyles = {
        High: 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300',
        Medium: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300',
        Low: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300',
    };
    
    return (
        <div className="bg-slate-100 dark:bg-slate-900 min-h-screen font-sans text-slate-800 dark:text-slate-200">
            <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
                <header className="mb-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                           <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Project Dashboard</h1>
                           <p className="text-slate-500 dark:text-slate-400 mt-1">{tasksRemaining} tasks remaining out of {tasks.length}</p>
                        </div>
                        <button
                            onClick={handleOpenModal}
                            aria-label="Add new task"
                            className="flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-100 dark:focus:ring-offset-slate-900 transition-all duration-300"
                        >
                            <Plus size={18} />
                            Add Task
                        </button>
                    </div>
                    <div className="mt-6 flex flex-col sm:flex-row items-center gap-4 p-4 bg-white/50 dark:bg-slate-800/50 rounded-lg backdrop-blur-sm border border-slate-200 dark:border-slate-700">
                        <div className="flex items-center gap-2 w-full sm:w-auto">
                            <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Show:</span>
                            <div className="flex items-center bg-slate-200 dark:bg-slate-700 rounded-md p-1">
                                {['All', 'Active', 'Completed'].map(f => (
                                    <button
                                        key={f}
                                        onClick={() => setFilter(f)}
                                        className={`px-3 py-1 text-sm font-semibold rounded-md transition-colors duration-200 ${filter === f ? 'bg-white dark:bg-slate-600 text-indigo-600 dark:text-white shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
                                    >
                                        {f}
                                    </button>
                                ))}
                            </div>
                        </div>
                         <div className="flex items-center gap-2 w-full sm:w-auto">
                            <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Sort by:</span>
                            <div className="flex items-center bg-slate-200 dark:bg-slate-700 rounded-md p-1">
                                {[{key: 'priority', label: 'Priority'}, {key: 'dueDate', label: 'Due Date'}].map(s => (
                                    <button
                                        key={s.key}
                                        onClick={() => setSortBy(s.key)}
                                        className={`px-3 py-1 text-sm font-semibold rounded-md transition-colors duration-200 ${sortBy === s.key ? 'bg-white dark:bg-slate-600 text-indigo-600 dark:text-white shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
                                    >
                                        {s.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </header>

                {sortedTasks.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {sortedTasks.map(task => (
                            <TaskCard 
                                key={task.id} 
                                task={task} 
                                onToggleComplete={handleToggleComplete} 
                                onDelete={handleDeleteTask}
                                priorityStyles={priorityStyles}
                                priorityBgStyles={priorityBgStyles}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16 px-6 bg-white dark:bg-slate-800 rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-700">
                        <h2 className="text-xl font-semibold text-slate-700 dark:text-slate-300">No tasks here!</h2>
                        <p className="text-slate-500 dark:text-slate-400 mt-2 mb-6">Looks like it's a quiet day. Add a new task to get started.</p>
                        <button
                            onClick={handleOpenModal}
                            aria-label="Add your first task"
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-100 dark:focus:ring-offset-slate-800 transition-all duration-300"
                        >
                            <Plus size={20} />
                            Add First Task
                        </button>
                    </div>
                )}
            </main>

            <AddTaskModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onAddTask={handleAddTask}
            />
        </div>
    );
};

const TaskCard = ({ task, onToggleComplete, onDelete, priorityStyles, priorityBgStyles }) => {
    return (
        <div className={`group bg-white dark:bg-slate-800 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border-l-4 ${priorityStyles[task.priority]} ${task.completed ? 'opacity-60' : ''}`}>
            <div className="p-5">
                <div className="flex justify-between items-start">
                    <button
                        onClick={() => onToggleComplete(task.id)}
                        aria-label={task.completed ? "Mark task as incomplete" : "Mark task as complete"}
                        className="flex items-center gap-3 w-full"
                    >
                        {task.completed ? <CheckCircle size={22} className="text-emerald-500" /> : <Circle size={22} className="text-slate-400 group-hover:text-indigo-500 transition-colors" />}
                        <h3 className={`font-bold text-lg text-slate-800 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors ${task.completed ? 'line-through text-slate-500 dark:text-slate-400' : ''}`}>
                            {task.title}
                        </h3>
                    </button>
                    <button
                        onClick={() => onDelete(task.id)}
                        aria-label="Delete task"
                        className="p-1 rounded-full text-slate-400 hover:bg-rose-100 dark:hover:bg-rose-900/50 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-all duration-300"
                    >
                        <Trash2 size={18} />
                    </button>
                </div>
                <p className={`mt-2 text-slate-600 dark:text-slate-400 ml-9 ${task.completed ? 'line-through' : ''}`}>
                    {task.description}
                </p>
                <div className="mt-4 flex items-center justify-between ml-9">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${priorityBgStyles[task.priority]}`}>
                        {task.priority} Priority
                    </span>
                    <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                        <CalendarIcon size={16} />
                        <span>{new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

const AddTaskModal = ({ isOpen, onClose, onAddTask }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('Medium');
    const [dueDate, setDueDate] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        if (isOpen) {
            window.addEventListener('keydown', handleKeyDown);
        }
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) {
            setError('Task title is required.');
            return;
        }
        if(!dueDate) {
            setError('Due date is required.');
            return;
        }
        setError('');
        onAddTask({ title, description, priority, dueDate });
        onClose();
        setTitle('');
        setDescription('');
        setPriority('Medium');
        setDueDate('');
    };

    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
        >
            <div className={`fixed inset-0 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`} onClick={onClose}></div>
            <div className={`bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-md m-4 transform transition-all duration-300 ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
                <div className="flex items-center justify-between p-5 border-b border-slate-200 dark:border-slate-700">
                    <h2 id="modal-title" className="text-xl font-bold text-slate-900 dark:text-white">Add a New Task</h2>
                    <button onClick={onClose} aria-label="Close modal" className="p-1 rounded-full text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                        <X size={24} />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Task Title</label>
                        <div className="relative">
                            <AlignLeft className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input type="text" id="title" value={title} onChange={(e) => { setTitle(e.target.value); if(error) setError(''); }} placeholder="e.g., Design new login page" className="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-slate-700 dark:text-white" required />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Description (Optional)</label>
                         <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Add more details about the task..." rows="3" className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-slate-700 dark:text-white resize-none"></textarea>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="priority" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Priority</label>
                            <div className="relative">
                                <Hash className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <select id="priority" value={priority} onChange={(e) => setPriority(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-slate-700 dark:text-white appearance-none">
                                    <option>High</option>
                                    <option>Medium</option>
                                    <option>Low</option>
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
                            </div>
                        </div>
                         <div>
                            <label htmlFor="dueDate" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Due Date</label>
                            <div className="relative">
                                <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <input type="date" id="dueDate" value={dueDate} onChange={(e) => { setDueDate(e.target.value); if(error) setError(''); }} className="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-slate-700 dark:text-white" required />
                            </div>
                        </div>
                    </div>
                    {error && <p className="text-sm text-rose-600 dark:text-rose-400">{error}</p>}
                    <div className="flex justify-end gap-3 pt-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-md transition-colors">
                            Cancel
                        </button>
                        <button type="submit" className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-md shadow-sm disabled:opacity-50 disabled:cursor-not-allowed transition-colors" disabled={!title.trim() || !dueDate}>
                            Add Task
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProjectManagementDashboard;
