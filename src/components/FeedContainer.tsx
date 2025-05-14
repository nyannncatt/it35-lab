import { useState, useEffect } from 'react';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonInput,
  IonLabel, IonModal, IonFooter, IonCard, IonCardContent, IonCardHeader,
  IonCardSubtitle, IonCardTitle, IonText, IonAvatar, IonCol,
  IonRow, IonIcon, IonPopover, IonAlert
} from '@ionic/react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../utils/supabaseClient';
import { pencil } from 'ionicons/icons';

interface Reactions {
  heart: number;
  haha: number;
  wow: number;
}

interface Post {
  post_id: string;
  user_id: number;
  username: string;
  avatar_url: string;
  post_content: string;
  post_created_at: string;
  post_updated_at: string;
  reactions?: Reactions;
}

interface PostComment {
  comment_id: number;
  post_id: string;
  user_id: number;
  username: string;
  avatar_url: string;
  comment_content: string;
  comment_created_at: string;
}

const glowStyle = {
  boxShadow: '0 0 12px violet',
  backgroundColor: '#111',
  color: 'white',
  border: '1px solid violet',
  borderRadius: '10px',
};

const inputStyle = {
  ...glowStyle,
  padding: '12px',
  marginBottom: '10px',
};

const buttonStyle = {
  ...glowStyle,
  backgroundColor: 'black',
  padding: '8px 16px',
  fontWeight: 'bold',
};

const FeedContainer = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [postContent, setPostContent] = useState('');
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [popoverState, setPopoverState] = useState<{ open: boolean; event: Event | null; postId: string | null }>({ open: false, event: null, postId: null });
  const [commentContent, setCommentContent] = useState<string>('');
  const [comments, setComments] = useState<{ [postId: string]: PostComment[] }>({});

  // Fetch user info
  useEffect(() => {
    const fetchUser = async () => {
      const { data: authData } = await supabase.auth.getUser();
      if (authData?.user?.email?.endsWith('@nbsc.edu.ph')) {
        setUser(authData.user);
        const { data: userData, error } = await supabase
          .from('users')
          .select('user_id, username, user_avatar_url')
          .eq('user_email', authData.user.email)
          .single();
        if (!error && userData) {
          setUser({ ...authData.user, id: userData.user_id });
          setUsername(userData.username);
        }
      }
    };

    // Fetch posts and comments
    const fetchPosts = async () => {
      const { data, error } = await supabase.from('posts').select('*').order('post_created_at', { ascending: false });
      if (!error) {
        setPosts(data as Post[]);
        data?.forEach(post => {
          fetchComments(post.post_id);
        });
      }
    };

    fetchUser();
    fetchPosts();
  }, []);

  // Fetch comments for a specific post
  const fetchComments = async (postId: string) => {
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('post_id', postId)
      .order('comment_created_at', { ascending: true });

    if (!error && data) {
      setComments((prev) => ({ ...prev, [postId]: data as PostComment[] }));
    }
  };

  // Create a new post
  const createPost = async () => {
    if (!postContent || !user || !username) return;

    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('user_avatar_url')
      .eq('user_id', user.id)
      .single();

    if (userError) {
      console.error('Error fetching user avatar:', userError);
      return;
    }

    const avatarUrl = userData?.user_avatar_url || 'https://ionicframework.com/docs/img/demos/avatar.svg';

    const { data, error } = await supabase
      .from('posts')
      .insert([
        {
          post_content: postContent,
          user_id: user.id,
          username,
          avatar_url: avatarUrl,
          reactions: { heart: 0, haha: 0, wow: 0 }
        }
      ])
      .select('*');

    if (!error && data) {
      setPosts([data[0] as Post, ...posts]);
    }

    setPostContent('');
  };

  // Delete a post
  const deletePost = async (post_id: string) => {
    await supabase.from('posts').delete().match({ post_id });
    setPosts(posts.filter(post => post.post_id !== post_id));
  };

  // Start editing a post
  const startEditingPost = (post: Post) => {
    setEditingPost(post);
    setPostContent(post.post_content);
    setIsModalOpen(true);
  };

  // Save edited post
  const savePost = async () => {
    if (!postContent || !editingPost) return;
    const { data, error } = await supabase
      .from('posts')
      .update({ post_content: postContent })
      .match({ post_id: editingPost.post_id })
      .select('*');

    if (!error && data) {
      const updatedPost = data[0] as Post;
      setPosts(posts.map(post => (post.post_id === updatedPost.post_id ? updatedPost : post)));
      setPostContent('');
      setEditingPost(null);
      setIsModalOpen(false);
      setIsAlertOpen(true);
    }
  };

  // Handle reactions (hearts, haha, etc.)
  const handleReaction = async (postId: string, type: keyof Reactions) => {
    const post = posts.find(p => p.post_id === postId);
    if (!post) return;

    const updatedReactions = {
      ...post.reactions,
      [type]: (post.reactions?.[type] || 0) + 1,
    };

    const { data, error } = await supabase
      .from('posts')
      .update({ reactions: updatedReactions })
      .eq('post_id', postId)
      .select('*');

    if (!error && data) {
      const updatedPost = data[0] as Post;
      setPosts(posts.map(p => (p.post_id === postId ? updatedPost : p)));
    }
  };

  // Create a new comment
  const createComment = async (postId: string) => {
    if (!commentContent || !user || !username) return;

    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('user_avatar_url')
      .eq('user_id', user.id)
      .single();

    if (userError) {
      console.error('Error fetching user avatar:', userError);
      return;
    }

    const avatarUrl = userData?.user_avatar_url || 'https://ionicframework.com/docs/img/demos/avatar.svg';

    const { data, error } = await supabase
      .from('comments')
      .insert([
        {
          post_id: postId,
          user_id: user.id,
          username,
          avatar_url: avatarUrl,
          comment_content: commentContent,
        },
      ])
      .select('*');

    if (!error && data) {
      setComments((prev) => ({
        ...prev,
        [postId]: [data[0] as PostComment, ...(prev[postId] || [])],
      }));
      setCommentContent('');
    }
  };

  return (
    <>
      <IonContent style={{ backgroundColor: 'violet', color: 'white' }}>
        {user ? (
          <>
            <IonCard style={glowStyle}>
              <IonCardHeader>
                <IonCardTitle>Create Post</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <IonInput
                  style={inputStyle}
                  value={postContent}
                  onIonChange={e => setPostContent(e.detail.value!)}
                  placeholder="Write a post..."
                  className="custom-glow-input"
                />
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                  <IonButton
                    onClick={createPost}
                    expand="block"
                    shape="round"
                    style={{
                      transition: 'all 0.3s ease',
                      '--background': 'violet',
                      '--color': 'white',
                      '--border-radius': '20px',
                      '--box-shadow': '0 0 20px violet',
                    }}
                  >
                    Post
                  </IonButton>
                </div>
              </IonCardContent>
            </IonCard>

            {posts.map(post => (
              <IonCard key={post.post_id} style={{ marginTop: '2rem', ...glowStyle }}>
                <IonCardHeader>
                  <IonRow>
                    <IonCol size="1.85">
                      <IonAvatar>
                        <img alt={post.username} src={post.avatar_url} />
                      </IonAvatar>
                    </IonCol>
                    <IonCol>
                      <IonCardTitle>{post.username}</IonCardTitle>
                      <IonCardSubtitle>{new Date(post.post_created_at).toLocaleString()}</IonCardSubtitle>
                    </IonCol>
                    <IonCol size="auto">
                      <IonButton
                        fill="clear"
                        onClick={(e) =>
                          setPopoverState({
                            open: true,
                            event: e.nativeEvent,
                            postId: post.post_id,
                          })
                        }
                      >
                        <IonIcon style={{ color: 'white' }} icon={pencil} />
                      </IonButton>
                    </IonCol>
                  </IonRow>
                </IonCardHeader>

                <IonCardContent>
                  <IonText style={{ color: 'white' }}>
                    <p>{post.post_content}</p>
                  </IonText>

                  <IonRow>
                    <IonButton style={buttonStyle} fill="clear" onClick={() => handleReaction(post.post_id, 'heart')}>
                      ❤️ {post.reactions?.heart || 0}
                    </IonButton>
                    <IonButton style={buttonStyle} fill="clear" onClick={() => handleReaction(post.post_id, 'haha')}>
                      😂 {post.reactions?.haha || 0}
                    </IonButton>
                    <IonButton style={buttonStyle} fill="clear" onClick={() => handleReaction(post.post_id, 'wow')}>
                      😮 {post.reactions?.wow || 0}
                    </IonButton>
                  </IonRow>

                  <IonInput
                    style={inputStyle}
                    value={commentContent}
                    onIonChange={(e) => setCommentContent(e.detail.value!)}
                    placeholder="Write a comment..."
                    className="custom-glow-input"
                  />
                    <IonButton
                    style={{
                      ...buttonStyle,
                      '--background': 'violet',
                      '--color': 'white',
                      '--border-radius': '20px',
                      '--box-shadow': '0 0 20px violet',
                      marginTop: '10px',
                    }}
                    expand="block"
                    onClick={() => createComment(post.post_id)}
                    >
                    Comment
                    </IonButton>

                  <div>
                    {comments[post.post_id]?.map((comment) => (
                      <IonCard key={comment.comment_id} style={{ marginTop: '1rem', ...glowStyle }}>
                        <IonCardHeader>
                          <IonRow>
                            <IonCol size="1.85">
                              <IonAvatar>
                                <img alt={comment.username} src={comment.avatar_url} />
                              </IonAvatar>
                            </IonCol>
                            <IonCol>
                              <IonCardTitle>{comment.username}</IonCardTitle>
                              <IonCardSubtitle>{new Date(comment.comment_created_at).toLocaleString()}</IonCardSubtitle>
                            </IonCol>
                          </IonRow>
                        </IonCardHeader>

                        <IonCardContent>
                          <IonText style={{ color: 'white' }}>
                            <p>{comment.comment_content}</p>
                          </IonText>
                        </IonCardContent>
                      </IonCard>
                    ))}
                  </div>
                </IonCardContent>
              </IonCard>
            ))}
          </>
        ) : (
          <IonLabel>Loading...</IonLabel>
        )}
      </IonContent>

      <IonModal isOpen={isModalOpen} onDidDismiss={() => setIsModalOpen(false)}>
<IonHeader style={{ ...glowStyle, backgroundColor: 'black' }}>
  <IonToolbar>
    <IonTitle>Edit Post</IonTitle>
  </IonToolbar>
</IonHeader>
<IonContent>
  <IonInput
    style={inputStyle}
    value={postContent}
    onIonChange={(e) => setPostContent(e.detail.value!)}
    placeholder="Edit your post"
  />
</IonContent>
<IonFooter>
  <IonButton onClick={savePost} style={buttonStyle}>Save</IonButton>
</IonFooter>
</IonModal>
  <IonPopover
    isOpen={popoverState.open}
    event={popoverState.event}
    onDidDismiss={() => setPopoverState({ ...popoverState, open: false })}
  >
    <IonButton
      fill="clear"
      onClick={() => {
        deletePost(popoverState.postId!);
        setPopoverState({ ...popoverState, open: false });
      }}
    >
      Delete Post
    </IonButton>
  </IonPopover>

  <IonAlert
    isOpen={isAlertOpen}
    onDidDismiss={() => setIsAlertOpen(false)}
    header="Post Edited"
    message="Your post has been updated."
    buttons={['OK']}
  />
</>
);
};

export default FeedContainer;