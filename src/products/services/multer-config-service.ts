import { Injectable } from "@nestjs/common";
import { MulterModuleOptions, MulterOptionsFactory } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { editFileName, imageFileFilter } from "src/utils/file-uploading.utils";

@Injectable()
export class MulterConfigService implements MulterOptionsFactory {
    createMulterOptions(): MulterModuleOptions {
        return {
            // dest es la direccion donde se guardan en memoria
            dest: './upload',
            storage: diskStorage({
                // donde se guardan realmente
                destination: './files',
                filename: editFileName,
            }),
            fileFilter: imageFileFilter,
        };
    }

}