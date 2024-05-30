import React, { useState , useEffect, useRef } from 'react';
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
import './WarrantyScreenStyle.css';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import archanasign from'./imgs/Archana-sign.png';
import { Link } from 'react-router-dom';


function WarrantyScreen({userData}) {
  const [data, setData] = useState({ companyname: '', sno: '', date: '', model: '', warranty: '' });
  const [datas, setDatas] = useState(null);
//-----------------------------current date
  var [date,setDate] = useState(new Date());
    
  useEffect(() => {
      var timer = setInterval(()=>setDate(new Date()), 1000 )
      return function cleanup() {
          clearInterval(timer)
      }
  
  });
//--------------------------------------------



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
      modifiedData.sno = 'GEM/2024/' + modifiedData.sno;
    }

    
    axios
      .post('http://localhost:8000/data', modifiedData)
      .then((response) => {
        setDatas(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };


 //   const handleDownload = () => {
   //     console.log("Downloaded")
   // }

//------------------------pdf const
/*
const pdfRef = useRef();

const downloadPDF = () => {
    const input = pdfRef.current;
    html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p','mm','a4', true);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        const ratio = Math.min(pdfWidth / imgWidth / pdfHeight / imgHeight);
        const imgX = (pdfWidth - imgWidth * ratio) / 2;
        const imgY = 30;
        pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
        pdf.save('invoice.pdf');
    });
};
*/
const [loader, setloader] = useState(false);
const [isVisible, setIsVisible] = useState(false);

const downloadPDF = () => {
    const capture = document.querySelector('.preview');
    setloader(true);
    html2canvas(capture, { scale: 4 }).then((canvas)=>{
        const imgDate = canvas.toDataURL('img/png');
        const doc = new jsPDF('p', 'mm', 'a4', true);
        const componentWidth = doc.internal.pageSize.getWidth();
        const componentHeight = doc.internal.pageSize.getHeight();
        doc.addImage(imgDate, 'PNG', 0, 0, componentWidth, componentHeight);
        setloader(false);
        doc.save('invoice.pdf');
    })
}

//------------------------------------


    return (
        <div>
        <div className='main_container'>
        <div className='nav_container'>
                <h3>Welcome {userData.userName}</h3>
            </div>
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
                        <h3> Warranty Certificate </h3><br/>
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
                            InputProps={{ startAdornment: <InputAdornment position='start'>GEM/2024/</InputAdornment> }}
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
                            id='model'
                            label='model Number'
                            variant='outlined'
                            name='model'
                            value={data.model}
                            onChange={handlechange}
                        />{' '}
                        <br />
                        <TextField
                            id='waranty'
                            label='Warranty Years'
                            variant='outlined'
                            type='number'
                            name='warranty'
                            value={data.warranty}
                            onChange={handlechange}
                            InputProps={{ endAdornment: <InputAdornment position='end'>Years</InputAdornment> }}
                        />{' '}
                        <br />
                        
                        <FormControl sx={{ m: 1, width: '25ch' }} variant='outlined'></FormControl> <br />
                    </Box>

                    <div className='button_container'>
                    <button className='button' onClick={() => setIsVisible(!isVisible)}>
                            {isVisible ? 'Hide Seal' : 'Set Seal'}
                    </button>
                        <input className='button' type='submit' value='Preview' onClick={handlePreview} />
                        {/*<input className='button' type='submit' value='Set Seal' onClick={handleSeal} />*/}
                    </div>
                </div>
                <div className='preview_container'>
                    {datas && Object.values(datas).some((value) => value === '') ? (
                        <p>Loading...</p>
                    ) : datas ? (
                        <>
                        {/* Display preview content here */}
                        <div className="preview" >
                            
                            <div className="header">
                            <img src={require('./imgs/holoware.png')} alt="Holoware Pricing" width="400" height="90"/>
                            <hr/>
                            <h4>Comprehensive Warranty Letter</h4>
                            <h4>TO WHOMSOEVER IT MAY CONCERN</h4>
                            </div>
                            <div className="content">
                                <p>Sub: Comprehensive Warranty Letter</p>
                                <p>GEM Number: {datas.sno}</p>
                                <p>Dated: {datas.date}</p>
                                <p>Model Number: {datas.model}</p>

                                <p>
                                This is to certify that <b>Holoware</b> gives Comprehensive Warranty for model number <u>{datas.model}</u> for a period of <b>{datas.warranty} years.</b>
                                </p>
                                <br/><br/><br/><br/><br/>
                                 <div className="footer" >Yours Sincerely,<br/>
                                    For Holoware (A Unit of Jaikrishna Technology Private Limited),<br/><br/>
                                    
                                    {isVisible && (
                                    <div>
                                        <img src={archanasign} />
                                    </div>
                                    )}
                                    Name: Archana A<br/>
                                    Designation: Business Development Executive<br/>
                                    Full Address: No 2,Moondram Kattalai, Kundrathur Main Road,Chennai-600128 <br/>
                                    Tel: 1800-572-5882<br/>
                                    Date : {date.toLocaleDateString()}
                                    
                                 </div><br/><br/>
                                 
                            </div>
                            <div>
                                 <hr></hr>
                                 <p className='foter-text'>
                                    HOLOWARE - a unit of JaiKrishna Technology Private Limited<br/>
                                    No 2 Moondram Kattalai, Kundrathur Main Road, Chennai – 600128 <br/>
                                    Web: <a href="https://www.holoware.co">www.holoware.co</a> Phone: 1800-572-5882

                                    </p>

                                </div>
{/*
                            <PDFDownloadLink className='button' document={<PDFPreview data={datas} />} fileName='preview.pdf'>
                                {({ blob, url, loading, error }) =>
                                loading ? 'Loading document...' : 'Download PDF'
                                }
                            </PDFDownloadLink>

                            <button className='button' onClick={downloadPDF}>Download PDF</button>
                            */}
                            
                        </div>
                        <div>
                            <button className='button' onClick={downloadPDF}
                            disabled={!(loader===false)}>
                                {loader?(
                                    <span>Downloading</span>
                                ):(
                                    <span>Download</span>
                                )}
                            </button>

                        </div>
                        </>
                    ) : null}
                </div>
                
            </div>
        </div>

           {/* .......................back button */}
      <div style={{ textAlign: "center" }}>
        <Link to="/holoware_pricing">
          <button className="button">
            Go to back
          </button>
        </Link>
      </div>
        </div>
    );
}

export default WarrantyScreen;
