import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Table, TableHead, TableRow, TableCell, TablePagination, TableBody, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from '../../../node_modules/axios/index';
import EditActivityPopup from './EditActivityPopUp';
import MissionService from 'pages/services/MissionService';
import PrestationsService from 'pages/services/PrestationsService';


const MissionActivitiesList = (isAdded) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { missionId } = useParams();
  const [activities, setActivities] = useState([]);
  const token = localStorage.getItem("token");
  const [editActivity, setEditActivity] = useState(null);
  const [openPopup, setOpenPopup] = useState(false);
  const fetchActivities = async () => {
    const response = await MissionService.fetchActivityByIdMission(missionId);
   
    setActivities(response);
  };
   const handleDelete =  (id) => {
    const response = PrestationsService.deletePrestation(id);
    if (response.ok) {
      setActivities(activities.filter((activity) => activity.id !== id));
    }
    fetchActivities();
  };
  useEffect(() => {
  
    fetchActivities();
  }, [isAdded]);

 
  const handlePopupClose = () => {
    setOpen(false);
    onClose();
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const months = [
    { value: 1, label: 'Janvier' },
    { value: 2, label: 'Février' },
    { value: 3, label: 'Mars' },
    { value: 4, label: 'Avril' },
    { value: 5, label: 'Mai' },
    { value: 6, label: 'Juin' },
    { value: 7, label: 'Juillet' },
    { value: 8, label: 'Août' },
    { value: 9, label: 'Septembre' },
    { value: 10, label: 'Octobre' },
    { value: 11, label: 'Novembre' },
    { value: 12, label: 'Décembre' },
  ];

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, activities.length - page * rowsPerPage);

  if (activities.length === 0) {
    return <div style={{textAlign: 'center', fontWeight:'bold', fontSize:"16px"}}><br/>Pas de prestations ajoutées</div>;
  }
  return (
    <div>
      <br/>
      <p style={{backgroundColor: '#D7E9F7', textAlign: 'center',  fontSize: '24px', color: '#393053',  fontFamily: 'sans-serif'}}>Liste des préstations</p>
      <Table style={{backgroundColor: '#EEEEEE' , borderCollapse: 'collapse', borderRadius: '0.7em', overflow: 'hidden'}}>
        <TableHead >
          <TableRow>
            
            <TableCell sx={{ fontSize: '15px', fontWeight: 'bolder' ,textAlign: 'center'}}>Mois</TableCell>
            <TableCell sx={{ fontSize: '15px', fontWeight: 'bolder' ,textAlign: 'center'}}>Année</TableCell>
            <TableCell sx={{ fontSize: '15px', fontWeight: 'bolder' ,textAlign: 'center'}}>Valeur</TableCell>
            <TableCell sx={{ fontSize: '15px', fontWeight: 'bolder',textAlign: 'center' }}>Nom</TableCell>
            <TableCell sx={{ fontSize: '15px', fontWeight: 'bolder' ,textAlign: 'center'}}>Type</TableCell>
            <TableCell sx={{ fontSize: '15px', fontWeight: 'bolder' ,textAlign: 'center'}}>Nature</TableCell>
            <TableCell sx={{ fontSize: '15px', fontWeight: 'bolder',textAlign: 'center' }}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
          (rowsPerPage > 0
            ? activities.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : activities
          ).map((activity) => (
            <TableRow key={activity.id}>
             
              <TableCell style={{ textAlign: 'center' }}>{months.find((month) => month.value === activity.month)?.label}</TableCell>
              <TableCell style={{ textAlign: 'center' }}>{activity.year}</TableCell>
              <TableCell style={{ textAlign: 'center' }}>{activity.valeur}</TableCell>
              <TableCell style={{ textAlign: 'center' }}>{activity.name}</TableCell>
              <TableCell style={{ textAlign: 'center' }}>{activity.type?.name}</TableCell>
              <TableCell style={{ textAlign: 'center' }}>{activity.nature?.name}</TableCell>
              <TableCell style={{ textAlign: 'center' }}>
              <IconButton
                aria-label="Edit"
                style={{ color: 'blue' ,textAlign: 'center' }}
                onClick={() => {
                  setEditActivity(activity);
                  setOpenPopup(true);
                }}
              >
                <EditIcon />
              </IconButton>

                <IconButton
                  aria-label="Delete"
                  style={{ color: 'red'}}
                  onClick={() => handleDelete(activity.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
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
count={activities.length}
rowsPerPage={rowsPerPage}
page={page}
onPageChange={handleChangePage}
onRowsPerPageChange={handleChangeRowsPerPage}
/>
      {editActivity && (
  <EditActivityPopup
    activity={editActivity}
    openPopup={openPopup}
    setOpenPopup={setOpenPopup}
    setActivities={setActivities}
    onClose={handlePopupClose}
  />
)}
    </div>
  );
};

export default MissionActivitiesList;
