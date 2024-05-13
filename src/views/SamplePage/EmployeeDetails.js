import React from 'react';
import { Box, Paper, Grid, Avatar, Typography, Divider, Button } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PublicIcon from '@mui/icons-material/Public';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import WorkIcon from '@mui/icons-material/Work';
import HistoryIcon from '@mui/icons-material/History';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { blue, red, deepPurple, green } from '@mui/material/colors';
import { jsPDF } from 'jspdf';

export default function EmployeeDetails() {
    const employeeData = {
        fullName: "Carol Santana",
        birthdate: "22/04/1994",
        nationality: "Brasileiro",
        userID: "Unique User Identifier",
        type: "Employee's Type",
        planningID: "Associated Planning ID",
        departmentID: "Associated Department ID",
        loginMethod: "Login Method Used",
        previousDepartments: [
            { name: 'Marketing', dateFrom: 'January 2019', dateTo: 'December 2019' },
            { name: 'Sales', dateFrom: 'January 2020', dateTo: 'December 2020' }
        ],
        previousPlannings: [
            { planName: 'Q1 Marketing Campaign', dateFrom: 'January 2019', dateTo: 'March 2019' },
            { planName: 'Sales Boost 2020', dateFrom: 'January 2020', dateTo: 'March 2020' }
        ]
    };

    const downloadPDF = () => {
        const doc = new jsPDF();

        doc.setFontSize(12);
        doc.text(`Name: ${employeeData.fullName}`, 10, 10);
        doc.text(`Birthdate: ${employeeData.birthdate}`, 10, 20);
        doc.text(`Nationality: ${employeeData.nationality}`, 10, 30);
        doc.text(`User ID: ${employeeData.userID}`, 10, 40);
        doc.text(`Type: ${employeeData.type}`, 10, 50);
        doc.text(`Planning ID: ${employeeData.planningID}`, 10, 60);
        doc.text(`Department ID: ${employeeData.departmentID}`, 10, 70);
        doc.text(`Login Method: ${employeeData.loginMethod}`, 10, 80);

        // Adding a new page for history
        doc.addPage();
        doc.text('Previous Departments:', 10, 10);
        employeeData.previousDepartments.forEach((dept, index) => {
            doc.text(`${dept.name} from ${dept.dateFrom} to ${dept.dateTo}`, 10, 20 + (10 * index));
        });

        doc.addPage();
        doc.text('Previous Plannings:', 10, 10);
        employeeData.previousPlannings.forEach((plan, index) => {
            doc.text(`${plan.planName} from ${plan.dateFrom} to ${plan.dateTo}`, 10, 20 + (10 * index));
        });

        doc.save('EmployeeDetails.pdf');
    };

    return (
        <Paper sx={{ maxWidth: 960, margin: 'auto', overflow: 'hidden', p: 4 }}>
            <Grid container spacing={2} sx={{ flexDirection: 'column', alignItems: 'center' }}>
                <Grid item xs={12} sx={{ textAlign: 'center' }}>
                    <Avatar
                        sx={{
                            width: 120,
                            height: 120,
                            mb: 2,
                            border: '3px solid',
                            borderColor: 'secondary.main'
                        }}
                        src="avatar.jpg"
                    />
                    <Typography variant="h5" sx={{ color: deepPurple[500], mt: 2 }}><AccountCircleIcon sx={{ verticalAlign: 'middle', mr: 1 }} />{employeeData.fullName}</Typography>
                    <Divider sx={{ mb: 3 }} />
                </Grid>
                
                <Paper sx={{ p: 2, mb: 2, width: '100%', bgcolor: blue[50] }}>
                    <Typography variant="h6" sx={{ color: blue[800], mb: 1 }}><CalendarTodayIcon sx={{ verticalAlign: 'middle', mr: 1 }} />Personal Details</Typography>
                    <Typography variant="subtitle1"><strong>Birthdate:</strong> {employeeData.birthdate}</Typography>
                    <Typography variant="subtitle1"><strong>Nationality:</strong> {employeeData.nationality}</Typography>
                    <Typography variant="subtitle1"><strong>User ID:</strong> {employeeData.userID}</Typography>
                </Paper>

                <Paper sx={{ p: 2, mb: 2, width: '100%', bgcolor: green[50] }}>
                    <Typography variant="h6" sx={{ color: green[800], mb: 1 }}><WorkIcon sx={{ verticalAlign: 'middle', mr: 1 }} />Professional Details</Typography>
                    <Typography variant="subtitle1"><strong>Type:</strong> {employeeData.type}</Typography>
                    <Typography variant="subtitle1"><strong>Planning ID:</strong> {employeeData.planningID}</Typography>
                    <Typography variant="subtitle1"><strong>Department ID:</strong> {employeeData.departmentID}</Typography>
                    <Typography variant="subtitle1"><strong>Login Method:</strong> {employeeData.loginMethod}</Typography>
                </Paper>

                <Paper sx={{ p: 2, width: '100%', bgcolor: red[50] }}>
                    <Typography variant="h6" sx={{ color: red[800], mb: 1 }}><HistoryIcon sx={{ verticalAlign: 'middle', mr: 1 }} />History</Typography>
                    <Typography variant="subtitle1"><strong>Previous Departments:</strong></Typography>
                    {employeeData.previousDepartments.map((dept, index) => (
                        <Typography key={index} variant="subtitle1">{dept.name} from {dept.dateFrom} to {dept.dateTo}</Typography>
                    ))}
                    <Typography variant="subtitle1" sx={{ mt: 2 }}><strong>Previous Plannings:</strong></Typography>
                    {employeeData.previousPlannings.map((plan, index) => (
                        <Typography key={index} variant="subtitle1">{plan.planName} from {plan.dateFrom} to {plan.dateTo}</Typography>
                    ))}
                </Paper>
                <Button
                    startIcon={<PictureAsPdfIcon />}
                    variant="contained"
                    color="error"
                    onClick={downloadPDF}
                    sx={{ mt: 2 }}
                >
                    Download PDF
                </Button>
            </Grid>
        </Paper>
    );
}
