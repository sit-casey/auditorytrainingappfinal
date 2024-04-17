import React from 'react';
import Nav from "../../components/nav/Nav";
function ReportsPage2() {
    // Inline CSS for basic styling
    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh', // Full screen height
        textAlign: 'center',
        background: '-webkit-linear-gradient(45deg, #49a09d, #5f2c82)',
        background: 'linear-gradient(45deg, #49a09d, #5f2c82)',
    };

    const textStyle = {
        fontSize: '100px',
        color: 'white', // Dark grey text
    };

    const secondaryTextStyle = {
        marginTop: '20px',
        fontSize: '15px',
        color: 'white', // Lighter grey text
    };

    return (
      <>
      <Nav></Nav>
      <div style={containerStyle}>
            <h1 style={textStyle}>Coming Soon!</h1>
            <p style={secondaryTextStyle}>We are working hard to launch our new site. Stay tuned!</p>
        </div>
      </>
        
    );
}

export default ReportsPage2;

  
  
  
  
  
  {/* 
import React, { useState, useEffect, useRef } from "react";
import useFetch from "../../components/custHooks/useFetch";
import Nav from "../../components/nav/Nav";
import classes from "./reportsPage2.module.css";
import Button from "react-bootstrap/Button";

//import reportIcon from "../../assets/images/report_Icon.jpg";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton, TwitterIcon, FacebookIcon, WhatsappIcon } from "react-share";

function ReportsPage2() {
  const [detectionData, setDetectionData] = useState([]);
  const [discriminationData, setDiscriminationData] = useState([]);
  const [identificationData, setIdentificationData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(0);
  const csvLink = useRef(); // Create a reference to the CSVLink component

  const [[activityData], isPending, err] = useFetch("allActivitiesObj", "allGamesObj");
  const firstUpdate = useRef(true);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);

      try {
        const data = await activityData;
        if (data) {
          setDetectionData(data.activitydetection?.completions || []);
          setDiscriminationData(data.lingActivitydiscrimination?.completions || []);
          setIdentificationData(data.lingActivityidentification?.completions || []);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }

      setIsLoading(false);
    };

    if (firstUpdate.current) {
      firstUpdate.current = false;
    } else {
      getData();
    }
  }, [activityData]);

  const handlePageChange = (page) => {
    if (page >= 0 && page < totalPageCount) {
      setCurrentPage(page);
    }
  };

  const totalPageCount = 3;

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.green,
      color: theme.palette.common.white,
      fontSize: 18,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 16,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const renderRows = (data, activityType) => {
    const uniqueRows = new Set();
    return data.map((item) => {
      const [date, time] = item.date.split(", "); // Splitting date and time
      const formattedRow = {
        activityType: activityType,
        date: date,
        time: time,
        score: item.score,
      };

      const rowKey = `${date}-${time}`; // Create a unique key for the row based on date and time

      if (!uniqueRows.has(rowKey)) {
        uniqueRows.add(rowKey);
        return formattedRow;
      }

      return null; // Return null for duplicate rows
    }).filter(Boolean); // Filter out any null (duplicate) rows
  };

  const rowsDetection = renderRows(detectionData, "Detection");
  const rowsDiscrimination = renderRows(discriminationData, "Discrimination");
  const rowsIdentification = renderRows(identificationData, "Identification");

  // Determine the rows to be displayed based on the current page
  let tableRows = [];
  if (currentPage === 0) {
    tableRows = rowsDetection;
  } else if (currentPage === 1) {
    tableRows = rowsDiscrimination;
  } else if (currentPage === 2) {
    tableRows = rowsIdentification;
  }

  // Function to get the concatenated data from all three pages
  const getAllTableData = () => {
    const allRowsDetection = renderRows(detectionData, "Detection");
    const allRowsDiscrimination = renderRows(discriminationData, "Discrimination");
    const allRowsIdentification = renderRows(identificationData, "Identification");

    return [...allRowsDetection, ...allRowsDiscrimination, ...allRowsIdentification];
  };

  const handleExport = () => {
    const headers = [
      { label: "Activity Type", key: "activityType" },
      { label: "Date", key: "date" },
      { label: "Time", key: "time" },
      { label: "Score", key: "score" },
    ];

    const dataToExport = getAllTableData();

    const csvContent = [headers.map((h) => h.label), ...dataToExport.map((row) => Object.values(row))].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const csvURL = window.URL.createObjectURL(blob);
    const tempLink = document.createElement("a");
    tempLink.href = csvURL;
    tempLink.setAttribute("download", "activity_data.csv");
    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);
  };

  return (
    <>
    <Nav />
    
    {detectionData.length > 0 && (
        <div>
          <div>
            
          </div>
          <div className={classes.header}>
            <h1>Reports</h1>
          </div>
          <div className={classes.btnparent}>
            <div>
              <Button as="input" type="button" value="Export" className={classes.button} onClick={handleExport} />
            </div>
            <div className={classes.socialbtn}>
              <TwitterShareButton url={"https://your-url.com"} title={"Check out my activity history!"} className="twitter-share-button">
                <TwitterIcon round={true} size={"30px"} />
              </TwitterShareButton>
              <FacebookShareButton url={"https://your-url.com"} quote={"Check out my activity history!"}>
                <FacebookIcon round={true} size={"30px"} />
              </FacebookShareButton>
              <WhatsappShareButton url={"https://your-url.com"} quote={"Check out my activity history!"}>
                <WhatsappIcon round={true} size={"30px"} />
              </WhatsappShareButton>
            </div>
          </div>

          <React.Fragment>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Activity Type</StyledTableCell>
                    <StyledTableCell>Date</StyledTableCell>
                    <StyledTableCell>Time</StyledTableCell>
                    <StyledTableCell>Score</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tableRows.map((row) => (
                    <StyledTableRow key={row.date}>
                      <StyledTableCell size="small">{row.activityType}</StyledTableCell>
                      <StyledTableCell>{row.date}</StyledTableCell>
                      <StyledTableCell>{row.time}</StyledTableCell>
                      <StyledTableCell>{row.score}%</StyledTableCell> 
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <div style={{ display: "flex", justifyContent: "center", margin: "20px" }}>
              <div className={classes.pagination}>
                {Array.from({ length: totalPageCount }, (_, index) => (
                  <button
                    key={index}
                    className={currentPage === index ? classes.activePage : classes.page}
                    onClick={() => handlePageChange(index)}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </div>
          </React.Fragment>

          {isLoading && <p>Loading data...</p>}
        </div>
      )} 
  
    
    
    </>
    
  );
}

export default ReportsPage2;

*/}














