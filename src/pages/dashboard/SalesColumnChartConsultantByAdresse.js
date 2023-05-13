import { useEffect, useState } from 'react';
import axios from 'axios';
// material-ui
import { useTheme } from '@mui/material/styles';

// third-party
import ReactApexChart from 'react-apexcharts';

var token = localStorage.getItem('token');

// chart options

// ==============================|| SALES COLUMN CHART ||============================== //

const SalesColumnChartConsultantByAdresse = () => {
    const [adresse, setAdresse] = useState([]);
    const theme = useTheme();


    useEffect(() => {
        const fetchAdresse = async () => {
            const responsee = await axios.get(`${process.env.REACT_APP_URL}/consultants/cityCount`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
         
            setAdresse(responsee.data);
        };
        fetchAdresse();
    }, []);


    const tab = adresse.map((el) => el.city);

    const countTab = adresse.map((el) => el.count);
    const columnChartOptions = {
        chart: {
            type: 'bar',
            height: 430,
            toolbar: {
                show: false
            }
        },
        plotOptions: {
            bar: {
                columnWidth: '30%',
                borderRadius: 4
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            show: true,
            width: 8,
            colors: ['transparent']
        },
        xaxis: {
            categories: tab
        },
        yaxis: {
            title: {
                text: '$ (thousands)'
            }
        },
        fill: {
            opacity: 1
        },
        tooltip: {
            y: {
                formatter(val) {
                    return `$ ${val} thousands`;
                }
            }
        },
        legend: {
            show: true,
            fontFamily: `'Public Sans', sans-serif`,
            offsetX: 10,
            offsetY: 10,
            labels: {
                useSeriesColors: false
            },
            markers: {
                width: 16,
                height: 16,
                radius: '50%',
                offsexX: 2,
                offsexY: 2
            },
            itemMargin: {
                horizontal: 15,
                vertical: 50
            }
        },
        responsive: [
            {
                breakpoint: 600,
                options: {
                    yaxis: {
                        show: false
                    }
                }
            }
        ]
    };
    console.log(columnChartOptions, 'columnChartOptions');

    const { primary, secondary } = theme.palette.text;
    const line = theme.palette.divider;

    const warning = theme.palette.warning.main;
    const primaryMain = theme.palette.primary.main;
    const successDark = theme.palette.success.dark;

  

    const [options, setOptions] = useState(columnChartOptions);

    useEffect(() => {
        setOptions((prevState) => ({
            ...prevState,
            colors: [warning, primaryMain],
            xaxis: {
                categories:tab,
                labels: {
                    style: {
                        colors: [secondary, secondary, secondary, secondary, secondary, secondary]
                    }
                }
            },
            yaxis: {
                labels: {
                    style: {
                        colors: [secondary]
                    }
                }
            },
            grid: {
                borderColor: line
            },
            tooltip: {
                theme: 'light'
            },
            legend: {
                position: 'top',
                horizontalAlign: 'right',
                labels: {
                    colors: 'grey.500'
                }
            }
        }));
    }, [primary, secondary, line, warning, primaryMain, successDark, adresse]);
   // console.log(series,  'series')
    return (
        <div id="chart">
            <ReactApexChart options={options} series={[{name: "adresse totale", data: countTab}]} type="bar" height={430} />
        </div>
    );
};

export default SalesColumnChartConsultantByAdresse;
