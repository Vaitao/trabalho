import express from 'express';
import path from 'path';

const app = express();

const porta = 3000;
const host = '0.0.0.0';

var conteudo = ``;  

var lista_usuarios = [];
app.use(express.urlencoded({ extended: true }));
function processar(req, res){
    const user = req.body
    let testando = 10;

    if(user.nome != '')
    {
        var conteudo = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Formulário de Cadastro</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 100vh;
                    margin: 0;
                }
        
                form {
                    background-color: #fff;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    width: 300px;
                }
        
                label {
                    display: block;
                    margin-bottom: 8px;
                    font-weight: bold;
                }
        
                input {
                    width: 100%;
                    padding: 8px;
                    margin-bottom: 16px;
                    box-sizing: border-box;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                }
        
                button {
                    background-color: #4caf50;
                    color: #fff;
                    padding: 10px 15px;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                }
        
                button:hover {
                    background-color: #45a049;
                }
            </style>
        </head>
        <body>
            <form action="/processar-cadastro" method="post" novalidate>
                <label for="nome">Nome:</label>
                <input type="text" id="nome" name="nome" value="${req.body.nome}" required>`
    }

    else{
        testando = 0;
        var conteudo = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Formulário de Cadastro</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 100vh;
                    margin: 0;
                }
        
                form {
                    background-color: #fff;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    width: 300px;
                }
        
                label {
                    display: block;
                    margin-bottom: 8px;
                    font-weight: bold;
                }
        
                input {
                    width: 100%;
                    padding: 8px;
                    margin-bottom: 16px;
                    box-sizing: border-box;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                }
        
                button {
                    background-color: #4caf50;
                    color: #fff;
                    padding: 10px 15px;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                }
        
                button:hover {
                    background-color: #45a049;
                }
            </style>
        </head>
        <body>
            <form action="/processar-cadastro" method="post" novalidate>
                <label for="nome">Nome:</label>
                <input type="text" id="nome" name="nome" value="${req.body.nome}" required>
                <p>Preencha este campo corretamente</p>`
    }


    if(user.email != '')
    {
        conteudo += `<label for="email">Email:</label>
        <input type="email" id="email" name="email" value="${req.body.email}" required>
`
    }

    else {
        testando = 0;
        conteudo += `<label for="email">Email:</label>
        <input type="email" id="email" name="email" value="${req.body.email}"required>
        <p>este campo esta vazio</p>`
    }

    if(user.senha != '')
    {
        conteudo += `<label for="senha">Senha:</label>
        <input type="password" id="senha" name="senha" value="${req.body.senha}"required>
        <button type="submit">Cadastrar</button>
    </form>
</body>
</html>`    
    }

    else{
        testando = 0;
        conteudo += `<label for="senha">Senha:</label>
        <input type="password" id="senha" name="senha" value="${req.body.senha}"required>
        <p>O campo esta vazio</p>
        <button type="submit">Cadastrar</button>
    </form>
</body>
</html>`
    }

    if ( testando != 0)
    {
        lista_usuarios.push(user);
        console.log(lista_usuarios);
        res.redirect(`/listar`);
    }

    else 
    {
        res.send(conteudo);
    }



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
app.post(`/processar-cadastro`, processar)


app.listen(porta, host, () => {

    console.log(`Rodando na porta ${porta}`);


});