import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Usuario from './usuario.js'

//Confirmar senha
function confirmacaoSenha(senha, confirmaSenha){
    return senha === confirmaSenha
}

//Validar email
function validarEmail(email){
    const requisito = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    return requisito.test(email)
}

//Validar senha
function validarSenha(senha){
    const requisito = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/

    return requisito.test(senha)
}

export const criarConta = async(req, res)=>{

    try{

        const {
            nome,   
            email,
            senha,
            confirmaSenha
        } = req.body

        //Campos vazios
        if(!nome || !email || !senha || !confirmaSenha){

            return res.status(400).json({
                message:"Preencha todos os campos"
            })
        }

        //Nome
        if(nome.length < 3){

            return res.status(400).json({
                message:"Nome muito curto"
            })
        }

        //Confirmar senha
        if(!confirmacaoSenha(senha, confirmaSenha)){

            return res.status(400).json({
                message:"As senhas não coincidem"
            })
        }

        //Email
        if(!validarEmail(email)){

            return res.status(400).json({
                message:"Email inválido"
            })
        }

        //Senha forte
        if(!validarSenha(senha)){

            return res.status(400).json({
                message:"Senha fraca"
            })
        }

        //Verificar email existente
        const usuarioExistente = await Usuario.findOne({email})

        if(usuarioExistente){

            return res.status(400).json({
                message:"Email já cadastrado"
            })
        }

        //HASH DA SENHA
        const senhaHash = await bcrypt.hash(senha, 10)

        //Criar usuário
        const novoUsuario = await Usuario.create({
            nome,
            email,
            senha: senhaHash
        })

        res.status(201).json({
            message:"Conta criada com sucesso",
            usuario:novoUsuario
        })

    }catch(error){

        return res.status(500).json({
            message:error.message
        })
    }
}

export const login = async(req, res)=>{

    try{

        const { email, senha } = req.body

        //Verificar campos
        if(!email || !senha){

            return res.status(400).json({
                message:"Preencha email e senha"
            })
        }

        //Procurar usuário
        const usuario = await Usuario.findOne({ email })

        //Usuário não existe
        if(!usuario){

            return res.status(404).json({
                message:"Usuário não encontrado"
            })
        }

        //Comparar senha digitada com hash
        const senhaCorreta = await bcrypt.compare(
            senha,
            usuario.senha
        )

        //Senha errada
        if(!senhaCorreta){

            return res.status(401).json({
                message:"Senha incorreta"
            })
        }

        //CRIAR TOKEN JWT
        const token = jwt.sign(
            {
                id: usuario._id,
                email: usuario.email
            },

            "senha_secreta_jwt",

            {
                expiresIn:"7d"
            }
        )

        res.status(200).json({
            message:"Login realizado",
            token
        })

    }catch(error){

        res.status(500).json({
            message:error.message
        })
    }
}

export const tarefasrotasToken = (
    req,
    res,
    next
) => {

    try {

        const authHeader =
        req.headers.authorization;

        // VERIFICAR SE HEADER EXISTE

        if (!authHeader) {

            return res.status(401).json({

                message:
                "Token não encontrado"

            });

        }

        // PEGAR TOKEN

        const token =
        authHeader.split(" ")[1];

        // VALIDAR TOKEN

        const decodificar =
        jwt.verify(
            token,
            "senha_secreta_jwt"
        );


        req.usuario =
        decodificar;
        next();
    }

    catch (error) {
        return res.status(401).json({
            message:
            "Token inválido"
        });
    }
}