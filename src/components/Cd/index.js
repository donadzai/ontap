import classNames from 'classnames/bind';
import { useEffect, useRef } from 'react';

import styles from './Cd.module.scss';

const cx = classNames.bind(styles);

function Cd() {
    const cdRef = useRef();

    const handleScroll = (cdWidth) => {
        const scrollTop = window.scrollY;

        const newCdWidth = cdWidth - scrollTop;

        cdRef.current.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0;
        cdRef.current.style.opacity = newCdWidth / cdWidth;
    };

    useEffect(() => {
        const cdWidth = cdRef.current.offsetWidth;

        window.addEventListener('scroll', () => {
            handleScroll(cdWidth);
        });

        return () => {
            document.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div ref={cdRef} className={cx('cd')}>
            <div className={cx('img')}></div>
        </div>
    );
}

export default Cd;
