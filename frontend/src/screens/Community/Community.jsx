import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../utils/api';
import useAuthStore from '../../store/authStore';

const CommunityPost = ({ post, onLikeUpdate, onCommentAdded }) => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [commentText, setCommentText] = useState('');
  const [showComments, setShowComments] = useState(false);
  const [copying, setCopying] = useState(false);

  const handleLike = async () => {
    if (!user) {
      alert('Please login to like posts');
      return;
    }
    try {
      const result = await api.post(`/community/posts/${post.id}/like`, {});
      onLikeUpdate(post.id, result.liked);
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!user) {
      alert('Please login to comment');
      return;
    }
    if (!commentText.trim()) return;

    try {
      const newComment = await api.post(`/community/posts/${post.id}/comment`, { text: commentText });
      onCommentAdded(post.id, newComment);
      setCommentText('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleCopyTrip = async () => {
    if (!user) {
      alert('Please login to copy trips');
      return;
    }
    if (!post.tripId) {
      alert('This post does not have an associated trip');
      return;
    }

    setCopying(true);
    try {
      const newTrip = await api.post(`/trips/${post.tripId}/copy`, {});
      alert('Trip copied successfully! Redirecting to your dashboard...');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error copying trip:', error);
      alert('Failed to copy trip: ' + error.message);
    } finally {
      setCopying(false);
    }
  };

  const isLikedByMe = post.likes?.some(like => like.userId === user?.id);

  return (
    <div className="card p-6 mb-6">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-full bg-bg-elevated border border-brand-primary/20 overflow-hidden">
          {post.user?.photo ? (
            <img src={post.user.photo} alt={post.user.firstName} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-brand-primary font-bold">
              {post.user?.firstName?.[0]}
            </div>
          )}
        </div>
        <div>
          <h4 className="font-semibold text-text-primary">{post.user?.firstName} {post.user?.lastName}</h4>
          <p className="text-xs text-text-secondary">{new Date(post.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
      
      {post.trip?.coverPhoto && (
        <div className="h-48 bg-bg-elevated mb-4 rounded overflow-hidden border border-brand-primary/10">
          <img src={post.trip.coverPhoto} alt={post.trip.name} className="w-full h-full object-cover" />
        </div>
      )}
      
      <h3 className="font-display text-xl mb-2 text-brand-primary">{post.title}</h3>
      <p className="text-text-secondary text-sm mb-4">{post.content}</p>
      
      <div className="flex justify-between items-center border-t border-brand-primary/10 pt-4">
        <div className="flex gap-4">
          <button 
            onClick={handleLike}
            className={`flex items-center gap-1 text-sm hover:text-brand-primary transition-colors ${isLikedByMe ? 'text-brand-primary' : 'text-text-secondary'}`}
          >
            {isLikedByMe ? '❤️' : '🤍'} {post.likes?.length || 0} Likes
          </button>
          <button 
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-1 text-sm text-text-secondary hover:text-brand-primary transition-colors"
          >
            💬 {post.comments?.length || 0} Comments
          </button>
        </div>
        <button 
          onClick={handleCopyTrip}
          disabled={copying}
          className="btn-outline py-1 px-4 text-sm border-brand-primary/20 disabled:opacity-50"
        >
          {copying ? 'Copying...' : 'Copy Trip'}
        </button>
      </div>

      {showComments && (
        <div className="mt-4 pt-4 border-t border-brand-primary/5">
          <div className="space-y-3 mb-4">
            {post.comments?.map((comment) => (
              <div key={comment.id} className="text-sm">
                <span className="font-semibold text-text-primary mr-2">
                  {comment.user?.firstName} {comment.user?.lastName}:
                </span>
                <span className="text-text-secondary">{comment.text}</span>
              </div>
            ))}
          </div>
          <form onSubmit={handleComment} className="flex gap-2">
            <input 
              type="text" 
              placeholder="Add a comment..." 
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="input-field py-1 px-3 text-sm flex-1"
            />
            <button type="submit" className="btn-primary py-1 px-3 text-sm">Send</button>
          </form>
        </div>
      )}
    </div>
  );
};

const Community = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuthStore();

  const fetchPosts = async () => {
    try {
      const data = await api.get('/community/posts');
      setPosts(data);
    } catch (error) {
      console.error('Error fetching community posts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleLikeUpdate = (postId, liked) => {
    setPosts(prevPosts => prevPosts.map(post => {
      if (post.id === postId) {
        const newLikes = liked 
          ? [...(post.likes || []), { userId: user.id, postId }]
          : (post.likes || []).filter(l => l.userId !== user.id);
        return { ...post, likes: newLikes };
      }
      return post;
    }));
  };

  const handleCommentAdded = (postId, newComment) => {
    setPosts(prevPosts => prevPosts.map(post => {
      if (post.id === postId) {
        return { ...post, comments: [...(post.comments || []), newComment] };
      }
      return post;
    }));
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64 text-brand-primary">Loading community posts...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      {/* Top Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-between">
        <div className="w-full md:w-1/2 relative">
          <input type="text" placeholder="Search trips ...." className="input-field pl-4 pr-10" />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <select className="input-field py-2 text-sm bg-bg-surface">
            <option>Sort by...</option>
            <option>A to Z</option>
            <option>Oldest first</option>
            <option>Newest First</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <h2 className="text-3xl font-display mb-8 text-center lg:text-left">Community Feed</h2>
          {posts.length > 0 ? (
            posts.map(post => (
              <CommunityPost 
                key={post.id} 
                post={post} 
                onLikeUpdate={handleLikeUpdate}
                onCommentAdded={handleCommentAdded}
              />
            ))
          ) : (
            <div className="text-center py-12 text-text-secondary card">
              No community posts yet. Be the first to share your trip!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Community;
