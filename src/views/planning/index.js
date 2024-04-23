import React, { useState, useEffect, useCallback } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  Grid,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  TextField
} from '@mui/material';
import { LocalizationProvider, StaticDatePicker } from '@mui/x-date-pickers';
import AdapterDateFns from '@date-io/date-fns';
import Breadcrumb from 'component/Breadcrumb';
import { gridSpacing } from 'config.js';

const PlanningManagement = () => {
  const [plannings, setPlannings] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const fetchPlannings = useCallback(async () => {
    try {
      const response = await fetch(`/api/plannings?date=${selectedDate.toISOString()}`);
      const data = await response.json();
      setPlannings(data);
    } catch (error) {
      console.error('Error fetching plannings:', error);
    }
  }, [selectedDate]);

  useEffect(() => {
    fetchPlannings();
  }, [fetchPlannings]);

  const handleDeletePlanning = async (id) => {
    try {
      const response = await fetch(`/api/plannings/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        fetchPlannings();
      } else {
        console.error('Failed to delete planning');
      }
    } catch (error) {
      console.error('Error deleting planning:', error);
    }
  };

  const [value, setValue] = useState(new Date());

  return (
    <>
      <Breadcrumb title="Planning Management">
        <Typography variant="subtitle2" color="inherit">
          Home
        </Typography>
        <Typography variant="subtitle2" color="primary">
          Planning Management
        </Typography>
      </Breadcrumb>
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardHeader
              title={
                <Typography component="div" variant="h4">
                  Calendar
                </Typography>
              }
            />
            <Divider />
            <CardContent>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Card>
                      <CardContent>
                        <Typography variant="h5">Select a Date</Typography>
                        <StaticDatePicker
                          displayStaticWrapperAs="desktop"
                          openTo="day"
                          value={value}
                          onChange={(newValue) => {
                            setValue(newValue);
                          }}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </LocalizationProvider>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={8}>
          <Card>
            <CardHeader
              title={
                <Typography component="div" variant="h4">
                  Planning List for Selected Date
                </Typography>
              }
            />
            <Divider />
            <CardContent>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Intitule</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {plannings.map((planning) => (
                    <TableRow key={planning._id}>
                      <TableCell>{planning._id}</TableCell>
                      <TableCell>{planning.intitule}</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => handleDeletePlanning(planning._id)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default PlanningManagement;
