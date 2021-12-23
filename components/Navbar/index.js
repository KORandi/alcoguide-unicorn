import Link from 'next/link';

function Navbar() {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container-fluid">
        <Link href="/">
          <a className="navbar-brand">AlcoGuide</a>
        </Link>
        <div className="d-flex align-items-center">
          <button type="button" className="btn btn-primary me-3">
            Sign in
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
