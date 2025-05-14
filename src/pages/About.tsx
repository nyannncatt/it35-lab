import { 
  IonButtons,
  IonContent, 
  IonHeader, 
  IonMenuButton, 
  IonPage, 
  IonTitle, 
  IonToolbar, 
  IonText 
} from '@ionic/react';

// Shared violet-black styles
const glowStyle = {
  boxShadow: '0 0 12px violet',
  backgroundColor: '#111',
  color: 'white',
  border: '1px solid violet',
  borderRadius: '10px',
  padding: '10px',
};

const About: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>About</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen style={{ backgroundColor: 'black' }}>
        <div style={{ padding: '20px', color: 'white' }}>
          <IonText>
            <h2 style={glowStyle}>App Development Overview</h2>
            <p>
              This app is a platform designed to enhance user interaction and provide a seamless experience
              for users to engage with content. It is built with a strong focus on both functionality and user experience.
            </p>
            
            <h3 style={glowStyle}>Key Features:</h3>
            
            <div style={glowStyle}>
              <h4>1. Feature/LoginSignup</h4>
              <p>
                The Login/SignUp interface allows users to easily register or log in to the platform.
                It offers a simple authentication flow to create or access an account.
              </p>
            </div>

            <div style={glowStyle}>
              <h4>2. Feature/Auth</h4>
              <p>
                This feature handles user authentication through Supabase, ensuring secure sign-in and 
                registration processes. It also provides user session management and routing for authenticated users.
              </p>
            </div>

            <div style={glowStyle}>
              <h4>3. Feature/EditProfile</h4>
              <p>
                The EditProfile feature allows users to modify their profile information, 
                including their username, avatar, and other personalized settings.
              </p>
            </div>

            <div style={glowStyle}>
              <h4>4. Feature/Feed</h4>
              <p>
                This feature implements a dynamic content feed, allowing users to create posts and view
                others' posts. Users can interact with posts through CRUD operations (Create, Read, Update, Delete).
              </p>
            </div>

            <h3 style={glowStyle}>Changes Made:</h3>

            <ul style={{ listStyleType: 'circle', color: 'white' }}>
              <li>Log in</li>
              <li>Sign Up</li>
              <li>Edit Profile</li>
              <li>Content Feed</li>
            </ul>
            
            <p style={glowStyle}>
              The app is designed with a focus on user convenience and interactive engagement. It combines 
              various elements of content management and personalized features, all within a secure and user-friendly 
              environment. 
            </p>

            <h3 style={glowStyle}>Read More</h3>
            <p style={{ color: 'white' }}>
              For more information about the development process and how the features are implemented, you can explore 
              the documentation or contact the development team.
            </p>
          </IonText>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default About;
