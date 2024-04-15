class Item{
    /**
     * 
     * @param {Album} sProducto
     * @param {number} sCantidad
     */
    constructor(sProducto, sCantidad){
        this.Producto = sProducto;
        this.Cantidad = sCantidad;
    }
    
    CalcularTotalPorItem(){
        let total = 0;
        total =  this.Cantidad * this.Producto.Precio
        return total;
    }
}