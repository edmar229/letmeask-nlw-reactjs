import { useHistory, useParams } from 'react-router-dom'
import { useState, Fragment } from 'react';

import logoImg from '../assets/images/logo.svg';
import deleteImg from '../assets/images/delete.svg';
import checkImg from '../assets/images/check.svg';
import answerImg from '../assets/images/answer.svg';

import { Button } from '../components/Button';
import { Question } from '../components/Question';
import { RoomCode } from '../components/RoomCode';
import { useRoom } from '../hooks/useRoom';
import { database } from '../services/firebase';
import { ModalBox } from '../components/ModalBox';

import '../styles/room.scss';

type RoomParams = {
  id: string;
}

export function AdminRoom() {
  const history = useHistory();
  const params = useParams<RoomParams>();
  const roomId = params.id;

  const [questionIdModalOpen, setQuestionIdModalOpen] = useState<string | undefined>();

  const { title, questions } = useRoom(roomId);

  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    })

    history.push('/');
  }

  async function handleDeleteQuestion(quesionId: string) {
    await database.ref(`rooms/${roomId}/questions/${quesionId}`).remove();
  }

  async function handleCheckQuestionAsAnswered(quesionId: string) {
    await database.ref(`rooms/${roomId}/questions/${quesionId}`).update({
      isAnswered: true,
    });
  }

  async function handleHighlightQuestion(quesionId: string) {
    await database.ref(`rooms/${roomId}/questions/${quesionId}`).update({
      isHighlighted: true,
    });
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
          <div>
            <RoomCode code={roomId} />
            <Button 
              isOutlined
              onClick={handleEndRoom}
            >
              Encerrar sala
            </Button>
          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          { questions.length > 0 && <span>{questions.length} pergunta(s)</span> }
        </div>

        <div className="question-list">
          {questions.map(question => {
            return (
              <Fragment key={question.id}>
                <Question
                  content={question.content}
                  author={question.author}
                  isAnswered={question.isAnswered}
                  isHighlighted={question.isHighlighted}
                >
                  {!question.isHighlighted && (
                    <>
                      <button
                        type="button"
                        onClick={() => handleCheckQuestionAsAnswered(question.id)}
                      >
                        <img src={checkImg} alt="Marcar pergunta como respondida" />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleHighlightQuestion(question.id)}
                      >
                        <img src={answerImg} alt="Dar destaque à pergunta" />
                      </button>
                    </>
                  )}

                  <button
                    type="button"
                    onClick={() => setQuestionIdModalOpen(question.id)}
                  >
                    <img src={deleteImg} alt="Remover pergunta" />
                  </button>
                </Question>
                
                {/* <Modal 
                  isOpen={questionIdModalOpen === question.id}
                  onRequestClose={() => setQuestionIdModalOpen(undefined)}
                  style={customStyles}
                >
                  <button className="exclude" onClick={() => handleDeleteQuestion(question.id)}>Sim, Excluir</button>
                  <button className="cancel-exclude" onClick={() => setQuestionIdModalOpen(undefined)}>Fechar</button>
                </Modal> */}
                <ModalBox
                  modalIsOpen={questionIdModalOpen === question.id}
                  confirmModal={() => handleDeleteQuestion(question.id)}
                  closeModal={() => setQuestionIdModalOpen(undefined)}
                />
              </Fragment>
            );
          })}
        </div>
      </main>
    </div>
  );
}