import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward, faForward, faPlay, faRepeat, faShuffle } from '@fortawesome/free-solid-svg-icons';

import styles from './Control.module.scss';

const cx = classNames.bind(styles);

function Control() {
    return (
        <div className={cx('control')}>
            <div className={cx('btn')}>
                <FontAwesomeIcon className={cx('btn-icon')} icon={faRepeat} />
            </div>
            <div className={cx('btn')}>
                <FontAwesomeIcon className={cx('btn-icon')} icon={faBackward} />
            </div>
            <div className={cx('btn')}>
                <FontAwesomeIcon className={cx('btn-icon')} icon={faPlay} />
            </div>
            <div className={cx('btn')}>
                <FontAwesomeIcon className={cx('btn-icon')} icon={faForward} />
            </div>
            <div className={cx('btn')}>
                <FontAwesomeIcon className={cx('btn-icon')} icon={faShuffle} />
            </div>
        </div>
    );
}

export default Control;
