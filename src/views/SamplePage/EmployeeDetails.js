import React from 'react';
import { Box, Paper, Grid, Avatar, Typography, Tabs, Tab, AppBar } from '@mui/material';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={4}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `tab-${index}`,
        'aria-controls': `tabpanel-${index}`,
    };
}

export default function EmployeeDetails() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    // Mock data for history
    const historyData = {
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
            <Grid container spacing={3} sx={{ p: 3, flexDirection: 'column', alignItems: 'center' }}>
                <Grid item xs={12} sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Avatar
                        sx={{
                            width: 90,
                            height: 90,
                            margin: 'auto',
                            border: '3px solid',
                            borderColor: 'secondary.main'
                        }}
                        src="avatar.jpg"
                    />
                    <Typography variant="h6" sx={{ mt: 1, color: 'primary.main' }}>Carol Santana</Typography>
                    <Typography variant="subtitle1" sx={{ color: 'secondary.main' }}>Employee</Typography>
                    <AppBar position="static" sx={{ mt: 2, width: '100%' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="Employee Details Tabs" variant="scrollable" scrollButtons="auto">
                            <Tab label="Personal and contact data" {...a11yProps(0)} />
                            <Tab label="Documents" {...a11yProps(1)} />
                            <Tab label="Work data" {...a11yProps(2)} />
                            <Tab label="History" {...a11yProps(3)} />
                        </Tabs>
                    </AppBar>
                    <TabPanel value={value} index={0}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <Typography variant="body1" sx={{ color: 'primary.dark' }}><strong>Full name:</strong> Carol Santana</Typography>
                            <Typography variant="body1" sx={{ color: 'primary.dark' }}><strong>Birthdate:</strong> 22/04/1994</Typography>
                            <Typography variant="body1" sx={{ color: 'primary.dark' }}><strong>Nationality:</strong> Brasileiro</Typography>
                            <Typography variant="body1" sx={{ color: 'primary.dark' }}><strong>User ID:</strong> Unique User Identifier</Typography>
                        </Box>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <Typography variant="body2">Documents related content would be displayed here.</Typography>
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <Typography variant="body2"><strong>Type:</strong> Employee's Type</Typography>
                            <Typography variant="body2"><strong>Planning ID:</strong> Associated Planning ID</Typography>
                            <Typography variant="body2"><strong>Department ID:</strong> Associated Department ID</Typography>
                            <Typography variant="body2"><strong>Login Method:</strong> Login Method Used</Typography>
                        </Box>
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <Typography variant="body2"><strong>History of previous departments:</strong></Typography>
                            {historyData.previousDepartments.map((dept, index) => (
                                <Typography key={index} variant="body2">{dept.name} from {dept.dateFrom} to {dept.dateTo}</Typography>
                            ))}
                            <Typography variant="body2"><strong>History of previous plannings:</strong></Typography>
                            {historyData.previousPlannings.map((plan, index) => (
                                <Typography key={index} variant="body2">{plan.planName} from {plan.dateFrom} to {plan.dateTo}</Typography>
                            ))}
                        </Box>
                    </TabPanel>
                </Grid>
            </Grid>
        </Paper>
    );
}
