function Header({ menuItems }) {
  return (
    <header className="header">
      <h1>Логотип</h1>
      <nav>
        <ul>
          {menuItems.map((item, index) => (
            <li key={index}><a href="#">{item}</a></li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
