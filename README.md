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

## Development Workflow

### Git Branch Strategy

We follow a simplified Git Flow strategy:

1. `main` - Production-ready code
2. `develop` - Integration branch for features
3. Feature branches - For individual features/fixes

### Feature Development Process

1. **Start a New Feature**
   ```bash
   # Create and switch to a new feature branch
   git checkout develop
   git pull origin develop
   git checkout -b feature/your-feature-name
   ```

2. **Development Work**
   - Make your changes
   - Write tests if applicable
   - Commit frequently with meaningful messages
   ```bash
   git add .
   git commit -m "feat: add user authentication"
   ```

3. **Keep Your Branch Updated**
   ```bash
   # While on your feature branch
   git fetch origin
   git rebase origin/develop
   ```

4. **Complete the Feature**
   ```bash
   # Push your feature branch
   git push origin feature/your-feature-name
   ```
   - Create a Pull Request (PR) to merge into `develop`
   - Get code review
   - Address review comments
   - Merge when approved

### Commit Message Convention

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code changes that neither fix bugs nor add features
- `test:` - Adding or modifying tests
- `chore:` - Changes to build process or auxiliary tools

Example:
```bash
git commit -m "feat: add expense sharing functionality"
git commit -m "fix: resolve user authentication issue"
git commit -m "docs: update API documentation"
```

### Code Review Process

1. **Before Submitting a PR**
   - Ensure all tests pass
   - Update documentation if needed
   - Follow the project's coding standards
   - Squash commits if necessary

2. **PR Description Template**
   ```markdown
   ## Description
   [Describe your changes]

   ## Type of Change
   - [ ] New feature
   - [ ] Bug fix
   - [ ] Documentation update
   - [ ] Code refactor
   - [ ] Performance improvement

   ## Testing
   - [ ] Unit tests added/updated
   - [ ] Manual testing completed

   ## Screenshots (if applicable)
   [Add screenshots here]

   ## Additional Notes
   [Any additional information]
   ```

3. **Review Process**
   - At least one approval required
   - All CI checks must pass
   - No merge conflicts
   - Follow up on review comments

### Release Process

1. **Prepare Release**
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b release/v1.x.x
   ```

2. **Version Bump**
   - Update version numbers
   - Update changelog
   - Commit changes

3. **Merge to Main**
   ```bash
   git checkout main
   git merge release/v1.x.x
   git tag -a v1.x.x -m "Release v1.x.x"
   git push origin main --tags
   ```

4. **Back to Develop**
   ```bash
   git checkout develop
   git merge release/v1.x.x
   git push origin develop
   ```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 