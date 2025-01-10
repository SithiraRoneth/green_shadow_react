import {useDispatch} from "react-redux";
import {useState} from "react";

export default function Fields(){
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        fieldCode : '',
        fieldName : '',
        fieldImage : '',
        fieldLocation : ''
    })
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    return(
        <>
            <h1 className='text-2xl flex font-bold items-center justify-center'>Field</h1>
        </>
    )
}
