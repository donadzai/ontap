import { useReducer, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './App.module.scss';

const cx = classNames.bind(styles);

const innitState = {
    input: '',
    jobs: [],
    index: 0,
};

const INPUT_ACTION = 'inputChange';
const SET_JOB = 'setJob';
const EDIT_JOB = 'editJob';
const SAVE_JOB = 'saveJob';

const inputAction = (data) => {
    return {
        type: INPUT_ACTION,
        data,
    };
};

const setJob = (data) => {
    return {
        type: SET_JOB,
        data,
    };
};

const editJob = (index) => {
    return {
        type: EDIT_JOB,
        index,
    };
};

const saveJob = (data) => {
    return {
        type: SAVE_JOB,
        data,
    };
};

const reducer = (state, action) => {

    switch (action.type) {
        case INPUT_ACTION:
            const resultInput = { ...state, input: action.data };
            return resultInput;
        case SET_JOB:
            const resultSetJob = { ...state, jobs: [...state.jobs, action.data] };
            return resultSetJob;
        case EDIT_JOB:
            const resultEditJob = { ...state, index: action.index };
            return resultEditJob;
        case SAVE_JOB:
            let currentJobs = state.jobs;
            currentJobs.splice(state.index, 1, action.data.input);
            const resultSaveJob = { ...state, jobs: [...currentJobs] };
            return resultSaveJob;
        default:
            break;
    }

    return state;
};

function App() {
    const [state, dispath] = useReducer(reducer, innitState);

    const { input, jobs} = state;

    const btnRef = useRef();

    return (
        <div className={cx('wrapper-app')}>
            <input
                value={input}
                onChange={(e) => {
                    dispath(inputAction(e.target.value));
                }}
            />
            <button
                ref={btnRef}
                onClick={() => {
                    const btnText = btnRef.current.innerText;
                    console.log(btnText);
                    if (btnText === 'Add') {
                        dispath(setJob(input));
                        dispath(inputAction(''));
                    } else {
                        dispath(saveJob(state));
                        btnRef.current.innerText = 'Add';
                    }
                }}
            >
                Add
            </button>
            {jobs.map((job, index) => {
                return (
                    <li key={index}>
                        {job}
                        <span className={cx('btn')}>Xóa</span>
                        <span
                            onClick={() => {
                                dispath(editJob(index));
                                dispath(inputAction(state.jobs[index]));
                                btnRef.current.innerText = 'Save';
                            }}
                            className={cx('btn')}
                        >
                            Edit
                        </span>
                    </li>
                );
            })}
        </div>
    );
}

export default App;
