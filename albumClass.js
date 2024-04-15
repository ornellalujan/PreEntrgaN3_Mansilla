class Album {
    /**
     * 
     * @param {int} sID 
     * @param {string} sNombre 
     * @param {string} sArtista 
     * @param {string} sVersion 
     * @param {string} sFormato 
     * @param {string} sDuracion 
     * @param {float} sPrecio 
     * @param {int} sCantidad 
     */
    constructor (sID, sNombre, sArtista, sVersion, sFormato, sDuracion, sPrecio, sCantidad){
        this.ID = sID;
        this.Nombre = sNombre;
        this.Artista = sArtista;
        this.Version = sVersion;
        this.Formato = sFormato;
        this.Duracion = sDuracion;
        this.Precio = sPrecio;
        this.Cantidad = sCantidad;
    }

}