import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Main from './components/Main';
import Footer from './components/Footer';
import './App.css';

function App() {
  const menuItems = ['Головна', 'Про нас', 'Контакти'];
  const pageTitle = 'Ласкаво просимо на наш сайт!';

  return (
    <div>
      <Header menuItems={menuItems} />
      <div className="container">
        <Sidebar />
        <Main title={pageTitle} />
      </div>
      <Footer />
    </div>
  );
}

export default App;
