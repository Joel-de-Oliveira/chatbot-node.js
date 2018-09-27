const prompt = require('prompt-sync')();
const watson = require('watson-developer-cloud/assistant/v1')
require('dotenv').config()

const chatbot = new watson({
    username: '35c0b235-a701-47ac-bbaa-8d081e56f755',
    password: 'vPwVUJg8z3Bq',
    version: '2018-02-16',
});
const workspace_id = 'bc9f4d26-1d54-4114-b130-88b3d6043608';
//começamos conversação com uma mensagem vazia (pro chatbot entrar no Welcome)
chatbot.message({workspace_id}, trataResposta);






let fimdeConversa = false;


function trataResposta (err, resposta){
    if (err){
        console.log(err); //caso tenha erro
        return;
    }

    //detecta a intenção do usuário
    if(resposta.intents.length > 0){
        console.log('Eu detectei a intenção: ' + resposta.intents[0].intent);
        if(resposta.intents[0].intent=='despedida'){
        fimdeConversa=true;
        }
    }
    //exibe a resposta do diálogo, caso haja
    if(resposta.output.text.length > 0){
        console.log(resposta.output.text)
    }



   // console.log(resposta.context)
   
    if(!fimdeConversa){
        const mensagemusuario = prompt('>>');
        chatbot.message({
            workspace_id,
            
            input: {text: mensagemusuario},
            context:resposta.context
        }, trataResposta);
    }
    
}