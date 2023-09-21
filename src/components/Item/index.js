import classNames from 'classnames/bind';

import styles from './Item.module.scss';
import Image from '~/components/Image';

const cx = classNames.bind(styles);

function Item() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('avatar')}>
                <Image
                    src="https://haycafe.vn/wp-content/uploads/2022/02/Anh-gai-xinh-Viet-Nam-682x600.jpg"
                />
            </div>

            <div className={cx('info')}>
                <div className={cx('name-song')}>Rewrite the starts</div>
                <div className={cx('name-singer')}>Anne-Marie và James Arthur</div>
            </div>
        </div>
    );
}

export default Item;
