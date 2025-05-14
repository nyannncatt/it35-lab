import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonMenuButton,
  IonInputPasswordToggle, 
  IonModal,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonRouter,
  IonText,
  IonToast,
  IonAlert
} from '@ionic/react';

// Set violet background for the whole page
document.body.style.background = '#9b59b6';

// Inline style for violet background
document.body.style.background = '#9b59b6)';

import { 
  keyOutline, 
  personCircleOutline, 
  tvOutline 
} from 'ionicons/icons';

import { useState } from 'react';
import Registration from './Registration';
import { supabase } from '../utils/supabaseClient';

const AlertBox: React.FC<{ message: string; isOpen: boolean; onClose: () => void }> = ({ message, isOpen, onClose }) => {
  return (
    <IonAlert
      isOpen={isOpen}
      onDidDismiss={onClose}
      header="Notification"
      message={message}
      buttons={['OK']}
    />
  );
};

const Login: React.FC = () => {
  const navigation = useIonRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const doLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setAlertMessage(error.message);
      setShowAlert(true);
      return;
    }

    setShowToast(true); 
    setTimeout(() => {
      navigation.push('/it35-lab/app', 'forward', 'replace');
    }, 300);
  };

  const doRegister = () => {
    navigation.push('/it35-lab/Registration', 'forward', 'replace');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar style={{ '--background': '#9b59b6' }}>
          <IonButtons slot='start'>
            <IonMenuButton />
          </IonButtons>
            <IonTitle style={{ color: 'black' }}>Login</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className='ion-padding' fullscreen>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '40vh',
            marginBottom: '20px',
          }}
        >
          <IonIcon 
            icon={tvOutline} 
            style={{ 
              fontSize: '80px', 
              color: '#9b59b6', 
              filter: 'drop-shadow(0 0 30px #8a2be2)', // glow effect
              textShadow: '0 0 30px #8a2be2'
            }} 
          />
          <h2 
            style={{ 
              marginTop: '10px', 
              color: '#9b59b6', 
              filter: 'drop-shadow(0 0 20px #8a2be2)', // glow effect
              textShadow: '0 0 20px #8a2be2'
            }}
          >
            Welcome to my AppdevFinalApp!
          </h2>
        </div>

        {/* Email Input */}
        <IonItem 
          lines="full" 
          style={{ 
            marginBottom: '15px', 
            borderRadius: '10px', 
            backgroundColor: '#3a3a7b',
    boxShadow: '0 0 10px rgba(138, 43, 226, 0.7)', 
    color: '#9b59b6',
    border: '1px solid #9b59b6',
    '--highlight-color-focused': '#9b59b6',
    '--border-color': '#9b59b6',
    '--border-color-focused': '#9b59b6',
    '--box-shadow': '0 0 10px rgba(138, 43, 226, 0.7)',
    '--box-shadow-focused': '0 0 10px rgba(138, 43, 226, 0.7)',

  }}
        >
          <IonIcon 
            icon={personCircleOutline} 
            slot="start" 
            style={{ fontSize: '24px', color: '#9b59b6' }} 
          />
          <IonInput
            type="email"
            placeholder="Enter Email"
            value={email}
            onIonChange={(e) => setEmail(e.detail.value!)}
            style={{
              padding: '10px',
              color: '#9b59b6',
              textShadow: '0 0 15px #8a2be2, 0 0 20px #9b59b6', // glow effect for input text
            }}
          />
        </IonItem>

        {/* Password Input */}
        <IonItem 
          lines="full" 
          style={{
            marginBottom: '20px',
            borderRadius: '10px', 
            backgroundColor: '#3a3a7b',
            boxShadow: '0 0 15px rgba(138, 43, 226, 0.7)',
            color: '#9b59b6',
    border: '1px solid #9b59b6',
    '--highlight-color-focused': '#9b59b6',
    '--border-color': '#9b59b6',
    '--border-color-focused': '#9b59b6',
    '--box-shadow': '0 0 10px rgba(138, 43, 226, 0.7)',
    '--box-shadow-focused': '0 0 10px rgba(138, 43, 226, 0.7)',

          }}
        >
          <IonIcon 
            icon={keyOutline} 
            slot="start" 
            style={{ fontSize: '24px', color: '#9b59b6' }} 
          />
          <IonInput
            type="password"
            placeholder="Enter Password"
            value={password}
            onIonChange={(e) => setPassword(e.detail.value!)}
            style={{
              //border: '1px solid #9b59b6',
              //borderRadius: '10px',
              padding: '10px',
              color: '#9b59b6',
              //backgroundColor: '#3a3a7b',
            }}
          >
            <IonInputPasswordToggle slot="end" />
          </IonInput>
        </IonItem>

        {/* Login Button */}
        <IonButton
          onClick={doLogin}
          expand="block"
          shape="round"
          style={{
            marginTop: '20px',
            borderRadius: '20px',
            boxShadow: '0 0 20px rgba(138, 43, 226, 0.7)',
            transition: 'all 0.3s ease',
            // Custom background color using CSS variable
            '--background': '#9b59b6',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 0 25px rgba(138, 43, 226, 0.7)')}
          onMouseLeave={(e) => (e.currentTarget.style.boxShadow = '0 0 20px rgba(138, 43, 226, 0.7)')}
        >
          Login
        </IonButton>

        {/* Register Link */}
        <div style={{ textAlign: 'center', marginTop: '15px' }}>
            <p
            style={{
              color: '#9b59b6',
            }}
            >
            No account?
            <span
              style={{
              color: '#9b59b6',
              cursor: 'pointer',
              textDecoration: 'underline',
              marginLeft: '5px'
              }}
              onClick={doRegister}
            >
              Register here
            </span>
            </p>
        </div>

        <AlertBox message={alertMessage} isOpen={showAlert} onClose={() => setShowAlert(false)} />

        {/* IonToast for success message */}
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message="Login successful! Redirecting..."
          duration={1500}
          position="top"
          color="primary"
        />
      </IonContent>
    </IonPage>
  );
};

export default Login;
