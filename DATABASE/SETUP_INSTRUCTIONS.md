# MongoDB Database Setup Guide for Smart Civic Platform

## Quick Start - Choose ONE Option

### Option 1: MongoDB Atlas (Cloud - Easiest)
```
1. Go to: https://www.mongodb.com/cloud/atlas
2. Sign up (free account)
3. Create a cluster (M0 free tier)
4. Get your connection string
5. Update backend/.env:
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/smart-civic?retryWrites=true&w=majority
```

### Option 2: Local MongoDB (Windows)
```
1. Download: https://www.mongodb.com/try/download/community
2. Install with default settings
3. Open PowerShell and run: mongod
4. Connection string: mongodb://localhost:27017/smart-civic-platform
```

### Option 3: Docker (Recommended)
```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
# Connection: mongodb://localhost:27017/smart-civic-platform
```

---

## Database Collections

### 1. USERS
- Stores citizen, worker, and admin accounts
- Fields: name, email, phone, password, role, language, complaints

### 2. COMPLAINTS
- Stores all citizen complaints
- Fields: complaintId, userId, type, priority, description, status, location, media

### 3. WORKERS
- Stores worker information
- Fields: userId, department, assignedComplaints, currentLocation, status

### 4. CHATMESSAGES
- Stores chatbot conversations
- Fields: complaintId, userId, message, sender (user/bot)

---

## Setup Instructions

### Step 1: Install MongoDB Locally (Windows)
```powershell
# Download and install MongoDB Community Edition
# https://www.mongodb.com/try/download/community

# Start MongoDB service
mongod
```

### Step 2: Create Database and Collections
```bash
# Option A: Using mongosh (interactive)
mongosh
# Then copy-paste commands from MONGODB_SETUP.js

# Option B: Using batch file (Windows)
.\init-db.bat

# Option C: Using shell script (Mac/Linux)
./init-db.sh
```

### Step 3: Verify Collections
```bash
mongosh
use smart-civic-platform
show collections
# Should show: users, complaints, workers, chatmessages
```

---

## Connection Strings

| Option | Connection String |
|--------|------------------|
| Local | `mongodb://localhost:27017/smart-civic-platform` |
| Docker | `mongodb://localhost:27017/smart-civic-platform` |
| Atlas | `mongodb+srv://user:pass@cluster.mongodb.net/smart-civic?retryWrites=true&w=majority` |

---

## Environment Configuration

Edit `backend/.env`:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/smart-civic-platform
JWT_SECRET=your_jwt_secret_key_change_this
JWT_EXPIRE=7d
NODE_ENV=development
CORS_ORIGIN=http://localhost:8000
```

---

## Sample Data

### Create Admin User
```javascript
db.users.insertOne({
  name: "Admin",
  email: "admin@civic.gov",
  phone: "+1234567890",
  password: "$2a$10$...", // hashed password
  role: "admin",
  language: "en",
  complaints: [],
  createdAt: new Date(),
  updatedAt: new Date()
});
```

### Create Sample Complaint
```javascript
db.complaints.insertOne({
  complaintId: "CMP-20240201-001",
  userId: ObjectId("..."),
  type: "pothole",
  priority: "high",
  description: "Large pothole on Main Street",
  status: "submitted",
  contactName: "John Doe",
  contactPhone: "+1234567890",
  location: {
    latitude: 40.7128,
    longitude: -74.0060,
    address: "Main Street, NY"
  },
  media: [],
  createdAt: new Date(),
  updatedAt: new Date()
});
```

---

## Backup & Restore

### Backup Database
```bash
mongodump --db smart-civic-platform --out ./backup
```

### Restore Database
```bash
mongorestore --db smart-civic-platform ./backup/smart-civic-platform
```

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Connection refused | Ensure MongoDB is running (`mongod`) |
| Database not found | Run setup script to create collections |
| Collections empty | Insert sample data or submit complaints via app |
| Authentication fails | Check MongoDB user credentials |

---

## Documentation Files Location

- Database setup: `database/MONGODB_SETUP.js`
- Init script (Windows): `backend/scripts/init-db.bat`
- Init script (Unix): `backend/scripts/init-db.sh`
- Environment config: `backend/.env.example`
