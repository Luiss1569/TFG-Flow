
#!/bin/bash

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
npx prisma migrate dev