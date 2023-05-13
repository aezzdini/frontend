// material-ui
import { Typography } from '@mui/material';

// project import
import MainCard from 'components/MainCard';

// ==============================|| SAMPLE PAGE ||============================== //

const SamplePage = () => (
    <MainCard title="INSY2S">
        <Typography variant="body2">
        INSY2S est une Entreprise du Secteur du Numérique (ESN) implantée à Lille, ville labellisée "Capital French Tech".

Spécialisés dans le secteur d'activité du conseil en systèmes et logiciels informatiques, nous sommes actifs depuis 2014.
        </Typography>
    </MainCard>
);

export default SamplePage;
