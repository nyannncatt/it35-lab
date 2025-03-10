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
  IonPage,
  IonTitle,
  IonToolbar,
  useIonRouter
} from '@ionic/react';
import { keyOutline, personCircleOutline, tvOutline } from 'ionicons/icons';

function Login() {
  const navigation = useIonRouter();

  const doLogin = () => {
    navigation.push('/it35-lab/app', 'forward', 'replace');
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
          <IonInput label="" placeholder="Enter Username" clearInput></IonInput>
        </IonItem>

        <IonItem lines="full">
          <IonIcon icon={keyOutline} slot="start" style={{ fontSize: '24px', color: '#3880ff' }} />
          <IonInput label="" type="password" placeholder="Enter Password" clearOnEdit></IonInput>
        </IonItem>

        <IonButton onClick={doLogin} expand="block" shape="round" color="primary" style={{ marginTop: '20px' }}>
          Login
        </IonButton>

        <div style={{ textAlign: 'center', marginTop: '15px' }}>
          <p style={{ color: '#666' }}>No account? Igotchu bro <a href="#" style={{ color: '#3880ff' }}>Register here</a></p>
        </div>
      </IonContent>
    </IonPage>
  );
}

export default Login;
