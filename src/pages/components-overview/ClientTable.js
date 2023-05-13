import React, { useState } from 'react';
import {Link, useNavigate } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
} from '@mui/material';
import { Delete, Visibility, Edit } from '@mui/icons-material';
import Clients from './Prestation';


const ClientTable = ({ clients }) => {
  const navigate = useNavigate();

  const handleViewClient = (id) => {
    navigate('/activity');
  };

  /*const handleDeleteMission = (missionId) => {
    // implement delete mission logic here
    const newList = Missions.filter((l)=> l.missionId !== missionId);
    setList(newList);
  };*/
  function handleDeleteClient(id) {
    // implement delete mission logic here
    const newList = Clients.filter((l)=> l.missionId !== id);
    setList(newList);
  };

  const handleUpdateClient = (missionId) => {
    // implement update mission logic here
  };
  return (
    <div>
      <Table>
        <TableHead>
          <TableRow  >
            <TableCell sx={{fontSize: '15px', fontWeight: 'bolder'}}>ID</TableCell>
            <TableCell sx={{fontSize: '15px', fontWeight: 'bolder'}}>Entreprise</TableCell>
            <TableCell sx={{fontSize: '15px', fontWeight: 'bolder'}}>Nom du contrat</TableCell>
            <TableCell sx={{fontSize: '15px', fontWeight: 'bolder'}}>Num de sireN</TableCell>
            <TableCell sx={{fontSize: '15px', fontWeight: 'bolder'}}>Num de sireT</TableCell>
            <TableCell sx={{fontSize: '15px', fontWeight: 'bolder'}}>Email</TableCell>
            <TableCell sx={{fontSize: '15px', fontWeight: 'bolder'}}>Téléphone</TableCell>
            <TableCell sx={{fontSize: '15px', fontWeight: 'bolder'}}>Ville</TableCell>
            <TableCell sx={{fontSize: '15px', fontWeight: 'bolder', paddingLeft: '40px'}}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody >
          {clients.map((client) => (
            <TableRow key={client.id}>
              <TableCell>{client.id}</TableCell>
              <TableCell >{client.entreprise}</TableCell>
              <TableCell>{client.nomContrat}</TableCell>
              <TableCell>{client.sireN}</TableCell>
              <TableCell>{client.sireT}</TableCell>
              <TableCell>{client.email}</TableCell>
              <TableCell>{client.tel}</TableCell>
              <TableCell>{client.ville}</TableCell>
              <TableCell>
              <IconButton
                  aria-label="view mission"
                  onClick={() => handleViewClient(mission.id)}
                  sx={{ color: 'green' }}
              >
                  <Visibility />
                </IconButton>
                <IconButton
                  aria-label="edit mission"
                  onClick={() => handleUpdateClient(mission.id)}
                  sx={{ color: 'blue' }}
                >
                  <Edit />
                </IconButton>
                <IconButton
                  aria-label="delete mission"
                  onClick={() => handleDeleteClient(mission.id)}
                  sx={{ color: 'red' }}
                >
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ClientTable;
