
function Checked({ data , onChange = () =>{} , checked}) {
    return (
        <div>
            <input checked = {checked} onChange={onChange} type="checkbox" />
            <label>{data.name}</label>
        </div>
    );
}

export default Checked;
