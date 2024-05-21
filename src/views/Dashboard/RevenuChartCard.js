import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Card, CardContent, CardHeader, Divider, Grid, Typography, useMediaQuery } from '@mui/material';

// third-party
import Chart from 'react-apexcharts';

// ==============================|| REVENUE CHART CARD ||============================== //

const RevenuChartCard = () => {
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
  const matchDownXs = useMediaQuery(theme.breakpoints.down('sm'));

  const [chartData, setChartData] = useState({
    options: {
      chart: {
        type: 'donut'
      },
      dataLabels: {
        enabled: false
      },
      labels: [],
      legend: {
        show: true,
        position: 'bottom',
        fontFamily: 'inherit',
        labels: {
          colors: 'inherit'
        }
      },
      itemMargin: {
        horizontal: 10,
        vertical: 10
      },
      colors: [theme.palette.error.main, theme.palette.primary.main, theme.palette.info.main]
    },
    series: []
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/Dashboard/stats');
        const { employeesByDepartment } = response.data;

        if (employeesByDepartment && Array.isArray(employeesByDepartment)) {
          const filteredData = employeesByDepartment.filter(item => item.name !== 'Unknown');
          const labels = filteredData.map(item => item.name);
          const series = filteredData.map(item => item.count || 0);

          setChartData(prevData => ({
            options: {
              ...prevData.options,
              labels
            },
            series
          }));
        } else {
          console.error('Unexpected format for employeesByDepartment:', employeesByDepartment);
        }
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Card>
      <CardHeader
        title={
          <Typography component="div" className="card-header">
            Employee Count by Department
          </Typography>
        }
      />
      <Divider />
      <CardContent>
        <Grid container spacing={2} direction="column">
          <Grid item xs={12}>
            <Chart options={chartData.options} series={chartData.series} type="donut" />
          </Grid>
          <Grid item xs={12}>
            <Grid container direction={matchDownMd && !matchDownXs ? 'row' : 'column'} justifyContent="space-around" alignItems="center">
              {chartData.options.labels.map((label, index) => (
                <Grid item key={index}>
                  <Grid container direction="column" alignItems="center">
                    <Typography variant="h6">{label}</Typography>
                    <Typography variant="subtitle1" sx={{ color: theme.palette.primary.main }}>
                      {chartData.series[index]} employees
                    </Typography>
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

RevenuChartCard.propTypes = {
  chartData: PropTypes.object
};

export default RevenuChartCard;
