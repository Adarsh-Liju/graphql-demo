const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');

  // Create sample courses
  const course1 = await prisma.course.upsert({
    where: { id: 1 },
    update: {},
    create: {
      title: 'Introduction to Computer Science',
      description: 'Learn the basics of programming and computer science',
    },
  });

  const course2 = await prisma.course.upsert({
    where: { id: 2 },
    update: {},
    create: {
      title: 'Advanced Mathematics',
      description: 'Advanced mathematical concepts and problem solving',
    },
  });

  const course3 = await prisma.course.upsert({
    where: { id: 3 },
    update: {},
    create: {
      title: 'Data Structures and Algorithms',
      description: 'Learn fundamental data structures and algorithms',
    },
  });

  // Create sample students
  const student1 = await prisma.student.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: 'Alice Johnson',
      age: 20,
    },
  });

  const student2 = await prisma.student.upsert({
    where: { id: 2 },
    update: {},
    create: {
      name: 'Bob Smith',
      age: 22,
    },
  });

  const student3 = await prisma.student.upsert({
    where: { id: 3 },
    update: {},
    create: {
      name: 'Charlie Brown',
      age: 19,
    },
  });

  // Enroll students in courses
  await prisma.student.update({
    where: { id: 1 },
    data: {
      courses: {
        connect: [{ id: 1 }, { id: 2 }]
      }
    }
  });

  await prisma.student.update({
    where: { id: 2 },
    data: {
      courses: {
        connect: [{ id: 1 }, { id: 3 }]
      }
    }
  });

  await prisma.student.update({
    where: { id: 3 },
    data: {
      courses: {
        connect: [{ id: 2 }]
      }
    }
  });

  console.log('Created courses:', { course1, course2, course3 });
  console.log('Created students:', { student1, student2, student3 });
  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
