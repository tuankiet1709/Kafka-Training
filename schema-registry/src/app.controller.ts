import { Controller, Get } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @MessagePattern({ cmd: 'get_schema_registry_id' })
  async getSchemaRegistryId(data: any): Promise<number> {
    console.log('data:', data);
    try {
      const id = await this.appService.getSchemaRegistryId(data);
      if (id) {
        return id;
      }
    } catch (err) {
      console.log(err);
    }
  }
}
