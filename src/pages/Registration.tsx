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
  IonAlert,
  IonModal,
  IonText
} from '@ionic/react';
import { keyOutline, personCircleOutline, mailOutline, personAddSharp } from 'ionicons/icons';
import { useState } from 'react';

function Registration() {
  const navigation = useIonRouter();
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false); 
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [registrationDetails, setRegistrationDetails] = useState({
    email: '',
    username: '',
    password: '',
  });

  const doRegister = () => {
    const email = (document.getElementById("email") as HTMLInputElement)?.value.trim();
    const username = (document.getElementById("username") as HTMLInputElement)?.value.trim();
    const password = (document.getElementById("password") as HTMLInputElement)?.value.trim();
    const confirmPassword = (document.getElementById("confirmPassword") as HTMLInputElement)?.value.trim();

    if (!email || !username || !password || !confirmPassword) {
      setAlertMessage("Please fill in all fields before proceeding.");
      setShowAlert(true);
      return;
    }

    if (password !== confirmPassword) {
      setAlertMessage("Passwords do not match. Please try again.");
      setShowAlert(true);
      return;
    }


    setRegistrationDetails({ email, username, password });
    setShowConfirmModal(true); 
  };

  const confirmRegistration = () => {
    setShowConfirmModal(false); 
    setShowSuccessModal(true); 
    setTimeout(() => {
      navigation.push('/it35-lab/', 'forward', 'replace');
    }, 2000);
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

        <IonButton 
          onClick={doRegister} 
          expand="block" 
          shape="round" 
          color="primary" 
          style={{ marginTop: '20px' }}
        >
          Register
        </IonButton>

        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header={'Registration Error'}
          message={alertMessage}
          buttons={['OK']}
        />

       
        <IonModal isOpen={showConfirmModal} onDidDismiss={() => setShowConfirmModal(false)}>
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
              <IonText style={{ textAlign: 'center', marginBottom: '10px' }}>
                <h3>Confirm Your Details</h3>
                <p><strong>Email:</strong> {registrationDetails.email}</p>
                <p><strong>Username:</strong> {registrationDetails.username}</p>
              </IonText>
              <IonButton
                onClick={confirmRegistration}
                color="light"
                expand="block"
                shape="round"
                style={{ marginTop: '10px' }}
              >
                Confirm
              </IonButton>
              <IonButton
                onClick={() => setShowConfirmModal(false)}
                color="danger"
                expand="block"
                shape="round"
              >
                Cancel
              </IonButton>
            </div>
          </IonContent>
        </IonModal>

 
        <IonModal isOpen={showSuccessModal} onDidDismiss={() => setShowSuccessModal(false)}>
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
              <IonIcon icon={personAddSharp} style={{ fontSize: '50px', color: 'white', marginBottom: '10px' }} />
              <IonText style={{ textAlign: 'center', marginBottom: '10px' }}>
                <h3>Registration Successful!</h3>
                <p>Redirecting...</p>
              </IonText>
            </div>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
}

export default Registration;
