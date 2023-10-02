import classNames from 'classnames/bind';

import styles from './App.module.scss';
import { data } from '~/components/Constants';
import Dashboard from '~/components/Dashboard';

const cx = classNames.bind(styles);

function App() {
    return (
        <div className={cx('app')}>
            <div className={cx('dashboard-wrapper')}>
                <Dashboard data={data} />
            </div>
        </div>
    );
}

export default App;
