var butonNovoEvento = document.getElementById('buttonNovoEvento');
var cancelarEvento = document.getElementById('cancelarEvento');
var novoEvento = document.getElementById('novoEvento');
var formNovoEvento = document.getElementById('formNovoEvento');
var inputNovoEvento = document.getElementById('nomeEvento');
var inputDataEvento = document.getElementById('dataEvento');
var inputEnderecoEvento = document.getElementById('enderecoEvento');
var divMenssagemErro =  document.getElementById('messagemErrou');
var tabelaEventos = document.getElementById('tabelaEventos');

var listaEventos = [];

/*var eventoExemplo = {
    nome: 'Exemlplo',
    data: new Date(),
    endereço: 'Exemplo'
};
listaEventos.push(eventoExemplo);*/

function excluirEvento(event){
    var posicao = event.target.getAttribute('data-evento');
    listaEventos.splice(posicao, 1);
    atualizarTabela();
    
}

function editarEvento(){
    botaoEdicao.addEventListener('click', atualizarTabela);
    
}

function atualizarTabela(){
    console.log('Atualizar eventos');
    if (listaEventos.length === 0){
        tabelaEventos.innerHTML = '<tr><td colspan="3">Nenhum evento</td></tr>';
        return;
    }
    tabelaEventos.innerHTML = '';
    for (var i = 0; i < listaEventos.length; i++){
        var evento = listaEventos[i];
        var linha = document.createElement('tr');
        var celulaNome = document.createElement('td');
        var celulaData = document.createElement('td');
        var celulaEndereco = document.createElement('td');
        var celulaAcoes = document.createElement('td');
        var botaoExcluir = document.createElement('button');
        var botaoEdicao = document.createElement('button');
        botaoExcluir.setAttribute('data-evento', i);
        botaoExcluir.classList.add('btn');
        botaoExcluir.classList.add('btn-danger');
        botaoExcluir.classList.add('btn-sm');
        
        botaoEdicao.classList.add('btn');
        botaoEdicao.classList.add('btn-primary');
        botaoEdicao.classList.add('btn-sm');
        botaoExcluir.addEventListener('click', excluirEvento);
        botaoEdicao.addEventListener('click', editarEvento);
        celulaNome.innerText = evento.nome;
        celulaData.innerText = evento.data;
        celulaEndereco.innerText = evento.endereço;
        botaoExcluir.innerText = 'Excluir';
        botaoEdicao.innerText = 'Editar';
        celulaAcoes.appendChild(botaoExcluir);
        celulaAcoes.appendChild(botaoEdicao);
        linha.appendChild(celulaNome);
        linha.appendChild(celulaData);
        linha.appendChild(celulaEndereco);
        linha.appendChild(celulaAcoes);
        tabelaEventos.appendChild(linha);
    }
}

function limparFormulario(){
    inputNovoEvento.value = '';
    inputDataEvento.value = '';
    inputEnderecoEvento.value = '';
    inputNovoEvento.classList.remove('is-invalid');
    inputDataEvento.classList.remove('is-invalid');
    inputEnderecoEvento.classList.remove('is-invalid');
    divMenssagemErro.classList.add('d-none');
}
function mostarNovoEvento() {
    novoEvento.classList.remove('d-none');
}
function removeEvento() {
    novoEvento.classList.add('d-none');
    limparFormulario();
}

function novoEventoValido(nomeEvento, dataEvento, enderecoEvento) {
    var ok = true;
    var erro = "";
    if (nomeEvento.trim().length === 0) {
        erro = 'Nome do evento é obrigatório!';
        inputNovoEvento.classList.add('is-invalid');
        ok = false;
    }else{
        inputNovoEvento.classList.remove('is-invalid');
    }
    var verificarData = Date.parse(dataEvento);
    var horaAtual = (new Date()).getTime();
    if (isNaN(verificarData) || verificarData < horaAtual) {
        if (erro.length > 0){
            erro += '<br>'
        }
        erro += 'Data do evento é obrigatório!';
        inputDataEvento.classList.add('is-invalid');
        ok = false;
    }else{
        inputDataEvento.classList.remove('is-invalid');
    }

    if (enderecoEvento.trim().length === 0) {
        if (erro.length > 0){
            erro += '<br>'
        }
        erro += 'Endereço do evento é obrigatório!';
        inputEnderecoEvento.classList.add('is-invalid');
        ok = false;
    }else{
        inputEnderecoEvento.classList.remove('is-invalid');
    }
    if (!ok) {
        divMenssagemErro.innerHTML = erro;
        divMenssagemErro.classList.remove('d-none');
    }else{
        divMenssagemErro.classList.add('d-none');
    }
    return ok;
}


function salvarNovoEvento(event) {
    event.preventDefault();
    var nomeEvento = inputNovoEvento.value;
    var dataEvento = inputDataEvento.value;
    var enderecoEvento = inputEnderecoEvento.value;
    if (novoEventoValido(nomeEvento, dataEvento, enderecoEvento)) {
        
        console.log('Evento Valido');
        listaEventos.push({
            nome: nomeEvento,
            data: new Date(dataEvento),
            endereço: enderecoEvento
        });
        atualizarTabela();
        limparFormulario();
    } else {
        console.log('Evento invalido');
    }
}
butonNovoEvento.addEventListener('click', mostarNovoEvento);
cancelarEvento.addEventListener('click', removeEvento);
formNovoEvento.addEventListener('submit', salvarNovoEvento);
window.addEventListener('load', atualizarTabela);