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

import { 
  keyOutline, 
  personCircleOutline, 
  tvOutline, 
  eyeOutline, 
  eyeOffOutline 
} from 'ionicons/icons';

import { useState } from 'react';
import Registration from './Registration';
import { supabase } from '../utils/supabaseClient'

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
        <IonToolbar color="primary">
          <IonButtons slot='start'>
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className='ion-padding' fullscreen>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '40vh'
          }}
        >
          <IonIcon icon={tvOutline} style={{ fontSize: '80px', color: '#3880ff' }} />
          <h2 style={{ marginTop: '10px', color: '#3880ff' }}>Welcome Back!</h2>
        </div>

       
        <IonItem lines="full">
          <IonIcon 
            icon={personCircleOutline} 
            slot="start" 
            style={{ fontSize: '24px', color: '#3880ff' }} 
          />
          <IonInput
            type = "email"
            placeholder="Enter Email"
          
            value={email}
            onIonChange={(e) => setEmail(e.detail.value!)}
          />
        </IonItem>

    
        <IonItem lines="full">
          <IonIcon 
            icon={keyOutline} 
            slot="start" 
            style={{ fontSize: '24px', color: '#3880ff' }} 
          />

          <IonInput
           
            type= "password"
            placeholder="Enter Password"
            value={password}
            onIonChange={(e) => setPassword(e.detail.value!)}
          >
              
              <IonInputPasswordToggle slot="end"></IonInputPasswordToggle>
          </IonInput>

          
        </IonItem>

     
        <IonButton
          onClick={doLogin}
          expand="block"
          shape="round"
          color="primary"
          style={{ marginTop: '20px' }}
        >
          Login
        </IonButton>

    
        <div style={{ textAlign: 'center', marginTop: '15px' }}>
          <p style={{ color: '#666' }}>
            No account?
            <span
              style={{ color: '#3880ff', cursor: 'pointer', textDecoration: 'underline' }}
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