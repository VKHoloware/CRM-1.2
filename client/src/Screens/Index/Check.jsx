import React, { useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';

import './HomeScreenStyle.css';

function HomeScreen() {
    const [data, setData] = useState({ companyname: '', sno: '', date: '', mobile: '', email: '' });
    const [datas, setDatas] = useState(null); 

    const handlechange = (event) => {
        const { name, value } = event.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handlePreview();
        }
    };

    const handlePreview = () => {
        const modifiedData = { ...data };
        if (modifiedData.hasOwnProperty('sno')) {
            modifiedData.sno = 'HW/' + modifiedData.sno;
        }
        axios
            .post('http://localhost:8000/data', modifiedData)
            .then((response) => {
                setDatas(response.data.data); 
                console.log(response.data.data)
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    };

    const handleSeal = () => {
        console.log('Set seal');
    };

    const handleDownload = () => {
        console.log("Downloaded")
    }
    return (
        <div className='main_container'>
            <div className='nav_container'></div>
            <div className='body_container'>
                <div className='form_container'>
                    <Box
                        component='form'
                        sx={{
                            '& > :not(style)': { m: 1, width: '25ch' },
                            textAlign: 'center', // Center align all form elements
                        }}
                        noValidate
                        autoComplete='off'
                    >
                        <h3> Gem Certificate </h3><br/>
                        <TextField
                            id='companyname'
                            label='Company Name'
                            variant='outlined'
                            name='companyname'
                            value={data.companyname}
                            onChange={handlechange}
                        />
                        <FormControl sx={{ m: 1, width: '25ch' }} variant='outlined'></FormControl>{' '}
                        <br /> <br />
                        <TextField
                            label='Serial Number'
                            id='sno'
                            name='sno'
                            sx={{ m: 1, width: '25ch' }}
                            value={data.sno}
                            onChange={handlechange}
                            onKeyDown={handleKeyDown} // Trigger handlePreview on Enter key press
                            InputProps={{ startAdornment: <InputAdornment position='start'>HW/</InputAdornment> }}
                        />
                        <br />
                        <br />
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DateField', 'DateField']}>
                                <DateField
                                    label='Enter Date'
                                    onChange={(date) => setData((prevData) => ({ ...prevData, date: date.format('DD/MM/YYYY') }))}
                                    value={dayjs(data.date)}
                                    sx={{ m: 1, width: '25ch' }}
                                    format='DD/MM/YYYY'
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                        <br />
                        <TextField
                            id='mobile'
                            label='Mobile Number'
                            variant='outlined'
                            name='mobile'
                            value={data.mobile}
                            onChange={handlechange}
                        />{' '}
                        <br />
                        <FormControl sx={{ m: 1, width: '25ch' }} variant='outlined'></FormControl> <br />
                        <TextField
                            id='email'
                            label='Email Account'
                            variant='outlined'
                            name='email'
                            value={data.email}
                            onChange={handlechange}
                        />{' '}
                        <br />
                        <FormControl sx={{ m: 1, width: '25ch' }} variant='outlined'></FormControl> <br />
                    </Box>

                    <div className='button_container'>
                        <input className='button' type='submit' value='Preview' onClick={handlePreview} />
                        <input className='button' type='submit' value='Set Seal' onClick={handleSeal} />
                    </div>
                </div>
                <div className='preview_container'>
                    {datas && Object.values(datas).some((value) => value === '') ? (
                        <p>Loading...</p>
                    ) : datas ? (
                        <>
                            <div className="preview">
                                <div className="header"> <h4>Title : GEM Certificate </h4> <h4> Date: {datas.date} </h4></div>
                                Hi You have registered {datas.companyname} on {datas.date} we are happy to welcome you. <br/><br/> 
                                Your details are,<br/><br/> Company Name: {datas.companyname} <br/><br/> Serial Number : {datas.sno} <br/><br/> Mobile: {datas.mobile} <br/><br/> E-mail: {datas.email} <br/><br/>
                                <br/><br/><br/><br/> <div className="footer" >Your's Faithfully</div>
                            </div> <br/><br/>
                        <input className='button' type='submit' value='Download' onClick={handleDownload} />  
                        </>
                        
                    ) : null}
                </div>
            </div>
        </div>
    );
}

export default HomeScreen;
