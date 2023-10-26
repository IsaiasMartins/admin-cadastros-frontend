import { useState, useEffect } from 'react'
import { Container } from "./styles";
import { api } from '../../services/api';
import { PersonItem } from '../PersonItem';

export function PersonList({ isOpen }){
    const [users, setUsers] = useState([]);
    const [isEditModalIndex, setIsEditModalIndex] = useState(null);
    const [action, setAction] = useState('Cadastro');

    function handleEditOpen(index, action){
        setIsEditModalIndex(index);
        setAction(action);
    };
    
    function handleEditClose(){
        setIsEditModalIndex(null);
    };

    async function handleDelete(id){

        await api.delete('user', { data: { id: id } })
        .catch(error => {
            console.error(error);
        }).finally(
            api.get('user')
            .then(response => setUsers(response.data.users))
        )
    };

    useEffect(() => {
        async function getList(){
            api.get('user')
            .then(response => setUsers(response.data.users))
        }
        getList()
    }, [isOpen, action, isEditModalIndex])

    return(
        <Container>
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Data de Admissão</th>
                    </tr>
                </thead>

                <tbody>
                    {users.map((user, index) => (
                    <>
                        <PersonItem 
                            isOpen={isEditModalIndex === index}
                            onRequestClose={handleEditClose}
                            index={index}
                            updateState={handleEditOpen}
                            idUser={user.id_pessoa}
                            nomeUser={user.nome}
                            rgUser={user.rg}
                            cpfUser={user.cpf}
                            dtNascUser={user.data_nascimento}
                            dtAdmisUser={user.data_admissao}
                            funcaoUser={user.funcao}
                            action={action}
                        />

                        <tr key={user.id_pessoa}>
                            <td>{user.nome}</td>
                            <td>
                                {new Intl.DateTimeFormat('pt-BR').format(
                                    new Date(user.data_admissao)
                                )}
                            </td>
                            <td style={{cursor: 'pointer'}} onClick={() => handleEditOpen(index, 'Cadastro')}>Ver Mais</td>
                            <td style={{cursor: 'pointer'}} onClick={() => handleEditOpen(index, 'Editar')}>Editar</td>
                            <td style={{cursor: 'pointer'}} onClick={() => handleDelete(user.id_pessoa)}>Excluir</td>
                        </tr>
                    </>
                    ))}
                </tbody>

            </table>
        </Container>
    );
}