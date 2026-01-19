import React from 'react';
import { Post } from '../../types/Post';
import './PostCard.scss';

interface PostCardProps {
  post: Post;
  onClick: () => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onClick }) => {
  return (
    <article className="post-card" onClick={onClick}>
      <div className="post-card__image-wrapper">
        <img
          src={post.img}
          srcSet={`${post.img} 1x, ${post.img_2x} 2x`}
          alt={post.title}
          className="post-card__image"
          loading="lazy"
        />
      </div>

      <div className="post-card__content">
        <div className="post-card__meta">
          <span className="post-card__category">{post.tags}</span>
          <span className="post-card__date">{post.date}</span>
        </div>

        <h2 className="post-card__title">{post.title}</h2>

        <p className="post-card__text">{post.text}</p>

        <div className="post-card__footer">
          <span className="post-card__author">By {post.autor}</span>
          {post.views && (
            <span className="post-card__views">{post.views} views</span>
          )}
        </div>
      </div>
    </article>
  );
};

export default PostCard;
