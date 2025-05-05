import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonMenuButton,
  IonInputPasswordToggle,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonRouter,
  IonToast,
  IonAlert,
} from '@ionic/react';

import {
  keyOutline,
  personCircleOutline,
  tvOutline,
} from 'ionicons/icons';

import { useState } from 'react';
import { supabase } from '../utils/supabaseClient';

const AlertBox: React.FC<{ message: string; isOpen: boolean; onClose: () => void }> = ({
  message,
  isOpen,
  onClose,
}) => (
  <IonAlert
    isOpen={isOpen}
    onDidDismiss={onClose}
    header="Notification"
    message={message}
    buttons={['OK']}
  />
);

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
    <IonPage
      style={{
        background: 'linear-gradient(135deg, #f5f0ff, #e0ccff, #d1b3ff)',
        minHeight: '100vh',
      }}
    >
      <IonHeader>
        <IonToolbar style={{ background: 'transparent' }}>
          <IonButtons slot="start">
            <IonMenuButton color="medium" />
          </IonButtons>
          <IonTitle style={{ color: '#white' }}>Login</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent
        fullscreen
        className="ion-padding"
        style={{
          '--background': 'transparent',
          color: '#4b0082',
        }}
      >
        <div
          style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px',
          }}
        >
          <IonIcon icon={tvOutline} style={{ fontSize: '80px', color: '#6a0dad' }} />
          <h2 style={{ color: '#6a0dad', marginTop: '10px' }}>Welcome Back!</h2>

          <div style={{ width: '100%', maxWidth: '400px', marginTop: '30px' }}>
            <IonItem
              lines="inset"
              style={{
                borderRadius: '10px',
                backgroundColor: '#ffffff',
                marginBottom: '15px',
              }}
            >
              <IonIcon icon={personCircleOutline} slot="start" color="primary" />
              <IonInput
                type="email"
                placeholder="Enter Email"
                value={email}
                onIonChange={(e) => setEmail(e.detail.value!)}
              />
            </IonItem>

            <IonItem
              lines="inset"
              style={{
                borderRadius: '10px',
                backgroundColor: '#ffffff',
                marginBottom: '20px',
              }}
            >
              <IonIcon icon={keyOutline} slot="start" color="primary" />
              <IonInput
                type="password"
                placeholder="Enter Password"
                value={password}
                onIonChange={(e) => setPassword(e.detail.value!)}
              >
                <IonInputPasswordToggle slot="end" />
              </IonInput>
            </IonItem>

            <IonButton expand="block" shape="round" color="primary" onClick={doLogin}>
              Login
            </IonButton>

            <p style={{ textAlign: 'center', color: '#6a0dad', marginTop: '15px' }}>
              No account?{' '}
              <span
                style={{
                  color: '#9b4dca',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                }}
                onClick={doRegister}
              >
                Register here
              </span>
            </p>
          </div>
        </div>

        <AlertBox message={alertMessage} isOpen={showAlert} onClose={() => setShowAlert(false)} />

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