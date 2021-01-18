export class ImageGroup {
    name: string;
    thumbnail: string;
    links: String[] = new Array<String>();
    Category: string;
    constructor(name: string,Category:string) {
        this.name = name;        
        this.Category = Category;        
      }
}
