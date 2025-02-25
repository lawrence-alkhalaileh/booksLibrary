import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import AddBook from './AddBook'
import { ToastContainer, toast } from 'react-toastify';



function BookList() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get("http://localhost:5000/");
                setData(response.data);
            } catch (err) {
                console.error("Error fetching books", err);
            }
        };
        fetchBooks();
    }, []);

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:5000/delete/${id}`);
            if (response.status === 200) {
                toast.warning(response.data.message);
                setData((prevData) => prevData.filter((book) => book.id !== id));
            } else {
                alert("Error deleting book");
            }
        } catch (err) {
            console.error("Error deleting book", err);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">All Books</h2>

            <div className="mb-8">
                <AddBook setData={setData} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.map((book) => (
                    <div key={book.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 transition hover:shadow-lg">
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-xl font-bold text-gray-800">{book.title}</h3>
                                <span className="px-2 py-1 bg-gray-100 text-xs rounded-full text-gray-600">{book.genre}</span>
                            </div>

                            <p className="text-gray-600 mb-2">by <span className="font-medium">{book.author}</span></p>
                            <p className="text-gray-500 text-sm mb-4">{book.publication_data}</p>

                            <p className="text-gray-700 mb-6 line-clamp-3">{book.description}</p>

                            <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                                <Link to={`/edit/${book.id}`} className="text-blue-600 hover:text-blue-800 font-medium">
                                    Edit
                                </Link>
                                <button
                                    onClick={() => handleDelete(book.id)}
                                    className="px-3 py-1 bg-red-50 text-red-600 rounded hover:bg-red-100 transition focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <ToastContainer />
        </div>
    );
}

export default BookList;
