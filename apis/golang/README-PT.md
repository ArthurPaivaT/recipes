# GoLang API

- [Passos para Reproduzir](#Passos-para-Reproduzir)
- [Executando o Serviço](#Executando-o-Serviço)

## Passos para Reproduzir

### Iniciando Serviço de Módulos

O primeiro passo é iniciar o serviço de módulos do go, já que vamos precisar usar pacotes de terceiros no nosso servidor.

Pra isso, na raiz da sua pasta, execute o comando no terminal:

    go mod init github.com/seuUsuario/repositorio

Onde github.com/seuUsuario/repositorio é o link para fazer o download do seu código, caso você queira transformá-lo em um módulo para disponibilizar pra outros.

### Criando o Código

Crie o um arquivo **main.go** na mesma pasta onde está o arquivo **go.mod**

Agora podemos começar a escrever no arquivo. A primeira coisa a definir no código é o pacote ao qual o arquivo faz parte, no caso é o arquivo `main` do projeto:

    package main

> Não se preocupe se ficar confuso, no final eu mostro como fica o arquivo inteiro

### Importando pacotes

Na main, iremos usar quatro pacotes:

- encoding/json
  - Para trabalhar com JSONs nas requisições
- fmt
  - Para imprimir no terminal os logs
- net/http
  - Para iniciar o serviço
- gorilla/mux
  - Para definir as rotas e rotinas do servidor

A importação destes pacotes no código fica:

    import (
        "encoding/json"
        "fmt"
        "net/http"

        "github.com/gorilla/mux"
    )

Agora podemos iniciar a definição do serviço, vamos fazer isso na main:

Primeiro nós definimos as rotas, primeiro vamos criar o serviço que gerencia as rotas com o mux:

    router := mux.NewRouter()

E então definir a rota `/getuser` para a função `getUser`, que vamos definir posteriormente no código

    router.HandleFunc("/getuser", getUser).Methods("GET")

Agora é só iniciar o servidor com o método do pacote http, vamos usar o `router` com as rotas que definimos acima e iniciar o serviço na porta 1212 da nossa máquina

    err := http.ListenAndServe(":1212", router)
    if err != nil {
        fmt.Println("Could not start server:", err)
    }

Agora a nossa main vai ficar parecida com:

    func main() {
        fmt.Println("Starting Server...")

        router := mux.NewRouter()
        router.HandleFunc("/getuser", getUser).Methods("GET")

        fmt.Println("Listening on Port :1212")
        err := http.ListenAndServe(":1212", router)
        if err != nil {
            fmt.Println("Could not start server:", err)
        }
    }

Agora que a função main está criada, vamos criar esta função `getUser`, que será chamada quando usarmos a rota `/getuser`

### Criando a função getUser

Vamos fazer uma função genérica que retorna um json com dados de um desenvolvedor.

Primeiro precisamos definir qual o tipo do objeto que será retornado como json:

    type user struct {
        Name     string `json:"name"`
        MainRole string `json:"mainRole"`
        LinkedIn string `json:"linkedIn"`
        GitHub   string `json:"gitHub"`
    }

Agora podemos instanciar objetos do tipo user.

Vamos criar a nossa função getUser pra fazer isso:

    func getUser(w http.ResponseWriter, r \*http.Request) {

Agora podemos instanciar um usuario com o tipo definido acima, vamos criar o arthurUser \o/

        arthurUser := user{
            Name:     "Arthur Paiva Tavares",
            MainRole: "Anything Developer",
            LinkedIn: "linkedin.com/in/arthur-paiva-982405199/",
            GitHub:   "github.com/arthurpaivat",
        }

A intenção é enviar como resposta para a requisição feita no `/getuser` o json desde usuário criado.

Vamos fazer isso usando a função Marshal do pacote json, criando o JSON do objeto `arthurUser`

        arthurUserJSON, err := json.Marshal(arthurUser)
        if err != nil {
            err := fmt.Errorf("Error creating user json: %w", err)
            http.Error(w, err.Error(), http.StatusInternalServerError)
            return
        }

Agora a gente escreve na resposta da requisição o JSON que foi montado

        w.Write(arthurUserJSON)

Para usar esta resposta em outro serviço, precisamos enviar junto com ela um header com o cors, que é uma configuração que o navegador verifica para poder liberar o acesso à resposta para outras aplicações:

        w.Header().Set("Access-Control-Allow-Origin", "*")

Por fim, o nosso código completo fica:

    package main

    import (
        "encoding/json"
        "fmt"
        "net/http"

        "github.com/gorilla/mux"
    )

    func main() {
        fmt.Println("Starting Server...")

        router := mux.NewRouter()
        router.HandleFunc("/getuser", getUser).Methods("GET")

        fmt.Println("Listening on Port :1212")
        err := http.ListenAndServe(":1212", router)
        if err != nil {
            fmt.Println("Could not start server:", err)
        }
    }

    type user struct {
        Name     string `json:"name"`
        MainRole string `json:"mainRole"`
        LinkedIn string `json:"linkedIn"`
        GitHub   string `json:"gitHub"`
    }

    func getUser(w http.ResponseWriter, r *http.Request) {

        arthurUser := user{
            Name:     "Arthur Paiva Tavares",
            MainRole: "Anything Developer",
            LinkedIn: "linkedin.com/in/arthur-paiva-982405199/",
            GitHub:   "github.com/arthurpaivat",
        }

        arthurUserJSON, err := json.Marshal(arthurUser)
        if err != nil {
            err := fmt.Errorf("Error creating user json: %w", err)
            http.Error(w, err.Error(), http.StatusInternalServerError)
            return
        }

        w.Header().Set("Access-Control-Allow-Origin", "*")
        w.Write(arthurUserJSON)
    }

## Executando o Serviço

Agora que temos o arquivo main.go com o código do serviço e a importação dos pacotes, precisamos fazer o download dos pacotes utilizados.

Se você usa o VsCode para desenvolver, pode ser que os pacotes até já estejam importados no seu arquivo go.mod

Se não, não tem problema! É só abrir o arquivo go.mod e adicionar a ele a linha:

    require github.com/gorilla/mux v1.8.0

Isso porquê o pacote mux é um pacote criado por terceiros. Os outros pacotes usados no código já vêm no go.

Para fazer o download destes pacotes, execute o seguinte comando no seu terminal:

    go mod vendor

todos os pacotes necessários serão salvos na pasta `/vendor`

**AGORA PODEMOS EXECUTAAAAR**

É só rodar o comando

    go run main.go

Se você abrir o seu navegador e digitar a url `localhost:1212/getuser` irá ver o json do objeto de usuário definido no código.

Agora estas informações podem ser acessadas por outros serviços na sua máquina! Yay!
