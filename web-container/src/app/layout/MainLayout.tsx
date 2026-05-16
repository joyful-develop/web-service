import { Outlet, Link } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <header style={{ padding: '1rem', background: '#eee' }}>
        <nav>
          <Link to='/'>Home</Link> | <Link to='/about'>About</Link>
        </nav>
      </header>

      <main style={{ flex: 1, padding: '1rem' }}>
        {/* 콘텐츠가 들어가는 자리 */}
        <Outlet />
      </main>

      <footer style={{ padding: '1rem', background: '#333', color: '#fff' }}>© 2026 Layout App</footer>
    </div>
  );
};

export default MainLayout;
