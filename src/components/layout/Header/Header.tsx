import cartIcon from '../../../assets/icons/cart.svg';
import heartIcon from '../../../assets/icons/heart.svg';
import logo from '../../../assets/icons/logo.svg';
import ordersIcon from '../../../assets/icons/orders.svg';
import searchIcon from '../../../assets/icons/search.svg';
import userIcon from '../../../assets/icons/user.svg';
import { MainNav } from '../MainNav/MainNav';
import { TopBar } from '../TopBar/TopBar';
import styles from './Header.module.scss';

const ACTIONS = [
  { label: 'Meus pedidos', href: '/conta/pedidos', icon: ordersIcon, size: 24 },
  { label: 'Favoritos', href: '/favoritos', icon: heartIcon, size: 32 },
  { label: 'Minha conta', href: '/conta', icon: userIcon, size: 32 },
  { label: 'Carrinho', href: '/carrinho', icon: cartIcon, size: 32 },
];

export function Header() {
  return (
    <header className={styles.header}>
      <TopBar />

      <div className={styles.main}>
        <a href="/" className={styles.logo} aria-label="Econverse — página inicial">
          <img src={logo} alt="Econverse" width={139} height={41} />
        </a>

        <search className={styles.search}>
          <form onSubmit={(event) => event.preventDefault()}>
            <label htmlFor="site-search" className="sr-only">
              Buscar produtos
            </label>
            <input
              id="site-search"
              className={styles.searchInput}
              type="search"
              name="q"
              placeholder="O que você está buscando?"
              autoComplete="off"
            />
            <button type="submit" className={styles.searchButton} aria-label="Buscar">
              <img src={searchIcon} alt="" width={28} height={28} />
            </button>
          </form>
        </search>

        <ul className={styles.actions}>
          {ACTIONS.map(({ label, href, icon, size }) => (
            <li key={label}>
              <a href={href} className={styles.action} aria-label={label} title={label}>
                <img src={icon} alt="" width={size} height={size} />
              </a>
            </li>
          ))}
        </ul>
      </div>

      <MainNav />
    </header>
  );
}
