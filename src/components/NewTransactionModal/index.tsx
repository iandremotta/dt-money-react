import Modal from 'react-modal';
import closeImg from '../../assets/close.svg';
import { Container, RadioBox, TransactionTypeContainer } from './styles';
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import { FormEvent, useState, useContext } from 'react';
import { api } from '../../services/api';
import {  useTransactions } from '../../hooks/useTransactions';
interface NewTRansactionModalProps{
    isOpen:boolean;
    onRequestClose: ()=>void;
}
export function NewTransactionModal({isOpen, onRequestClose}:NewTRansactionModalProps){
    const {createTransaction} = useTransactions();
    const [type, setType] = useState('deposit');
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState(0);
    const [category, setCategory] = useState('');

    async function handleCreateNewTransaction(event : FormEvent){
        event.preventDefault();
        await createTransaction({
            title,
            amount,
            category,
            type,
        });
        setTitle('');
        setAmount(0);
        setCategory('');
        setType('deposit');
        onRequestClose();
    }
    return (
    <Modal
         isOpen={isOpen} 
        onRequestClose={onRequestClose} 
        overlayClassName="react-modal-overlay"
        className="react-modal-content"
    >
        <button type="button" onClick={onRequestClose} className="react-modal-close">
            <img src={closeImg} alt="Fechar modal" />
        </button>
        <Container onSubmit={handleCreateNewTransaction}>
            <h2>Cadastrar transação</h2>
            <input placeholder='Título' type="text" value={title} onChange={(event)=>setTitle(event.target.value)}/>
            <input placeholder='Valor' type="number" value={amount} onChange={(event)=>setAmount(Number(event.target.value))} />
            <TransactionTypeContainer>
                <RadioBox
                 type="button"
                 isActive={type==='deposit'}
                 activeColor="green"
                  onClick={()=>setType('deposit')}>
                    <img src={incomeImg} />
                    <span>
                        Entrada
                    </span>
                </RadioBox>
                <RadioBox
                    isActive={type==='withdraw'}
                    activeColor="red"
                     type="button" 
                     onClick={()=>setType('withdraw')} >
                    <img src={outcomeImg} />
                    <span>
                        Saída
                    </span>
                </RadioBox>
            </TransactionTypeContainer>
            <input placeholder='Categoria' type="text" value={category} onChange={(event)=>setCategory(event.target.value)}/>
            <button type="submit">Cadastrar</button>
        </Container>
    </Modal>
    );
}