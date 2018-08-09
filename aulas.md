# React - Aula 1

## Conceitos

### WebApps

- Compostos por Cliente/Servidor
- Lógica da interface é executada no navegador (HTML/CSS/Javascript);


### React

- É uma biblioteca para construção de componentes visuais;
- Bibliotecas similares:
    - Angular;
    - VUE;
    - Ember;
- "_React DOM_": permite a implementação para web;
- _React Native_: Voltado para mobile;
- Forks do React:
    - **Inferno**
    - **Preact**


### Redux

- Container de estados para uma app JS;
    - _estado_: condição da tela definida por variáveis que se alteram e definem o estado da página;



##### Notas

- Framework vs Biblioteca
    - Framework: Tem um escopo maior e define como deve ser construída a aplicação. Ex.: Angular 2+;
    - Biblioteca: Resolve um problema pontual utilizando uma linguagem especívia. Ex.: React, jQuery etc.


## Ferramentas

- IDE: VSCode
- Node.js (versão atm 8.11.3). Tem dois tipos de utilização:
    - Servidor
        - Interpreta e serve o algoritmo JS;
    - Ferramental
        - Para o React, o Node é utilizado somente no momento do desenvolvimento, na execução pode ser instanciado em qualquer tipo de servidor
- NPM (versão atm 5.6.0) - _Node Package Manager_




## Comandos CLI

`
$ npm install -g create-react-app
`

- Instala de forma global e cria um novo app do react;
- Após instalar globalmente, o comando `create-react-app` vira um comando executável;

`
$ create-react-app --version
`

- Verifica a versão criada da versão do React

`
$ create-react-app meuapp
`

- Cria o diretório do app e instala os packages necessários para o dev;

`
$ cd meuapp
$ npm start
`
- Entra do diretório e, na segunda linha, executa o app;
- Ao executar (npm start) é devolvido pela rede o "index.html" que está na pasta "public" com um js chamado "bundle.js" instanciado ao final do html.
- O "bundle.js" é um compilado dos nossos scripts
- É necessário que "public/index.html" e "src/index.js" devem sempre existir.



## Diretório padrão criado

```
- node_modules
- public
- src
```

- **node_modules** - diretório de dependências
- **public** - diretório de arquivos públicos do app
- **src** - diretório do código fonte, da lógica, do app


## package.json

```
{
  "name": "twitelum",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "react": "^16.4.1",
    "react-dom": "^16.4.1",
    "react-scripts": "1.1.4"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject"
  }
}
```

- **dependencies/react**: biblioteca de interfaces em si, o core da biblioteca;
- **dependencies/react-dom**: alimentação da biblioteca core voltada para web;
- **dependencies/react-scripts**: serve para automatizar a inicialização de um projeto default; intríssecamente ligado aos comandos CLI para criação de projetos React `create-react-app`;




### JSX to JS

- O arquivo "src/index.js" é desenvolvido utilizando JSX. Por não ser interpretado pelos navegadores, o JSX é convertido, transpilado (conversão de uma linguagem de alto nível em outra), em JS por um aplicativo chamado Babel (http://babeljs.io/repl). Exemplo de JSX gerando um JS:

##### JSX

```
const x = 10;

console.log(`teste do valor de x: ${x}`);

const el = <div className="teste">Teste</div>;
```

###### JS
```
"use strict";

var x = 10;

console.log("teste do valor de x: " + x);

var el = React.createElement(
  "div",
  { className: "teste" },
  "Teste"
);
```

- No JSX:
    - Os atributos das tags que se iniciam com letra minúscula são nativos do HTML;
    - O atributo 'class' vira 'className' por nome privado do xml;
    - Os atributos que se iniciam com letra maiúscula é entendido como sendo do React;
    - String template definindo uma string com crase, podemos passar uma variável assim: 
    ```
    `${varName}`;
    ``` 
    - No JSX, o style pode receber um objeto definindo suas propriedades através de variáveis. Exemplo:
    ```
    style={{color: this.props.cor}}
    ```


##### export

- Temos duas maneiras de fazer o export:
    - `export default NomeComponente;` que deve ser importado como `import NomeComponente from './path/to/NomeComponente';` - tipo de export padrão;
    - `export {NomeComponente};` que deve ser importado como `import {NomeComponente} from './path/to/NomeComponente'` - tipo de export chamado de "export nomeado", que serve para fazer vários exports no mesmo módulo, p.e.: `export {NomeComponente1, NomeComponente2}` que deve ser importado como `import {NomeComponente1, NomeComponente2} from './path/to/NomeComponente'`;


#### Componentização

- Um componente criado pode ser adicionado à tela como uma tag, p.e.: `<NomeComponente></NomeComponente>`;
- As propriedades deste componente podem ser passadas como atributos de tag, p.e.: `<NomeComponente atributo="x"></NomeComponente>`;
- Estas propriedades são acessadas dentro da classe do componente no objeto "this", assim: `{this.props.atributo}`;
- Podemos também utilizar o conceito de nós filhos do xml ao chamarmos o objeto "children", p.e.: `<NomeComponente><a id="ancora"></a><SubComponente></SubComponente></NomeComponente>`, que retorna todos os nós filhos, fazendo um "transclude" dos mesmos dentro da classe através da propriedade: `{this.props.children}` e permite um aninhamento de componentes do React;
- As propriedades (*props*) são passadas de cima para baixo na hierarquia dos componentes, ou seja, as *props* do `<NomeComponente>` no exemplo acima são herdadas pelos `<SubComponente>`;
- Os eventos são chamados de baixo para acima na hierarquia dos componentes, ou seja, no exemplo acima, para chamarmos um evento dentro do `<SubComponente onClick={}>` que manipule as propriedades ou estados (*state*) do componente pai, devemos desenvolver o algoritmo do evento dentro do arquivo onde escrevemos o algoritmo do componente pai, passamos para o componente filho a função a ser executada via *props* e instanciamos a função dentro de *props* no *onClick* do subcomponente: `<SubComponente onClick={this.props.handlerClick}>`;

## Sintaxes


### Métodos

##### render()

- Renderiza o JSX retornado pela Classe;


##### constructor(props)

- Cria uma função do tipo factory e instancia seu objeto de retorno no contexto da classe ("this");
- Dentro do **constructor(props)**, precisamos chamar a função **super(props)** para inicializar o **this**, o contexto da Classe;
- Boa prática: passar as propriedades vindas da Classe para o constructor;

```javascript

    constructor(props) { //o argumento 'props' passa as propriedades que estão sendo passadas para a classe para o constructor
        super(props); //e para o constructor da classe pai tb (no caso o constructor da classe Component)
        this.state = {
            novoTweet: '',
            tweets: []
        }
        //this.addTweet = this.addTweet.bind(this); //adiciona o contexto "this" da classe no contexto da função "addTweet", mantendo assim o escopo léxico;
    }

    addTweet = (event) => { ... } //este tipo de implementação remove a necessidade de implementar no constructor, a adição do contexto "this" à função via "bind";
    
```



##### super(props)

- Chama o constructor da Classe Pai que está sendo extendida na nova Classe;
- Inicializa os valores que vem da Classe Pai dentro do contexto do **constructor()**;
- Boa prática: passar as propriedades vindas da Classe para o constructor da Classe Pai tb;


##### fetch('url', \<jsonDataInput\>)

-


### React Lifecycle



##### componentWillMount() 

- O componente vai montar a view;
- Este método é executado antes de montar a view;
- Neste ponto, a tela ainda não foi renderizada;
- Utilizar chamadas AJAX neste ponto pode ser perigoso, pois corre-se o risco de a requisição falhar e assim a tela não vai ser renderizada.

##### componentDidMount() 

- O componente montou a view;
- Este método é executado depois de montar a view;


##### componentWillUpdate() 

- O componente vai realizar a atualização do componente;
- Este método é chamado a cada vez que o componente for se atualizar e executa alteração na view

##### componentDidUpdate()

- O componente já realizou a atualização componente;
- Este método é chamado a cada vez que o componente se atualizar e alterar a view

    
##### componentWillUnmount() 

- Ao "desmontar", retirar o componente da view;


### Eventos


##### onInput / onChange

- Funcionam de forma igual;
- O evento retornado pelo listener é um "evento sintético", ou seja, é um retorno de evento com crossbrowser compatibilizado (parecido com o que o jQuery)

##### onSubmit

-


### Propriedades: `this.props`

##### this.props.children

-

##### this.props.history

- 

##### this.props.component

- 


### Contexto: `this.context`

- 


#### Estados

- Para adicionar um estado à Classe faça o seguinte:

```javascript
class App extends Component {

    constructor(props) { //passa as propriedades que estão sendo passadas para a classe para o constructor
        super(props); //e para o constructor da classe pai tb (no caso o constructor da classe Component)
        this.state = {
            variavel: ''
        }
    }
}

```

- O *state* de cada componente pertence únicamente a ele, não sendo herdado pelos componentes filhos a menos que o *state* seja passado via *props*;


##### this.setState({variavel; evente.target.value})

- Altera o valor da variável especificada do "this.state" presente da Classe;

- Esta função executa de forma assícrona, funcionando com um "pool" de funções, fazendo o efeito de "pooling". Pela possibilidade de termos vários "setState()" no código, assim se evita a execução duplicada de uma função dentro do "setState()"; Exemplo:

```javascript

    incrementa = () => {
        this.setState({valor: this.state.valor+1});
    }

    clickHandler = () => {
        this.incrementa();
        this.incrementa();
    }

    //incrementará o valor em apenas 1, e não em 2, por causa do efeito de "pooling";

```

- Para incrementar de forma síncrona, precisamos passar uma função para o *setState*, pois assim geraremos uma instância do retorno da função. Exemplo:

```javascript

    incrementaVarios = () => {
        this.setState(oldState => ({
            valor: oldState.valor +1
        }));
    }

    clickHandler = () => {
        this.incrementaVarios();
        this.incrementaVarios();
    }

    //assim incrementamos duas vezes. 
    //Utilizamos esta forma para quando, para cada chamada do "setState" precisaremos utilizar o último estado já alterado da classe;

```

- Ao passar uma função como argumento para o "*setState*", é passado para o primeiro argumento desta função o "*this.state*" atual no momento da execução;



### Semantic Versoning - SEMVER

- Sintaxe do versionamento semântico:

`~X.Y.Z`
`^X.Y.Z`

- ~ = Opcional. Relacionado diretamente com o "Z", busca a versão mais nova onde altera somente o "Z". P.e.: Caso esteja declarado "~16.4.1", ele buscará a versão "16.4.7", mas caso o componente vire a versão alterando o número "Y", ficando na versão "16.5.0", ele não buscará esta última versão, continuando a buscar a última versão "16.4.Z";
- ^ = Opcional. Caso *não exista* busca a versão exata declarada, caso exista é relacionado ao "Y" da versão, seguindo o mesmo comportamento do "~" em relação ao "Z";

- X = Major/Breaking Change;
- Y = Minor/Feature;
- Z = Bug Fix.



### Roteamento - React Router v4

#### Instalando o `react-router-dom`

`npm install --save react-router-dom`

#### Importando:

##### no roteador:

`import {BrowserRouter||HashRouter, Switch, Route} from 'react-router-dom';`

##### na 'view':

`import {Link} from 'react-router-dom';`

#### Componentes:

##### \<BrowserRouter>

- Navegação com rota direta, necessita configuração do servidor para retornar sempre a index do site;

##### \<HashRouter>

- Navegação com hash-route;

> **Importante**: Utilizar o \<BrowserRouter> **ou** \<HashRouter>, pois ambos servem para diferenciar a maneira como o React vai se comportar com a url (location);

##### \<Switch>

-


##### \<Route>

- **Attr `path`**
    -

- **Attr `component`**
    -

- **Attr `render`**
    -

- **Attr `exact`**
    - Ao utilizar esta propriedade, informamos ao componente de rotas que queremos encontrar a exatamente a rota que está definida no atributo `path`;
    - Caso não se utilize este atributo, a leitura das instâncias do `<Route>` será lida de cima para baixo, parando no primeiro "match" do atributo `path`. Por exemplo, ao ser executada a ordem do exemplo abaixo, conseguiríamos achar a rota "/login" pois esta vem antes da rota "/", mas nunca conseguiríamos acessar a rota "/sobre", pois ao chegar na rota "/" o componente de roteamento retornará a tela relativa à esta roda e interromperá a leitura das instâncias do componente `<Route>`:
    ```javascript
        <Route path="/login" component={App} />
        <Route path="/" component={App} />
        <Route path="/sobre" component={Sobre} />
        <Route path="*" component={NotFound} />
    ```

##### \<Redirect>

- 

##### Exemplo de implementação no roteador

###### Direto no `ReactDOM` do '*src/index.js*'

```javascript
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/LoginPage';
import Sobre from './pages/SobrePage';

ReactDOM.render(<BrowserRouter>
    <Switch>
        <Route path="/" exact={true} component={App} />
        <Route path="/login" component={Login} />
        <Route path="/sobre" component={Sobre} />
        <Route path="*" component={NotFound} />
    </Switch>
</BrowserRouter>, document.getElementById('root'));

```

###### ou chamando as rotas a partir de um arquivo:

router.js:

```javascript
import {Switch, Route} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/LoginPage';
import Sobre from './pages/SobrePage';

const Roteador = () => {
    return(
        <Switch>
            <Route path="/login" component={Login} />
            <Route path="/sobre" component={Login} />
            <Route path="/" exact={true} component={Home} />
        </Switch>
    );
};


export default Roteador;

```
src/index.js:

```javascript

import {BrowserRouter} from 'react-router-dom';
import Roteador from './router.js';

ReactDOM.render(<BrowserRouter>
                    <Roteador />
                </BrowserRouter>, 
    document.getElementById('root'));


```


##### \<Link>

-


##### Exemplo de implementação na 'view'

```javascript

class App extends Component {
  render() {
    return (
      <div className="App">        
        <p className="App-intro">
          <Link to="/sobre">Página Sobre</Link>
        </p>
      </div>
    );
  }
}

export default App;


```





## OFF React


### Promisses em JS

##### Implementação

```javascript
    
    jogar = (bilhete) => {
        return new Promise((resolve, reject) => {
            // resolve = para se executar quando der sucesso, chamará a função de promessa ".then(...)"
            // reject = para se executar quando ser erro, chamará a função de promessa ".catch(...)"
            // ambos serão executados como uma promessa de retorno da função "jogar"
            setTimeout(()=>{
                let sorteado = Math.floor(Math.random() * 6)+1;

                if(bilhete === sorteado) {
                    resolve(10000);
                } else {
                    reject(sorteado);
                }
            }, 2000);
        });
    }

    playLottery = () => {
        let bilhete = prompt('Digite um número de 1 a 6');
        bilhete = parseInt(bilhete,10);
        
        //implementação de função com promessa:
        this.jogar(bilhete)
        .then(premio => window.alert(`Ganhei R$ ${premio} porra! =D`))
        .catch(sorteado => window.alert(`Perdeu mané! O número sorteado foi ${sorteado}`));
    }




```



# Redux

#### FLUX
- Paradigma de desenvolvimento (assim como o MVC)

#### Redux
- Ciclo: View -> Action -> Dispatch -> Store -> View
- SSOT - Single Source Of Truth - Origem Única De Verdade



https://github.com/augustotmw/react-curso-201808.git