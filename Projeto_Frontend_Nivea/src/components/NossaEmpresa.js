import { useState } from "react"; 
import { useForm } from "react-hook-form"; 
import { inAxios } from "../config_axios"; 
    
    const NossaEmpresa = () => {
        return (
            <div className="container">
                <h4 className="fst-italic mt-3">Conheça nossa livraria:</h4>
                <div>
                    <p>Há 40 anos no mercado, nossa livraria nasceu do empenho da família Figueira Firenzi em compartilhar obras famosas de autores renomados. Nossa loja fica localizada na região da Paulista, local de encontro de leitores.</p>
                    <p><b>Endereço: Rua Oscar Freire, 928 São Paulo SP<br/></b></p>
                </div>
                
                <div>
                <iframe
                    width="700"
                    height="450"
                    frameborder="0"
                    src="https://www.google.com/maps/embed/v1/place?key=AIzaSyDmoCE-A_mZ02veBnmtpVEwB1xGELVXDiA&q=rua+Oscar+Freire, 928, São+Paulo"
                    allowfullscreen>
                </iframe>
                </div>
            </div>
    );

}; export default NossaEmpresa;