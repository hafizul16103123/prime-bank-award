import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Prime Bank API",
      version: "1.0.0",
      description: "API documentation for Prime Bank application",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        User: {
          type: "object",
          properties: {
            name: { type: "string" },
            email: { type: "string", format: "email" },
            password: { type: "string" },
            role: {
              type: "string",
              enum: ["STUDENT", "SCHOOL_ADMIN", "ADMIN"],
            },
          },
          required: ["name", "email", "password"],
        },
        Student: {
          type: "object",
          properties: {
            userId: { type: "string" },
            dateOfBirth: { type: "string", format: "date" },
            gender: {
              type: "string",
              enum: ["MALE", "FEMALE", "OTHER", "PREFER_NOT_TO_SAY"],
            },
            phoneNumber: { type: "string" },
            email: { type: "string", format: "email" },
            school: { type: "string" },
            rollNumber: { type: "string" },
            photoUrl: {
              type: "string",
              example: "https://example.com/photo.jpg",
            },
            applyingForLevel: {
              type: "string",
              enum: ["A Level", "O Level"],
            },
            yearOfExamination: { type: "number" },
            examinationSession: {
              type: "string",
              enum: ["OCT_NOV", "MAY_JUNE", "FEB_MARCH"],
            },
            examinationBoard: {
              type: "string",
              enum: ["CAMBRIDGE", "EDEXCEL", "AQA", "OCR"],
            },
            studyGroup: {
              type: "string",
              enum: ["SCIENCE", "ARTS", "COMMERCE"],
            },
            oLevelSubjects: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  grade: { type: "string" },
                  paperCode: { type: "string" },
                },
              },
            },
            aLevelSubjects: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  grade: { type: "string" },
                  paperCode: { type: "string" },
                },
              },
            },
          },
          required: [
            "dateOfBirth",
            "gender",
            "phoneNumber",
            "school",
            "applyingForLevel",
            "yearOfExamination",
            "examinationSession",
          ],
        },
        LoginRequest: {
          type: "object",
          properties: {
            email: { type: "string", format: "email" },
            password: { type: "string" },
          },
          required: ["email", "password"],
        },
        ForgetPasswordRequest: {
          type: "object",
          properties: {
            email: { type: "string", format: "email" },
          },
          required: ["email"],
        },
        ResetPasswordRequest: {
          type: "object",
          properties: {
            email: { type: "string", format: "email" },
            otp: { type: "string" },
            newPassword: { type: "string" },
          },
          required: ["email", "otp", "newPassword"],
        },
      },
    },
  },
  apis: ["./src/app/api/**/route.ts"],
};

export const swaggerSpec = swaggerJsdoc(options);
