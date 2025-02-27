import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookCategoryService from "../Services/BookCategory.service";
import Layout from "../components/Layout";
import { NavLink } from "react-router-dom";
import { Loader2 } from "lucide-react";

const Books = () => {
  const { category_id } = useParams();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (category_id) {
      BookCategoryService.getBooksByCategory(category_id)
        .then((response) => {
          // ข้อมูลที่ได้จาก API จะอยู่ในรูปแบบใหม่ที่แปลงแล้ว
          setBooks(response.data);
        })
        .catch((e) => {
          console.error("API Error:", e);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [category_id]);

  return (
    <Layout>
      <div className="p-6 rounded-lg max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">📚 หนังสือในหมวดหมู่นี้</h1>
        {loading ? (
          <div className="flex justify-center items-center h-32">
            <Loader2 className="animate-spin text-gray-500" size={32} />
          </div>
        ) : books.length > 0 ? (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.map((book) => (
              <NavLink
                key={book.book_id}
                to={`/content/${book.book_id}`}
                className="group"
              >
                <li className="p-5 bg-white rounded-xl shadow-md hover:shadow-lg transition-all border border-gray-200 hover:border-gray-400 overflow-hidden">
                  <div className="relative w-full h-60 overflow-hidden rounded-lg">
                    <img
                      src={book.book_photo} // ใช้ URL ที่แปลงแล้ว
                      alt={book.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">
                      {book.title}
                    </h3>
                    <p className="text-gray-600 text-sm">✍️ {book.author}</p>
                    <p className="text-gray-500 text-xs">📅 ปีที่พิมพ์: {book.publish_year}</p>
                  </div>
                </li>
              </NavLink>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500">🚫 ไม่พบหนังสือในหมวดหมู่นี้</p>
        )}
      </div>
    </Layout>
  );
};

export default Books;