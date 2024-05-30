import React, { useState } from "react";
import { DateField } from "@mui/x-date-pickers/DateField";
import axios from "axios";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Autocomplete,
} from "@mui/material";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./madeinindia.css";
import sign from "./img/Archana-sign.png";
import madeinindia from "./img/madeinindia.png"
import holowarelogo from "./img/holoware.png";

function Madeinindia() {
  const [inputdata, setdata] = useState({
    gemno: "",
    gemcreateddate: "",
    issuedby: "",

    productdetailes: {
      processor: "",
      processornumber: "",
      ram: "",
      ramstorage: "",
      hdd: "",
      ssd: "",
      integrated: "Integrated",
      deticated: "",
      windowstype: "",
      motherboard: "",
      powersupply: "",
      warranty: "",
    },
    auth: "",
    percentage: "",
    locforproduct: "",
    creatername: "",
    currentdate: "",
    location: "",
    sealenable: "",
  });
  const [data, setdatas] = useState("");
  const [class2, setclass2] = useState(false);
  const [date, setdate] = useState(new Date());
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  const dropdownDatas = [
    {
      processor: ["i3", "i5", "i7", "i9"],
      processornumber: [12100, 12400, 12700, 10400, 10100],
      ram: ["8GB", "16GB", "32GB", "64GB"],
      ramtype: ["DDR4", "DDR5"],
      hdd: ["1TB", "2TB", "3TB", "4TB","Not Applicable"],
      ssd: ["NVME", "SATA","No SSD"],
      ssdstorage: ["256GB", "512GB", "1024GB"],
      graphics: ["Integrated", "Dedicated"],
      graphicsdescription: ["NUVUDA T400"],
      graphicsstorage: ["2GB", "4GB"],
      motherboard: ["H610", "H510", "B660", "Q670"],

      powersupply: [
        450, 550, 650, 750, 850, 950, 1000, 1100, 1200, 1300, 1400, 1500, 1600,
        1700, 1800, 1900, 2000,
      ],
    },
  ];

  if (inputdata.percentage >= 50) {
    console.log("tue");
    var status = true;
  } else if (inputdata.percentage < 20 && inputdata.percentage >= 50) {
    var status = true;
  }
  console.log(status);

  const con = (d) => {
    axios
      .post("http://localhost:8000/data", inputdata)
      .then((response) => {
        setdatas(response.data.data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    console.log(d);
  };
  const [loader, setloader] = useState(false);

  const downloadPDF = () => {
    const capture = document.querySelector("#right");
    setloader(true);
    html2canvas(capture, { scale: 4 }).then((canvas) => {
      const imgDate = canvas.toDataURL("img/png");
      const pdf = new jsPDF("p", "mm", "a4", true);
      /*const componentWidth = doc.internal.pageSize.getWidth();
            const componentHeight = doc.internal.pageSize.getHeight();
            doc.addImage(imgDate, 'PNG', 0, 0, componentWidth, componentHeight);
            setloader(false);
            doc.save('invoice.pdf');*/

      const imgWidth = 210; // A4 width in mm
      const pageHeight = 295; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgDate, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgDate, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      setloader(false);
      pdf.save("file.pdf");
    });
  };

  //-------------------------------

  return (
    <>
      <div id="body" style={{ textAlign: "left", display: "flex" }}>
        {/* <div id="left" style={{"float":"left","width":"30%","marginLeft":"8%","marginTop":"4%"}}> */}
        <div id="left">
          <label>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                console.log("Form submitted:", event, inputdata);
                con(inputdata);
              }}
            >
              <div className="form-container">
                {/* <TextField
                id="creatername"
                label="Creater Name"
                variant="outlined"
                name="creatername"
                sx={{ m: 1, width: "35ch" }}
                value={inputdata.creatername}
                onChange={(e) =>
                  setdata({ ...inputdata, creatername: e.target.value })
                }
              /> */}
                <FormControl sx={{ m: 1, width: "35ch" }}>
                  <InputLabel id="demo-simple-select-label">Name</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={inputdata.creatername}
                    label="creatername"
                    onChange={(e) =>
                      setdata({ ...inputdata, creatername: e.target.value })
                    }
                  >
                    <MenuItem value="Archana">Archana</MenuItem>
                    <MenuItem value="Sheik">Twenty</MenuItem>
                    <MenuItem value="Arun">Thirty</MenuItem>
                    <MenuItem value="Arun">Thirty</MenuItem>
                  </Select>
                </FormControl>

                <TextField
                  id="gemno"
                  label="Gem Number"
                  variant="outlined"
                  name="Gem Number"
                  sx={{ m: 1, width: "35ch" }}
                  value={inputdata.gemno}
                  onChange={(e) =>
                    setdata({ ...inputdata, gemno: e.target.value })
                  }
                />
                <TextField
                  id="date"
                  label="Gem Created Date"
                  variant="outlined"
                  name="gemcreatedate"
                  sx={{ m: 1, width: "35ch" }}
                  value={inputdata.gemcreateddate}
                  onChange={(e) =>
                    setdata({ ...inputdata, gemcreateddate: e.target.value })
                  }
                />
                <TextField
                  id="issuedby"
                  label="issuedby"
                  variant="outlined"
                  name="issuedby"
                  sx={{ m: 1, width: "35ch" }}
                  value={inputdata.issuedby}
                  onChange={(e) =>
                    setdata({ ...inputdata, issuedby: e.target.value })
                  }
                />
                <TextField
                  id=""
                  label="provider"
                  variant="outlined"
                  name="provider"
                  sx={{ m: 1, width: "35ch" }}
                  value={inputdata.auth}
                  onChange={(e) =>
                    setdata({ ...inputdata, auth: e.target.value })
                  }
                />
                <TextField
                  id="detailespercentage"
                  label="detailespercentage"
                  variant="outlined"
                  name="detailespercentage"
                  sx={{ m: 1, width: "35ch" }}
                  value={inputdata.percentage}
                  onChange={(e) =>
                    setdata({ ...inputdata, percentage: e.target.value })
                  }
                />

                {/* ---------------------------------- */}
                <b>Product Detailes</b>

                <FormControl sx={{ m: 1, width: "35ch" }}>
  <Autocomplete
    disablePortal
    id="combo-box-demo"
    value={inputdata.productdetailes.processor} // Ensure this is the correct path
    options={dropdownDatas[0].processor}
    sx={{ width: 300 }}
    onChange={(event, newValue) => {
      console.log("Selected processor:", newValue);
      setdata((prevState) => ({
        ...prevState,
        productdetailes: {
          ...prevState.productdetailes,
          processor: newValue, // Corrected to match the key used in value
        },
      }));
    }}
    isOptionEqualToValue={(option, value) => option === value}
    renderInput={(params) => (
      <TextField {...params} label="Processor" />
    )}
  />
</FormControl>

<FormControl sx={{ m: 1, width: "35ch" }}>
  <Autocomplete
    disablePortal
    id="combo-box-demo"
    value={inputdata.productdetailes.processornumber} // Ensure this is the correct path
    options={dropdownDatas[0].processornumber}
    sx={{ width: 300 }}
    onChange={(event, newValue) => {
      console.log("Selected processor:", newValue);
      setdata((prevState) => ({
        ...prevState,
        productdetailes: {
          ...prevState.productdetailes,
          processornumber: newValue, // Corrected to match the key used in value
        },
      }));
    }}
    isOptionEqualToValue={(option, value) => option === value}
    renderInput={(params) => (
      <TextField {...params} label="Processorname" />
    )}
  />
</FormControl>


                
<FormControl sx={{ m: 1, width: "35ch" }}>
  <Autocomplete
    disablePortal
    id="combo-box-demo"
    value={inputdata.productdetailes.ram} // Ensure this is the correct path
    options={dropdownDatas[0].ram}
    sx={{ width: 300 }}
    onChange={(event, newValue) => {
      console.log("Selected processor:", newValue);
      setdata((prevState) => ({
        ...prevState,
        productdetailes: {
          ...prevState.productdetailes,
          ram: newValue, // Corrected to match the key used in value
        },
      }));
    }}
    isOptionEqualToValue={(option, value) => option === value}
    renderInput={(params) => (
      <TextField {...params} label="Ram" />
    )}
  />
</FormControl>


<FormControl sx={{ m: 1, width: "35ch" }}>
  <Autocomplete
    disablePortal
    id="combo-box-demo"
    value={inputdata.productdetailes.ramtype} // Ensure this is the correct path
    options={dropdownDatas[0].ramtype}
    sx={{ width: 300 }}
    onChange={(event, newValue) => {
      console.log("Selected processor:", newValue);
      setdata((prevState) => ({
        ...prevState,
        productdetailes: {
          ...prevState.productdetailes,
          ramtype: newValue, // Corrected to match the key used in value
        },
      }));
    }}
    isOptionEqualToValue={(option, value) => option === value}
    renderInput={(params) => (
      <TextField {...params} label="ramtype" />
    )}
  />
</FormControl>

<FormControl sx={{ m: 1, width: "35ch" }}>
  <Autocomplete
    disablePortal
    id="combo-box-demo"
    value={inputdata.productdetailes.hdd} // Ensure this is the correct path
    options={dropdownDatas[0].hdd}
    sx={{ width: 300 }}
    onChange={(event, newValue) => {
      console.log("Selected processor:", newValue);
      setdata((prevState) => ({
        ...prevState,
        productdetailes: {
          ...prevState.productdetailes,
          hdd: newValue, // Corrected to match the key used in value
        },
      }));
    }}
    isOptionEqualToValue={(option, value) => option === value}
    renderInput={(params) => (
      <TextField {...params} label="hdd" />
    )}
  />
</FormControl>
<FormControl sx={{ m: 1, width: "35ch" }}>
  <Autocomplete
    disablePortal
    id="combo-box-demo"
    value={inputdata.productdetailes.ssd} // Ensure this is the correct path
    options={dropdownDatas[0].ssd}
    sx={{ width: 300 }}
    onChange={(event, newValue) => {
      console.log("Selected processor:", newValue);
      setdata((prevState) => ({
        ...prevState,
        productdetailes: {
          ...prevState.productdetailes,
          ssd: newValue, // Corrected to match the key used in value
        },
      }));
    }}
    isOptionEqualToValue={(option, value) => option === value}
    renderInput={(params) => (
      <TextField {...params} label="ssd" />
    )}
  />
</FormControl>
<FormControl sx={{ m: 1, width: "35ch" }}>
  <Autocomplete
    disablePortal
    id="combo-box-demo"
    value={inputdata.productdetailes.ssdstorage} // Ensure this is the correct path
    options={dropdownDatas[0].ssdstorage}
    sx={{ width: 300 }}
    onChange={(event, newValue) => {
      console.log("Selected processor:", newValue);
      setdata((prevState) => ({
        ...prevState,
        productdetailes: {
          ...prevState.productdetailes,
          ssdstorage: newValue, // Corrected to match the key used in value
        },
      }));
    }}
    isOptionEqualToValue={(option, value) => option === value}
    renderInput={(params) => (
      <TextField {...params} label="ssdstorage" />
    )}
  />
</FormControl>
<FormControl sx={{ m: 1, width: "35ch" }}>
  <Autocomplete
    disablePortal
    id="combo-box-demo"
    value={inputdata.productdetailes.graphics} // Ensure this is the correct path
    options={dropdownDatas[0].graphics}
    sx={{ width: 300 }}
    onChange={(event, newValue) => {
      console.log("Selected processor:", newValue);
      setdata((prevState) => ({
        ...prevState,
        productdetailes: {
          ...prevState.productdetailes,
          graphics: newValue, // Corrected to match the key used in value
        },
      }));
    }}
    isOptionEqualToValue={(option, value) => option === value}
    renderInput={(params) => (
      <TextField {...params} label="graphics" />
    )}
  />
</FormControl>
<FormControl sx={{ m: 1, width: "35ch" }}>
  <Autocomplete
    disablePortal
    id="combo-box-demo"
    value={inputdata.productdetailes.graphicsdescription} // Ensure this is the correct path
    options={dropdownDatas[0].graphicsdescription}
    sx={{ width: 300 }}
    onChange={(event, newValue) => {
      console.log("Selected processor:", newValue);
      setdata((prevState) => ({
        ...prevState,
        productdetailes: {
          ...prevState.productdetailes,
          graphicsdescription: newValue, // Corrected to match the key used in value
        },
      }));
    }}
    isOptionEqualToValue={(option, value) => option === value}
    renderInput={(params) => (
      <TextField {...params} label="graphicsdescription" />
    )}
  />
</FormControl>
<FormControl sx={{ m: 1, width: "35ch" }}>
  <Autocomplete
    disablePortal
    id="combo-box-demo"
    value={inputdata.productdetailes.graphicsstorage} // Ensure this is the correct path
    options={dropdownDatas[0].graphicsstorage}
    sx={{ width: 300 }}
    onChange={(event, newValue) => {
      console.log("Selected processor:", newValue);
      setdata((prevState) => ({
        ...prevState,
        productdetailes: {
          ...prevState.productdetailes,
          graphicsstorage: newValue, // Corrected to match the key used in value
        },
      }));
    }}
    isOptionEqualToValue={(option, value) => option === value}
    renderInput={(params) => (
      <TextField {...params} label="Processor" />
    )}
  />
</FormControl>





                <FormControl sx={{ m: 1, width: "35ch" }}>
                  <InputLabel id="demo-simple-select-label">
                    Windows Type
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={inputdata.productdetailes.windowstype}
                    label="Windows Type"
                    onChange={(e) =>
                      setdata((prevState) => ({
                        ...prevState,
                        productdetailes: {
                          ...prevState.productdetailes,
                          windowstype: e.target.value,
                        },
                      }))
                    }
                  >
                    <MenuItem value="windows10home">Windows 10 Home</MenuItem>
                    <MenuItem value="windows10pro">Windows 10 pro</MenuItem>
                    <MenuItem value="windows11home">Windows 11 Home</MenuItem>
                    <MenuItem value="windiows11pro"> Windows 11 Pro</MenuItem>
                  </Select>
                </FormControl>
                <FormControl sx={{ m: 1, width: "35ch" }}>
  <Autocomplete
    disablePortal
    id="combo-box-demo"
    value={inputdata.productdetailes.motherboard} // Ensure this is the correct path
    options={dropdownDatas[0].motherboard}
    sx={{ width: 300 }}
    onChange={(event, newValue) => {
      console.log("Selected processor:", newValue);
      setdata((prevState) => ({
        ...prevState,
        productdetailes: {
          ...prevState.productdetailes,
          motherboard: newValue, // Corrected to match the key used in value
        },
      }));
    }}
    isOptionEqualToValue={(option, value) => option === value}
    renderInput={(params) => (
      <TextField {...params} label="motherboard" />
    )}
  />
</FormControl>
                <FormControl sx={{ m: 1, width: "35ch" }}>
                  <InputLabel id="demo-simple-select-label">
                    Power Supply
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={inputdata.productdetailes.powersupply}
                    label="powersupply"
                    onChange={(e) =>
                      setdata((prevState) => ({
                        ...prevState,
                        productdetailes: {
                          ...prevState.productdetailes,
                          powersupply: e.target.value,
                        },
                      }))
                    }
                  >
                    {dropdownDatas[0].powersupply.map((value, index) => (
                      <MenuItem key={index} value={value}>
                        {value}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <TextField
                  id="gemno"
                  label="Warranty Type"
                  variant="outlined"
                  name="Warranty Type"
                  sx={{ m: 1, width: "35ch" }}
                  value={inputdata.productdetailes.warranty}
                  onChange={(e) =>
                    setdata((prevState) => ({
                      ...prevState,
                      productdetailes: {
                        ...prevState.productdetailes,
                        warranty: e.target.value,
                      },
                    }))
                  }
                />

                {/* <TextField
                            id=''
                            label=''
                            variant='outlined'
                            sx={{ m: 1, width: "35ch" }}
                            name=''
                            value={inputdata.creatername}
                            onChange={(e)=>setdata({...inputdata,:e.target.value})}
                        
                        /> 
                        <FormControl  sx={{ m: 1, width: "35ch" }} >
  <InputLabel id="demo-simple-select-label"></InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={inputdata.productdetailes.}
    label=""
    onChange={(e) =>
        setdata((prevState) => ({
            ...prevState,
            productdetailes: {
              ...prevState.productdetailes,
              : e.target.value,
            },
          }))
    }
  >
    <MenuItem value=""></MenuItem>
    <MenuItem value=""></MenuItem>
    <MenuItem value=""></MenuItem>
  </Select>
</FormControl>

                        
                        */}

                <Button variant="contained" type="submit">
                  sub
                </Button>
              </div>
            </form>
          </label>
        </div>
        <div id="right">
          <div id="content">
            <div id="headerlogo">
              <img src={holowarelogo} alt="holoware" />
            </div>
            <div id="cmpdetailes" style={{ textAlign: "left" }}>
              <b>
                {" "}
                REGISTERED ADDRESS:- No 2, Moondram Kattalai, Kundrathur Main
                Road, Chennai - 600128
              </b>
              <br />
              <b style={{ marginTop: "1px" }}>E-mail : info@holoware.co</b>
              <br></br>
              <b style={{ margin: "1px" }}>GSTIN- 33AAECJ8741L1Z9</b>
            </div>
            <div
              id="madeinindialogo"
              style={{ textAlign: "center", marginBottom: "40px" }}
            >
              <img src={madeinindia} alt="makeinindialogo" />
              <br /> <b>DECLARATION CERTIFICATE FOR LOCAL CONTENT</b>
            </div>
            <div id="gemno_date">
              <span style={{}}>
                <b id="gemno">IN RESPECT Tender/GEM No : </b>
                {data ? data.gemno : "{Gem NO}"}
              </span>
              <span style={{ textAlign: "right", marginLeft: "250px" }}>
                <b id="date">Dated:</b>
                {data.gemcreateddate
                  ? data.gemcreateddate
                  : "{gem created date}"}
                <br />
              </span>
            </div>
            <div id="issuedbywhom" style={{ marginTop: "10px" }}>
              <b>Issued to : </b>{" "}
              {data.issuedby ? data.issuedby : "{issued by}"}
            </div>

            <p>
              I, the undersigned,{" "}
              {data.creatername ? data.creatername : "{Creater Name }"} A do
              hereby declare, in my capacity as{" "}
              <u>{data.auth ? data.auth : "{gem auth person}"}</u> the
              following:
            </p>
            <br />
            <p>
              (a) The facts contained herein are within my own personal
              knowledge.{" "}
            </p>
            <p>
              (b) I have read and understood the requirement of local content
              (LC) and the same is specified as percentage calculated in
              accordance with the definition provided at clause 2 of revised
              Public Procurement (preference to Make in India) Order 2017.
            </p>
            <p>
              “Local content” as per above order means the amount of value added
              in India which shall be the total value of items procured
              (excluding net domestic indirect taxes) minus the value of
              imported content in the item (including all customs duties) as a
              proportion of the total value in percent.”
            </p>
            <br />
            <p>
              (c) I have satisfied myself that the goods/services/works to be
              delivered in terms of the above specified bid comply with the
              local content requirements as specified in the tender for ‘Class-
              I Local Supplier’ / ‘Class-II Local Supplier’, and as above.
            </p>
            <p style={{ marginTop: "10%" }}>
              (d) Public Procurement (preference to Make in India) Order 2017
            </p>
            <table border={1} cellPadding={10} cellSpacing={0}>
              <tr>
                <td style={{ width: "10%" }}>
                  <b>1.</b>
                </td>
                <td>
                  <p>Select one of the following only.</p>
                  <p>
                    1) Class-I Local Supplier{" "}
                    <b>{status ? <b>✓</b> : <b>-</b>}</b>
                  </p>
                  <p>
                    2) Class-II Local Supplier{" "}
                    <b>{!status ? <b>✓</b> : <b>-</b>}</b>
                  </p>
                  <p>
                    (Note: Class-II local supplier means a supplier or service
                    provider, whose goods, services or works offered for
                    procurement, has content more than 20% but less than 50%, as
                    defined under this order. If local content is more than or
                    equal to 50% then it is a class-I local supplier.)
                  </p>
                </td>
              </tr>
            </table>
            <br />
            <br />
            <div id="e-para" style={{ marginTop: "25%" }}>
              <p>
                (e) The local content calculated using the definition given
                above are as under:
              </p>
            </div>
            <table border="1" cellPadding={10} cellSpacing={0}>
              <tr>
                <td></td>
                <td>Local content calculated as above%(100%)</td>
                <td>
                  Location of value addition (Location shall be the
                  specifiedname of city or district, etc.Location as name of
                  country will beconsidered as ambiguous and suchbids shall be
                  rejected)
                </td>
              </tr>
              <tr>
                <td>
                  <b>
                    Intel Core{" "}
                    {data.productdetailes
                      ? data.productdetailes.processor
                      : "{Processor}"}{" "}
                         {data.productdetailes
                      ? data.productdetailes.processornumber
                      : "{Processornumber}"}{" "}
                    |  {data.productdetailes
                      ? data.productdetailes.ram
                      : "{ram storage}"}{" "}
                       {data.productdetailes
                      ? data.productdetailes.ramtype
                      : "{ram type}"}{" "}
                                             RAM| 
                                             {data.productdetailes
                      ? data.productdetailes.hdd
                      : "{hhd}"}{" "} SATA HDD+ {data.productdetailes
                        ? data.productdetailes.ssdstorage
                        : "{ssd storage}"}{" "} 
                         {data.productdetailes
                      ? data.productdetailes.ssd
                      : "{Processor}"}{" "} SSD
                    |integrated|
                    {data.productdetailes
                      ? data.productdetailes.windowstype
                      : "{windows type }"}
                    |
                    {data.productdetailes
                      ? data.productdetailes.motherboard
                      : "{mother board}"}
                    |
                    {data.productdetailes
                      ? data.productdetailes.powersupply
                      : "{Power Supply}"}
                    W|
                    {data.productdetailes
                      ? data.productdetailes.warranty
                      : "{year of warranty }"}{" "}
                    Onsite Warranty
                  </b>
                </td>
                <td>
                  <b>{data.percentage ? data.percentage : "{Percentage}"} %</b>
                </td>
                <td>Chennai</td>
              </tr>
            </table>

            <p>
              Local content percentage shall be declared item wise or tender
              wise strictly as per the terms of the tender/BID.
            </p>

            <div id="sealandsign"></div>
            <div id="signdetailes" style={{ marginBottom: "20px" }}>
              <img src={inputdata.creatername == "Archana" ? sign : null} />
              <p>{data.creatername ? data.creatername : "{Creater Name }"} </p>
              <p>
                Date:{day}/{month}/{year}
              </p>
              <p>Chennai-TN-India</p>
            </div>
            <span style={{ marginBottom: "20px" }}></span>
          </div>{" "}
          {/* content */}
        </div>{" "}
        {/* body */}
      </div>
      <Button variant="contained" onClick={downloadPDF}>
        Download
      </Button>
    </>
  );
}

export default Madeinindia;
