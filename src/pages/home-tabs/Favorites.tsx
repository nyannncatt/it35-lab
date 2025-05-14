import { 
  IonButtons,
  IonContent, 
  IonHeader, 
  IonMenuButton, 
  IonPage, 
  IonTitle, 
  IonToolbar, 
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonText
} from '@ionic/react';

// Shared violet-black styles for glowing effect
const glowStyle = {
  boxShadow: '0 0 12px violet',
  backgroundColor: '#111',
  color: 'white',
  border: '1px solid violet',
  borderRadius: '10px',
  padding: '15px',
};

const Favorites: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
            <IonToolbar style={{ backgroundColor: '#111' }}>
            <IonButtons slot="start" style={{ color: 'violet' }}>
              <IonMenuButton></IonMenuButton>
            </IonButtons>
            <IonTitle>⭐ Favorites</IonTitle>
            </IonToolbar>
      </IonHeader>
      
      <IonContent fullscreen style={{ backgroundColor: '#121212' }}>
        <div style={{ padding: '20px', color: 'white' }}>
          <IonText>
            <h2 style={glowStyle}>Favorite Technologies</h2>
            <p>These are the key technologies used in the development of this application.</p>
          </IonText>

          <IonCard style={{ marginTop: '20px', ...glowStyle }}>
            <IonCardHeader>
              <IonCardTitle style={{ color: 'violet' }}>Frontend Technologies</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <p style={{ color: 'white' }}>We use modern frontend technologies to create interactive and dynamic user interfaces.</p>
              <ul style={{ color: 'white' }}>
                <li>React</li>
                <li>Ionic Framework</li>
                <li>TypeScript</li>
              </ul>
            </IonCardContent>
          </IonCard>

          <IonCard style={{ marginTop: '20px', ...glowStyle }}>
            <IonCardHeader>
              <IonCardTitle style={{ color: 'violet' }}>Backend Technologies</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <p style={{ color: 'white' }}>The backend is powered by cloud-based solutions for real-time data and security.</p>
              <ul style={{ color: 'white' }}>
                <li>Supabase (for authentication and database management)</li>
                <li>Node.js</li>
                <li>PostgreSQL</li>
              </ul>
            </IonCardContent>
          </IonCard>

          <IonCard style={{ marginTop: '20px', ...glowStyle }}>
            <IonCardHeader>
              <IonCardTitle style={{ color: 'violet' }}>Deployment & Hosting</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <p style={{ color: 'white' }}>We use cloud services to ensure fast and reliable deployment and hosting.</p>
              <ul style={{ color: 'white' }}> 
                <li>Vercel</li>
                <li>Netlify</li>
                <li>Docker</li>
              </ul>
            </IonCardContent>
          </IonCard>

        </div>
      </IonContent>
    </IonPage>
  );
};

export default Favorites;
