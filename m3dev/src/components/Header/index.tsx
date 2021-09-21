import logoImg from '../../assets/logo-m3.png';
import bagIcon from '../../assets/shopping-bag-30.png';
import { Container, Content } from './styles';


export function Header() {
    return (
        <Container>
            <Content>
                <img src={logoImg} alt="logo M3" />
                <a href="/">
                    <img src={bagIcon} alt="bag icon"/>
                </a>
            </Content>
        </Container>
    )
}