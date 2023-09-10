
function Checked({ data , onChange = () =>{} , checked}) {
    return (
        <div>
            <input checked = {checked} onChange={onChange} type="radio" />
            <label>{data.name}</label>
        </div>
    );
}

export default Checked;
