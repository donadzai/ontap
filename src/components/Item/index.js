import classNames from 'classnames/bind';

import styles from './Item.module.scss';
import Image from '~/components/Image';
import { useEffect } from 'react';

const cx = classNames.bind(styles);

function Item({data, currentIndex, onClick, index}) {

    useEffect(() => {
        const activeElement = document.querySelector(`.${styles.active}`);
        activeElement.scrollIntoView(false);
    }, [currentIndex])

    return (
        <div onClick={() => onClick(index)} className={cx('wrapper', {
            [styles.active] : data.id - 1 === currentIndex,
        })}>
            <div className={cx('avatar')}>
                <Image
                    src="https://haycafe.vn/wp-content/uploads/2022/02/Anh-gai-xinh-Viet-Nam-682x600.jpg"
                />
            </div>

            <div className={cx('info')}>
                <div className={cx('name-song')}>{data.song}</div>
                <div className={cx('name-singer')}>{data.singer}</div>
            </div>
        </div>
    );
}

export default Item;
