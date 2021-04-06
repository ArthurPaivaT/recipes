# GoLang API

- [Passos para Reproduzir](#Passos-para-Reproduzir)
- [Executando o Serviço](#Executando-o-Serviço)

## Passos para Reproduzir

### Iniciando Serviço de Módulos

O primeiro passo é iniciar o serviço de módulos do go, já que vamos precisar usar pacotes de terceiros no nosso servidor.

Pra isso, na raiz da sua pasta, execute o comando no terminal:

    go mod init github.com/seuUsuario/repositorio

Onde github.com/seuUsuario/repositorio é o link para fazer o download do seu código, caso você queira transformá-lo em um módulo para disponibilizar pra outros.

### Criando a main

Crie o um arquivo **main.go** na mesma pasta onde está o arquivo **go.mod**

no arquivo adicione o código da função main:

    package main

    func main() {

        router := mux.NewRouter()

        router.HandleFunc("/getuser", enableCors(getUser)).Methods("GET")

        err := http.ListenAndServe(":1212", router)
        if err != nil {
            fmt.Println("Could not start server:", err)
        }

    }

Isso cria o pacote main, e a função main dentro do pacote, que é executada quando executamos o código.

Aqui usamos o module [**mux**](https://github.com/gorilla/mux) para iniciar o servidor na porta local 1212

Disponibilizando também a função **enableCors(getUser)** no endpoint /getuser

### Habilitando o cors

Para habilitar o cors usando middleware **enableCors** que está descrito na main, precisamos adicionar ao código (fora da main) a função:

    func enableCors(next http.HandlerFunc) http.HandlerFunc {
        return func(w http.ResponseWriter, r *http.Request) {
            w.Header().Set("Access-Control-Allow-Origin", "*")
            next(w, r)
        }
    }

Que adiciona na resposta da requisição o header `Access-Control-Allow-Origin` com valor "`*`", o que que libera o acesso para requisições ao servidor vindas de diferentes origens.

Depois de adicionar a permissão do cors ao header, ela chama a função que recebeu como parâmetro, no caso **getUser**

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

Vamos fazer isso na nossa querida função:

    func getUser(w http.ResponseWriter, r \*http.Request) {

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

        w.Write(arthurUserJSON)

    }

Primeiro ela cria um objeto arthurUser, que é do tipo user.

Depois usa o método Marshal do módulo json para montar o json a partir do objeto arthurUser.

Por fim, escrevemos no ResponseWriter `w` o json gerado.

Agora podemos executar o serviço para ver se a api está funcionando.

## Executando o Serviço
