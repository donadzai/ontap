import { useRef, useState } from 'react';

function App() {
    const dataJobs = JSON.parse(localStorage.getItem('jobs'));

    const [jobs, setJobs] = useState(dataJobs || []);

    const inputRef = useRef();

    const [inputValue, setInputValue] = useState('');

    const handleAddJob = () => {
        setJobs((prev) => {
            const newJobs = [...prev, inputValue];

            if (jobs.includes(inputValue)) {
                alert('Công việc đã tồn tại');
                return prev;
            } else {
                localStorage.setItem('jobs', JSON.stringify(newJobs));

                return newJobs;
            }
        });

        setInputValue('');

        inputRef.current.focus();
    };

    return (
        <div>
            <input
                ref={inputRef}
                value={inputValue}
                onChange={(e) => {
                    setInputValue(e.target.value);
                }}
            />
            <button onClick={handleAddJob}>Add</button>
            {jobs.map((job, index) => {
                return <li key={index}>{job}</li>;
            })}
        </div>
    );
}

export default App;
