import { 
  IonButtons, 
  IonContent, 
  IonHeader, 
  IonMenuButton, 
  IonPage, 
  IonTitle, 
  IonToolbar, 
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,

} from '@ionic/react';

const Feed: React.FC = () => {
  
    const articles: [string, {
      title: string;
      writer: string;
      genre: string;
      summary: string;
      publishedOn: string;
      content: string;
       }][] = [ 
    ['A101', {
      title: 'The Art of Minimalist Living',
      writer: 'Emma Watson',
      genre: 'Lifestyle',
      summary: 'Discover how minimalism can bring clarity and peace to your life.',
      publishedOn: 'Tue, 25 Feb 2025 00:00:00 GMT',
      content: 'Minimalism is more than decluttering—it’s about intentional living, focusing on what truly matters, and eliminating excess.'
    }],
    ['A102', {
      title: 'The Science Behind Deep Space Exploration',
      writer: 'Liam Johnson',
      genre: 'Science',
      summary: 'Unraveling the mysteries of the universe with cutting-edge technology.',
      publishedOn: 'Mon, 24 Feb 2025 00:00:00 GMT',
      content: 'New space telescopes and propulsion systems are enabling deeper exploration beyond our solar system.'
    }],
    ['A103', {
      title: 'The Psychology of High-Performing Teams',
      writer: 'Sophia Carter',
      genre: 'Business',
      summary: 'Understanding what makes a team truly effective in the workplace.',
      publishedOn: 'Sun, 23 Feb 2025 00:00:00 GMT',
      content: 'High-performing teams thrive on trust, accountability, and a shared vision, leading to increased productivity and innovation.'
    }],
    ['A104', {
      title: 'How to Master Personal Finance in Your 30s',
      writer: 'Noah Williams',
      genre: 'Finance',
      summary: 'A practical guide to budgeting, saving, and investing for a secure future.',
      publishedOn: 'Sat, 22 Feb 2025 00:00:00 GMT',
      content: 'Understanding compound interest, smart budgeting, and long-term investment strategies can help build financial independence.'
    }],
    ['A105', {
      title: 'The Rise of Indie Game Developers',
      writer: 'Ava Martinez',
      genre: 'Gaming',
      summary: 'How independent developers are reshaping the gaming industry.',
      publishedOn: 'Fri, 21 Feb 2025 00:00:00 GMT',
      content: 'With accessible tools like Unity and Unreal Engine, indie developers are creating groundbreaking games without major studio backing.'
    }],
    ['A106', {
      title: 'The Future of Plant-Based Nutrition',
      writer: 'Oliver Brown',
      genre: 'Health',
      summary: 'Why plant-based diets are gaining popularity and their impact on health.',
      publishedOn: 'Thu, 20 Feb 2025 00:00:00 GMT',
      content: 'Scientific research supports plant-based diets for reducing chronic diseases and promoting overall well-being.'
    }],
    ['A107', {
      title: 'The Influence of Music on Productivity',
      writer: 'Charlotte Adams',
      genre: 'Music',
      summary: 'Exploring how different types of music affect focus and creativity.',
      publishedOn: 'Wed, 19 Feb 2025 00:00:00 GMT',
      content: 'Studies show that classical and lo-fi beats can enhance concentration, while upbeat music boosts motivation.'
    }],
    ['A108', {
      title: 'The Ethical Dilemma of AI in Hiring',
      writer: 'James Roberts',
      genre: 'Technology',
      summary: 'How AI is changing recruitment and the risks of bias in algorithms.',
      publishedOn: 'Tue, 18 Feb 2025 00:00:00 GMT',
      content: 'While AI streamlines hiring, concerns over algorithmic bias and lack of human judgment remain significant challenges.'
    }],
    ['A109', {
      title: 'The Evolution of Street Fashion',
      writer: 'Mia Clark',
      genre: 'Fashion',
      summary: 'Tracing the history and cultural influence of streetwear trends.',
      publishedOn: 'Mon, 17 Feb 2025 00:00:00 GMT',
      content: 'From skate culture to high fashion, streetwear has evolved into a global phenomenon influencing mainstream brands.'
    }],
    ['A110', {
      title: 'The Mental Benefits of Daily Journaling',
      writer: 'William Scott',
      genre: 'Self-Improvement',
      summary: 'How keeping a journal can improve mindfulness and emotional health.',
      publishedOn: 'Sun, 16 Feb 2025 00:00:00 GMT',
      content: 'Journaling helps process emotions, set goals, and track personal growth, making it a powerful tool for self-reflection.'
    }]
  ]; 

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Feed</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {articles.map(([id, data]) => (
          <IonCard key={id}>
            <IonCardHeader>
              <IonCardSubtitle>{data.writer}, {new Date(data.publishedOn).toDateString()}</IonCardSubtitle>
              <IonCardTitle>{data.title}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>{data.summary}</IonCardContent>
          </IonCard>
        ))}
      </IonContent>
    </IonPage>
  );
};

export default Feed;
