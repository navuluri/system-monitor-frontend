# Deployment Guide

This guide covers deploying System Monitor to various platforms and environments.

## PLEASE NOTE

Please note that I have'nt tried these deployments. But these should work with minimal adjustments.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Environment Configuration](#environment-configuration)
- [Docker Deployment](#docker-deployment)
- [Vercel Deployment](#vercel-deployment)
- [AWS Deployment](#aws-deployment)
- [Self-Hosted Deployment](#self-hosted-deployment)
- [Database Setup](#database-setup)
- [Monitoring Agents](#monitoring-agents)
- [Security Checklist](#security-checklist)
- [Troubleshooting](#troubleshooting)

## Prerequisites

Before deploying, ensure you have:

- Node.js 20.x or higher
- PostgreSQL 14 or higher
- GitHub OAuth credentials
- SSL certificate (for production)
- Domain name (optional but recommended)

## Environment Configuration

### Required Environment Variables

Create a `.env.production` file with the following variables:

```env
# Database
POSTGRES_URL="postgresql://user:password@host:port/database?sslmode=require"

# Authentication
AUTH_SECRET="your-strong-random-secret-key"
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"

# Optional: GitHub Enterprise
GITHUB_ENTERPRISE_URL="https://github.yourcompany.com"

# Application
NODE_ENV="production"
NEXTAUTH_URL="https://yourdomain.com"
```

### Generating AUTH_SECRET

```bash
openssl rand -base64 32
```

### GitHub OAuth Setup

#### For GitHub.com

1. Go to https://github.com/settings/developers
2. Click "New OAuth App"
3. Fill in the details:
   - **Application name:** System Monitor
   - **Homepage URL:** `https://yourdomain.com`
   - **Authorization callback URL:** `https://yourdomain.com/api/auth/callback/github`
4. Click "Register application"
5. Copy the Client ID and generate a Client Secret

#### For GitHub Enterprise

1. Go to your GitHub Enterprise settings
2. Navigate to Developer settings > OAuth Apps
3. Follow the same process as above
4. Set `GITHUB_ENTERPRISE_URL` in your environment

## Docker Deployment

### Using Docker Compose (Recommended)

1. **Clone the repository:**
   ```bash
   git clone https://github.com/navuluri/system-monitor-frontend.git
   cd system-monitor-frontend
   ```

2. **Create environment file:**
   ```bash
   cp .env.example .env.production
   # Edit .env.production with your values
   ```

3. **Build and start services:**
   ```bash
   docker-compose up -d
   ```

4. **Initialize database:**
   ```bash
   docker-compose exec postgres psql -U postgres -d system_monitor -f /docker-entrypoint-initdb.d/init.sql
   ```

5. **Access the application:**
   ```
   http://localhost:3000
   ```

### Custom Docker Build

1. **Build the image:**
   ```bash
   docker build -t system-monitor:latest .
   ```

2. **Run the container:**
   ```bash
   docker run -d \
     --name system-monitor \
     -p 3000:3000 \
     -e POSTGRES_URL="your-database-url" \
     -e AUTH_SECRET="your-secret" \
     -e GITHUB_CLIENT_ID="your-client-id" \
     -e GITHUB_CLIENT_SECRET="your-client-secret" \
     system-monitor:latest
   ```

### Docker Compose Production Configuration

```yaml
version: '3.8'

services:
  web:
    image: system-monitor:latest
    restart: always
    ports:
      - "3000:3000"
    environment:
      - POSTGRES_URL=${POSTGRES_URL}
      - AUTH_SECRET=${AUTH_SECRET}
      - GITHUB_CLIENT_ID=${GITHUB_CLIENT_ID}
      - GITHUB_CLIENT_SECRET=${GITHUB_CLIENT_SECRET}
      - NODE_ENV=production
    depends_on:
      - postgres
    networks:
      - system-monitor

  postgres:
    image: postgres:16-alpine
    restart: always
    environment:
      - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
      - POSTGRES_DB=system_monitor
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./lib/scripts.sql:/docker-entrypoint-initdb.d/init.sql
    networks:
      - system-monitor

volumes:
  postgres_data:

networks:
  system-monitor:
```

## Vercel Deployment

### Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/system-monitor)

### Manual Deployment

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   vercel --prod
   ```

4. **Configure environment variables in Vercel Dashboard:**
   - Go to your project settings
   - Navigate to Environment Variables
   - Add all required variables

### Vercel Configuration

Create `vercel.json`:

```json
{
  "buildCommand": "pnpm build",
  "devCommand": "pnpm dev",
  "installCommand": "pnpm install",
  "framework": "nextjs",
  "regions": ["iad1"]
}
```

### Database on Vercel

Use Vercel Postgres or connect to an external PostgreSQL instance:

```bash
vercel postgres create
```

## AWS Deployment

### Using AWS Elastic Beanstalk

1. **Install EB CLI:**
   ```bash
   pip install awsebcli
   ```

2. **Initialize EB:**
   ```bash
   eb init -p docker system-monitor
   ```

3. **Create environment:**
   ```bash
   eb create system-monitor-prod
   ```

4. **Set environment variables:**
   ```bash
   eb setenv POSTGRES_URL=xxx AUTH_SECRET=xxx GITHUB_CLIENT_ID=xxx GITHUB_CLIENT_SECRET=xxx
   ```

5. **Deploy:**
   ```bash
   eb deploy
   ```

### Using AWS ECS with Fargate

1. **Create ECR repository:**
   ```bash
   aws ecr create-repository --repository-name system-monitor
   ```

2. **Build and push image:**
   ```bash
   aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin your-account-id.dkr.ecr.us-east-1.amazonaws.com
   
   docker build -t system-monitor .
   docker tag system-monitor:latest your-account-id.dkr.ecr.us-east-1.amazonaws.com/system-monitor:latest
   docker push your-account-id.dkr.ecr.us-east-1.amazonaws.com/system-monitor:latest
   ```

3. **Create ECS task definition and service** (use AWS Console or CloudFormation)

### Using AWS RDS for Database

```bash
aws rds create-db-instance \
  --db-instance-identifier system-monitor-db \
  --db-instance-class db.t3.micro \
  --engine postgres \
  --master-username postgres \
  --master-user-password your-password \
  --allocated-storage 20
```

## Self-Hosted Deployment

### Using PM2

1. **Install PM2:**
   ```bash
   npm install -g pm2
   ```

2. **Build the application:**
   ```bash
   pnpm install
   pnpm build
   ```

3. **Create ecosystem file** (`ecosystem.config.js`):
   ```javascript
   module.exports = {
     apps: [{
       name: 'system-monitor',
       script: 'node_modules/next/dist/bin/next',
       args: 'start',
       instances: 2,
       exec_mode: 'cluster',
       env: {
         NODE_ENV: 'production',
         PORT: 3000,
       },
       env_file: '.env.production'
     }]
   };
   ```

4. **Start with PM2:**
   ```bash
   pm2 start ecosystem.config.js
   pm2 save
   pm2 startup
   ```

### Using Nginx as Reverse Proxy

Create `/etc/nginx/sites-available/system-monitor`:

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    # Redirect to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com;

    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    # Security headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Enable the site:
```bash
sudo ln -s /etc/nginx/sites-available/system-monitor /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### Using systemd Service

Create `/etc/systemd/system/system-monitor.service`:

```ini
[Unit]
Description=System Monitor
After=network.target postgresql.service

[Service]
Type=simple
User=www-data
WorkingDirectory=/var/www/system-monitor
Environment=NODE_ENV=production
EnvironmentFile=/var/www/system-monitor/.env.production
ExecStart=/usr/bin/node /var/www/system-monitor/node_modules/next/dist/bin/next start
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

Enable and start:
```bash
sudo systemctl enable system-monitor
sudo systemctl start system-monitor
sudo systemctl status system-monitor
```

## Database Setup

### PostgreSQL Installation

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install postgresql postgresql-contrib

# Start service
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

### Database Initialization

```bash
# Connect to PostgreSQL
sudo -u postgres psql

# Create database and user
CREATE DATABASE system_monitor;
CREATE USER system_monitor_user WITH PASSWORD 'your-password';
GRANT ALL PRIVILEGES ON DATABASE system_monitor TO system_monitor_user;
\q

# Initialize schema
psql -U system_monitor_user -d system_monitor -f lib/scripts.sql
```

### Database Backups

Set up automated backups:

```bash
#!/bin/bash
# backup-db.sh
BACKUP_DIR="/var/backups/system-monitor"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
mkdir -p $BACKUP_DIR

pg_dump -U postgres system_monitor | gzip > "$BACKUP_DIR/backup_$TIMESTAMP.sql.gz"

# Keep only last 7 days
find $BACKUP_DIR -name "backup_*.sql.gz" -mtime +7 -delete
```

Add to crontab:
```bash
0 2 * * * /path/to/backup-db.sh
```

## Monitoring Agents

Deploy monitoring agents on target servers. The agents should expose the API endpoints documented in [API.md](API.md).

### Agent Requirements

- HTTP server exposing `/api/v1/*` endpoints
- System metrics collection (CPU, memory, disk, network, processes)
- Configurable port (default: 8080)
- Optional: Authentication with API keys

### Security Recommendations

1. **Use authentication** for agent communication
2. **Run behind firewall** - only allow connections from monitoring dashboard
3. **Use HTTPS** for agent communication
4. **Run with minimal privileges**
5. **Keep agents updated**

## Security Checklist

Before going to production:

- [ ] Use HTTPS (SSL/TLS certificate)
- [ ] Strong, random `AUTH_SECRET`
- [ ] Database with strong password
- [ ] Enable database SSL in production
- [ ] Set up firewall rules
- [ ] Use environment variables (never commit secrets)
- [ ] Enable security headers
- [ ] Set up rate limiting
- [ ] Regular security updates
- [ ] Monitor logs for suspicious activity
- [ ] Set up automated backups
- [ ] Test disaster recovery procedures

## Troubleshooting

### Application Won't Start

**Check environment variables:**
```bash
# Verify all required vars are set
env | grep -E 'POSTGRES_URL|AUTH_SECRET|GITHUB'
```

**Check database connection:**
```bash
psql "$POSTGRES_URL"
```

**Check logs:**
```bash
# Docker
docker-compose logs web

# PM2
pm2 logs system-monitor

# systemd
journalctl -u system-monitor -f
```

### Database Connection Errors

**Error:** `Connection refused`
- Check PostgreSQL is running
- Verify connection string
- Check firewall rules

**Error:** `SSL required`
- Add `?sslmode=require` to connection string
- Or disable SSL for development: `?sslmode=disable`

### Authentication Issues

**Users can't log in:**
- Verify GitHub OAuth credentials
- Check callback URL matches configuration
- Ensure `NEXTAUTH_URL` is correct

### Performance Issues

**Slow page loads:**
- Check database indexes
- Monitor database queries
- Increase connection pool size
- Consider caching with Redis

## Support

Need help with deployment?

- 📖 [Documentation](README.md)
- 🐛 [Report Issues](https://github.com/yourusername/system-monitor/issues)
- 💬 [Discussions](https://github.com/yourusername/system-monitor/discussions)

---

**Happy Deploying! 🚀**

