import React, { useEffect, useState } from 'react';
import './style.css';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getEndpoint = 'https://jsonplaceholder.typicode.com/posts';

    fetch(getEndpoint)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('GET Error:', error);
        setLoading(false);
      });
  }, []);

  const handleEdit = (postId, newTitle) => {
    const putEndpoint = `https://jsonplaceholder.typicode.com/posts/${postId}`;

    fetch(putEndpoint, {
      method: 'PUT',
      body: JSON.stringify({
        title: newTitle,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((updatedPost) => {
        const updatedPosts = posts.map((post) =>
          post.id === updatedPost.id ? updatedPost : post
        );
        setPosts(updatedPosts);
      })
      .catch((error) => {
        console.error('PUT Error:', error);
      });
  };

  const handleDelete = (postId) => {
    const deleteEndpoint = `https://jsonplaceholder.typicode.com/posts/${postId}`;

    fetch(deleteEndpoint, {
      method: 'DELETE',
    })
      .then(() => {
        const updatedPosts = posts.filter((post) => post.id !== postId);
        setPosts(updatedPosts);
      })
      .catch((error) => {
        console.error('DELETE Error:', error);
      });
  };

  return (
    <div className="App">
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          posts.map((post) => (
            <div
              style={{ border: '1px dashed', marginBottom: '5px' }}
              key={post.id}
            >
              <div>{post.title}</div>
              <button
                onClick={() => {
                  const newTitle = prompt('Enter a new title:', post.title);
                  if (newTitle !== null) {
                    handleEdit(post.id, newTitle);
                  }
                }}
              >
                Edit
              </button>
              <button onClick={() => handleDelete(post.id)}>Delete</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default App;
