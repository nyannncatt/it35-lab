import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonText,
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
                      <IonMenuButton></IonMenuButton>
                  </IonButtons>
                  <IonTitle>Success</IonTitle>
              </IonToolbar>
          </IonHeader>
          <IonContent fullscreen className='ion-padding'>
          <IonText color="success">
                    <h2>You have been successfully registered!</h2>
                </IonText>
          <IonButton onClick={doLogin} expand="block" shape="round" color="primary" style={{ marginTop: '20px' }}>
          Login
        </IonButton>

          </IonContent>
      </IonPage>
  );
};

export default Regsus;
