import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './App.module.scss';

const cx = classNames.bind(styles);

function App() {
    const [image, setImage] = useState('');

    useEffect(() => {
        return () => {
            if(!image) {
                return;
            }
            URL.revokeObjectURL(image.url);
        };
    }, [image]);

    const handleChange = (e) => {
        const files = e.target.files[0];
        files.url = URL.createObjectURL(files);
        setImage(files);
    };

    return (
        <div className={cx('wrapper')}>
            <input type="file" onChange={handleChange} />
            {image && <img style={{ width: 500, height: 500, objectFit: 'cover' }} src={image.url} alt="anh" />}
        </div>
    );
}

export default App;
