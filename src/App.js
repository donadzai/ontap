import { useState } from 'react';
import Checked from './components/Checked';

const courses = [
    {
        id: 1,
        name: 'Javascript',
    },
    {
        id: 2,
        name: 'HTML',
    },
    {
        id: 3,
        name: 'CSS',
    },
];

function App() {
    const [checked, setChecked] = useState(2);

    const handleChange = (id) => {
        setChecked(id);
    };

    return (
        <div>
            {courses.map((course) => {
                return (
                    <Checked data={course} onChange={() => handleChange(course.id)} checked={checked === course.id} />
                );
            })}

            <button onClick={() => alert(courses[checked - 1].name)}>Submit</button>
        </div>
    );
}

export default App;
