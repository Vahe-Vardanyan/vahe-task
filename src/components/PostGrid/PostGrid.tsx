import React from 'react';
import { Post } from '../../types/Post';
import PostCard from '../PostCard/PostCard';
import './PostGrid.scss';

interface PostGridProps {
  posts: Post[];
  onPostClick: (post: Post) => void;
}

const PostGrid: React.FC<PostGridProps> = ({ posts, onPostClick }) => {
  if (posts.length === 0) {
    return (
      <div className="post-grid">
        <div className="container">
          <div className="post-grid__empty">
            <p>No posts found. Try adjusting your search.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="post-grid">
      <div className="container">
        <div className="post-grid__list">
          {posts.map((post, index) => (
            <div key={post.id || index} className="post-grid__item">
              <PostCard post={post} onClick={() => onPostClick(post)} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PostGrid;
