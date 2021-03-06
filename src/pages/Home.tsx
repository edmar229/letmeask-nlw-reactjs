import { useHistory } from 'react-router-dom';
import { FormEvent, useState } from 'react';

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import logoDarkImg from '../assets/images/logoDarkTheme.svg';
import googleIconImg from '../assets/images/google-icon.svg';

import '../styles/auth.scss';
import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';
import { useTheme } from '../hooks/useTheme';

export function Home() {
  const history = useHistory();
  const { user, signInWithGoogle } = useAuth();
  const [roomCode, setRoomCode] = useState('');
  const { theme } = useTheme();

  async function handleCreateRoom() {
    if(!user) {
      await signInWithGoogle();
    }
    history.push('/rooms/new');
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if(roomCode.trim() === '') {
      return;
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if(!roomRef.exists()) {
      alert('Room does not exists');
      return;
    }

    if(roomRef.val().endedAt) {
      alert('Room already closed!');
      return;
    }

    //Admin and normal user acess to room
    if (roomRef.val().authorId === user?.id) {
      history.push(`/admin/rooms/${roomCode}`);
    } else {
      history.push(`/rooms/${roomCode}`);
    }
  }

  return(
    <div id="page-auth" className={theme}>
      <aside>
        <img src={illustrationImg} alt="Símbolo de perguntas e respostas"/>
        <strong>Crie salas de Q&amp;A ao vivo</strong>
        <p>Tire as dúvidas de sua audiência ao vivo</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={theme === 'dark' ? logoDarkImg : logoImg} alt="Letmeask logotipo"/>
          <button onClick={handleCreateRoom} className="create-room">
            <img src={googleIconImg} alt="logo do Google"/>
            Crie sua sala com o Google
          </button>
          <div className="separator">ou entre em um sala</div>
          <form onSubmit={handleJoinRoom}>
            <input 
              type="text" 
              placeholder="Digite o código da sala"
              onChange={event => setRoomCode(event.target.value)}
              value={roomCode}
            />
            <Button type="submit">
              Entrar na sala
            </Button>
          </form>
        </div>
      </main>
    </div>
  )
}