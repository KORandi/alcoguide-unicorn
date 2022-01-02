import classNames from 'classnames';
import Link from 'next/link';
import { useState } from 'react/cjs/react.development';
import { Icon, Menu, Sidebar } from 'semantic-ui-react';

function Navbar() {
  const [visible, setVisible] = useState(false);

  return (
    <>
      {/* Computer */}
      <nav className="navbar navbar-dark bg-dark d-none d-md-flex">
        <div className="container-fluid">
          <Link href="/">
            <a className="navbar-brand">AlcoGuide</a>
          </Link>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link href="/">
                <a className="nav-link">
                  Home <Icon name="home" />
                </a>
              </Link>
            </li>
          </ul>
          <div className="d-flex align-items-center">
            <button type="button" className="btn btn-primary me-3">
              Sign in
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile */}
      <nav className="navbar navbar-dark bg-dark d-flex d-md-none">
        <div className="container-fluid">
          <Link href="/">
            <a className="navbar-brand">AlcoGuide</a>
          </Link>
          <button
            onClick={() => setVisible(true)}
            className={classNames('hamburger', {
              'hamburger--squeeze is-active': visible,
            })}
            type="button"
          >
            <span className="hamburger-box">
              <span className="hamburger-inner" />
            </span>
          </button>
        </div>
        <Sidebar
          as={Menu}
          animation="overlay"
          direction="left"
          inverted
          vertical
          onHide={() => setVisible(false)}
          visible={visible}
        >
          <div className="p-3">
            <Link href="/">
              <Menu.Item as="a">
                <Icon name="home" />
                Home
              </Menu.Item>
            </Link>
            <Menu.Item className="d-flex justify-content-end" as="a">
              <button type="button" className="btn btn-primary">
                Sign in
              </button>
            </Menu.Item>
          </div>
        </Sidebar>
      </nav>
    </>
  );
}

export default Navbar;
