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
  IonInputPasswordToggle,
  IonToast
} from '@ionic/react';
import { keyOutline, personCircleOutline, tvOutline } from 'ionicons/icons';
import { useState } from 'react';
import Registration from './Registration';

const Login: React.FC = () => {
  const navigation = useIonRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false);  
  const [errorMessage, setErrorMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  const user_email = 'admin';
  const user_pwd = 'admin';

  const doLogin = () => {
    if (email !== user_email || password !== user_pwd) {
      setErrorMessage('Invalid username or password. Please try again.');
      setShowModal(true); 
      return;
    } else {
      console.log(email);
      console.log(password);
      setShowToast(true);
      setTimeout(() => {
        navigation.push('/it35-lab/app', 'forward', 'replace');
      }, 1500);
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
          <IonIcon icon={personCircleOutline} slot="start" style={{ fontSize: '24px', color: '#3880ff' }} />
          <IonInput
            id="email"
            placeholder="Enter Email"
            clearInput
            value={email}
            onIonChange={(e) => setEmail(e.detail.value!)}
          />
        </IonItem>

        <IonItem lines="full">
          <IonIcon icon={keyOutline} slot="start" style={{ fontSize: '24px', color: '#3880ff' }} />
          <IonInput
            id="password"
            type="password"
            placeholder="Enter Password"
            value={password}
            onIonChange={(e) => setPassword(e.detail.value!)}
          />
          <IonInputPasswordToggle slot="end" />
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
            No account? 🙏 I gotchu bro 🤝
            <span
              style={{ color: '#3880ff', cursor: 'pointer', textDecoration: 'underline' }}
              onClick={doRegister}
            >
              Register here
            </span>
          </p>
        </div>

       <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
  <IonContent>
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth: '300px',   
        margin: '20% auto',  
        padding: '20px',     
        borderRadius: '12px', 
        backgroundColor: '#3880ff', 
        color: 'white',             
      
      }}
    >
      <IonIcon icon={keyOutline} style={{ fontSize: '50px', color: 'white', marginBottom: '10px' }} />
      <IonText style={{ color: '#white', textAlign: 'center', marginBottom: '10px' }}>
        <h3>{errorMessage}</h3>
      </IonText>
      <IonButton
        onClick={() => setShowModal(false)}
        color="light"
        expand="block"
        shape="round"
      >
        OK
      </IonButton>
    </div>
  </IonContent>
</IonModal>


        {/* Toast Message */}
        <IonToast
        
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message="Login successful! Redirecting..."
          duration={1500}
          position="bottom"
          color="primary"
          
        />
      </IonContent>
    </IonPage>
  );
};

export default Login;
