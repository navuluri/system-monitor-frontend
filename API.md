# API Documentation

This document describes the API endpoints available in the System Monitor application.

## Table of Contents

- [Authentication](#authentication)
- [Frontend API Routes](#frontend-api-routes)
- [Backend Agent API](#backend-agent-api)
- [Error Handling](#error-handling)
- [Rate Limiting](#rate-limiting)

## Authentication

All API routes require authentication via NextAuth.js. Users must be logged in with GitHub OAuth to access any monitoring endpoints.

### Authentication Flow

1. User navigates to the application
2. Middleware redirects unauthenticated users to `/login`
3. User authenticates via GitHub OAuth
4. Session is created and stored
5. User can access protected routes

## Frontend API Routes

These routes are provided by the Next.js frontend and act as proxies to backend monitoring agents.

### Base URL

```
http://localhost:3000/api
```

### Common Parameters

All endpoints accept the following query parameters:

| Parameter | Type   | Required | Description                                      |
|-----------|--------|----------|--------------------------------------------------|
| `host`    | string | Yes      | Hostname or IP address of the monitored server   |
| `port`    | number | Yes      | Port where the monitoring agent is running       |

### Validation Rules

- **host**: Must be a valid hostname (alphanumeric with dots and hyphens)
- **port**: Must be a number between 1 and 65535

### Endpoints

#### 1. Get CPU Metrics

Retrieve CPU utilization and load average information.

```http
GET /api/cpu?host={host}&port={port}
```

**Response (200 OK):**
```json
{
  "physical_cpu_count": 8,
  "cpu_utilization": 45.2,
  "per_cpu_utilization": [42.1, 48.3, 44.5, 46.2, 43.8, 47.1, 45.5, 44.9],
  "load_avg": [2.5, 2.3, 2.1]
}
```

**Fields:**
- `physical_cpu_count`: Number of physical CPU cores
- `cpu_utilization`: Overall CPU usage percentage
- `per_cpu_utilization`: Array of per-core CPU usage percentages
- `load_avg`: System load averages [1min, 5min, 15min]

---

#### 2. Get Memory Metrics

Retrieve memory usage information.

```http
GET /api/memory?host={host}&port={port}
```

**Response (200 OK):**
```json
{
  "total": 16777216000,
  "available": 8388608000,
  "used": 8388608000,
  "free": 4194304000,
  "percent": 50.0,
  "cached": 2097152000,
  "buffers": 1048576000
}
```

**Fields:**
- `total`: Total physical RAM in bytes
- `available`: Available memory in bytes
- `used`: Used memory in bytes
- `free`: Free memory in bytes
- `percent`: Memory usage percentage
- `cached`: Cached memory in bytes
- `buffers`: Buffer memory in bytes

---

#### 3. Get Disk Metrics

Retrieve disk usage information.

```http
GET /api/disk?host={host}&port={port}
```

**Response (200 OK):**
```json
{
  "total": 500000000000,
  "available": 250000000000,
  "used": 250000000000,
  "free": 250000000000,
  "free_percent": 50.0,
  "used_percent": 50.0,
  "partitions": [
    {
      "device": "/dev/sda1",
      "mountpoint": "/",
      "fstype": "ext4",
      "total": 500000000000,
      "used": 250000000000,
      "free": 250000000000,
      "percent": 50.0
    }
  ]
}
```

**Fields:**
- `total`: Total disk space in bytes
- `available`: Available disk space in bytes
- `used`: Used disk space in bytes
- `free`: Free disk space in bytes
- `free_percent`: Free space percentage
- `used_percent`: Used space percentage
- `partitions`: Array of partition information

---

#### 4. Get Network Metrics

Retrieve network traffic statistics.

```http
GET /api/network?host={host}&port={port}
```

**Response (200 OK):**
```json
{
  "bytes_sent": 1048576000,
  "bytes_recv": 2097152000,
  "packets_sent": 1000000,
  "packets_recv": 1500000,
  "num_sockets": 50,
  "num_interfaces": 2,
  "errin": 0,
  "errout": 0,
  "interfaces": [
    {
      "name": "eth0",
      "bytes_sent": 1048576000,
      "bytes_recv": 2097152000,
      "packets_sent": 1000000,
      "packets_recv": 1500000
    }
  ]
}
```

**Fields:**
- `bytes_sent`: Total bytes sent
- `bytes_recv`: Total bytes received
- `packets_sent`: Total packets sent
- `packets_recv`: Total packets received
- `num_sockets`: Number of open sockets
- `num_interfaces`: Number of network interfaces
- `errin`: Input errors
- `errout`: Output errors
- `interfaces`: Array of per-interface statistics

---

#### 5. Get Process List

Retrieve list of running processes.

```http
GET /api/process?host={host}&port={port}
```

**Response (200 OK):**
```json
[
  {
    "pid": 1234,
    "name": "chrome",
    "username": "user",
    "cpu_percent": 5.2,
    "memory_percent": 10.5,
    "num_threads": 25,
    "status": "running",
    "create_time": 1699876543,
    "exe": "/usr/bin/chrome",
    "rss": 1048576000,
    "vms": 2097152000,
    "read": "100 MB",
    "write": "50 MB",
    "connections": 10,
    "is_zombie": false
  }
]
```

**Fields:**
- `pid`: Process ID
- `name`: Process name
- `username`: User running the process
- `cpu_percent`: CPU usage percentage
- `memory_percent`: Memory usage percentage
- `num_threads`: Number of threads
- `status`: Process status (running, sleeping, stopped, zombie)
- `create_time`: Process creation timestamp
- `exe`: Executable path
- `rss`: Resident Set Size (physical memory)
- `vms`: Virtual Memory Size
- `read`: Bytes read (formatted)
- `write`: Bytes written (formatted)
- `connections`: Number of network connections
- `is_zombie`: Whether process is a zombie

---

#### 6. Get System Information

Retrieve general system information.

```http
GET /api/system?host={host}&port={port}
```

**Response (200 OK):**
```json
{
  "boot_time": 1699000000,
  "users": [
    {
      "name": "user",
      "terminal": "pts/0",
      "host": "192.168.1.100",
      "started": 1699876543
    }
  ]
}
```

**Fields:**
- `boot_time`: System boot timestamp
- `users`: Array of logged-in users

---

## Error Handling

All endpoints return consistent error responses.

### Error Response Format

```json
{
  "error": "Error message describing what went wrong"
}
```

### HTTP Status Codes

| Status Code | Description |
|-------------|-------------|
| 200 | Success |
| 400 | Bad Request - Invalid parameters |
| 401 | Unauthorized - Not authenticated |
| 404 | Not Found - Resource not found |
| 500 | Internal Server Error - Server-side error |
| 504 | Gateway Timeout - Request to agent timed out |

### Common Error Scenarios

#### Invalid Parameters (400)

```json
{
  "error": "Invalid parameters",
  "details": [
    {
      "path": ["host"],
      "message": "Invalid hostname format"
    }
  ]
}
```

#### Request Timeout (504)

```json
{
  "error": "Request timeout - host may be unreachable"
}
```

#### Failed to Fetch (502/503)

```json
{
  "error": "Failed to fetch CPU data: Service Unavailable"
}
```

---

## Backend Agent API

The monitoring agents running on target servers must implement these endpoints.

### Base URL

```
http://{host}:{port}/api/v1
```

### Required Endpoints

1. `GET /api/v1/cpu` - CPU metrics
2. `GET /api/v1/memory` - Memory metrics
3. `GET /api/v1/disk` - Disk metrics
4. `GET /api/v1/network` - Network metrics
5. `GET /api/v1/process` - Process list
6. `GET /api/v1/system` - System information

### Response Format

Agents should return JSON responses matching the format described in the Frontend API Routes section.

### Timeout

The frontend will timeout requests after 10 seconds.

---

## Rate Limiting

**Status:** Not currently implemented

For production deployments, consider implementing rate limiting to prevent abuse:

- Per-user rate limits
- Per-IP rate limits
- Per-endpoint rate limits

Recommended tools:
- `@upstash/ratelimit` with Redis
- Cloudflare rate limiting
- AWS WAF

---

## Security Considerations

### Input Validation

All inputs are validated using Zod schemas to prevent:
- SQL injection
- SSRF attacks
- Invalid data types

### SSRF Protection

The application validates hostnames and ports but does not currently implement a whitelist. For production:

1. Create a whitelist of allowed monitoring targets
2. Store in database or environment variables
3. Validate requests against whitelist

### Authentication

All routes require authentication. Unauthenticated requests are redirected to `/login`.

---

## Example Usage

### cURL

```bash
# Get CPU metrics
curl -H "Cookie: your-session-cookie" \
  "http://localhost:3000/api/cpu?host=192.168.1.100&port=8080"

# Get memory metrics
curl -H "Cookie: your-session-cookie" \
  "http://localhost:3000/api/memory?host=server.example.com&port=8080"
```

### JavaScript (Fetch API)

```javascript
// Get CPU metrics
const response = await fetch('/api/cpu?host=192.168.1.100&port=8080');
const data = await response.json();

if (response.ok) {
  console.log('CPU Usage:', data.cpu_utilization);
} else {
  console.error('Error:', data.error);
}
```

### TypeScript (with error handling)

```typescript
async function fetchCPUMetrics(host: string, port: number) {
  try {
    const response = await fetch(`/api/cpu?host=${host}&port=${port}`);
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch CPU metrics:', error);
    throw error;
  }
}
```

---

## Need Help?

- 📖 [Main Documentation](README.md)
- 🐛 [Report Issues](https://github.com/yourusername/system-monitor/issues)
- 💬 [Discussions](https://github.com/yourusername/system-monitor/discussions)

