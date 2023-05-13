import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer,TablePagination, TableHead, TableRow, Paper } from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { HiOutlineDownload } from 'react-icons/hi';
import { AiOutlinePlus } from 'react-icons/ai';
import axios from 'axios';
import { useEffect } from 'react';


function FicheDePaieTable() {
    const userId= localStorage.getItem('userId')
    const userprofile = localStorage.getItem('profile');
    const [isAdmin, setIsAdmin] = useState(userprofile === 'ADMIN'); // Check if user is an admin
    // Get the user type from local storage

    const token = localStorage.getItem('token'); // Get the token from local storage
console.log("tokeeeeeeeeen",token)
console.log("**************",userId)

    const [isExpanded, setIsExpanded] = useState(false);
    const [consultants, setConsultants] = useState([]);
    const [isExpandedAutres, setIsExpandedAutres] = useState(false);
    const [yearsList, setYearsList] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [page, setPage] = useState(0);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
      };
    
 
// GET  CONSULTANTS
const getConsultants = async () => {
    const response = await axios.get(`${process.env.REACT_APP_URL}/consultants/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    setConsultants(response.data);
    console.log("ALL OCNSULTANT",consultants)

  };



    const getfichedepaieparUserId = async (userId) => {

        let response;
        if (isAdmin) {




          // If user is an admin, get all payslips for all consultants
          response = await axios.get(`${process.env.REACT_APP_URL}/payslips/`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log("allpayslips",response.data)

          
// if( id!= null){
//         fetchconsultantbyid(id); }
           
        
        }  
        
        else {


        const responsee = await axios.get(`${process.env.REACT_APP_URL}/consultants/userId/${userId}`, {
            headers:{
              Authorization:`Bearer ${token}`,
            }
          });

          const consultantid = responsee.data.id
           response = await axios.get(`${process.env.REACT_APP_URL}/payslips/consultantid/${consultantid}`, {
            headers:{
              Authorization:`Bearer ${token}`,
            }
          });


        
        }
          

         const payslips = response.data
         console.log("tous les fiche de paie du consultnat:",payslips)
         const years ={}

          payslips.forEach((payslip) => {
            if (!years[payslip.year]) {
              years[payslip.year] = { year: payslip.year, month: [] };
            }

            years[payslip.year].month.push({
                month: payslip.month,
                consultantId: payslip.consultantId,
                grossSalary: payslip.grossSalary,
                netSalaryBeforeTax:payslip.netSalaryBeforeTax,
                incomeTax: payslip.incomeTax,
                netSalary: payslip.netSalary,
                socialSecurityContributions: payslip.socialSecurityContributions,
                employerSocialSecurityContributions: payslip.employerSocialSecurityContributions,
                professionalExpenses: payslip.professionalExpenses,
                taxesAndInsurance: payslip.taxesAndInsurance,
                managementFees: payslip.managementFees,
                provisionPaidleave: payslip.provisionPaidleave,
                giftVouchers: payslip.giftVouchers,
                trainingExpenses: payslip.trainingExpenses,
                equipmentPurchases: payslip.equipmentPurchases,
                otherInvoice: payslip.otherInvoice,
                reserve: payslip.reserve,
                docId:payslip.docId
              });
            });
          
            const yearsList = Object.values(years);
            console.log("??????????????????????",yearsList)
            console.log("??????????????????length????",yearsList.length)

            return yearsList;
          };

          

      useEffect(() => {
        const fetchData = async () => {
          const data = await getfichedepaieparUserId(userId);
          setYearsList(data);
          setyearSelectionnee(data[data.length - 3]?.year || 0);
          getConsultants();

        };
        fetchData();
      }, [userId]);
    //   console.log("************LISTYEAR*****",yearsList)
     console.log("*******************",yearsList)

     console.log("********",yearsList[yearsList.length - 1])

      

      
    
   
    const [yearSelectionnee, setyearSelectionnee] = useState(yearsList[yearsList.length - 3]?.year || 0); // l'année 2023 sera sélectionnée par défaut

    const handeyearState = (year) => {
        if (yearSelectionnee === year) {
            return setyearSelectionnee(null);
        } else {    
            return setyearSelectionnee(year);
        }
    };

    const afficherDonneesmonth =(month) =>{

        alert(
            `salaireNet:${month.grossSalary}\nNet avant IR : ${month.netSalaryBeforeTax}`
            )
    }

   

  

    return (
        <TableContainer component={Paper} Style={{ maxWidth: 800, margin: 'auto', marginTop: 50 }}>
            <Table aria-label="fiche de paie table">
                <TableHead>
                    <>
                        <TableRow>
                            <TableCell style={{ fontWeight: 'bold' }} rowSpan={3}>
                                Année
                            </TableCell>
                            <TableCell
                                align={isExpanded ? 'center' : 'left'}
                                onClick={() => {
                                    setIsExpandedAutres(false);
                                    setIsExpanded(!isExpanded);
                                }}
                                colsPan={isExpandedAutres ? 13 : 10}
                                style={{ position: 'relative', fontWeight: 'bold', cursor: 'pointer' }}
                            >
                            Cout
                                {isExpanded ? (
                                    <span style={{ position: 'absolute', top: '18px', marginLeft: '10px' }}>
                                        <ExpandLessIcon fontSize="medium" />
                                    </span>
                                ) : (
                                    <span style={{ position: 'absolute', top: '18px', marginLeft: '10px' }}>
                                        <ExpandMoreIcon fontSize="medium" />
                                    </span>
                                )} 
                            </TableCell>
                            <TableCell></TableCell>
                            <TableCell rowSpan={3} style={{ fontWeight: 'bold' }}>
                                Facture
                            </TableCell>
                            <TableCell rowSpan={3} style={{ fontWeight: 'bold' }}>
                                Réserve
                            </TableCell>
                            {
                            (userprofile === 'ADMIN' && yearSelectionnee !== undefined && yearSelectionnee !== null) ?
                            <TableCell rowSpan={3} style={{ fontWeight: 'bold' }}>
                               nom et prénom 
                                </TableCell>
                                : <></>
                                }
                        </TableRow>
                        {isExpanded && (
                            <>
                                <TableRow>
                                    <>
                                        <TableCell rowSpan={2} style={{ fontWeight: 'bold' }}>
                                            Salaire brut{' '}
                                        </TableCell>
                                        <TableCell rowSpan={2} style={{ fontWeight: 'bold' }}>
                                            Net avant IR{' '}
                                        </TableCell>
                                        <TableCell rowSpan={2} style={{ fontWeight: 'bold' }}>
                                            IR{' '}
                                        </TableCell>
                                        <TableCell rowSpan={2} style={{ fontWeight: 'bold' }}>
                                            net après IR{' '}
                                        </TableCell>
                                        <TableCell rowSpan={2} style={{ fontWeight: 'bold' }}>
                                            Charge sociale{' '}
                                        </TableCell>
                                        <TableCell rowSpan={2} style={{ fontWeight: 'bold' }}>
                                            Charge patronale{' '}
                                        </TableCell>
                                        <TableCell rowSpan={2} style={{ fontWeight: 'bold' }}>
                                            Frais professionnels{' '}
                                        </TableCell>
                                        <TableCell rowSpan={2} style={{ fontWeight: 'bold' }}>
                                            Taxe et assurance{' '}
                                        </TableCell>
                                        <TableCell rowSpan={2} style={{ fontWeight: 'bold' }}>
                                            Frais de gestion{' '}
                                        </TableCell>
                                        <TableCell rowSpan={2} style={{ fontWeight: 'bold' }}>
                                            Provision CP{' '}
                                        </TableCell>
                                        <TableCell colSpan={isExpandedAutres ? 3 : 0} style={{ fontWeight: 'bold' }}>
                                             <span
                                                aria-hidden="true"
                                                style={{ display: 'flex', justifyContent: isExpandedAutres ? 'center' : 'left', alignItems: 'center', cursor: 'pointer', gap: '6px' }}
                                                onClick={() => setIsExpandedAutres(!isExpandedAutres)}
                                            >
                                                Autres
                                                <AiOutlinePlus size={18} />
                                            </span> 
                                        </TableCell>
                                    </>
                                </TableRow>
                                 {isExpanded && isExpandedAutres && (
                                    <TableRow>
                                        <TableCell style={{ fontWeight: 'bold' }}>Cheque Cadeau</TableCell>
                                        <TableCell style={{ fontWeight: 'bold' }}>Formation</TableCell>
                                        <TableCell style={{ fontWeight: 'bold' }}>Achat matériel</TableCell>
                                    </TableRow>
                                )} 
                            </>
                        )}
                    </>
                </TableHead>
                <TableBody>
                    {yearsList.map((year) => {
                



       return (
                        <>
                            <TableRow hover onClick={() => handeyearState(year.year)} sx={{ '&:hover': { cursor: 'pointer' } }}>

                                
                                <TableCell sx={{ postion: 'relative' }}>
                                    {year.year}
                                    {yearSelectionnee === year.year ? (
                                        <span style={{ position: 'absolute', top: '18px', marginLeft: '10px' }}>
                                            <ExpandMoreIcon fontSize="medium" />
                                        </span>
                                    ) : (
                                        <span style={{ position: 'absolute', top: '18px', marginLeft: '10px' }}>
                                            <ExpandLessIcon fontSize="medium" />
                                        </span>
                                    )}

                                    
                                </TableCell>
                                

                                  {isExpanded ? (
                                     
                                    <React.Fragment> 
                                        <TableCell>{year.month.reduce((acc, cur) => acc + cur.grossSalary, 0)}</TableCell>
                                        <TableCell>{year.month.reduce((acc, cur) => acc + cur.netSalaryBeforeTax, 0)}</TableCell>
                                        <TableCell>{year.month.reduce((acc, cur) => acc + cur.incomeTax, 0)}</TableCell>
                                        <TableCell>{year.month.reduce((acc, cur) => acc + cur.netSalary, 0)}</TableCell>
                                        <TableCell>{year.month.reduce((acc, cur) => acc + cur.socialSecurityContributions, 0)}</TableCell>
                                        <TableCell>{year.month.reduce((acc, cur) => acc + cur.employerSocialSecurityContributions, 0)}</TableCell>
                                        <TableCell>{year.month.reduce((acc, cur) => acc + cur.professionalExpenses, 0)}</TableCell>
                                        <TableCell>{year.month.reduce((acc, cur) => acc + cur.taxesAndInsurance, 0)}</TableCell>
                                        <TableCell>{year.month.reduce((acc, cur) => acc + cur.managementFees, 0)}</TableCell>
                                        <TableCell>{year.month.reduce((acc, cur) => acc + cur.provisionPaidleave, 0)}</TableCell>
                                        {isExpandedAutres && (
                                            <>
                                                <TableCell>{year.month.reduce((acc, cur) => acc + cur.giftVouchers, 0)}</TableCell>
                                                <TableCell>{year.month.reduce((acc, cur) => acc + cur.trainingExpenses, 0)}</TableCell>
                                                <TableCell>{year.month.reduce((acc, cur) => acc + cur.equipmentPurchases, 0)}</TableCell>
                                            </>
                                        )} 
                                    </React.Fragment>
                                  ) 
                                 : (
                                     <TableCell colspan={isExpandedAutres ? 13 : 10}>  
                                     {year.month.reduce((acc, cur) => acc + cur.grossSalary, 0) + 
       year.month.reduce((acc, cur) => acc + cur.netSalaryBeforeTax, 0) +
       year.month.reduce((acc, cur) => acc + cur.incomeTax, 0) +
       year.month.reduce((acc, cur) => acc + cur.netSalary, 0) +
      year.month.reduce((acc, cur) => acc + cur.socialSecurityContributions, 0)+
       year.month.reduce((acc, cur) => acc + cur.employerSocialSecurityContributions, 0)+
       year.month.reduce((acc, cur) => acc + cur.professionalExpenses, 0)+
       year.month.reduce((acc, cur) => acc + cur.taxesAndInsurance, 0)+
       year.month.reduce((acc, cur) => acc + cur.managementFees, 0)+
       year.month.reduce((acc, cur) => acc + cur.provisionPaidleave, 0)+
       year.month.reduce((acc, cur) => acc + cur.giftVouchers, 0)+
       year.month.reduce((acc, cur) => acc + cur.trainingExpenses, 0)+
       year.month.reduce((acc, cur) => acc + cur.equipmentPurchases, 0)
       
       }

                                      </TableCell>
                                )
                                } 
                                <TableCell></TableCell>
                                <TableCell>{year.month.reduce((acc, cur) => acc + cur.otherInvoice, 0)}</TableCell> 
                                <TableCell>{year.month.reduce((acc, cur) => acc + cur.reserve, 0)}</TableCell>


                            </TableRow>
                           
                            {yearSelectionnee === year.year &&
                                year.month.map((month) => {

                                     // Find the corresponding consultant object by matching the consultantId
                             const consultant = consultants.find((c) => c.id === month.consultantId);
                                return (
                                    
                                    <TableRow
                                        sx={{ 'background-color': '#f5f5f5' }}
                                        key={`${year.year}-${month.month}`}
                                        onClick={() => afficherDonneesmonth(month)}
                                    >
                                        <TableCell sx={{ position: 'relative' }}>
                                            {month.month}
                                            <span
                                                aria-hidden="true"
                                                style={{ position: 'absolute', top: '12px', marginLeft: 'px', cursor: 'pointer' }}
                                                onClick={() => handleDownloadFicheDePaie(year.month.docId)}
                                            >
                                                <HiOutlineDownload size={18} />
                                            </span>

                                        </TableCell>
                                        {isExpanded ? (
                                            <> 
                                                <TableCell>{month.grossSalary}</TableCell>
                                                <TableCell>{month.netSalaryBeforeTax}</TableCell>
                                                <TableCell>{month.incomeTax}</TableCell>
                                                <TableCell>{month.netSalary}</TableCell>
                                                <TableCell>{month.socialSecurityContributions}</TableCell>
                                                <TableCell>{month.employerSocialSecurityContributions}</TableCell>
                                                <TableCell>{month.professionalExpenses}</TableCell>
                                                <TableCell>{month.taxesAndInsurance}</TableCell>
                                                <TableCell>{month.managementFees}</TableCell>
                                                <TableCell>{month.provisionPaidleave}</TableCell>
                                                {isExpandedAutres && (
                                                    <>
                                                        <TableCell>{month.giftVouchers}</TableCell>
                                                        <TableCell>{month.trainingExpenses}</TableCell>
                                                        <TableCell>{month.equipmentPurchases}</TableCell>
                                                    </>
                                                )}
                                            </>
                                        ) : (
                                            <TableCell colspan={isExpandedAutres ? 13 : 10}> 
                                           {[
                                         month.grossSalary,
                                           month.netSalaryBeforeTax,
                                          month.incomeTax,
                                          month.netSalary,
                                          month.socialSecurityContributions,
                                           month.employerSocialSecurityContributions,
                                           month.professionalExpenses,
                                           month.taxesAndInsurance,
                                          month.managementFees,
                                          month.provisionPaidleave,
                                           month.giftVouchers,
                                           month.trainingExpenses,
                                            month.equipmentPurchases,
                                            ].reduce((total, currentValue) => total + currentValue)}
                                            </TableCell>
                                        )}
                                        <TableCell></TableCell>
                                        <TableCell>{month.otherInvoice}</TableCell>
                                        <TableCell>{month.reserve}</TableCell>

                                        {/* <TableCell>{ fetchconsultantbyid(month.consultantId)}</TableCell> */}
                                        {
                                        (userprofile === 'ADMIN') ? 
                                        <TableCell>{consultant ? consultant.firstName : ""}  {consultant ? consultant.lastName : ""}  </TableCell>
                                        :

                                         <></>
                                        }

                                    </TableRow>
)
})}
                        </>
)})}
                </TableBody>
            </Table>
            {/* <TablePagination
rowsPerPageOptions={[5, 10, 25]}
component="div"
count={yearsList.length}
rowsPerPage={rowsPerPage}
page={page}
onPageChange={handleChangePage}
onRowsPerPageChange={handleChangeRowsPerPage}
/> */}
        </TableContainer>
    )
    
}
export default FicheDePaieTable;