import React, { useState, useEffect } from 'react';
import axios from 'axios';
// material-ui
import {
    Avatar,
    AvatarGroup,
    Box,
    Button,
    Grid,
    List,
    ListItemAvatar,
    ListItemButton,
    ListItemSecondaryAction,
    ListItemText,
    MenuItem,
    Stack,
    TextField,
    Typography
} from '@mui/material';

// project import
import OrdersTable from './OrdersTable';
import IncomeAreaChart from './IncomeAreaChart';
import MonthlyBarChart from './MonthlyBarChart';
import ReportAreaChart from './ReportAreaChart';
import SalesColumnChart from './SalesColumnChart';
import MainCard from 'components/MainCard';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';

// assets
import { GiftOutlined, MessageOutlined, SettingOutlined } from '@ant-design/icons';
import avatar1 from 'assets/images/users/avatar-1.png';
import avatar2 from 'assets/images/users/avatar-2.png';
import avatar3 from 'assets/images/users/avatar-3.png';
import avatar4 from 'assets/images/users/avatar-4.png';
import SalesColumnChartConReg from './SalesColumnChartConsultantByAdresse';
import IncomeAreaChartPayslip from './IncomeAreaChartPayslip';

import SalesColumnChartNatureMission from './SalesColumnChartNatureMission';
import SalesColumnChartTypeMission from './SalesColumnChartTypeMission';
/*****************Api ***********************************/
import {getConsultantFromApi}from '../../api/ApiConsultant'
import SalesColumnChartTypeActivityCount from './SalesColumnChartTypeActivityCount';
// avatar style
const avatarSX = {
    width: 36,
    height: 36,
    fontSize: '1rem'
};

// action style
const actionSX = {
    mt: 0.75,
    ml: 1,
    top: 'auto',
    right: 'auto',
    alignSelf: 'flex-start',
    transform: 'none'
};

// sales report status
const status = [
    {
        value: 'today',
        label: 'Today'
    },
    {
        value: 'month',
        label: 'This Month'
    },
    {
        value: 'year',
        label: 'This Year'
    }
];

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const DashboardDefault = () => {
    const [value, setValue] = useState('today');
    const [slot, setSlot] = useState('week');




       /***** consultant Total **********/
       const [consultantTotal, setConsultantTotal] = useState([]);
    useEffect(() => {
        const fetchConsultants = async () => {
          const token = localStorage.getItem('token');
          console.log("this is tooken"+token)
          const response = await axios.get('${process.env.REACT_APP_URL}/consultants/',{
            headers:{
              Authorization:`Bearer ${token}`,
            }
          });



          setConsultantTotal(response.data);
          //console.log(response.data, "ffff")
        };
    
        fetchConsultants();
      }, []);

 
     // let result = consultantTotal.group(({ ville }) => ville);
     
         /***** client Total **********/
         const [clientTotal, setClientTotal] = useState([]);
      useEffect(() => {
        const fetchConsultants = async () => {
          const token = localStorage.getItem('token');
          console.log("this is tooken"+token)
          const response = await axios.get(`${process.env.REACT_APP_URL}/client/`,{
            headers:{
              Authorization:`Bearer ${token}`,
            }
          });
          setClientTotal(response.data);
         // console.log(response.data, "ffff")
        };
    
        fetchConsultants();
      }, []);



      /***** Mission Total **********/
      const [missionTotal, setMissionTotal] = useState([]);
      useEffect(() => {
        const fetchConsultants = async () => {
          const token = localStorage.getItem('token');
          console.log("this is tooken"+token)
          const response = await axios.get(`${process.env.REACT_APP_URL}/missions/`,{
            headers:{
              Authorization:`Bearer ${token}`,
            }
          });
          setMissionTotal(response.data);
          console.log(response.data, "MissionTotalf")
        };
    
        fetchConsultants();
      }, []);
      /**** Payslip total ******/
      const [payslipTotal, setPayslipTotal] = useState([]);
      useEffect(() => {
        const fetchConsultants = async () => {
          const token = localStorage.getItem('token');
          console.log("this is tooken"+token)
          const response = await axios.get(`${process.env.REACT_APP_URL}/payslips/`,{
            headers:{
              Authorization:`Bearer ${token}`,
            }
          });
          setPayslipTotal(response.data);
          console.log(response.data, "payslipTotal")
        };
    
        fetchConsultants();
      }, []);

    //console.log("hello consultant total",consultantTotal)
    //console.log("helloclientTotal",clientTotal)
   // console.log("hellomissionTotal",missionTotal)
    //console.log("hellopayslipTotal",payslipTotal)
    return (
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
           
            {/* row 1 */}
            <Grid item xs={12} sx={{ mb: -2.25 }}>
                <Typography variant="h5">Dashboard</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <AnalyticEcommerce title="Client total " count={clientTotal.length} percentage={clientTotal.length/100} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <AnalyticEcommerce title="Consultant total "  count={consultantTotal.length}  percentage={consultantTotal.length/100}/>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <AnalyticEcommerce title="Mission total"count={missionTotal.length}   percentage={missionTotal.length/100} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <AnalyticEcommerce title="Fiche de paie total  "count={payslipTotal.length} percentage={payslipTotal.length/100}/>
            </Grid>

            <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />

            <Grid item xs={12} md={7} lg={12}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <Typography variant="h5">Fiche de paie total par mois</Typography>
                    </Grid>
                </Grid>
                <MainCard content={false} sx={{ mt: 1.5 }}>
                    <Box sx={{ pt: 1, pr: 2 }}>
                        <IncomeAreaChartPayslip slot={slot} />
                    </Box>
                </MainCard>
            </Grid>
            <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />

            <Grid item xs={12} md={7} lg={18}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <Typography variant="h5"> Consultant total par region</Typography>
                    </Grid>
                </Grid>
                <MainCard sx={{ mt: 1.75 }}>
                    <Stack spacing={1.5} sx={{ mb: -12 }}>
                        <Typography variant="h6" color="secondary">
                            Consultant total
                        </Typography>
                    </Stack>
                    <SalesColumnChartConReg />
                </MainCard>
            </Grid>
            <Grid item xs={12} md={7} lg={18}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <Typography variant="h5"> Activites total par type</Typography>
                    </Grid>
                </Grid>
                <MainCard sx={{ mt: 1.75 }}>
                    <Stack spacing={1.5} sx={{ mb: -12 }}>
                        <Typography variant="h6" color="secondary">
                            Activities total 
                        </Typography>
                    </Stack>
                     <SalesColumnChartTypeActivityCount />

                </MainCard>
            </Grid>
        
            <Grid item xs={8} md={7} lg={5}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <Typography variant="h5"> Mission total par type </Typography>
                    </Grid>
                </Grid>
                <MainCard sx={{ mt: 1.75 }}>
                    <Stack spacing={1.5} sx={{ mb: -12 }}>
                        <Typography variant="h6" color="secondary">
                            Mission total
                        </Typography>
                    </Stack>
                    <SalesColumnChartTypeMission />
                </MainCard>
                
            </Grid>
        </Grid>
    );
};

export default DashboardDefault;