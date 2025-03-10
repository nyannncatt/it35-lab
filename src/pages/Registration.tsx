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

function Registration() {
    const navigation = useIonRouter();
  
    const doRegister = () => {
      navigation.push('/it35-lab/Regsus', 'forward', 'replace');
};

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot='start'>
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Registration</IonTitle>
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
          <h2 style={{ marginTop: '10px', color: '#3880ff' }}>Register now!</h2>
        </div>

        <IonItem lines="full">
          <IonIcon icon={personCircleOutline} slot="start" style={{ fontSize: '24px', color: '#3880ff' }} />
          <IonInput label="" placeholder="Enter Username" clearInput></IonInput>
        </IonItem>

        <IonItem lines="full">
          <IonIcon icon={keyOutline} slot="start" style={{ fontSize: '24px', color: '#3880ff' }} />
          <IonInput label="" type="password" placeholder="Enter Password" clearOnEdit></IonInput>
        </IonItem>

        <IonItem lines="full">
          <IonIcon icon={keyOutline} slot="start" style={{ fontSize: '24px', color: '#3880ff' }} />
          <IonInput label="" type="password" placeholder="Enter Email Address" clearOnEdit></IonInput>
        </IonItem>

        <IonButton onClick={doRegister} expand="block" shape="round" color="primary" style={{ marginTop: '20px' }}>
          Register
        </IonButton>
      </IonContent>
    </IonPage>
  );
}

export default Registration;
