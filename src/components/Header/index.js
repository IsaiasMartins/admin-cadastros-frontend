import { Container, Content } from './styles';

export function Header({ onOpenNewUserModal }){
    return(
        <Container>
            <Content>
                <button type="button" onClick={onOpenNewUserModal}>
                    Novo Cadastro
                </button>            
            </Content>
        </Container>
    )
}