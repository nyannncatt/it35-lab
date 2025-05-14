import { 
    IonButton,
      IonButtons,
        IonContent, 
        IonHeader, 
        IonMenuButton, 
        IonIcon, 
        IonLabel, 

        IonPage, 
      IonRouterOutlet, 
      IonTabBar, 
      IonTabButton, 
      IonTabs, 
        IonTitle, 
        IonToolbar 
    } from '@ionic/react';
    import { IonReactRouter } from '@ionic/react-router';
    import { bookOutline, personOutline, search, star, sunnyOutline } from 'ionicons/icons';
    import { Route, Redirect } from 'react-router';
    import Favorites from './home-tabs/Favorites';
    import Feed from './home-tabs/Feed';
    import Weather from './home-tabs/Weather'; 
  
import SchoolComSphere from './home-tabs/SchoolComSphere';
    
    const Home: React.FC = () => {
      const tabs = [
        {name:'Feed', tab:'feed',url: '/it35-lab/app/home/feed', icon: bookOutline},
        {name:'Weather', tab:'weather', url: '/it35-lab/app/home/Weather', icon: sunnyOutline},
        {name:'Favorites',tab:'favorites', url: '/it35-lab/app/home/favorites', icon: star},
        //{name:'SchoolComSphere',tab:'schoolcomsphere', url: '/it35-lab/app/home/schoolcomsphere', icon: personOutline},
      ]
      return (
        
        <IonReactRouter>
        <IonTabs>
          <IonTabBar slot="bottom">
            {tabs.map((item, index) => (
              <IonTabButton key={index} tab={item.tab} href={item.url}>
                <IonIcon icon={item.icon} />
                <IonLabel>{item.name}</IonLabel>
              </IonTabButton>
            ))}
            
          </IonTabBar>
        <IonRouterOutlet>
          <Route exact path="/it35-lab/app/home/feed" render={Feed} />
          <Route exact path="/it35-lab/app/home/weather" render={Weather} />
          <Route exact path="/it35-lab/app/home/favorites" render={Favorites} />
          <Route exact path="/it35-lab/app/home/schoolcomsphere" render={SchoolComSphere} />
          <Route exact path="/it35-lab/app/home">
            <Redirect to="/it35-lab/app/home/feed" />
          </Route>
        </IonRouterOutlet>
        </IonTabs>
      </IonReactRouter>
      );
    };
    
    export default Home;