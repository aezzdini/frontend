import React, { useState, useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    IconButton,
    Input,
    Button,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Modal,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    FormHelperText,
    TablePagination
} from '@mui/material';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import ComponentSkeleton from './ComponentSkeleton';
import MainCard from 'components/MainCard';
import { UploadOutlined, RightOutlined, CloseCircleOutlined } from '@ant-design/icons';
import Search from 'layout/MainLayout/Header/HeaderContent/Search';
import tabMonths from 'res/months';
/****************************** Api*************** */
import { getPaySlipFromApi } from '../../api/ApiPaySlip';
import { getConsultantFromApi } from '../../api/ApiConsultant';
/****************************** Component*******************/
import DetailsPaySlip from './DetailsPaySlip';
export default function PaySlip() {
    /********* static Data for test  ******** */
    const staticData = [
        {
            id: '1',
            nameFile: ' Janv 2023',
            username: 'consultant1',
            grossSalary: '5522222 ', // Salaire brut
            netSalaryBeforeTax: '44444', // Salaire net avant IR
            incomeTax: '555555', // IR
            netSalary: '555', // Salaire net
            socialSecurityContributions: '555555555555', // Charges sociales
            employerSocialSecurityContributions: '55555', // Charges patronales
            professionalExpenses: '555555', // Frais professionnels
            taxesAndInsurance: '5555555', // Taxes et assurances
            managementFees: '4444', // Frais de gestion
            managementFeesPeriod: 'janv', // Période de frais de gestion (mois/année)
            payMonth: '1', // Mois du fiche de paie (1-12)
            payYear: '2023', // Année du fiche de paie
            invoice: '444', // Facture
            reserve: '5555555', // Réserve
            username: ''
        },
        {
            id: '2',
            nameFile: ' Févr 2023',
            username: 'consultant1',
            grossSalary: '5522222 ', // Salaire brut
            netSalaryBeforeTax: '44444', // Salaire net avant IR
            incomeTax: '555555', // IR
            netSalary: '555', // Salaire net
            socialSecurityContributions: '555555555555', // Charges sociales
            employerSocialSecurityContributions: '55555', // Charges patronales
            professionalExpenses: '555555', // Frais professionnels
            taxesAndInsurance: '5555555', // Taxes et assurances
            managementFees: '4444', // Frais de gestion
            managementFeesPeriod: 'janv', // Période de frais de gestion (mois/année)
            payMonth: '1', // Mois du fiche de paie (1-12)
            payYear: '2023', // Année du fiche de paie
            invoice: '444', // Facture
            reserve: '5555555', // Réserve
            username: ''
        },
        {
            id: '3',
            nameFile: ' Mai 2023',
            username: 'consultant1',
            grossSalary: '5522222 ', // Salaire brut
            netSalaryBeforeTax: '44444', // Salaire net avant IR
            incomeTax: '555555', // IR
            netSalary: '555', // Salaire net
            socialSecurityContributions: '555555555555', // Charges sociales
            employerSocialSecurityContributions: '55555', // Charges patronales
            professionalExpenses: '555555', // Frais professionnels
            taxesAndInsurance: '5555555', // Taxes et assurances
            managementFees: '4444', // Frais de gestion
            managementFeesPeriod: 'Mai', // Période de frais de gestion (mois/année)
            payMonth: '1', // Mois du fiche de paie (1-12)
            payYear: '2023', // Année du fiche de paie
            invoice: '444', // Facture
            reserve: '5555555', // Réserve
            username: ''
        },
        {
            id: '4',
            nameFile: ' Oct 2020',
            username: 'consultant1',
            grossSalary: '5522222 ', // Salaire brut
            netSalaryBeforeTax: '44444', // Salaire net avant IR
            incomeTax: '555555', // IR
            netSalary: '555', // Salaire net
            socialSecurityContributions: '555555555555', // Charges sociales
            employerSocialSecurityContributions: '55555', // Charges patronales
            professionalExpenses: '555555', // Frais professionnels
            taxesAndInsurance: '5555555', // Taxes et assurances
            managementFees: '4444', // Frais de gestion
            managementFeesPeriod: 'Oct', // Période de frais de gestion (mois/année)
            payMonth: '1', // Mois du fiche de paie (1-12)
            payYear: '2020', // Année du fiche de paie
            invoice: '444', // Facture
            reserve: '5555555', // Réserve
            username: ''
        },
        {
            id: '5',
            nameFile: ' Nov 2022',
            username: 'consultant1',
            grossSalary: '5522222 ', // Salaire brut
            netSalaryBeforeTax: '44444', // Salaire net avant IR
            incomeTax: '555555', // IR
            netSalary: '555', // Salaire net
            socialSecurityContributions: '555555555555', // Charges sociales
            employerSocialSecurityContributions: '55555', // Charges patronales
            professionalExpenses: '555555', // Frais professionnels
            taxesAndInsurance: '5555555', // Taxes et assurances
            managementFees: '4444', // Frais de gestion
            managementFeesPeriod: 'Nov', // Période de frais de gestion (mois/année)
            payMonth: '1', // Mois du fiche de paie (1-12)
            payYear: '2022', // Année du fiche de paie
            invoice: '444', // Facture
            reserve: '5555555', // Réserve
            username: ''
        },
        {
            id: '6',
            nameFile: ' Déc 2023',
            username: 'consultant1',
            grossSalary: '5522222 ', // Salaire brut
            netSalaryBeforeTax: '44444', // Salaire net avant IR
            incomeTax: '555555', // IR
            netSalary: '555', // Salaire net
            socialSecurityContributions: '555555555555', // Charges sociales
            employerSocialSecurityContributions: '55555', // Charges patronales
            professionalExpenses: '555555', // Frais professionnels
            taxesAndInsurance: '5555555', // Taxes et assurances
            managementFees: '4444', // Frais de gestion
            managementFeesPeriod: 'Déc', // Période de frais de gestion (mois/année)
            payMonth: '1', // Mois du fiche de paie (1-12)
            payYear: '2023', // Année du fiche de paie
            invoice: '444', // Facture
            reserve: '5555555', // Réserve
            username: ''
        },
        {
            id: '7',
            nameFile: ' Janv 1999',
            username: 'consultant1',
            grossSalary: '5522222 ', // Salaire brut
            netSalaryBeforeTax: '44444', // Salaire net avant IR
            incomeTax: '555555', // IR
            netSalary: '555', // Salaire net
            socialSecurityContributions: '555555555555', // Charges sociales
            employerSocialSecurityContributions: '55555', // Charges patronales
            professionalExpenses: '555555', // Frais professionnels
            taxesAndInsurance: '5555555', // Taxes et assurances
            managementFees: '4444', // Frais de gestion
            managementFeesPeriod: 'janv', // Période de frais de gestion (mois/année)
            payMonth: '1', // Mois du fiche de paie (1-12)
            payYear: '1999', // Année du fiche de paie
            invoice: '444', // Facture
            reserve: '5555555', // Réserve
            username: 'takoua.saadaouii@gmail.com'
        }
    ];

    /********* reset  ******** */
    const [selectedValueMonths, setSelectedValueMonths] = useState('');
    const [selectedValueYears, setSelectedValueYears] = useState('');
    const handleResetMonths = () => {
        selectedValueMonths('');
    };
    const handleResetYears = () => {
        selectedValueYears('');
    };

    /********* Dialog  ******** */
    const [open, setOpen] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [selected, setSelected] = useState([]);
    const handleClose = () => {
        setSelectedItemId(null);
        setOpen(false);
    };

    /********* Date  ******** */
    const [searchYears, setSearchYears] = useState('');
    const [searchMonths, setSearchMonths] = useState('');
    const handleChangeMonths = (event) => {
        setSearchMonths(event.target.value);
    };
    const handleChangeYears = (event) => {
        setSearchYears(event.target.value);
    };
    /********* file  ******** */

    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];

        if (selectedFile && selectedFile.type === 'application/pdf') {
            setFile(selectedFile);
            setError(null);
        } else {
            setFile(null);
            setError('Please select a PDF file');
        }
    };

    const handleFileUpload = (e) => {
        e.preventDefault();

        if (file) {
            // Handle file upload
            console.log('file hello', file);
            const formData = new FormData();
            formData.append('file', file);
            formData.append('nameFolder', 'Factures');
            axios
                .post('${process.env.REACT_APP_URL}/payslip/file', formData, { headers: { Authorization: `Bearer ${token}` } })
                .then((res) => {
                    console.log(res.data);
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    };

    /********* filter years  ******** */
    const currentYear = new Date().getFullYear();
    const tabyears = Array.from({ length: currentYear - 1900 }, (v, i) => i + 1900 + 1);
    const filteredYears = tabyears.filter((y) => y <= currentYear);

    /*************************filter consultant   ******************** */
    const [searchConsultant, setSearchConsultant] = useState('');

    const handleChangeConsultant = (event) => {
        setSearchConsultant(event.target.value);
    };
    /****************condition ******** */
    var token = localStorage.getItem('token');
    var profile = localStorage.getItem('profile');
    var username = localStorage.getItem('username');
    var userId = localStorage.getItem('userId');
    const dispatch = useDispatch();
    /**************list Consultant */
    const listConsultant = useSelector((state) => state.menu.consultant);
    useEffect(() => {
        dispatch(getConsultantFromApi());
    }, [dispatch]);
    useEffect(() => {
        console.log(listConsultant, 'listConsultant useEffect');
    }, [listConsultant]);

    /*****payslip *********/

    const paySlip = useSelector((state) => state.menu.paySlip);
    useEffect(() => {
        dispatch(getPaySlipFromApi());
    }, [dispatch]);

    useEffect(() => {
        console.log(paySlip, 'paySlip useEffect');
    }, [paySlip]);

    const [consultant, setConsultant] = useState();
    const [paySlipConsultant, setpaySlipConsultant] = useState([]);

    const fetchPayslips = async () => {
        const response = await axios.get(`${process.env.REACT_APP_URL}/consultants/userId/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        console.log(searchConsultant, 'cond brforesearchConsultant');

        let idConst = response.data.id;

        const responsee = await axios.get(`${process.env.REACT_APP_URL}/payslips/consultantid/${idConst}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        console.log(responsee.data, 'heloooooooo cond1');
        setpaySlipConsultant(responsee.data);

        console.log(searchConsultant, 'cond 2searchConsultant');

        console.log(responsee.data, 'helo');
        console.log('paySlipConsultant', paySlipConsultant);
    };

    const fetchPayslipsForAdmin = async () => {
        console.log(searchConsultant, 'searchConsultantsearchConsultant');
        const responsee = await axios.get(`${process.env.REACT_APP_URL}/payslips/consultantid/${searchConsultant}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        console.log(responsee.data, 'heloooooooo cond1');
        setpaySlipConsultant(responsee.data);

        console.log(searchConsultant, 'cond 2searchConsultant');

        console.log(responsee.data, 'helo');
        console.log('paySlipConsultant', paySlipConsultant);
    };
    useEffect(() => {
        if (profile == 'ADMIN') {
            fetchPayslipsForAdmin();
        } else {
            fetchPayslips();
        }
    }, []);

    console.log('paySlipConsultant', paySlipConsultant);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, paySlipConsultant.length - page * rowsPerPage);
    return (
        <>
            <ComponentSkeleton>
                <MainCard>
                    <h2 style={{ textAlign: 'center' }}> Mes fichiers </h2>
                    <table style={{ width: '100%' }}>
                        <tr>
                            <td>
                                {' '}
                                <div>
                                    <div
                                        style={{
                                            marginRight: '50px',
                                            fontSize: '15px',
                                            padding: '6px 16px',
                                            borderRadius: '4px',
                                            color: '#fff',
                                            backgroundColor: ' #faad14',
                                            width: '280px'
                                        }}
                                    >
                                        Historique de mes Fiches de paie <RightOutlined />
                                    </div>
                                    <Table>
                                        <TableBody>
                                         
                                                {
                                                    <div
                                                        style={{
                                                            display: 'flex',
                                                            flexWrap: 'wrap',
                                                            justifyContent: ' space-around',

                                                            paddingTop: '25px'
                                                        }}
                                                    >
                                                        {
                                                        //paySlipConsultant &&
                                                           // paySlipConsultant
                                                                // staticData
                                                                (rowsPerPage > 0
                                                                    ? paySlipConsultant.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                                    : paySlipConsultant
                                                                  )
                                                                .filter((el) => {
                                                                    if (searchMonths) {
                                                                        console.log(el.month, 'aaa');
                                                                        console.log(searchMonths, 'gggg');
                                                                        return el.month.toLowerCase().includes(searchMonths.toLowerCase());
                                                                    } else {
                                                                        return el;
                                                                    }
                                                                })
                                                                .filter((el) => {
                                                                    if (searchYears) {
                                                                        return el.year.toString().includes(searchYears);
                                                                    } else {
                                                                        return el;
                                                                    }
                                                                })
                                                                .map((el) => (
                                                                
                                                                           <TableRow  key={el.id}>
                                                                        <TableCell>
                                                                            {' '}
                                                                            <DetailsPaySlip data={el} />
                                                                        </TableCell>
                                                                        </TableRow>
                                                                  
                                                                ))}
                                                    </div>
                                                }
                                      
                                            {emptyRows > 0 && (
<TableRow style={{ height: 53 * emptyRows }}>
<TableCell colSpan={10} />
</TableRow>
)}
                                        </TableBody>
                                    </Table>

                                    <TablePagination
                                       rowsPerPageOptions={[5, 10, 25]}
                                       component="div"
                                       count={paySlipConsultant.length}
                                       rowsPerPage={rowsPerPage}
                                       page={page}
                                       onPageChange={handleChangePage}
                                       onRowsPerPageChange={handleChangeRowsPerPage}
                                    />
                                </div>
                            </td>
                            <td>
                                {' '}
                                <div style={{ borderLeft: ' 4px double #1890ff', paddingLeft: '35px' }}>
                                    <div
                                        style={{
                                            marginRight: '50px',
                                            fontSize: '15px',
                                            padding: '6px 16px',
                                            borderRadius: '4px',
                                            color: '#fff',
                                            backgroundColor: ' #faad14',
                                            width: '190px',
                                            marginBottom: '15px'
                                        }}
                                    >
                                        Période <RightOutlined />
                                    </div>

                                    <FormControl fullWidth style={{ display: 'flex', flexFlow: 'row wrap' }}>
                                        <InputLabel id="demo-simple-select-label-year">Année</InputLabel>

                                        <Select
                                            labelId="demo-simple-select-label-year"
                                            id="demo-simple-select"
                                            value={searchYears}
                                            label="Année"
                                            style={{ marginBottom: '15px', width: '150px' }}
                                            onChange={handleChangeYears}
                                        >
                                            {filteredYears.map((el) => (
                                                <MenuItem value={el}>{el}</MenuItem>
                                            ))}
                                        </Select>
                                        <Button onClick={handleChangeYears}>
                                            <CloseCircleOutlined style={{ fontSize: '24px' }} />
                                        </Button>
                                    </FormControl>

                                    <FormControl fullWidth style={{ display: 'flex', flexFlow: 'row wrap' }}>
                                        <InputLabel id="demo-simple-select-label">Mois</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            style={{ width: '150px' }}
                                            value={searchMonths}
                                            label="Mois"
                                            onChange={handleChangeMonths}
                                        >
                                            {tabMonths.map((el) => (
                                                <MenuItem value={el.value}>{el.contnue}</MenuItem>
                                            ))}
                                        </Select>
                                        <Button onClick={handleChangeMonths}>
                                            {' '}
                                            <CloseCircleOutlined style={{ fontSize: '24px' }} />
                                        </Button>
                                    </FormControl>
                                </div>
                            </td>
                        </tr>
                    </table>
                </MainCard>
            </ComponentSkeleton>
        </>
    );
}