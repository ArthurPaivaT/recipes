# GoLang API

- [Steps to Reproduce](#Steps-to-Reproduce)
- [Running the Service](#Running-the-Service)

## Steps to Reproduce

### Starting the golang modules service

The first step is to init the golang modules service, since we will need to use some third parties packages in our server.

Then, at the root of your folder, run the command:

    go mod init github.com/yourUser/repo

where github.com/yourUser/repo is the link to download your code, in case you want to make it available as a module to other people.

### Creating the Code

Create a `main.go` file at the same folder as the `go.mod` generated file.

Now we can start writting the code. The first thing to set is the project package which the code belongs to, in this case it's the `main` package.

    package main

> Don't worry if it gets confusing, i'll show you how the final code looks like.

### Importing packages

In the main function, we'll use four packages:

- encoding/json
  - To work with JSONs in the requests
- fmt
  - To print the service logs
- net/http
  - To start the service
- gorilla/mux
  - To set the server routes and routines

The importing code looks like:

    import (
        "encoding/json"
        "fmt"
        "net/http"

        "github.com/gorilla/mux"
    )

Now we can start defining the service, let's do it in the main function:

    func main(){

We need to set the routs, let's first create the routes handling service with the mux package method:

    router := mux.NewRouter()

And then set the route `/getuser` to the function `getUser`, which we'll create soon.

    router.HandleFunc("/getuser", getUser).Methods("GET")

Now we gotta start the service with the http package method, let's use the created `router` and start the service at the port `1212` on our machine.

    err := http.ListenAndServe(":1212", router)
    if err != nil {
        fmt.Println("Could not start server:", err)
    }

Now our main looks like

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

Now that the main func is created, let's create the `getUser` function, which will be called when we user the `/getuser` route.

### Creating the function getUser

Let's create a generic function which returns a json with some developer data.

First we need to set the object type which will be returned as json:

    type user struct {
        Name     string `json:"name"`
        MainRole string `json:"mainRole"`
        LinkedIn string `json:"linkedIn"`
        GitHub   string `json:"gitHub"`
    }

Now we can instantiate user type objects.

Vamos criar a nossa função getUser pra fazer isso:

    func getUser(w http.ResponseWriter, r \*http.Request) {

Now we can instantiate an user object, let's create the arthurUser \o/

        arthurUser := user{
            Name:     "Arthur Paiva Tavares",
            MainRole: "Anything Developer",
            LinkedIn: "linkedin.com/in/arthur-paiva-982405199/",
            GitHub:   "github.com/arthurpaivat",
        }

The intention is to send the created user object as the response to the requisition made to `/getuser`.

We can do it using the Marshal func from the json package, creating the `arthurUser` object JSON.

        arthurUserJSON, err := json.Marshal(arthurUser)
        if err != nil {
            err := fmt.Errorf("Error creating user json: %w", err)
            http.Error(w, err.Error(), http.StatusInternalServerError)
            return
        }

Now we write the generated JSON to the request response.

        w.Write(arthurUserJSON)

To get this reponse from another service, we need to send along with it a `cors` header, it's a setting that our browser uses to check if it can allow another apps to receive the response.

    w.Header().Set("Access-Control-Allow-Origin", "\*")

At the end, our whole code is:

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

## Running the Service

Now that we have the main.go file with the service code and the packages import, we need to download these packages.
Agora que temos o arquivo main.go com o código do serviço e a importação dos pacotes, precisamos fazer o download dos pacotes utilizados.

If you're using VsCode, maybe the neede packages are even already imported since when you saved the file
Se você usa o VsCode para desenvolver, pode ser que os pacotes até já estejam importados no seu arquivo go.mod

If you don't, no problem. You just gotta open your `go.mod` file and add the line:

    require github.com/gorilla/mux v1.8.0

This is needed because the mux package is created by third parties. The other packages used are already attached to golang.

To download the packages set in the `go.mod` file, run:

    go mod vendor

Every needed package will be saved at the `/vendor` folder.

**NOW WE CAN RUN OUR SERVICE**

Just run the command;

    go run main.go

If you open your browser and type `localhost:1212/getuser` you'll see the user object json set in the code. Se você abrir o seu navegador e digitar a url irá ver o json do objeto de usuário definido no código.

Now these data can be accessed by other services in your machine! Yay!
