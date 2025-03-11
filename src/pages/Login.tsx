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
  IonModal,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonRouter,
  IonText,
  IonInputPasswordToggle
} from '@ionic/react';
import { keyOutline, personCircleOutline, tvOutline } from 'ionicons/icons';
import { useState } from 'react';
import Registration from './Registration';

function Login() {
  const [isOpen, setIsOpen] = useState(false);
  const navigation = useIonRouter();
  const [showToast, setShowToast] = useState(false); // Corrected this
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const doLogin = () => {
    const username = document.getElementById('username') as HTMLInputElement;
    const password = document.getElementById('password') as HTMLInputElement;

    if (username.value === 'admin' && password.value === 'admin') {
      setTimeout(() => {
        
        navigation.push('/it35-lab/app', 'forward', 'replace'); 
      }, 1500); 

    } else {
      setErrorMessage('Invalid username or password. Please try again.');
      setShowModal(true); 
    }
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
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '40vh'
        }}>
          <IonIcon icon={tvOutline} style={{ fontSize: '80px', color: '#3880ff' }} />
          <h2 style={{ marginTop: '10px', color: '#3880ff' }}>Welcome Back!</h2>
        </div>

        <IonItem lines="full">
          <IonIcon icon={personCircleOutline} slot="start" style={{ fontSize: '24px', color: '#3880ff' }} />
          <IonInput id="username" placeholder="Enter Username" clearInput />
        </IonItem>

        <IonItem lines="full">
  <IonIcon icon={keyOutline} slot="start" style={{ fontSize: '24px', color: '#3880ff' }} />
  <IonInput
    id="password"
    type="password"
    placeholder="Enter Password"
    value=""
  >
    <IonInputPasswordToggle slot="end" />
  </IonInput>
</IonItem>


        <IonButton onClick={doLogin} expand="block" shape="round" color="primary" style={{ marginTop: '20px' }}>
          Login
        </IonButton>

        <div style={{ textAlign: 'center', marginTop: '15px' }}>
          <p style={{ color: '#666' }}>
            No account? 🙏 I gotchu bro 🤝 
            <span
              style={{ color: '#3880ff', cursor: 'pointer', textDecoration: 'underline' }}
              onClick={doRegister}
            >
              Register here
            </span>
          </p>
        </div>

        {/* Error Modal */}
        <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
          <IonContent>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '10px'
            }}>
              <IonIcon icon={keyOutline} style={{ fontSize: '90px', color: 'blue' }} />
              <IonText style={{ color: 'white' }}>  {}
                <h3>{errorMessage}</h3>
              </IonText>
              <IonButton
                onClick={() => setShowModal(false)}
                color="light"
                expand="block"
                shape="round"
                style={{ marginTop: '100px' }}
              >
                Close
              </IonButton>
               {/* Toast Message */}
        
              
            </div>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
}

export default Login;
