import { Dashboard } from './components/Dashboard';
import { Header } from './components/Header';
import { TransactionsTable } from './components/TransactionsTable';
import { GlobalStyle } from './styles/global';
import Modal from 'react-modal';
import { useState } from 'react';
import { NewTransactionModal } from './components/NewTransactionModal';
import {  TransactionsProvider } from './hooks/useTransactions';

Modal.setAppElement('#root');

export function App() {
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);

  function openModal() {
      setIsNewTransactionModalOpen(true);
  }

  function closeModal()
  {
      setIsNewTransactionModalOpen(false);
  }
  return (
    <TransactionsProvider>
      <GlobalStyle />
     <Header onOpenNewTransactionModal={openModal}/>
     <Dashboard/>
     <TransactionsTable/>
     <NewTransactionModal isOpen={isNewTransactionModalOpen} onRequestClose={closeModal}/>
    </TransactionsProvider>
  );
}

