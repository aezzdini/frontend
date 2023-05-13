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
    FormHelperText
} from '@mui/material';
import { DownloadOutlined, RightOutlined, CloseCircleOutlined } from '@ant-design/icons';
export default function DetailsPaySlip(props) {
    const { data } = props; 

    const [open, setOpen] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [selected, setSelected] = useState([]);
    const handleClose = () => {
        setSelectedItemId(null);
        setOpen(false);
    };

  return (
    <div>

<Button
                                            style={{ marginTop: '10px',width:"150px" }}
                                            variant="contained"
                                            onClick={() => {
                                              
                                                setOpen(true);
                                            }}
                                        >
                                           <span>{props.data.month}  </span> <span> {props.data.year  }</span> 
                                        </Button>
                                        <Dialog open={open} onClose={handleClose}>
                                        
                                            <DialogTitle> <Button>{props.data.month  }{props.data.year  } <DownloadOutlined  style={{ fontSize: '20px', color: '#08c' }} /></Button></DialogTitle>
                                            <DialogContent>
                                                <div>
                                                    <Table>
                                                        <TableHead>
                                                            <TableRow>
                                                                <TableCell>Détails du fiche de paie</TableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                        
                                                            <TableRow>
                                                                <TableCell>Salaire brut </TableCell>

                                                                <TableCell>{props.data.grossSalary  }</TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell> Salaire net avant IR</TableCell>

                                                                <TableCell>{props.data.netSalaryBeforeTax  }</TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell>IR</TableCell>

                                                                <TableCell>{props.data.incomeTax  }</TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell>Salaire net</TableCell>

                                                                <TableCell>{props.data.netSalary  }</TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell> Charges sociales</TableCell>

                                                                <TableCell>{props.data.socialSecurityContributions  }</TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell>Charges patronales</TableCell>

                                                                <TableCell>{props.data.employerSocialSecurityContributions  }</TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell> Frais professionnels</TableCell>

                                                                <TableCell>{props.data.professionalExpenses  }</TableCell>
                                                            </TableRow>

                                                            <TableRow>
                                                                <TableCell> Taxes et assurances</TableCell>

                                                                <TableCell>{props.data.taxesAndInsurance  }</TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell> Frais de gestion</TableCell>

                                                                <TableCell>{props.data.managementFees  }</TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell> Provision pour congés payés</TableCell>

                                                                <TableCell>{props.data.provisionPaidleave  }</TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell>  Montant des chèques cadeaux distribués</TableCell>

                                                                <TableCell>{props.data.giftVouchers  }</TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell>  Montant des frais de formation</TableCell>

                                                                <TableCell>{props.data.trainingExpenses  }</TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell> Montant des achats de matériel</TableCell>

                                                                <TableCell>{props.data.equipmentPurchases  }</TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell> Mois du fiche de paie (1-12)</TableCell>

                                                                <TableCell>{props.data.month  }</TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell> Année du fiche de paie</TableCell>

                                                                <TableCell>{props.data.year  }</TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell>Facture</TableCell>

                                                                <TableCell>{props.data.OtherInvoice  }</TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell>Réserve</TableCell>

                                                                <TableCell>{props.data.reserve  }</TableCell>
                                                            </TableRow>
                                                        </TableBody>
                                                    </Table>
                                                </div>
                                            </DialogContent>
                                            <DialogActions>
                                    
                                         
                                           <Button onClick={handleClose}>Cancel</Button>
                                     
                                               
                                            </DialogActions>
                                        </Dialog>

        
    </div>
  )
}