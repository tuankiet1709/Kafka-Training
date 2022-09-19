import { SchemaRegistry, readAVSC } from '@kafkajs/confluent-schema-registry';
import { Injectable } from '@nestjs/common';

const registry = new SchemaRegistry({
  host: 'http://localhost:8081',
});

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  async getSchemaRegistryId(data: any): Promise<number> {
    try {
      const { id } = await registry.register(data);
      return id;
    } catch (e) {
      console.log(e);
    }
  }
}
