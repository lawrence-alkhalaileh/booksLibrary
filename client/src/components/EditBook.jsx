import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EditBook() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(true);
    const [formData, setFormData] = useState({
        title: "",
        author: "",
        genre: "",
        publication_date: "",
        description: ""
    });

    const handleClose = () => {
        setIsOpen(false);
        navigate("/");
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:5000/edit/${id}`, formData);
            if (response.status === 200) {
                handleClose()
                toast.success(response.data.message);
            } else {
                toast.error("Error updating book");
            }
        } catch (err) {
            console.error("Error updating book", err);
            toast.error("Error updating book");
        }
    };

    return (
        <>
            {/* ToastContainer placed here so it remains mounted */}
            <ToastContainer />
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
                    <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md relative">
                        <div className="relative z-10">
                            <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">Edit Book</h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label htmlFor="title" className="block text-gray-700 text-sm font-medium mb-1">
                                        Title
                                    </label>
                                    <input
                                        id="title"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="author" className="block text-gray-700 text-sm font-medium mb-1">
                                        Author
                                    </label>
                                    <input
                                        id="author"
                                        name="author"
                                        value={formData.author}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="genre" className="block text-gray-700 text-sm font-medium mb-1">
                                        Genre
                                    </label>
                                    <select
                                        id="genre"
                                        name="genre"
                                        value={formData.genre}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-white"
                                        required
                                    >
                                        <option value="">Select a genre</option>
                                        <option value="fiction">Fiction</option>
                                        <option value="non-fiction">Non-Fiction</option>
                                        <option value="science-fiction">Science Fiction</option>
                                        <option value="fantasy">Fantasy</option>
                                        <option value="mystery">Mystery</option>
                                        <option value="biography">Biography</option>
                                        <option value="history">History</option>
                                        <option value="self-help">Self-Help</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="publication_date" className="block text-gray-700 text-sm font-medium mb-1">
                                        Publication Date
                                    </label>
                                    <input
                                        id="publication_date"
                                        name="publication_date"
                                        type="text"
                                        placeholder="yy-mm--dd"
                                        value={formData.publication_date}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="description" className="block text-gray-700 text-sm font-medium mb-1">
                                        Description
                                    </label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition resize-none"
                                        rows="4"
                                        required
                                    />
                                </div>
                                <div className="flex justify-between pt-4 border-t mt-6">
                                    <button
                                        type="button"
                                        onClick={handleClose}
                                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition focus:outline-none focus:ring-2 focus:ring-gray-400"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        </div>
                        <button
                            onClick={handleClose}
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 focus:outline-none z-10"
                            aria-label="Close"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    fillRule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
