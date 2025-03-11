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
  useIonRouter,
  IonAlert
} from '@ionic/react';
import { keyOutline, personCircleOutline, mailOutline, personAddSharp } from 'ionicons/icons';
import { useState } from 'react';

function Registration() {
  const navigation = useIonRouter();
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const doRegister = () => {
    const email = document.getElementById("email") as HTMLInputElement;
    const username = document.getElementById("username") as HTMLInputElement;
    const password = document.getElementById("password") as HTMLInputElement;
    const confirmPassword = document.getElementById("confirmPassword") as HTMLInputElement;

    // Check if passwords match
    if (password.value !== confirmPassword.value) {
      setAlertMessage("Passwords do not match. Please try again.");
      setShowAlert(true); // Show alert if passwords don't match
      return;
    }

    // If passwords match, proceed with registration
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
          <IonIcon icon={personAddSharp} style={{ fontSize: '80px', color: '#3880ff' }} />
          <h2 style={{ marginTop: '10px', color: '#3880ff' }}>Register now!</h2>
        </div>

        <IonItem lines="full">
          <IonIcon icon={mailOutline} slot="start" style={{ fontSize: '24px', color: '#3880ff' }} />
          <IonInput id="email" label="" placeholder="Create Email Address" clearInput />
        </IonItem>

        <IonItem lines="full">
          <IonIcon icon={personCircleOutline} slot="start" style={{ fontSize: '24px', color: '#3880ff' }} />
          <IonInput id="username" label="" placeholder="Create Username" clearInput />
        </IonItem>

        <IonItem lines="full">
          <IonIcon icon={keyOutline} slot="start" style={{ fontSize: '24px', color: '#3880ff' }} />
          <IonInput id="password" label="" type="password" placeholder="Create Password" clearInput />
        </IonItem>

        <IonItem lines="full">
          <IonIcon icon={keyOutline} slot="start" style={{ fontSize: '24px', color: '#3880ff' }} />
          <IonInput id="confirmPassword" label="" type="password" placeholder="Confirm Password" clearInput />
        </IonItem>

        <IonButton onClick={doRegister} expand="block" shape="round" color="primary" style={{ marginTop: '20px' }}>
          Register
        </IonButton>

        {/* Alert for password mismatch */}
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header={'Password Error'}
          message={alertMessage}
          buttons={['OK']}
        />
      </IonContent>
    </IonPage>
  );
}

export default Registration;
