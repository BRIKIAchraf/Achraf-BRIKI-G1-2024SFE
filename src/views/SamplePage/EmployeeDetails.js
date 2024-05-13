import React from 'react';
import { Box, Paper, Grid, Avatar, Typography, Divider } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PublicIcon from '@mui/icons-material/Public';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import WorkIcon from '@mui/icons-material/Work';
import HistoryIcon from '@mui/icons-material/History';
import { blue, red, deepPurple, green } from '@mui/material/colors';

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
                    <Typography variant="h5" sx={{ color: deepPurple[500] }} gutterBottom><AccountCircleIcon sx={{ verticalAlign: 'middle', mr: 1 }} />{employeeData.fullName}</Typography>
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
            </Grid>
        </Paper>
    );
}
