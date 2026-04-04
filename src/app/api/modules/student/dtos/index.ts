import { IsString, IsEmail, IsOptional, IsDateString, IsNumber, IsArray, ValidateNested, IsEnum, IsNotEmpty, Min, Max, IsMongoId } from "class-validator";
import { Type } from "class-transformer";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import mongoose from "mongoose";

export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
  OTHER = "OTHER",
  PREFER_NOT_TO_SAY = "PREFER_NOT_TO_SAY",
}

export enum ExaminationLevel {
  AS_A2 = "AS_A2",
  CAMBRIDGE_CIE = "CAMBRIDGE_CIE",
}

export enum StudyGroup {
  SCIENCE = "SCIENCE",
  ARTS = "ARTS",
  COMMERCE = "COMMERCE",
}

export enum ExaminationBoard {
  CAMBRIDGE = "CAMBRIDGE",
  EDEXCEL = "EDEXCEL",
  AQA = "AQA",
  OCR = "OCR",
}

export enum ExaminationSession {
  OCT_NOV = "OCT_NOV",
  MAY_JUNE = "MAY_JUNE",
  FEB_MARCH = "FEB_MARCH",
}

export class SubjectDto {
  @ApiProperty({ example: "Mathematics" })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: "A" })
  @IsString()
  @IsNotEmpty()
  grade: string;

  @ApiPropertyOptional({ example: "4024" })
  @IsString()
  @IsOptional()
  paperCode?: string;
}

export class CreateStudentDto {
  @ApiProperty({ example: "John Doe" })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: "john@example.com" })
  @IsEmail()
  email: string;

  @ApiProperty({ example: "password123" })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiPropertyOptional({ example: "STUDENT" })
  @IsString()
  @IsOptional()
  role?: string;

  @ApiProperty({ example: "2005-05-15" })
  @IsDateString()
  dateOfBirth: string;

  @ApiProperty({ example: "MALE", enum: Gender })
  @IsEnum(Gender)
  gender: Gender;

  @ApiProperty({ example: "+1234567890" })
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty({ example: "ABC High School" })
  @IsString()
  @IsNotEmpty()
  school: string;

  @ApiPropertyOptional({ example: "12345" })
  @IsString()
  @IsOptional()
  rollNumber?: string;

  @ApiPropertyOptional({ example: "https://example.com/photo.jpg" })
  @IsString()
  @IsOptional()
  photoUrl?: string;

  @ApiProperty({ example: "AS_A2", enum: ExaminationLevel })
  @IsEnum(ExaminationLevel)
  applyingForLevel: ExaminationLevel;

  @ApiProperty({ example: 2024 })
  @IsNumber()
  @IsNotEmpty()
  @Min(2020)
  @Max(2030)
  yearOfExamination: number;

  @ApiProperty({ example: "OCT_NOV", enum: ExaminationSession })
  @IsEnum(ExaminationSession)
  examinationSession: ExaminationSession;

  @ApiPropertyOptional({ example: "CAMBRIDGE", enum: ExaminationBoard })
  @IsEnum(ExaminationBoard)
  @IsOptional()
  examinationBoard?: ExaminationBoard;

  @ApiPropertyOptional({ example: "SCIENCE", enum: StudyGroup })
  @IsEnum(StudyGroup)
  @IsOptional()
  studyGroup?: StudyGroup;

  @ApiPropertyOptional({
    example: [{ name: "Mathematics", grade: "A", paperCode: "4024" }],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SubjectDto)
  @IsOptional()
  oLevelSubjects?: SubjectDto[];

  @ApiPropertyOptional({ example: [] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SubjectDto)
  @IsOptional()
  aLevelSubjects?: SubjectDto[];
}

export class StudentResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  email: string;

  @ApiProperty({ example: "2005-05-15" })
  dateOfBirth: Date;

  @ApiProperty({ enum: Gender })
  gender: Gender;

  @ApiProperty()
  phoneNumber: string;

  @ApiProperty()
  school: string;

  @ApiPropertyOptional()
  rollNumber?: string;

  @ApiPropertyOptional()
  photoUrl?: string;

  @ApiProperty({ enum: ExaminationLevel })
  applyingForLevel: ExaminationLevel;

  @ApiProperty()
  yearOfExamination: number;

  @ApiProperty({ enum: ExaminationSession })
  examinationSession: ExaminationSession;

  @ApiPropertyOptional({ enum: ExaminationBoard })
  examinationBoard?: ExaminationBoard;

  @ApiPropertyOptional({ enum: StudyGroup })
  studyGroup?: StudyGroup;

  @ApiPropertyOptional({ type: [SubjectDto] })
  oLevelSubjects?: SubjectDto[];

  @ApiPropertyOptional({ type: [SubjectDto] })
  aLevelSubjects?: SubjectDto[];
}
