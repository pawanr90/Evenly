# Evenly - Expense Sharing App

Evenly is a full-stack expense sharing application built with FastAPI (backend) and Next.js (frontend). It allows users to track shared expenses, settle debts, and manage group finances efficiently.

## Features

- User authentication (register/login)
- Create and manage expense groups
- Add and track shared expenses
- Automatic debt calculation and settlement suggestions
- Dark mode UI
- Responsive design

## Tech Stack

### Backend
- FastAPI (Python web framework)
- PostgreSQL (Database)
- SQLAlchemy (ORM)
- Alembic (Database migrations)
- JWT (Authentication)

### Frontend
- Next.js
- TypeScript
- Tailwind CSS
- Axios (API client)

## Prerequisites

- Python 3.11 or higher
- Node.js 18 or higher
- PostgreSQL
- Git

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/pawanr90/Evenly.git
cd Evenly
```

### 2. Backend Setup

1. Create and activate a virtual environment:
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Set up the database:
```bash
# Create a PostgreSQL database named 'evenly'
createdb evenly

# Run database migrations
alembic upgrade head
```

4. Create a `.env` file in the backend directory:
```bash
DATABASE_URL=postgresql://localhost/evenly
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

### 3. Frontend Setup

1. Install dependencies:
```bash
cd frontend
npm install
```

2. Create a `.env.local` file in the frontend directory:
```bash
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Running the Application

### 1. Start the Backend Server

```bash
cd backend
source venv/bin/activate  # On Windows: venv\Scripts\activate
uvicorn app.main:app --reload
```

The backend server will run on http://localhost:8000

### 2. Start the Frontend Development Server

```bash
cd frontend
npm run dev
```

The frontend application will run on http://localhost:3000

## API Documentation

Once the backend server is running, you can access the API documentation at:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Development

### Backend Development

- The backend code is organized in the `backend/app` directory
- API endpoints are defined in `backend/app/api/v1/endpoints`
- Database models are in `backend/app/models`
- Database schemas are in `backend/app/schemas`

### Frontend Development

- The frontend code is organized in the `frontend` directory
- Pages are in `frontend/pages`
- Components are in `frontend/components`
- API client is in `frontend/lib/api.ts`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 