import './navbar.css';
function Navbar({ navigateTo }) {
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid card-custom">
        <button className="navbar-brand" onClick={() => navigateTo('/')}>
          Music_uff
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <button className="nav-link" onClick={() => navigateTo('cards')}>
                Home
              </button>
            </li>
            <li className="nav-item">
              <button className="nav-link"  onClick={() => navigateTo('waitlist')}>
                Join Our Waitlist Here!
              </button>
            </li>
          </ul>
        </div>
        </div>
    </nav>
  );
}

export default Navbar;