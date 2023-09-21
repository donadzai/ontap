import classNames from "classnames/bind";
import { useState } from "react";

import styles from './Image.module.scss';
import images from "~/assets/image";

const cx = classNames.bind(styles);

function Image({src , alt , customize = images.img}) {
    
    const [fallBack, setFallBack] = useState(false);

    const handleFallBack = () => {
        setFallBack(customize);
    }

    return <img className={cx('img')} src={fallBack || src} alt={alt} onError={handleFallBack}/>;
}

export default Image;