import { Outlet, Link } from 'react-router-dom';

const Layout = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <header style={{ padding: '1rem', background: '#eee' }}>
        <nav>
          <Link to='/'>Home</Link> | <Link to='/about'>About</Link>
        </nav>
      </header>

      <main style={{ flex: 1, padding: '1rem' }}>
        <Outlet />
      </main>

      <footer style={{ padding: '1rem', background: '#333', color: '#fff' }}>© 2026 Layout App</footer>
    </div>
  );
};

export default Layout;
