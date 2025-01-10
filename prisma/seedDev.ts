import { hashPassword } from '@/lib/server/utils/passwordUtils';
import { PrismaClient, Difficulty, CodeType } from '@prisma/client';

export const seedDev = async (prisma: PrismaClient) => {
  // ** Roles **
  const roles = [
    { id: '2f82b70c-2615-49c8-bf53-209bd52e031c', name: 'SuperAdmin' },
    { id: '4d7bb39d-5acb-4255-99fc-595ba4718f45', name: 'Admin' },
    { id: '3fc523ca-5ab8-4f5d-ae24-9e85588256fe', name: 'Student' },
  ];

  const [superAdminRole, adminRole, studentRole] = await Promise.all(
    roles.map(role =>
      prisma.role.create({
        data: role,
      }),
    ),
  );

  // ** Users **
  const superAdminUser = await prisma.user.create({
    data: {
      username: 'Sadmin',
      email: 'sadmin@example.com',
      password: hashPassword('123test123'),
      score: 1000,
      avatar: 'https://imgproxy.attic.sh/unsafe/rs:fit:768:768:1:1/t:1:FF00FF:false:false/pngo:false:true:256/aHR0cHM6Ly9hdHRp/Yy5zaC9idmFtOXk0/YXhyYWRrOGdzOGpo/NWQ5MjFrN2px.png', 
      roleId: superAdminRole.id,
      badge: '10X',
    },
  });

  const adminUser = await prisma.user.create({
    data: {
      username: 'admin',
      email: 'admin@example.com',
      password: hashPassword('123test123'),
      score: 500,
      avatar: 'https://i.imgur.com/5KY0hOz.png', 
      roleId: adminRole.id,
      badge: 'Veteran',
    },
  });

  const [studentUser1] = await Promise.all([
    prisma.user.create({
      data: {
        username: 'student1',
        email: 'student1@example.com',
        password: hashPassword('123test123'),
        score: 100,
        roleId: studentRole.id,
      },
    }),
    prisma.user.create({
      data: {
        username: 'student2',
        email: 'student2@example.com',
        password: hashPassword('123test123'),
        score: 20,
        roleId: studentRole.id,
      },
    }),
  ]);

  // ** Categorieën aanmaken **
  const categories = [
    { name: 'Frontend', description: 'Frontend development exercises' },
    { name: 'Backend', description: 'Backend development exercises' },
    { name: 'Database', description: 'Database exercises' },
  ];

  const categoryRecords = await Promise.all(
    categories.map(category =>
      prisma.category.create({
        data: category,
      }),
    ),
  );


  // Real exercise
    // Palindrome Exercise
    const exerciseOne = await prisma.exercise.create({
      data: {
        title: 'Check Palindrome',
        description: 'Write a function that checks if a given string is a palindrome. A palindrome reads the same forwards and backwards, ignoring case and non-alphanumeric characters.',
        difficulty: Difficulty.MEDIUM,
        createdBy: superAdminUser.id,
        categories: {
          connect: [{ id: categoryRecords[1].id }],
        },
      },
    });
  
    // Test Cases for Palindrome Exercise
    const testCasesForEx1 = [
      {
        input: '"racecar"',
        expectedOutput: 'true',
      },
      {
        input: '"hello"',
        expectedOutput: 'false',
      },
      {
        input: '"A man, a plan, a canal, Panama"',
        expectedOutput: 'true',
      },
      {
        input: '"12321"',
        expectedOutput: 'true',
      },
      {
        input: '"12345"',
        expectedOutput: 'false',
      },
    ];


  await Promise.all(
    testCasesForEx1.map(testCase =>
      prisma.testCase.create({
        data: {
          exerciseId: exerciseOne.id,
          input: testCase.input,
          expectedOutput: testCase.expectedOutput,
        },
      }),
    ),
  );

  // Hints for Palindrome exercise
  const hintsForEx1 = [
    "Remove all non-alphanumeric characters and convert the string to lowercase. You can use a regular expression",
    "Compare the cleaned string to its reversed version.",
    "Remember that an empty string or a string with only one character is always a palindrome. Use this as an edge case!"
  ]

  await Promise.all(
    hintsForEx1.map(hint =>
      prisma.hints.create({
        data: {
          exerciseId: exerciseOne.id,
          content: hint,
        },
      }),
    ),
  );

  // Start Code for Palindrome Exercise
  const startCode = `const isPalindrome = (str) => {
    // Your code here
    return false;
  }`;

  await prisma.startCode.create({
    data: {
      code: startCode,
      type: CodeType.JAVASCRIPT,
      exerciseId: exerciseOne.id,
    },
  });


  // ** Oefeningen aanmaken **
  const exercises = Array.from({ length: 10 }, (_, i) => ({
    title: `Exercise ${i + 1}`,
    description: `Solve problem ${i + 1}`,
    difficulty: i % 3 === 0 ? Difficulty.EASY : i % 3 === 1 ? Difficulty.MEDIUM : Difficulty.HARD,
    createdBy: adminUser.id,
    categories: {
      connect: [
        {
          id: categoryRecords[i % categoryRecords.length].id,
        },
      ],
    },
  }));

  const exerciseRecords = await Promise.all(
    exercises.map(exercise =>
      prisma.exercise.create({
        data: exercise,
      }),
    ),
  );

  // ** Test Cases **
  const testCases = exerciseRecords.flatMap((exercise, i) =>
    Array.from({ length: 3 }, (_, j) => ({
      exerciseId: exercise.id,
      input: `Input ${j + 1} for Exercise ${i + 1}`,
      expectedOutput: `Output ${j + 1} for Exercise ${i + 1}`,
    })),
  );

  await Promise.all(
    testCases.map(testCase =>
      prisma.testCase.create({
        data: testCase,
      }),
    ),
  );

  // ** Start Code **
  const startCodes = exerciseRecords.flatMap(exercise => [
    {
      code: `console.log('JavaScript start code for ${exercise.title}');`,
      type: CodeType.JAVASCRIPT,
      exerciseId: exercise.id,
    },
    {
      code: `/* CSS start code for ${exercise.title} */\nbody { font-family: Arial; }`,
      type: CodeType.CSS,
      exerciseId: exercise.id,
    },
    {
      code: `<!DOCTYPE html>\n<html>\n<head><title>${exercise.title}</title></head>\n<body></body>\n</html>`,
      type: CodeType.HTML,
      exerciseId: exercise.id,
    },
  ]);

  await Promise.all(
    startCodes.map(startCode =>
      prisma.startCode.create({
        data: startCode,
      }),
    ),
  );

  // Results
  const createdResults = await Promise.all(
    exerciseRecords.map(exercise =>
      prisma.result.create({
        data: {
          userId: studentUser1.id,
          exerciseId: exercise.id,
          score: Math.floor(Math.random() * 100),
          submittedCode: `Solution for ${exercise.title}`,
          submissionDate: new Date(),
        },
      }),
    ),
  );

  // Feedback
  const feedbacks = createdResults.map(result => ({
    resultId: result.id,
    adminId: adminUser.id,
    comment: `Feedback for result ${result.score}`,
  }));

  await Promise.all(
    feedbacks.map(feedback =>
      prisma.feedback.create({
        data: feedback,
      }),
    ),
  );

  console.log('Seed data created successfully!');
};
