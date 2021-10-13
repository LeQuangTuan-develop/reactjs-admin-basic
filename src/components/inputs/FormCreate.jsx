import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import TextField from '@mui/material/TextField';
import "./form.css"
import { useState } from 'react';
import Api from '../../util/Api'
import { 
    Checkbox, 
    FormControl, 
    FormControlLabel, 
    FormGroup, 
    FormLabel, 
    Radio, 
    RadioGroup, 
} from '@mui/material';
import { useHistory } from 'react-router';
import storage from '../../firebase'
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function FormCreate({ inputs, schema, options, file, firebaseUrl, serverUrl, returnUrl }) {
    const history = useHistory();
    const [name, setName] = useState('');

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })

    console.log(options);

    const onSubmit = async (data) => {
        console.log(data);
        if(file) {
            console.log("upload file to firebase");
            var storageRef = ref(storage, `images/test/${file.name}`);
            var metaData = {
                contentType: 'image/*'
            };
            await uploadBytes(storageRef, file, metaData)
                .then((snapshot) => {
                    console.log('Uploaded successfully');
                })
                .catch((error) => error);

            await getDownloadURL(ref(storage, `images/test/${file.name}`))
                .then( async (url) => {
                    try {
                        data = {
                            ...data,
                            img: url,
                            imgName: file.name,
                        }
                        console.log(data);
                        const handle = await Api.post(serverUrl, data)
                        history.push(returnUrl);
                    } catch (error) {
                        console.log(error);
                    }
                })
        } else {
            
        }
    }

    const handleChange = (event) => {
        setName(event.target.value);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="form">
            <div className="form-group-custom">
                {inputs.map((input, key) =>
                (
                    <>
                    {input.input === 'textarea' ?
                        <>
                        <div className="textarea">  
                            <TextField
                                {...register(input.name)}
                                id="outlined-multiline-static"
                                label={input.label}
                                multiline
                                minRows={4}
                                maxRows={8}
                                className="form-control"
                            />
                        </div>
                        <p className="message-error">{errors[input.name]?.message}</p>
                        </>
                    :
                    <div key={key} className="form-group">
                        {input.input === "basic" &&
                            <div className="form-control">
                                <TextField
                                    className="inputForm"
                                    label={input.label}
                                    variant="outlined"
                                    type={input.type}
                                    {...register(input.name)}
                                />
                            </div>
                        }
                        {input.input === "select" &&
                            <div className="form-control">
                                <select {...register(input.name, { required: true })} className="selectForm">
                                    <option value="">{input.label}</option>
                                    {options.map(item => (
                                        <option value={item.value}>{item.label}</option>
                                    ))}
                                </select>
                            </div>
                        }
                        {input.input === "checkbox" &&
                            <FormControl sx={{ m: 0 }} component="fieldset" variant="standard" className="form-control">
                                <FormLabel component="legend">Assign responsibility</FormLabel>
                                <FormGroup>
                                    <FormControlLabel
                                        control={
                                            <Checkbox onChange={handleChange} name="gilad" {...register(input.name)} value={1}/>
                                        }
                                        label="Gilad Gray"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox onChange={handleChange} name="jason" {...register(input.name)} value={2}/>
                                        }
                                        label="Jason Killian"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox onChange={handleChange} name="antoine" {...register(input.name)} value={3}/>
                                        }
                                        label="Antoine Llorca"
                                    />
                                </FormGroup>
                            </FormControl>
                        }
                        {input.input === "radio" &&
                            <FormControl component="fieldset" className="form-control">
                                <FormLabel component="legend">Gender</FormLabel>
                                <RadioGroup
                                    aria-label="gender"
                                    name="radio-buttons-group"
                                >
                                    <FormControlLabel value="female" control={<Radio />} label="Female" {...register(input.name)} />
                                    <FormControlLabel value="male" control={<Radio />} label="Male" {...register(input.name)} />
                                    <FormControlLabel value="other" control={<Radio />} label="Other" {...register(input.name)} />
                                </RadioGroup>
                            </FormControl>
                        }
                        {input.input !== 'textarea' && <p className="message-error">{errors[input.name]?.message}</p>}
                    </div>
                    }
                </>
                )
                )}
            </div>
            <button type="submit" className="buttonSubmit">Thêm mới</button>
        </form>
    )
}
