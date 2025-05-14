import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonInput,
  IonLabel, IonModal, IonFooter, IonCard, IonCardContent, IonCardHeader,
  IonCardSubtitle, IonCardTitle, IonAvatar, IonCol, IonRow, IonIcon,
  IonPopover, IonAlert, IonText
} from '@ionic/react';
import { useEffect, useState } from 'react';
import { pencil } from 'ionicons/icons';
import { supabase } from '../utils/supabaseClient';
import { User } from '@supabase/supabase-js';

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
  reactions?: Reactions;
  user_reactions?: {
    [user_id: string]: keyof Reactions;
  };
}

const style = document.createElement('style');
style.textContent = `
  /* General Theme */
  body {
    background-color: #1a1a2e;
    color: #fff;
  }

  .enhanced-card {
    background: #2d2d52;
    color: #fff;
    box-shadow: 0 0 16px rgba(138, 43, 226, 0.7);
    border-radius: 16px;
    margin-bottom: 16px;
  }

  .glow-avatar img {
    box-shadow: 0 0 12px rgba(138, 43, 226, 0.6);
    border-radius: 50%;
  }

  /* Post Content */
  ion-card-title {
    font-size: 1.2rem;
    font-weight: bold;
    color: #d3a1f4;
  }

  ion-card-subtitle {
    font-size: 0.9rem;
    opacity: 0.8;
    color: #bba1e3;
  }

  .create-post {
    background: #2c2c5c;
    padding: 15px;
    box-shadow: 0 0 12px rgba(138, 43, 226, 0.3);
    border-radius: 16px;
    margin-bottom: 20px;
  }

  /* Reaction Buttons */
  .reaction-buttons ion-button {
    --color: #d3a1f4;
    --background: #3a3a7b;
    --border-radius: 8px;
    margin: 5px;
  }

  .reaction-buttons ion-button:hover {
    --background: #4e4e98;
  }

  .reaction-buttons ion-button:focus {
    --background: #6b6b9b;
  }

  /* Floating Emojis */
  .floating-emoji {
    position: fixed;
    bottom: 100px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 32px;
    animation: floatUp 1s ease-out forwards;
    pointer-events: none;
    z-index: 999;
  }

  @keyframes floatUp {
    0% {
      transform: translateX(-50%) translateY(0);
      opacity: 1;
    }
    100% {
      transform: translateX(-50%) translateY(-80px);
      opacity: 0;
    }
  }

  /* Buttons */
  ion-button {
    --background: #9b59b6;
    --color: white;
  }

  ion-button:hover {
    --background: #8e44ad;
  }

  ion-button:focus {
    --background: #7318b3;
  }
`;

document.head.appendChild(style);

const FeedContainer = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [postContent, setPostContent] = useState('');
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [popoverState, setPopoverState] = useState<{ open: boolean; event: Event | null; postId: string | null }>({ open: false, event: null, postId: null });

  useEffect(() => {
    const fetchUser = async () => {
      const { data: authData } = await supabase.auth.getUser();
      if (authData?.user?.email?.endsWith('@nbsc.edu.ph')) {
        setUser(authData.user);
        const { data: userData } = await supabase
          .from('users')
          .select('user_id, username, user_avatar_url')
          .eq('user_email', authData.user.email)
          .single();
        if (userData) {
          setUser({ ...authData.user, id: userData.user_id });
          setUsername(userData.username);
        }
      }
    };

    const fetchPosts = async () => {
      const { data } = await supabase.from('posts').select('*').order('post_created_at', { ascending: false });
      if (data) setPosts(data as Post[]);
    };

    fetchUser();
    fetchPosts();
  }, []);

  const createPost = async () => {
    if (!postContent || !user || !username) return;

    const { data: userData } = await supabase
      .from('users')
      .select('user_avatar_url')
      .eq('user_id', user.id)
      .single();

    const avatarUrl = userData?.user_avatar_url || 'https://ionicframework.com/docs/img/demos/avatar.svg';

    const { data } = await supabase
      .from('posts')
      .insert([
        {
          post_content: postContent,
          user_id: user.id,
          username,
          avatar_url: avatarUrl,
          reactions: { heart: 0, haha: 0, wow: 0 },
          user_reactions: {},
        }
      ])
      .select('*');

    if (data) {
      setPosts([data[0] as Post, ...posts]);
      setPostContent('');
    }
  };

  const deletePost = async (post_id: string) => {
    await supabase.from('posts').delete().match({ post_id });
    setPosts(posts.filter(post => post.post_id !== post_id));
  };

  const startEditingPost = (post: Post) => {
    setEditingPost(post);
    setPostContent(post.post_content);
    setIsModalOpen(true);
  };

  const savePost = async () => {
    if (!postContent || !editingPost) return;
    const { data } = await supabase
      .from('posts')
      .update({ post_content: postContent })
      .match({ post_id: editingPost.post_id })
      .select('*');

    if (data) {
      const updatedPost = data[0] as Post;
      setPosts(posts.map(post => (post.post_id === updatedPost.post_id ? updatedPost : post)));
      setPostContent('');
      setEditingPost(null);
      setIsModalOpen(false);
      setIsAlertOpen(true);
    }
  };

  const handleReaction = async (postId: string, type: keyof Reactions) => {
    if (!user) return;
    const post = posts.find(p => p.post_id === postId);
    if (!post) return;

    const currentReactions = post.reactions || { heart: 0, haha: 0, wow: 0 };
    const currentUserReactions = post.user_reactions || {};
    const userReactedType = currentUserReactions[user.id];

    let updatedReactions = { ...currentReactions };
    let updatedUserReactions = { ...currentUserReactions };

    if (userReactedType === type) {
      updatedReactions[type] = Math.max((updatedReactions[type] || 0) - 1, 0);
      delete updatedUserReactions[user.id];
    } else {
      if (userReactedType) {
        updatedReactions[userReactedType] = Math.max((updatedReactions[userReactedType] || 1) - 1, 0);
      }
      updatedReactions[type] = (updatedReactions[type] || 0) + 1;
      updatedUserReactions[user.id] = type;

      const emojiMap = { heart: '❤️', haha: '😂', wow: '😮' };
      const emoji = emojiMap[type];
      const elem = document.createElement('div');
      elem.className = 'floating-emoji';
      elem.innerText = emoji;
      document.body.appendChild(elem);
      setTimeout(() => elem.remove(), 1000);
    }

    const { data } = await supabase
      .from('posts')
      .update({
        reactions: updatedReactions,
        user_reactions: updatedUserReactions
      })
      .eq('post_id', postId)
      .select('*');

    if (data) {
      const updatedPost = data[0] as Post;
      setPosts(posts.map(p => (p.post_id === postId ? updatedPost : p)));
    }
  };

  return (
    <>
      <IonContent className="ion-padding">
        {user ? (
          <>
            <IonCard className="create-post">
              <IonCardHeader>
                <IonCardTitle>Create Post</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <IonInput
                  value={postContent}
                  onIonChange={e => setPostContent(e.detail.value!)}
                  placeholder="Write a post..."
                />
              </IonCardContent>
              <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '0.5rem' }}>
                <IonButton onClick={createPost}>Post</IonButton>
              </div>
            </IonCard>

            {posts.map(post => (
              <IonCard key={post.post_id} className="enhanced-card">
                <IonCardHeader>
                  <IonRow>
                    <IonCol size="1.85">
                      <IonAvatar className="glow-avatar">
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
                        <IonIcon icon={pencil} />
                      </IonButton>
                    </IonCol>
                  </IonRow>
                </IonCardHeader>

                <IonCardContent>
                  <IonText>
                    <h2>{post.post_content}</h2>
                  </IonText>

                  <IonRow className="reaction-buttons">
                    <IonButton fill="clear" onClick={() => handleReaction(post.post_id, 'heart')}>
                      ❤️ {post.reactions?.heart || 0}
                    </IonButton>
                    <IonButton fill="clear" onClick={() => handleReaction(post.post_id, 'haha')}>
                      😂 {post.reactions?.haha || 0}
                    </IonButton>
                    <IonButton fill="clear" onClick={() => handleReaction(post.post_id, 'wow')}>
                      😮 {post.reactions?.wow || 0}
                    </IonButton>
                    </IonRow>
                  </IonCardContent>

                  <IonPopover
                    isOpen={popoverState.open && popoverState.postId === post.post_id}
                    event={popoverState.event}
                    onDidDismiss={() =>
                      setPopoverState({ open: false, event: null, postId: null })
                    }
                  >
                    <IonButton
                      fill="clear"
                      onClick={() => {
                        startEditingPost(post);
                        setPopoverState({ open: false, event: null, postId: null });
                      }}
                    >
                      Edit
                    </IonButton>
                    <IonButton
                      fill="clear"
                      color="danger"
                      onClick={() => {
                        deletePost(post.post_id);
                        setPopoverState({ open: false, event: null, postId: null });
                      }}
                    >
                      Delete
                    </IonButton>
                  </IonPopover>
                </IonCard>
              ))}
          </>
        ) : (
          <IonLabel>Loading...</IonLabel>
        )}
      </IonContent>

      <IonModal isOpen={isModalOpen} onDidDismiss={() => setIsModalOpen(false)}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Edit Post</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonInput
            value={postContent}
            onIonChange={e => setPostContent(e.detail.value!)}
            placeholder="Edit your post..."
          />
        </IonContent>
        <IonFooter>
          <IonButton onClick={savePost}>Save</IonButton>
          <IonButton onClick={() => setIsModalOpen(false)}>Cancel</IonButton>
        </IonFooter>
      </IonModal>

      <IonAlert
        isOpen={isAlertOpen}
        onDidDismiss={() => setIsAlertOpen(false)}
        header="Success"
        message="Post updated successfully!"
        buttons={['OK']}
      />
    </>
  );
};

export default FeedContainer;
