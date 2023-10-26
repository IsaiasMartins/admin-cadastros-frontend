import { useState } from 'react';
import Modal from 'react-modal';
import closeImg from '../../assets/close.svg';
import { Container } from './styles';
import {api} from '../../services/api';

export function NewUserModal( {isOpen, onRequestClose }){

    const [nome, setNome] = useState('');
    const [rg, setRg] = useState('');
    const [cpf, setCpf] = useState('');
    const [dtNasc, setDtNasc] = useState('');
    const [dtAdmis, setDtAdmis] = useState('');
    const [funcao, setFuncao] = useState('');


    async function handleCreateNewUser(){

        const data = {
            nome: nome,
            rg: rg,
            cpf: cpf,
            data_nascimento: dtNasc,
            data_admissao: dtAdmis,
            funcao: funcao
        }

        await api.post('user', data)

        setNome('');
        setRg('')
        setCpf('');
        setDtNasc('');
        setDtAdmis('');
        setFuncao('');
        onRequestClose();
    }

    function handleCancel(){
        setNome('');
        setRg('')
        setCpf('');
        setDtNasc('');
        setDtAdmis('');
        setFuncao('');
        onRequestClose();
    }

    return(
    <Modal 
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        overlayClassName="react-modal-overlay"
        className="react-modal-content"
    >
        <button 
        type="button"
        onClick={onRequestClose}
        className="react-modal-close">
            <img src={closeImg} alt="Fechar Modal" />
        </button>
        <Container>
            <h2>Cadastrar</h2>

            <input 
                placeholder="Nome"
                value={nome}
                onChange={event => setNome(event.target.value)}
            />

            <input
                placeholder="RG"
                value={rg}
                onChange={event => setRg(event.target.value)}        
            />

            <input 
                placeholder="CPF"
                value={cpf}
                onChange={event => setCpf(event.target.value)}
            />

            <input 
                placeholder="Função"
                value={funcao}
                onChange={event => setFuncao(event.target.value)}
            />

            <div className="date-div">
                <div className="data-label">
                    <label>Data de Nascimento</label>
                    <input 
                        type="date"
                        value={dtNasc}
                        onChange={event => setDtNasc(event.target.value)}
                    />
                </div>
                <div className="data-label">
                    <label>Data de Admissão</label>
                    <input 
                        type="date"
                        value={dtAdmis}
                        onChange={event => setDtAdmis(event.target.value)}
                    />
                </div>
            </div>

            <div className="button-div">
                <div className="button-div-model" onClick={() => handleCancel()} style={{background: '#e52e4d'}}>
                    Cancelar
                </div>
                <div className="button-div-model" onClick={() => handleCreateNewUser()}>
                    Cadastrar
                </div>
            </div>
        </Container>
    </Modal>
    );
}