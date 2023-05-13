// material-ui
import { styled } from '@mui/material/styles';
import { Button, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

// project import
import ComponentSkeleton from './ComponentSkeleton';
import MainCard from 'components/MainCard';

// styles
const FormWrapper = styled('form')(() => ({
    display: 'grid',
    gap: '1rem',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    width: '100%',
  }));
  

const Collaborateur = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // logic for submitting form data
  };

  return (
    <ComponentSkeleton>
      <MainCard title="Add Mission">
        <FormWrapper onSubmit={handleSubmit}>
          <FormControl variant="outlined">
            <InputLabel id="client-select-label">Client</InputLabel>
            <Select labelId="client-select-label" id="client-select" label="Client">
              <MenuItem value={1}>Client A</MenuItem>
              <MenuItem value={2}>Client B</MenuItem>
              <MenuItem value={3}>Client C</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="outlined">
            <InputLabel id="consultant-select-label">Consultant</InputLabel>
            <Select labelId="consultant-select-label" id="consultant-select" label="Consultant">
              <MenuItem value={1}>Consultant A</MenuItem>
              <MenuItem value={2}>Consultant B</MenuItem>
              <MenuItem value={3}>Consultant C</MenuItem>
            </Select>
          </FormControl>
          
          <TextField label="ID" variant="outlined" name="id" sx={{ width: '100%' }} />


          <TextField label="tjm" variant="outlined" name="tjm" />
          <TextField  variant="outlined" name="startDate" type="date"/>
          <TextField variant="outlined" name="End Date" type="date"/>
          <FormControl variant="outlined">
            <InputLabel id="consultant-select-label">Type Mission</InputLabel>
            <Select labelId="consultant-select-label" id="consultant-select" label="Consultant">
              <MenuItem value={1}>Type A</MenuItem>
              <MenuItem value={2}>Type B</MenuItem>
              <MenuItem value={3}>Type C</MenuItem>
            </Select>
          </FormControl>
          <Button type="submit" variant="contained"> Add Mission </Button>
        </FormWrapper>
      </MainCard>
    </ComponentSkeleton>
  );
};

export default Collaborateur;

