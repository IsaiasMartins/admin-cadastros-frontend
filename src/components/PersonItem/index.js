import { useState } from 'react';
import Modal from 'react-modal';
import closeImg from '../../assets/close.svg';
import { Container } from './styles';
import {api} from '../../services/api';

export function PersonItem( {isOpen, onRequestClose, index, updateState, idUser, nomeUser, rgUser, cpfUser, dtNascUser, dtAdmisUser, funcaoUser, action }){

    const [id, setId] = useState(idUser);
    const [nome, setNome] = useState(nomeUser);
    const [rg, setRg] = useState(rgUser);
    const [cpf, setCpf] = useState(cpfUser);
    const [dtNasc, setDtNasc] = useState(dtNascUser);
    const [dtAdmis, setDtAdmis] = useState(dtAdmisUser);
    const [funcao, setFuncao] = useState(funcaoUser === 'None' ? '' : funcaoUser);

    async function handleUpdateNewUser(){

        const data = {
            id: id,
            nome: nome,
            rg: rg,
            cpf: cpf,
            data_nascimento: dtNasc,
            data_admissao: dtAdmis,
            funcao: funcao
        }

        await api.put('user', data)

        onRequestClose();
    }

    function handleCancel(){
        onRequestClose();
    }

    function changeScreen(){
        return action === 'Cadastro' ? true : false
    }

    function handlechangeScreen(){
        updateState(index, 'Editar')
    }

    async function handleDelete(id){

        //Deleta o produto
        await api.delete('user', { data: { id: id } })
        .catch(error => {
            console.error(error);
        })
        .finally(handleCancel())
        
    };

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
            <h2>{action}</h2>

            <input 
                placeholder="Nome"
                value={nome}
                disabled={changeScreen()}
                onChange={event => setNome(event.target.value)}
            />

            <input
                placeholder="RG"
                value={rg}
                disabled={changeScreen()}
                onChange={event => setRg(event.target.value)}        
            />

            <input 
                placeholder="CPF"
                value={cpf}
                disabled={changeScreen()}
                onChange={event => setCpf(event.target.value)}
            />

            <input 
                placeholder="Função"
                value={funcao}
                disabled={changeScreen()}
                onChange={event => setFuncao(event.target.value)}
            />

            <div className="date-div">
                <div className="data-label">
                    <label>Data de Nascimento</label>
                    <input 
                        type="date"
                        value={dtNasc}
                        disabled={changeScreen()}
                        onChange={event => setDtNasc(event.target.value)}
                    />
                </div>
                <div className="data-label">
                    <label>Data de Admissão</label>
                    <input 
                        type="date"
                        value={dtAdmis}
                        disabled={changeScreen()}
                        onChange={event => setDtAdmis(event.target.value)}
                    />
                </div>
            </div>

            <div className="button-div">
                {changeScreen() ? 
                <>
                    <div className="button-div-model" onClick={() => handleDelete(idUser)} style={{background: '#e52e4d'}}>
                        Excluir
                    </div>
                    <div className="button-div-model" onClick={() => handlechangeScreen()}>
                        Editar
                    </div>
                </>
                :
                <>
                    <div className="button-div-model" onClick={() => handleCancel()} style={{background: '#e52e4d'}}>
                        Cancelar
                    </div>
                    <div className="button-div-model" onClick={() => handleUpdateNewUser()}>
                        Editar
                    </div>
                </>}
            </div>
        </Container>
    </Modal>
    );
}