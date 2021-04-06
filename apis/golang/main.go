package main

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
)

type user struct {
	Name     string `json:"name"`
	MainRole string `json:"mainRole"`
	LinkedIn string `json:"linkedIn"`
	GitHub   string `json:"gitHub"`
}

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

	w.Write(arthurUserJSON)
}
