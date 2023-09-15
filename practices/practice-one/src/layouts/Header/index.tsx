import { ChangeEvent, memo, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from 'hooks';
import { FaFilter, FaSearch, FaShoppingBag } from 'react-icons/fa';

// Components
import { Button, Input } from 'components/commons';

// Constants
import { END_POINT } from '@constants';

// Styles
import headerStyles from './header.module.css';
import containerStyles from 'styles/commons/container.module.css';

// Images
import logo from 'assets/images/logo.jpg';

type HeaderProps = {
  isFilter?: boolean;
  // eslint-disable-next-line no-unused-vars
  onOpenCart: (event: boolean) => void;
  // eslint-disable-next-line no-unused-vars
  onOpenFilter: (event: MouseEvent) => void;
  // eslint-disable-next-line no-unused-vars
  onSearch: (event: ChangeEvent) => void;
};

const Header = (props: HeaderProps) => {
  const {
    globalState: { cartSize },
  } = useApp();
  const { isFilter = true, onOpenFilter, onSearch, onOpenCart } = props;

  return (
    <header
      className={`${headerStyles.mainHeader} ${containerStyles.container}`}
    >
      <nav className={headerStyles.mainNavbar}>
        <div className={headerStyles.headerItem}>
          <a href={END_POINT.HOME}>
            <img src={logo} alt="logo" className={headerStyles.headerLogo} />
          </a>
          <ul className={headerStyles.navlists}>
            <li className={headerStyles.navItem}>
              <Link to="/" className={headerStyles.navLink}>
                Home
              </Link>
            </li>
          </ul>
        </div>
        <div className={headerStyles.headerItem}>
          <div className={headerStyles.headerFilter}>
            {isFilter && (
              <Button
                description="Filters"
                rightIcon={<FaFilter />}
                className={headerStyles.btn}
                onClick={onOpenFilter}
              />
            )}
            <Input
              placeholder="Search product..."
              leftIcon={<FaSearch />}
              className={headerStyles.input}
              onChange={onSearch}
            />
          </div>
          {/* add class 'show' when add size cart > 0 */}
          {Boolean(cartSize) && (
            <Button
              className={`${headerStyles.headerCartIcon} ${headerStyles.show}`}
              data-size={cartSize}
              onClick={(e: MouseEvent) => {
                e.stopPropagation();
                onOpenCart(true);
              }}
            >
              <FaShoppingBag />
            </Button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default memo(Header);
