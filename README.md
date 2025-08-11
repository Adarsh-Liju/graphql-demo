# TwoSpoon - GraphQL Server with Prisma

A GraphQL server built with Express, Apollo Server, and Prisma ORM.

## Prerequisites

- Node.js (v16 or higher)
- PostgreSQL database
- npm or yarn

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Environment Configuration:**
   Create a `.env` file in the root directory with your database connection:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/twospoon?schema=public"
   ```
   
   Replace the placeholder values with your actual database credentials.

3. **Generate Prisma Client:**
   ```bash
   npm run db:generate
   ```

4. **Database Setup:**
   - **Option 1: Push schema to database (for development):**
     ```bash
     npm run db:push
     ```
   
   - **Option 2: Create and run migrations (for production):**
     ```bash
     npm run db:migrate
     ```

5. **Seed the database (optional):**
   ```bash
   npm run db:seed
   ```

6. **Start the server:**
   ```bash
   npm start
   ```

## Available Scripts

- `npm start` - Start the server
- `npm run dev` - Start the server in development mode
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema changes to database
- `npm run db:migrate` - Create and run database migrations
- `npm run db:studio` - Open Prisma Studio (database GUI)
- `npm run db:seed` - Seed the database with sample data

## Database Schema

The current schema includes:

### Student Model
- **id**: Auto-incrementing primary key
- **name**: String (required)
- **age**: Integer (required)
- **createdAt**: Timestamp
- **updatedAt**: Timestamp
- **courses**: Many-to-many relationship with Course

### Course Model
- **id**: Auto-incrementing primary key
- **title**: String (required)
- **description**: String (optional)
- **createdAt**: Timestamp
- **updatedAt**: Timestamp
- **students**: Many-to-many relationship with Student

## GraphQL Operations

### Queries
- `students` - Get all students with their courses
- `student(id: ID!)` - Get a specific student by ID
- `courses` - Get all courses with their students
- `course(id: ID!)` - Get a specific course by ID

### Mutations
- `addStudent(name: String!, age: Int!)` - Create a new student
- `addCourse(title: String!, description: String)` - Create a new course
- `enrollStudent(studentId: ID!, courseId: ID!)` - Enroll a student in a course
- `unenrollStudent(studentId: ID!, courseId: ID!)` - Remove a student from a course

## Prisma Studio

To view and edit your database through a web interface:
```bash
npm run db:studio
```

This will open Prisma Studio at `http://localhost:5555`

## Project Structure

```
twospoon/
├── prisma/
│   ├── schema.prisma    # Database schema
│   └── seed.js         # Database seeding
├── index.js            # Main server file with GraphQL resolvers
├── schema.graphql      # GraphQL schema
└── package.json
```

## Next Steps

1. Update the `.env` file with your actual database credentials
2. Run `npm run db:push` to create the database tables
3. Start the server with `npm start`
4. Access GraphQL Playground at `http://localhost:4000/graphql`
5. Test the operations with sample queries and mutations
