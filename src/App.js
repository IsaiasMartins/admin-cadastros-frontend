import { useState } from 'react';
import Modal from 'react-modal';
import { GlobalStyle } from "./styles/global";
import { Header } from './components/Header';
import { NewUserModal } from './components/NewUserModal';
import { PersonList } from './components/PersonList';

Modal.setAppElement('#root');

export function App() {
  const [isNewUserModalOpen, setIsNewUserModalOpen] = useState(false);

  function handleOpenNewUserModal(){
    setIsNewUserModalOpen(true);
  };

  function handleCloseNewUserModal(){
    setIsNewUserModalOpen(false);
  };

  return (
    <>
      <Header onOpenNewUserModal={handleOpenNewUserModal} />
      <PersonList isOpen={isNewUserModalOpen} />

      <NewUserModal 
      isOpen={isNewUserModalOpen}
      onRequestClose={handleCloseNewUserModal}
      />

      <GlobalStyle />
    </>
  );
}
