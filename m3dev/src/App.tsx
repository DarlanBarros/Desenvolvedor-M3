import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Products } from './pages/Products';
import { GlobalStyle } from './styles/global';

export function App() {
  return (
    <>
      <Header />
      <Products />
      <Footer />
      <GlobalStyle />
    </>
  );
}
