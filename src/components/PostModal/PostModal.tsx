import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Post } from '../../types/Post';
import './PostModal.scss';

interface PostModalProps {
  post: Post | null;
  isOpen: boolean;
  onClose: () => void;
}

const PostModal: React.FC<PostModalProps> = ({ post, isOpen, onClose }) => {
  useEffect(() => {
    // Prevent body scroll when modal is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    // Handle ESC key to close modal
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !post) {
    return null;
  }

  const modalContent = (
    <div className="post-modal">
      <div 
        className="post-modal__backdrop" 
        onClick={onClose}
        aria-label="Close modal"
      />
      
      <div className="post-modal__container">
        <div className="post-modal__content">
          <button 
            className="post-modal__close"
            onClick={onClose}
            aria-label="Close modal"
          >
            &times;
          </button>

          <div className="post-modal__image-wrapper">
            <img
              src={post.img}
              srcSet={`${post.img} 1x, ${post.img_2x} 2x`}
              alt={post.title}
              className="post-modal__image"
            />
          </div>

          <div className="post-modal__body">
            <div className="post-modal__meta">
              <span className="post-modal__category">{post.tags}</span>
              <span className="post-modal__date">{post.date}</span>
            </div>

            <h2 className="post-modal__title">{post.title}</h2>

            <div className="post-modal__author-info">
              <span className="post-modal__author">By {post.autor}</span>
              {post.views && (
                <span className="post-modal__views">{post.views} views</span>
              )}
            </div>

            <div className="post-modal__text">
              <p>{post.text}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(
    modalContent,
    document.body
  );
};

export default PostModal;
