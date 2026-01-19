import React, { useState, useMemo } from 'react';
import Header from './components/Header/Header';
import HorizontalMenu from './components/HorizontalMenu/HorizontalMenu';
import MobileMenu from './components/MobileMenu/MobileMenu';
import SearchBar from './components/SearchBar/SearchBar';
import PostGrid from './components/PostGrid/PostGrid';
import PostModal from './components/PostModal/PostModal';
import { useFetch } from './hooks/useFetch';
import { Post } from './types/Post';
import './styles/global.scss';

const API_URL = 'https://cloud.codesupply.co/endpoint/react/data.json';

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch posts data
  const { data, loading, error } = useFetch<Post[]>(API_URL);

  // Filter posts based on search query
  const filteredPosts = useMemo(() => {
    if (!data) return [];

    if (!searchQuery.trim()) {
      return data;
    }

    const query = searchQuery.toLowerCase();
    return data.filter(
      (post) =>
        post.title.toLowerCase().includes(query) ||
        post.text.toLowerCase().includes(query)
    );
  }, [data, searchQuery]);

  const handlePostClick = (post: Post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedPost(null), 300); // Wait for animation
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleCloseMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="App">
      <Header onMenuToggle={handleMobileMenuToggle} />
      <HorizontalMenu />
      <MobileMenu isOpen={isMobileMenuOpen} onClose={handleCloseMobileMenu} />

      <main>
        <SearchBar 
          value={searchQuery} 
          onChange={setSearchQuery} 
        />

        {loading && (
          <div className="container" style={{ padding: '3rem 0', textAlign: 'center' }}>
            <p>Loading posts...</p>
          </div>
        )}

        {error && (
          <div className="container" style={{ padding: '3rem 0', textAlign: 'center' }}>
            <p style={{ color: 'var(--color-accent)' }}>Error: {error}</p>
          </div>
        )}

        {!loading && !error && (
          <PostGrid 
            posts={filteredPosts} 
            onPostClick={handlePostClick} 
          />
        )}
      </main>

      <PostModal 
        post={selectedPost}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}

export default App;
