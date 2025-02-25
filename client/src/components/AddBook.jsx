import PropTypes from 'prop-types';
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';

export default function AddBook({ setData }) {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [bookData, setBookData] = useState({
        title: '',
        author: '',
        genre: '',
        publication_date: '',
        description: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBookData({
            ...bookData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const body = {
            title: bookData.title,
            author: bookData.author,
            genre: bookData.genre,
            publication_date: bookData.publication_date,
            description: bookData.description
        };

        try {
            const addData = await axios.post("http://localhost:5000/add", body);

            const updatedBody = { ...body, id: addData.data.id };

            if (addData.status === 201) {
                toast.success(addData.data.message);
                setData(prev => [...prev, updatedBody])
                setBookData({
                    title: '',
                    author: '',
                    genre: '',
                    publication_date: '',
                    description: ''
                });

                setIsFormOpen(false);
            } else {
                toast.error("Failed to add the book.");
            }
        } catch (err) {
            console.error("Error adding book:", err);
            toast.error("Error adding book, please try again.");
        }
    };

    return (
        <div className="mb-8">
            {!isFormOpen ? (
                <button
                    onClick={() => setIsFormOpen(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                    Add New Book
                </button>
            ) : (
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-semibold text-gray-800">Add New Book</h3>
                        <button
                            onClick={() => setIsFormOpen(false)}
                            className="text-gray-400 hover:text-gray-600"
                        >
                            Cancel
                        </button>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div className="space-y-2">
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                    Title *
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={bookData.title}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="author" className="block text-sm font-medium text-gray-700">
                                    Author *
                                </label>
                                <input
                                    type="text"
                                    id="author"
                                    name="author"
                                    value={bookData.author}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="genre" className="block text-sm font-medium text-gray-700">
                                    Genre
                                </label>
                                <input
                                    type="text"
                                    id="genre"
                                    name="genre"
                                    value={bookData.genre}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="publication_date" className="block text-sm font-medium text-gray-700">
                                    Publication Date
                                </label>
                                <input
                                    type="text" // Changed to 'date' for better date handling
                                    id="publication_date"
                                    name="publication_date"
                                    value={bookData.publication_date}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        <div className="space-y-2 mb-6">
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={bookData.description}
                                onChange={handleChange}
                                rows="4"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                            ></textarea>
                        </div>

                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                Add Book
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}


AddBook.propTypes = {
    setData: PropTypes.func.isRequired
};