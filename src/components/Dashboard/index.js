import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward, faForward, faPause, faPlay, faRepeat, faShuffle } from '@fortawesome/free-solid-svg-icons';

import styles from './Dashboard.module.scss';
import { useEffect, useRef, useState } from 'react';

const cx = classNames.bind(styles);

function Dashboard({ currentIndex, data }) {
    const [showPlayBtn, setShowPLayBtn] = useState(false);
    const [showPauseBtn, setPausePLayBtn] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);
    const [valueInput, setValueInput] = useState(0);

    const cdRef = useRef();
    const audioRef = useRef();

    const currentDataSong = data[currentIndex];

    useEffect(() => {
        const currentWidth = cdRef.current.offsetWidth;

        window.addEventListener('scroll', () => {
            const scrollValue = window.scrollY;
            const newCurrentWidth = currentWidth - scrollValue;

            cdRef.current.style.width = newCurrentWidth > 0 ? newCurrentWidth + 'px' : 0;
            cdRef.current.style.opacity = newCurrentWidth / currentWidth;
        });
    }, []);

    useEffect(() => {
        const audioElement = audioRef.current;

        const songDuration = audioElement.duration;

        const handleTimeUpDate = () => {
            const newInputValue = Math.floor((audioElement.currentTime / songDuration) * 100);
            setValueInput(newInputValue);
        };

        audioElement.addEventListener('timeupdate', handleTimeUpDate);

        return () => {
            audioElement.removeEventListener('timeupdate', handleTimeUpDate);
        };
    }, [showPauseBtn]);

    // useEffect(() => {

    //     const audioElement = audioRef.current;

    //     const handleSeeked = (e) => {
    //         setValueInput(e.target.value)
    //     };

    //     audioElement.addEventListener('seeked', handleSeeked);
    // }, []);

    return (
        <div className={cx('dashboard')}>
            <header className={cx('header-wrapper')}>
                <span className={cx('title')}>Now playing</span>
                <span className={cx('title-song')}>{currentDataSong.song}</span>
            </header>

            <div ref={cdRef} className={cx('cd')}>
                <div className={cx('img')}></div>
            </div>

            <input
                value={valueInput}
                onChange={(e) => {
                    const processPercent = e.target.value;
                    const songDuration = audioRef.current.duration;
                    audioRef.current.currentTime = (processPercent * songDuration) / 100;
                }}
                min="0"
                max="100"
                step="1"
                className={cx('input-range')}
                type="range"
            />

            <div className={cx('control')}>
                <div className={cx('btn')}>
                    <FontAwesomeIcon className={cx('btn-icon')} icon={faRepeat} />
                </div>
                <div className={cx('btn')}>
                    <FontAwesomeIcon className={cx('btn-icon')} icon={faBackward} />
                </div>
                <div
                    onClick={() => {
                        setIsPlaying(!isPlaying);
                        if (isPlaying) {
                            audioRef.current.pause();
                        } else {
                            audioRef.current.play();
                        }

                        setShowPLayBtn(!showPlayBtn);
                        setPausePLayBtn(!showPauseBtn);
                    }}
                    className={cx('btn')}
                >
                    {showPauseBtn && <FontAwesomeIcon className={cx('btn-icon')} icon={faPlay} />}
                    {showPlayBtn && <FontAwesomeIcon className={cx('btn-icon')} icon={faPause} />}
                </div>
                <div className={cx('btn')}>
                    <FontAwesomeIcon className={cx('btn-icon')} icon={faForward} />
                </div>
                <div className={cx('btn')}>
                    <FontAwesomeIcon className={cx('btn-icon')} icon={faShuffle} />
                </div>
            </div>

            <div className={cx('audio-wrapper')}>
                <audio ref={audioRef} src={currentDataSong.music} />
            </div>
        </div>
    );
}

export default Dashboard;
