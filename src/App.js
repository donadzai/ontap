import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './App.module.scss';

const cx = classNames.bind(styles);

const tabs = ['posts', 'comments', 'albums'];

function App() {
    const [type, setType] = useState('posts');

    const [content, setContent] = useState('');

    const [show, setShow] = useState(false);

    const handleGoToTop = () => window.scrollTo(0, 0);

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/${type}`)
            .then((res) => res.json())
            .then((data) => setContent(data));
    }, [type]);

    useEffect(() => {
        const handleScroll = () => {
            console.log(window.scrollY);
            setShow(window.scrollY > 200);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className={cx('wrapper')}>
            {tabs.map((tab) => (
                <button
                    onClick={() => setType(tab)}
                    style={tab === type ? { color: '#fff', backgroundColor: '#000' } : {}}
                    key={tab}
                >
                    {tab}
                </button>
            ))}

            {content &&
                content.map((item) => {
                    return <li key={item.id}>{item.title || item.name}</li>;
                })}

            {show && <button onClick={handleGoToTop} style={{ position: 'fixed', bottom: 20, right: 20 }}>GO TO TOP</button>}
        </div>
    );
}

export default App;
