# API Documentation

## Attendance Endpoints

### Get All Attendances
- **Endpoint:** GET /api/attendances
- **Headers:** `Device-ID: A8N5230560263`
- **Description:** Retrieve all attendance records.
- **Response:** JSON array of attendances.

### Delete All Attendances
- **Endpoint:** DELETE /api/attendances
- **Headers:** `Device-ID: A8N5230560263`
- **Description:** Delete all attendance records.
- **Response:** Success message.

## Device Endpoints

### Scan Device
- **Endpoint:** POST /api/devices/scan
- **Body:** JSON with scanning parameters.
- **Description:** Scan for devices.
- **Response:** Scanning results.

### Ping Device
- **Endpoint:** POST /api/device/ping
- **Headers:** `Device-ID: A8N5230560263`
- **Description:** Ping a device.
- **Response:** Ping result.

### List Devices
- **Endpoint:** GET /api/devices
- **Description:** List all devices.
- **Response:** JSON array of devices.

### Remove Device
- **Endpoint:** DELETE /api/device
- **Headers:** `Device-ID: A8N5230560263`
- **Description:** Remove a device.
- **Response:** Success or error message.

### Update Device
- **Endpoint:** PATCH /api/device
- **Headers:** `Device-ID: A8N5230560263`
- **Body:** JSON with new device data.
- **Description:** Update device information.
- **Response:** Updated device information.


### name of the replicaset : 
 - **Enable replication
replication:
  replSetName: "rs0"  # Name your replica set
    :**


