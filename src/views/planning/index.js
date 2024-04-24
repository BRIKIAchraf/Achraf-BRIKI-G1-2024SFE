// src/views/planning/PlanningManagement.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPlannings, deletePlanning } from '../../store/planningSlice';
import {
  Card, CardHeader, CardContent, Divider, Grid, Typography, Table, TableHead,
  TableBody, TableRow, TableCell, Button
} from '@mui/material';
import Breadcrumb from 'component/Breadcrumb';
import { gridSpacing } from 'config.js';

const PlanningManagement = () => {
  const dispatch = useDispatch();
  const { plannings, status } = useSelector(state => state.planning);
  
  useEffect(() => {
    dispatch(fetchPlannings(new Date())); // You may want to replace new Date() with another method to set dates
  }, [dispatch]);

  return (
    <>
      <Breadcrumb title="Planning Management">
        <Typography variant="subtitle2" color="inherit">Home</Typography>
        <Typography variant="subtitle2" color="primary">Planning Management</Typography>
      </Breadcrumb>
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12} md={12}> {/* Adjusted to take full width */}
          <Card>
            <CardHeader title={<Typography component="div" variant="h4">Planning List</Typography>} />
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
                          onClick={() => dispatch(deletePlanning(planning._id))}
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
