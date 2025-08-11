const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { ApolloServer } = require("apollo-server-express");
const fs = require("fs");
const path = require("path");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("../static")); // serve playground files (optional)

// ------------------ Schema ------------------
// Load schema from schema.graphql
const typeDefs = fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf8");

// ------------------ Resolvers ------------------
const resolvers = {
  Query: {
    students: async () => {
      return await prisma.student.findMany({
        include: { courses: true }
      });
    },
    student: async (_, { id }) => {
      return await prisma.student.findUnique({
        where: { id: Number(id) },
        include: { courses: true }
      });
    },
    courses: async () => {
      return await prisma.course.findMany({
        include: { students: true }
      });
    },
    course: async (_, { id }) => {
      return await prisma.course.findUnique({
        where: { id: Number(id) },
        include: { students: true }
      });
    }
  },
  Mutation: {
    addStudent: async (_, { name, age }) => {
      const newStudent = await prisma.student.create({
        data: { name, age },
        include: { courses: true }
      });
      return newStudent;
    },
    addCourse: async (_, { title, description }) => {
      const newCourse = await prisma.course.create({
        data: { title, description: description || null },
        include: { students: true }
      });
      return newCourse;
    },
    enrollStudent: async (_, { studentId, courseId }) => {
      const student = await prisma.student.update({
        where: { id: Number(studentId) },
        data: {
          courses: {
            connect: { id: Number(courseId) }
          }
        },
        include: { courses: true }
      });
      return student;
    },
    unenrollStudent: async (_, { studentId, courseId }) => {
      const student = await prisma.student.update({
        where: { id: Number(studentId) },
        data: {
          courses: {
            disconnect: { id: Number(courseId) }
          }
        },
        include: { courses: true }
      });
      return student;
    }
  },
  Student: {
    courses: async (parent) => {
      // parent is a student object
      return await prisma.course.findMany({
        where: {
          students: {
            some: { id: parent.id }
          }
        }
      });
    }
  },
  Course: {
    students: async (parent) => {
      // parent is a course object
      return await prisma.student.findMany({
        where: {
          courses: {
            some: { id: parent.id }
          }
        }
      });
    }
  }
};

// ------------------ Apollo Server ------------------
async function startServer() {
  const apolloServer = new ApolloServer({ typeDefs, resolvers });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app, path: "/graphql" });

  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log('GraphQL server ready at http://localhost:' + port + apolloServer.graphqlPath);
    console.log('Static playground (if present): http://localhost:' + port + '/');
  });
}

startServer();
