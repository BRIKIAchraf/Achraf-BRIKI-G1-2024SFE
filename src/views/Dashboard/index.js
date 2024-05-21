import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchStats } from '../../store/dashboardSlice';
// material-ui
import { useTheme, styled } from '@mui/material/styles';
import { Grid, Card, CardHeader, CardContent, Typography, Divider, LinearProgress, IconButton, Box, Button } from '@mui/material';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import CloseIcon from '@mui/icons-material/Close';

// project import
import SalesLineCard from './SalesLineCard';
import SalesLineCardData from './chart/sale-chart-1';
import RevenuChartCard from './RevenuChartCard';
import RevenuChartCardData from './chart/revenu-chart';
import ReportCard from './ReportCard';
import { gridSpacing } from 'config.js';

// assets
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import PeopleAltTwoTone from '@mui/icons-material/PeopleAltTwoTone';
import VpnKeyTwoTone from '@mui/icons-material/VpnKeyTwoTone';
import FingerprintTwoTone from '@mui/icons-material/FingerprintTwoTone';
import EventNoteTwoTone from '@mui/icons-material/EventNoteTwoTone';

// custom style
const FlatCardBlock = styled((props) => <Grid item sm={6} xs={12} {...props} />)(({ theme }) => ({
  padding: '25px 25px',
  borderLeft: '1px solid' + theme.palette.background.default,
  [theme.breakpoints.down('sm')]: {
    borderLeft: 'none',
    borderBottom: '1px solid' + theme.palette.background.default,
  },
  [theme.breakpoints.down('md')]: {
    borderBottom: '1px solid' + theme.palette.background.default,
  },
}));

const DashboardWrapper = styled('div')(({ isScaled }) => ({
  transition: 'transform 0.5s ease-in-out',
  transform: isScaled ? 'scale(0.8)' : 'scale(1)',
  width: isScaled ? '80%' : '100%',
  marginRight: isScaled ? '20%' : '0',
  '@media (max-width: 960px)': {
    transform: isScaled ? 'scale(0.7)' : 'scale(1)',
    width: '100%',
    marginRight: isScaled ? '30%' : '0',
  },
}));

const PdfWrapper = styled('div')(({ theme, isVisible }) => ({
  position: 'fixed',
  top: 0,
  right: isVisible ? 0 : '-100%',
  width: '50%',
  height: '100%',
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[5],
  transition: 'right 0.5s ease-in-out',
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(2),
  zIndex: 1200,
  '@media (max-width: 960px)': {
    width: '100%',
  },
}));

// ==============================|| DASHBOARD DEFAULT ||============================== //

const Default = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { stats, status, error } = useSelector((state) => state.dashboard);
  const [isScaled, setIsScaled] = useState(false);
  const [pdfData, setPdfData] = useState(null);

  // Fetch data on component mount
  useEffect(() => {
    dispatch(fetchStats());
  }, [dispatch]);

  // Handle loading and error states
  if (status === 'loading') return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const generatePDF = () => {
    const doc = new jsPDF('landscape');
    doc.text('Dashboard Report', 14, 20);
    doc.setDrawColor(0);
    doc.setLineWidth(0.5);
    doc.line(10, 25, 287, 25); // header line

    doc.autoTable({
      startY: 30,
      head: [['Metric', 'Value']],
      body: [
        ['Total Employees', stats.totalEmployees || 'N/A'],
        ['Total with Card', stats.totalWithCard || 'N/A'],
        ['Total with Password', stats.totalWithPassword || 'N/A'],
        ['Total with Fingerprints', stats.totalWithFingerprints || 'N/A'],
        ['Employees On Leave', stats.employeesOnLeave || 'N/A'],
        ['Average Age', stats.averageAge ? stats.averageAge.toFixed(1) : 'N/A'],
      ],
    });

    // Adding department-wise employee count
    const departmentData = stats.departments || [];
    departmentData.forEach((dept) => {
      doc.autoTable({
        startY: doc.previousAutoTable.finalY + 10,
        head: [[`Department: ${dept.name}`, 'Employee Count']],
        body: [
          [`Department: ${dept.name}`, `${dept.employeeCount}`],
        ],
      });
    });

    doc.line(10, doc.internal.pageSize.height - 20, 287, doc.internal.pageSize.height - 20); // footer line
    doc.text('Page 1', 14, doc.internal.pageSize.height - 10);
    const pdfDataUri = doc.output('datauristring');
    setPdfData(pdfDataUri);
  };

  const handleOpenPdf = () => {
    setIsScaled(true);
    generatePDF();
  };

  const handleClosePdf = () => {
    setIsScaled(false);
    setPdfData(null);
  };

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing} alignItems="center">
          {/* Download PDF Icon */}
          <Grid item>
            <Typography variant="h4">Dashboard</Typography>
          </Grid>
          <Grid item>
            <IconButton onClick={handleOpenPdf} style={{ fontSize: '2rem' }}>
              <SaveAltIcon fontSize="inherit" />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <DashboardWrapper isScaled={isScaled}>
          <Grid container spacing={gridSpacing}>
            {/* Dynamically generated stats cards */}
            {stats && (
              <>
                <Grid item lg={3} sm={6} xs={12}>
                  <ReportCard
                    primary={stats.totalEmployees ? stats.totalEmployees.toString() : 'N/A'}
                    secondary="Total Employees"
                    color={theme.palette.primary.main}
                    iconPrimary={PeopleAltTwoTone}
                    iconFooter={TrendingUpIcon}
                  />
                </Grid>
                <Grid item lg={3} sm={6} xs={12}>
                  <ReportCard
                    primary={stats.totalWithCard ? stats.totalWithCard.toString() : 'N/A'}
                    secondary="Total with Card"
                    color={theme.palette.warning.main}
                    iconPrimary={VpnKeyTwoTone}
                    iconFooter={TrendingUpIcon}
                  />
                </Grid>
                <Grid item lg={3} sm={6} xs={12}>
                  <ReportCard
                    primary={stats.totalWithPassword ? stats.totalWithPassword.toString() : 'N/A'}
                    secondary="Total with Password"
                    color={theme.palette.error.main}
                    iconPrimary={FingerprintTwoTone}
                    iconFooter={TrendingDownIcon}
                  />
                </Grid>
                <Grid item lg={3} sm={6} xs={12}>
                  <ReportCard
                    primary={stats.totalWithFingerprints ? stats.totalWithFingerprints.toString() : 'N/A'}
                    secondary="Total with Fingerprints"
                    color={theme.palette.success.main}
                    iconPrimary={EventNoteTwoTone}
                    iconFooter={TrendingUpIcon}
                  />
                </Grid>
                <Grid item lg={3} sm={6} xs={12}>
                  <ReportCard
                    primary={stats.employeesOnLeave ? stats.employeesOnLeave.toString() : 'N/A'}
                    secondary="Employees On Leave"
                    color={theme.palette.secondary.main}
                    iconPrimary={EventNoteTwoTone}
                    iconFooter={TrendingUpIcon}
                  />
                </Grid>
                <Grid item lg={3} sm={6} xs={12}>
                  <ReportCard
                    primary={stats.averageAge ? stats.averageAge.toFixed(1).toString() : 'N/A'}
                    secondary="Average Age"
                    color={theme.palette.info.main}
                    iconPrimary={EventNoteTwoTone}
                    iconFooter={TrendingUpIcon}
                  />
                </Grid>
              </>
            )}
          </Grid>
        </DashboardWrapper>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={8} xs={12}>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12} sm={6}>
                <Grid container spacing={gridSpacing}>
                  <Grid item xs={12}>
                    <SalesLineCard
                      chartData={SalesLineCardData}
                      title="Sales Per Day"
                      percentage="3%"
                      icon={<TrendingDownIcon />}
                      footerData={[
                        {
                          value: '$4230',
                          label: 'Total Revenue',
                        },
                        {
                          value: '321',
                          label: 'Today Sales',
                        },
                      ]}
                    />
                  </Grid>
                  <Grid item xs={12} sx={{ display: { md: 'block', sm: 'none' } }}>
                    <Card>
                      <CardContent sx={{ p: '0 !important' }}>
                        <Grid container alignItems="center" spacing={0}>
                          <FlatCardBlock>
                            <Grid container alignItems="center" spacing={1}>
                              <Grid item>
                                <Typography variant="subtitle2" align="left">
                                  REALTY
                                </Typography>
                              </Grid>
                              <Grid item sm zeroMinWidth>
                                <Typography variant="h5" sx={{ color: theme.palette.error.main }} align="right">
                                  -0.99
                                </Typography>
                              </Grid>
                            </Grid>
                          </FlatCardBlock>
                          <FlatCardBlock>
                            <Grid container alignItems="center" spacing={1}>
                              <Grid item>
                                <Typography variant="subtitle2" align="left">
                                  INFRA
                                </Typography>
                              </Grid>
                              <Grid item sm zeroMinWidth>
                                <Typography variant="h5" sx={{ color: theme.palette.success.main }} align="right">
                                  -7.66
                                </Typography>
                              </Grid>
                            </Grid>
                          </FlatCardBlock>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={6}>
                <RevenuChartCard chartData={RevenuChartCardData} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={4} xs={12}>
            <Card>
              <CardHeader
                title={
                  <Typography component="div" className="card-header">
                    Traffic Sources
                  </Typography>
                }
              />
              <Divider />
              <CardContent>
                <Grid container spacing={gridSpacing}>
                  <Grid item xs={12}>
                    <Grid container alignItems="center" spacing={1}>
                      <Grid item sm zeroMinWidth>
                        <Typography variant="body2">Direct</Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="body2" align="right">
                          80%
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <LinearProgress variant="determinate" aria-label="direct" value={80} color="primary" />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container alignItems="center" spacing={1}>
                      <Grid item sm zeroMinWidth>
                        <Typography variant="body2">Social</Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="body2" align="right">
                          50%
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <LinearProgress variant="determinate" aria-label="Social" value={50} color="secondary" />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container alignItems="center" spacing={1}>
                      <Grid item sm zeroMinWidth>
                        <Typography variant="body2">Referral</Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="body2" align="right">
                          20%
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <LinearProgress variant="determinate" aria-label="Referral" value={20} color="primary" />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container alignItems="center" spacing={1}>
                      <Grid item sm zeroMinWidth>
                        <Typography variant="body2">Bounce</Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="body2" align="right">
                          60%
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <LinearProgress variant="determinate" aria-label="Bounce" value={60} color="secondary" />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container alignItems="center" spacing={1}>
                      <Grid item sm zeroMinWidth>
                        <Typography variant="body2">Internet</Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="body2" align="right">
                          40%
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <LinearProgress variant="determinate" aria-label="Internet" value={40} color="primary" />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
      <PdfWrapper theme={theme} isVisible={isScaled}>
        <Box display="flex" justifyContent="flex-end">
          <IconButton onClick={handleClosePdf}>
            <CloseIcon />
          </IconButton>
        </Box>
        {pdfData && (
          <iframe src={pdfData} style={{ width: '100%', height: 'calc(100% - 40px)' }} title="PDF Preview" />
        )}
        <Box display="flex" justifyContent="center" mt={2}>
          <Button variant="contained" color="primary" onClick={handleClosePdf}>
            Close
          </Button>
        </Box>
      </PdfWrapper>
    </Grid>
  );
};

export default Default;
