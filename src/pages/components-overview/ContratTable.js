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
import Contrats from './PrestationCon';


const ContratTable = ({ Contrats }) => {
  const navigate = useNavigate();

  const handleViewContrat = (id) => {
    navigate('/activity');
  };

  /*const handleDeleteMission = (missionId) => {
    // implement delete mission logic here
    const newList = Missions.filter((l)=> l.missionId !== missionId);
    setList(newList);
  };*/
  function handleDeleteContrat(id) {
    // implement delete mission logic here
    const newList = Contrats.filter((l)=> l.missionId !== id);
    setList(newList);
  };

  const handleUpdateContrat = (missionId) => {
    // implement update mission logic here
  };
  return (
    <div>
      <Table>
        <TableHead>
          <TableRow  >
            <TableCell sx={{fontSize: '15px', fontWeight: 'bolder'}}>ID</TableCell>
            <TableCell sx={{fontSize: '15px', fontWeight: 'bolder'}}>Type De Contrat</TableCell>
            <TableCell sx={{fontSize: '15px', fontWeight: 'bolder'}}>Nom De Socite</TableCell>
            <TableCell sx={{fontSize: '15px', fontWeight: 'bolder'}}>Regles</TableCell>
            <TableCell sx={{fontSize: '15px', fontWeight: 'bolder'}}>Prénom Client</TableCell>
            <TableCell sx={{fontSize: '15px', fontWeight: 'bolder'}}>Consultant</TableCell>
            <TableCell sx={{fontSize: '15px', fontWeight: 'bolder'}}>RefContrat</TableCell>
            <TableCell sx={{fontSize: '15px', fontWeight: 'bolder'}}>Adresse</TableCell>
            <TableCell sx={{fontSize: '15px', fontWeight: 'bolder'}}>DateDebut</TableCell>
            <TableCell sx={{fontSize: '15px', fontWeight: 'bolder', paddingLeft: '40px'}}>DateDeFin</TableCell>
          </TableRow>
        </TableHead>
        <TableBody >
          {Contrats.map((contrat) => (
            <TableRow key={contrat.id}>
              <TableCell>{contrat.typedecontrat}</TableCell>
              <TableCell >{contrat.nomdesocite}</TableCell>
              <TableCell>{contrat.regles}</TableCell>
              <TableCell>{contrat.prénomclient}</TableCell>
              <TableCell>{contrat.consultant}</TableCell>
              <TableCell>{contrat.datedebut}</TableCell>
              <TableCell>{contrat.datedefin}</TableCell>
              <TableCell>{contrat.refcontrat}</TableCell>
              <TableCell>{contrat.Adresse}</TableCell>
              <TableCell>
              <IconButton
                  aria-label="view mission"
                  onClick={() => handleViewContrat(mission.id)}
                  sx={{ color: 'green' }}
              >
                  <Visibility />
                </IconButton>
                <IconButton
                  aria-label="edit mission"
                  onClick={() => handleUpdateContrat(mission.id)}
                  sx={{ color: 'blue' }}
                >
                  <Edit />
                </IconButton>
                <IconButton
                  aria-label="delete mission"
                  onClick={() => handleDeleteContrat(mission.id)}
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

export default ContratTable;
function setList(newList) {
    throw new Error('Function not implemented.');
}

