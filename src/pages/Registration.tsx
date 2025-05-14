import React, { useState } from 'react';
import {
  IonButton,
  IonContent,
  IonInput,
  //IonInputPasswordToggle,
  IonPage,
  IonTitle,
  IonModal,
  IonText,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonAlert,
  IonIcon,
} from '@ionic/react';

// Set default violet color variable
const violet = '#9b59b6';

// Override Ionic component styles globally (if needed)
const violetStyles = `
  .violet-text, .violet * {
    color: ${violet} !important;
    --color: ${violet} !important;
  }
  .violet-bg, .violet-bg * {
    background: ${violet} !important;
    --background: ${violet} !important;
  }
  .violet-border, .violet-border * {
    border-color: ${violet} !important;
    --border-color: ${violet} !important;
  }
`;
if (typeof document !== 'undefined' && !document.getElementById('violet-style')) {
  const style = document.createElement('style');
  style.id = 'violet-style';
  style.innerHTML = violetStyles;
  document.head.appendChild(style);
}
import { supabase } from '../utils/supabaseClient';
import bcrypt from 'bcryptjs';
import { personAddSharp } from 'ionicons/icons';

// Reusable Alert Component
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

// Glowing input style as a reusable object
const glowingInputStyle = {
  marginTop: '15px',
  borderRadius: '10px',
  color: '#9b59b6',
  border: '1px solid #9b59b6',
  boxShadow: '0 0 10px rgba(138, 43, 226, 0.7)',
  '--highlight-color-focused': '#9b59b6',
  '--border-color': '#9b59b6',
  '--border-color-focused': '#9b59b6',
  '--box-shadow': '0 0 10px rgba(138, 43, 226, 0.7)',
  '--box-shadow-focused': '0 0 10px rgba(138, 43, 226, 0.7)',
} as React.CSSProperties;

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const handleOpenVerificationModal = () => {
    if (!email.endsWith('@nbsc.edu.ph')) {
      setAlertMessage('Only @nbsc.edu.ph emails are allowed to register.');
      setShowAlert(true);
      return;
    }

    if (password !== confirmPassword) {
      setAlertMessage('Passwords do not match.');
      setShowAlert(true);
      return;
    }

    setShowVerificationModal(true);
  };

  const doRegister = async () => {
    setShowVerificationModal(false);

    try {
      const { data, error } = await supabase.auth.signUp({ email, password });

      if (error) {
        throw new Error('Account creation failed: ' + error.message);
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const { error: insertError } = await supabase.from('users').insert([
        {
          username,
          user_email: email,
          user_firstname: firstName,
          user_lastname: lastName,
          user_password: hashedPassword,
        },
      ]);

      if (insertError) {
        throw new Error('Failed to save user data: ' + insertError.message);
      }

      setShowSuccessModal(true);
    } catch (err) {
      if (err instanceof Error) {
        setAlertMessage(err.message);
      } else {
        setAlertMessage('An unknown error occurred.');
      }
      setShowAlert(true);
    }
  };

  return (
    <IonPage>
      <IonContent className="ion-padding" fullscreen>
        {/* Glowing Icon and Header */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '40vh' }}>
          <IonIcon
            icon={personAddSharp}
            style={{
              fontSize: '80px',
              color: '#9b59b6',
              filter: 'drop-shadow(0 0 8px #8a2be2)',
            }}
          />
          <h2 style={{
            marginTop: '10px',
            color: '#9b59b6',
            textShadow: '0 0 6px rgba(138, 43, 226, 0.4)',
          }}>
            Register now!
          </h2>
        </div>

        <h1 style={{ color: '#9b59b6', textAlign: 'center', textShadow: '0 0 20px rgba(138, 43, 226, 0.7)' }}>Create your account</h1>

        {/* Glowing Inputs */}
        <IonInput label="Username" labelPlacement="stacked" fill="outline" type="text" placeholder="Enter a unique username" value={username} onIonChange={e => setUsername(e.detail.value!)} style={glowingInputStyle} />

        <IonInput label="First Name" labelPlacement="stacked" fill="outline" type="text" placeholder="Enter your first name" value={firstName} onIonChange={e => setFirstName(e.detail.value!)} style={glowingInputStyle} />

        <IonInput label="Last Name" labelPlacement="stacked" fill="outline" type="text" placeholder="Enter your last name" value={lastName} onIonChange={e => setLastName(e.detail.value!)} style={glowingInputStyle} />

        <IonInput label="Email" labelPlacement="stacked" fill="outline" type="email" placeholder="youremail@nbsc.edu.ph" value={email} onIonChange={e => setEmail(e.detail.value!)} style={glowingInputStyle} />

        <IonInput label="Password" labelPlacement="stacked" fill="outline" type="password" placeholder="Enter password" value={password} onIonChange={e => setPassword(e.detail.value!)} style={glowingInputStyle}>
          {/* <IonInputPasswordToggle slot="end" /> */}
        </IonInput>

        <IonInput label="Confirm Password" labelPlacement="stacked" fill="outline" type="password" placeholder="Confirm password" value={confirmPassword} onIonChange={e => setConfirmPassword(e.detail.value!)} style={glowingInputStyle}>
          {/* <IonInputPasswordToggle slot="end"/>  */}
        </IonInput>

        <IonButton
          onClick={handleOpenVerificationModal}
          expand="full"
          shape="round"
          style={{
            marginTop: '20px',
            borderRadius: '20px',
            boxShadow: '0 0 20px rgba(138, 43, 226, 0.7)',
            transition: 'all 0.3s ease',
            // Custom background color using CSS variable
            '--background': '#9b59b6',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 0 25px rgba(138, 43, 226, 0.7)')}
          onMouseLeave={(e) => (e.currentTarget.style.boxShadow = '0 0 20px rgba(138, 43, 226, 0.7)')}
        >
          Register
        </IonButton>

        <IonButton
          routerLink="/it35-lab"
          expand="full"
          fill="clear"
          shape="round"
          style={{
            color: '#9b59b6',
            textShadow: '0 0 10px rgba(138, 43, 226, 0.7), 0 0 20px rgba(138, 43, 226, 0.5)',
            fontWeight: 'bold'
          }}
        >
          Already have an account? Sign in
        </IonButton>

        {/* Verification Modal */}
        <IonModal isOpen={showVerificationModal} onDidDismiss={() => setShowVerificationModal(false)}>
          <IonContent className="ion-padding">
            <IonCard className="ion-padding" style={{ marginTop: '25%', boxShadow: '0 0 20px 0 rgba(138,43,226,0.7)', border: '1px solid #9b59b6', borderRadius: '16px' }}>
              <IonCardHeader>
                <IonCardTitle style={{ color: '#9b59b6', textShadow: '0 0 10px rgba(138,43,226,0.7)' }}>User Registration Details</IonCardTitle>
                <hr />
                <IonCardSubtitle style={{ color: '#9b59b6', textShadow: '0 0 6px rgba(138,43,226,0.7)' }}>Username</IonCardSubtitle>
                <IonCardTitle style={{ color: '#fff', textShadow: '0 0 8px rgba(138,43,226,0.7)' }}>{username}</IonCardTitle>

                <IonCardSubtitle style={{ color: '#9b59b6', textShadow: '0 0 6px rgba(138,43,226,0.7)' }}>Email</IonCardSubtitle>
                <IonCardTitle style={{ color: '#fff', textShadow: '0 0 8px rgba(138,43,226,0.7)' }}>{email}</IonCardTitle>

                <IonCardSubtitle style={{ color: '#9b59b6', textShadow: '0 0 6px rgba(138,43,226,0.7)' }}>Name</IonCardSubtitle>
                <IonCardTitle>{firstName} {lastName}</IonCardTitle>
              </IonCardHeader>
              <IonCardContent></IonCardContent>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginRight: '5px' }}>
                <IonButton fill="clear" onClick={() => setShowVerificationModal(false)}>Cancel</IonButton>
                <IonButton color="primary" onClick={doRegister}>Confirm</IonButton>
              </div>
            </IonCard>
          </IonContent>
        </IonModal>

        {/* Success Modal */}
        <IonModal isOpen={showSuccessModal} onDidDismiss={() => setShowSuccessModal(false)}>
          <IonContent className="ion-padding" style={{
            display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
            height: '100vh', textAlign: 'center', marginTop: '35%'
          }}>
            <IonTitle style={{ marginTop: '35%' }}>Registration Successful 🎉</IonTitle>
            <IonText>
              <p>Your account has been created successfully.</p>
              <p>Please check your email address.</p>
            </IonText>
            <IonButton routerLink="/it35-lab" routerDirection="back" color="primary">
              Go to Login
            </IonButton>
          </IonContent>
        </IonModal>

        {/* Alert Box */}
        <AlertBox message={alertMessage} isOpen={showAlert} onClose={() => setShowAlert(false)} />
      </IonContent>
    </IonPage>
  );
};

export default Register;
