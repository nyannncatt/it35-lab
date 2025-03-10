import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonText,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonRouter
} from '@ionic/react';

function Regsus() {
  const navigation = useIonRouter();

  // Login Function
  const doLogin = () => {
    navigation.push('/it35-lab/', 'forward', 'replace');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Success</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className='ion-padding'>
        {/* Centered GIF and Text */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          <img 
            src="https://media1.tenor.com/m/VSskfEaZHvkAAAAC/cheers-happy.gif" 
            alt="Success Animation" 
            style={{ maxWidth: '100%', height: 'auto' }} 
          />
          <IonText color="success">
            <h2 style={{
              textAlign: 'center',
              color: 'green',
              padding: '10px',
              borderRadius: '10px',
  
            }}>
              You have been successfully registered!
            </h2>
          </IonText>
        </div>

        <IonButton 
          onClick={doLogin} 
          expand="block" 
          shape="round" 
          color="primary" 
          style={{ marginTop: '120px' }}>
          Login
        </IonButton>

      </IonContent>
    </IonPage>
  );
}

export default Regsus;