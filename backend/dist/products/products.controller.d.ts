import { ProductsService } from './products.service';
import { Products } from './entity/products.entity';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    findAll(): Promise<Products[]>;
    findOne(id: string): Promise<Products | null>;
    create(product: Products): Promise<Products>;
    update(id: string, product: Products): Promise<Products | null>;
    delete(id: string): Promise<void>;
}
