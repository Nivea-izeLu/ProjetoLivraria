
import { useState } from "react";
import { inAxios } from "../config_axios";
import { useForm } from "react-hook-form";
const InclusaoLivros = () => {
    const { register, handleSubmit, reset } = useForm();
    const [aviso, setAviso] = useState("");
        const salvar = async (campos) => {
            try {
                const resp = await inAxios.post("/livros", campos);
                
                setAviso("ok! Livro cadastrado com ID " + resp.data.id);

                reset({ titulo: "", autor: "", foto: "", ano: "", preco: "" });

            } catch (error) {
                console.error(error);
                setAviso("erro: " + error.message);
            }
        };
    return (

        <div className="container">
            <h4 className="fst-italic mt-3">Inclusão</h4>
            <form onSubmit={handleSubmit(salvar)}>
                <div className="form-group">
                    <label htmlFor="titulo">Título</label>
                    <input type="text" className="form-control" id="titulo" required autoFocus {...register("titulo")}/>
                </div>
                <div className="form-group mt-2">
                    <label htmlFor="autor">Autor:</label>
                    <input type="text" className="form-control" id="autor" required {...register("autor")}/>
                </div>
                <div className="form-group mt-2">
                    <label htmlFor="foto">URL da Foto:</label>
                    <input type="url" className="form-control" id="foto" required {...register("foto")}/>
                </div>
                <div className="row mt-2">
                    <div className="col-sm-4">
                        <div className="form-group">
                            <label htmlFor="ano">Ano de Publicação:</label>
                            <input type="number" className="form-control" id="ano" required {...register("ano")}/>
                        </div>
                    </div>
                </div>
                <div className="col-sm-8">
                    <div className="form-group">
                        <label htmlFor="preco">Preço R$:</label>
                        <input type="number" className="form-control" id="preco" step="0.1" required {...register("preco")} />
                    </div>
                </div>
       

                <input type="submit" className="btn btn-primary mt-3" value="Enviar"/>
                <input type="reset" className="btn btn-danger mt-3 ms-3" value="Limpar"/>
            </form>

            <div className={aviso.startsWith("ok!") ? "alert alert-success" : aviso.startsWith("erro") ? "alert alert-danger" : ""}> {aviso}</div>

        </div>
    );
};

export default InclusaoLivros;