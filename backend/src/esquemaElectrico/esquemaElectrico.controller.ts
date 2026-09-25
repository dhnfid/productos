import { 
  Body, 
  Controller, 
  Delete, 
  Get, 
  Param, 
  ParseUUIDPipe, 
  Post, 
  Put, 
  UploadedFiles, 
  UseInterceptors 
} from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";
import { EsquemaElectricoService } from "./esquemaElectrico.service";
import { EsquemaElectrico } from "./entity/esquemaElectrico.entity";
import { UpdateEsquemaElectricoDto } from "./DTO/update-esquemaElectrico.dto";
import { CreateEsquemaElectricoDto } from "./DTO/create-esquemaElectrico.dto";

const storageConfig = diskStorage({
  destination: './uploads/esquemas',
  filename: (req, file, callback) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = extname(file.originalname);
    callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  },
});

@Controller('esquemaElectrico')
export class EsquemaElectricoController {
  constructor(private readonly esquemaElectricoService: EsquemaElectricoService) {}

  @Get()
  findAll(): Promise<EsquemaElectrico[]> {
    return this.esquemaElectricoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<EsquemaElectrico> {
    return this.esquemaElectricoService.findOne(id);
  }

  // Se pasa a FilesInterceptor para aceptar hasta 10 archivos en el campo 'files'
  @Post()
  @UseInterceptors(FilesInterceptor('files', 10, { storage: storageConfig }))
  create(
    @Body() createEsquemaElectricoDto: CreateEsquemaElectricoDto,
    @UploadedFiles() files?: any[],
  ): Promise<EsquemaElectrico> {
    return this.esquemaElectricoService.create(createEsquemaElectricoDto, files);
  }

  @Put(':id')
  @UseInterceptors(FilesInterceptor('files', 10, { storage: storageConfig }))
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateEsquemaElectricoDto: UpdateEsquemaElectricoDto,
    @UploadedFiles() files?: any[],
  ): Promise<EsquemaElectrico> {
    return this.esquemaElectricoService.update(id, updateEsquemaElectricoDto, files);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<{ message: string }> {
    return this.esquemaElectricoService.remove(id);
  }
}