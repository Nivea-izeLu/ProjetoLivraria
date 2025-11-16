const express = require("express"); // pacotes a serem utilizados
const router = express.Router();

const dbKnex = require("./data/db_config"); // dados de conexão com o banco de dados


router.get("/dados/resumo", async (req, res) => {
  try {
    const num = await dbKnex("livros").count({ num: "*" }).first();
    const soma = await dbKnex("livros").sum({ soma: "preco" }).first();
    const maior = await dbKnex("livros").max({ maior: "preco" }).first();
    const media = await dbKnex("livros").avg({ media: "preco" }).first();

    res.status(200).json({
      num: num.num,
      soma: soma.soma,
      maior: maior.maior,
      media: media.media
    });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});



router.get("/dados/grafico", async (req, res) => {
  try {
    const dados = await dbKnex("livros")
      .select("ano")
      .sum({ total: "preco" })
      .groupBy("ano")
      .orderBy("ano");

    res.status(200).json(dados);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});




// FILTRAR livros por título
router.get("/filtro/:texto", async (req, res) => {
  const { texto } = req.params;

  try {
    const livros = await dbKnex("livros")
      .whereLike("titulo", `%${texto}%`)
      .orWhereLike("autor", `%${texto}%`)
      .orderBy("titulo");

    if (livros.length === 0) {
      return res.status(404).json({ msg: "Nenhum livro encontrado" });
    }

    res.status(200).json(livros);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

// método get é usado para consulta
router.get("/", async (req, res) => {
    try {
        // para obter os livros pode-se utilizar .select().orderBy() ou apenas .orderBy()
        const livros = await dbKnex("livros").orderBy("id", "desc");
        res.status(200).json(livros); // retorna statusCode ok e os dados
    } catch (error) {
        res.status(400).json({ msg: error.message }); // retorna status de erro e msg
    }
});

//enviar para o banco e para o backend os dados do novo livro
router.post("/", async (req, res) => {
  const { titulo, autor, foto, ano, preco } = req.body;

  if (!titulo || !autor || !foto || !ano || !preco) {
    return res.status(400).json({ msg: "Preencha todos os campos" });
  }

  try {
    const novo = await dbKnex("livros").insert({ titulo, autor, foto, ano, preco });
    res.status(201).json({ id: novo[0] });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});


// ALTERAR livro (apenas preço ou todos os campos)
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { preco } = req.body;

  if (!preco) {
    return res.status(400).json({ msg: "Informe o preço" });
  }

  try {
    const atualizado = await dbKnex("livros")
      .where({ id })
      .update({ preco });

    if (atualizado === 0) {
      return res.status(404).json({ msg: "Livro não encontrado" });
    }

    res.status(200).json({ msg: "Preço atualizado com sucesso" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});


// EXCLUIR um livro
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const apagado = await dbKnex("livros")
      .where({ id })
      .del();

    if (!apagado) {
      return res.status(404).json({ msg: "Livro não encontrado" });
    }

    res.status(200).json({ msg: "Livro excluído com sucesso" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

module.exports = router;

