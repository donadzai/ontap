import classNames from 'classnames/bind';

import styles from './App.module.scss';
import Item from '~/components/Item';
import { data } from '~/components/Constants';
import Dashboard from '~/components/Dashboard';
import { useState } from 'react';

const cx = classNames.bind(styles);

function App() {

    const [currentIndex, setCurrentIndex] = useState(0);

    return (
        <div className={cx('app')}>
            <div className={cx('dashboard-wrapper')}>
                <Dashboard data = {data} currentIndex = {currentIndex}/>
            </div>

            <div className={cx('play-list')}>
                {data.map((item) => (
                    <Item key={item.id} data={item} />
                ))}
            </div>
        </div>
    );
}

export default App;
