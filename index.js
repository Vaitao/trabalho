import express from 'express';
import path from 'path';

const app = express();

const porta = 3000;
const host = '0.0.0.0';

var conteudo = ``;  

var lista_usuarios = [];

function processar(req, res){
    const user = {
        email: req.query.email,
        nome: req.query.nome,
        senha: req.query.senha
    }

    lista_usuarios.push(user);

    console.log(lista_usuarios);
    res.redirect(`/listar`);


}


app.get(`/`, (requisicao, resposta) => {

    app.use(express.static(path.join(process.cwd(),`src`)))
    resposta.send(`<a href = "cadastro.html">formulario</a><br>
                    <a href="/listar">listar</a>
                    
                    
                    
                    
                    <script>function redireciona()
                    {
                        resposta.redirect("/listar");

                    }</script>`
                    )
})

app.get(`/listar`, (requisicao, resposta) => {

    conteudo = `<a href = "/">menu principal</a><br><br>`;

    for (const usuario of lista_usuarios){
        conteudo += `<tr>
                        <td>${usuario.email}</td>
                        <td>${usuario.nome}</td>
                        <td>${usuario.senha}</td>
                    <tr><br>
        `;
    }

    resposta.send(`${conteudo}`);
})

app.get(`/processar-cadastro`, processar)


app.listen(porta, host, () => {

    console.log(`Rodando na porta ${porta}`);


});