import React, { useEffect, useState } from 'react';
import Articles from '../components/Articles';
import AddArticleModal from './AddArticle';
import { link } from '../components/Baselink';

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const url = `${link}`;

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(url + '/api/article/getallarticle');
        if (!response.ok) {
          console.alert("Error while fetching articles");
        }
        const data = await response.json();
        setArticles(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const checkLogin = async () => {
      const token = localStorage.getItem('token');
      if(token){
        setIsLoggedIn(true);
      }
    }

    checkLogin();
    fetchArticles();
  }, []);

  const handleModalClose = () => setShowModal(false);
  const handleArticleSuccess = (newArticle) => {
    alert(`New article "${newArticle.title}" created successfully!`);
    setArticles((prevArticles) => [...prevArticles, newArticle]);
  };

  return (
    <div>
      <h1
        className="sm:text-4xl text-2xl font-bold my-6 text-gray-900"
        style={{ color: 'var(--text-color)' }}
      >
        Articles
      </h1>

      {/* Add New Article Button */}
      <div className="mb-4">
        {isLoggedIn && (
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => setShowModal(true)}
        >
            Add New Article
          </button>
        )}
      </div>

      {/* Error Handling */}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {/* Loading Indicator */}
      {loading && <p>Loading articles...</p>}

      {/* Articles List */}
      {!loading && !error && (
        <div className="container py-4 mx-auto">
          <div className="flex flex-wrap -m-4">
            <Articles articles={articles} />
          </div>
        </div>
      )}

      {/* Add Article Modal */}
      {showModal && (
        <AddArticleModal
          onClose={handleModalClose}
          onSuccess={handleArticleSuccess}
        />
      )}
    </div>
  );
};

export default ArticleList;
