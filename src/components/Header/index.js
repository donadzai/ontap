import classNames from "classnames/bind";

import styles from './Header.module.scss'

const cx = classNames.bind(styles);

function Header() {
    return <header className={cx('header-wrapper')}>
        <span className={cx('title')}>Now playing</span>
        <span className={cx('title-song')}>Rewirite the starts</span>
    </header>
}

export default Header;