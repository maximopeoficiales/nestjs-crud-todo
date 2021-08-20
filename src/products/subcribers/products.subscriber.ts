import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { Product } from '../entities/product.entity';

@EventSubscriber()
export class ProductSubscriber implements EntitySubscriberInterface<Product> {
  constructor(connection: Connection) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return Product;
  }
  // antes de insertar puedo modificar sus datos
  beforeInsert(event: InsertEvent<Product>) {
    // console.log(`BEFORE USER INSERTED: `, event.entity);
    // event.entity.name += " a"
  }
  
  // hay otros metodos que implementar
}