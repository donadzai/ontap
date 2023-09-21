import classNames from 'classnames/bind';

import styles from './App.module.scss';
import Header from '~/components/Header';
import Cd from '~/components/Cd';
import Control from '~/components/Controls';
import Item from '~/components/Item';

const cx = classNames.bind(styles);

function App() {
    return (
        <div className={cx('app')}>
            <div className={cx('dashboard')}>
                    <Header />
    
                    <Cd />

                    <input  min='0' max='100' step='1' className={cx('input-range')} type='range'/>
    
                    <Control />
                </div>

            <div className={cx('play-list')}>
                <Item />
                <Item />
                <Item />
                <Item />
                <Item />
                <Item />
                <Item />
                <Item />
                <Item />
                <Item />
                <Item />
                <Item />
            </div>
        </div>
    );
}

export default App;
