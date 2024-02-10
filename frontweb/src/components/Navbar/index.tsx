import { AuthContext } from 'AuthContext';
import { useContext, useEffect } from 'react';
import { getTokenData, isAuthenticated } from 'util/auth';
import { Link } from 'react-router-dom';
import { removeAuthData } from 'util/storage';
import history from 'util/history';

import './styles.css';

const Navbar = () => {
  const { authContextData, setAuthContextData } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated()) {
      setAuthContextData({
        authenticated: true,
        tokenData: getTokenData(),
      });
    } else {
      setAuthContextData({
        authenticated: false,
      });
    }
  }, [setAuthContextData]);

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    removeAuthData();
    setAuthContextData({ authenticated: false });
    history.replace('/');
  };

  return (
    <nav className="navbar nav-main bg-primary">
      <Link to="/movies">
        <h1>MovieFlix</h1>
      </Link>
      {authContextData.authenticated ? (
        <Link to="/" className="nav-login-logout" onClick={handleClick}>
          SAIR
        </Link>
      ) : undefined}
    </nav>
  );
};

export default Navbar;
