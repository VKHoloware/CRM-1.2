import React, { useState , useEffect, useRef } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import './MIIScreenStyle.css';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import archanasign from'./imgs/Archana-sign.png';
import { Checkbox } from '@mui/material';


function MIIScreen({userData}) { 
  const [data, setData] = useState({ companyname: '', 
                                        sno: '', date: '', 
                                        model: '', chassis: '', 
                                        chassisfan: '' , powerbtn: ''
                                        , usb2: '', usb3: ''
                                        , screw: '', rivit: ''
                                        , bush: '', pcbboard: ''
                                        , pcbwiring: '', motherboard: ''
                                        });
  const [datas, setDatas] = useState(null);
//-----------------------------current date
  var [date,setDate] = useState(new Date());
  const navigate = useNavigate();
  useEffect(() => {
      var timer = setInterval(()=>setDate(new Date()), 1000 )
      return function cleanup() {
          clearInterval(timer)
      }
  
  });
//--------------------------------------------

useEffect(() => {
    if (!userData) {
      navigate('/');
    }
  }, [userData, navigate]);


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
        const pdf = new jsPDF('p', 'mm', 'a4', true);
        /*const componentWidth = doc.internal.pageSize.getWidth();
        const componentHeight = doc.internal.pageSize.getHeight();
        doc.addImage(imgDate, 'PNG', 0, 0, componentWidth, componentHeight);
        setloader(false);
        doc.save('invoice.pdf');*/

        const imgWidth = 210; // A4 width in mm
        const pageHeight = 295; // A4 height in mm
        const imgHeight = canvas.height * imgWidth / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgDate, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgDate, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
        }
        setloader(false);
        pdf.save('file.pdf');

    })
}

//------------------------------------


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
                        <h3> MII Certificate </h3><br/>
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
                        <h5>Local Content Percentage</h5>
                        <TextField
                            id='chassis'
                            label='Chassis'
                            variant='outlined'
                            type='number'
                            name='chassis'
                            value={data.chassis}
                            onChange={handlechange}
                            InputProps={{ endAdornment: <InputAdornment position='end'>%</InputAdornment> }}
                        />{' '}

                        <TextField
                            id='chassisfan'
                            label='Chassis Fan'
                            variant='outlined'
                            type='number'
                            name='chassisfan'
                            value={data.chassisfan}
                            onChange={handlechange}
                            InputProps={{ endAdornment: <InputAdornment position='end'>%</InputAdornment> }}
                        />{' '}
                        <br />

                        
                        <TextField
                            id='powerbtn'
                            label='Power Button'
                            variant='outlined'
                            type='number'
                            name='powerbtn'
                            value={data.powerbtn}
                            onChange={handlechange}
                            InputProps={{ endAdornment: <InputAdornment position='end'>%</InputAdornment> }}
                        />{' '}
                        <br />
                        
                        <TextField
                            id='usb2'
                            label='USB 2.0'
                            variant='outlined'
                            type='number'
                            name='usb2'
                            value={data.usb2}
                            onChange={handlechange}
                            InputProps={{ endAdornment: <InputAdornment position='end'>%</InputAdornment> }}
                        />{' '}
                        <br />
                        <TextField
                            id='usb3'
                            label='USB 3.0'
                            variant='outlined'
                            type='number'
                            name='usb3'
                            value={data.usb3}
                            onChange={handlechange}
                            InputProps={{ endAdornment: <InputAdornment position='end'>%</InputAdornment> }}
                        />{' '}
                        <br />
                        <TextField
                            id='screw'
                            label='Screws'
                            variant='outlined'
                            type='number'
                            name='screw'
                            value={data.screw}
                            onChange={handlechange}
                            InputProps={{ endAdornment: <InputAdornment position='end'>%</InputAdornment> }}
                        />{' '}
                        <br />

                        <TextField
                            id='rivit'
                            label='Rivit'
                            variant='outlined'
                            type='number'
                            name='rivit'
                            value={data.rivit}
                            onChange={handlechange}
                            InputProps={{ endAdornment: <InputAdornment position='end'>%</InputAdornment> }}
                        />{' '}
                        <br />

                        <TextField
                            id='bush'
                            label='Bottom Bush'
                            variant='outlined'
                            type='number'
                            name='bush'
                            value={data.bush}
                            onChange={handlechange}
                            InputProps={{ endAdornment: <InputAdornment position='end'>%</InputAdornment> }}
                        />{' '}
                        <br />

                        <TextField
                            id='pcbboard'
                            label='PCB Board'
                            variant='outlined'
                            type='number'
                            name='pcbboard'
                            value={data.pcbboard}
                            onChange={handlechange}
                            InputProps={{ endAdornment: <InputAdornment position='end'>%</InputAdornment> }}
                        />{' '}
                        <br />

                        <TextField
                            id='pcbwiring'
                            label='PCB Wiring'
                            variant='outlined'
                            type='number'
                            name='pcbwiring'
                            value={data.pcbwiring}
                            onChange={handlechange}
                            InputProps={{ endAdornment: <InputAdornment position='end'>%</InputAdornment> }}
                        />{' '}
                        <br />

                        <TextField
                            id='motherboard'
                            label='Motherboard'
                            variant='outlined'
                            type='number'
                            name='motherboard'
                            value={data.motherboard}
                            onChange={handlechange}
                            InputProps={{ endAdornment: <InputAdornment position='end'>%</InputAdornment> }}
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
                <div className='preview_container sheet'>
                    {datas && Object.values(datas).some((value) => value === '') ? (
                        <p>Loading...</p>
                    ) : datas ? (
                        <>
                        {/* Display preview content here */}
                        <div className="preview" >
                            
                            <div className="header">
                            <img src={require('./imgs/holoware.png')} alt="Holoware Pricing" width="400" height="90"/>
                            <hr/>
                            <h4>Annexure- XI</h4>
                            <h4>Self-Certification under preference to Make in India order Certificate</h4>
                            </div>
                            <div className="p-right">
                            <p>Date:{datas.date}</p></div>
                            <div className="p-desciption">
                            <p>In line with Government Public Procurement Order No. P-45021/2/2017-PP (BE-II) dated 04.06.2020 issued by Ministry of Commerce and Industry and subsequent amendment of the order dt. 16th September 2020, we hereby certify that we, Jaikrishna Technology Pvt Ltd are local supplier meeting the requirement of minimum local content (*) (i.e. amount of value addition) 51% as deﬁned in above orders for the item/s against Enquiry/Tender Ref.No. GEM/{datas.sno}</p>
                            </div>
                            <div className="content">

                                <p>Details/Breakup of local content & location at which local value addition is made for the item/s are as follows:</p>
                                
{/*-------------------------------------table---------------------------------------------- */}

<table className='center' border="1" cellPadding="10" cellSpacing="0">
        <colgroup>
            <col width="60"/>
            <col width="277"/>
            <col width="230"/>
        </colgroup>
      <thead>
        <tr>
          <th>S.No</th>
          <th>Description</th>
          <th>Local content Percentage</th>
        </tr>
      </thead>
      <tbody>
            <tr>
                <td>
                    <p dir="ltr">
                        1
                    </p>
                </td>
                <td>
                    <p dir="ltr">
                        Chassis
                    </p>
                </td>
                <td>
                    <p dir="ltr">
                        {datas.chassis}%
                    </p>
                </td>
            </tr>
            <tr>
                <td>
                    <p dir="ltr">
                        2
                    </p>
                </td>
                <td>
                    <p dir="ltr">
                        Chassis Fan
                    </p>
                </td>
                <td>
                    <p dir="ltr">
                        {datas.chassisfan}%
                    </p>
                </td>
            </tr>
            <tr>
                <td>
                    <p dir="ltr">
                        3
                    </p>
                </td>
                <td>
                    <p dir="ltr">
                        Power button
                    </p>
                </td>
                <td>
                    <p dir="ltr">
                        {datas.powerbtn}%
                    </p>
                </td>
            </tr>
            <tr>
                <td>
                    <p dir="ltr">
                        4
                    </p>
                </td>
                <td>
                    <p dir="ltr">
                        USB 2.0
                    </p>
                </td>
                <td>
                    <p dir="ltr">
                        {datas.usb2}%
                    </p>
                </td>
            </tr>
            <tr>
                <td>
                    <p dir="ltr">
                        5
                    </p>
                </td>
                <td>
                    <p dir="ltr">
                        USB 3.0
                    </p>
                </td>
                <td>
                    <p dir="ltr">
                        {datas.usb3}%
                    </p>
                </td>
            </tr>
            <tr>
                <td>
                    <p dir="ltr">
                        6
                    </p>
                </td>
                <td>
                    <p dir="ltr">
                        Screws
                    </p>
                </td>
                <td>
                    <p dir="ltr">
                        {datas.screw}%
                    </p>
                </td>
            </tr>
            <tr>
                <td>
                    <p dir="ltr">
                        7
                    </p>
                </td>
                <td>
                    <p dir="ltr">
                        Rivit
                    </p>
                </td>
                <td>
                    <p dir="ltr">
                        {datas.rivit}%
                    </p>
                </td>
            </tr>
            <tr>
                <td>
                    <p dir="ltr">
                        8
                    </p>
                </td>
                <td>
                    <p dir="ltr">
                        Bottom Bush
                    </p>
                </td>
                <td>
                    <p dir="ltr">
                        {datas.bush}%
                    </p>
                </td>
            </tr>
            <tr>
                <td>
                    <p dir="ltr">
                        9
                    </p>
                </td>
                <td>
                    <p dir="ltr">
                        PCB Board
                    </p>
                </td>
                <td>
                    <p dir="ltr">
                        {datas.pcbboard}%
                    </p>
                </td>
            </tr>
            <tr>
                <td>
                    <p dir="ltr">
                        10
                    </p>
                </td>
                <td>
                    <p dir="ltr">
                        PCB Wiring
                    </p>
                </td>
                <td>
                    <p dir="ltr">
                        {datas.pcbwiring}%
                    </p>
                </td>
            </tr>
            <tr>
                <td>
                    <p dir="ltr">
                        11
                    </p>
                </td>
                <td>
                    <p dir="ltr">
                        Motherboard
                    </p>
                </td>
                <td>
                    <p dir="ltr">
                        {datas.motherboard}%
                    </p>
                </td>
            </tr>
      </tbody>
      </table>

{/*----------------------------------------------------------------------------------- */}
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
    );
}

export default MIIScreen;
