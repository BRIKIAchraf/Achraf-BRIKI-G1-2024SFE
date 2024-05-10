// src/views/attendances/AttendanceContainer.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAttendances } from '../../store/attendanceSlice';
import AttendanceManagement from './AttendanceManagement';

const AttendanceContainer = () => {
  const dispatch = useDispatch();
  const attendances = useSelector(state => state.attendance.data);

  useEffect(() => {
    dispatch(fetchAttendances());
  }, [dispatch]);

  return <AttendanceManagement attendances={attendances} />;
};

export default AttendanceContainer;
