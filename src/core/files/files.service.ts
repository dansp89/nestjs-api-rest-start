// @file: src/files/files.service.ts

import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/src/core/prisma/prisma.service';
import { Multer } from 'multer'; // Importa o tipo Multer do pacote multer
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FilesService {
  constructor(private prisma: PrismaService) {}

  async uploadFile(file: Multer.File) {
    // Gera um nome único para o arquivo
    const uniqueFilename = `${uuidv4()}-${file.originalname}`;

    // Define o caminho onde o arquivo será salvo
    const filePath = join(__dirname, '../../uploads', uniqueFilename);

    // Salva o arquivo no sistema de arquivos
    await writeFile(filePath, file.buffer);

    // URL do arquivo (adaptar conforme necessário para o seu serviço de armazenamento)
    const fileUrl = `http://localhost:3000/uploads/${uniqueFilename}`;

    // Cria um registro no banco de dados com a URL do arquivo
    return this.prisma.file.create({
      data: {
        name: file.originalname,
        url: fileUrl,
      },
    });
  }

  create(data: { name: string; url: string }) {
    return this.prisma.file.create({ data });
  }

  findAll({
    page,
    limit,
    sortBy,
    sortOrder,
    nameFilter,
    dateRangeStart,
    dateRangeEnd,
  }: {
    page: number;
    limit: number;
    sortBy: string;
    sortOrder: 'asc' | 'desc';
    nameFilter: string;
    dateRangeStart?: Date;
    dateRangeEnd?: Date;
  }) {
    return this.prisma.file.findMany({
      where: {
        name: {
          contains: nameFilter,
        },
        createdAt: {
          gte: dateRangeStart,
          lte: dateRangeEnd,
        },
      },
      orderBy: {
        [sortBy]: sortOrder,
      },
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  findOne(id: string) {
    return this.prisma.file.findUnique({ where: { id } });
  }

  update(id: string, data: { name?: string; url?: string }) {
    return this.prisma.file.update({ where: { id }, data });
  }

  delete(id: string) {
    return this.prisma.file.delete({ where: { id } });
  }
}
