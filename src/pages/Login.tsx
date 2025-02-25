import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonRouter
} from '@ionic/react';

import { easelOutline, keyOutline, personCircleOutline, tvOutline } from 'ionicons/icons';

function Login() {
  const navigation = useIonRouter();
  const doLogin = () => {
    navigation.push('/it35-lab/app', 'forward', 'replace');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className='ion-padding'>
        <div style={{ textAlign: 'center', marginBottom: '10px' }}>
          <IonIcon icon={tvOutline} style={{ fontSize: '70px' }} />
        </div>
        <IonItem>
        
          <IonIcon icon={personCircleOutline} style={{ fontSize: '30px' }} />
      
          <IonInput label="" placeholder="Enter Username"></IonInput>
        </IonItem>
        <IonItem>
        <IonIcon icon={keyOutline} style={{ fontSize: '30px' }} />
      
          <IonInput label="" type="password" placeholder="Enter Password"></IonInput>
        </IonItem>
        <IonButton onClick={() => doLogin()} expand="full">
          Login
        </IonButton>
      </IonContent>
    </IonPage>
  );
}

export default Login;