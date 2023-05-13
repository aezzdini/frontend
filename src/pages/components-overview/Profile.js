// material-ui
import { styled } from '@mui/material/styles';
import { Button, TextField } from '@mui/material';

// project import
import ComponentSkeleton from './ComponentSkeleton';
import MainCard from 'components/MainCard';

// styles
const FormWrapper = styled('form')(() => ({
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    width: '100%'
}));

const Profile = () => {
    const handleSubmit = (event) => {
        event.preventDefault();
        // logic for submitting form data
    };

    return (
        <ComponentSkeleton>
            <MainCard title="Add Activity">
                <FormWrapper onSubmit={handleSubmit}>
                    <TextField label="ID" variant="outlined" name="id" />
                    <TextField label="Month" variant="outlined" name="month" />
                    <TextField label="Year" variant="outlined" name="year" />
                    <Button type="submit"variant="contained"> Add Activity </Button>
                </FormWrapper>
            </MainCard>
        </ComponentSkeleton>
    );
};

export default Profile;
