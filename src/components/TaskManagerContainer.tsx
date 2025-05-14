import { useEffect, useState } from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonInput, IonButton, IonList, IonItem, IonLabel, IonSelect, IonSelectOption,
  IonCheckbox, IonText, IonAlert, IonCard, IonCardContent, IonCardHeader, IonCardTitle,
  IonGrid, IonRow, IonCol, IonIcon
} from '@ionic/react';
import { trashOutline } from 'ionicons/icons';
import { supabase } from '../utils/supabaseClient';
import { User } from '@supabase/supabase-js';

// Shared violet-black styles for glowing effect
const glowStyle = {
  boxShadow: '0 0 12px violet',
  backgroundColor: '#111',
  color: 'white',
  border: '1px solid violet',
  borderRadius: '10px',
  padding: '15px',
};

interface Task {
  task_id: string;
  user_id: number;
  title: string;
  description: string;
  category: string;
  priority: 'Low' | 'Medium' | 'High';
  is_complete: boolean;
  due_date: string;
  created_at: string;
}

const TaskManagerContainer = () => {
  const [user, setUser] = useState<User | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [priority, setPriority] = useState<'Low' | 'Medium' | 'High'>('Medium');
  const [dueDate, setDueDate] = useState('');
  const [alertOpen, setAlertOpen] = useState(false);
  const [filterCategory, setFilterCategory] = useState('');
  const [filterCompleted, setFilterCompleted] = useState<'all' | 'complete' | 'incomplete'>('all');

  useEffect(() => {
    const fetchUser = async () => {
      const { data: authData } = await supabase.auth.getUser();
      const email = authData?.user?.email;

      if (email?.endsWith('@nbsc.edu.ph')) {
        setUser(authData.user);
        const { data: userData } = await supabase
          .from('users')
          .select('user_id')
          .eq('user_email', email)
          .single();

        if (userData) {
          setUserId(userData.user_id);
          fetchTasks(userData.user_id);
        }
      }
    };

    const fetchTasks = async (uid: number) => {
      const { data } = await supabase
        .from('tasks')
        .select('*')
        .eq('user_id', uid)
        .order('due_date', { ascending: true });
      setTasks(data || []);
    };

    fetchUser();
  }, []);

  const addTask = async () => {
    if (!title || !userId) return;

    const { data, error } = await supabase
      .from('tasks')
      .insert([{
        title,
        description,
        user_id: userId,
        category,
        priority,
        due_date: dueDate,
      }])
      .select('*');

    if (!error && data) {
      setTasks([data[0] as Task, ...tasks]);
      setTitle('');
      setDescription('');
      setCategory('');
      setPriority('Medium');
      setDueDate('');
    } else {
      setAlertOpen(true);
    }
  };

  const toggleTask = async (task: Task) => {
    const { data } = await supabase
      .from('tasks')
      .update({ is_complete: !task.is_complete })
      .eq('task_id', task.task_id)
      .select('*');

    if (data) {
      setTasks(tasks.map(t => (t.task_id === task.task_id ? data[0] : t)));
    }
  };

  const deleteTask = async (taskId: string) => {
    await supabase.from('tasks').delete().eq('task_id', taskId);
    setTasks(tasks.filter(t => t.task_id !== taskId));
  };

  const filteredTasks = tasks.filter(task => {
    const matchCategory = filterCategory ? task.category === filterCategory : true;
    const matchStatus =
      filterCompleted === 'complete' ? task.is_complete :
      filterCompleted === 'incomplete' ? !task.is_complete : true;
    return matchCategory && matchStatus;
  });

  const completionRate = tasks.length
    ? Math.round((tasks.filter(t => t.is_complete).length / tasks.length) * 100)
    : 0;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar style={{ backgroundColor: '#111' }}>
        <IonTitle style={{ color: 'violet', fontSize: '14' }}>🗂️ Task Manager</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding" style={{ backgroundColor: '#121212' }}>
        {user ? (
          <>
            {/* Create Task */}
            <IonCard style={{ marginTop: '20px', ...glowStyle }}>
              <IonCardHeader>
                <IonCardTitle style={{ color: 'violet' }}>Create New Task</IonCardTitle>
              </IonCardHeader>
            <IonCardContent>
                <IonGrid>
                    <IonRow>
                        <IonCol size="12">
                            <IonInput
                                label="Title"
                                labelPlacement="floating"
                                fill="outline"
                                value={title}
                                onIonChange={e => setTitle(e.detail.value!)}
                                style={{ color: '#9b59b6', marginBottom: '16px' }}
                            />
                        </IonCol>
                        <IonCol size="12">
                            <IonInput
                                label="Description"
                                labelPlacement="floating"
                                fill="outline"
                                value={description}
                                onIonChange={e => setDescription(e.detail.value!)}
                                style={{ color: '#9b59b6', marginBottom: '16px' }}
                            />
                        </IonCol>
                        <IonCol size="6">
                            <IonSelect
                                label="Category"
                                labelPlacement="floating"
                                fill="outline"
                                value={category}
                                onIonChange={e => setCategory(e.detail.value!)}
                                style={{ color: '#9b59b6', marginBottom: '16px' }}
                            >
                                <IonSelectOption value="Work">Work</IonSelectOption>
                                <IonSelectOption value="Personal">Personal</IonSelectOption>
                                <IonSelectOption value="School">School</IonSelectOption>
                            </IonSelect>
                        </IonCol>
                        <IonCol size="6">
                            <IonSelect
                                label="Priority"
                                labelPlacement="floating"
                                fill="outline"
                                value={priority}
                                onIonChange={e => setPriority(e.detail.value!)}
                                style={{ color: '#9b59b6', marginBottom: '16px' }}
                            >
                                <IonSelectOption value="Low">Low</IonSelectOption>
                                <IonSelectOption value="Medium">Medium</IonSelectOption>
                                <IonSelectOption value="High">High</IonSelectOption>
                            </IonSelect>
                        </IonCol>
                        <IonCol size="12">
                            <IonInput
                                label="Due Date"
                                labelPlacement="floating"
                                fill="outline"
                                placeholder="YYYY-MM-DD"
                                value={dueDate}
                                onIonChange={e => setDueDate(e.detail.value!)}
                                style={{ color: '#9b59b6', marginBottom: '16px' }}
                                type="date"
                            />
                        </IonCol>
                        <IonCol size="12">
                            <IonButton
                                expand="block"
                                className="ion-margin-top"
                                onClick={addTask}
                                style={{ '--background': '#9b59b6', '--color': '#fff' }}
                            >
                                Add Task
                            </IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
                <style>
                    {`
                        ion-input, ion-select, ion-select-option {
                            --color: #9b59b6 !important;
                            --highlight-color-focused: #9b59b6 !important;
                            --highlight-color: #9b59b6 !important;
                            --border-color: #9b59b6 !important;
                            --background: transparent !important;
                        }
                        ion-input .input-bottom {
                            border-bottom: 2px solid #9b59b6 !important;
                        }
                    `}
                </style>
            </IonCardContent>
            </IonCard>

            {/* Filters */}
            <IonCard style={{ marginTop: '20px', ...glowStyle }}>
              <IonCardHeader>
                <IonCardTitle style={{ color: 'violet' }}>🔍 Filters</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <IonGrid>
                  <IonRow>
                    <IonCol>
                      <IonSelect label="Category" value={filterCategory} onIonChange={e => setFilterCategory(e.detail.value!)} style={{ color: '#9b59b6' }}>
                        <IonSelectOption value="">All</IonSelectOption>
                        <IonSelectOption value="Work">Work</IonSelectOption>
                        <IonSelectOption value="Personal">Personal</IonSelectOption>
                        <IonSelectOption value="School">School</IonSelectOption>
                      </IonSelect>
                    </IonCol>
                    <IonCol>
                      <IonSelect label="Status" value={filterCompleted} onIonChange={e => setFilterCompleted(e.detail.value!)} style={{ color: '#9b59b6' }}>
                        <IonSelectOption value="all">All</IonSelectOption>
                        <IonSelectOption value="complete">Completed</IonSelectOption>
                        <IonSelectOption value="incomplete">Incomplete</IonSelectOption>
                      </IonSelect>
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </IonCardContent>
            </IonCard>

            {/* Progress */}
            <IonCard style={{ marginTop: '20px', ...glowStyle }}>
              <IonCardHeader>
                <IonCardTitle style={{ color: 'violet' }}>📈 Progress</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <IonText color="success"><h2>{completionRate}% Completed</h2></IonText>
              </IonCardContent>
            </IonCard>

            {/* Task List */}
            <IonCard style={{ marginTop: '20px', ...glowStyle }}>
              <IonCardHeader>
                <IonCardTitle style={{ color: 'violet' }}>📝 Your Tasks</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <IonList>
                  {filteredTasks.map(task => (
                    <IonItem key={task.task_id} className="ion-padding-vertical">
                      <IonCheckbox slot="start" checked={task.is_complete} onIonChange={() => toggleTask(task)} />
                      <IonLabel className={task.is_complete ? 'ion-text-decoration-line-through' : ''}>
                        <h2>{task.title} <small>({task.priority})</small></h2>
                        <p>{task.description}</p>
                        <IonText color="medium">
                          <small>Due: {task.due_date || 'None'} | {task.category}</small>
                        </IonText>
                      </IonLabel>
                      <IonButton slot="end" color="danger" onClick={() => deleteTask(task.task_id)}>
                        <IonIcon icon={trashOutline} />
                      </IonButton>
                    </IonItem>
                  ))}
                </IonList>
              </IonCardContent>
            </IonCard>
          </>
        ) : (
          <IonText color="danger">
            <p>You must be logged in to manage tasks.</p>
          </IonText>
        )}
      </IonContent>

      <IonAlert
        isOpen={alertOpen}
        onDidDismiss={() => setAlertOpen(false)}
        header="Error"
        message="An error occurred while saving your task."
        buttons={['OK']}
      />
    </IonPage>
  );
};

export default TaskManagerContainer;
