import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import TextField from '@mui/material/TextField';
import "./form.css"
import { useState } from 'react';
import Api from '../../util/Api'
import { Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Radio, RadioGroup } from '@mui/material';

export default function Form({ inputs, schema, options }) {
    const [name, setName] = useState('');

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })

    const onSubmit = async (data) => {
        console.log(data);
        // const handle = await Api.get('/lab2/test/handlestr')
        // console.log(handle);
    }

    const currencies = [
        {
            value: 'USD',
            label: 'Hồ chí Minh',
        },
        {
            value: 'EUR',
            label: 'Hà Nội',
        },
        {
            value: 'BTC',
            label: 'Đà Nẵng',
        },
        {
            value: 'JPY',
            label: 'Khác',
        },
    ];

    const handleChange = (event) => {
        setName(event.target.value);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="form">
            <div className="form-group-custom">
                {inputs.map((input, key) =>
                (
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
                                    <option value="">Lựa chọn tỉnh</option>
                                    {currencies.map(item => (
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
                        <p className="message-error">{errors[input.name]?.message}</p>
                    </div>
                )
                )}
            </div>
            <button type="submit" className="buttonSubmit">Cập nhật</button>
        </form>
    )
}
