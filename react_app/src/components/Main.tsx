interface MainProps {
  title: string;
}

function Main({ title }: MainProps) {
  return (
    <main className="main">
      <h2>{title}</h2>
      <p>Це перший параграф основного контенту.</p>
      <p>Це другий параграф з додатковою інформацією.</p>
      <img src="https://via.placeholder.com/400" alt="Приклад зображення" />
    </main>
  );
}

export default Main;
