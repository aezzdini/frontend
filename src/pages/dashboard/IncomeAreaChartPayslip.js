import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import axios from 'axios';

// material-ui
import { useTheme } from '@mui/material/styles';

// third-party
import ReactApexChart from 'react-apexcharts';

// chart options


const areaChartOptions = {
  chart: {
    height: 450,
    type: 'area',
    toolbar: {
      show: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: 'smooth',
    width: 2,
  },
  grid: {
    strokeDashArray: 0,
  },
};

const IncomeAreaChartPayslip = ({ slot }) => {
  const [options, setOptions] = useState(areaChartOptions);
  const [series, setSeries] = useState([
    {
      name: 'Fiche de paie',
      data: [],
    },
  ]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const token = localStorage.getItem('token'); // Get the token from local storage

  useEffect(() => {
    const fetchPayslipCountData = async () => {
      try {
        const payslipCountResponse = await axios.get
          (`${process.env.REACT_APP_URL}/payslips/payslipsYear/${selectedYear}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setSeries([
          {
            name: 'Fiche de paie',
            data: payslipCountResponse.data.map((item) => item.count),
          },
        ]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPayslipCountData();
  }, [selectedYear, token]);

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      xaxis: {
        categories: [
          'Janvier',
          'Fevrier',
          'Mars',
          'Avril',
          'Mai',
          'Juin',
          'Juillet',
          'Aout',
          'Septembre',
          'Octobre',
          'Novembre',
          'Decembre',
        ],
        tickAmount: slot === 'month' ? 11 : 7,
      },
    }));
  }, [slot]);

  const handleYearChange = (event) => {
    setSelectedYear(parseInt(event.target.value));
  };

  return (
    <>
      <div>
        <label htmlFor="year-select">Select Year:</label>
        <select id="year-select" value={selectedYear} onChange={handleYearChange}>
          <option value={new Date().getFullYear()}>{new Date().getFullYear()}</option>
          <option value={new Date().getFullYear() - 1}>{new Date().getFullYear() - 1}</option>
          <option value={new Date().getFullYear() - 2}>{new Date().getFullYear() - 2}</option>
        </select>
      </div>
      <ReactApexChart options={options} series={series} type="area" height={450} />
    </>
  );
};

IncomeAreaChartPayslip.propTypes = {
  slot: PropTypes.string.isRequired,
};

export default IncomeAreaChartPayslip;
