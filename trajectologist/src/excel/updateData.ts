import { BadRequestException } from '@nestjs/common';
import * as ExcelJs from 'exceljs';
import * as path from 'path';
import { PrismaService } from 'src/prisma/prisma.service';
export default async function updateData() {
  const prisma = new PrismaService();
  const workbook = new ExcelJs.Workbook();
  const pathToFile = path.join(process.cwd(), '/src/excel/updateData.xlsx');
  await workbook.xlsx.readFile(pathToFile);

  const promises = workbook.worksheets.map(async (woorksheet, index) => {
    woorksheet.eachRow(async (row, rowIndex) => {
      if (rowIndex > 1) {
        switch (index) {
          case 0:
            await createOrUpdateProfession(row, prisma);
            break;
          case 1:
            await createOrUpdateCopetency(row, prisma);
            break;
          case 2:
            await createOrUpdateStep(row, prisma);
        }
      }
    });
  });
  await Promise.all(promises);
}

async function createOrUpdateProfession(
  row: ExcelJs.Row,
  prisma: PrismaService,
) {
  try {
    const name = row.getCell('A').value.toString().trim();
    const description = row.getCell('B').value.toString().trim();
    const salary = Number(
      row.getCell('C').value.toLocaleString().split(' ').join(''),
    );
    await prisma.profession.upsert({
      where: { name },
      create: {
        name,
        salary,
        description,
      },
      update: {
        name,
        salary,
        description,
      },
    });
  } catch (error) {
    throw new BadRequestException(error);
  }
}
async function createOrUpdateCopetency(
  row: ExcelJs.Row,
  prisma: PrismaService,
) {
  try {
    const name = row.getCell('A').value.toString().trim();
    const description = row.getCell('B').value.toString().trim();
    const profession = row.getCell('C').value.toString().trim();
    await prisma.competency.upsert({
      where: {
        name,
      },
      create: {
        description,
        name,
        professions: {
          connect: {
            name: profession,
          },
        },
      },
      update: {
        name,
        description,
      },
    });
  } catch (error) {
    throw new BadRequestException(error);
  }
}
async function createOrUpdateStep(row: ExcelJs.Row, prisma: PrismaService) {
  try {
    const name = row.getCell('A').value.toString().trim();
    const description = row.getCell('B').value.toString().trim();
    const competency = row.getCell('C').value.toString().trim();
    const steps = await prisma.competency.findFirst({
      where: { name: competency },
      select: {
        steps: {
          where: {
            name,
          },
          select: { id: true },
        },
      },
    });
    await prisma.step.create({
      data: {
        name,
        description,
        competency: {
          connect: {
            name: competency,
          },
        },
      },
    });
  } catch (error) {
    throw new BadRequestException(error);
  }
}
