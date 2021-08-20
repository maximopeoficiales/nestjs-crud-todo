import { Controller, Get, StreamableFile } from '@nestjs/common';
import { createReadStream } from 'fs';
import { join } from 'path/posix';
import path from 'path'
import { Header } from '@nestjs/common';

@Controller('file')
export class FileController {
    @Header("Content-disposition", "attachment; filename=package.json")
    @Get()
    getFile(): StreamableFile {
        const pathT = join(process.cwd(), 'package.json');
        const file = createReadStream(pathT);

        return new StreamableFile(file);
    }
}
