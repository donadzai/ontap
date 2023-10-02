import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward, faForward, faPause, faPlay, faRepeat, faShuffle } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from 'react';

import styles from './Dashboard.module.scss';
import Item from '~/components/Item';

const cx = classNames.bind(styles);

function Dashboard({ data }) {
    const [showPlayBtn, setShowPLayBtn] = useState(false);
    const [showPauseBtn, setPausePLayBtn] = useState(true);
    const [valueInput, setValueInput] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [repeat, setRepeat] = useState(false);
    const [random, setRandom] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

    const cdRef = useRef();
    const audioRef = useRef();
    const animateRef = useRef();
    const repeatBtn = useRef();

    const currentDataSong = data[currentIndex];

    const randomFunc = () => {
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * data.length);
            setCurrentIndex(randomIndex);
        } while (randomIndex === currentIndex);
    };

    const onClickSong = (index) => {
        setCurrentIndex(index);
    };

    // thu nhỏ ảnh

    useEffect(() => {
        // làm phóng to thu nhỏ cd.
        const currentWidth = cdRef.current.offsetWidth;
        const handleScroll = () => {
            const scrollValue = window.scrollY;
            const newCurrentWidth = currentWidth - scrollValue;

            cdRef.current.style.width = newCurrentWidth > 0 ? newCurrentWidth + 'px' : 0;
            cdRef.current.style.opacity = newCurrentWidth / currentWidth;
        };

        window.addEventListener('scroll', handleScroll);

        // làm cd quay

        animateRef.current = cdRef.current.animate([{ transform: 'rotate(0)' }, { transform: 'rotate(360deg)' }], {
            duration: 5000,
            iterations: Infinity,
        });

        animateRef.current.pause();

        //Sự kiện khi pause:

        const handlePause = () => {
            setIsPlaying(false);
        };

        audioRef.current.addEventListener('pause', handlePause);

        //Sự kiện khi play:

        const handlePlay = () => {
            setIsPlaying(true);
        };

        audioRef.current.addEventListener('play', handlePlay);

        return () => {
            // xóa bỏ sự kiện
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    //làm audio play khi curentIndex thay đổi

    useEffect(() => {
        const playing = audioRef.current;

        if (showPlayBtn) {
            playing.play();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentIndex]);

    // làm thẻ input chạy.

    useEffect(() => {
        const audioElement = audioRef.current;

        const handleTimeUpDate = () => {
            const currentTime = audioElement.currentTime;
            const duration = audioElement.duration;

            const currentValueInput = Math.floor((currentTime / duration) * 100);

            setValueInput(currentValueInput.toString());
        };

        audioElement.addEventListener('timeupdate', handleTimeUpDate);

        return () => {
            audioElement.removeEventListener('timeupdate', handleTimeUpDate);
        };
    }, [currentIndex]);

    // phát lại hay phát tiếp.

    useEffect(() => {
        const audioElement = audioRef.current;
        const handleEnded = () => {
            if (repeat) {
                audioRef.current.play();
            } else if (random) {
                randomFunc();
            } else {
                setCurrentIndex((prev) => prev + 1);
            }
        };

        audioElement.addEventListener('ended', handleEnded);
        // eslint-disable-next-line react-hooks/exhaustive-deps

        return () => {
            audioElement.removeEventListener('ended', handleEnded);
        };
    }, [repeat, random]);

    return (
        <>
            <div className={cx('dashboard')}>
                <header className={cx('header-wrapper')}>
                    <span className={cx('title')}>Now playing</span>
                    <span className={cx('title-song')}>{currentDataSong.song}</span>
                </header>

                <div ref={cdRef} className={cx('cd')}>
                    <div style={{ backgroundImage: `url(${currentDataSong.img})` }} className={cx('img')}></div>
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
                    {/* nút repeat */}
                    <div
                        ref={repeatBtn}
                        onClick={() => {
                            setRepeat(!repeat);
                            setRandom(false);
                        }}
                        className={cx('btn', {
                            [styles.active]: repeat,
                        })}
                    >
                        <FontAwesomeIcon className={cx('btn-icon')} icon={faRepeat} />
                    </div>

                    {/* nút prev */}
                    <div
                        onClick={() => {
                            setShowPLayBtn(true);
                            setPausePLayBtn(false);
                            if (repeat) {
                                audioRef.current.currentTime = 0;
                                audioRef.current.play();
                            } else if (random) {
                                randomFunc();
                            } else {
                                setCurrentIndex((prev) => {
                                    let newIndex = prev - 1;
                                    if (newIndex < 0) {
                                        newIndex = data.length - 1;
                                    }
                                    return newIndex;
                                });
                            }
                        }}
                        className={cx('btn')}
                    >
                        <FontAwesomeIcon className={cx('btn-icon')} icon={faBackward} />
                    </div>

                    {/* nút play / pause */}
                    <div
                        onClick={() => {
                            setShowPLayBtn(!showPlayBtn);
                            setPausePLayBtn(!showPauseBtn);
                            if (isPlaying) {
                                audioRef.current.pause();
                                animateRef.current.pause();
                            } else {
                                audioRef.current.play();
                                animateRef.current.play();
                            }
                        }}
                        className={cx('btn')}
                    >
                        {showPauseBtn && <FontAwesomeIcon className={cx('btn-icon')} icon={faPlay} />}
                        {showPlayBtn && <FontAwesomeIcon className={cx('btn-icon')} icon={faPause} />}
                    </div>

                    {/* nút next */}
                    <div
                        onClick={() => {
                            setShowPLayBtn(true);
                            setPausePLayBtn(false);
                            if (repeat) {
                                audioRef.current.currentTime = 0;
                                audioRef.current.play();
                            } else if (random) {
                                randomFunc();
                            } else {
                                setCurrentIndex((prev) => {
                                    let newIndex = prev + 1;
                                    if (newIndex > data.length - 1) {
                                        newIndex = 0;
                                    }
                                    return newIndex;
                                });
                            }
                        }}
                        className={cx('btn')}
                    >
                        <FontAwesomeIcon className={cx('btn-icon')} icon={faForward} />
                    </div>

                    {/* nút random */}
                    <div
                        onClick={() => {
                            setRepeat(false);
                            setRandom(!random);
                        }}
                        className={cx('btn', {
                            [styles.activeRandom]: random,
                        })}
                    >
                        <FontAwesomeIcon className={cx('btn-icon')} icon={faShuffle} />
                    </div>
                </div>

                <div className={cx('audio-wrapper')}>
                    <audio ref={audioRef} src={currentDataSong.music} />
                </div>
            </div>

            <div className={cx('play-list')}>
                {data.map((item, index) => (
                    <Item index={index} onClick={onClickSong} currentIndex={currentIndex} key={item.id} data={item} />
                ))}
            </div>
        </>
    );
}

export default Dashboard;
