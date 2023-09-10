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
    const [checked, setChecked] = useState([]);

    const handleChange = (id) => {
        const isCheck = checked.includes(id);

        if (isCheck) {
            const newChecked = checked.filter((item) => {
                return item !== id;
            });
            setChecked(newChecked);
        } else {
            setChecked((prev) => [...prev, id]);
        }
    };

    return (
        <div>
            {courses.map((course) => {
                return (
                    <Checked
                        key={course.id}
                        data={course}
                        checked={checked.includes(course.id)}
                        onChange={() => handleChange(course.id)}
                    />
                );
            })}

            <button onClick={() => console.log(checked)}>Submit</button>
        </div>
    );
}

export default App;
