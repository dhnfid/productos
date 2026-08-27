import { Products } from './entity/products.entity';
import { Repository } from 'typeorm/browser/repository/Repository.js';
export declare class ProductsService {
    private readonly productsRepository;
    constructor(productsRepository: Repository<Products>);
    findAll(): Promise<Products[]>;
    findOne(id: string): Promise<Products | null>;
    create(product: Products): Promise<Products>;
    update(id: string, product: Products): Promise<Products | null>;
    delete(id: string): Promise<void>;
}
