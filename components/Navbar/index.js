import classNames from 'classnames';
import Link from 'next/link';
import { useState } from 'react';
import { Icon, Menu } from 'semantic-ui-react';
import Sidebar from 'semantic-ui-react/dist/commonjs/modules/Sidebar/Sidebar';
import { USER_LIST } from '../../utils/constants';
import { useAppContext } from '../../utils/context/state';

function Navbar() {
  const [visible, setVisible] = useState(false);
  const { user, setUser } = useAppContext();
  const sidebarConfig = {
    vertical: true,
    inverted: true,
  };

  return (
    <>
      {/* Computer */}
      <nav className="navbar navbar-dark bg-dark d-none d-md-flex">
        <div className="container-fluid">
          <Link href="/">
            <a className="navbar-brand">AlcoGuide</a>
          </Link>
          <ul className="navbar-nav me-auto mb-2 mb-md-0 d-flex flex-row">
            <li className="nav-item px-2">
              <Link href="/">
                <a className="nav-link">
                  Home <Icon name="home" />
                </a>
              </Link>
            </li>
            <li className="nav-item px-2">
              <Link href="/search">
                <a className="nav-link">
                  Cocktails <Icon name="cocktail" />
                </a>
              </Link>
            </li>
          </ul>
          <div className="d-flex align-items-center">
            <select
              onChange={(event) => {
                setUser(event.target.value);
              }}
              defaultValue={user}
              className="form-select"
              aria-label="User select"
            >
              {USER_LIST.map((userEl, key) => (
                <option value={key} key={userEl}>
                  {userEl}
                </option>
              ))}
            </select>
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
          inverted={sidebarConfig.inverted}
          vertical={sidebarConfig.vertical}
          onHide={() => setVisible(false)}
          visible={visible}
        >
          <div className="p-3">
            <Link href="/">
              <Menu.Item as="a">
                Home
                <Icon name="home" />
              </Menu.Item>
            </Link>
            <Link href="/search">
              <Menu.Item as="a">
                Cocktails <Icon name="cocktail" />
              </Menu.Item>
            </Link>
            <Menu.Item className="d-flex justify-content-end" as="a">
              <select
                onChange={(event) => {
                  setUser(event.target.value);
                }}
                defaultValue={user}
                className="form-select"
                aria-label="User select"
              >
                {USER_LIST.map((userEl, key) => (
                  <option value={key} key={userEl}>
                    {userEl}
                  </option>
                ))}
              </select>
            </Menu.Item>
          </div>
        </Sidebar>
      </nav>
    </>
  );
}

export default Navbar;
