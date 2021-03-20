package main

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
)

type dev struct {
	Name     string `json:"name"`
	MainRole string `json:"mainRole"`
}

func main() {
	fmt.Println("Starting Server...")

	router := mux.NewRouter()

	router.HandleFunc("/getdev", getDev).Methods("GET")

	fmt.Println("Listening on Port :1212")
	err := http.ListenAndServe(":1212", router)
	if err != nil {
		fmt.Println("Could not start server:", err)
	}

}

func getDev(w http.ResponseWriter, r *http.Request) {

	arthurDev := dev{
		Name:     "Arthur",
		MainRole: "Backend Dev",
	}

	arthurDevJSON, err := json.Marshal(arthurDev)
	if err != nil {
		err := fmt.Errorf("Error creating dev json: %w", err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Write(arthurDevJSON)
}
